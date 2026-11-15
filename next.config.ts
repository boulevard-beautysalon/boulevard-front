import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Resize images on the Sanity CDN instead of Vercel's /_next/image
    // optimiser, so they never count against the Hobby image-optimisation
    // quota (1,000 source images → the client gets billed). See the loader.
    loader: "custom",
    loaderFile: "./src/lib/sanityImageLoader.ts",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
      /** Google профільні фото (lh3, lh4, …) — один wildcard замість переліку субдоменів */
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
