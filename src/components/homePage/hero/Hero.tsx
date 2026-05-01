"use client";

import type { MouseEventHandler } from "react";
import { usePathname } from "next/navigation";

import Button from "@/components/shared/buttons/Button";
import HeroGallerySlider from "./HeroGallerySlider";
import { HERO_GALLERY_IMAGES } from "./heroImages";
import Container from "@/components/shared/container/Container";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
import SmallHeroSlider from "./SmallHeroSlider";

export default function Hero() {
  const pathname = usePathname();
  const isHomePage = pathname === "/" || pathname === "";

  const scrollToServices: MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (!isHomePage) return;
    e.preventDefault();
    document.getElementById("services")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    window.history.replaceState(null, "", "/#services");
  };
  return (
    <section
      id="hero"
      className="relative w-full min-h-[882px] sm:min-h-[610px] lg:min-h-[779px] mb-25 lg:mb-[116px]"
    >
      <div
        className="absolute -z-10 inset-0 w-full h-full rounded-b-[36px]"
        style={{
          background: `linear-gradient(136.34deg, rgba(0, 0, 0, 0.4) 18.74%, rgba(0, 0, 0, 0) 59.19%),
                 linear-gradient(200.07deg, rgba(0, 0, 0, 0.4) 36.67%, rgba(0, 0, 0, 0) 65.78%)`,
        }}
      />
      <div className="absolute -z-20 inset-0 w-full h-full rounded-b-[36px] overflow-hidden">
        <HeroGallerySlider images={HERO_GALLERY_IMAGES} />
      </div>

      <Container className="relative pt-[134px] lg:pt-[151px]">
        <motion.h1
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({
            delay: 0.2,
            x: -70,
            opacity: 0.01,
            duration: 1.5,
          })}
          className="max-w-[430px] sm:max-w-[517px] mb-9 font-evolenta text-[40px] lg:text-[72px] leading-[120%] font-normal uppercase text-beige"
        >
          Beauty Salon Boulevard i Horsens
        </motion.h1>
        <motion.p
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({
            delay: 0.6,
            x: 70,
            opacity: 0.01,
            duration: 1.5,
          })}
          className="mb-20 lg:mb-[54px] max-w-[270px] text-beige"
        >
          Ansigtsbehandlinger, lash lift, brow lamination, manicure, pedicure og
          voks
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({
            delay: 1.2,
            y: 20,
            scale: 0.75,
            duration: 1.2,
            opacity: 0.01,
          })}
          className="xs:w-fit"
        >
          <Button
            href="/#services"
            variant="beige"
            className="w-full xs:w-[270px] h-15 lg:h-[68px]"
            onClick={scrollToServices}
          >
            Vælg behandling
          </Button>
        </motion.div>
        <SmallHeroSlider />
      </Container>
    </section>
  );
}
