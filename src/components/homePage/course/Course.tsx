import Button from "@/components/shared/buttons/Button";
import Container from "@/components/shared/container/Container";
import StarIcon from "@/components/shared/icons/StarIcon";
import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

export default function Course() {
  return (
    <section className="pb-25 lg:pb-[116px]">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({
            delay: 0.2,
            x: -70,

            duration: 1.5,
          })}
          className="flex flex-col gap-8 sm:gap-5 sm:flex-row-reverse mb-9 lg:mb-[54px]"
        >
          <div className="sm:w-[267px] relative">
            <StarIcon className="absolute -top-[15px] -right-[15px] -z-10 size-[53px] text-brown" />
            <div className="relative rounded-t-[20px] rounded-b-[40px] bg-white/10 shadow-[inset_0px_4px_12.6px_rgba(255,255,255,0.12)] backdrop-blur-[2px]">
              <div
                className="absolute inset-0 rounded-t-[20px] rounded-b-[40px] pointer-events-none"
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
              <div className="pt-6 px-6">
                <h2 className="mb-8 font-evolenta text-[32px] leading-[120%] font-normal uppercase text-black">
                  Voks kursus og gavekort
                </h2>
                <p className="mb-8 lg:mb-[65px] text-[14px] lg:text-[14px] leading-[120%] font-normal text-black">
                  Bliv certificeret behandler med vores professionelle voks
                  kursus
                </p>
              </div>
              <Button
                href="https://www.learnwax.eu/"
                linkType="external"
                variant="brown"
                className="w-full h-[68px]"
              >
                Se kursus detaljer
              </Button>
            </div>
          </div>

          <div className="relative sm:w-[calc(100%-267px-20px)] h-[150px] xs:h-50 sm:h-auto rounded-[16px] overflow-hidden">
            <Image
              src="/images/homePage/course/imageOne.webp"
              alt="Course image"
              fill
              className="object-cover object-[center_73%]"
            />
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({
            delay: 0.2,
            x: 70,

            duration: 1.5,
          })}
          className="flex flex-col gap-8 sm:gap-5 sm:flex-row"
        >
          <div className="relative sm:w-[267px]">
            <div className="absolute top-6 right-6 z-10 size-4.5 bg-black rounded-full shrink-0" />
            <div className="relative rounded-t-[20px] rounded-b-[40px] bg-white/10 shadow-[inset_0px_4px_12.6px_rgba(255,255,255,0.12)] backdrop-blur-[2px]">
              <div
                className="absolute inset-0 rounded-t-[20px] rounded-b-[40px] pointer-events-none"
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
              <div className="pt-6 px-6">
                <h2 className="mb-9 font-evolenta text-[32px] leading-[120%] font-normal uppercase text-black">
                  Køb et gavekort til enhver behandling i salon Boulevard
                </h2>
              </div>
              <Button
                href="/gavekort"
                variant="black"
                className="w-full h-[68px]"
              >
                Bestil gavekort
              </Button>
            </div>
          </div>

          <div className="relative sm:w-[calc(100%-267px-20px)] h-[150px] xs:h-50 sm:h-auto rounded-[16px] overflow-hidden">
            <Image
              src="/images/homePage/course/imageTwo.webp"
              alt="Course image"
              fill
              className="object-cover object-[center_65%]"
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
