import Container from "@/components/shared/container/Container";
import Image from "next/image";
import Button from "@/components/shared/buttons/Button";
import StarIcon from "@/components/shared/icons/StarIcon";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
import type { WorkingHours } from "@/types/workingHours";
import { formatWorkingHoursDisplay } from "@/utils/formatWorkingHoursDisplay";

export default function Prices({ from, to }: WorkingHours) {
  const workingHours = formatWorkingHoursDisplay({ from, to });

  return (
    <section id="opening-hours" className="pb-20 lg:pb-[116px] scroll-mt-30">
      <Container className="relative rounded-[36px] overflow-hidden">
        <Image
          src="/images/homePage/price/image-mob.webp"
          alt="Price"
          fill
          className="lg:hidden -z-10 object-cover lg:object-[right_59%] rounded-[36px]"
        />
        <Image
          src="/images/homePage/price/image.webp"
          alt="Price"
          fill
          className="hidden lg:block -z-10 object-cover lg:object-[right_59%] rounded-[36px] lg:scale-102"
        />
        <div className="pt-15 pb-5 lg:pb-[65px]">
          <div className="flex flex-col lg:flex-row gap-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeInAnimation({
                delay: 0.2,
                y: 40,
                duration: 1.5,
              })}
            >
              <h2 className="mb-7 lg:mb-[54px] font-evolenta text-[36px] lg:text-[64px] leading-[120%] font-normal uppercase text-beige">
                Priser på behandlinger
              </h2>
              <Button
                href="/services"
                variant="black"
                className="w-full sm:w-[238px] h-[68px]"
              >
                Se priser
              </Button>
            </motion.div>

            <div className="relative">
              <StarIcon className="hidden lg:block absolute -z-10 top-[-25px] right-[-22px] lg:size-[67px] text-beige" />
              <div className="relative pt-9 pb-6 px-6 rounded-[28px] bg-white/10 shadow-[inset_0px_4px_12.6px_0px_rgba(255,255,255,0.25)] backdrop-blur-[10px]">
                <StarIcon className="hidden lg:block absolute z-10 bottom-[-30px] left-[-30px] lg:size-[67px] text-beige" />
                <div
                  className="absolute inset-0 rounded-[28px] pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(270.67deg, #F2F2F2 -9.58%, #C7C7C7 103.45%)",
                    padding: "1px",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />
                <h3 className="mb-9 lg:mb-12 font-evolenta text-[32px] leading-[120%] font-normal uppercase text-beige">
                  Du kan komme både med og uden tidsbestilling.
                </h3>
                <div className="lg:flex py-9 lg:py-3.5 px-7 lg:px-0 rounded-[16px] bg-beige font-evolenta text-[20px] lg:text-[32px] leading-[120%] uppercase text-black text-center">
                  <h4 className="lg:w-1/2 mb-9  h-fit lg:my-auto font-evolenta text-[20px] leading-[120%] font-normal uppercase text-black">
                    Åbningstider
                  </h4>
                  <div className="relative mb-9 lg:mb-0 lg:w-[1px] shrink-0">
                    <div className="absolute -top-[2px] -left-0.5 size-[5px] bg-black rounded-full" />
                    <div className="h-[1px] lg:w-[1px] lg:h-[69px] bg-black" />
                    <div className="absolute -bottom-[2px] -right-0.5 size-[5px] bg-black rounded-full" />
                  </div>
                  <p className="lg:w-1/2 h-fit lg:my-auto font-evolenta text-[20px] leading-[120%] font-normal uppercase text-black">
                    {workingHours}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
