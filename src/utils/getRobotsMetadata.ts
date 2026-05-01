import type { Metadata } from "next";

const NOINDEX_PATH_PREFIXES = ["/api", "/admin", "/preview", "/draft"];
const NOINDEX_PATH_EXACT = ["/sitemap.xml", "/robots.txt"];

function normalizePath(path: string): string {
  if (!path) return "/";
  const withoutQuery = path.split("?")[0]?.split("#")[0] || "/";
  if (withoutQuery === "/") return "/";
  return withoutQuery.replace(/\/+$/, "");
}

function shouldNoIndex(path: string): boolean {
  const normalized = normalizePath(path).toLowerCase();

  if (NOINDEX_PATH_EXACT.includes(normalized)) {
    return true;
  }

  return NOINDEX_PATH_PREFIXES.some(
    (prefix) => normalized === prefix || normalized.startsWith(`${prefix}/`),
  );
}

export function getRobotsMetadata(path: string): Metadata["robots"] {
  const noIndex = shouldNoIndex(path);

  if (noIndex) {
    return {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    };
  }

  return {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  };
}
