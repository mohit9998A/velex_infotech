"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

import { cn } from "@/lib/utils";

/**
 * `next/dynamic` with `ssr: false`, NOT `React.lazy`.
 *
 * The previous version gated rendering on `useIsMobile()`, which is SSR-safe by
 * returning `false` until an effect runs. So the server AND the first client
 * render both took the desktop branch, `lazy()` fired the ~2 MB Spline runtime
 * request during hydration, and only then did the effect flip `isMobile` and
 * unmount the component — orphaning the request mid-flight. Every phone paid
 * full bandwidth for a scene it never saw.
 *
 * The import now cannot fire until `shouldLoad` is true, which only happens
 * after mount, strictly gated on `(min-width: 768px)` viewport width, hardware
 * capability, and user motion/data preferences.
 *
 * `ssr: false` costs nothing here: this is a decorative WebGL canvas with no
 * text and no crawlable content.
 */
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  // The parent already renders the crystal placeholder underneath.
  loading: () => null,
});

interface InteractiveRobotSplineProps {
  scene: string;
  className?: string;
}



export function InteractiveRobotSpline({
  scene,
  className,
}: InteractiveRobotSplineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(true);

  // Pause WebGL rendering when hero is scrolled out of viewport to eliminate GPU contention
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          setInView(entry.isIntersecting);
        }
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Every check below is a CLIENT fact, so all of them are read AFTER mount.
    // Reading any of them during render is what caused the original bug.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mql = window.matchMedia("(min-width: 768px)");

    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (conn?.saveData) return;
    if (conn?.effectiveType && /2g$/.test(conn.effectiveType)) return;
    if ((navigator.hardwareConcurrency ?? 8) < 2) return;

    // Deferred to idle so the fetch competes with nothing during the LCP
    // window. The timeout is the ceiling: on a busy main thread the scene still
    // arrives, just late.
    let id: number | null = null;
    const scheduleLoad = () => {
      const ric =
        window.requestIdleCallback ??
        ((cb: IdleRequestCallback) =>
          window.setTimeout(
            () => cb({ didTimeout: true, timeRemaining: () => 0 }),
            200,
          ));
      id = ric(() => setShouldLoad(true), { timeout: 800 }) as number;
    };

    if (mql.matches) {
      scheduleLoad();
    } else {
      const handler = (e: MediaQueryListEvent) => {
        if (e.matches) {
          scheduleLoad();
          mql.removeEventListener("change", handler);
        }
      };
      mql.addEventListener("change", handler);
      return () => {
        mql.removeEventListener("change", handler);
        if (id !== null) {
          if (window.cancelIdleCallback) window.cancelIdleCallback(id);
          else window.clearTimeout(id);
        }
      };
    }

    return () => {
      if (id !== null) {
        if (window.cancelIdleCallback) window.cancelIdleCallback(id);
        else window.clearTimeout(id);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {shouldLoad && (
        <div
          className={cn(
            "!h-full !w-full transition-opacity duration-700",
            loaded && inView ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none",
          )}
          style={{
            contentVisibility: inView ? "visible" : "hidden",
          }}
        >
          <Spline
            scene={scene}
            onLoad={() => setLoaded(true)}
            className="!h-full !w-full"
          />
        </div>
      )}

      {/* Masks the "Built with Spline" watermark — it is painted into the WebGL
          canvas on the free plan, so it cannot be hidden with CSS; we blend it
          into the background with a theme-aware radial fade anchored at the
          corner. Load-bearing, not decoration. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 z-10 h-24 w-64 bg-[radial-gradient(ellipse_at_bottom_right,var(--vx-void)_45%,transparent_75%)]"
      />
    </div>
  );
}
