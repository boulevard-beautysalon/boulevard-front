import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";
import * as motion from "motion/react-client";
import Button from "@/components/shared/buttons/Button";
import Container from "@/components/shared/container/Container";
import { urlForImage } from "@/lib/sanityClient";
import type { SanityImage, Service } from "@/types/service";
import { fadeInAnimation } from "@/utils/animationVariants";
import { twMerge } from "tailwind-merge";
import DecorativeEllipsis from "./DecorativeEllipsis";

const LAYOUT_FALLBACK_W = 2400;
const LAYOUT_FALLBACK_H = 1600;

const VIEWPORT = { once: true, amount: 0.15 } as const;

function serviceImageUrl(source: SanityImage | undefined) {
  if (!source?.asset) return null;
  return urlForImage(source as SanityImageSource)
    .quality(100)
    .url();
}

function imageLayoutBox() {
  return { width: LAYOUT_FALLBACK_W, height: LAYOUT_FALLBACK_H };
}

export interface ServiceSectionProps {
  service: Service;
  /** Перша секція в списку services — без додаткового margin-top; для інших — відступ між блоками */
  isFirst?: boolean;
}

export default function ServiceSection({
  service,
  isFirst = false,
}: ServiceSectionProps) {
  const side = service.desktopImageSide ?? "left";

  const mobileRef =
    service.servicesPageImageMobile ?? service.servicesPageImageDesktop;
  const desktopRef =
    service.servicesPageImageDesktop ?? service.servicesPageImageMobile;

  const mobileSrc = serviceImageUrl(mobileRef);
  const desktopSrc = serviceImageUrl(desktopRef);
  const mobileLayout = imageLayoutBox();
  const desktopLayout = imageLayoutBox();

  const mobileAlt = mobileRef?.alt ?? service.title;
  const desktopAlt = desktopRef?.alt ?? service.title;

  const btn = service.button;

  return (
    <section
      id={service.slug}
      className={twMerge("pb-25 scroll-mt-24 lg:pb-[152px] lg:scroll-mt-36")}
    >
      <Container>
        <div
          className={twMerge(
            "flex flex-col gap-8 sm:flex-row-reverse sm:items-center sm:gap-9",
            side === "right" && "sm:flex-row",
          )}
        >
          <div className="flex min-w-0 flex-1 flex-col">
            <DecorativeEllipsis
              uniqueKey={`service-${service._id}`}
              className="mb-4 sm:mb-9"
            />
            <motion.h2
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={VIEWPORT}
              variants={fadeInAnimation({ y: 20, delay: 0 })}
              className="mb-4 font-evolenta text-[24px] font-normal uppercase leading-[120%] text-black lg:mb-9 lg:text-[48px]"
            >
              {service.title}
            </motion.h2>
            {mobileSrc ? (
              <motion.div
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={VIEWPORT}
                variants={fadeInAnimation({ y: 16, delay: 0.08 })}
                className="mb-8 sm:hidden"
              >
                <Image
                  src={mobileSrc}
                  alt={mobileAlt}
                  width={mobileLayout.width}
                  height={mobileLayout.height}
                  sizes="100vw"
                  className="w-full rounded-[12px]"
                />
              </motion.div>
            ) : null}
            {service.servicesPageDescription?.trim() ? (
              <motion.p
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={VIEWPORT}
                variants={fadeInAnimation({ y: 16, delay: 0.14 })}
                className="mb-10 whitespace-pre-line lg:mb-9"
              >
                {service.servicesPageDescription}
              </motion.p>
            ) : null}
            {btn?.url && btn.label ? (
              <motion.div
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={VIEWPORT}
                variants={fadeInAnimation({ y: 12, delay: 0.2 })}
              >
                <Button href={btn.url} variant="black" className="w-full">
                  {btn.label}
                </Button>
              </motion.div>
            ) : null}
          </div>

          {desktopSrc && mobileSrc ? (
            <>
              <motion.div
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={VIEWPORT}
                variants={fadeInAnimation({ y: 20, delay: 0.1 })}
                className="hidden h-auto w-[calc(50%-18px)] sm:block lg:hidden"
              >
                <Image
                  src={mobileSrc}
                  alt={mobileAlt}
                  width={mobileLayout.width}
                  height={mobileLayout.height}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-auto w-full rounded-[12px] object-cover"
                />
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={VIEWPORT}
                variants={fadeInAnimation({ y: 20, delay: 0.14 })}
                className="hidden h-auto w-[calc(50%-18px)] lg:block"
              >
                <Image
                  src={desktopSrc}
                  alt={desktopAlt}
                  width={desktopLayout.width}
                  height={desktopLayout.height}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-auto w-full rounded-[12px] object-cover"
                />
              </motion.div>
            </>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
