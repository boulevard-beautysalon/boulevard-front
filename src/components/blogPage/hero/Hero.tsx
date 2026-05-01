import Image from "next/image";
import Container from "@/components/shared/container/Container";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full pt-[128px] lg:pt-[219px] pb-[56px] lg:pb-[120px]"
    >
      <div
        className="absolute -z-10 inset-0 w-full h-full rounded-b-[36px]"
        style={{
          background: `linear-gradient(0deg, rgba(0,0,0,0) -36.89%, rgba(0,0,0,0.464) 91.14%, rgba(0,0,0,0) 144.39%),
                 linear-gradient(240.18deg, rgba(0,0,0,0) 19.24%, rgba(0,0,0,0.8) 82.96%)`,
        }}
      />
      <div className="absolute -z-20 inset-0 w-full h-full rounded-b-[36px] overflow-hidden">
        <Image
          src="/images/blogPage/hero/image.webp"
          alt="Hero"
          fill
          priority
          fetchPriority="high"
          className="object-cover"
        />
      </div>
      <Container>
        {" "}
        <motion.h1
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({
            scale: 0.95,
            delay: 0.3,
            x: 70,
            opacity: 0.01,
          })}
          className="max-w-[239px] lg:max-w-[497px] mb-6 lg:mb-9 font-evolenta text-[24px] lg:text-[48px] leading-[120%] font-normal uppercase text-beige"
        >
          Blog om hudpleje og skønhed i Horsens
        </motion.h1>
        <motion.p
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({
            scale: 0.95,
            delay: 0.4,
            x: -70,
            opacity: 0.01,
          })}
          className="max-w-[239px] lg:max-w-[325px] mb-6 lg:mb-9 text-[14px] lg:text-[16px] leading-[120%] font-light text-beige"
        >
          Vi deler tips, guides og viden om hudpleje og behandlinger, så du kan
          vælge de rigtige løsninger og få sundere og smukkere hud.
        </motion.p>
      </Container>
    </section>
  );
}
