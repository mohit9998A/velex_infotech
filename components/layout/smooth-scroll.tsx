"use client";

import { useEffect } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-media-query";

/**
 * Lenis smooth scroll, wired to GSAP's ticker so ScrollTrigger stays in sync.
 *
 * Split out of `providers.tsx` and dynamically imported so gsap (73 KiB),
 * ScrollTrigger (45 KiB) and lenis (18 KiB) leave the shared bundle. They were
 * imported at module scope in the root layout, so all ~135 KiB shipped on every
 * route — including /blog, /privacy-policy and /terms-of-service, which use
 * none of it. That matched the ~131 KiB of unused JS Lighthouse reported.
 *
 * The imports are now inside the effect, so they are also skipped entirely when
 * the user prefers reduced motion — previously the guard was a runtime check
 * that ran after the bytes had already downloaded.
 */
export default function SmoothScroll() {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      // The component may have unmounted while the chunks were in flight.
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.6,
      });

      lenis.on("scroll", ScrollTrigger.update);

      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        gsap.ticker.remove(raf);
        lenis.destroy();
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [reducedMotion]);

  return null;
}
