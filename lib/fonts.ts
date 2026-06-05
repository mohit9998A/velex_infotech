import { Geist, Geist_Mono } from "next/font/google";

/**
 * Single engineered typeface across the site: Geist — a neutral, professional
 * grotesque (no serif). Used for both display headings and body copy.
 */
const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-geist-sans",
  display: "swap",
});

/** Display headings (Geist, heavy weights) */
export const fontDisplay = geist;

/** Body copy (Geist) */
export const fontSans = geist;

/** Mono — stats, labels, code identity */
export const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const fontVariables = `${geist.variable} ${fontMono.variable}`;
