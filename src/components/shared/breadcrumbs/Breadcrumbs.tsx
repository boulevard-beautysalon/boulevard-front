import Link from "next/link";
import Container from "../container/Container";

export interface BreadcrumbStep {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  steps: BreadcrumbStep[];
  currentPath?: string;
  showNav?: boolean;
  className?: string;
}

type BreadcrumbListSchema = {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }>;
};

const DEFAULT_SITE_URL = "https://boulevardsalon.dk";

function getBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!envUrl) return DEFAULT_SITE_URL;
  return envUrl.replace(/\/+$/, "");
}

function toAbsoluteUrl(baseUrl: string, href: string): string {
  if (/^https?:\/\//i.test(href)) {
    return href.replace(/\/+$/, "");
  }

  const normalizedPath = href.startsWith("/") ? href : `/${href}`;
  return `${baseUrl}${normalizedPath}`.replace(/\/+$/, "");
}

function buildBreadcrumbSchema(
  steps: BreadcrumbStep[],
  currentPath?: string,
): BreadcrumbListSchema | null {
  if (!steps.length) return null;

  const baseUrl = getBaseUrl();
  const prepared = steps
    .map((step, index) => {
      const fallbackHref = index === steps.length - 1 ? currentPath : undefined;
      const href = step.href || fallbackHref;
      if (!href) return null;

      const name = step.label.trim();
      if (!name) return null;

      return {
        name,
        item: toAbsoluteUrl(baseUrl, href),
      };
    })
    .filter((item): item is { name: string; item: string } => item !== null);

  if (!prepared.length) return null;

  const unique: Array<{ name: string; item: string }> = [];
  const seen = new Set<string>();
  for (const item of prepared) {
    const key = `${item.name}|${item.item}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(item);
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: unique.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

function Breadcrumbs({
  steps,
  currentPath,
  showNav = true,
  className = "",
}: BreadcrumbsProps) {
  if (!steps.length) return null;

  const parents = steps.slice(0, -1);
  const current = steps[steps.length - 1]!;
  const breadcrumbSchema = buildBreadcrumbSchema(steps, currentPath);

  const navClass = `relative z-10 pt-5 lg:pt-10 pb-25 lg:pb-[127px] font-montserrat font-light leading-[120%] text-[12px] lg:text-[16px] ${className}`;
  const sep = (
    <span className="mx-2 shrink-0 select-none" aria-hidden="true">
      /
    </span>
  );

  if (!showNav) {
    return breadcrumbSchema ? (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    ) : null;
  }

  return (
    <Container>
      {breadcrumbSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
      ) : null}
      <nav aria-label="Breadcrumb" className={navClass}>
        <ul className="m-0 flex list-none flex-wrap items-baseline gap-y-2 p-0">
          {parents.map((step, index) => {
            const isLastParent = index === parents.length - 1;

            return (
              <li
                key={step.href ?? `crumb-${index}`}
                className="inline-flex shrink-0 items-baseline"
              >
                {index > 0 ? sep : null}
                <Link
                  href={step.href || "/"}
                  className="relative inline-block max-w-full break-words pb-0.5 font-light group border-b border-b-transparent xl:hover:border-b-black transition-colors duration-300 ease-out"
                >
                  {step.label}
                  <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-y-0 bg-white transition-transform duration-300 ease-out group-hover:scale-y-100" />
                </Link>
                {isLastParent && parents.length > 0 ? sep : null}
              </li>
            );
          })}

          <li className="flex items-baseline">
            <span
              aria-current="page"
              className="min-w-0 flex-1 text-left break-words font-light [overflow-wrap:anywhere]"
            >
              {current.label}
            </span>
          </li>
        </ul>
      </nav>
    </Container>
  );
}
export { Breadcrumbs };
