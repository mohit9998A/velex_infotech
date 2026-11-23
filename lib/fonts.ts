import { IBM_Plex_Sans, Inter, Playfair_Display } from "next/font/google";

/**
 * Two-face type system:
 *   IBM Plex Sans — headings (h1–h4, `font-heading`, `font-display`)
 *   Inter   — everything else: body, navigation, buttons, labels
 *
 * Weights (see design.md §3): hero 700, section headings 700, subheadings 600,
 * paragraphs 400, navigation 500, buttons 600, small labels 500.
 */

// No `weight` arrays on purpose. Both are variable fonts, and listing weights
// makes next/font fetch one static file per weight — each preloaded on the
// critical path. Omitting it ships one variable file covering the whole range.
//
// Both stay preloaded: IBM Plex Sans sets the hero H1 (the LCP element) and Inter
// sets the hero lede, so either one arriving late is a visible swap.
const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * NOT a text face. Playfair survives only for logo lettering: the VELEX
 * wordmark (components/common/logo.tsx) and the client wordmarks in the trust
 * bar, which echo each client's own type (components/sections/trust-bar.tsx).
 * Do not use `font-serif` for headings or copy — use `font-heading`.
 *
 * `preload: false` because no wordmark is ever the LCP element, so it must
 * not compete with IBM Plex Sans and Inter for first-load bandwidth.
 */
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
  preload: false,
});

export const fontVariables = `${plex.variable} ${inter.variable} ${playfair.variable}`;
