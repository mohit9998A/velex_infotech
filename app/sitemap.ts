import type { MetadataRoute } from "next";

import type { ServiceItem } from "@/types";
import servicesData from "@/content/services.json";
import { blogPosts } from "@/content/blog";
import { absoluteUrl } from "@/lib/seo";

const services = servicesData as ServiceItem[];

/**
 * Static routes. Service and blog URLs are derived from their content sources
 * below rather than listed here.
 *
 * Nothing in this file may name a route that doesn't exist — the previous
 * version advertised /pricing and /portfolio, both of which 404. Submitting
 * 404s wastes crawl budget and undermines trust in the rest of the sitemap.
 * `npm run verify:sitemap` checks every URL returns 200.
 */
const staticRoutes: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  lastModified: string;
}[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly", lastModified: "2026-08-03" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly", lastModified: "2026-08-03" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly", lastModified: "2026-08-03" },
  { path: "/contact", priority: 0.9, changeFrequency: "monthly", lastModified: "2026-08-03" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly", lastModified: "2026-08-03" },
  { path: "/locations/ludhiana", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-08-03" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly", lastModified: "2026-08-03" },
  { path: "/terms-of-service", priority: 0.3, changeFrequency: "yearly", lastModified: "2026-08-03" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticRoutes.map((r) => ({
    url: absoluteUrl(r.path),
    lastModified: r.lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const serviceEntries = services.map((s) => ({
    url: absoluteUrl(`/services/${s.slug}`),
    lastModified: "2026-08-03",
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const blogEntries = blogPosts.map((p) => ({
    url: absoluteUrl(`/blog/${p.slug}`),
    lastModified: p.updatedAt ?? p.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...serviceEntries, ...blogEntries];
}
