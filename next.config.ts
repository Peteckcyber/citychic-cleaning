import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Cloudflare Pages. No server runs in production.
  output: "export",
  images: {
    // PENDING: switch to a custom Cloudflare Images loader once the client
    // confirms whether images live on Cloudflare Images or plain R2.
    unoptimized: true,
  },
};

export default nextConfig;
