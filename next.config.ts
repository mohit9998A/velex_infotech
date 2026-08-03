import path from "node:path";
import { fileURLToPath } from "node:url";

import createMDX from "@next/mdx";
import type { NextConfig } from "next";

// Pin Turbopack's workspace root to this project (a stray empty lockfile exists
// in the parent folder, which otherwise makes Next infer the wrong root).
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: { root: projectRoot },
  // Blog posts are .mdx files imported by app/blog/[slug]/page.tsx.
  pageExtensions: ["ts", "tsx", "js", "jsx", "mdx"],
  images: {
    // AVIF first, WebP fallback. The 7 service hero PNGs are 680-880 KB each
    // and were previously served raw through a plain <img>; routed through
    // next/image they re-encode to a fraction of that. AVIF is opt-in — the
    // Next 16 default is webp only.
    formats: ["image/avif", "image/webp"],
    // Next 16 narrowed the default to [75]; a `quality` outside the allowlist
    // is coerced, and a direct /_next/image request with one 400s.
    qualities: [75, 90],
    // Build assets are immutable, so cache far longer than the new 4h default.
    minimumCacheTTL: 2678400,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "prod.spline.design" },
    ],
  },
  async redirects() {
    return [
      // www and apex both served 200 with identical content, duplicating the
      // entire site. The apex is canonical (see config/site.ts), so www 308s to
      // it. `type: "host"` matching is supported by redirects() in Next 16 —
      // no proxy.ts needed.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.velexinfotech.com" }],
        destination: "https://velexinfotech.com/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
