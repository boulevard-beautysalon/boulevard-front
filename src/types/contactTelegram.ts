/** Payload — formatteres til HTML i sendContactToTelegram og sendes til /api/telegram */
export type ContactTelegramBody = {
  name: string;
  phone?: string;
  email: string;
  address?: string;
  message: string;
  source?: string;
};
