import Hero from "@/components/gavekortPage/Hero";
import Intro from "@/components/gavekortPage/Intro";
import Cards from "@/components/gavekortPage/Cards";
import { Breadcrumbs } from "@/components/shared/breadcrumbs/Breadcrumbs";
import Faq from "@/components/shared/faq/Faq";
import { FaqSchema } from "@/components/shared/faq/FaqSchema";
import { GIFT_CARDS_QUERY } from "@/lib/queries";
import { fetchSanityData } from "@/utils/fetchSanityData";
import type { GiftCard } from "@/types/giftCard";
import type { FaqItem } from "@/types/faq";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/utils/getCanonicalUrl";
import { getRobotsMetadata } from "@/utils/getRobotsMetadata";

const GAVEKORT_FAQ_ITEMS: FaqItem[] = [
  {
    _key: "faq-validity",
    question: "Hvor længe er gavekortet gyldigt?",
    answer: "12 måneder fra købsdatoen.",
  },
  {
    _key: "faq-delivery",
    question: "Hvordan modtager jeg gavekortet?",
    answer: "På e-mail straks efter betaling.",
  },
  {
    _key: "faq-coverage",
    question: "Kan det bruges på alle behandlinger?",
    answer: "Ja, gavekortet kan bruges til alle behandlinger i salonen Boulevard.",
  },
  {
    _key: "faq-refund",
    question: "Kan jeg få pengene tilbage?",
    answer: "Nej, gavekort refunderes ikke.",
  },
];

const GAVEKORT_TITLE = "Gavekort | Boulevard Beauty Salon i Horsens";
const GAVEKORT_DESCRIPTION =
  "Køb gavekort til Boulevard Beauty Salon i Horsens. Vælg beløb, betal online og modtag gavekortet på e-mail med det samme.";

export async function generateMetadata(): Promise<Metadata> {
  const canonical = getCanonicalUrl("/gavekort");

  return {
    title: GAVEKORT_TITLE,
    description: GAVEKORT_DESCRIPTION,
    robots: getRobotsMetadata("/gavekort"),
    alternates: {
      canonical,
      languages: {
        "da-DK": canonical,
        "x-default": canonical,
      },
    },
    openGraph: {
      title: GAVEKORT_TITLE,
      description: GAVEKORT_DESCRIPTION,
      url: canonical,
      type: "website",
      locale: "da_DK",
      siteName: "Boulevard Beauty Salon",
    },
  };
}

export default async function GavekortPage() {
  const breadcrumbSteps = [
    { label: "Hjem", href: "/" },
    { label: "Gavekort" },
  ];

  const cards = await fetchSanityData<GiftCard[]>(GIFT_CARDS_QUERY).catch(
    () => [],
  );

  return (
    <>
      <Hero />
      <Breadcrumbs
        steps={breadcrumbSteps}
        currentPath="/gavekort"
        className="!pb-0 lg:!pb-0"
      />
      <Intro />
      <Cards cards={cards} />
      <FaqSchema faqItems={GAVEKORT_FAQ_ITEMS} id="gavekort-faq-schema" />
      <Faq faq={{ items: GAVEKORT_FAQ_ITEMS }} />
    </>
  );
}
