import type { LucideIcon } from "lucide-react";

export interface ServiceBenefit {
  title: string;
  description: string;
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
