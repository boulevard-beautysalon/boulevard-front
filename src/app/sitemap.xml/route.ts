import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { fetchSanityData } from "@/utils/fetchSanityData";

type BlogPostSitemapEntry = {
  slug: string;
  _updatedAt: string;
};

type SitemapUrl = {
  loc: string;
  lastmod: string;
  changefreq: "weekly" | "monthly";
  priority: number;
};

const BLOG_POSTS_SITEMAP_QUERY = `*[_type == "blogPost" && defined(slug.current)]{
  "slug": slug.current,
  _updatedAt
}`;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
const DEFAULT_BASE_URL = "https://boulevard-horsens-frontend.vercel.app";

function normalizeBaseUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

async function resolveBaseUrl(): Promise<string> {
  if (SITE_URL) {
    return normalizeBaseUrl(SITE_URL);
  }

  const headersList = await headers();
  const host = headersList.get("host") || headersList.get("x-forwarded-host");

  if (!host) {
    return DEFAULT_BASE_URL;
  }

  const protocol =
    headersList.get("x-forwarded-proto") ||
    (process.env.NODE_ENV === "production" ? "https" : "http");

  return `${protocol}://${host}`;
}

function toIsoDate(value?: string): string {
  const date = value ? new Date(value) : new Date();
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function generateSitemapXml(baseUrl: string, urls: SitemapUrl[]): string {
  const entries = urls
    .map((url) => {
      const normalizedLoc = url.loc.startsWith("/") ? url.loc : `/${url.loc}`;

      return `  <url>
    <loc>${baseUrl}${normalizedLoc}</loc>
    <lastmod>${toIsoDate(url.lastmod)}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;
}

export async function GET() {
  try {
    const baseUrl = normalizeBaseUrl(await resolveBaseUrl());
    const now = new Date().toISOString();

    const staticPages: SitemapUrl[] = [
      { loc: "/", lastmod: now, changefreq: "weekly", priority: 1.0 },
      { loc: "/services", lastmod: now, changefreq: "monthly", priority: 0.9 },
      { loc: "/gavekort", lastmod: now, changefreq: "monthly", priority: 0.85 },
      { loc: "/blog", lastmod: now, changefreq: "monthly", priority: 0.8 },
    ];

    const blogPosts = await fetchSanityData<BlogPostSitemapEntry[]>(
      BLOG_POSTS_SITEMAP_QUERY,
    ).catch((error) => {
      console.warn("Failed to fetch blog posts for sitemap:", error);
      return [];
    });

    const blogPages: SitemapUrl[] = (blogPosts || []).map((post) => ({
      loc: `/blog/${post.slug}`,
      lastmod: post._updatedAt || now,
      changefreq: "monthly",
      priority: 0.7,
    }));

    const xml = generateSitemapXml(baseUrl, [...staticPages, ...blogPages]);

    return new NextResponse(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
