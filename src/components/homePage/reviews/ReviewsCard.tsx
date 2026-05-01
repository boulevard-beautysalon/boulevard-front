import Image from "next/image";
import { Rating } from "react-simple-star-rating";
import ReviewStarEmptyIcon from "@/components/shared/icons/ReviewStarEmptyIcon";
import ReviewStarFilledIcon from "@/components/shared/icons/ReviewStarFilledIcon";
import type { Review } from "@/types/review";

interface ReviewsCardProps {
  review: Review;
}

export default function ReviewsCard({ review }: ReviewsCardProps) {
  return (
    <div className="relative h-full w-full rounded-[8px] p-px">
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-[8px]"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-black), var(--color-brown))",
          padding: "1px",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div className="flex h-full w-full flex-col rounded-[8px] p-5">
        <div className="mb-8 flex gap-[15px]">
          <Image
            src={review.avatarSrc}
            alt={review.name}
            width={52}
            height={52}
            className="size-[52px] shrink-0 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="mb-2 text-[16px] leading-[125%] md:text-[18px] md:leading-[111%]">
              {review.name}
            </p>
            <Rating
              initialValue={review.rating}
              allowFraction
              readonly
              className="flex items-center"
              emptyIcon={
                <ReviewStarEmptyIcon className="mx-0.5 inline-block size-5 md:size-[22px]" />
              }
              fillIcon={
                <ReviewStarFilledIcon className="mx-0.5 inline-block size-5 md:size-[22px]" />
              }
            />
          </div>
        </div>
        <div className="flex h-full items-center">
          <p className="text-[12px] font-light leading-[167%] whitespace-pre-line">
            {review.text}
          </p>
        </div>
      </div>
    </div>
  );
}
