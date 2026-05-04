"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { twMerge } from "tailwind-merge";
import { SwiperSlide } from "swiper/react";
import SwiperWrapper from "@/components/shared/swper/SwiperWrapper";
import AppLightbox from "@/components/shared/lightbox/AppLightbox";
import type { ResultsCard } from "@/types/results";
import ResultCard from "./ResultCard";
import { buildResultsLightboxModel } from "./resultsLightbox";

const STRIP_COPIES = 3;

interface ResultsSliderProps {
  cards: ResultsCard[];
  uniqueKey?: string;
  component?: ReactNode;
}

export default function ResultsSlider({
  cards,
  uniqueKey,
  component,
}: ResultsSliderProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [swiperApi, setSwiperApi] = useState<SwiperType | null>(null);

  const { slides: lightboxSlides, metaByKey } = useMemo(
    () => buildResultsLightboxModel(cards),
    [cards],
  );

  const useInfiniteStrip = cards.length >= 2;

  const bufferSlides = useMemo(() => {
    if (!useInfiniteStrip) return null;
    const n = cards.length;
    return Array.from({ length: n * STRIP_COPIES }, (_, i) => {
      const card = cards[i % n]!;
      return { card, key: `${card._key}__inf${i}` };
    });
  }, [cards, useInfiniteStrip]);

  const swiperStableKey = useMemo(
    () => cards.map((c) => c._key).join("|"),
    [cards],
  );

  useEffect(() => {
    if (!swiperApi || !useInfiniteStrip) return undefined;
    const n = cards.length;
    const recenter = () => {
      const i = swiperApi.activeIndex;
      if (i < n) swiperApi.slideTo(i + n, 0);
      else if (i >= 2 * n) swiperApi.slideTo(i - n, 0);
    };
    swiperApi.on("slideChangeTransitionEnd", recenter);
    return () => {
      swiperApi.off("slideChangeTransitionEnd", recenter);
    };
  }, [swiperApi, useInfiniteStrip, cards.length]);

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  if (!cards?.length) return null;

  const swiperUniqueKey = `${uniqueKey ?? "results"}-${swiperStableKey}`;

  return (
    <div className={twMerge(lightboxOpen && "no-doc-scroll")}>
      <SwiperWrapper
        loop={false}
        rewind={false}
        infiniteSlideBuffer={useInfiniteStrip}
        breakpoints={{
          0: {
            spaceBetween: 20,
            slidesPerView: "auto",
          },
        }}
        additionalOptions={{
          threshold: 12,
          speed: 1000,
          slidesPerGroup: 1,
          slidesOffsetAfter: 48,
          ...(useInfiniteStrip ? { initialSlide: cards.length } : {}),
        }}
        uniqueKey={swiperUniqueKey}
        onSwiper={(swiper) => {
          setSwiperApi(swiper);
        }}
        component={component}
        swiperClassName="results-slider"
        buttonsClassName="pr-5 lg:pr-6 mr-5 sm:mr-[calc(100%-640px+20px)] md:mr-[calc(100%-768px+20px)] 
          lg:mr-[calc(100%-1024px+24px)] xl:mr-[calc(100%-1280px+24px)]"
        buttonsPosition="center"
      >
        {useInfiniteStrip && bufferSlides
          ? bufferSlides.map(({ card, key }) => (
              <SwiperSlide key={key}>
                <div className="flex h-full w-max items-stretch">
                  <ResultCard
                    card={card}
                    lightboxMeta={metaByKey.get(card._key)!}
                    onOpenLightbox={handleOpenLightbox}
                  />
                </div>
              </SwiperSlide>
            ))
          : cards.map((card) => (
              <SwiperSlide key={card._key}>
                <div className="flex h-full w-max items-stretch">
                  <ResultCard
                    card={card}
                    lightboxMeta={metaByKey.get(card._key)!}
                    onOpenLightbox={handleOpenLightbox}
                  />
                </div>
              </SwiperSlide>
            ))}
      </SwiperWrapper>

      <AppLightbox
        open={lightboxOpen && lightboxSlides.length > 0}
        index={lightboxIndex}
        slides={lightboxSlides}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setLightboxIndex}
      />
    </div>
  );
}
