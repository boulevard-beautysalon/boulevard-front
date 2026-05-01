import { BlogPost } from "@/types/blogPost";
import Image from "next/image";
import { getBlogPostCardImageUrl } from "@/utils/getBlogPostImageUrl";
import Link from "next/link";
import EstimatedReadingTime from "@/components/shared/estReadingTime/EstimatedReadingTime";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const { heroTitle, heroDescription, slug } = post;

  return (
    <Link
      href={`/blog/${slug}`}
      className="group relative flex flex-col rounded-[12px] overflow-hidden h-full bg-beige"
    >
      <div
        className="absolute inset-0 rounded-[12px] pointer-events-none"
        style={{
          background:
            "linear-gradient(129.15deg, #906059 21.74%, #15100D 103.38%)",
          padding: "1px",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div className="relative w-full h-45 rounded-[8px] overflow-hidden">
        <Image
          src={getBlogPostCardImageUrl(post)}
          fill
          alt={post.heroMobileImage?.alt || post.heroDesktopImage?.alt || "Blog indlæg billede"}
          sizes="(max-width: 440px) 100vw, 328px"
          className="object-cover xl:group-hover:scale-105 transition duration-1200 ease-in-out"
        />
        <EstimatedReadingTime
          post={post}
          className="absolute bottom-4 left-4"
        />
      </div>
      <div className="flex flex-col justify-between flex-1 py-6 px-4">
        <div>
          <p className="mb-6 font-evolenta text-[18px] text-light leading-[120%] uppercase">
            {heroTitle}
          </p>
          <p className="mb-6 text-[12px] font-light leading-[120%] line-clamp-5">
            {heroDescription}
          </p>
        </div>
        <p className="flex gap-1.5 items-center w-fit ml-auto text-[16px] font-medium leading-[120%]">
          Læs mere{" "}
          <span className="font-evolenta text-[11px] xl:group-hover:translate-x-1 transition duration-1200 ease-in-out">
            →
          </span>
        </p>
      </div>
    </Link>
  );
}
