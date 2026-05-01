import { Metadata } from "next";
import { getCanonicalUrl } from "./getCanonicalUrl";
import { getRobotsMetadata } from "./getRobotsMetadata";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export function getDefaultMetadata(path: string = "/"): Metadata {
  const canonicalUrl = getCanonicalUrl(path);

  return {
    title:
      "Boulevard Beauty Salon i Horsens | Hudpleje, manicure, pedicure & bryn",
    description:
      "Boulevard Beauty Salon i Horsens tilbyder professionelle skønhedsbehandlinger: hudpleje, manicure, pedicure, lash lamination og bryn. Book din tid i dag.",
    robots: getRobotsMetadata(path),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "da-DK": canonicalUrl,
        "x-default": canonicalUrl,
      },
    },
    openGraph: {
      title:
        "Boulevard Beauty Salon i Horsens | Hudpleje, manicure, pedicure & bryn",
      description:
        "Boulevard Beauty Salon i Horsens tilbyder professionelle skønhedsbehandlinger: hudpleje, manicure, pedicure, lash lamination og bryn. Book din tid i dag.",
      images: [
        {
          url: `${SITE_URL}/opengraph-image.jpg`,
          width: 1200,
          height: 630,
          alt: "Boulevard Beauty Salon",
        },
      ],
      type: "website",
      locale: "da_DK",
      siteName: "Boulevard Beauty Salon",
    },
  };
}
