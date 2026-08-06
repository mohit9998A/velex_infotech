import type { StaticImageData } from "next/image";

import agenticAi from "@/public/images/services/agentic-ai.webp";
import aiAutomation from "@/public/images/services/ai-automation.webp";
import aiIntegration from "@/public/images/services/ai-integration.webp";
import appDevelopment from "@/public/images/services/app-development.webp";
import voiceAgent from "@/public/images/services/voice-agent.webp";
import webDevelopment from "@/public/images/services/web-development.webp";
import whatsappBot from "@/public/images/services/whatsapp-bot.webp";

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
  "ai-integration": aiIntegration,
  // TODO(velex): art for "software-development" and "data-analytics".
};
