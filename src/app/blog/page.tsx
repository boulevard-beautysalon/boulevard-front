import Hero from "@/components/blogPage/hero/Hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs/Breadcrumbs";
import { Suspense } from "react";
import Loader from "@/components/shared/loader/Loader";
import BlogList from "@/components/blogPage/blogList/BlogList";
import { ALL_BLOG_POSTS_QUERY } from "@/lib/queries";
import { fetchSanityData } from "@/utils/fetchSanityData";
import { BlogPost } from "@/types/blogPost";
import type { Metadata } from "next";
import { getDefaultMetadata } from "@/utils/getDefaultMetadata";

const BLOG_DEFAULT_TITLE = "Blog | Boulevard Beauty Salon i Horsens";
const BLOG_DEFAULT_DESCRIPTION =
  "Læs vores nyeste artikler om hudpleje, behandlinger og skønhedsrutiner fra Boulevard Beauty Salon i Horsens.";

export async function generateMetadata(): Promise<Metadata> {
  const defaultMetadata = getDefaultMetadata("/blog");

  return {
    ...defaultMetadata,
    title: BLOG_DEFAULT_TITLE,
    description: BLOG_DEFAULT_DESCRIPTION,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: BLOG_DEFAULT_TITLE,
      description: BLOG_DEFAULT_DESCRIPTION,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: BLOG_DEFAULT_TITLE,
      description: BLOG_DEFAULT_DESCRIPTION,
    },
  };
}

export default async function BlogPage() {
  const breadcrumbSteps = [{ label: `Hjem`, href: `/` }, { label: "Blog" }];

  const blogPosts = await fetchSanityData<BlogPost[]>(ALL_BLOG_POSTS_QUERY);

  return (
    <>
      <Hero />
      <Breadcrumbs steps={breadcrumbSteps} currentPath="/blog" />
      <Suspense fallback={<Loader />}>
        <BlogList blogPosts={blogPosts} />
      </Suspense>
    </>
  );
}
