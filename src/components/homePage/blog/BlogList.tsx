import { BlogPost } from "@/types/blogPost";
import ArticleOne from "./ArticleOne";
import ArticleTwo from "./ArticleTwo";
import ArticleThree from "./ArticleThree";
import AllArticles from "./AllArticles";

interface BlogListProps {
  postsList: BlogPost[];
}

export default function BlogList({ postsList }: BlogListProps) {
  if (!postsList || postsList.length === 0) return null;

  return (
    <div className="md:flex flex-row-reverse gap-4">
      {postsList[0] ? <ArticleOne post={postsList[0]} /> : null}
      <div className="md:w-[calc(50%-8px)] h-auto shrink-0">
        <div className="hidden md:block h-[calc(100%-160px)] xl:h-[calc(100%-112px)] mb-4 xl:flex xl:gap-4.5">
          {postsList[1] ? <ArticleTwo post={postsList[1]} /> : null}
          {postsList[2] ? <ArticleThree post={postsList[2]} /> : null}
        </div>
        <AllArticles />
      </div>
    </div>
  );
}
