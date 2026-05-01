import { BlogPost } from "@/types/blogPost";
import { PortableText } from "@portabletext/react";
import { getBlogPortableTextComponents } from "../portableTextComponents/blogPortableTextComponents";

interface ContentSectionProps {
  article: BlogPost;
}

export default function ContentSection({ article }: ContentSectionProps) {
  return (
    <section className="">
      <div className="prose prose-lg max-w-none">
        <PortableText
          value={
            article.content as unknown as Parameters<
              typeof PortableText
            >[0]["value"]
          }
          components={getBlogPortableTextComponents(article.slug)}
        />
      </div>
    </section>
  );
}
