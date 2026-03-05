import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.transparenttextures.com",
      },
    ],
  },
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
