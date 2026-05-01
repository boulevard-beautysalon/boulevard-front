"use client";

import { Dispatch, FormEvent, SetStateAction, useId, useState } from "react";
import PhoneInput from "react-phone-number-input";
import { twMerge } from "tailwind-merge";

import "react-phone-number-input/style.css";

import Button from "../buttons/Button";
import ShevronIcon from "../icons/ShevronIcon";
import { sendContactToTelegram } from "@/utils/sendContactToTelegram";
import { sendContactFormEmail } from "@/utils/email";
import { phoneForTelegram } from "./phoneForTelegram";
import {
  ContactFormFields,
  FieldErrors,
  validateContactForm,
} from "./validateContactForm";

interface ContactFormProps {
  setIsError: Dispatch<SetStateAction<boolean>>;
  setIsNotificationShown: Dispatch<SetStateAction<boolean>>;
  setIsModalShown?: Dispatch<SetStateAction<boolean>>;
  /** Vises som «Kilde» i Telegram — typisk knappens tekst */
  source?: string;
}

const initial: ContactFormFields = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const inputShell = (hasError: boolean) =>
  [
    "relative w-full resize-none rounded-full border bg-beige text-[14px] font-light leading-[121.4%] text-black outline-none transition duration-200 ease-out",
    "placeholder:text-black/40",
    "focus-visible:border-black/35 focus-visible:ring-2 focus-visible:ring-black/8",
    hasError
      ? "border-[var(--color-red-error)]"
      : "border-[var(--color-modal-input-border)]",
  ].join(" ");

const fieldErrorProps = {
  className:
    "absolute left-0 top-full z-[1] mt-1 max-w-full text-left text-[12px] leading-snug text-[var(--color-red-error)]",
  role: "alert" as const,
};

