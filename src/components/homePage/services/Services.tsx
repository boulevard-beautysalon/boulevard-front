import Container from "@/components/shared/container/Container";
import TextRevealCardsSlider from "@/components/homePage/services/TextRevealCardsSlider";
import type { Service } from "@/types/service";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

interface ServicesProps {
  services: Service[];
}

export default function Services({ services }: ServicesProps) {
  const slides = services
    ?.filter((service) => {
      if (service.hideOnHome === true) return false;
      const text = service.homePageDescription?.trim() ?? "";
      return Boolean(service.homePageImage && text);
    })
    .map((service) => ({
      _key: service._id,
      title: service.title,
      description: service.homePageDescription?.trim() ?? "",
      image: service.homePageImage!,
      link: `/services#${service.slug}`,
    }));

  return (
    <section id="services" className="pb-20 lg:pb-[116px] scroll-mt-30">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:justify-between md:items-start mb-9 lg:mb-[65px]">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({ scale: 0.95, delay: 0.3, x: -70 })}
            className="md:max-w-[400px] lg:max-w-[600px] xl:max-w-[787px] font-evolenta text-[28px] lg:text-[48px] leading-[120%] font-normal uppercase text-black"
          >
            Ansigtsbehandling, manicure, lash lift, bryn og voks
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({ scale: 0.95, delay: 0.3, x: 70 })}
            className="flex items-center gap-6 max-w-[199px]"
          >
            <div className="size-4.5 bg-black rounded-full shrink-0" />{" "}
            <p className="text-[14px] lg:text-[14px] leading-[120%] font-normal text-black">
              Vælg den behandling, der passer til dig
            </p>
          </motion.div>
        </div>
        <motion.div
          key={`home-page-sevices-text-reveal-card-slider}`}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInAnimation({ y: 30, scale: 0.95, delay: 0.6 })}
          className="w-screen max-w-[1455px]"
        >
          <TextRevealCardsSlider slides={slides} />
        </motion.div>
      </Container>
    </section>
  );
}
