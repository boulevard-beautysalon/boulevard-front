import type { FaqItem } from "@/types/faq";

interface FaqSchemaQuestion {
  "@type": "Question";
  name: string;
  acceptedAnswer: {
    "@type": "Answer";
    text: string;
  };
}

interface FaqSchema {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: FaqSchemaQuestion[];
}

export function buildFaqSchema(faqItems?: FaqItem[]): FaqSchema | null {
  if (!faqItems?.length) return null;

  const mainEntity = faqItems
    .map((item) => ({
      question: item.question?.trim(),
      answer: item.answer?.trim(),
    }))
    .filter((item) => item.question && item.answer)
    .map(
      (item): FaqSchemaQuestion => ({
        "@type": "Question",
        name: item.question!,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer!,
        },
      }),
    );

  if (!mainEntity.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };
}
