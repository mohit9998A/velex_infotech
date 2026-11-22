"use client";

import { ThemeProvider } from "next-themes";

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
