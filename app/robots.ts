import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo";

/**
 * AI/LLM crawlers, allowed explicitly.
 *
 * A single `User-agent: *` rule already permits them, but several of these
 * bots look for their own token before falling back to the wildcard, and some
 * operators publish "allowed only if named" guidance. Naming them removes the
 * ambiguity. Being cited by AI search is a stated goal, so this is deliberate
 * — remove a token here to opt out of that crawler.
 */
const aiCrawlers = [
  "GPTBot", // OpenAI — ChatGPT training + browsing
  "OAI-SearchBot", // OpenAI — ChatGPT search index
  "ChatGPT-User", // OpenAI — user-initiated fetches
  "ClaudeBot", // Anthropic
  "Claude-User", // Anthropic — user-initiated fetches
  "PerplexityBot", // Perplexity
  "Google-Extended", // Google — Gemini / AI Overviews grounding
  "Applebot-Extended", // Apple Intelligence
  "CCBot", // Common Crawl (feeds many LLM datasets)
];

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/api/", "/admin/"];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: aiCrawlers, allow: "/", disallow },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteConfig.url,
  };
}
