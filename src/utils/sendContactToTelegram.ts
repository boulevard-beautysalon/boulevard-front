import axios from "axios";

import type { ContactTelegramBody } from "@/types/contactTelegram";

export type { ContactTelegramBody };

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Indhold i <blockquote> — kun &lt; &gt; &amp; */
function escapeForBlockquote(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Struktureret Telegram-HTML uden lange linjer.
 * Få, diskrete emojis som visuelle ankre (Telegram viser dem fint i UTF-8).
 */
function buildContactHtml(data: ContactTelegramBody): string {
  const name = data.name.trim();
  const email = data.email.trim();
  const source = data.source?.trim() || "—";
  const message = data.message.trim();
  const phone = data.phone?.trim();
  const address = data.address?.trim();

  const mailHref = `mailto:${email}`;
  const telHref = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "";

  const lines: string[] = [];

  lines.push(`💌 <b>Boulevard</b> <i>· ny henvendelse</i>`);
  lines.push(`<i>Beauty Salon, Horsens</i>`);
  lines.push("");

  lines.push(`🏷 <b>Kilde:</b> <i>${escapeHtml(source)}</i>`);
  lines.push(`👤 <b>Navn:</b> ${escapeHtml(name)}`);

  if (phone) {
    lines.push(
      `📞 <b>Telefon:</b> <a href="${escapeHtml(telHref)}">${escapeHtml(phone)}</a>`,
    );
  }

  lines.push(
    `✉️ <b>E-mail:</b> <a href="${escapeHtml(mailHref)}">${escapeHtml(email)}</a>`,
  );

  if (address) {
    lines.push(`📍 <b>Adresse:</b> ${escapeHtml(address)}`);
  }

  lines.push("");
  lines.push(`💬 <b>Besked</b>`);
  if (message) {
    lines.push(`<blockquote>${escapeForBlockquote(message)}</blockquote>`);
  } else {
    lines.push(`<i>(ingen besked)</i>`);
  }

  return lines.join("\n");
}

/**
 * Sender kontaktformular til Telegram via /api/telegram (samme mønster som efedra CallBackForm).
 * Miljøvariabler på serveren: TELEGRAM_BOT_TOKEN (eller TELEGRAM_BOT_ID), TELEGRAM_CHAT_ID
 */
export async function sendContactToTelegram(
  payload: ContactTelegramBody,
): Promise<void> {
  const data = buildContactHtml(payload);
  try {
    await axios({
      method: "post",
      url: "/api/telegram",
      data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err: unknown) {
    const msg =
      axios.isAxiosError(err) &&
      err.response?.data &&
      typeof err.response.data === "object" &&
      "error" in err.response.data
        ? String((err.response.data as { error?: string }).error)
        : "Kunne ikke sende beskeden.";
    throw new Error(msg);
  }
}
