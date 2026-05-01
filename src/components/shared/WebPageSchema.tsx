"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://boulevardsalon.dk"
).replace(/\/+$/, "");

function normalizePath(pathname: string): string {
  if (!pathname) return "/";
  if (pathname === "/") return "/";
  return pathname.replace(/\/+$/, "");
}

function getPageNameFromPath(pathname: string): string {
  const normalized = normalizePath(pathname);

  if (normalized === "/") return "Boulevard Beauty Salon";
  if (normalized === "/services") return "Services | Boulevard Beauty Salon";
  if (normalized === "/blog") return "Blog | Boulevard Beauty Salon";
  if (normalized.startsWith("/blog/")) return "Blog article | Boulevard Beauty Salon";

  return "Boulevard Beauty Salon";
}

export function WebPageSchema() {
  const pathname = usePathname();

  const schema = useMemo(() => {
    const normalizedPath = normalizePath(pathname || "/");
    const currentUrl =
      normalizedPath === "/" ? BASE_URL : `${BASE_URL}${normalizedPath}`;
    const pageTitle = getPageNameFromPath(normalizedPath);

    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${currentUrl}#webpage`,
      url: currentUrl,
      name: pageTitle,
      isPartOf: {
        "@id": "https://boulevardsalon.dk/#website",
      },
      about: {
        "@id": "https://boulevardsalon.dk/#localbusiness",
      },
    };
  }, [pathname]);

  return (
    <script
      key={schema["@id"]}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
