import Image from "next/image";
import Container from "@/components/shared/container/Container";
import Button from "@/components/shared/buttons/Button";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

export default function Hero() {
  return (
    <section
      id="gavekort-hero"
      className="relative w-full pt-[160px] lg:pt-[184px] pb-12 lg:pb-20 min-h-[600px] lg:min-h-[720px]"
    >
      <div
        className="absolute -z-10 inset-0 w-full h-full rounded-b-[36px]"
        style={{
          background: `linear-gradient(0deg, rgba(0,0,0,0) -36.89%, rgba(0,0,0,0.55) 91.14%, rgba(0,0,0,0) 144.39%),
                       linear-gradient(240.18deg, rgba(0,0,0,0) 19.24%, rgba(0,0,0,0.78) 82.96%)`,
        }}
      />
      <div className="absolute -z-20 inset-0 w-full h-full rounded-b-[36px] overflow-hidden">
        <Image
          src="/images/gavekortPage/hero/bg-desk.webp"
          alt="Boulevard salon interior"
          fill
          priority
          fetchPriority="high"
          sizes="(max-width: 768px) 100vw, 100vw"
          className="hidden md:block object-cover object-[center_55%]"
        />
        <Image
          src="/images/gavekortPage/hero/bg-mob.webp"
          alt="Boulevard salon interior"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="md:hidden object-cover object-[center_55%]"
        />
      </div>

      <Container>
        <div className="max-w-[680px]">
          <motion.span
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({
              delay: 0.1,
              y: -10,
              opacity: 0.01,
              duration: 1,
            })}
            className="block mb-5 text-[11px] tracking-[0.22em] uppercase text-beige/70"
          >
            Gavekort · Boulevard
          </motion.span>
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
            className="mb-6 lg:mb-8 font-evolenta text-[36px] sm:text-[48px] lg:text-[64px] leading-[110%] font-normal uppercase text-beige"
          >
            Gavekort til skønheds&shy;behandlinger i Horsens
          </motion.h1>
          <motion.p
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({
              delay: 0.5,
              x: 70,
              opacity: 0.01,
              duration: 1.2,
            })}
            className="mb-8 lg:mb-10 max-w-[440px] text-[14px] lg:text-[16px] leading-[170%] font-light text-beige/80"
          >
            Giv en, du holder af, en skøn oplevelse hos Boulevard. Vælg et
            gavekort og modtag det direkte på e-mail efter køb.
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({
              delay: 0.9,
              y: 20,
              scale: 0.85,
              opacity: 0.01,
              duration: 1.1,
            })}
            className="xs:w-fit"
          >
            <Button
              href="#gavekort-list"
              variant="beige"
              className="w-full xs:w-[270px] h-15 lg:h-[68px]"
            >
              Køb gavekort
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
