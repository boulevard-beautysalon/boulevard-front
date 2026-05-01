"use client";
import "swiper/css";
import "swiper/css/effect-coverflow";

import {
  ReactNode,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { EffectCoverflow } from "swiper/modules";
import { Swiper } from "swiper/react";
import { SwiperOptions } from "swiper/types";
import type { Swiper as SwiperType } from "swiper";
import type { SwiperModule } from "swiper/types";
import ShevronIcon from "@/components/shared/icons/ShevronIcon";
import { twMerge } from "tailwind-merge";

interface SwiperWrapperProps {
  children: ReactNode;
  breakpoints: SwiperOptions["breakpoints"];
  swiperClassName: string;
  loop?: boolean;
  uniqueKey?: string;
  buttonsPosition?: "right" | "center" | "onSlides";
  component?: ReactNode;
  additionalModules?: SwiperModule[];
  additionalOptions?: Partial<SwiperOptions>;
  showNavigation?: boolean;
  buttonsClassName?: string;
  showCoverflowEffect?: boolean;
  centeredSlides?: boolean;
  onSwiper?: (swiper: SwiperType) => void;
  onSlideChange?: (swiper: SwiperType) => void;
}

const EMPTY_ADDITIONAL_OPTIONS: Partial<SwiperOptions> = {};

const EMPTY_COVERFLOW_EFFECT: NonNullable<SwiperOptions["coverflowEffect"]> =
  {};

const buttonsPositionClass = {
  right: "sm:justify-end sm:ml-auto",
  center: "justify-center",
  onSlides:
    "absolute bottom-20 left-0 right-0 z-50 w-full justify-between",
};

export default function SwiperWrapper({
  children,
  breakpoints,
  swiperClassName,
  loop = false,
  buttonsPosition = "center",
  uniqueKey,
  component,
  additionalModules = [],
  additionalOptions = EMPTY_ADDITIONAL_OPTIONS,
  showNavigation = true,
  buttonsClassName,
  showCoverflowEffect = false,
  centeredSlides = false,
  onSwiper,
  onSlideChange,
}: SwiperWrapperProps) {
  const swiperInstanceRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  /** Коли true — усі слайди вміщуються (watchOverflow); стрілки ховаємо самі, без класів Swiper. */
  const [isLocked, setIsLocked] = useState(false);

  const syncSlideState = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
    setIsLocked(swiper.isLocked);
  };

  const handlePrevClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const s = swiperInstanceRef.current;
    if (!s || (s.isBeginning && !s.params.loop)) return;
    s.slidePrev();
  };

  const handleNextClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const s = swiperInstanceRef.current;
    if (!s || (s.isEnd && !s.params.loop)) return;
    s.slideNext();
  };

  return (
    <>
      <Swiper
        key={`${uniqueKey}-swiper`}
        onSwiper={(swiper) => {
          swiperInstanceRef.current = swiper;
          syncSlideState(swiper);
          const sync = () => syncSlideState(swiper);
          swiper.on("lock", sync);
          swiper.on("unlock", sync);
          swiper.on("resize", sync);
          onSwiper?.(swiper);
        }}
        onSlideChange={(swiper) => {
          syncSlideState(swiper);
          onSlideChange?.(swiper);
        }}
        centeredSlides={centeredSlides}
        breakpoints={breakpoints}
        navigation={false}
        loop={loop}
        speed={1000}
        coverflowEffect={
          showCoverflowEffect
            ? {
                rotate: 0,
                depth: 100,
                stretch: 0,
                modifier: 1,
                slideShadows: false,
              }
            : EMPTY_COVERFLOW_EFFECT
        }
        effect={showCoverflowEffect ? "coverflow" : ""}
        modules={[
          ...(showCoverflowEffect ? [EffectCoverflow] : []),
          ...additionalModules,
        ]}
        className={swiperClassName}
        {...additionalOptions}
      >
        {children}
      </Swiper>
      {showNavigation && !isLocked && (
        <div
          key={`${uniqueKey}-buttons`}
          className={twMerge(
            `flex flex-col-reverse gap-10 mb-0.5`,
            buttonsClassName,
          )}
        >
          {component}
          <div
            className={`flex gap-3 items-center pointer-events-none ${buttonsPositionClass[buttonsPosition]}`}
          >
            <button
              type="button"
              disabled={isBeginning && !loop}
              aria-label="Forrige slide"
              className={twMerge(
                `custom-prev relative z-[30] group size-[54px] rounded-full flex items-center justify-center pointer-events-auto border border-black
             bg-white disabled:bg-white enabled:bg-black disabled:cursor-default enabled:cursor-pointer transition duration-300 xl:enabled:hover:opacity-80`,
                buttonsPosition === "onSlides"
                  ? "scale-60 border-transparent enabled:bg-white/10 enabled:shadow-[inset_0px_4px_12.6px_0px_rgba(255,255,255,0.25)] backdrop-blur-[10px]"
                  : "",
              )}
              onClick={handlePrevClick}
            >
              {buttonsPosition === "onSlides" ? (
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
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
              ) : null}
              <ShevronIcon className="relative z-[30] -rotate-90 group-enabled:text-white group-disabled:text-black mr-1 pointer-events-auto" />
            </button>
            <button
              type="button"
              disabled={isEnd && !loop}
              aria-label="Næste slide"
              className={twMerge(
                `custom-next relative z-[30] group size-[54px] rounded-full flex items-center justify-center pointer-events-auto border border-black
             bg-white disabled:bg-white enabled:bg-black disabled:cursor-default enabled:cursor-pointer transition duration-300 xl:enabled:hover:opacity-80`,
                buttonsPosition === "onSlides"
                  ? "scale-60 border-transparent enabled:bg-white/10 enabled:shadow-[inset_0px_4px_12.6px_0px_rgba(255,255,255,0.25)] backdrop-blur-[10px]"
                  : "",
              )}
              onClick={handleNextClick}
            >
              {buttonsPosition === "onSlides" ? (
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
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
              ) : null}
              <ShevronIcon className="rotate-90 group-enabled:text-white group-disabled:text-black ml-1 pointer-events-auto" />
            </button>
          </div>
        </div>
      )}
      {!showNavigation && component && (
        <div key={`${uniqueKey}-component`}>{component}</div>
      )}
    </>
  );
}
