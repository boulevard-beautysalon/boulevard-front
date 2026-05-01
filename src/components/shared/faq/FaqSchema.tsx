import { JsonLd } from "@/components/shared/JsonLd";
import type { FaqItem } from "@/types/faq";
import { buildFaqSchema } from "@/utils/buildFaqSchema";

interface FaqSchemaProps {
  faqItems?: FaqItem[];
  id?: string;
}

export function FaqSchema({ faqItems, id = "faq-schema" }: FaqSchemaProps) {
  const schema = buildFaqSchema(faqItems);
  return <JsonLd id={id} data={schema} />;
}
