"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ProcessStep } from "@/types";
import processData from "@/content/process.json";
import { useIsMobile, usePrefersReducedMotion } from "@/hooks/use-media-query";
import { SectionHeader } from "@/components/common/section-header";

const steps = processData as ProcessStep[];

export function ProcessSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();
  const useHorizontal = !isMobile && !reducedMotion;

  useGSAP(
    () => {
      if (!useHorizontal) return;
      gsap.registerPlugin(ScrollTrigger);
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
    },
    { scope: wrapperRef, dependencies: [useHorizontal] },
  );

  const header = (
    <SectionHeader
      eyebrow="How We Work"
      title="From idea to intelligence"
      subtitle="A precise, four-step path that turns ambition into deployed, compounding results."
    />
  );

  if (!useHorizontal) {
    // Mobile / reduced-motion: vertical stack
    return (
      <section className="section-pad relative">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {header}
          <div className="mt-12 flex flex-col gap-5">
            {steps.map((step) => (
              <StepCard key={step.id} step={step} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={wrapperRef} className="relative h-dvh overflow-hidden">
      <div className="absolute inset-x-0 top-0 z-10 pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">{header}</div>
      </div>
      <div
        ref={trackRef}
        className="flex h-full items-center gap-8 pl-[max(1rem,calc((100vw-80rem)/2+1.5rem))] pr-[40vw] will-change-transform"
      >
        {steps.map((step) => (
          <StepCard key={step.id} step={step} className="w-[78vw] shrink-0 sm:w-[34rem]" />
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
