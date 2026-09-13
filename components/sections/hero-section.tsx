import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ConsultButtons } from "@/components/common/consult-buttons";
import { InteractiveRobotSpline } from "@/components/blocks/interactive-3d-robot";
import { ScrollIndicator } from "@/components/common/scroll-indicator";
import { RotatingHeroText } from "@/components/ui/rotating-hero-text";

const SPLINE_SCENE =
  "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

const heroStats = [
  { value: "4+", label: "YEARS" },
  { value: "50+", label: "PROJECTS" },
  { value: "30+", label: "CLIENTS" },
  { value: "3", label: "GLOBAL HUBS" },
];

export function HeroSection() {
  return (
    <section className="relative flex min-h-dvh w-full items-center overflow-hidden pt-[clamp(6rem,9svh,7rem)] pb-[clamp(3rem,8svh,5.5rem)]">
      {/* 3D Spline background, pushed right so the scene clears the text column */}
      <InteractiveRobotSpline
        scene={SPLINE_SCENE}
        className="absolute inset-0 z-0 h-full w-full md:translate-x-[30%]"
      />

      {/* Readability + ambient gradients */}
      <div className="absolute inset-0 z-[5] bg-gradient-to-r from-void via-void/49 to-transparent" />
      <div className="absolute inset-0 z-[5] bg-gradient-to-t from-void via-transparent to-void/28" />
      <div className="pointer-events-none absolute -left-40 top-1/3 z-[1] size-[36rem] glow-blob" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="max-w-[52rem] lg:max-w-[58rem] xl:max-w-[62rem]">
          {/* Eyebrow / Kicker */}
          <div
            className="hero-fade mb-[clamp(0.85rem,2.4svh,1.75rem)] flex items-center gap-3"
            style={{ "--i": 0 } as CSSProperties}
          >
            <span
              aria-hidden="true"
              className="h-[2.5px] w-7 rounded-full bg-[#0055FF] dark:bg-[#3B82F6]"
            />
            <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
              AI &nbsp;&times;&nbsp; SOFTWARE &nbsp;&times;&nbsp; REAL IMPACT
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-[clamp(2.35rem,5.2vw,4.25rem)] font-medium tracking-tight text-primary leading-[1.08]">
            <span className="block overflow-hidden py-1">
              <span
                className="hero-word inline-block"
                style={{ "--i": 0 } as CSSProperties}
              >
                Technology that
              </span>
            </span>
            <span className="block overflow-hidden py-1">
              <span
                className="hero-word inline-block"
                style={{ "--i": 1 } as CSSProperties}
              >
                moves your
              </span>
            </span>
            <span className="block py-1">
              <span
                className="hero-word inline-flex flex-wrap items-baseline gap-x-3"
                style={{ "--i": 2 } as CSSProperties}
              >
                <span>business</span>
                <RotatingHeroText />
              </span>
            </span>
          </h1>

          {/* Subheadline / Lede paragraph */}
          <p className="hero-lede mt-[clamp(0.85rem,2.4svh,1.75rem)] max-w-xl text-lg text-secondary leading-relaxed sm:text-xl font-normal">
            We help ambitious companies design, build and scale with AI-powered
            solutions, modern software and future-ready teams.
          </p>

          {/* CTA Buttons */}
          <ConsultButtons
            className="hero-fade mt-[clamp(1.5rem,4.5svh,2.75rem)]"
            style={{ "--i": 1 } as CSSProperties}
            primaryLabel="Start a Conversation"
            primaryVariant="blue"
            primaryClassName="h-12 px-7 sm:h-13 sm:px-8 text-sm sm:text-base font-semibold shadow-[0_4px_20px_rgba(0,85,255,0.35)] hover:shadow-[0_6px_28px_rgba(0,85,255,0.5)]"
            primaryIcon={
              <ArrowRight className="size-4 ml-1.5 transition-transform group-hover:translate-x-0.5" />
            }
            secondary={
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-7 sm:h-13 sm:px-8 text-sm sm:text-base font-medium rounded-full border border-black/15 bg-black/[0.03] text-primary hover:bg-black/[0.07] hover:border-black/25 dark:border-white/15 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]"
                asChild
              >
                <Link href="#portfolio">See Our Work</Link>
              </Button>
            }
          />

          {/* Stats */}
          <dl
            className="hero-fade mt-[clamp(1.75rem,5.5svh,3.5rem)] flex flex-wrap items-center gap-y-4 max-w-2xl"
            style={{ "--i": 2 } as CSSProperties}
          >
            {heroStats.map((s, idx) => (
              <div key={s.label} className="flex items-center">
                <div className="flex flex-col pr-4 sm:pr-6 lg:pr-8">
                  <dd className="order-1 font-sans font-bold text-2xl sm:text-3xl text-primary tracking-tight">
                    {s.value}
                  </dd>
                  <dt className="order-2 font-mono text-[10px] sm:text-[11px] font-medium tracking-[0.16em] uppercase text-secondary mt-1">
                    {s.label}
                  </dt>
                </div>
                {idx < heroStats.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="h-8 w-px bg-black/15 dark:bg-white/15 mr-4 sm:mr-6 lg:mr-8 shrink-0"
                  />
                )}
              </div>
            ))}
          </dl>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}

