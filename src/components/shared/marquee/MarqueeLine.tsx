"use client";
import Marquee from "react-fast-marquee";
// import * as motion from "motion/react-client";
// import { headerVariants } from "@/utils/animationVariants";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface MarqueeLineProps {
  variant?: "brown" | "black";
  className?: string;
}

export default function MarqueeLine({
  className = "",
  variant = "brown",
}: MarqueeLineProps) {
  return (
    <Marquee
      autoFill={true}
      speed={70}
      className={twMerge(
        clsx(
          `h-[42px] lg:h-[62px] font-evolenta text-[18px] text-beige uppercase leading-none ${
            variant === "brown" ? "bg-brown" : "bg-black"
          }`,
          className,
        ),
      )}
    >
      <span className="inline-block mx-[7.15px] lg:mx-[13px]">Boulevard</span>
      <span className="inline-block mx-[7.15px] lg:mx-[13px]">Boulevard</span>
      <span className="inline-block mx-[7.15px] lg:mx-[13px]">Boulevard</span>
    </Marquee>
  );
}
