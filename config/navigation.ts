import type { NavGroup } from "@/types";

/**
 * Shared by the navbar and the footer.
 *
 * Every service in content/services.json must appear here, or the page is
 * orphaned — which is exactly what happened to /locations/ludhiana, and
 * orphaned pages are a classic cause of "Discovered – currently not indexed".
 *
 * Three entries previously pointed at `/services/web-development#content`,
 * `#design` and `#video`. No element on that page carries those ids, so all
 * three landed silently at the top of the page — from both the navbar and the
 * footer. They now point at the real page. If Content Creation, Graphic Design
 * and Video Editing are genuinely sold as standalone services, give them their
 * own service entries rather than fragments that don't exist.
 */
export const navGroups: NavGroup[] = [
  {
    label: "AI",
    links: [
      {
        label: "AI Agent Development",
        href: "/services/agentic-ai",
        description: "Autonomous agents that plan, reason and execute.",
      },
      {
        label: "AI Automation",
        href: "/services/ai-automation",
        description: "End-to-end workflow automation with LLMs & RPA.",
      },
      {
        label: "AI Receptionist",
        href: "/services/ai-receptionist",
        description: "AI phone answering that books and qualifies, 24/7.",
      },
      {
        label: "WhatsApp Chatbot",
        href: "/services/whatsapp-bot",
        description: "Conversational commerce on WhatsApp Business API.",
      },
      {
        label: "AI Integration",
        href: "/services/ai-integration",
        description: "Embed AI into your existing business stack.",
      },
      {
        label: "AI Consulting",
        href: "/services/ai-consulting",
        description: "Where AI pays back, and where it does not.",
      },
    ],
  },
  {
    label: "Build",
    links: [
      {
        label: "Software Development",
        href: "/services/software-development",
        description: "Custom systems, ERP extensions and integrations.",
      },
      {
        label: "Website Development",
        href: "/services/web-development",
        description: "Performance-first web experiences in Next.js.",
      },
      {
        label: "App Development",
        href: "/services/app-development",
        description: "AI-native mobile & web applications.",
      },
      {
        label: "Data Analytics",
        href: "/services/data-analytics",
        description: "Dashboards, pipelines and business intelligence.",
      },
    ],
  },
  {
    label: "Company",
    links: [
      {
        // The services hub was in neither the navbar nor the footer nor the
        // homepage — its only inbound links came from /industries and the
        // service detail pages, making it the weakest-linked commercial page
        // on the domain. It sits in Company rather than in a fourth group
        // because footer.tsx's grid has room for exactly three link columns.
        label: "All Services",
        href: "/services",
        description: "Every capability in one place.",
      },
      { label: "About Us", href: "/about" },
      { label: "Industries", href: "/industries" },
      { label: "Portfolio", href: "/#portfolio" },
      { label: "Blog", href: "/blog" },
      { label: "Locations", href: "/locations" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
