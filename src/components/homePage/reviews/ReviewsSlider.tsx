"use client";

import { useEffect, useMemo, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { SwiperSlide } from "swiper/react";
import SwiperWrapper from "@/components/shared/swper/SwiperWrapper";
import ReviewsCard from "./ReviewsCard";
import type { Review } from "@/types/review";

/** Кількість клонів стрічки (оригінал + копії) для плавного «інфініті» без loop Swiper + auto. */
const STRIP_COPIES = 3;

interface ReviewsSliderProps {
  reviews: Review[];
  uniqueKey?: string;
}

export default function ReviewsSlider({
  reviews,
  uniqueKey,
}: ReviewsSliderProps) {
  const [swiperApi, setSwiperApi] = useState<SwiperType | null>(null);

  const useInfiniteStrip = reviews.length >= 2;

  const bufferSlides = useMemo(() => {
    if (!useInfiniteStrip) return null;
    const n = reviews.length;
    return Array.from({ length: n * STRIP_COPIES }, (_, i) => {
      const review = reviews[i % n]!;
      return { review, key: `${review.id}__inf${i}` };
    });
  }, [reviews, useInfiniteStrip]);

  const swiperStableKey = useMemo(
    () => reviews.map((r) => r.id).join("|"),
    [reviews],
  );

  useEffect(() => {
    if (!swiperApi || !useInfiniteStrip) return undefined;
    const n = reviews.length;
    const recenter = () => {
      const i = swiperApi.activeIndex;
      if (i < n) swiperApi.slideTo(i + n, 0);
      else if (i >= 2 * n) swiperApi.slideTo(i - n, 0);
    };
    swiperApi.on("slideChangeTransitionEnd", recenter);
    return () => {
      swiperApi.off("slideChangeTransitionEnd", recenter);
    };
  }, [swiperApi, useInfiniteStrip, reviews.length]);

  if (!reviews?.length) return null;

  const swiperUniqueKey = `${uniqueKey ?? "reviews"}-${swiperStableKey}`;

  return (
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
        slidesPerGroup: 1,
        ...(useInfiniteStrip ? { initialSlide: reviews.length } : {}),
      }}
      uniqueKey={swiperUniqueKey}
      onSwiper={(swiper) => {
        setSwiperApi(swiper);
      }}
      swiperClassName="reviews-slider"
      buttonsPosition="center"
      buttonsClassName="pr-5 lg:pr-6 mr-5 sm:mr-[calc(100%-640px+20px)] md:mr-[calc(100%-768px+20px)] 
          lg:mr-[calc(100%-1024px+24px)] xl:mr-[calc(100%-1280px+24px)]"
    >
      {useInfiniteStrip && bufferSlides
        ? bufferSlides.map(({ review, key }) => (
            <SwiperSlide key={key}>
              <ReviewsCard review={review} />
            </SwiperSlide>
          ))
        : reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <ReviewsCard review={review} />
            </SwiperSlide>
          ))}
    </SwiperWrapper>
  );
}
