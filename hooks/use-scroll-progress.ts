"use client";

import { useEffect, useEffectEvent, type RefObject } from "react";

/**
 * Reports how far `ref` has travelled through the viewport, as 0..1.
 *
 * Same offset model as framer-motion's
 * `useScroll({ target, offset: ["start <start>", "end <end>"] })`, with the
 * edges given as fractions of the viewport height:
 *   0 when the element's TOP edge sits at `start * innerHeight`,
 *   1 when its BOTTOM edge sits at `end * innerHeight`.
 * So ["start start", "end end"] is (0, 1) and ["start 75%", "end 25%"] is
 * (0.75, 0.25).
 *
 * Why not motion's useScroll: the three scroll-linked homepage sections were
 * the only reason the animation library's frame loop ran on every scroll frame
 * of the page (3.1 s of main-thread time in a 40 s scroll trace at 4x CPU
 * throttle), and the library itself was ~71 KB gzipped of homepage JS.
 *
 * Cost model: one passive scroll listener that is attached ONLY while the
 * element is within a viewport-height of the screen (IntersectionObserver
 * gate), doing one getBoundingClientRect per scroll event. Scroll events are
 * already coalesced to one per frame by the browser, and during a scroll the
 * layout is clean, so the read does not force a reflow. Callers are expected to
 * map progress to something coarse (an index) and only set React state when
 * that changes — never per frame.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  start: number,
  end: number,
  onProgress: (progress: number) => void,
) {
  const emit = useEffectEvent(onProgress);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const range = rect.height + (start - end) * vh;
      const progress = range > 0 ? (start * vh - rect.top) / range : 0;
      emit(Math.min(1, Math.max(0, progress)));
    };

    let listening = false;
    const setListening = (next: boolean) => {
      if (next === listening) return;
      listening = next;
      if (next) {
        window.addEventListener("scroll", measure, { passive: true });
        window.addEventListener("resize", measure, { passive: true });
      } else {
        window.removeEventListener("scroll", measure);
        window.removeEventListener("resize", measure);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        setListening(Boolean(entry?.isIntersecting));
        // Also measure on the way OUT, so a fast fling past the element still
        // settles on the clamped 0 or 1 rather than a stale mid value.
        measure();
      },
      { rootMargin: "100% 0px 100% 0px" },
    );
    io.observe(el);
    measure();

    return () => {
      io.disconnect();
      setListening(false);
    };
  }, [ref, start, end]);
}
