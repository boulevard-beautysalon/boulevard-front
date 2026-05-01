"use client";

import { MouseEvent, useState } from "react";
import { SanityImage } from "@/types/service";
import Image from "next/image";
import { urlForSanityImage } from "@/utils/getUrlForSanityImage";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";
import { useRouter } from "next/navigation";

interface TextRevealCardProps {
  slide: {
    _key?: string;
    title: string;
    description: string;
    image: SanityImage | { link: string; alt: string };
    link: string;
  };
  isAboveTheFold?: boolean;
}

export default function TextRevealCard({
  slide,
  isAboveTheFold = false,
}: TextRevealCardProps) {
  const { title, description, image, link } = slide;
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const toggleExpand = () => setIsExpanded((prev) => !prev);
  const handleCardClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!link) return;

    const target = event.target as HTMLElement;
    if (target.closest("[data-stop-card-link='true']")) return;

    router.push(link);
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative flex h-[399px] flex-col justify-end rounded-[8px] cursor-pointer"
    >
      <Image
        src={
          typeof image === "object" && "link" in image
            ? image.link
            : urlForSanityImage(image).url()
        }
        alt={
          typeof image === "object" && "link" in image
            ? image.alt || title
            : image?.alt || title
        }
        fill
        loading={isAboveTheFold ? "eager" : "lazy"}
        fetchPriority={isAboveTheFold ? "high" : "auto"}
        className="-z-10 object-cover rounded-[8px]"
      />
      {link ? (
        <div
          aria-label="link button"
          className="absolute -top-3 -right-3 z-10 group flex justify-center items-center cursor-pointer size-15 rounded-full bg-black
        active:scale-95 transition duration-300 ease-in-out outline-none"
        >
          <ArrowIcon className="text-white xl:group-hover:translate-x-0.5 xl:group-hover:-translate-y-0.5 transition duration-300 ease-in-out" />
        </div>
      ) : null}
      <div
        data-stop-card-link="true"
        onClick={toggleExpand}
        className={`group relative flex flex-col justify-center min-h-24 px-4 rounded-[8px] bg-white/6 shadow-[inset_0px_4px_12.6px_rgba(255,255,255,0.12)] backdrop-blur-[38px] ${
          !isExpanded ? "max-h-30" : "max-h-full"
        } cursor-pointer transition-[max-height, padding] duration-500 ease-in ${
          isExpanded ? "py-6" : "py-9"
        }`}
      >
        <div className="inset-0 overflow-hidden">
          <h3 className="flex items-center min-h-12 font-evolenta text-[20px] font-light leading-[120%] uppercase text-white">
            {title}
          </h3>
          <p
            className={`whitespace-pre-line text-[14px] lg:text-[16px] font-light leading-[143%] lg:leading-[125%] text-white
            ${isExpanded ? "mt-6" : "mt-9"} transition-[margin] duration-500 ease-in-out
            `}
          >
            {description}
          </p>
        </div>
        <button
          type="button"
          aria-label="show full text button"
          onClick={(event) => {
            event.stopPropagation();
            toggleExpand();
          }}
          className={`absolute -top-4 left-4 size-[34px] flex justify-center items-center cursor-pointer rounded-full bg-white 
            transition duration-500 ease-in-out active:scale-95
            will-change-transform ${isExpanded ? "rotate-180" : "rotate-0"}`}
        >
          <ArrowIcon className="xl:group-hover:-translate-y-0.5 focus-visible:-translate-y-0.5 will-change-transform transition duration-500 ease-in-out text-black -rotate-45 size-4" />
        </button>
      </div>
    </div>
  );
}
