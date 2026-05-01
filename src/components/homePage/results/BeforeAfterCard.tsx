import type { KeyboardEvent, MouseEvent } from "react";
import Image from "next/image";
import type { ResultsBeforeAfterCard } from "@/types/results";
import { urlForSanityImage } from "@/utils/getUrlForSanityImage";

interface BeforeAfterCardProps {
  card: ResultsBeforeAfterCard;
  onBeforeClick: () => void;
  onAfterClick: () => void;
}

function openableImageProps(onClick: () => void) {
  return {
    role: "button" as const,
    tabIndex: 0 as const,
    className:
      "relative w-full h-[calc(50%-2px)] overflow-hidden rounded-[8px] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-brown focus-visible:ring-offset-2 focus-visible:ring-offset-beige",
    onClick: (e: MouseEvent) => {
      e.stopPropagation();
      onClick();
    },
    onKeyDown: (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick();
      }
    },
  };
}

export default function BeforeAfterCard({
  card,
  onBeforeClick,
  onAfterClick,
}: BeforeAfterCardProps) {
  const beforeUrl = urlForSanityImage(card.beforeImage).width(600).url();
  const afterUrl = urlForSanityImage(card.afterImage).width(600).url();

  return (
    <div className="flex h-full w-[373px] shrink-0 flex-col gap-1">
      <div {...openableImageProps(onBeforeClick)}>
        <Image
          src={beforeUrl}
          alt={card.beforeImage.alt ?? "Før"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 45vw, 20vw"
        />
        <p className="pointer-events-none absolute left-2 bottom-2 px-3.5 py-3 font-evolenta text-[16px] leading-[120%] font-normal uppercase text-beige rounded-[8px] bg-white/6 shadow-[inset_0px_4px_12.6px_rgba(255,255,255,0.12)] backdrop-blur-[38px]">
          før
        </p>
      </div>
      <div {...openableImageProps(onAfterClick)}>
        <Image
          src={afterUrl}
          alt={card.afterImage.alt ?? "Efter"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 45vw, 20vw"
        />
        <p className="pointer-events-none absolute left-2 bottom-2 px-3.5 py-3 font-evolenta text-[16px] leading-[120%] font-normal uppercase text-beige rounded-[8px] bg-white/6 shadow-[inset_0px_4px_12.6px_rgba(255,255,255,0.12)] backdrop-blur-[38px]">
          efter
        </p>
      </div>
    </div>
  );
}
