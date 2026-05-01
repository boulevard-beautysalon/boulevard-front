import Container from "@/components/shared/container/Container";
import FaqList from "@/components/shared/faq/FaqList";
import type { FaqSection } from "@/types/faq";
import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

interface FaqProps {
  faq?: FaqSection;
}

export default function Faq({ faq }: FaqProps) {
  if (!faq || !faq.items || faq.items.length === 0) return null;
  const { description, items } = faq;

  return (
    <section className="pb-30 lg:pb-[150px]">
      <Container className="relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({
            delay: 0.9,
            x: -40,
            rotate: -5,
            duration: 1,
          })}
          className="absolute -z-10 top-[155px] lg:top-[68px] left-[-73px] w-[253px] lg:w-[292px] h-auto aspect-[292/640]"
        >
          <Image
            src="/images/homePage/faq/decor-left.webp"
            alt="Decor"
            width={292}
            height={640}
            className="w-[253px] lg:w-[292px] h-auto"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({
            delay: 1.2,
            x: 40,
            rotate: 5,
            duration: 1,
          })}
          className="absolute -z-10 bottom-[-100px] lg:bottom-[-94px] right-[-212px] lg:right-[-76px] w-[348px] lg:w-[705px] h-auto aspect-[705/470]"
        >
          <Image
            src="/images/homePage/faq/decor-right.webp"
            alt="Decor"
            width={705}
            height={470}
            className="w-[348px] lg:w-[705px] h-auto"
          />
          <div className="absolute bottom-5 -right-15 w-[98px] h-[198px] bg-beige blur-[15px] rounded-full" />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({
            delay: 0.2,
            x: 40,
            duration: 1,
          })}
          className="absolute top-[-19px] lg:top-[-24px] right-[-39px] lg:right-[-28px] w-[189px] lg:w-[270px] h-auto aspect-[270/116]"
        >
          <Image
            src="/images/homePage/faq/decor.webp"
            alt="Decor"
            width={270}
            height={116}
            className="w-[189px] lg:w-[270px] h-auto"
          />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({
            delay: 0.2,
            x: -40,
            duration: 1,
          })}
          className="flex flex-col md:flex-row md:items-center gap-6 md:gap-16 lg:gap-[70px] mb-[115px] lg:mb-[52px]"
        >
          <h2 className="font-evolenta text-[36px] lg:text-[64px] leading-[120%] font-normal uppercase text-black">
            FAQ
          </h2>
          {description && (
            <div className="flex items-center gap-6 lg:gap-[55px] max-w-[280px] md:max-w-[340px] lg:max-w-[460px]">
              <div className="size-4.5 rounded-full bg-black shrink-0" />
              <p>{description}</p>
            </div>
          )}
        </motion.div>
        <FaqList items={items} />
      </Container>
    </section>
  );
}
