import type { AppLightboxSlide } from "@/components/shared/lightbox/AppLightbox";
import type { ResultsCard } from "@/types/results";
import { urlForSanityImage } from "@/utils/getUrlForSanityImage";

export type ResultsCardLightboxMeta =
  | { role: "single"; index: number }
  | { role: "beforeAfter"; beforeIndex: number; afterIndex: number };

export function buildResultsLightboxModel(cards: ResultsCard[]) {
  const slides: AppLightboxSlide[] = [];
  const metaByKey = new Map<string, ResultsCardLightboxMeta>();

  for (const card of cards) {
    if (card._type === "resultsImageCard") {
      const index = slides.length;
      metaByKey.set(card._key, { role: "single", index });
      slides.push({
        src: urlForSanityImage(card.image).width(2400).height(2400).fit("max").url(),
        alt: card.image.alt ?? "Result",
      });
    } else {
      const beforeIndex = slides.length;
      slides.push({
        src: urlForSanityImage(card.beforeImage).width(2400).fit("max").url(),
        alt: card.beforeImage.alt ?? "Før",
      });
      slides.push({
        src: urlForSanityImage(card.afterImage).width(2400).fit("max").url(),
        alt: card.afterImage.alt ?? "Efter",
      });
      metaByKey.set(card._key, {
        role: "beforeAfter",
        beforeIndex,
        afterIndex: beforeIndex + 1,
      });
    }
  }

  return { slides, metaByKey };
}
