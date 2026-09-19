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

import statsData from "@/content/stats.json";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const stats = statsData as StatItem[];

const heroStats = stats.slice(0, 3).map((s) => ({
  value: `${s.value}${s.suffix}`,
  label: s.label,
}));

export function HeroSection() {
  return (
    <section className="relative flex min-h-dvh w-full items-center overflow-hidden pt-[clamp(5.5rem,8.5svh,7rem)] pb-4 sm:pb-[clamp(3rem,8svh,5.5rem)]">
      {/* 3D Spline robot: positioned on the right beside CTAs and cube base on mobile, pushed right on desktop */}
      <InteractiveRobotSpline
        scene={SPLINE_SCENE}
        className="absolute right-[-14%] sm:right-[-6%] top-[270px] sm:top-[260px] w-[74%] sm:w-[60%] h-[420px] sm:h-[460px] z-0 pointer-events-none md:pointer-events-auto md:absolute md:inset-0 md:right-0 md:top-0 md:h-full md:w-full md:translate-x-[30%]"
      />

      {/* Readability + ambient gradients */}
      <div className="absolute inset-0 z-[5] bg-gradient-to-r from-void via-void/49 to-transparent" />
      <div className="absolute inset-0 z-[5] bg-gradient-to-t from-void via-transparent to-void/28" />
      <div className="pointer-events-none absolute -left-40 top-1/3 z-[1] size-[36rem] glow-blob" />

      {/* Mobile Ambient Glow: soft purple circle behind top annotation and robot */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-30px] top-[120px] size-64 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.32)_0%,rgba(113,56,255,0.15)_45%,transparent_70%)] blur-xl md:hidden"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6">
        {/* Mobile Handwritten Annotation: Top Right ("Smarter Faster Together" with arrow) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-2 sm:right-6 top-[105px] sm:top-[120px] z-10 flex flex-col items-end select-none md:hidden"
        >
          
          
        </div>

        <div className="max-w-[52rem] lg:max-w-[58rem] xl:max-w-[62rem]">
          {/* Eyebrow / Kicker */}
          <div
            className="hero-fade mb-3 sm:mb-[clamp(0.85rem,2.4svh,1.75rem)] flex items-center gap-3"
            style={{ "--i": 0 } as CSSProperties}
          >
            <span
              aria-hidden="true"
              className="h-[2.5px] w-7 rounded-full bg-[#0055FF] dark:bg-[#3B82F6]"
            />
            <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#0055FF] dark:text-[#60A5FA]">
              AI &nbsp;&times;&nbsp; SOFTWARE &nbsp;&times;&nbsp; REAL IMPACT
            </span>
          </div>

          {/* Mobile Headline (strictly < md, matching mockup with cursive "with") */}
          <h1 className="md:hidden font-serif text-[clamp(2.2rem,8.2vw,2.85rem)] font-medium tracking-tight text-primary leading-[1.1]">
            <span className="block py-0.5">Technology that</span>
            <span className="block py-0.5">moves your</span>
            <span className="block py-0.5">
              <span>business </span>
              <span className="font-[family-name:var(--font-handwriting)] italic font-semibold text-[#7138FF] dark:text-[#8B4DFF] text-[1.15em] tracking-normal">
                with
              </span>
            </span>
            <span className="block py-0.5">
              <RotatingHeroText
                words={[
                  "Automation.",
                  "AI Agents.",
                  "Receptionist.",
                  "WhatsApp AI.",
                  "Integrations.",
                  "AI Strategy.",
                ]}
                className="!py-0 !my-0 !pr-0 text-[#7138FF] dark:text-[#8B4DFF]"
              />
            </span>
          </h1>

          {/* Desktop Headline (strictly >= md, 100% UNTOUCHED) */}
          <h1 className="hidden md:block font-serif text-[clamp(2.35rem,5.2vw,4.25rem)] font-medium tracking-tight text-primary leading-[1.08]">
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
          <p className="hero-lede mt-3.5 max-w-[265px] sm:max-w-xl text-[14.5px] text-secondary leading-[1.55] sm:text-xl font-normal">
            We help ambitious companies design, build and scale with AI-powered
            solutions, modern software and future-ready teams.
          </p>

          {/* CTA Buttons */}
          <ConsultButtons
            className="hero-fade mt-5 gap-2.5 sm:gap-4"
            style={{ "--i": 1 } as CSSProperties}
            primaryLabel="Start a Conversation"
            primaryVariant="blue"
            primaryClassName="h-[46px] px-6 sm:h-13 sm:px-8 text-[14.5px] sm:text-base font-semibold bg-[#7138FF] hover:bg-[#6228EE] text-white shadow-[0_8px_24px_rgba(113,56,255,0.4)] hover:shadow-[0_10px_28px_rgba(113,56,255,0.55)] rounded-full w-[205px] sm:w-auto"
            primaryIcon={
              <ArrowRight className="size-4 ml-1 transition-transform group-hover:translate-x-0.5" />
            }
            secondary={
              <Button
                size="lg"
                variant="outline"
                className="h-[46px] px-6 sm:h-13 sm:px-8 text-[14.5px] sm:text-base font-semibold rounded-full border border-slate-200/90 dark:border-white/15 bg-white dark:bg-white/[0.04] text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/[0.08] shadow-sm w-[205px] sm:w-auto"
                asChild
              >
                <Link href="#portfolio">See Our Work</Link>
              </Button>
            }
          />

          {/* Mobile Handwritten Annotation: Below CTAs, pointing right to robot cube */}
          <div
            aria-hidden="true"
            className="mt-3.5 flex items-center gap-1.5 pointer-events-none select-none md:hidden pl-2"
          >
            <div className="font-[family-name:var(--font-handwriting)] text-[20px] sm:text-[23px] text-[#7138FF] dark:text-[#A855F7] leading-[1.05] -rotate-[8deg] tracking-wide font-medium">
              <div>Your</div>
              <div>AI Partner</div>
            </div>
            <svg
              width="34"
              height="22"
              viewBox="0 0 34 22"
              fill="none"
              className="text-[#7138FF] dark:text-[#A855F7] shrink-0 mt-3 rotate-6"
            >
              <path
                d="M3 12 C10 16, 18 16, 26 8"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M20 6 L27 8 L23 14"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Mobile Stats Card (strictly < md, matching mockup with 2-line labels) */}
          <div className="block md:hidden mt-6 w-full">
            <div className="w-full rounded-[24px] bg-white/95 dark:bg-[#12121e]/90 backdrop-blur-md border border-slate-200/80 dark:border-white/10 py-5 px-3 shadow-[0_10px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
              <dl className="grid grid-cols-3 divide-x divide-slate-200/80 dark:divide-white/10 text-center">
                {heroStats.map((s) => (
                  <div key={s.label} className="flex flex-col items-center px-1">
                    <dd className="font-sans font-bold text-[28px] text-[#7138FF] dark:text-[#8B4DFF] tracking-tight leading-none">
                      {s.value}
                    </dd>
                    <dt className="font-mono text-[9.5px] font-bold tracking-[0.12em] uppercase text-[#1E1B4B] dark:text-[#C7D2FE] mt-2 leading-[1.25]">
                      {s.label.split(" ").map((word, i) => (
                        <span key={i} className="block">
                          {word}
                        </span>
                      ))}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Desktop Stats (strictly >= md, 100% UNTOUCHED) */}
          <dl
            className="hero-fade mt-[clamp(1.75rem,5.5svh,3.5rem)] hidden md:flex flex-wrap items-center gap-y-4 max-w-2xl"
            style={{ "--i": 2 } as CSSProperties}
          >
            {heroStats.map((s, idx) => (
              <div key={s.label} className="flex items-center">
                <div className="flex flex-col pr-4 sm:pr-6 lg:pr-8">
                  <dd className="order-1 font-sans font-bold text-2xl sm:text-3xl text-[#7138FF] dark:text-[#8B4DFF] tracking-tight">
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

