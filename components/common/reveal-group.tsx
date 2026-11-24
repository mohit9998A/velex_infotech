"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";

/**
 * Fades/slides each `[data-reveal]` descendant in the first time it enters the
 * viewport — the job framer-motion's `whileInView` used to do.
 *
 * The component only flips a `data-inview` attribute; the motion itself is a
 * CSS animation (`[data-reveal]` in globals.css), so:
 *   - no React state and no re-render when a card is revealed,
 *   - no JS tween in the scroll path (the transform/opacity animation runs on
 *     the compositor),
 *   - `children` stay Server Components — this is the only client code.
 *
 * Per-item tuning goes through CSS custom properties on the item:
 * `--reveal-delay`, `--reveal-duration`, `--reveal-x`, `--reveal-y`.
 *
 * Content is only hidden when scripting is enabled and the visitor has not
 * asked for reduced motion (the gate lives in the CSS), so no-JS crawlers and
 * reduced-motion users always see everything immediately.
 */
export function RevealGroup({ children, ...props }: ComponentPropsWithoutRef<"div">) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = root.querySelectorAll<HTMLElement>("[data-reveal]");

    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute("data-inview", "");
        io.unobserve(entry.target);
      }
    });
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
}
