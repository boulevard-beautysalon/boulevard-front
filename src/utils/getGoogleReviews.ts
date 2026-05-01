import type { Review } from "@/types/review";

type GooglePlaceDetailsResponse = {
  reviews?: Array<{
    name?: string;
    rating?: number;
    text?: {
      text?: string;
      languageCode?: string;
    };
    originalText?: {
      text?: string;
      languageCode?: string;
    };
    publishTime?: string;
    relativePublishTimeDescription?: string;
    authorAttribution?: {
      displayName?: string;
      uri?: string;
      photoUri?: string;
    };
  }>;
};

const FALLBACK_AVATAR = "/images/homePage/reviews/review-1.webp";
const GOOGLE_REVIEWS_LIMIT = 10;

function mapGoogleReviewToReview(
  item: NonNullable<GooglePlaceDetailsResponse["reviews"]>[number],
  index: number,
): Review | null {
  const text = (item.originalText?.text ?? item.text?.text ?? "").trim();
  const name = item.authorAttribution?.displayName?.trim();
  const rating = item.rating ?? 0;

  if (!text || !name || rating <= 0) return null;

  return {
    id: `google-review-${item.name ?? item.publishTime ?? index}`,
    name,
    rating,
    text,
    avatarSrc: item.authorAttribution?.photoUri || FALLBACK_AVATAR,
  };
}

export async function getGoogleReviews(): Promise<Review[]> {
  const apiKey = process.env.GOOGLE_CLOUD_KEY;
  const placeId = process.env.PLACE_ID;

  if (!apiKey || !placeId) {
    return [];
  }

  const url = `https://places.googleapis.com/v1/places/${placeId}?languageCode=da`;

  try {
    const response = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "reviews.name,reviews.rating,reviews.text,reviews.originalText,reviews.publishTime,reviews.authorAttribution.displayName,reviews.authorAttribution.photoUri",
      },
      next: { revalidate: 60 * 60 },
    });

    if (!response.ok) {
      return [];
    }

    const data = (await response.json()) as GooglePlaceDetailsResponse;
    if (!data.reviews?.length) {
      return [];
    }

    const mapped = data.reviews
      .slice(0, GOOGLE_REVIEWS_LIMIT)
      .map(mapGoogleReviewToReview)
      .filter((item): item is Review => item !== null);

    return mapped;
  } catch {
    return [];
  }
}
