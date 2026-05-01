"use client";

import { Dispatch, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  burgerMenuVariants,
  burgerListVariants,
} from "@/utils/animationVariants";
import MobileNavMenu from "./MobileNavMenu";
import Container from "../../container/Container";
import Button from "../../buttons/Button";

interface BurgerMenuContentProps {
  isOpen: boolean;
  setIsOpenBurgerMenu: Dispatch<SetStateAction<boolean>>;
  onContactClick?: () => void;
}

export default function BurgerMenuContent({
  isOpen,
  setIsOpenBurgerMenu,
  onContactClick,
}: BurgerMenuContentProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="lg:hidden fixed right-0 top-0 z-40 pt-20 pb-4 w-full h-dvh max-h-dvh bg-beige overflow-hidden no-doc-scroll"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={burgerMenuVariants}
        >
          <Container
            className="flex flex-col justify-between gap-15 h-full pt-[39px] overflow-y-auto scrollbar scrollbar-w-[2px] scrollbar-thumb-rounded-full 
          scrollbar-track-rounded-full scrollbar-thumb-brown/60 scrollbar-track-transparent"
          >
            {/* Меню */}
            <motion.div
              variants={burgerListVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <MobileNavMenu setIsOpenBurgerMenu={setIsOpenBurgerMenu} />
            </motion.div>
            <motion.div
              variants={burgerListVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Button
                type="button"
                className="w-full h-12 max-w-[320px] mx-auto"
                onClick={() => {
                  setIsOpenBurgerMenu(false);
                  onContactClick?.();
                }}
              >
                Kontakt os
              </Button>
            </motion.div>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
