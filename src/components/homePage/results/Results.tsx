import Container from "@/components/shared/container/Container";
import Image from "next/image";
import type { ResultsData } from "@/types/results";
import ResultsSlider from "./ResultsSlider";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

interface ResultsProps {
  data: ResultsData | null;
}

export default function Results({ data }: ResultsProps) {
  const cards = data?.cards?.filter(Boolean) ?? [];

  return (
    <section className="mb-[54px]">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInAnimation({ x: -50, delay: 0.3, duration: 1.3 })}
          className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between mb-8 lg:mb-[50px]"
        >
          <Image
            src="/images/homePage/results/decor.webp"
            alt="Results"
            width={270}
            height={116}
          />
          <h2 className="md:max-w-[380px] lg:max-w-[600px] xl:max-w-[825px] font-evolenta text-[26px] lg:text-[48px] leading-[120%] font-light text-right uppercase text-black">
            Se resultater fra vores kunder før og efter behandlinger
          </h2>
        </motion.div>

        {cards.length > 0 ? (
          <motion.div
            key={`home-page-sevices-text-reveal-card-slider}`}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInAnimation({ y: 30, scale: 0.95, delay: 0.6 })}
            className="w-screen max-w-[1455px]"
          >
            <ResultsSlider cards={cards} />
          </motion.div>
        ) : null}
      </Container>
    </section>
  );
}
