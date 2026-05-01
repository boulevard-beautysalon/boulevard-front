import Link from "next/link";
import type { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit";
  href?: string;
  linkType?: "internal" | "external";
  /**
   * Передається з Sanity тощо: `true` — нова вкладка (для будь-якого URL), `false` — поточна.
   * Якщо не задано, збережено попередню логіку: `linkType="external"` завжди з `target="_blank"`.
   */
  blank?: boolean;
  className?: string;
  variant?: "black" | "beige" | "brown";
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  loadingText?: string;
}

function hrefNeedsNativeAnchor(href: string): boolean {
  return (
    /^https?:\/\//i.test(href) ||
    href.startsWith("//") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  );
}

export default function Button({
  type = "button",
  children,
  href,
  linkType = "internal",
  blank,
  className,
  variant = "black",
  disabled = false,
  isLoading = false,
  loadingText = "Sender...",
  onClick,
}: ButtonProps) {
  const asLink = Boolean(href && !disabled && !isLoading);

  /* :enabled у CSS не застосовується до <a>, тому для Link — hover/focus без префікса enabled: */
  const stateClasses = asLink
    ? "cursor-pointer active:scale-[98%] focus-visible:before:w-full xl:hover:before:w-full"
    : "enabled:cursor-pointer disabled:opacity-60 enabled:active:scale-[98%] enabled:focus-visible:before:w-full xl:enabled:hover:before:w-full";

  const variantClasses =
    variant === "black"
      ? asLink
        ? "border-black bg-black text-beige before:bg-beige focus-visible:text-black xl:hover:text-black"
        : "border-black bg-black text-beige before:bg-beige enabled:focus-visible:text-black xl:enabled:hover:text-black"
      : variant === "beige"
        ? asLink
          ? "border-beige bg-beige text-black before:bg-black focus-visible:text-beige xl:hover:text-beige"
          : "border-beige bg-beige text-black before:bg-black enabled:focus-visible:text-beige xl:enabled:hover:text-beige"
        : asLink
          ? "border-brown bg-brown text-white before:bg-beige focus-visible:text-black xl:hover:text-black"
          : "border-brown bg-brown text-white before:bg-beige enabled:focus-visible:text-black xl:enabled:hover:text-black";

  const mergedClassName = twMerge(
    "group relative flex w-full h-12 lg:h-[57px] p-[5px] items-center justify-center overflow-hidden outline-none rounded-full border text-[12px] lg:text-[14px] font-normal leading-[120%] uppercase will-change-transform transition-[color,transform] duration-300 ease-in-out before:content-[''] before:absolute before:z-0 before:top-0 before:left-0 before:h-full before:w-0 before:rounded-full before:transition-[width] before:duration-700 before:ease-in-out",
    stateClasses,
    variantClasses,
    className,
  );

  const content = (
    <span className="relative z-10">{isLoading ? loadingText : children}</span>
  );

  if (asLink) {
    const hrefStr = href!;
    const useNativeAnchor =
      blank === true ||
      hrefNeedsNativeAnchor(hrefStr) ||
      linkType === "external";

    const openInNewTab =
      blank === true || (blank !== false && linkType === "external");

    if (useNativeAnchor) {
      return (
        <a
          href={hrefStr}
          className={mergedClassName}
          onClick={onClick}
          {...(openInNewTab
            ? { target: "_blank", rel: "noopener noreferrer nofollow" }
            : { rel: "noopener noreferrer" })}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={hrefStr} className={mergedClassName} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={mergedClassName}
    >
      {content}
    </button>
  );
}
