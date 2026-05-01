import { NextResponse } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { ContactFormCustomerEmail } from "@/components/shared/emailTemplates/ContactFormCustomerEmail";
import type { ContactEmailData } from "@/types/emailData";

const resend = new Resend(process.env.RESEND_API_KEY);
const SENDER_EMAIL_ADDRESS = process.env.SENDER_EMAIL_ADDRESS || "";

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("da-DK", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactEmailData;

    if (!SENDER_EMAIL_ADDRESS) {
      return NextResponse.json(
        { error: "SENDER_EMAIL_ADDRESS is not set" },
        { status: 500 },
      );
    }

    if (!body?.email) {
      return NextResponse.json(
        { error: "Customer email is required" },
        { status: 400 },
      );
    }

    const date = formatDate(new Date());
    const customerHtml = await render(
      ContactFormCustomerEmail({
        name: body.name,
        phone: body.phone,
        email: body.email,
        message: body.message,
        date,
      }),
    );

    const customerData = await resend.emails.send({
      from: `Boulevard Beauty Salon <${SENDER_EMAIL_ADDRESS}>`,
      to: body.email,
      subject: "Tak for din henvendelse",
      html: customerHtml,
    });

    return NextResponse.json({
      success: true,
      data: {
        customer: customerData,
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
