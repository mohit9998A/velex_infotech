import type { LucideIcon } from "lucide-react";

export interface ServiceBenefit {
  title: string;
  description: string;
}

/**
 * One Q&A pair on a service page.
 *
 * The same array feeds `faqSchema()` and the rendered accordion — they must
 * never diverge, because FAQPage markup describing content a visitor cannot see
 * is exactly what Google treats as structured-data spam.
 */
export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceItem {
  slug: string;
  title: string;
  icon: string; // lucide icon name (resolved via icon map)
  tagline: string;
  description: string;
  badge?: string;
  gradient: string; // tailwind gradient utility classes
  highlights: string[];
  href: string;
  segment: "B2B" | "B2C" | "Both";
  // Detail-page content (optional — present on services rendered as full pages)
  overview?: string;
  benefits?: ServiceBenefit[];
  useCases?: string[];
  metaTitle?: string;
  metaDescription?: string;
  image?: string;
  /**
   * ISO date (YYYY-MM-DD) this service's copy last genuinely changed. Feeds
   * `lastModified` in app/sitemap.ts, which previously hardcoded one date for
   * every service. Bump it only on a real content change — a sitemap that
   * claims every page changed on every deploy gets its lastmod ignored.
   */
  updatedAt: string;
  /** Rendered as an accordion and emitted as FAQPage. Both, or neither. */
  faqs?: ServiceFaq[];
}

/**
 * A vertical we have a real, differentiated answer for.
 *
 * Deliberately a short list with one hand-written page each, for the same
 * reason there is no `app/locations/[slug]` route: a data-driven industry
 * template is how a site ends up with twenty near-identical vertical pages
 * that Google classifies as doorway content. This file exists so the hub,
 * sitemap and llms.txt derive from one source — not so pages can be generated.
 */
export interface IndustryItem {
  slug: string;
  title: string;
  /** Breadcrumb and card label, e.g. "Healthcare". */
  shortName: string;
  icon: string;
  tagline: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  /** ISO date (YYYY-MM-DD). Feeds sitemap lastModified. */
  updatedAt: string;
  /** Service slugs cross-linked from the page. */
  relatedServices: string[];
}

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  monthly: number | null; // null => "Custom"
  annual: number | null;
  currency: string;
  unit: string;
  popular?: boolean;
  features: string[];
  cta: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  placeholder?: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ProcessStep {
  id: string;
  index: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface StatItem {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
}

export interface IntegrationItem {
  name: string;
  abbr: string;
  logo?: string;
}

/**
 * Preview treatment for a portfolio cover. Items without this render the
 * legacy gradient cover built from `accent`.
 */
export interface PortfolioPreview {
  /** "live" = poster plus a hover-activated iframe; "image" = poster only. */
  mode: "live" | "image";
  /** Committed screenshot under public/, e.g. /images/portfolio/bonn.webp */
  poster: string;
  /** URL to frame. Falls back to the item's `href`. */
  url?: string;
  /** Logical desktop width the iframe renders at before being scaled down. */
  frameWidth?: number;
  /**
   * How long to hold the poster after the frame loads, in ms. These sites run
   * intro animations well past their load event, so swapping on load alone
   * shows a blank or half-built page. Measured per site; see the header note
   * in portfolio-preview.tsx.
   */
  settleMs?: number;
}

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  category: string;
  segment: string;
  description: string;
  result: string;
  href: string | null;
  external: boolean;
  accent: string; // tailwind gradient classes for the cover
  placeholder?: boolean;
  preview?: PortfolioPreview;
}

/**
 * Front-matter for a blog post. The prose lives in the matching
 * `content/blog/<slug>.mdx`; this is everything the index, metadata, sitemap
 * and BlogPosting schema need without parsing the MDX.
 */
export interface BlogPost {
  slug: string;
  title: string;
  /** Meta description and index-card summary. Keep near 155 characters. */
  description: string;
  /** ISO date (YYYY-MM-DD). Feeds `datePublished`. */
  publishedAt: string;
  /** ISO date. Feeds `dateModified`; falls back to `publishedAt`. */
  updatedAt?: string;
  author: string;
  /** Primary keyword this post targets — documents intent for future edits. */
  targetKeyword: string;
  /** Rough read time in minutes, shown on the card. */
  readingMinutes: number;
  /** Service slugs this post links to, used to render "related services". */
  relatedServices: string[];
}

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  label: string;
  links: NavLink[];
}

export type IconComponent = LucideIcon;
