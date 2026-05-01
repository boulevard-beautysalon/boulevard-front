export const revalidate = 60;

import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/shared/header/Header";
import Footer from "@/components/shared/footer/Footer";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
import { getDefaultMetadata } from "@/utils/getDefaultMetadata";
import { OrganizationSchema } from "@/components/shared/OrganizationSchema";
import { WebPageSchema } from "@/components/shared/WebPageSchema";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  preload: true,
  fallback: ["Arial", "sans-serif"],
});

const evolenta = localFont({
  src: "../../public/fonts/evolenta-regular.ttf",
  variable: "--font-evolenta",
  display: "swap",
  preload: true,
  fallback: ["Arial", "sans-serif"],
});

export async function generateMetadata() {
  return getDefaultMetadata("/");
}

const GTM_ID = "GTM-5TTTZH5S";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="da"
      className={`${montserrat.variable} ${evolenta.variable} antialiased`}
    >
      <head>
        <OrganizationSchema />
        <GoogleTagManager gtmId={GTM_ID} />
        <Script
          id="cookieyes"
          type="text/javascript"
          src="https://cdn-cookieyes.com/client_data/5266dfce1791de0e19363075f42147be/script.js"
        />
      </head>
      <body className="flex min-h-dvh flex-col text-[14px] lg:text-[16px] font-light leading-[120%]">
        <WebPageSchema />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
