import { Caveat, Geist, Geist_Mono, Playfair_Display } from "next/font/google";

/**
 * Single engineered typeface across the site: Geist — a neutral, professional
 * grotesque (no serif). Used for both display headings and body copy.
 */
// No `weight` array on purpose. Geist is a variable font, and listing weights
// makes next/font fetch six separate static instances — each preloaded on the
// critical path. Omitting it ships one variable file covering the whole range.
// (800/900 were requested but used nowhere in the codebase.)
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-handwriting",
  display: "swap",
});

/** Display headings (Geist, heavy weights) */
export const fontDisplay = geist;

/** Body copy (Geist) */
export const fontSans = geist;

/** Editorial Serif Display */
export const fontSerif = playfair;

/** Handwritten annotations */
export const fontHandwriting = caveat;

/** Mono — stats, labels, code identity */
// Used only for small labels and stats, never for LCP text — so don't let it
// compete with the body font for critical-path bandwidth.
export const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
});

export const fontVariables = `${geist.variable} ${fontMono.variable} ${playfair.variable} ${caveat.variable}`;

