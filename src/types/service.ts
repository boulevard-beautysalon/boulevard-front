import type {
  SanityImageCrop,
  SanityImageHotspot,
  SanityReference,
} from "@sanity/image-url";

export type DesktopImageSide = "left" | "right";

export type SanityImage = {
  _type: "image";
  asset: SanityReference;
  crop?: SanityImageCrop;
  hotspot?: SanityImageHotspot;
  alt?: string;
};

export interface ServiceButton {
  label: string;
  url: string;
}

export interface Service {
  _id: string;
  title: string;
  slug: string;
  /** При true — послугу не показуємо в слайдері на головній */
  hideOnHome?: boolean;
  /** Текст для картки / слайдера на головній (обовʼязковий у CMS, якщо показуємо на головній) */
  homePageDescription?: string;
  /** Текст для блоку на сторінці /services */
  servicesPageDescription?: string;
  /** Порядок на головній: менше — раніше (тільки для не прихованих) */
  homePageOrder?: number;
  /** Порядок секцій на сторінці послуг: менше — вище */
  servicesPageOrder?: number;
  homePageImage: SanityImage;
  servicesPageImageMobile: SanityImage;
  servicesPageImageDesktop: SanityImage;
  button: ServiceButton;
  desktopImageSide: DesktopImageSide;
}
