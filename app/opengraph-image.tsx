import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-template";

export const alt =
  "Velex Infotech — AI agent development and automation company";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/**
 * Site-wide Open Graph card. Nested segments inherit this unless they define
 * their own `opengraph-image` (see app/services/[slug]).
 *
 * File-based metadata takes priority over `openGraph.images` in the metadata
 * object, so this replaces the broken /og-default.jpg reference outright.
 */
export default function Image() {
  return renderOgImage({
    eyebrow: "Velex Infotech",
    title: "AI Agents & Automation That Run Your Business",
  });
}
