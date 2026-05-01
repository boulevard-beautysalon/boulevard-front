import Container from "@/components/shared/container/Container";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
import CertVisual from "./CertVisual";

export default function Intro() {
  return (
    <section className="py-16 lg:py-25">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInAnimation({
              delay: 0.2,
              x: -70,
              opacity: 0.01,
              duration: 1.2,
            })}
          >
            <span className="block mb-5 text-[11px] tracking-[0.2em] uppercase text-brown">
              Vores gavekort
            </span>
            <h2 className="mb-5 font-evolenta text-[28px] lg:text-[44px] leading-[115%] font-normal uppercase text-black">
              Gavekort kan bruges til alle behandlinger i salonen Boulevard.
            </h2>
            <p className="text-[14px] lg:text-[16px] leading-[175%] font-light text-black/70">
              Vælg et gavekort, betal med MobilePay eller kort, og modtag det på
              e-mail med det samme efter betaling.
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInAnimation({
              delay: 0.4,
              scale: 0.9,
              opacity: 0.01,
              duration: 1.2,
            })}
          >
            <CertVisual />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
