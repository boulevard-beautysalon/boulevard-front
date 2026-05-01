"use client";

import * as React from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import type { LightboxExternalProps, Slide } from "yet-another-react-lightbox";

export type AppLightboxSlide = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
};

export type AppLightboxProps = {
  open: boolean;
  index: number;
  slides: AppLightboxSlide[];
  onClose: () => void;
  onIndexChange?: (index: number) => void;
};

type LightboxSlotStyles = NonNullable<LightboxExternalProps["styles"]>;

const yarlRootStyle = {
  "--yarl__color_backdrop": "rgba(8, 8, 8, 0.94)",
  "--yarl__color_button": "rgba(255, 255, 255, 0.88)",
  "--yarl__color_button_active": "#ffffff",
  "--yarl__toolbar_padding": "12px",
  "--yarl__navigation_button_padding": "20px 14px",
} as LightboxSlotStyles["root"];

export default function AppLightbox({
  open,
  index,
  slides,
  onClose,
  onIndexChange,
}: AppLightboxProps) {
  const prepared = React.useMemo((): Slide[] => {
    return slides.map((s) => {
      const base: Slide = {
        src: s.src,
        alt: s.alt,
      };
      if (s.width != null && s.height != null) {
        return { ...base, width: s.width, height: s.height };
      }
      return base;
    });
  }, [slides]);

  const plugins = React.useMemo(() => {
    const list = [Zoom];
    if (slides.length > 1) {
      list.push(Thumbnails);
    }
    return list;
  }, [slides.length]);

  if (slides.length === 0) {
    return null;
  }

  const safeIndex = Math.min(Math.max(0, index), slides.length - 1);

  return (
    <Lightbox
      open={open}
      close={onClose}
      index={safeIndex}
      slides={prepared}
      plugins={plugins}
      carousel={{
        finite: slides.length <= 1,
        imageFit: "contain",
        padding: "12px",
        spacing: 0,
        preload: 2,
      }}
      animation={{ fade: 160, swipe: 320 }}
      noScroll={{ disabled: true }}
      styles={{
        root: yarlRootStyle,
      }}
      on={{
        view: ({ index: i }) => onIndexChange?.(i),
      }}
    />
  );
}
