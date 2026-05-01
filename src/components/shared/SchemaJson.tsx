import Script from "next/script";

interface SchemaJsonProps {
  schemaJson?: Record<string, unknown> | Array<Record<string, unknown>> | null;
}

export function SchemaJson({ schemaJson }: SchemaJsonProps) {
  if (!schemaJson) {
    return null;
  }

  let jsonString: string;
  try {
    jsonString = JSON.stringify(schemaJson);
  } catch {
    return null;
  }

  return (
    <Script
      id="schema-json"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}
