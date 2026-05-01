export function getCanonicalUrl(path: string): string {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";

  const baseUrl = SITE_URL.replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const pathWithoutQuery = normalizedPath.split("?")[0];

  return `${baseUrl}${pathWithoutQuery}`;
}
