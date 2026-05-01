"use client";
import { SwiperSlide } from "swiper/react";
import SwiperWrapper from "@/components/shared/swper/SwiperWrapper";
import { SanityImage } from "@/types/service";
import TextRevealCard from "@/components/homePage/services/TextRevealCard";
import { ReactNode } from "react";

interface TextRevealCardsSliderProps {
  slides: Array<{
    _key?: string;
    title: string;
    description: string;
    image: SanityImage | { link: string; alt: string };
    link: string;
  }>;
  uniqueKey?: string;
  component?: ReactNode;
}

export default function TextRevealCardsSlider({
  slides,
  uniqueKey,
  component,
}: TextRevealCardsSliderProps) {
  if (!slides || !slides?.length) return null;

  return (
    <SwiperWrapper
      breakpoints={{
        0: {
          spaceBetween: 20,
          slidesPerView: "auto",
        },
      }}
      uniqueKey={uniqueKey}
      component={component}
      swiperClassName="text-reveal-cards-slider"
      buttonsClassName="pr-5 lg:pr-6 mr-5 sm:mr-[calc(100%-640px+20px)] md:mr-[calc(100%-768px+20px)] 
          lg:mr-[calc(100%-1024px+24px)] xl:mr-[calc(100%-1280px+24px)]"
      buttonsPosition="center"
    >
      {slides.map((slide, idx) => (
        <SwiperSlide key={idx}>
          <TextRevealCard slide={slide} isAboveTheFold={idx === 0} />
        </SwiperSlide>
      ))}
    </SwiperWrapper>
  );
}
