export interface HeroGalleryImage {
  url: string;
  alt: string;
  blurDataURL: string;
}

export const HERO_GALLERY_IMAGES: HeroGalleryImage[] = [
  {
    url: "/images/homePage/hero/imageOne.webp",
    alt: "Hero image one",
    blurDataURL:
      "data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAADwAQCdASoKAAoAA4BaJZQC7AD8JgL+MoAA/I7x8o1tZ25wNA1ghl4riA3ZbtRxlzeae/qQAK+ICj7XcTRsWttn1Idx+MlrgAA=",
  },
  {
    url: "/images/homePage/hero/imageTwo.webp",
    alt: "Hero image two",
    blurDataURL:
      "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAAAQAgCdASoKAAoAA4BaJZQAAud5s4pmhxkAAPlwIu690Fp75A9tRxj31hMj6cacp/CqFvaF8kAe4rwUb/TMC1IOAgAAAA==",
  },
  {
    url: "/images/homePage/hero/imageThree.webp",
    alt: "Hero image three",
    blurDataURL:
      "data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAADQAQCdASoKAAoAA4BaJQBOgBsn8C8IkAD45PNmVbKATVeTDks78MlUNCM5lAMqBuXF8OknJCUelCQCKBH9VkAA",
  },
  {
    url: "/images/homePage/hero/imageFour.webp",
    alt: "Hero image four",
    blurDataURL:
      "data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAADQAQCdASoKAAoAA4BaJZQCdADZutWFAAD+lPwmih6+Sz4xKBUGlRa3z8Sg8nSjtKY9jhjJT79iwJZR3V5oyaypjY9zkqAA",
  },
  {
    url: "/images/homePage/hero/imageFive.webp",
    alt: "Hero image five",
    blurDataURL:
      "data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAACQAQCdASoKAAoAA4BaJZwAAlaFzPAA4jVSqf+4tfpS67fGEQ3//6tnkBtneq/XYgQ19uceKQiIixqcp8Rqn3mrfxmCC6znAgAAAA==",
  },
];

const SLIDE_BLUR_PLACEHOLDER =
  "data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAADwAQCdASoKAAoAA4BaJZQC7AD8JgL+MoAA/I7x8o1tZ25wNA1ghl4riA3ZbtRxlzeae/qQAK+ICj7XcTRsWttn1Idx+MlrgAA=";

/** Slides slideOne … slideFourteen (порядок 1–14). */
export const SMALL_HERO_SLIDER_IMAGES: HeroGalleryImage[] = [
  {
    url: "/images/homePage/hero/slideOne.webp",
    alt: "Hero slide 1",
    blurDataURL: SLIDE_BLUR_PLACEHOLDER,
  },
  {
    url: "/images/homePage/hero/slideTwo.webp",
    alt: "Hero slide 2",
    blurDataURL: SLIDE_BLUR_PLACEHOLDER,
  },
  {
    url: "/images/homePage/hero/slideThree.webp",
    alt: "Hero slide 3",
    blurDataURL: SLIDE_BLUR_PLACEHOLDER,
  },
  {
    url: "/images/homePage/hero/slideFour.webp",
    alt: "Hero slide 4",
    blurDataURL: SLIDE_BLUR_PLACEHOLDER,
  },
  {
    url: "/images/homePage/hero/slideFive.webp",
    alt: "Hero slide 5",
    blurDataURL: SLIDE_BLUR_PLACEHOLDER,
  },
  {
    url: "/images/homePage/hero/slideSix.webp",
    alt: "Hero slide 6",
    blurDataURL: SLIDE_BLUR_PLACEHOLDER,
  },
  {
    url: "/images/homePage/hero/slideSeven.webp",
    alt: "Hero slide 7",
    blurDataURL: SLIDE_BLUR_PLACEHOLDER,
  },
  {
    url: "/images/homePage/hero/slideEight.webp",
    alt: "Hero slide 8",
    blurDataURL: SLIDE_BLUR_PLACEHOLDER,
  },
  {
    url: "/images/homePage/hero/slideNine.webp",
    alt: "Hero slide 9",
    blurDataURL: SLIDE_BLUR_PLACEHOLDER,
  },
  {
    url: "/images/homePage/hero/slideTen.webp",
    alt: "Hero slide 10",
    blurDataURL: SLIDE_BLUR_PLACEHOLDER,
  },
  {
    url: "/images/homePage/hero/slideEleven.webp",
    alt: "Hero slide 11",
    blurDataURL: SLIDE_BLUR_PLACEHOLDER,
  },
  {
    url: "/images/homePage/hero/slideTwelve.webp",
    alt: "Hero slide 12",
    blurDataURL: SLIDE_BLUR_PLACEHOLDER,
  },
  {
    url: "/images/homePage/hero/slideThirteen.webp",
    alt: "Hero slide 13",
    blurDataURL: SLIDE_BLUR_PLACEHOLDER,
  },
  {
    url: "/images/homePage/hero/slideFourteen.webp",
    alt: "Hero slide 14",
    blurDataURL: SLIDE_BLUR_PLACEHOLDER,
  },
];
