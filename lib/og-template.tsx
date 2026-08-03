import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/**
 * Shared Open Graph card.
 *
 * Generated rather than served from a static file: the previous setup pointed
 * `openGraph.images` at /og-default.jpg, which was never committed, so every
 * social preview on the site was a 404 and nothing ever failed loudly. A
 * generated route cannot silently go missing — if it breaks, the build breaks.
 *
 * Constraints of the ImageResponse renderer (satori): flexbox only, no CSS
 * grid, inline styles only (Tailwind classes do not apply), and any element
 * with multiple children needs an explicit `display: flex`.
 */
export function renderOgImage({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #04040A 0%, #0B0616 55%, #1A0B33 100%)",
          padding: 72,
        }}
      >
        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="56" height="56" viewBox="0 0 32 32">
            <defs>
              <linearGradient id="c" x1="0" y1="0" x2="32" y2="32">
                <stop offset="0%" stopColor="#A855F7" />
                <stop offset="55%" stopColor="#6B21FF" />
                <stop offset="100%" stopColor="#E4C76B" />
              </linearGradient>
            </defs>
            <path d="M16 2 L27 11 L16 30 L5 11 Z" fill="url(#c)" />
          </svg>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              fontWeight: 700,
              color: "#F0EEFF",
              letterSpacing: -0.5,
            }}
          >
            VELEX
            <span style={{ color: "#A855F7" }}>.</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#A855F7",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 60 ? 62 : 76,
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#F0EEFF",
              letterSpacing: -2,
            }}
          >
            {title}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#8B87A8",
          }}
        >
          <div style={{ display: "flex" }}>{new URL(siteConfig.url).host}</div>
          <div style={{ display: "flex" }}>{siteConfig.location}</div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
