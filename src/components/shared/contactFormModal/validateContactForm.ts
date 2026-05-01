import { isValidPhoneNumber } from "react-phone-number-input";

export type ContactFormFields = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export type FieldErrors = Partial<Record<keyof ContactFormFields, string>>;

const EMAIL =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export function validateContactForm(v: ContactFormFields): FieldErrors {
  const e: FieldErrors = {};
  const name = v.name.trim();
  if (name.length < 2 || name.length > 80) {
    e.name = "Indtast dit navn (2–80 tegn).";
  }
  const phone = v.phone.trim();
  if (!phone) {
    e.phone = "Indtast et gyldigt telefonnummer.";
  } else if (!isValidPhoneNumber(phone)) {
    e.phone = "Ugyldigt telefonnummer.";
  }
  const email = v.email.trim();
  if (!email) {
    e.email = "E-mail er påkrævet.";
  } else if (!EMAIL.test(email)) {
    e.email = "Ugyldig e-mail – tjek venligst formatet.";
  }
  const message = v.message.trim();
  if (message.length > 3500) {
    e.message = "Beskeden er for lang – forkort den venligst.";
  }
  return e;
}
