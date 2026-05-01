import Container from "@/components/shared/container/Container";
import Image from "next/image";
import { Suspense } from "react";
import Loader from "@/components/shared/loader/Loader";
import { fetchSanityData } from "@/utils/fetchSanityData";
import { ALL_BLOG_POSTS_QUERY } from "@/lib/queries";
import { BlogPost } from "@/types/blogPost";
import BlogList from "@/components/homePage/blog/BlogList";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

export default async function Blog() {
  const posts = await fetchSanityData<BlogPost[]>(ALL_BLOG_POSTS_QUERY);

  const postsList = posts.slice(0, 3);

  return (
    <section className="pb-[55px] lg:pb-15">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({
            delay: 0.2,
            x: -40,
            duration: 1,
          })}
          className="lg:flex justify-between items-center mb-10 lg:mb-8"
        >
          <h2 className="max-w-[472px] lg:max-w-[562px] xl:max-w-[762px] font-evolenta text-[24px] lg:text-[48px] leading-[120%] font-normal uppercase">
            Læs vores nyeste artikler om hudpleje og behandlinger
          </h2>
          <Image
            src="/images/homePage/blog/decorations.svg"
            alt="decorations"
            width={288}
            height={68}
            className="hidden lg:block w-[288px] h-[68px]"
          />
        </motion.div>
        <Suspense fallback={<Loader />}>
          <BlogList postsList={postsList} />
        </Suspense>
      </Container>
    </section>
  );
}
