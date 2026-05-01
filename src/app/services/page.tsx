import Hero from "@/components/servicesPage/hero/Hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs/Breadcrumbs";
import {
  SERVICES_FAQ_QUERY,
  SERVICES_PAGE_SEO_QUERY,
  SERVICES_PAGE_QUERY,
} from "@/lib/queries";
import { Service } from "@/types/service";
import type { ServicesFaq } from "@/types/faq";
import { fetchSanityData } from "@/utils/fetchSanityData";
import Services from "@/components/servicesPage/services/Services";
import { Suspense } from "react";
import Loader from "@/components/shared/loader/Loader";
import Faq from "@/components/shared/faq/Faq";
import { FaqSchema } from "@/components/shared/faq/FaqSchema";
import type { Metadata } from "next";
import { getMetadataFromSanity } from "@/utils/getMetadataFromSanity";
import type { PageSeo } from "@/types/page";

const SERVICES_DEFAULT_TITLE = "Services | Boulevard Beauty Salon i Horsens";
const SERVICES_DEFAULT_DESCRIPTION =
  "Se alle behandlinger hos Boulevard Beauty Salon i Horsens: ansigtsbehandlinger, lash lamination, bryn, manicure, pedicure og voks.";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchSanityData<{ seo: PageSeo | null }>(
    SERVICES_PAGE_SEO_QUERY,
  ).catch((error) => {
    console.error("Failed to fetch services page metadata:", error);
    return null;
  });

  return getMetadataFromSanity({
    seo: pageData?.seo ?? null,
    path: "/services",
    defaultTitle: SERVICES_DEFAULT_TITLE,
    defaultDescription: SERVICES_DEFAULT_DESCRIPTION,
  });
}

export default async function ServicesPage() {
  const breadcrumbSteps = [{ label: `Hjem`, href: `/` }, { label: "Services" }];

  const services = await fetchSanityData<Service[]>(SERVICES_PAGE_QUERY);
  const servicesFaq = await fetchSanityData<ServicesFaq>(SERVICES_FAQ_QUERY);

  return (
    <>
      <Hero />
      <Breadcrumbs steps={breadcrumbSteps} currentPath="/services" />
      <Suspense fallback={<Loader />}>
        <Services services={services} />
      </Suspense>
      <FaqSchema faqItems={servicesFaq?.faq?.items} id="services-faq-schema" />
      <Suspense fallback={<Loader className="h-[425px]" />}>
        <Faq faq={servicesFaq?.faq} />
      </Suspense>
    </>
  );
}
