"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Hexagon, ArrowRight } from "lucide-react";

import { siteConfig } from "@/config/site";
import { useLeadModal } from "@/lib/store/lead-modal";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
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

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const openModal = useLeadModal((s) => s.openModal);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".hero-anim-word", {
        yPercent: 120,
        opacity: 0,
        stagger: 0.08,
        duration: 0.9,
      })
        .from(
          ".hero-anim-fade",
          { y: 30, opacity: 0, stagger: 0.12, duration: 0.7 },
          "-=0.4",
        );
    },
    { scope: containerRef, dependencies: [reducedMotion] },
  );

  const headlineLines = ["We Build The", "Future With AI."];

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-dvh w-full items-center overflow-hidden"
    >
      {/* 3D Spline background */}
      <InteractiveRobotSpline
        scene={SPLINE_SCENE}
        className="absolute inset-0 z-0 h-full w-full"
      />

      {/* Readability + ambient gradients */}
      <div className="absolute inset-0 z-[5] bg-gradient-to-r from-void via-void/70 to-transparent" />
      <div className="absolute inset-0 z-[5] bg-gradient-to-t from-void via-transparent to-void/40" />
      <div className="pointer-events-none absolute -left-40 top-1/3 z-[1] size-[36rem] rounded-full bg-purple-core/20 blur-[140px]" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl pt-24">
          <div className="hero-anim-fade badge-pill mb-6 w-fit">
            <Hexagon className="size-3.5 text-gold" />
            <span className="font-mono-label text-primary">
              Intelligent AI Solutions
            </span>
          </div>

          <h1 className="font-display text-hero text-primary">
            {headlineLines.map((line, i) => (
              <span key={line} className="block overflow-hidden py-1">
                <span
                  className={
                    i === 1
                      ? "hero-anim-word inline-block text-gradient"
                      : "hero-anim-word inline-block"
                  }
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p className="hero-anim-fade mt-6 max-w-lg text-lg text-secondary md:text-xl">
            Premium digital solutions for enterprises that demand intelligence,
            speed, and luxury-grade execution.
          </p>

          <div className="hero-anim-fade mt-10 flex flex-col gap-4 sm:flex-row">
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
          <dl className="hero-anim-fade mt-14 grid max-w-lg grid-cols-3 gap-x-6 gap-y-6">
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