export default function ContactForm({
  setIsError,
  setIsNotificationShown,
  setIsModalShown,
  source = "Kontakt os",
}: ContactFormProps) {
  const formId = useId();
  const nameInputId = `${formId}-name`;
  const emailInputId = `${formId}-email`;
  const phoneInputId = `${formId}-phone`;
  const messageInputId = `${formId}-message`;
  const [values, setValues] = useState<ContactFormFields>(initial);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof ContactFormFields, boolean>>
  >({});
  const [isLoading, setIsLoading] = useState(false);

  const setField = (key: keyof ContactFormFields) => (value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const onBlur = (key: keyof ContactFormFields) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validateContactForm(values));
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    setTouched({
      name: true,
      email: true,
      phone: true,
      message: true,
    });
    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    try {
      setIsError(false);
      setIsLoading(true);
      const tel = phoneForTelegram(values.phone);
      const payload = {
        source: source.trim() || "Kontakt os",
        name: values.name.trim(),
        email: values.email.trim(),
        phone: tel || undefined,
        message: values.message.trim(),
      };

      await Promise.all([
        sendContactToTelegram(payload),
        sendContactFormEmail({
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          message: payload.message,
        }),
      ]);
      setValues(initial);
      setErrors({});
      setTouched({});
      if (setIsModalShown) {
        setIsModalShown(false);
      }
      setIsNotificationShown(true);
    } catch {
      setIsError(true);
      if (setIsModalShown) {
        setIsModalShown(false);
      }
      setIsNotificationShown(true);
    } finally {
      setIsLoading(false);
    }
  };

  const showErr = (key: keyof ContactFormFields) =>
    touched[key] && errors[key] ? errors[key] : undefined;

  const canSubmit =
    Object.keys(validateContactForm(values)).length === 0 && !isLoading;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-6 flex flex-col gap-5 sm:gap-6">
        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 md:gap-5">
          <label htmlFor={nameInputId} className={`block min-w-0`}>
            <span className="sr-only">Dit navn</span>
            <div className="relative">
              <input
                id={nameInputId}
                name="name"
                autoComplete="name"
                value={values.name}
                onChange={(e) => setField("name")(e.target.value)}
                onBlur={() => onBlur("name")}
                placeholder="Dit navn"
                className={`${inputShell(Boolean(showErr("name")))} h-[49px] w-full px-4 py-3`}
              />
              {showErr("name") ? (
                <span {...fieldErrorProps}>{showErr("name")}</span>
              ) : null}
            </div>
          </label>

          <label htmlFor={emailInputId} className={`block min-w-0`}>
            <span className="sr-only">E-mail</span>
            <div className="relative">
              <input
                id={emailInputId}
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={(e) => setField("email")(e.target.value)}
                onBlur={() => onBlur("email")}
                placeholder="E-mail"
                className={`${inputShell(Boolean(showErr("email")))} h-[49px] w-full px-4 py-3`}
              />
              {showErr("email") ? (
                <span {...fieldErrorProps}>{showErr("email")}</span>
              ) : null}
            </div>
          </label>
        </div>

        <div className="relative w-full">
          <label htmlFor={phoneInputId} className="sr-only">
            Telefonnummer
          </label>
          <PhoneInput
            international
            countryCallingCodeEditable={false}
            country="DK"
            defaultCountry="DK"
            value={values.phone || undefined}
            onChange={(value) => setField("phone")(value ?? "")}
            numberInputProps={{
              id: phoneInputId,
              "aria-label": "Telefonnummer",
              autoComplete: "tel",
              onBlur: () => onBlur("phone"),
            }}
            countrySelectProps={{
              arrowComponent: () => (
                <ShevronIcon
                  decorative
                  className="size-6 shrink-0 rotate-180 text-black/55 md:size-[18px] translate-x-3"
                />
              ),
            }}
            className={twMerge(
              "PhoneInput !flex h-[49px] w-full items-stretch overflow-hidden rounded-full border bg-beige px-0 text-[14px] font-light text-black transition duration-200 ease-out [--PhoneInputCountryFlag-aspectRatio:1.5] [--PhoneInputCountryFlag-height:calc(32px/1.5)]",
              "focus-within:border-black/35 focus-within:ring-2 focus-within:ring-black/8",
              showErr("phone")
                ? "border-[var(--color-red-error)]"
                : "border-[var(--color-modal-input-border)]",
              /* Flag + landekode: fast bredde 102px, vertikal skillelinje */
              "[&_.PhoneInputCountry]:mr-0 [&_.PhoneInputCountry]:box-border [&_.PhoneInputCountry]:w-[102px] [&_.PhoneInputCountry]:min-w-[102px] [&_.PhoneInputCountry]:max-w-[102px] [&_.PhoneInputCountry]:shrink-0 [&_.PhoneInputCountry]:self-stretch [&_.PhoneInputCountry]:items-center [&_.PhoneInputCountry]:border-r [&_.PhoneInputCountry]:border-[var(--color-modal-input-border)] [&_.PhoneInputCountry]:bg-transparent [&_.PhoneInputCountry]:pl-6 [&_.PhoneInputCountry]:pr-2",
              "[&_.PhoneInputCountryIcon]:!shrink-0",
              "[&_.PhoneInputCountryIconImg]:!object-contain",
              "[&_.PhoneInputCountrySelect]:max-h-[49px] [&_.PhoneInputCountrySelect]:border-none [&_.PhoneInputCountrySelect]:bg-transparent [&_.PhoneInputCountrySelect]:text-black",
              "[&_.PhoneInputInput]:min-h-0 [&_.PhoneInputInput]:min-w-0 [&_.PhoneInputInput]:flex-1 [&_.PhoneInputInput]:border-none [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:px-3 [&_.PhoneInputInput]:text-[14px] [&_.PhoneInputInput]:font-light [&_.PhoneInputInput]:leading-[121.4%] [&_.PhoneInputInput]:text-black [&_.PhoneInputInput]:outline-none md:[&_.PhoneInputInput]:px-4",
            )}
          />
          {showErr("phone") ? (
            <span {...fieldErrorProps}>{showErr("phone")}</span>
          ) : null}
        </div>

        <div className={`w-full`}>
          <div className="relative w-full">
            <label htmlFor={messageInputId} className="sr-only">
              Besked
            </label>
            <div className="block">
              <textarea
                id={messageInputId}
                name="message"
                value={values.message}
                onChange={(e) => setField("message")(e.target.value)}
                onBlur={() => onBlur("message")}
                placeholder="Besked"
                rows={4}
                className={twMerge(
                  inputShell(Boolean(showErr("message"))),
                  "h-[147px] rounded-[24px] p-4 md:h-[120px]",
                )}
              />
            </div>
            {showErr("message") ? (
              <span {...fieldErrorProps}>{showErr("message")}</span>
            ) : null}
          </div>
        </div>
      </div>

      <Button
        type="submit"
        variant="black"
        disabled={!canSubmit}
        isLoading={isLoading}
        loadingText="Sender..."
        className="h-12 w-full max-w-[469px] mx-auto lg:h-[57px]"
      >
        Send besked
      </Button>
    </form>
  );
}
