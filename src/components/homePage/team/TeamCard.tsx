import type { TeamMember } from "@/types/team";
import Image from "next/image";
import Link from "next/link";
import { urlForSanityImage } from "@/utils/getUrlForSanityImage";

interface TeamCardProps {
  teamMember: TeamMember;
}

function isExternalHref(href: string): boolean {
  return (
    /^https?:\/\//i.test(href) ||
    href.startsWith("//") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  );
}

export default function TeamCard({ teamMember }: TeamCardProps) {
  const href = teamMember.link?.trim();

  const cardInner = (
    <div className="relative flex flex-col justify-end w-[289px] h-[398px] p-4 rounded-[12px] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src={urlForSanityImage(teamMember.photo).url()}
          alt={teamMember.name}
          fill
          className="object-cover transition duration-1200 ease-in-out xl:group-hover:scale-105"
          sizes="289px"
        />
      </div>
      <div className="relative mb-1.5 inline-flex w-fit max-w-full overflow-hidden rounded-[999px] bg-white/10 px-6 py-4 shadow-[inset_0px_4px_12.6px_0px_rgba(255,255,255,0.25)] backdrop-blur-[10px]">
        <div
          className="absolute inset-0 rounded-[999px] pointer-events-none"
          style={{
            background:
              "linear-gradient(270.67deg, #F2F2F2 -9.58%, #C7C7C7 103.45%)",
            padding: "1px",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
        <p className="relative z-10 max-w-full font-evolenta text-[14px] leading-[120%] font-light uppercase text-beige">
          {teamMember.position}
        </p>
      </div>
      <p className="w-fit font-evolenta text-[14px] leading-[120%] font-light uppercase text-black bg-beige rounded-full px-6 py-4">
        {teamMember.name}
      </p>
    </div>
  );

  if (!href) {
    return cardInner;
  }

  const linkClassName =
    "group block w-fit rounded-[12px] outline-none focus-visible:ring-2 focus-visible:ring-beige focus-visible:ring-offset-2 focus-visible:ring-offset-black";

  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        {cardInner}
      </a>
    );
  }

  return (
    <Link href={href} className={linkClassName}>
      {cardInner}
    </Link>
  );
}
