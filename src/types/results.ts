import type { SanityImage } from "./service";

/** Розміри оригіналу з `asset.metadata` (для розрахунку ширини при фіксованій висоті). */
export type SanityImageDimensions = {
  width?: number;
  height?: number;
  aspectRatio?: number;
};

/** Картка з одним зображенням (`resultsImageCard` у Sanity). */
export type ResultsImageCard = {
  _type: "resultsImageCard";
  _key: string;
  image: SanityImage & {
    dimensions?: SanityImageDimensions | null;
  };
};

/** Картка до/після (`resultsBeforeAfterCard` у Sanity). */
export type ResultsBeforeAfterCard = {
  _type: "resultsBeforeAfterCard";
  _key: string;
  beforeImage: SanityImage;
  afterImage: SanityImage;
};

export type ResultsCard = ResultsImageCard | ResultsBeforeAfterCard;

/** Документ `results` — один на проєкт, слайдер на головній. */
export type ResultsData = {
  _id: string;
  title?: string;
  cards: ResultsCard[] | null;
};
