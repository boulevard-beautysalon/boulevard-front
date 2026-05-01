"use client";

import FaqItem from "@/components/shared/faq/FaqItem";
import type { FaqItem as FaqItemType } from "@/types/faq";
import { useState } from "react";
import ThinStarIcon from "@/components/shared/icons/ThinStarIcon";

interface FaqListProps {
  items: FaqItemType[];
}

export default function FaqList({ items }: FaqListProps) {
  const INITIAL_VISIBLE_ITEMS = 5;
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleItems = items.slice(0, INITIAL_VISIBLE_ITEMS);
  const hiddenItems = items.slice(INITIAL_VISIBLE_ITEMS);
  const hasHiddenItems = hiddenItems.length > 0;

  return (
    <div className="flex flex-col gap-6">
      {visibleItems.map((faqItem, idx) => (
        <FaqItem key={faqItem._key ?? idx} faqItem={faqItem} />
      ))}

      {hasHiddenItems ? (
        <>
          {!isExpanded ? (
            <button
              type="button"
              onClick={() => setIsExpanded(true)}
              className="relative flex max-w-[280px] cursor-pointer items-center justify-between gap-6 rounded-full bg-white/10 px-8 py-[29px] text-left shadow-[inset_0px_4px_12.6px_0px_rgba(255,255,255,0.25)] backdrop-blur-[10px] transition-colors duration-700 ease-in-out hover:bg-purple-ultra-light lg:py-8"
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-full"
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
              <span className="text-[16px] font-medium leading-[120%] lg:text-[20px]">
                Vis mere
              </span>
              <ThinStarIcon className="size-5 shrink-0 text-purple transition duration-300 ease-in-out lg:size-8" />
            </button>
          ) : null}

          <div
            className={`grid overflow-hidden transition duration-700 ease-in-out ${
              isExpanded
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="flex flex-col gap-6">
                {hiddenItems.map((faqItem, idx) => (
                  <FaqItem
                    key={faqItem._key ?? `${idx + INITIAL_VISIBLE_ITEMS}`}
                    faqItem={faqItem}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
