"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

interface CountUpProps {
  value: number;
  suffix?: string;
  prefix?: string;
  durationMs?: number;
}

/** Counts from 0 to `value` each time it scrolls into view (both scrolling down and above). */
export function CountUp({ value, suffix = "", prefix = "", durationMs = 1400 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const animFrameId = useRef<number | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(value);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (animFrameId.current) {
          cancelAnimationFrame(animFrameId.current);
          animFrameId.current = null;
        }

        if (entry.isIntersecting) {
          const start = performance.now();
          const startVal = 0;
          const tick = (now: number) => {
            const progress = Math.min((now - start) / durationMs, 1);
            // Smooth easeOutCubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(startVal + eased * (value - startVal)));
            if (progress < 1) {
              animFrameId.current = requestAnimationFrame(tick);
            } else {
              animFrameId.current = null;
            }
          };
          animFrameId.current = requestAnimationFrame(tick);
        } else {
          // Reset so scrolling back down or scrolling above triggers the counter animation again
          setDisplay(0);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [value, durationMs, reducedMotion]);

  return (
    <span ref={ref} className="inline-block tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

interface StatCardProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  className?: string;
}

export function StatCard({ value, suffix, prefix, label, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "glass-card flex flex-col justify-center p-6",
        className,
      )}
    >
      <span className="font-display text-4xl text-gradient md:text-5xl">
        <CountUp value={value} suffix={suffix} prefix={prefix} />
      </span>
      <span className="mt-2 font-mono-label text-muted">{label}</span>
    </div>
  );
}
