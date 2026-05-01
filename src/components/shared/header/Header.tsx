"use client";

import { useState } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";
import Container from "../container/Container";
import NavMenu from "./NavMenu";
import StarIcon from "../icons/StarIcon";
import Button from "../buttons/Button";
import BurgerMenu from "./burgerMenu/BurgerMenu";
import Link from "next/link";
import ContactFormModal from "../contactFormModal/ContactFormModal";

export default function Header() {
  const [isOpenBurgerMenu, setIsOpenBurgerMenu] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrollPosition(latest);
  });

  return (
    <header className="fixed z-50 left-0 right-0 top-0 z-50 py-6 lg:py-8">
      <Container className="relative z-10 flex items-center justify-between rounded-full">
        <div
          className={`pointer-events-none absolute inset-0 -z-10 transition-opacity duration-300 ease-in-out ${
            scrollPosition > 20 ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden
        >
          <div
            className="absolute w-[calc(100%-8px)] h-[calc(100%+8px)] -top-1 left-1 px-4 -z-10 rounded-full bg-black/60 shadow-[inset_0px_4px_12.6px_0px_rgba(255,255,255,0.25)] backdrop-blur-[10px]"
            aria-hidden
          />
          <div
            className="absolute w-[calc(100%-8px)] h-[calc(100%+8px)] -top-1 left-1 -z-10 rounded-full pointer-events-none"
            style={{
              background:
                "linear-gradient(270.67deg, #F2F2F2 -9.58%, #C7C7C7 103.45%)",
              padding: "1px",
              opacity: 0.5,
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
            aria-hidden
          />
        </div>
        <div className={`relative z-50 py-2`}>
          <Link
            href="/#hero"
            className={`relative z-50 ${isOpenBurgerMenu ? "text-black" : "text-beige"} outline-none transition duration-300 ease-in-out font-evolenta text-[18px] lg:text-[24px] leading-[120%] font-normal uppercase`}
          >
            Boulevard
          </Link>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="reltive z-50 flex items-center gap-4 lg:gap-8 xl:gap-[78px]">
            <NavMenu />
            <StarIcon
              className={`${isOpenBurgerMenu ? "text-black" : "text-beige"} transition duration-300 ease-in-out size-[21px] lg:size-[37px] `}
            />
            <Button
              href="/services"
              className="w-[119px] h-12 lg:w-[200px] lg:h-[57px] shrink-0"
              onClick={() => setIsOpenBurgerMenu(false)}
            >
              Book tid
            </Button>
          </div>
          <BurgerMenu
            isOpenBurgerMenu={isOpenBurgerMenu}
            setIsOpenBurgerMenu={setIsOpenBurgerMenu}
            onContactClick={() => setIsContactModalOpen(true)}
          />
        </div>
      </Container>
      <ContactFormModal
        isModalShown={isContactModalOpen}
        setIsModalShown={setIsContactModalOpen}
        source="Kontakt os"
      />
    </header>
  );
}
