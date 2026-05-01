"use client";

import { SwiperSlide } from "swiper/react";
import SwiperWrapper from "@/components/shared/swper/SwiperWrapper";
import ReviewsCard from "./ReviewsCard";
import type { Review } from "@/types/review";

interface ReviewsSliderProps {
  reviews: Review[];
  uniqueKey?: string;
}

export default function ReviewsSlider({
  reviews,
  uniqueKey,
}: ReviewsSliderProps) {
  if (!reviews?.length) return null;

  return (
    <SwiperWrapper
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 16,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      }}
      uniqueKey={uniqueKey}
      swiperClassName="reviews-slider"
      buttonsPosition="center"
      buttonsClassName="pr-5 lg:pr-6 mr-5 sm:mr-[calc(100%-640px+20px)] md:mr-[calc(100%-768px+20px)] 
          lg:mr-[calc(100%-1024px+24px)] xl:mr-[calc(100%-1280px+24px)]"
    >
      {reviews.map((review) => (
        <SwiperSlide key={review.id}>
          <ReviewsCard review={review} />
        </SwiperSlide>
      ))}
    </SwiperWrapper>
  );
}
