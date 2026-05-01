"use client";

import React, { ReactNode, useState } from "react";
import * as motion from "motion/react-client";
import type { Variants } from "motion/react";
import Button from "./Button";
import ContactFormModal from "../contactFormModal/ContactFormModal";

interface FormButtonProps {
  className?: string;
  textClassName?: string;
  variant?: "black" | "beige" | "brown";
  animationVariants?: Variants;
  children: ReactNode;
  /** Når true: stopPropagation på wrapper (fx FAQ-accordion klik). */
  faq?: boolean;
  /**
   * Tekst til Telegram «Kilde». Udelades: bruges ren tekst fra `children` (hvis muligt).
   */
  source?: string;
}

function telegramSourceFromChildren(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children).trim();
  }
  return "";
}

export default function FormButton({
  className,
  variant = "black",
  textClassName,
  animationVariants,
  children,
  faq,
  source,
}: FormButtonProps) {
  const [isModalShown, setIsModalShown] = useState(false);

  const handleClick = () => {
    setIsModalShown(true);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (faq) {
      e.stopPropagation();
    }
  };

  const resolvedSource =
    source?.trim() ||
    telegramSourceFromChildren(children) ||
    "Kontakt os";

  const buttonElement = (
    <div onClick={handleButtonClick}>
      <Button
        type="button"
        variant={variant}
        className={className}
        onClick={handleClick}
      >
        <span className={textClassName}>{children}</span>
      </Button>
    </div>
  );

  return (
    <>
      {animationVariants ? (
        <motion.div
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.3 }}
          variants={animationVariants}
        >
          {buttonElement}
        </motion.div>
      ) : (
        buttonElement
      )}
      <ContactFormModal
        isModalShown={isModalShown}
        setIsModalShown={setIsModalShown}
        source={resolvedSource}
      />
    </>
  );
}
