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

/** Counts from 0 to `value` once it scrolls into view. */
export function CountUp({ value, suffix = "", prefix = "", durationMs = 1600 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);
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
        if (!entries[0].isIntersecting || started.current) return;
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / durationMs, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(eased * value));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, durationMs, reducedMotion]);

  return (
    <span ref={ref}>
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
