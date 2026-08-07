import type { CSSProperties } from "react";
import Link from "next/link";
import { Hexagon, ArrowRight } from "lucide-react";

import type { ServiceItem } from "@/types";
import servicesData from "@/content/services.json";
import { siteConfig } from "@/config/site";
import { marketsShortLine, officesLine } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { ConsultButtons } from "@/components/common/consult-buttons";
import { InteractiveRobotSpline } from "@/components/blocks/interactive-3d-robot";
import { ScrollIndicator } from "@/components/common/scroll-indicator";

const services = servicesData as ServiceItem[];

const SPLINE_SCENE =
  "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

const heroStats = [
  { value: siteConfig.stats.projects, label: "Projects" },
  { value: siteConfig.stats.clients, label: "Clients" },
  // Derived, not a hardcoded "7" — that number went stale the moment two
  // services were added.
  { value: `${services.length}`, label: "Services" },
];

/**
 * The H1 entrance was a GSAP `.from()` tween with `opacity: 0`.
 *
 * `.from()` writes the start state inline the moment the tween is built, and
 * useGSAP builds it in a layout effect — i.e. after hydration. So the H1, which
 * is the LCP element on mobile (Spline is swapped for a static SVG below
 * 767px), stayed invisible until the whole client bundle had downloaded,
 * parsed and hydrated. That was the 4.4s mobile LCP.
 *
 * It is now CSS, which starts at first paint, and the headline animates
 * transform only — never opacity — so the text is painted and LCP-eligible
 * immediately. See `.hero-word` in globals.css.
 *
 * This is now a SERVER component. It was `"use client"` for exactly one thing:
 * the `onClick` that opens the lead modal. That put the whole hero — including
 * the H1 and lede that decide LCP — behind hydration, and dragged
 * `services.json` and the site config into the client bundle with it. The
 * modal trigger lives in `ConsultButtons`, the client leaf that already
 * existed for precisely this.
 */
export function HeroSection() {
  // "AI agent" is ~3x the search demand of "agentic AI" in every market this
  // site targets, and the fastest-growing of the two. See Plan.md §1.2.
  //
  // Three explicit lines, not two that are allowed to wrap: each entry renders
  // as its own `block` span, so the break before "Business." is guaranteed at
  // every width instead of being a function of the current font size. Adding a
  // line shortens the longest one, which is what buys the `.text-hero` cap its
  // headroom — the two changes are one edit. See globals.css.
  const headlineLines = ["We Build AI Agents", "That Run Your", "Business."];

  return (
    // The navbar offset lives here as PADDING, not as a margin on the text
    // column. `min-h-dvh` includes padding under border-box, so the flex content
    // box becomes `dvh - pt - pb` and `items-center` centres within the region
    // the fixed 96px header actually leaves. The old `pt-24` on the child pushed
    // the block 48px below true centre and cost the stats row the fold.
    // Absolutely-positioned children resolve against the padding box, so the
    // Spline canvas, the gradients and the ScrollIndicator do not move.
    // The clamp floor tracks the resting header height in `navbar.tsx`.
    <section className="relative flex min-h-dvh w-full items-center overflow-hidden pt-[clamp(6rem,9svh,7rem)] pb-[clamp(3rem,8svh,5.5rem)]">
      {/* 3D Spline background */}
      <InteractiveRobotSpline
        scene={SPLINE_SCENE}
        className="absolute inset-0 z-0 h-full w-full"
      />

      {/* Readability + ambient gradients.

          These sit above the 3D scene and wash it out — badly in light mode,
          where --vx-void is #f6f5ff, so each stop is effectively white paint
          over the robot. The mid and top stops are cut 30% (70 -> 49, 40 -> 28)
          to let the scene read through.

          `from-void` stays fully opaque on purpose: that edge is the backing
          the headline sits on, and the robot never reaches it. Thinning it
          would cost text contrast without making the robot any clearer. */}
      <div className="absolute inset-0 z-[5] bg-gradient-to-r from-void via-void/49 to-transparent" />
      <div className="absolute inset-0 z-[5] bg-gradient-to-t from-void via-transparent to-void/28" />
      {/* `.glow-blob`, not `blur-[140px]`: this is the LCP frame, and a 140px
          filter on a 576px box made the compositor rasterise and blur a
          ~1400px region before anything could paint. Same look, one gradient
          fill. See globals.css. */}
      <div className="pointer-events-none absolute -left-40 top-1/3 z-[1] size-[36rem] glow-blob" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6">
        {/* The vertical rhythm below is height-fluid so short laptops compress
            instead of overflowing. `svh` not `dvh`: svh is static for the
            session, so a mobile URL-bar collapse cannot re-run the clamps and
            reflow the hero mid-scroll. */}
        {/* 46.2rem, not `max-w-2xl` (42rem): the column and the `.text-hero`
            cap are one ratio — see the comment on `.text-hero` in globals.css
            before changing either. */}
        <div className="max-w-[46.2rem]">
          <div
            className="hero-fade badge-pill mb-[clamp(0.75rem,2.2svh,1.5rem)] w-fit"
            style={{ "--i": 0 } as CSSProperties}
          >
            <Hexagon className="size-3.5 text-gold" />
            <span className="font-mono-label text-primary">
              AI Agents & Automation · Built in India
            </span>
          </div>

          <h1 className="font-display text-hero text-primary">
            {headlineLines.map((line, i) => (
              <span key={line} className="block overflow-hidden py-1">
                <span
                  className={
                    i > 0 ? "hero-word inline-block text-gradient" : "hero-word inline-block"
                  }
                  style={{ "--i": i } as CSSProperties}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          {/* `.hero-lede`, not `.hero-fade` — this paragraph can be the LCP
              element, so it must be painted and opaque on frame 1. See the
              rationale above `@keyframes hero-lede-rise` in globals.css. */}
          <p className="hero-lede mt-[clamp(0.75rem,2.2svh,1.5rem)] max-w-lg text-lg text-secondary md:text-xl">
            AI agents, voice assistants and WhatsApp automation for teams in the{" "}
            {marketsShortLine} — engineered from our hubs in {officesLine}.
          </p>

          {/* ConsultButtons supplies the flex row itself, so the animation
              classes go straight onto it rather than onto a wrapper. */}
          <ConsultButtons
            className="hero-fade mt-[clamp(1.25rem,4svh,2.5rem)]"
            style={{ "--i": 1 } as CSSProperties}
            secondary={
              <Button size="lg" variant="crystal" asChild>
                <Link href="#portfolio">
                  View Our Work <ArrowRight className="size-4" />
                </Link>
              </Button>
            }
          />

          {/* Stats */}
          <dl
            className="hero-fade mt-[clamp(1.5rem,5.5svh,3.5rem)] grid max-w-lg grid-cols-3 gap-x-6 gap-y-6"
            style={{ "--i": 2 } as CSSProperties}
          >
            {heroStats.map((s) => (
              <div key={s.label} className="flex min-w-0 flex-col">
                <dt className="order-2 font-mono-label text-muted">{s.label}</dt>
                <dd className="order-1 font-display text-2xl text-primary md:text-3xl">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
