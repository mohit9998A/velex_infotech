import type { StaticImageData } from "next/image";

import agenticAi from "@/public/images/services/agent.webp";
import aiAutomation from "@/public/images/services/automation.webp";
import appDevelopment from "@/public/images/services/software.webp";
import voiceAgent from "@/public/images/services/receptionist.webp";
import webDevelopment from "@/public/images/services/website.webp";
import whatsappBot from "@/public/images/services/whatsapp.webp";

/**
 * Static imports rather than the `image` path string in services.json.
 *
 * A static import gives next/image the intrinsic width and height at build
 * time (so no hand-maintained dimensions to drift, and no layout shift) and
 * generates a blurDataURL for the placeholder. The JSON stays plain
 * serialisable data.
 *
 * Services missing from this map render without a hero image — the consumer in
 * app/services/[slug]/page.tsx guards on it. That is deliberate: shipping the
 * page without art beats blocking the page on art.
 *
 * ASSET SPEC — 1792x1008 WebP, quality 82.
 * 1792 is exactly 2x the 896px `max-w-4xl` container, which is the hard cap on
 * what any screen can request; larger sources are pure waste. 16:9 because the
 * page renders `aspect-[16/9] object-cover`.
 *
 * The previous set violated all of that: they were 1024x1024 JPEGs carrying a
 * `.png` extension, so ~44% of every image was cropped away unseen and retina
 * screens still got an effectively 1x render off a ~800 KB file. 5.22 MB total
 * became 1.09 MB. Regenerate with `node scripts/optimize-service-images.mjs`.
 */
export const serviceImages: Record<string, StaticImageData> = {
  "ai-automation": aiAutomation,
  "agentic-ai": agenticAi,
  // Key renamed with the slug (was "voice-agent"); the asset filename is
  // unchanged because renaming it would break nothing and cost a git move.
  "ai-receptionist": voiceAgent,
  "whatsapp-bot": whatsappBot,
  "web-development": webDevelopment,
  "app-development": appDevelopment,
  "software-development": appDevelopment,
  "ai-integration": aiAutomation,
  "ai-consulting": agenticAi,
  "data-analytics": webDevelopment,
};

export const serviceCardImages: Record<string, StaticImageData> = {
  "ai-automation": aiAutomation,
  "agentic-ai": agenticAi,
  "ai-receptionist": voiceAgent,
  "whatsapp-bot": whatsappBot,
  "web-development": webDevelopment,
  "app-development": appDevelopment,
  "software-development": appDevelopment,
  "ai-integration": aiAutomation,
  "ai-consulting": agenticAi,
  "data-analytics": webDevelopment,
};

// High-resolution Cloudinary 3D hero illustrations for service slug pages
const whatsappHeroUrl =
  "https://res.cloudinary.com/d0grbozz/image/upload/v1789991540/whatsapp_hero.webp";
const websiteHeroUrl =
  "https://res.cloudinary.com/d0grbozz/image/upload/v1789991497/website_hero.webp";
const softwareHeroUrl =
  "https://res.cloudinary.com/d0grbozz/image/upload/v1789991472/software_hero.webp";
const receptionistHeroUrl =
  "https://res.cloudinary.com/d0grbozz/image/upload/v1789991448/receptionist_hero.webp";
const appHeroUrl =
  "https://res.cloudinary.com/d0grbozz/image/upload/v1789991441/app_hero.webp";
const agentHeroUrl =
  "https://res.cloudinary.com/d0grbozz/image/upload/v1789991437/agent_hero.webp";
const consultHeroUrl =
  "https://res.cloudinary.com/d0grbozz/image/upload/v1789991433/consult_hero.webp";
const automationHeroUrl =
  "https://res.cloudinary.com/d0grbozz/image/upload/v1789991433/automation_hero.webp";

export const serviceHeroImages: Record<string, string> = {
  "ai-automation": automationHeroUrl,
  "agentic-ai": agentHeroUrl,
  "ai-receptionist": receptionistHeroUrl,
  "whatsapp-bot": whatsappHeroUrl,
  "web-development": websiteHeroUrl,
  "app-development": appHeroUrl,
  "software-development": softwareHeroUrl,
  "ai-consulting": consultHeroUrl,
  "ai-integration": automationHeroUrl,
  "data-analytics": softwareHeroUrl,
};

