import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_BOT_ID || "";
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: NextRequest) {
  if (!BOT_TOKEN || !CHAT_ID) {
    return NextResponse.json(
      { error: "Telegram er ikke konfigureret på serveren." },
      { status: 503 },
    );
  }

  try {
    const data = await request.json();
    if (typeof data !== "string") {
      return NextResponse.json(
        { error: "Forventede en tekststreng (HTML)." },
        { status: 400 },
      );
    }
    const text = data.trim();
    if (!text.length) {
      return NextResponse.json({ error: "Tom besked" }, { status: 400 });
    }
    if (text.length > 4000) {
      return NextResponse.json(
        { error: "Beskeden er for lang." },
        { status: 400 },
      );
    }

    await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        chat_id: CHAT_ID,
        parse_mode: "HTML",
        text: data,
        disable_web_page_preview: true,
      },
    );

    return NextResponse.json({ message: "Data sent successfully" });
  } catch {
    return NextResponse.json(
      { error: "Kunne ikke sende til Telegram." },
      { status: 500 },
    );
  }
}
