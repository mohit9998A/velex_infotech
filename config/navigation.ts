import type { NavGroup, NavLink } from "@/types";

export const navGroups: NavGroup[] = [
  {
    label: "Solutions",
    links: [
      {
        label: "AI Automation",
        href: "/services/ai-automation",
        description: "End-to-end workflow automation with LLMs & RPA.",
      },
      {
        label: "Agentic AI",
        href: "/services/agentic-ai",
        description: "Autonomous agents that plan, reason and execute.",
      },
      {
        label: "Voice Agent",
        href: "/services/voice-agent",
        description: "24/7 AI phone assistants in Hindi & English.",
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
    ],
  },
  {
    label: "Services",
    links: [
      {
        label: "Web Development",
        href: "/services/web-development",
        description: "Luxury, performance-first web experiences.",
      },
      {
        label: "App Development",
        href: "/services/app-development",
        description: "AI-native mobile & web applications.",
      },
      {
        label: "Content Creation",
        href: "/services/web-development#content",
        description: "Premium brand content at scale.",
      },
      {
        label: "Graphic Designing",
        href: "/services/web-development#design",
        description: "Crystalline visual identity systems.",
      },
      {
        label: "Video Editing",
        href: "/services/web-development#video",
        description: "Cinematic edits for modern brands.",
      },
    ],
  },
  {
    label: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Portfolio", href: "/#portfolio" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

/** Flat links shown directly in the navbar (non-grouped) */
export const navLinks: NavLink[] = [
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Contact", href: "/contact" },
];
