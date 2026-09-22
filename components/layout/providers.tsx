"use client";

import dynamic from "next/dynamic";
import { ThemeProvider } from "next-themes";

/**
 * Loaded as its own chunk after the page is interactive. This keeps gsap,
 * ScrollTrigger and lenis (~135 KiB combined) out of the shared bundle that
 * every route pays for — see the note in smooth-scroll.tsx.
 *
 * `ssr: false` is correct here: the component renders null and only sets up
 * browser-side scroll behaviour, so there is nothing to server-render.
 */
const SmoothScroll = dynamic(() => import("@/components/layout/smooth-scroll"), {
  ssr: false,
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <SmoothScroll />
      {children}
    </ThemeProvider>
  );
}
