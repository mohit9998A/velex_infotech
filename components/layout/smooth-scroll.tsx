"use client";

import { useEffect } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-media-query";

/**
 * High-performance Lenis smooth scroll.
 *
 * Configured for silky-smooth 60-120Hz scrolling with optimal easing,
 * native touch scrolling on mobile (no gesture hijacking), and
 * clean requestAnimationFrame loop.
 */
export default function SmoothScroll() {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    let cancelled = false;
    let rafId: number | undefined;
    let lenisInstance: InstanceType<typeof import("lenis")["default"]> | undefined;

    (async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        syncTouch: true, // Enables silky-smooth inertial scrolling on mobile touch screens
        syncTouchLerp: 0.085, // Smooth responsive touch interpolation
        touchInertiaExponent: 1.75, // Natural fluid momentum on touch release
      });

      lenisInstance = lenis;

      // Expose globally for convenience if modals/drawers need to stop/start scroll
      if (typeof window !== "undefined") {
        (window as unknown as { lenis?: typeof lenis }).lenis = lenis;
      }

      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    })();

    return () => {
      cancelled = true;
      if (rafId !== undefined) {
        cancelAnimationFrame(rafId);
      }
      lenisInstance?.destroy();
      if (typeof window !== "undefined" && (window as unknown as { lenis?: unknown }).lenis === lenisInstance) {
        delete (window as unknown as { lenis?: unknown }).lenis;
      }
    };
  }, [reducedMotion]);

  return null;
}
