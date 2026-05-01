import Image from "next/image";
import type { ResultsCard, SanityImageDimensions } from "@/types/results";
import { urlForSanityImage } from "@/utils/getUrlForSanityImage";

interface SingleImageCardProps {
  card: Extract<ResultsCard, { _type: "resultsImageCard" }>;
  onImageClick?: () => void;
}

const RESULTS_SLIDE_HEIGHT_PX = 300;

function getDisplayWidthPx(
  fixedHeight: number,
  dimensions?: SanityImageDimensions | null,
): number {
  const w = dimensions?.width;
  const h = dimensions?.height;
  if (w && h && h > 0) {
    return Math.round(fixedHeight * (w / h));
  }
  const ar = dimensions?.aspectRatio;
  if (ar && ar > 0) {
    return Math.round(fixedHeight * ar);
  }
  return Math.round(fixedHeight * (4 / 3));
}

export default function SingleImageCard({
  card,
  onImageClick,
}: SingleImageCardProps) {
  const heightPx = RESULTS_SLIDE_HEIGHT_PX;
  const widthPx = getDisplayWidthPx(heightPx, card.image.dimensions);

  const src = urlForSanityImage(card.image)
    .width(Math.min(widthPx * 2, 2400))
    .height(Math.min(heightPx * 2, 2400))
    .fit("max")
    .url();

  const inner = (
    <div
      className="relative shrink-0 overflow-hidden rounded-[8px] bg-beige-light"
      style={{ width: widthPx, height: heightPx }}
    >
      <Image
        src={src}
        alt={card.image.alt ?? "Result"}
        width={widthPx}
        height={heightPx}
        className="h-full w-full object-cover"
        sizes={`${widthPx}px`}
      />
    </div>
  );

  return (
    <div className="flex h-full min-h-0 w-max items-center justify-center">
      {onImageClick ? (
        <div
          role="button"
          tabIndex={0}
          className="relative cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-brown focus-visible:ring-offset-2 focus-visible:ring-offset-beige"
          onClick={(e) => {
            e.stopPropagation();
            onImageClick();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onImageClick();
            }
          }}
        >
          {inner}
        </div>
      ) : (
        inner
      )}
    </div>
  );
}
