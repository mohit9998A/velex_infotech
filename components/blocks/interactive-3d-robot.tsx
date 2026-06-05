"use client";

import { Suspense, lazy, useState } from "react";

import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-media-query";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface InteractiveRobotSplineProps {
  scene: string;
  className?: string;
}

/** Crystalline skeleton shown while the 3D scene streams in. */
function SplineSkeleton() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative size-[min(60vw,520px)]">
        <div className="absolute inset-0 animate-pulse-glow rounded-full bg-purple-core/20 blur-3xl" />
        <div className="absolute inset-1/4 animate-float">
          <div className="size-full rotate-45 rounded-3xl border border-vx-border-bright bg-gradient-to-br from-purple-core/30 to-purple-deep/10 backdrop-blur-sm shadow-[0_0_80px_rgba(107,33,255,0.4)]" />
        </div>
      </div>
    </div>
  );
}

/**
 * Lightweight static crystal rendered on mobile / low-power devices instead of
 * streaming the full Spline scene (nottodo.md §3 — progressive enhancement).
 */
function StaticCrystalFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative size-[min(72vw,420px)]">
        <div className="absolute inset-0 rounded-full bg-purple-core/25 blur-3xl" />
        <svg viewBox="0 0 200 200" className="relative size-full animate-float drop-shadow-[0_0_60px_rgba(107,33,255,0.5)]">
          <defs>
            <linearGradient id="crystal-fallback" x1="0" y1="0" x2="200" y2="200">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="55%" stopColor="#6B21FF" />
              <stop offset="100%" stopColor="#E4C76B" />
            </linearGradient>
          </defs>
          <path d="M100 12 L165 70 L100 188 L35 70 Z" fill="url(#crystal-fallback)" fillOpacity="0.85" stroke="#F0EEFF" strokeOpacity="0.3" />
          <path d="M35 70 H165 M100 12 V188 M68 70 L100 188 L132 70" stroke="#04040A" strokeOpacity="0.35" />
        </svg>
      </div>
    </div>
  );
}

export function InteractiveRobotSpline({
  scene,
  className,
}: InteractiveRobotSplineProps) {
  const isMobile = useIsMobile();
  const [loaded, setLoaded] = useState(false);

  if (isMobile) {
    return (
      <div className={cn("relative", className)}>
        <StaticCrystalFallback />
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      {!loaded && <SplineSkeleton />}
      <Suspense fallback={<SplineSkeleton />}>
        <Spline
          scene={scene}
          onLoad={() => setLoaded(true)}
          className="!h-full !w-full"
        />
      </Suspense>
      {/* Mask the "Built with Spline" watermark — it's painted into the WebGL
          canvas (free plan), so it can't be hidden with CSS; we blend it into
          the background with a theme-aware radial fade anchored at the corner. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 z-10 h-24 w-64 bg-[radial-gradient(ellipse_at_bottom_right,var(--vx-void)_45%,transparent_75%)]"
      />
    </div>
  );
}
