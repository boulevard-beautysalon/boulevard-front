import { BlogPost } from "@/types/blogPost";
import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
import { getBlogPostCardImageUrl } from "@/utils/getBlogPostImageUrl";
import EstimatedReadingTime from "@/components/shared/estReadingTime/EstimatedReadingTime";

interface ArticleThreeProps {
  post: BlogPost;
}

export default function ArticleThree({ post }: ArticleThreeProps) {
  const { heroTitle, heroDescription, slug } = post;

  return (
    <Link
      href={`/blog/${slug}`}
      className="hidden xl:block xl:w-[calc(50%-7px)] h-full rounded-[20px] overflow-hidden"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInAnimation({ y: 20, delay: 0.3 })}
        className="relative flex flex-col h-full px-4 py-5 bg-white/10 shadow-[inset_0px_4px_12.6px_0px_rgba(255,255,255,0.25)] backdrop-blur-[10px]"
      >
        <div
          className="absolute inset-0 rounded-[20px] pointer-events-none"
          style={{
            background:
              "linear-gradient(270.67deg, #F2F2F2 -9.58%, #C7C7C7 103.45%)",
            padding: "1px",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
        <h3 className="mb-5 font-evolenta text-[15px] font-normal leading-[133%] uppercase">
          {heroTitle}
        </h3>

        <p className="mb-6 text-[12px] font-light leading-[120%] line-clamp-5 md:line-clamp-6">
          {heroDescription}
        </p>
        <div className="flex gap-3 items-center flex-wrap mb-6">
          <EstimatedReadingTime post={post} />
        </div>
        <div className="flex-grow relative w-full rounded-[12px] overflow-hidden">
          <Image
            src={getBlogPostCardImageUrl(post, { fitCrop: true })}
            alt={heroTitle}
            fill
            className="object-cover"
          />
        </div>
      </motion.div>
    </Link>
  );
}
