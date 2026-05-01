import { fetchSanityData } from "./fetchSanityData";
import { fetchSchemaJson } from "./fetchSchemaJson";
import defaultSchema from "@/data/defaultSchema.json";

function getDefaultSchema(): Record<string, unknown> {
  return defaultSchema as Record<string, unknown>;
}

export async function getDynamicPageSchemaJson(
  query: string,
  queryParams: Record<string, unknown>,
): Promise<Record<string, unknown> | Array<Record<string, unknown>> | null> {
  try {
    const pageData = await fetchSanityData<{
      seo: {
        schemaJsonUrl?: string;
      } | null;
    }>(query, queryParams);

    if (pageData?.seo?.schemaJsonUrl) {
      return await fetchSchemaJson(pageData.seo.schemaJsonUrl);
    }
  } catch (error) {
    console.error("Failed to fetch schema JSON:", error);
  }

  return getDefaultSchema();
}
