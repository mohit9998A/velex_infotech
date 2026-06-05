import path from "node:path";
import { fileURLToPath } from "node:url";

import type { NextConfig } from "next";

// Pin Turbopack's workspace root to this project (a stray empty lockfile exists
// in the parent folder, which otherwise makes Next infer the wrong root).
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: { root: projectRoot },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn-icons-png.flaticon.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "prod.spline.design" },
      { protocol: "https", hostname: "api.microlink.io" },
      { protocol: "https", hostname: "bonn.in" },
      { protocol: "https", hostname: "*.bonn.in" },
      { protocol: "https", hostname: "fabxpertmetal.ae" },
      { protocol: "https", hostname: "*.fabxpertmetal.ae" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
};

export default nextConfig;
