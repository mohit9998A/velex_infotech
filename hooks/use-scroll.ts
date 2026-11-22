"use client";

import { useEffect, useRef, useState } from "react";

/** Tracks whether the page has scrolled past `threshold` pixels. */
export function useScrolled(threshold = 80): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const isPast = window.scrollY > threshold;
      setScrolled((prev) => (prev !== isPast ? isPast : prev));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

/**
 * Same signal as `useScrolled`, but written straight onto the element as a
 * `data-scrolled` attribute (style it with Tailwind's `data-scrolled:`
 * variant) instead of React state — so crossing the threshold costs one
 * attribute write, not a re-render of the component and everything under it.
 * The DOM is only touched when the state actually flips.
 */
export function useScrolledAttribute<T extends HTMLElement>(threshold = 80) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let past: boolean | null = null;
    const onScroll = () => {
      const next = window.scrollY > threshold;
      if (next === past) return;
      past = next;
      el.toggleAttribute("data-scrolled", next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return ref;
}
