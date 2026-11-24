"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { preconnect } from "react-dom";
import dynamic from "next/dynamic";
import type { Application } from "@splinetool/runtime";

import { cn } from "@/lib/utils";

const SPLINE_ORIGINS = [
  "https://prod.spline.design",
  "https://unpkg.com",
  "https://www.gstatic.com",
];

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

/**
 * The runtime (@splinetool/runtime 1.12.x) has `stop()` / `play()` — they
 * detach and reattach the render loop (`renderer.setAnimationLoop`) and pause
 * the pointer event manager — and it installs a document `scroll` listener
 * (`_onScroll`) that calls `canvas.getBoundingClientRect()` on every scroll
 * event, for as long as the page lives. None of that is in its published
 * .d.ts, so it is typed here and every call is optional: if a future runtime
 * drops them, this degrades to the old always-on behaviour, not to an error.
 */
type SplineApp = Application & {
  stop?: () => void;
  play?: () => void;
  _onScroll?: () => void;
};

interface InteractiveRobotSplineProps {
  scene: string;
  className?: string;
}

export function InteractiveRobotSpline({
  scene,
  className,
}: InteractiveRobotSplineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<SplineApp | null>(null);
  const runningRef = useRef(true);
  const inViewRef = useRef(true);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);

  /**
   * Run the scene only while the hero is on screen AND the tab is visible.
   *
   * This used to be a CSS-only "pause" (opacity/visibility/content-visibility
   * on the wrapper), which hides the canvas but leaves the WebGL render loop
   * and the runtime's per-scroll layout read running underneath. In a 40 s
   * scroll trace at 4x CPU throttle that loop was the single largest
   * main-thread cost on the page (6.9 s), plus 0.9 s in its scroll handler.
   */
  const syncRunning = useCallback(() => {
    const app = appRef.current;
    if (!app) return;
    const shouldRun = inViewRef.current && document.visibilityState === "visible";
    if (shouldRun === runningRef.current) return;
    runningRef.current = shouldRun;

    if (shouldRun) {
      if (app._onScroll) {
        document.addEventListener("scroll", app._onScroll);
        app._onScroll(); // refresh the cached canvas rect used for pointer mapping
      }
      app.play?.();
    } else {
      app.stop?.();
      if (app._onScroll) document.removeEventListener("scroll", app._onScroll);
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      inViewRef.current = entry.isIntersecting;
      syncRunning();
    });
    observer.observe(el);
    document.addEventListener("visibilitychange", syncRunning);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncRunning);
    };
  }, [syncRunning]);

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

    // Deferred until the window `load` event AND then to idle, so the ~2 MB
    // runtime + scene fetch and its long parse/compile tasks compete with
    // nothing on the critical path (LCP, fonts, hydration). The idle timeout
    // is the ceiling: on a busy main thread the scene still arrives, just late.
    let idleId: number | null = null;
    const scheduleLoad = () => {
      const ric =
        window.requestIdleCallback ??
        ((cb: IdleRequestCallback) =>
          window.setTimeout(
            () => cb({ didTimeout: true, timeRemaining: () => 0 }),
            200,
          ));
      idleId = ric(() => setShouldLoad(true), { timeout: 800 }) as number;
    };
    const afterLoad = () => {
      if (document.readyState === "complete") scheduleLoad();
      else window.addEventListener("load", scheduleLoad, { once: true });
    };
    const cancel = () => {
      window.removeEventListener("load", scheduleLoad);
      if (idleId !== null) {
        if (window.cancelIdleCallback) window.cancelIdleCallback(idleId);
        else window.clearTimeout(idleId);
      }
    };

    // Warm the scene's origins only on devices that will actually load it.
    // (This was a server-side ReactDOM.preconnect in app/page.tsx, which phones
    // paid for too — and without `crossorigin` it opened a connection the
    // runtime's CORS fetch could not reuse.) The two wasm decoders are fetched
    // by the runtime from these CDNs once the scene is parsed.
    const warm = () => {
      for (const origin of SPLINE_ORIGINS) preconnect(origin, { crossOrigin: "anonymous" });
    };

    if (mql.matches) {
      warm();
      afterLoad();
      return cancel;
    }

    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) {
        warm();
        afterLoad();
        mql.removeEventListener("change", handler);
      }
    };
    mql.addEventListener("change", handler);
    return () => {
      mql.removeEventListener("change", handler);
      cancel();
    };
  }, []);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {shouldLoad && (
        <div
          className={cn(
            "!h-full !w-full transition-opacity duration-700",
            loaded ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
        >
          <Spline
            scene={scene}
            onLoad={(app) => {
              appRef.current = app as SplineApp;
              runningRef.current = true;
              setLoaded(true);
              try {
                const objs = app.getAllObjects().map(o => ({ name: o.name, id: o.uuid, pos: o.position }));
                console.log("SPLINE_OBJECTS_DUMP:", JSON.stringify(objs));
              } catch (e) {
                console.error("Spline dump err:", e);
              }
              // The hero may already be off screen (or the tab hidden) by the
              // time the scene arrives.
              syncRunning();
            }}
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
