import Image from "next/image";
import Link from "next/link";
import type { GiftCard } from "@/types/giftCard";
import { urlForSanityImage } from "@/utils/getUrlForSanityImage";

interface GiftCardItemProps {
  card: GiftCard;
}

export default function GiftCardItem({ card }: GiftCardItemProps) {
  const checkoutHref = card.stripeCheckoutUrl || "#";
  const isExternal = Boolean(card.stripeCheckoutUrl);
  const imageUrl = card.image?.asset
    ? urlForSanityImage(card.image).width(1280).fit("max").url()
    : null;

  const buttonClass = `flex w-full h-12 lg:h-[57px] items-center justify-center rounded-full border border-black uppercase text-[12px] lg:text-[14px] font-normal leading-[120%] tracking-[0.06em] transition-colors duration-500 ease-in-out ${
    card.primary
      ? "bg-black text-beige xl:hover:bg-transparent xl:hover:text-black"
      : "bg-transparent text-black xl:hover:bg-black xl:hover:text-beige"
  }`;

  return (
    <article className="flex flex-col rounded-2xl border border-[#E2D9CF] bg-white overflow-hidden will-change-transform transition-all duration-700 ease-in-out lg:hover:-translate-y-1 lg:hover:shadow-[0_20px_56px_rgba(26,26,24,0.10)]">
      <div className="relative aspect-[1280/905] w-full shrink-0 bg-[#E8DDD2]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={card.image?.alt ?? `Gavekort ${card.amount} kr`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
          />
        ) : null}
      </div>
      <div className="flex flex-col flex-1 gap-2 px-7 pt-7 pb-8">
        {card.popular ? (
          <p className="flex items-center gap-2 mb-1 text-[10px] tracking-[0.14em] uppercase text-brown">
            <span className="inline-block w-[18px] h-px bg-brown" />
            Mest populære
          </p>
        ) : null}
        <p className="font-evolenta text-[40px] lg:text-[48px] leading-none tracking-[-0.02em] text-black">
          {card.amount} kr
        </p>
        <p className="flex-1 mb-5 text-[13px] lg:text-[14px] leading-[150%] font-light text-black/70">
          {card.description}
        </p>
        {isExternal ? (
          <a
            href={checkoutHref}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass}
          >
            Køb
          </a>
        ) : (
          <Link href={checkoutHref} className={buttonClass}>
            Køb
          </Link>
        )}
      </div>
    </article>
  );
}
