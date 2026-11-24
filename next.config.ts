import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (isProduction ? "/ctrl-video-website" : "");

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
