"use client";

import { useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { captureUtmParams } from "@/lib/utm";
import { trackEvent } from "@/lib/analytics";

/**
 * Deliberately just the theme provider.
 *
 * - No smooth-scroll library. Lenis used to be mounted here; its non-passive
 *   wheel/touch listeners made every scroll frame wait on the main thread,
 *   which is what made the site lag and freeze while anything else was
 *   running. See the note in globals.css.
 * - No `<MotionConfig>`. It was the only animation-library import in the
 *   root layout, so it put part of motion into the shared chunk of every
 *   route. Nothing uses motion any more; reduced-motion handling lives in CSS
 *   (`prefers-reduced-motion` blocks in globals.css).
 */
export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    captureUtmParams();

    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.("a");
      if (!target) return;
      const href = target.getAttribute("href") || "";
      if (href.startsWith("tel:")) {
        trackEvent("tel_click", { destination: href.replace("tel:", "") });
      } else if (href.startsWith("mailto:")) {
        trackEvent("mailto_click", { destination: href.replace("mailto:", "") });
      }
    };

    document.addEventListener("click", handleClick, { passive: true });
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
