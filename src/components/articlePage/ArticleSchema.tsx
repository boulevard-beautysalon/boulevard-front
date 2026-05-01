import { SchemaJson } from "@/components/shared/SchemaJson";
import type { BlogPost } from "@/types/blogPost";
import { getBlogPostCardImageUrl } from "@/utils/getBlogPostImageUrl";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://boulevardsalon.dk"
).replace(/\/+$/, "");

function toAbsoluteUrl(url: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  const normalizedPath = url.startsWith("/") ? url : `/${url}`;
  return `${SITE_URL}${normalizedPath}`;
}

interface ArticleSchemaProps {
  article: BlogPost;
}

export function ArticleSchema({ article }: ArticleSchemaProps) {
  const currentUrl = toAbsoluteUrl(`/blog/${article.slug}`);
  const imageUrl = toAbsoluteUrl(getBlogPostCardImageUrl(article));
  const publishedAt = article.createdAt || new Date().toISOString();
  const modifiedAt = article.updatedAt || publishedAt;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${currentUrl}#article`,
    headline: article.heroTitle,
    description: article.heroDescription,
    image: imageUrl,
    datePublished: publishedAt,
    dateModified: modifiedAt,
    author: {
      "@id": "https://boulevardsalon.dk/#organization",
    },
    publisher: {
      "@id": "https://boulevardsalon.dk/#organization",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": currentUrl,
    },
  } as const;

  return <SchemaJson schemaJson={schema} />;
}
