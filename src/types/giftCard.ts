export interface GiftCardImage {
  _type?: "image";
  asset?: { _ref?: string; _type?: string };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt?: string;
}

export interface GiftCardPdfAsset {
  url?: string;
  originalFilename?: string;
}

export interface GiftCardPdfFile {
  asset?: GiftCardPdfAsset;
}

export interface GiftCard {
  _id: string;
  amount: number;
  description: string;
  image?: GiftCardImage;
  certificatePdf?: GiftCardPdfFile;
  popular?: boolean;
  primary?: boolean;
  stripeCheckoutUrl?: string;
  stripePriceId?: string;
  order: number;
}
