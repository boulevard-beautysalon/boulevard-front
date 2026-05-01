import Button from "@/components/shared/buttons/Button";
import { BlogPost } from "@/types/blogPost";
import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
import { getBlogPostCardImageUrl } from "@/utils/getBlogPostImageUrl";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";

interface ArticleOneProps {
  post: BlogPost;
}

export default function ArticleOne({ post }: ArticleOneProps) {
  const { heroTitle, heroDescription, slug } = post;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInAnimation({ x: 30 })}
      className="md:w-[calc(50%-8px)] mb-5 md:mb-0"
    >
      <Link href={`/blog/${slug}`}>
        <div className="px-4 py-5 rounded-[20px] bg-beige-light">
          <h3 className="mb-5 font-evolenta text-[24px] font-normal leading-[133%] uppercase">
            {heroTitle}
          </h3>
          <div className="xl:flex gap-9 mb-5 xl:mb-4">
            <p className="mb-6 text-[12px] font-light leading-[120%] line-clamp-5 xl:line-clamp-3">
              {heroDescription}
            </p>
            <Button
              variant="black"
              className=" xl:w-[175px] xl:mt-7 px-5 lg:px-[22px] xl:h-14 shrink-0 normal-case"
            >
              <div className="flex gap-2 justify-between items-center">
                Læs mere <ArrowIcon className="w-4 h-4 rotate-45" />
              </div>
            </Button>
          </div>
          <div className="relative h-[202px] xl:h-[329px] rounded-[20px] overflow-hidden">
            <Image
              src={getBlogPostCardImageUrl(post, { fitCrop: true })}
              alt={heroTitle}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
