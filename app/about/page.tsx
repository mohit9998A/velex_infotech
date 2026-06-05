import type { Metadata } from "next";
import { Gem, Target, ShieldCheck, Rocket, MapPin } from "lucide-react";

import type { StatItem } from "@/types";
import statsData from "@/content/stats.json";
import { siteConfig } from "@/config/site";
import { SectionHeader } from "@/components/common/section-header";
import { StatCard } from "@/components/common/stat-card";
import { ConsultButtons } from "@/components/common/consult-buttons";
import { CtaBanner } from "@/components/sections/cta-banner";

const stats = statsData as StatItem[];

export const metadata: Metadata = {
  title: "About Velex Infotech | AI Agency in Ludhiana, Punjab",
  description:
    "Velex Infotech is a premium AI automation and digital services agency founded by Mohit Dutta in Ludhiana, Punjab. We engineer intelligence for ambitious businesses across India.",
  alternates: { canonical: `${siteConfig.url}/about` },
};

const values = [
  { icon: Gem, title: "Crystalline quality", description: "Every build is faceted with precision. We ship work we're proud to sign." },
  { icon: Target, title: "Outcome-obsessed", description: "We define measurable success up front and engineer toward it relentlessly." },
  { icon: ShieldCheck, title: "Enterprise trust", description: "Secure, compliant and reliable — the standard our clients depend on." },
  { icon: Rocket, title: "Built to scale", description: "From MVP to production, we architect for the growth that follows." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-12 pt-36">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
        <div className="pointer-events-none absolute -top-24 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-purple-core/15 blur-[140px]" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="font-mono-label text-purple-glow">About Us</span>
          <h1 className="mt-4 font-display text-h1 text-balance text-primary">
            We engineer <span className="text-gradient">intelligence</span>.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-secondary md:text-lg">
            {siteConfig.name} is a premium AI automation and digital services agency. We help ambitious
            businesses across India deploy AI that delivers real, measurable results — with luxury-grade
            execution at every step.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="pb-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((s) => (
              <StatCard key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-pad">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader align="left" eyebrow="Our Story" title="Founded to make AI useful" />
            <div className="mt-6 flex flex-col gap-4 text-secondary">
              <p>
                Velex Infotech was founded by <strong className="text-primary">Mohit Dutta</strong>, a
                technology entrepreneur based in Ludhiana, Punjab, who specializes in AI automation and
                enterprise AI solutions for Indian businesses.
              </p>
              <p>
                We started with a simple belief: most companies don&apos;t need more software — they need
                intelligence woven into the way they already work. So we build AI automation, agentic
                systems, voice agents, WhatsApp bots and luxury web experiences that move the numbers
                that matter.
              </p>
              <p>
                Today we serve B2B and B2C clients across India, combining technical depth with a premium,
                detail-obsessed standard of delivery.
              </p>
            </div>
            <p className="mt-6 inline-flex items-center gap-2 text-sm text-secondary">
              <MapPin className="size-4 text-purple-glow" /> {siteConfig.location}
            </p>
          </div>

          {/* Founder card */}
          <div className="glass-card flex flex-col items-start p-8">
            <span className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-core to-purple-deep font-display text-2xl font-bold text-white">
              MD
            </span>
            <h3 className="mt-5 font-display text-2xl text-primary">Mohit Dutta</h3>
            <p className="text-sm text-purple-glow">Founder &amp; CEO</p>
            <p className="mt-4 text-secondary">
              &ldquo;We don&apos;t just build software. We engineer intelligence — and back it with proof.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader eyebrow="What we stand for" title="Our principles" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="glass-card p-6">
                <v.icon className="size-6 text-gold" />
                <h3 className="mt-4 font-display text-lg text-primary">{v.title}</h3>
                <p className="mt-2 text-sm text-secondary">{v.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <ConsultButtons />
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
