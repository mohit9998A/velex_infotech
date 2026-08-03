import type { StaticImageData } from "next/image";

import agenticAi from "@/public/images/services/agentic-ai.png";
import aiAutomation from "@/public/images/services/ai-automation.png";
import aiIntegration from "@/public/images/services/ai-integration.png";
import appDevelopment from "@/public/images/services/app-development.png";
import voiceAgent from "@/public/images/services/voice-agent.png";
import webDevelopment from "@/public/images/services/web-development.png";
import whatsappBot from "@/public/images/services/whatsapp-bot.png";

/**
 * Static imports rather than the `image` path string in services.json.
 *
 * A static import gives next/image the intrinsic width and height at build
 * time (so no hand-maintained dimensions to drift, and no layout shift) and
 * generates a blurDataURL for the placeholder. The JSON stays plain
 * serialisable data.
 */
export const serviceImages: Record<string, StaticImageData> = {
  "ai-automation": aiAutomation,
  "agentic-ai": agenticAi,
  "voice-agent": voiceAgent,
  "whatsapp-bot": whatsappBot,
  "web-development": webDevelopment,
  "app-development": appDevelopment,
  "ai-integration": aiIntegration,
};
