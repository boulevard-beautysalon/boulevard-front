import type { BlogPost } from "@/types/blogPost";
import { urlForSanityImage } from "@/utils/getUrlForSanityImage";

export const BLOG_POST_IMAGE_FALLBACK = "/images/blogPage/hero/image.webp";

function hasUsableAsset(
  img: BlogPost["heroMobileImage"] | null | undefined,
): img is BlogPost["heroMobileImage"] {
  return Boolean(
    img &&
      typeof img === "object" &&
      img.asset &&
      "_ref" in img.asset &&
      Boolean(img.asset._ref),
  );
}

function buildUrl(
  img: BlogPost["heroMobileImage"],
  options: { fitCrop: boolean },
): string {
  const chain = urlForSanityImage(img);
  return options.fitCrop ? chain.fit("crop").url() : chain.url();
}

/** URL для карток блогу: спочатку mobile, інакше desktop, інакше статичний fallback. */
export function getBlogPostCardImageUrl(
  post: Pick<BlogPost, "heroMobileImage" | "heroDesktopImage">,
  options?: { fitCrop?: boolean },
): string {
  const fitCrop = options?.fitCrop ?? false;
  const { heroMobileImage, heroDesktopImage } = post;
  if (hasUsableAsset(heroMobileImage)) {
    return buildUrl(heroMobileImage, { fitCrop });
  }
  if (hasUsableAsset(heroDesktopImage)) {
    return buildUrl(heroDesktopImage, { fitCrop });
  }
  return BLOG_POST_IMAGE_FALLBACK;
}

/** Окремі src для мобільного та десктопного hero статті (з fallback між полями). */
export function getBlogPostHeroImageSources(post: BlogPost): {
  mobileSrc: string;
  desktopSrc: string;
  mobileAlt: string;
  desktopAlt: string;
} {
  const { heroMobileImage, heroDesktopImage, heroTitle } = post;
  const mobileOk = hasUsableAsset(heroMobileImage);
  const desktopOk = hasUsableAsset(heroDesktopImage);

  const mobileSrc = mobileOk
    ? buildUrl(heroMobileImage, { fitCrop: false })
    : desktopOk
      ? buildUrl(heroDesktopImage, { fitCrop: false })
      : BLOG_POST_IMAGE_FALLBACK;

  const desktopSrc = desktopOk
    ? buildUrl(heroDesktopImage, { fitCrop: false })
    : mobileOk
      ? buildUrl(heroMobileImage, { fitCrop: false })
      : BLOG_POST_IMAGE_FALLBACK;

  return {
    mobileSrc,
    desktopSrc,
    mobileAlt: (mobileOk && heroMobileImage.alt) || heroTitle,
    desktopAlt: (desktopOk && heroDesktopImage.alt) || heroTitle,
  };
}
