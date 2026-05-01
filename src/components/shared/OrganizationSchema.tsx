import Script from "next/script";

const GLOBAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://boulevardsalon.dk/#website",
      url: "https://boulevardsalon.dk",
      name: "Boulevard Beauty Salon",
      publisher: {
        "@id": "https://boulevardsalon.dk/#organization",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://boulevardsalon.dk/#organization",
      name: "Boulevard",
      url: "https://boulevardsalon.dk",
      email: "boulevardsalondk@gmail.com",
      logo: {
        "@type": "ImageObject",
        url: "https://boulevardsalon.dk/images/logo.png",
        width: 600,
        height: 600,
      },
      image: {
        "@type": "ImageObject",
        url: "https://boulevardsalon.dk/opengraph-image.jpg",
        width: 1200,
        height: 630,
      },
      sameAs: [
        "https://www.facebook.com/share/17Fr2f9xsW/?mibextid=wwXIfr",
        "https://www.instagram.com/boulevard.beauty_salon_?igsh=MWE3MDh1YTExaXAwZg==",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://boulevardsalon.dk/#localbusiness",
      name: "Boulevard",
      url: "https://boulevardsalon.dk",
      email: "boulevardsalondk@gmail.com",
      priceRange: "200-1200 DKK",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Kongensgade 19 st, tv",
        postalCode: "8700",
        addressLocality: "Horsens",
        addressCountry: "DK",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 55.8607,
        longitude: 9.8503,
      },
      openingHours: "Mo-Su 09:00-18:00",
    },
  ],
} as const;

export function OrganizationSchema() {
  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(GLOBAL_BUSINESS_SCHEMA),
      }}
    />
  );
}
