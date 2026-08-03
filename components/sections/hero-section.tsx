"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { Hexagon, ArrowRight } from "lucide-react";

import { siteConfig } from "@/config/site";
import { useLeadModal } from "@/lib/store/lead-modal";
import { Button } from "@/components/ui/button";
import { InteractiveRobotSpline } from "@/components/blocks/interactive-3d-robot";
import { ScrollIndicator } from "@/components/common/scroll-indicator";

const SPLINE_SCENE =
  "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

const heroStats = [
  { value: siteConfig.stats.projects, label: "Projects" },
  { value: siteConfig.stats.clients, label: "Clients" },
  { value: siteConfig.stats.services, label: "Services" },
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
 */
export function HeroSection() {
  const openModal = useLeadModal((s) => s.openModal);

  const headlineLines = ["We Build AI Automation", "That Runs Your Business."];

  return (
    <section className="relative flex min-h-dvh w-full items-center overflow-hidden">
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
      <div className="pointer-events-none absolute -left-40 top-1/3 z-[1] size-[36rem] rounded-full bg-purple-core/14 blur-[140px]" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl pt-24">
          <div
            className="hero-fade badge-pill mb-6 w-fit"
            style={{ "--i": 0 } as CSSProperties}
          >
            <Hexagon className="size-3.5 text-gold" />
            <span className="font-mono-label text-primary">
              AI Automation & Agentic AI · India
            </span>
          </div>

          <h1 className="font-display text-hero text-primary">
            {headlineLines.map((line, i) => (
              <span key={line} className="block overflow-hidden py-1">
                <span
                  className={
                    i === 1 ? "hero-word inline-block text-gradient" : "hero-word inline-block"
                  }
                  style={{ "--i": i } as CSSProperties}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="hero-fade mt-6 max-w-lg text-lg text-secondary md:text-xl"
            style={{ "--i": 1 } as CSSProperties}
          >
            We build AI agents, voice assistants and WhatsApp automation for
            businesses across India — from our base in Ludhiana, Punjab.
          </p>

          <div
            className="hero-fade mt-10 flex flex-col gap-4 sm:flex-row"
            style={{ "--i": 2 } as CSSProperties}
          >
            <Button size="lg" className="btn-glow" onClick={() => openModal()}>
              Get Free Consultation
            </Button>
            <Button size="lg" variant="crystal" asChild>
              <Link href="#portfolio">
                View Our Work <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <dl
            className="hero-fade mt-14 grid max-w-lg grid-cols-3 gap-x-6 gap-y-6"
            style={{ "--i": 3 } as CSSProperties}
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
