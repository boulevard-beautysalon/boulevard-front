import { Dispatch, SetStateAction } from "react";

import Modal from "../modals/Modal";
import Button from "../buttons/Button";

interface NotificationProps {
  title: string;
  description: string;
  buttonText?: string;
  isNotificationShown: boolean;
  setIsNotificationShown: Dispatch<SetStateAction<boolean>>;
}

export default function Notification({
  title,
  description,
  buttonText,
  isNotificationShown,
  setIsNotificationShown,
}: NotificationProps) {
  return (
    <Modal
      isModalShown={isNotificationShown}
      setIsModalShown={setIsNotificationShown}
      variant="light"
      className="z-[101] rounded-[12px]"
      closeButtonClassName="top-4 right-4 md:right-5 md:top-5"
    >
      <div className="relative z-20 flex w-full min-w-[256px] max-w-[560px] flex-col items-center justify-center px-5 pb-8 pt-14 text-center sm:px-8 sm:pb-10 sm:pt-16 md:px-10 lg:p-10 lg:pt-[4.5rem]">
        <h3 className="mb-6 font-evolenta text-[24px] font-normal uppercase leading-[120%] text-black sm:mb-8 lg:mb-10 lg:text-[40px] xl:text-[48px]">
          {title}
        </h3>
        <p className="mb-8 max-w-[480px] font-montserrat text-[13px] font-light leading-[140%] text-black/75 sm:text-[14px] lg:mb-12 lg:text-[16px] lg:leading-[150%]">
          {description}
        </p>
        <Button
          type="button"
          variant="black"
          onClick={() => setIsNotificationShown(false)}
          className="h-12 w-full max-w-[320px] uppercase"
        >
          {buttonText ?? "Luk"}
        </Button>
      </div>
    </Modal>
  );
}
