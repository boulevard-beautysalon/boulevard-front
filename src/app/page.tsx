import Hero from "@/components/homePage/hero/Hero";
import Prices from "@/components/homePage/prices/Prices";
import About from "@/components/homePage/about/About";
import MarqueeLine from "@/components/shared/marquee/MarqueeLine";
import { Breadcrumbs } from "@/components/shared/breadcrumbs/Breadcrumbs";
import Services from "@/components/homePage/services/Services";
import {
  HOME_PAGE_SEO_QUERY,
  HOME_FAQ_QUERY,
  RESULTS_QUERY,
  SERVICES_HOME_QUERY,
  TEAM_MEMBERS_QUERY,
} from "@/lib/queries";
import { Service } from "@/types/service";
import type { TeamMember } from "@/types/team";
import type { HomeFaq } from "@/types/faq";
import type { ResultsData } from "@/types/results";
import { fetchSanityData } from "@/utils/fetchSanityData";
import { getWorkingHours } from "@/utils/getWorkingHours";
import Course from "@/components/homePage/course/Course";
import Results from "@/components/homePage/results/Results";
import Team from "@/components/homePage/team/Team";
import Loader from "@/components/shared/loader/Loader";
import Reviews from "@/components/homePage/reviews/Reviews";
import { Suspense } from "react";
import Faq from "@/components/shared/faq/Faq";
import { FaqSchema } from "@/components/shared/faq/FaqSchema";
import Blog from "@/components/homePage/blog/Blog";
import { getGoogleReviews } from "@/utils/getGoogleReviews";
import type { Metadata } from "next";
import { getMetadataFromSanity } from "@/utils/getMetadataFromSanity";
import type { PageSeo } from "@/types/page";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchSanityData<{ seo: PageSeo | null }>(
    HOME_PAGE_SEO_QUERY,
  ).catch((error) => {
    console.error("Failed to fetch home page metadata:", error);
    return null;
  });

  return getMetadataFromSanity({
    seo: pageData?.seo ?? null,
    path: "/",
  });
}

export default async function HomePage() {
  const breadcrumbSteps = [{ label: "Forside", href: "/" }];
  const services = await fetchSanityData<Service[]>(SERVICES_HOME_QUERY);
  const workingHours = await getWorkingHours();
  const teamMembers = await fetchSanityData<TeamMember[]>(TEAM_MEMBERS_QUERY);
  const homeFaq = await fetchSanityData<HomeFaq>(HOME_FAQ_QUERY);
  const results = await fetchSanityData<ResultsData | null>(RESULTS_QUERY);
  const googleReviews = await getGoogleReviews();

  return (
    <>
      <Breadcrumbs
        steps={breadcrumbSteps}
        currentPath="/"
        showNav={false}
      />
      <Hero />
      <Suspense fallback={<Loader className="h-[680px]" />}>
        <Services services={services} />
      </Suspense>
      <Results data={results} />
      <MarqueeLine variant="black" className="mb-14" />
      <Course />
      <Suspense fallback={<Loader className="h-[780px] lg:h-[425px]" />}>
        <Prices from={workingHours?.from} to={workingHours?.to} />
      </Suspense>
      <About />
      <Suspense fallback={<Loader className="h-[425px]" />}>
        <Team teamMembers={teamMembers} />
      </Suspense>
      <Suspense fallback={<Loader className="h-[425px]" />}>
        <Reviews reviews={googleReviews} />
      </Suspense>
      <MarqueeLine variant="black" className="mb-9 lg:mb-[116px]" />
      <FaqSchema faqItems={homeFaq?.faq?.items} id="home-faq-schema" />
      <Suspense fallback={<Loader className="h-[425px]" />}>
        <Faq faq={homeFaq?.faq} />
      </Suspense>
      <Blog />
    </>
  );
}
