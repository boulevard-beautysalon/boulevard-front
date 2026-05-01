import Image from "next/image";

interface CertVisualProps {
  className?: string;
}

export default function CertVisual({ className = "" }: CertVisualProps) {
  return (
    <div className={`relative w-full ${className}`}>
      {/* invisible spacer to set the height to the image aspect ratio */}
      <div className="aspect-[1280/905] w-full" />

      <div
        className="absolute top-1/2 left-1/2 w-[88%] aspect-[1280/905] rounded-2xl border border-[#E2D9CF]"
        style={{
          background: "linear-gradient(135deg, #E8DDD2, #D5C9BC)",
          boxShadow: "0 8px 32px rgba(26,26,24,0.08)",
          transform:
            "translate(calc(-50% - 6%), calc(-50% + 4%)) rotate(-4deg)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-[94%] aspect-[1280/905] rounded-2xl border border-[#E2D9CF]"
        style={{
          background: "linear-gradient(135deg, #F0E9DF, #E6DDD2)",
          boxShadow: "0 12px 40px rgba(26,26,24,0.10)",
          transform:
            "translate(calc(-50% + 2%), calc(-50% + 2%)) rotate(-1.5deg)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-full aspect-[1280/905] rounded-2xl overflow-hidden -translate-x-1/2 -translate-y-1/2"
        style={{ boxShadow: "0 16px 56px rgba(26,26,24,0.14)" }}
      >
        <Image
          src="/images/gavekortPage/intro/cert-card.webp"
          alt="Boulevard Beauty Salon Gavekort"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
