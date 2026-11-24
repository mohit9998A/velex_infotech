"use client";

import { useEffect, useRef } from "react";

interface CountUpProps {
  value: number;
  suffix?: string;
  prefix?: string;
  durationMs?: number;
}

/**
 * Counts from 0 to `value` each time it scrolls into view (both scrolling down
 * and above).
 *
 * - The server HTML carries the REAL number. It used to render `0`, so every
 *   crawler, no-JS visitor and link preview read "0+ Projects Delivered".
 *   The reset to 0 happens on the client, only once the number is off screen.
 * - The tween writes straight to the text node instead of calling `setState`
 *   on every animation frame: four instances re-rendering through React at
 *   60 fps for 1.4 s, restarting on every re-entry, landed exactly while the
 *   visitor was scrolling the bento grid into view.
 */
export function CountUp({ value, suffix = "", prefix = "", durationMs = 1400 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const render = (n: number) => {
      el.textContent = `${prefix}${n}${suffix}`;
    };

    let frame = 0;
    let first = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        cancelAnimationFrame(frame);

        if (entry.isIntersecting) {
          // Already on screen at mount: keep the server-rendered final value
          // rather than flashing it back to 0.
          if (first) {
            first = false;
            return;
          }
          const start = performance.now();
          let shown = -1;
          const tick = (now: number) => {
            const progress = Math.min((now - start) / durationMs, 1);
            // Smooth easeOutCubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const n = Math.round(eased * value);
            if (n !== shown) {
              shown = n;
              render(n);
            }
            if (progress < 1) frame = requestAnimationFrame(tick);
          };
          frame = requestAnimationFrame(tick);
        } else {
          first = false;
          // Reset while off screen so the next entry counts up again.
          render(0);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      render(value);
    };
  }, [value, prefix, suffix, durationMs]);

  // ONE string child, so React manages it as the element's text content —
  // the same channel the tween writes to — rather than as three text nodes
  // that the tween would orphan.
  return (
    <span ref={ref} className="inline-block tabular-nums">
      {`${prefix}${value}${suffix}`}
    </span>
  );
}
