import { Metadata } from "next";
import { PageSeo } from "@/types/page";
import { getCanonicalUrl } from "./getCanonicalUrl";
import { urlForSanityImage } from "./getUrlForSanityImage";
import { getRobotsMetadata } from "./getRobotsMetadata";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";

interface GetMetadataFromSanityParams {
  seo: PageSeo | null | undefined;
  path: string;
  defaultTitle?: string;
  defaultDescription?: string;
}

export function getMetadataFromSanity({
  seo,
  path,
  defaultTitle = "Boulevard Beauty Salon i Horsens | Hudpleje, manicure, pedicure & bryn",
  defaultDescription = "Boulevard Beauty Salon i Horsens tilbyder professionelle skønhedsbehandlinger: hudpleje, manicure, pedicure, lash lamination og bryn. Book din tid i dag.",
}: GetMetadataFromSanityParams): Metadata {
  const canonicalUrl = getCanonicalUrl(path);
  const metaTitle = seo?.metaTitle || defaultTitle;
  const metaDescription = seo?.metaDescription || defaultDescription;

  let keywords: string[] | undefined;
  if (seo?.keywords) {
    if (Array.isArray(seo.keywords)) {
      keywords = seo.keywords.length > 0 ? seo.keywords : undefined;
    } else if (typeof seo.keywords === "string") {
      const parsedKeywords = seo.keywords
        .split(",")
        .map((keyword) => keyword.trim())
        .filter((keyword) => keyword.length > 0);
      keywords = parsedKeywords.length > 0 ? parsedKeywords : undefined;
    }
  }

  let ogImageUrl: string | undefined;
  if (seo?.opengraphImage) {
    const ogImage = urlForSanityImage(seo.opengraphImage)
      .width(1200)
      .height(630)
      .fit("fill")
      .url();
    ogImageUrl = ogImage;
  } else {
    ogImageUrl = `${SITE_URL}/opengraph-image.jpg`;
  }

  const metadata: Metadata = {
    title: metaTitle,
    description: metaDescription,
    keywords,
    robots: getRobotsMetadata(path),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "da-DK": canonicalUrl,
        "x-default": canonicalUrl,
      },
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: seo?.opengraphImage?.alt || metaTitle,
        },
      ],
      type: "website",
      locale: "da_DK",
      siteName: "Boulevard Beauty Salon",
      url: canonicalUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [ogImageUrl],
    },
  };

  return metadata;
}
