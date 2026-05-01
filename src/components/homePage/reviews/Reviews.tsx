import Container from "@/components/shared/container/Container";
import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
import ReviewsSlider from "./ReviewsSlider";
import StarIcon from "@/components/shared/icons/StarIcon";
import type { Review } from "@/types/review";

interface ReviewsProps {
  reviews: Review[];
}

export default function Reviews({ reviews }: ReviewsProps) {
  if (!reviews.length) return null;

  return (
    <section className="pb-[54px] lg:pb-15">
      <Container className="relative py-9 mb-7 lg:mb-8">
        <Image
          src="/images/homePage/reviews/image-mob.webp"
          alt="Reviews"
          fill
          className="md:hidden -z-10 object-cover rounded-[28px]"
        />
        <Image
          src="/images/homePage/reviews/image.webp"
          alt="Reviews"
          fill
          className="hidden md:block -z-10 object-cover rounded-[28px]"
        />
        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({ delay: 0.2, duration: 1, x: -30 })}
            className="font-evolenta text-[36px] lg:text-[64px] leading-[120%] font-normal uppercase text-black"
          >
            Anmeldelser
          </motion.h2>
          <motion.div
            className="flex items-center gap-6 max-w-[173px]"
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({ delay: 0.4, duration: 1, x: 30 })}
          >
            <div className="size-4.5 rounded-full bg-black shrink-0" />
            <p className="text-[14px] leading-[120%] font-light text-black">
              Hvad vores kunder siger om os
            </p>
          </motion.div>
        </div>
      </Container>

      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({ delay: 0.6, duration: 1, y: 30 })}
          className="relative w-screen max-w-[1455px]"
        >
          <ReviewsSlider reviews={reviews} uniqueKey="home-reviews" />
          <StarIcon className="hidden lg:block absolute z-10 bottom-[54px] left-[338px] size-[67px] rotate-45" />
        </motion.div>
      </Container>
    </section>
  );
}
