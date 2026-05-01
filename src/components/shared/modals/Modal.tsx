import { Dispatch, ReactNode, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

import IconButton from "../buttons/IconButton";
import CloseIcon from "../icons/CloseIcon";

interface ModalProps {
  isModalShown: boolean;
  setIsModalShown: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  className?: string;
  closeButtonClassName?: string;
  /** gradient: mørk ramme; light: cremefarvet overflade som på maket */
  variant?: "notification" | "default" | "light";
}

export default function Modal({
  isModalShown,
  setIsModalShown,
  children,
  className = "",
  closeButtonClassName = "",
  variant = "default",
}: ModalProps) {
  const gradientBorder = {
    notification:
      "linear-gradient(129.15deg, var(--color-gradient-brown-dark) 21.74%, var(--color-black) 103.38%)",
    default:
      "linear-gradient(316.28deg, var(--color-gradient-brown-dark) 6.67%, var(--color-black) 95.76%)",
  };

  const isLight = variant === "light";

  return (
    <div
      className={twMerge(
        `${
          isModalShown
            ? " -translate-y-[calc(50dvh-50%)] opacity-100 scale-100"
            : "pointer-events-none opacity-0 scale-60"
        } fixed left-1/2 bottom-0 z-[100] flex max-h-dvh -translate-x-1/2 transform transition duration-[600ms] ease-out`,
        isLight
          ? "rounded-t-[12px] border border-[var(--color-modal-border)] bg-beige text-black shadow-[0_12px_48px_rgba(21,16,13,0.12)] md:rounded-[12px]"
          : "bg-black text-beige shadow-md md:rounded-[12px]",
        className,
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {!isLight && (
        <div
          className={twMerge(
            "pointer-events-none absolute inset-0 md:rounded-[12px]",
            variant === "notification" && "rounded-[12px]",
          )}
          style={{
            background:
              variant === "notification"
                ? gradientBorder.notification
                : gradientBorder.default,
            padding: "1px",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      )}
      <IconButton
        handleClick={() => setIsModalShown(false)}
        className={twMerge(
          "absolute right-4 top-4 z-30 h-8 w-8 md:right-5 md:top-5",
          isLight ? "text-black" : "text-beige",
          closeButtonClassName,
        )}
      >
        <CloseIcon className="size-6" />
      </IconButton>
      {children}
    </div>
  );
}
