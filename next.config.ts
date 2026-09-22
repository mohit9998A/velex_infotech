import path from "node:path";
import { fileURLToPath } from "node:url";

import createMDX from "@next/mdx";
import type { NextConfig } from "next";

// Pin Turbopack's workspace root to this project (a stray empty lockfile exists
// in the parent folder, which otherwise makes Next infer the wrong root).
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: { root: projectRoot },
  // Nodemailer (app/api/contact) is CommonJS and resolves its transports with
  // dynamic require() at call time. Bundling it rewrites those requires into
  // something Turbopack cannot satisfy, and the failure surfaces at runtime on
  // the one route where failure costs a lead. It is not on Next's built-in
  // auto-externalized list, so it has to be named here.
  serverExternalPackages: ["nodemailer"],
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
      { protocol: "https", hostname: "res.cloudinary.com" },
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
      // "Voice agent" is a phrase almost nobody searches — the demand is under
      // "AI receptionist" and "AI phone answering service" (see Plan.md §1.3).
      // The slug was renamed to match. Keep this redirect permanently: the old
      // URL is in the previous sitemap, in llms.txt, and in any link that
      // already exists.
      {
        source: "/services/voice-agent",
        destination: "/services/ai-receptionist",
        permanent: true,
      },
    ];
  },
  // Client router cache configuration: cache visited static routes for 3 minutes
  // and dynamic routes for 30 seconds to speed up client-side navigations.
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
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
      // Static images and public assets
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*.(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Never cache API routes
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0",
          },
        ],
      },
    ];
  },
};

/**
 * MDX v3 ships no GFM. Without remark-gfm the pipe-table in
 * content/blog/ai-automation-roi.mdx rendered as literal `| Metric | ... |`
 * text, and the table/th/td mappings in mdx-components.tsx were dead code.
 * Comparison tables are the highest-citation content format there is, so this
 * is load-bearing for the content plan, not a nicety.
 *
 * rehype-slug gives `##` headings real `id`s, which is what makes deep links
 * into a section work — mdx-components.tsx already sets `scroll-mt-28` on h2
 * in anticipation of anchors that did not previously exist.
 */
const withMDX = createMDX({
  options: {
    // Plugin NAMES, not imported functions. This project builds with
    // Turbopack, and loader options are serialised across the JS/Rust
    // boundary — passing the imported plugin fails the build outright with
    // "does not have serializable options". See the Turbopack section of
    // node_modules/next/dist/docs/01-app/02-guides/mdx.md.
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: ["rehype-slug"],
  },
});

export default withMDX(nextConfig);
