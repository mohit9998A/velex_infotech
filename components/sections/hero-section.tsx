import type { CSSProperties } from "react";
import { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ConsultButtons } from "@/components/common/consult-buttons";
import { InteractiveRobotSpline } from "@/components/blocks/interactive-3d-robot";
import { ScrollIndicator } from "@/components/common/scroll-indicator";
import { TrustPanel } from "@/components/sections/trust-bar";

const SPLINE_SCENE =
  "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

const ROBOT_MOBILE_IMG =
  "https://res.cloudinary.com/d0grbozz/image/upload/v1789817498/robot.png";

/** 1x1 transparent GIF: what the robot <picture> resolves to at >= md. */
const TRANSPARENT_PIXEL =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

export function HeroSection() {
  // Mobile robot = the mobile LCP element. Art-directed rather than
  // `<Image priority>`: `priority` emitted a media-less <link rel=preload> in
  // <head>, so desktops downloaded this image too even though it is
  // display:none at >= md, and (in Next 16) without fetchpriority=high. Here
  // the >= md source is a 1x1 data URI, so desktops fetch nothing, and phones
  // get an eager, high-priority, correctly-`sizes`d request straight from the
  // HTML (the preload scanner finds the <img> as early as it found the link).
  // `sizes` includes the scale-110 overscan.
  const { props: robotImg } = getImageProps({
    src: ROBOT_MOBILE_IMG,
    alt: "",
    width: 600,
    height: 630,
    sizes: "(min-width: 640px) 286px, 51vw",
    loading: "eager",
    fetchPriority: "high",
  });

  return (
    // `svh`, not `dvh`: a dvh box changes height every time the mobile URL
    // bar shows or hides mid-scroll, re-laying out the whole page under the
    // visitor's finger. svh is the size of the first view anyway.
    <section className="relative flex min-h-svh w-full flex-col justify-between overflow-hidden pt-20 pb-4 sm:pb-6 md:flex-row md:items-center md:pt-[clamp(6rem,9svh,7rem)] md:pb-[clamp(3rem,8svh,5.5rem)]">
      {/* Desktop 3D Spline robot: 100% UNTOUCHED, renders on >= md only */}
      <InteractiveRobotSpline
        scene={SPLINE_SCENE}
        className="hidden md:block absolute inset-0 z-0 h-full w-full md:translate-x-[30%]"
      />

      {/* Mobile Ambient Glow: soft purple circle behind top annotation and robot.
          The softer outer stops stand in for the `blur-xl` it used to carry —
          a filter pass on the first frame of the mobile hero for a gradient
          that already fades to transparent. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-25px] top-[100px] size-56 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.27)_0%,rgba(113,56,255,0.12)_42%,rgba(113,56,255,0.04)_62%,transparent_76%)] md:hidden"
      />

      {/* Readability + ambient gradients */}
      <div className="absolute inset-0 z-[5] bg-gradient-to-r from-void via-void/49 to-transparent" />
      <div className="absolute inset-0 z-[5] bg-gradient-to-t from-void via-transparent to-void/28" />
      <div className="pointer-events-none absolute -left-40 top-1/3 z-[1] size-[36rem] glow-blob" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 flex-1 flex flex-col justify-between">
        {/* Mobile Handwritten Annotation: Top Right ("Smarter Faster Together" with arrow) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-2 sm:right-6 top-[100px] sm:top-[115px] z-10 flex flex-col items-end select-none md:hidden"
        >
          
        </div>

        <div className="relative max-w-[52rem] lg:max-w-[58rem] xl:max-w-[62rem]">
          {/* Eyebrow / Kicker */}
          <div
            className="hero-fade mb-2.5 sm:mb-[clamp(0.85rem,2.4svh,1.75rem)] flex items-center gap-3"
            style={{ "--i": 0 } as CSSProperties}
          >
            <span
              aria-hidden="true"
              className="h-[2.5px] w-6 sm:w-7 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]"
            />
            <span className="font-sans text-[11px] sm:text-xs font-medium uppercase tracking-[0.22em] text-[#7138FF] dark:text-[#8B4DFF]">
              AI &nbsp;&times;&nbsp; SOFTWARE &nbsp;&times;&nbsp; REAL IMPACT
            </span>
          </div>

          {/* Headline — one static line, "business forward." in brand purple.
              It used to end in a rotating word (Automation / AI Agents /
              Receptionist ...), which made whichever service happened to be
              showing read as the whole company, and cost the mobile hero a
              fourth line. Individual services are featured in the Services
              section instead. */}

          {/* Mobile Headline (< md): sized so it sets in three lines. */}
          <h1 className="md:hidden font-heading text-[clamp(2rem,8.6vw,2.9rem)] font-bold tracking-tight text-primary leading-[1.1]">
            <span className="block">Technology that</span>
            <span className="block">moves your</span>
            <span className="block text-[#7138FF] dark:text-[#8B4DFF]">business forward.</span>
          </h1>

          {/* Desktop Headline (>= md) */}
          <h1 className="hidden md:block font-heading text-[clamp(2.35rem,5.2vw,4.25rem)] font-bold tracking-tight text-primary leading-[1.08]">
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
            <span className="block overflow-hidden py-1">
              <span
                className="hero-word inline-block text-[#7138FF] dark:text-[#8B4DFF]"
                style={{ "--i": 2 } as CSSProperties}
              >
                business forward.
              </span>
            </span>
          </h1>

          {/* Subheadline / Lede paragraph */}
          <p className="hero-lede mt-3 max-w-[270px] sm:max-w-xl text-[14px] text-secondary leading-[1.55] sm:text-xl font-normal">
            We help ambitious companies design, build and scale with AI-powered
            solutions, modern software and future-ready teams.
          </p>

          {/* CTA Buttons */}
          <ConsultButtons
            className="hero-fade mt-4 sm:mt-6 gap-2.5 sm:gap-4 w-fit"
            style={{ "--i": 1 } as CSSProperties}
            primaryLabel="Book a Free Consultation"
            primaryVariant="blue"
            primaryClassName="relative before:absolute before:-inset-1 before:content-[''] h-[42px] sm:h-13 px-5 sm:px-8 text-[14px] sm:text-base font-semibold bg-[#7138FF] hover:bg-[#6228EE] text-white shadow-[0_4px_14px_rgba(113,56,255,0.32)] sm:shadow-[0_6px_20px_rgba(113,56,255,0.38)] hover:shadow-[0_10px_28px_rgba(113,56,255,0.55)] rounded-full w-[228px] sm:w-auto"
            primaryIcon={
              <ArrowRight className="size-4 ml-1 transition-transform group-hover:translate-x-0.5" />
            }
            secondary={
              <Button
                size="lg"
                variant="outline"
                className="relative before:absolute before:-inset-1 before:content-[''] h-[42px] sm:h-13 px-5 sm:px-8 text-[14px] sm:text-base font-semibold rounded-full border border-slate-200/90 dark:border-white/15 bg-white dark:bg-white/[0.04] text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/[0.08] shadow-sm w-[228px] sm:w-auto"
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
           
          </div>

          {/* Mobile 3D Robot Image (< md only): pinned to the right of the
              copy, its bottom level with the CTAs, so it sits alongside the
              headline/lede instead of taking its own row — which is what lets
              the trust panel come up into the first screen. Negative z keeps
              it behind the copy. */}
          <div
            aria-hidden="true"
            className="absolute -right-[8%] bottom-0 -z-10 w-[46%] max-w-[260px] opacity-90 pointer-events-none select-none md:hidden"
          >
            <picture>
              <source media="(min-width: 768px)" srcSet={TRANSPARENT_PIXEL} />
              <img
                {...robotImg}
                alt=""
                aria-hidden="true"
                className="w-full h-auto object-contain drop-shadow-[0_15px_35px_rgba(113,56,255,0.15)] scale-110 origin-bottom-right"
              />
            </picture>
          </div>
        </div>

        {/* Trust panel: stats, markets and client brands, inside the hero so
            they are part of the first view. Replaces the hero's own stat rows
            (desktop row + mobile card), which repeated the same three numbers. */}
        <TrustPanel
          className="hero-fade mt-5 md:mt-[clamp(1.5rem,4.5svh,3rem)]"
          style={{ "--i": 2 } as CSSProperties}
        />
      </div>

      <ScrollIndicator />
    </section>
  );
}

