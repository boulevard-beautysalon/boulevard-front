"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navMenuList } from "../NavMenu";
import { handleHomeHashAnchorClick } from "@/utils/homeHashLink";

interface MobileNavMenuProps {
  setIsOpenBurgerMenu: Dispatch<SetStateAction<boolean>>;
}

export default function MobileNavMenu({
  setIsOpenBurgerMenu,
}: MobileNavMenuProps) {
  const pathname = usePathname();
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const solutionsItem = navMenuList[2];

  const closeBurger = () => setIsOpenBurgerMenu(false);

  return (
    <nav aria-label="Mobile menu">
      <ul className="flex flex-col gap-2">
        {navMenuList.map((item) =>
          item.slug ? (
            <li key={item.title}>
              <Link
                href={item.slug}
                onClick={(e) => {
                  closeBurger();
                  handleHomeHashAnchorClick(e, pathname);
                }}
                className="block py-[18px] text-[16px] font-light leading-[120%] uppercase hover:opacity-80 transition-opacity"
              >
                {item.title}
              </Link>
              <div className="h-[1.5px] bg-[linear-gradient(90deg,_#906059_23.92%,_#15100D_99.51%)]" />
            </li>
          ) : (
            <li key={item.title} className="flex flex-col">
              <button
                type="button"
                onClick={() => setSolutionsOpen((prev) => !prev)}
                className="flex items-center gap-3 w-full text-[24px] font-medium leading-[120%] uppercase hover:opacity-80 transition-opacity"
                aria-expanded={solutionsOpen}
                aria-haspopup="true"
              >
                {item.title}
              </button>
              <AnimatePresence initial={false}>
                {solutionsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                      transition: {
                        height: {
                          duration: 0.25,
                          ease: [0.25, 0.1, 0.25, 1],
                        },
                        opacity: {
                          duration: 0.2,
                          delay: 0.05,
                        },
                      },
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                      transition: {
                        height: {
                          duration: 0.2,
                          ease: [0.42, 0, 1, 1],
                        },
                        opacity: { duration: 0.15 },
                      },
                    }}
                    className="overflow-hidden"
                  >
                    <ul className="flex flex-col gap-6 pl-6 pt-6">
                      {solutionsItem.submenu?.map((sub) => (
                        <li key={sub.slug}>
                          <Link
                            href={sub.slug}
                            onClick={(e) => {
                              closeBurger();
                              handleHomeHashAnchorClick(e, pathname);
                            }}
                            className="block text-[20px] font-medium leading-[120%] uppercase hover:opacity-80 transition-opacity"
                          >
                            {sub.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ),
        )}
        <li>
          <Link
            href="/blog"
            onClick={closeBurger}
            className="block py-[18px] text-[16px] font-light leading-[120%] uppercase hover:opacity-80 transition-opacity"
          >
            Blog
          </Link>
          <div className="h-[1.5px] bg-[linear-gradient(90deg,_#906059_23.92%,_#15100D_99.51%)]" />
        </li>
      </ul>
    </nav>
  );
}
