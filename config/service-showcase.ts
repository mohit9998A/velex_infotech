export interface ServiceHeadline {
  line1: string;
  line2: string;
  highlight: string;
}

export interface ServiceShowcaseItem {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  tagline: string;
  dialogue: string;
  /** Concise 1-sentence punchline optimized for mobile viewport space */
  shortDialogue?: string;
  href: string;
  iconName: "whatsapp" | "bot" | "mic" | "smartphone" | "cube" | "chart";
  /** Orbital placement angle in degrees (0 = right, 90 = bottom, 180 = left, 270 = top) */
  angleDeg: number;
  /** Relative radius multiplier (e.g. 1.0 = standard orbit radius) */
  radiusScale?: number;
  accentColor: string;
  glowColor: string;
  headline: ServiceHeadline;
  leadPresetService: string;
}

export const DEFAULT_HERO_HEADLINE: ServiceHeadline = {
  line1: "Technology that",
  line2: "moves your",
  highlight: "business forward.",
};

export const DEFAULT_HERO_LEDE =
  "We help ambitious companies design, build and scale with AI-powered solutions, modern software and future-ready teams.";

export const DEFAULT_HERO_SHORT_LEDE =
  "Design, build and scale with AI-powered solutions & future-ready teams.";

export const DEFAULT_HERO_EYEBROW = "AI × SOFTWARE × REAL IMPACT";

export const HERO_SERVICES: ServiceShowcaseItem[] = [
  {
    id: "whatsapp-commerce",
    number: "01",
    title: "WhatsApp AI Chatbot",
    shortTitle: "WhatsApp AI",
    tagline: "WhatsApp AI Commerce",
    dialogue:
      "Meet your customers where they already shop. Automate conversations, recommend products, answer questions and convert WhatsApp chats into sales.",
    shortDialogue:
      "Automate customer conversations and convert WhatsApp chats into sales 24/7.",
    href: "/services/whatsapp-bot",
    iconName: "whatsapp",
    angleDeg: 205, // Upper-left
    radiusScale: 1.02,
    accentColor: "#25D366",
    glowColor: "rgba(37, 211, 102, 0.4)",
    headline: {
      line1: "Intelligent",
      line2: "WhatsApp AI",
      highlight: "Chatbots.",
    },
    leadPresetService: "WhatsApp AI Chatbot",
  },
  {
    id: "ai-employees",
    number: "02",
    title: "Autonomous AI Employees",
    shortTitle: "AI Employees",
    tagline: "Autonomous Workforce",
    dialogue:
      "Give your business an intelligent workforce. Deploy AI employees to handle repetitive tasks, automate workflows and assist your team around the clock.",
    shortDialogue:
      "Deploy intelligent AI agents to automate tasks and workflows around the clock.",
    href: "/services/agentic-ai",
    iconName: "bot",
    angleDeg: 260, // Top-left / Top
    radiusScale: 0.98,
    accentColor: "#9333EA",
    glowColor: "rgba(147, 51, 234, 0.45)",
    headline: {
      line1: "Autonomous",
      line2: "Digital",
      highlight: "AI Employees.",
    },
    leadPresetService: "AI Agent Development",
  },
  {
    id: "voice-agents",
    number: "03",
    title: "AI Voice Agents",
    shortTitle: "Voice Agents",
    tagline: "Inbound & Outbound Calling",
    dialogue:
      "Never miss a business opportunity. Our AI voice agents handle sales calls, customer support, lead qualification and meeting scheduling.",
    shortDialogue:
      "Handle inbound sales calls and customer scheduling with natural AI voice.",
    href: "/services/ai-receptionist",
    iconName: "mic",
    angleDeg: 320, // Top-right
    radiusScale: 1.0,
    accentColor: "#7138FF",
    glowColor: "rgba(113, 56, 255, 0.45)",
    headline: {
      line1: "Intelligent",
      line2: "AI Voice",
      highlight: "Agents.",
    },
    leadPresetService: "AI Receptionist",
  },
  {
    id: "mobile-apps",
    number: "04",
    title: "Mobile App Development",
    shortTitle: "Mobile Apps",
    tagline: "iOS & Android Solutions",
    dialogue:
      "Turn your ideas into powerful mobile experiences. We build modern iOS and Android applications designed for performance and growth.",
    shortDialogue:
      "Build modern iOS and Android applications designed for performance & scale.",
    href: "/services/app-development",
    iconName: "smartphone",
    angleDeg: 20, // Mid-right
    radiusScale: 1.02,
    accentColor: "#3B82F6",
    glowColor: "rgba(59, 130, 246, 0.4)",
    headline: {
      line1: "Native iOS &",
      line2: "Android",
      highlight: "Mobile Apps.",
    },
    leadPresetService: "App Development",
  },
  {
    id: "web-ecommerce",
    number: "05",
    title: "Ecommerce & 3D Websites",
    shortTitle: "Ecommerce & 3D",
    tagline: "Immersive Web Experiences",
    dialogue:
      "Make your brand unforgettable. We create immersive 3D websites, high-converting ecommerce stores and modern business websites.",
    shortDialogue:
      "Create immersive 3D websites and high-converting modern ecommerce stores.",
    href: "/services/web-development",
    iconName: "cube",
    angleDeg: 80, // Bottom-right
    radiusScale: 0.96,
    accentColor: "#8B4DFF",
    glowColor: "rgba(139, 77, 255, 0.45)",
    headline: {
      line1: "Modern 3D &",
      line2: "Ecommerce",
      highlight: "Websites.",
    },
    leadPresetService: "Website Development",
  },
  {
    id: "sales-intelligence",
    number: "06",
    title: "AI Sales Intelligence",
    shortTitle: "Sales Intelligence",
    tagline: "Analytics & Growth",
    dialogue:
      "Turn business data into smarter decisions. Track sales, monitor competitors, analyse performance and discover actionable insights through intelligent dashboards.",
    shortDialogue:
      "Turn business data into revenue with real-time Power BI predictive dashboards.",
    href: "/services/data-analytics",
    iconName: "chart",
    angleDeg: 140, // Bottom-left
    radiusScale: 0.98,
    accentColor: "#EC4899",
    glowColor: "rgba(236, 72, 153, 0.4)",
    headline: {
      line1: "Predictive",
      line2: "AI Sales",
      highlight: "Intelligence.",
    },
    leadPresetService: "Data Analytics",
  },
];
