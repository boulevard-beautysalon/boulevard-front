import {
  SanityImage,
  SanityReference,
  SanityImageCrop,
  SanityImageHotspot,
  FaqSection,
  PageSeo,
} from "./page";

export type BlogPostContentBlock = {
  _key: string;
  _type: "block";
  style?: "h2" | "h3" | "h4" | "normal";
  children: Array<{
    _key: string;
    _type: "span";
    text: string;
    marks?: string[];
    link?: {
      href: string;
      blank?: boolean;
    };
  }>;
  markDefs?: Array<{
    _key: string;
    _type: "link";
    href: string;
    blank?: boolean;
  }>;
};

export type BlogPostContentImage = {
  _key: string;
  _type: "image";
  asset: SanityReference;
  crop?: SanityImageCrop;
  hotspot?: SanityImageHotspot;
  alt?: string;
};

export type BlogPostContentTable = {
  _key: string;
  _type: "table";
  rows?: Array<{
    cells?: string[];
  }>;
};

export type BlogPostImageGallery = {
  _key: string;
  _type: "blogPostImageGallery";
  images?: BlogPostContentImage[];
};

export type BlogPostContentLinkBlock = {
  _key: string;
  _type: "blogPostContentLink";
  label: string;
  href: string;
  blank?: boolean;
  displayAs?: "button" | "text";
  /** У CMS: `black` | `brown`. `primary` / `outline` — застарілі з попередньої схеми. */
  buttonVariant?: "black" | "brown" | "primary" | "outline";
};

export type BlogPostContent =
  | BlogPostContentBlock
  | BlogPostContentImage
  | BlogPostContentTable
  | BlogPostImageGallery
  | BlogPostContentLinkBlock;

export type BlogPost = {
  createdAt?: string;
  updatedAt?: string;
  heroTitle: string;
  heroDescription: string;
  heroDesktopImage: SanityImage;
  heroMobileImage: SanityImage;
  slug: string;
  content: BlogPostContent[];
  faq?: FaqSection | null;
  seo?: PageSeo | null;
};
