export const siteConfig = {
  name: "Velex Infotech",
  shortName: "Velex",
  tagline: "Intelligent Solutions. Premium Results.",
  // The canonical origin. Every canonical tag, og:url, sitemap entry, robots
  // directive and JSON-LD @id is derived from this — no other file should hold
  // the domain as a literal. Must match the live domain exactly (no trailing
  // slash, no `www.`, which 301s to the apex via next.config.ts).
  url: "https://velexinfotech.com",
  description:
    "Premium AI-powered digital services for businesses that demand intelligence and luxury-grade execution. AI Automation, Agentic AI, Voice Agents, WhatsApp Chatbots, and luxury web development.",
  founder: "Mohit Dutta",
  email: "velexinfotech@gmail.com",
  phoneDisplay: "+91 89689 35766",
  phone: "+918968935766",
  whatsapp: "https://wa.me/918968935766",
  location: "Ludhiana, Punjab, India",
  locale: "en_IN",
  social: {
    instagram: "https://instagram.com/velexinfotech.ai",
    linkedin: "https://linkedin.com/company/velex-infotech",
    twitter: "https://twitter.com/velexinfotech",
    youtube: "https://youtube.com/@velexinfotech",
  },
  stats: {
    projects: "200+",
    valuation: "₹10,000Cr",
    clients: "50+",
    services: "7",
  },
} as const;

export type SiteConfig = typeof siteConfig;
