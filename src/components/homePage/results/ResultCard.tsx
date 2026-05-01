import type { ResultsCard } from "@/types/results";
import type { ResultsCardLightboxMeta } from "./resultsLightbox";
import BeforeAfterCard from "./BeforeAfterCard";
import SingleImageCard from "./SingleImageCard";

interface ResultCardProps {
  card: ResultsCard;
  lightboxMeta: ResultsCardLightboxMeta;
  onOpenLightbox: (index: number) => void;
}

export default function ResultCard({
  card,
  lightboxMeta,
  onOpenLightbox,
}: ResultCardProps) {
  if (card._type === "resultsBeforeAfterCard" && lightboxMeta.role === "beforeAfter") {
    return (
      <BeforeAfterCard
        card={card}
        onBeforeClick={() => onOpenLightbox(lightboxMeta.beforeIndex)}
        onAfterClick={() => onOpenLightbox(lightboxMeta.afterIndex)}
      />
    );
  }
  if (card._type === "resultsImageCard" && lightboxMeta.role === "single") {
    return (
      <SingleImageCard
        card={card}
        onImageClick={() => onOpenLightbox(lightboxMeta.index)}
      />
    );
  }
  return null;
}
