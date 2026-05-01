import { NextResponse } from "next/server";
import { Resend } from "resend";
import Stripe from "stripe";
import { render } from "@react-email/render";
import { client } from "@/lib/sanityClient";
import { GIFT_CARDS_QUERY } from "@/lib/queries";
import { GiftCardCustomerEmail } from "@/components/shared/emailTemplates/GiftCardCustomerEmail";
import type { GiftCard } from "@/types/giftCard";

export const runtime = "nodejs";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";
const SENDER_EMAIL_ADDRESS = process.env.SENDER_EMAIL_ADDRESS || "";
const TELEGRAM_BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_BOT_ID || "";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "";

const stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY) : null;

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("da-DK", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatAmount(amount: number, currency: string): string {
  return new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount / 100);
}

function buildTelegramMessage({
  customerName,
  customerEmail,
  amountLabel,
}: {
  customerName: string;
  customerEmail: string;
  amountLabel: string;
}): string {
  const mailHref = `mailto:${customerEmail}`;
  const lines: string[] = [];

  lines.push("💳 <b>Boulevard</b> <i>· gavekort betalt</i>");
  lines.push("");
  lines.push(`👤 <b>Navn:</b> ${escapeHtml(customerName)}`);
  lines.push(
    `✉️ <b>E-mail:</b> <a href="${escapeHtml(mailHref)}">${escapeHtml(customerEmail)}</a>`,
  );
  lines.push(`💰 <b>Beløb:</b> ${escapeHtml(amountLabel)}`);

  return lines.join("\n");
}

