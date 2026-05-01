"use client";
import { Dispatch, SetStateAction } from "react";
import BurgerMenuButton from "./BurgerMenuButton";
import BurgerMenuContent from "./BurgerMenuContent";

interface BurgerMenuProps {
  isOpenBurgerMenu: boolean;
  setIsOpenBurgerMenu: Dispatch<SetStateAction<boolean>>;
  onContactClick?: () => void;
}

export default function BurgerMenu({
  isOpenBurgerMenu,
  setIsOpenBurgerMenu,
  onContactClick,
}: BurgerMenuProps) {
  const toggleHeaderMenuOpen = () => setIsOpenBurgerMenu(!isOpenBurgerMenu);
  return (
    <>
      <BurgerMenuButton
        isHeaderMenuOpened={isOpenBurgerMenu}
        toggleHeaderMenuOpen={toggleHeaderMenuOpen}
      />
      <BurgerMenuContent
        isOpen={isOpenBurgerMenu}
        setIsOpenBurgerMenu={setIsOpenBurgerMenu}
        onContactClick={onContactClick}
      />
    </>
  );
}
