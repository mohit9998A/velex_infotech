import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-template";

export const alt =
  "Velex Infotech — AI agent development and automation company";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/**
 * Site-wide Twitter summary_large_image card.
 * Next.js file-based metadata convention takes priority over `twitter.images`
 * in the metadata object.
 */
export default function Image() {
  return renderOgImage({
    eyebrow: "Velex Infotech",
    title: "AI Agents & Automation That Run Your Business",
  });
}
