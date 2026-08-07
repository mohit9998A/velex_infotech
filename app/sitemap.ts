import type { MetadataRoute } from "next";

import type { IndustryItem, ServiceItem } from "@/types";
import servicesData from "@/content/services.json";
import industriesData from "@/content/industries.json";
import { blogPosts } from "@/content/blog";
import { absoluteUrl } from "@/lib/seo";

const services = servicesData as ServiceItem[];
const industries = industriesData as IndustryItem[];

/**
 * Static routes. Service, industry and blog URLs are derived from their content
 * sources below rather than listed here.
 *
 * Nothing in this file may name a route that doesn't exist — the previous
 * version advertised /pricing and /portfolio, both of which 404. Submitting
 * 404s wastes crawl budget and undermines trust in the rest of the sitemap.
 * `npm run verify:content` now checks that every path here has a real
 * `page.tsx` (the `verify:sitemap` script this comment used to name never
 * existed).
 *
 * `lastModified` is maintained by hand here and read from the content source
 * for services, industries and posts. Bump a date only when that page's content
 * actually changed: a sitemap reporting every URL as modified on every deploy
 * is one Google learns to ignore, which costs more than a stale date ever would.
 */
const staticRoutes: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  lastModified: string;
}[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly", lastModified: "2026-08-03" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly", lastModified: "2026-08-07" },
  { path: "/industries", priority: 0.7, changeFrequency: "monthly", lastModified: "2026-08-07" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly", lastModified: "2026-08-03" },
  { path: "/contact", priority: 0.9, changeFrequency: "monthly", lastModified: "2026-08-03" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly", lastModified: "2026-08-03" },
  // The locations tree. /locations/ludhiana previously had zero inbound
  // internal links and sat here alone; the hub is what put it in the graph.
  { path: "/locations", priority: 0.7, changeFrequency: "monthly", lastModified: "2026-08-07" },
  { path: "/locations/ludhiana", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-08-07" },
  { path: "/locations/noida", priority: 0.6, changeFrequency: "monthly", lastModified: "2026-08-07" },
  { path: "/locations/india", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-08-07" },
  { path: "/locations/usa", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-08-07" },
  { path: "/locations/uk", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-08-07" },
  { path: "/locations/canada", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-08-07" },
  // Gained an analytics-and-cookies section when GA4 was added.
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly", lastModified: "2026-08-07" },
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
    lastModified: s.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const industryEntries = industries.map((i) => ({
    url: absoluteUrl(`/industries/${i.slug}`),
    lastModified: i.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogEntries = blogPosts.map((p) => ({
    url: absoluteUrl(`/blog/${p.slug}`),
    lastModified: p.updatedAt ?? p.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...serviceEntries, ...industryEntries, ...blogEntries];
}
