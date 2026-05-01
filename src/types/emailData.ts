/** Til kundens bekræftelsesmail — uden «Kilde» (kilde sendes kun til Telegram). */
export interface ContactEmailData {
  name?: string;
  phone?: string;
  email: string;
  message?: string;
}
