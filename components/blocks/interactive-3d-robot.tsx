"use client";

import { useEffect, useState } from "react";
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
 * after mount and only on hardware that will actually use it.
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

/**
 * The static crystal. Rendered on every device, immediately, as the single
 * placeholder for both branches.
 *
 * There used to be a second component, `SplineSkeleton`, rendered TWICE — once
 * directly and once as the Suspense fallback — so two copies shipped in the
 * initial HTML, each carrying a 64px blur, a backdrop-filter, an 80px shadow
 * and two infinite animations, above the fold on the frame that decides LCP.
 * This is strictly cheaper and it is the same crystal motif, so desktop now
 * gets a real crystal → scene cross-fade instead of skeleton → skeleton → scene.
 */
function StaticCrystal() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative size-[min(72vw,420px)]">
        {/* Gradient, not `blur-3xl` — a Gaussian blur of a solid circle is a
            radial gradient, but the browser has to allocate a layer and run a
            filter pass to find that out. Above the fold, that is LCP-frame work. */}
        <div className="absolute inset-0 glow-blob" />
        <svg
          viewBox="0 0 200 200"
          className="relative size-full animate-float drop-shadow-[0_0_60px_rgba(107,33,255,0.5)]"
        >
          <defs>
            <linearGradient id="crystal-fallback" x1="0" y1="0" x2="200" y2="200">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="55%" stopColor="#6B21FF" />
              <stop offset="100%" stopColor="#E4C76B" />
            </linearGradient>
          </defs>
          <path
            d="M100 12 L165 70 L100 188 L35 70 Z"
            fill="url(#crystal-fallback)"
            fillOpacity="0.85"
            stroke="#F0EEFF"
            strokeOpacity="0.3"
          />
          <path
            d="M35 70 H165 M100 12 V188 M68 70 L100 188 L132 70"
            stroke="#04040A"
            strokeOpacity="0.35"
          />
        </svg>
      </div>
    </div>
  );
}

export function InteractiveRobotSpline({
  scene,
  className,
}: InteractiveRobotSplineProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Every check below is a CLIENT fact, so all of them are read AFTER mount.
    // Reading any of them during render is what caused the original bug.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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
    const ric =
      window.requestIdleCallback ??
      ((cb: IdleRequestCallback) =>
        window.setTimeout(
          () => cb({ didTimeout: true, timeRemaining: () => 0 }),
          1500,
        ));
    const id = ric(() => setShouldLoad(true), { timeout: 3000 });

    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(id as number);
      else window.clearTimeout(id as number);
    };
  }, []);

  return (
    <div className={cn("relative", className)}>
      {/* Cross-fades out once the scene reports ready, rather than unmounting —
          so there is never a frame with neither visual present. */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-700",
          loaded ? "opacity-0" : "opacity-100",
        )}
      >
        <StaticCrystal />
      </div>

      {shouldLoad && (
        <Spline
          scene={scene}
          onLoad={() => setLoaded(true)}
          className="!h-full !w-full"
        />
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
