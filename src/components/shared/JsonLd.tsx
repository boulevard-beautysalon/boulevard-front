import Script from "next/script";

interface JsonLdProps {
  id?: string;
  data?: unknown;
}

export function JsonLd({ id = "json-ld", data }: JsonLdProps) {
  if (!data) return null;

  let jsonString: string;
  try {
    jsonString = JSON.stringify(data);
  } catch {
    return null;
  }

  return (
    <Script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}
