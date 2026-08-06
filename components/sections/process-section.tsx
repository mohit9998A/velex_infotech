"use client";

import { useEffect, useRef } from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ProcessStep } from "@/types";
import processData from "@/content/process.json";
import { useIsMobile, usePrefersReducedMotion } from "@/hooks/use-media-query";
import { SectionHeader } from "@/components/common/section-header";

const steps = processData as ProcessStep[];

/**
 * ONE markup tree. The layout branch lives in CSS.
 *
 * This used to return two structurally different `<section>`s depending on
 * `useHorizontal` — but `useIsMobile()` and `usePrefersReducedMotion()` both
 * return `false` until an effect runs, so the server and the first client
 * render always chose the horizontal one. Every mobile visitor was served a
 * full-viewport `h-dvh` horizontal-scroll section, then had it unmounted and
 * replaced by a vertical stack: two layouts of four cards, a full remount, and
 * a section that changes height from 100dvh to whatever the stack measures.
 *
 * The condition is now a single media query in globals.css
 * (`.process-section`), and `useHorizontal` gates only the GSAP effect. The
 * query is the exact complement of `useIsMobile`'s `max-width: 767px`, so CSS
 * and JS cannot disagree.
 *
 * It also has to include `prefers-reduced-motion`: without it a desktop
 * reduced-motion user gets the `overflow: hidden` horizontal strip with no
 * scroll driver attached, leaving the last two cards permanently unreachable.
 */
export function ProcessSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();
  const useHorizontal = !isMobile && !reducedMotion;

  useEffect(() => {
    if (!useHorizontal) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    // Dynamic import, mirroring components/layout/smooth-scroll.tsx. gsap and
    // ScrollTrigger were static imports here, which put ~118 KiB into the
    // homepage's initial bundle — including for mobile and reduced-motion
    // visitors, where the effect returns immediately and never touches the
    // library. On `/` this is a cache hit against the chunk smooth-scroll
    // already requests; the win is that it is no longer in the initial parse.
    //
    // `useGSAP` from @gsap/react is dropped along with it: it is a hook, so it
    // cannot itself be dynamically imported. `gsap.context()` provides the same
    // scoped cleanup.
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const track = trackRef.current;
        const wrapper = wrapperRef.current;
        if (!track || !wrapper) return;

        const distance = track.scrollWidth - window.innerWidth;
        if (distance <= 0) return;

        gsap.to(track, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: () => `+=${distance}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }, wrapperRef);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [useHorizontal]);

  return (
    <section ref={wrapperRef} className="process-section section-pad relative">
      <div className="process-header mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="How We Work"
          title="From idea to intelligence"
          subtitle="A precise, four-step path that turns ambition into deployed, compounding results."
        />
      </div>
      <div
        ref={trackRef}
        className="process-track mx-auto mt-12 flex max-w-3xl flex-col gap-5 px-4 sm:px-6"
      >
        {steps.map((step) => (
          <StepCard key={step.id} step={step} />
        ))}
      </div>
    </section>
  );
}

function StepCard({ step, className }: { step: ProcessStep; className?: string }) {
  return (
    <div className={cn("glass-card flex flex-col p-7 lg:p-9", className)}>
      <span className="font-display text-6xl text-purple-core/40">{step.index}</span>
      <h3 className="mt-4 font-display text-2xl text-primary">{step.title}</h3>
      <p className="mt-3 text-secondary">{step.description}</p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {step.deliverables.map((d) => (
          <li
            key={d}
            className="inline-flex items-center gap-1.5 rounded-full border border-vx-border bg-purple-core/[0.06] px-3 py-1 text-xs text-secondary"
          >
            <Check className="size-3 text-success" /> {d}
          </li>
        ))}
      </ul>
    </div>
  );
}
