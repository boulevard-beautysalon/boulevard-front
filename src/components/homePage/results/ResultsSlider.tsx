"use client";

import { ReactNode, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { SwiperSlide } from "swiper/react";
import SwiperWrapper from "@/components/shared/swper/SwiperWrapper";
import AppLightbox from "@/components/shared/lightbox/AppLightbox";
import type { ResultsCard } from "@/types/results";
import ResultCard from "./ResultCard";
import { buildResultsLightboxModel } from "./resultsLightbox";

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

  const { slides: lightboxSlides, metaByKey } = useMemo(
    () => buildResultsLightboxModel(cards),
    [cards],
  );

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  if (!cards?.length) return null;

  return (
    <div className={twMerge(lightboxOpen && "no-doc-scroll")}>
      <SwiperWrapper
        loop={false}
        breakpoints={{
          0: {
            spaceBetween: 20,
            slidesPerView: "auto",
          },
        }}
        additionalOptions={{
          threshold: 12,
        }}
        uniqueKey={uniqueKey}
        component={component}
        swiperClassName="results-slider"
        buttonsClassName="pr-5 lg:pr-6 mr-5 sm:mr-[calc(100%-640px+20px)] md:mr-[calc(100%-768px+20px)] 
          lg:mr-[calc(100%-1024px+24px)] xl:mr-[calc(100%-1280px+24px)]"
        buttonsPosition="center"
      >
        {cards.map((card) => (
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
