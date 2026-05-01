export type SanityReference = {
  _type: "reference";
  _ref: string;
};

export type SanityImageCrop = {
  _type: "sanity.imageCrop";
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export type SanityImageHotspot = {
  _type: "sanity.imageHotspot";
  x: number;
  y: number;
  height: number;
  width: number;
};

export type SanityImage = {
  _type: "image";
  asset: SanityReference;
  crop?: SanityImageCrop;
  hotspot?: SanityImageHotspot;
  alt?: string;
};

export type PortableTextBlock = {
  _key: string;
  _type: "block";
  children?: Array<{
    _key: string;
    _type: "span";
    marks: string[];
    text: string;
  }>;
  markDefs?: Array<Record<string, unknown>>;
  style?: string;
};

export type PortableText = Array<PortableTextBlock | Record<string, unknown>>;

export type FaqSection = {
  _type: "faqSection";
  type: "faqSection";
  description?: string;
  items: Array<{
    _key?: string;
    question: string;
    answer: string;
    buttons?: string[];
  }>;
};

export type PageSeo = {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[] | string;
  opengraphImage?: SanityImage;
  schemaJsonUrl?: string;
};
