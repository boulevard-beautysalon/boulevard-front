import { BlogPost } from "@/types/blogPost";

export const calculateReadingTime = (
  article: BlogPost,
  wordsPerMinute: number = 200,
): number => {
  const countWords = (text: string) => text.split(/\s+/).filter(Boolean).length;

  let totalWords = 0;

  // Підрахунок слів у title та description
  totalWords += countWords(article.heroTitle);
  totalWords += countWords(article.heroDescription);

  // Підрахунок слів у content
  article.content.forEach((block) => {
    if (block._type === "block" && block.children) {
      block.children.forEach((child) => {
        totalWords += countWords(child.text);
      });
    }
  });

  return Math.ceil(totalWords / wordsPerMinute);
};
