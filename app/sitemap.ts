import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const now = new Date();

  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "weekly" },
    { path: "/services/ai-automation", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services/agentic-ai", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services/voice-agent", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services/web-development", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services/whatsapp-bot", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services/app-development", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services/ai-integration", priority: 0.9, changeFrequency: "monthly" },
    { path: "/pricing", priority: 0.8, changeFrequency: "monthly" },
    { path: "/portfolio", priority: 0.8, changeFrequency: "weekly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  ];

  return routes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