async function sendTelegramNotification(html: string): Promise<void> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return;
  }

  const response = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        parse_mode: "HTML",
        text: html,
        disable_web_page_preview: true,
      }),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Telegram API error: ${response.status} ${errorText}`);
  }
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown error";
}

function logWebhookStep(step: string, details?: Record<string, unknown>) {
  console.info(`[stripe-webhook] ${step}`, details || {});
}

async function getReceiptUrlFromSession(
  stripeClient: Stripe,
  session: Stripe.Checkout.Session,
): Promise<string | undefined> {
  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id;

  if (!paymentIntentId) {
    return undefined;
  }

  const paymentIntent = await stripeClient.paymentIntents.retrieve(paymentIntentId, {
    expand: ["latest_charge"],
  });

  const latestCharge = paymentIntent.latest_charge;
  if (!latestCharge || typeof latestCharge === "string") {
    return undefined;
  }

  return latestCharge.receipt_url || undefined;
}

export async function POST(req: Request) {
  logWebhookStep("Request received");

  if (!stripe || !STRIPE_WEBHOOK_SECRET) {
    console.error("Stripe webhook is not configured.");
    return NextResponse.json(
      { error: "Stripe webhook is not configured." },
      { status: 500 },
    );
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    console.error("Missing stripe-signature header.");
    return NextResponse.json(
      { error: "Missing stripe-signature header." },
      { status: 400 },
    );
  }

  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      STRIPE_WEBHOOK_SECRET,
    );
  } catch (error: unknown) {
    console.error("Invalid webhook signature.", getErrorMessage(error));
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 400 });
  }

  logWebhookStep("Signature verified", {
    eventId: event.id,
    eventType: event.type,
  });

  if (event.type !== "checkout.session.completed") {
    logWebhookStep("Event ignored: unsupported type", {
      eventType: event.type,
    });
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  if (session.payment_status !== "paid") {
    logWebhookStep("Event ignored: payment not paid", {
      sessionId: session.id,
      paymentStatus: session.payment_status,
    });
    return NextResponse.json({ received: true });
  }

  logWebhookStep("Paid checkout session received", {
    sessionId: session.id,
    currency: session.currency,
    amountTotal: session.amount_total,
  });

  const customerEmail =
    session.customer_details?.email || session.customer_email || "";
  if (!customerEmail) {
    console.error("Customer email is missing in checkout session.", {
      sessionId: session.id,
    });
    return NextResponse.json(
      { error: "Customer email is missing in checkout session." },
      { status: 400 },
    );
  }

  try {
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      limit: 10,
      expand: ["data.price"],
    });
    logWebhookStep("Line items loaded", {
      sessionId: session.id,
      lineItemsCount: lineItems.data.length,
    });

    const firstItem = lineItems.data[0];
    const priceId =
      typeof firstItem?.price === "string"
        ? firstItem.price
        : firstItem?.price?.id || "";

    if (!priceId) {
      logWebhookStep("No price ID in line items", { sessionId: session.id });
      return NextResponse.json(
        { error: "Unable to resolve Stripe price ID from session." },
        { status: 400 },
      );
    }
    logWebhookStep("Resolved Stripe price ID", { sessionId: session.id, priceId });

    const giftCards = await client
      .withConfig({ useCdn: false })
      .fetch<GiftCard[]>(GIFT_CARDS_QUERY);
    logWebhookStep("Gift cards loaded from Sanity", {
      count: giftCards.length,
      priceIds: giftCards.map((card) => card.stripePriceId).filter(Boolean),
    });
    const giftCard = giftCards.find((card) => card.stripePriceId === priceId);

    if (!giftCard) {
      console.error("Gift card not found for Stripe price ID.", { priceId });
      return NextResponse.json(
        { error: `Gift card not found for price ID: ${priceId}` },
        { status: 404 },
      );
    }

    const certificateUrl = giftCard.certificatePdf?.asset?.url;
    if (!certificateUrl) {
      console.error("Certificate PDF is missing for Stripe price ID.", { priceId });
      return NextResponse.json(
        { error: `Certificate PDF is missing for price ID: ${priceId}` },
        { status: 400 },
      );
    }

    const certificateResponse = await fetch(certificateUrl);
    if (!certificateResponse.ok) {
      console.error("Failed to fetch certificate PDF from Sanity.", {
        priceId,
        status: certificateResponse.status,
      });
      return NextResponse.json(
        { error: "Failed to fetch certificate PDF from Sanity." },
        { status: 502 },
      );
    }
    logWebhookStep("Certificate PDF downloaded", {
      priceId,
      filename: giftCard.certificatePdf?.asset?.originalFilename || null,
    });

    const certificateBuffer = Buffer.from(await certificateResponse.arrayBuffer());
    const certificateFilename =
      giftCard.certificatePdf?.asset?.originalFilename ||
      `gavekort-${giftCard.amount}.pdf`;

    const customerName = session.customer_details?.name || "Kunde";
    const paidAmount = session.amount_total ?? Math.round(giftCard.amount * 100);
    const currency = session.currency || "dkk";
    const amountLabel = formatAmount(paidAmount, currency);
    const date = formatDate(new Date());
    const receiptUrl = await getReceiptUrlFromSession(stripe, session);
    logWebhookStep("Prepared email payload", {
      sessionId: session.id,
      customerEmail,
      customerName,
      amountLabel,
      hasReceiptUrl: Boolean(receiptUrl),
    });

    if (!SENDER_EMAIL_ADDRESS) {
      console.error("SENDER_EMAIL_ADDRESS is not configured.");
      return NextResponse.json(
        { error: "SENDER_EMAIL_ADDRESS is not configured." },
        { status: 500 },
      );
    }

    const customerHtml = await render(
      GiftCardCustomerEmail({
        name: customerName,
        email: customerEmail,
        amountLabel,
        date,
        receiptUrl,
      }),
    );

    await resend.emails.send({
      from: `Boulevard Beauty Salon <${SENDER_EMAIL_ADDRESS}>`,
      to: customerEmail,
      subject: "Tak for dit køb af gavekort",
      html: customerHtml,
      attachments: [
        {
          filename: certificateFilename,
          content: certificateBuffer.toString("base64"),
        },
      ],
    });
    logWebhookStep("Customer email sent", {
      to: customerEmail,
      subject: "Tak for dit køb af gavekort",
    });

    await sendTelegramNotification(
      buildTelegramMessage({
        customerName,
        customerEmail,
        amountLabel,
      }),
    );
    logWebhookStep("Telegram notification sent", {
      hasTelegramToken: Boolean(TELEGRAM_BOT_TOKEN),
      hasTelegramChatId: Boolean(TELEGRAM_CHAT_ID),
    });

    logWebhookStep("Webhook handled successfully", {
      eventId: event.id,
      sessionId: session.id,
    });
    return NextResponse.json({ received: true });
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    console.error("Failed to process Stripe checkout webhook.", message);
    return NextResponse.json(
      { error: "Failed to process Stripe checkout webhook.", details: message },
      { status: 500 },
    );
  }
}
