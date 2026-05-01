import type { ContactEmailData } from "@/types/emailData";

export async function sendContactFormEmail(formData: ContactEmailData) {
  const response = await fetch("/api/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Failed to send email" }));
    throw new Error(error.error || "Failed to send email");
  }

  return response;
}