export interface ServiceHeroMetric {
  icon: "zap" | "chart" | "clock" | "shield" | "sparkles";
  value: string;
  label: string;
}

export const serviceHeroMetrics: Record<string, ServiceHeroMetric[]> = {
  "ai-automation": [
    { icon: "zap", value: "3–6", label: "Workflows Live (First Engagement)" },
    { icon: "chart", value: "40%+", label: "Avg. Productivity Increase" },
    { icon: "clock", value: "2–5 Weeks", label: "Typical Delivery Timeline" },
  ],
  "agentic-ai": [
    { icon: "zap", value: "Multi-Step", label: "Autonomous Planning & Actions" },
    { icon: "shield", value: "100%", label: "Audit Logging & Guardrails" },
    { icon: "clock", value: "3–6 Weeks", label: "Production Deployment" },
  ],
  "ai-receptionist": [
    { icon: "zap", value: "<1 Sec", label: "Sub-Second Voice Response" },
    { icon: "chart", value: "24/7/365", label: "Zero Missed Calls or Leads" },
    { icon: "sparkles", value: "English + Hindi", label: "Fluent Dual-Language Booking" },
  ],
  "whatsapp-bot": [
    { icon: "zap", value: "Meta API", label: "Official Verified Business API" },
    { icon: "chart", value: "24/7", label: "Automated Lead Capture & CRM Sync" },
    { icon: "clock", value: "1–2 Weeks", label: "Setup to Live Chat Launch" },
  ],
  "ai-integration": [
    { icon: "zap", value: "0 Disruption", label: "No Rip-and-Replace Migration" },
    { icon: "shield", value: "100%", label: "Existing Stack Compatibility" },
    { icon: "clock", value: "2–4 Weeks", label: "Model Integration Timeline" },
  ],
  "ai-consulting": [
    { icon: "zap", value: "100%", label: "Costed Roadmap (Not Slide Decks)" },
    { icon: "chart", value: "2–3", label: "High-ROI Viable Workflows" },
    { icon: "clock", value: "1–2 Weeks", label: "Audit & Opportunity Discovery" },
  ],
  "software-development": [
    { icon: "zap", value: "100%", label: "Custom Architecture & IP Ownership" },
    { icon: "shield", value: "0%", label: "Subcontracting or Vendor Lock-in" },
    { icon: "clock", value: "4–8 Weeks", label: "Target Architecture to MVP" },
  ],
  "web-development": [
    { icon: "zap", value: "90+", label: "Lighthouse & Core Web Vitals" },
    { icon: "sparkles", value: "3D & Motion", label: "Luxury Interactive UI/UX" },
    { icon: "clock", value: "3–5 Weeks", label: "Concept to Production Launch" },
  ],
  "app-development": [
    { icon: "zap", value: "iOS & Android", label: "Cross-Platform Native Experience" },
    { icon: "sparkles", value: "AI-Native", label: "Intelligence Built into Core" },
    { icon: "clock", value: "6–12 Weeks", label: "Testable MVP Production Build" },
  ],
  "data-analytics": [
    { icon: "zap", value: "6 Metrics", label: "High-Impact Decision Dashboards" },
    { icon: "chart", value: "1 Source", label: "Unified Cross-System View" },
    { icon: "clock", value: "2–4 Weeks", label: "Pipeline to Active Reporting" },
  ],
};

export const serviceHeroAnnotations: Record<string, [string, string, string]> = {
  "ai-automation": ["Automate", "Connect", "Accelerate"],
  "agentic-ai": ["Reason", "Plan", "Execute"],
  "ai-receptionist": ["Listen", "Understand", "Resolve"],
  "whatsapp-bot": ["Engage", "Qualify", "Convert"],
  "ai-integration": ["Connect", "Embed", "Accelerate"],
  "ai-consulting": ["Audit", "Rank", "Roadmap"],
  "software-development": ["Architect", "Build", "Scale"],
  "web-development": ["Design", "Captivate", "Convert"],
  "app-development": ["Build", "Iterate", "Scale"],
  "data-analytics": ["Instrument", "Analyze", "Decide"],
};

