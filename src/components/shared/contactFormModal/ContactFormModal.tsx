"use client";

import {
  Dispatch,
  SetStateAction,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";

import Backdrop from "../backdrop/Backdrop";
import Modal from "../modals/Modal";
import Notification from "../notification/Notification";

import ContactForm from "./ContactForm";

const emptySubscribe = () => () => {};

interface ContactFormModalProps {
  isModalShown: boolean;
  setIsModalShown: Dispatch<SetStateAction<boolean>>;
  /** Knappetekst / åbningskontekst — sendes som «Kilde» til Telegram */
  source?: string;
}

export default function ContactFormModal({
  isModalShown,
  setIsModalShown,
  source = "Kontakt os",
}: ContactFormModalProps) {
  const [isNotificationShown, setIsNotificationShown] = useState(false);
  const [isError, setIsError] = useState(false);
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  if (!isClient) {
    return null;
  }

  return createPortal(
    <>
      <Modal
        isModalShown={isModalShown}
        setIsModalShown={setIsModalShown}
        variant="light"
        className="flex min-w-[328px] w-full max-w-[90vw] flex-col rounded-[12px] md:max-w-[779px]"
        closeButtonClassName="top-4 right-4 lg:top-8 lg:right-8"
      >
        <div
          className="relative z-10 flex max-h-[min(90dvh,900px)] flex-1 flex-col overflow-y-auto rounded-[12px] px-5 pb-8 pt-14 sm:px-7 sm:pb-10 sm:pt-16 md:px-8 popup-scroll"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="mb-5 font-evolenta text-[40px] font-normal uppercase leading-[120%] text-black sm:mb-6 lg:text-[64px]">
            Kontakt os
          </h2>
          <p className="mb-7 w-full font-montserrat text-[12px] font-light leading-[140%] sm:mb-8 lg:text-[14px] lg:leading-[120%]">
            Har du spørgsmål eller brug for en konsultation? Skriv til os
            nedenfor, så kontakter vi dig hurtigt.
          </p>
          <div className="w-full">
            <ContactForm
              source={source}
              setIsModalShown={setIsModalShown}
              setIsError={setIsError}
              setIsNotificationShown={setIsNotificationShown}
            />
          </div>
        </div>
      </Modal>
      <Notification
        title={isError ? "Noget gik galt" : "Tak for din henvendelse!"}
        description={
          isError
            ? "Der opstod en fejl, og din besked blev ikke sendt. Kontroller venligst, at alle felter er udfyldt korrekt, og prøv igen."
            : "Vi har modtaget din besked og kontakter dig så hurtigt som muligt. Tak fordi du valgte Boulevard."
        }
        buttonText="Luk"
        isNotificationShown={isNotificationShown}
        setIsNotificationShown={setIsNotificationShown}
      />
      <Backdrop
        isVisible={isModalShown || isNotificationShown}
        onClick={() => {
          setIsModalShown(false);
          setIsNotificationShown(false);
        }}
      />
    </>,
    document.body,
  );
}
