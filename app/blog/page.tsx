import type { Metadata } from "next";
import { Sparkles } from "lucide-react";

import { siteConfig } from "@/config/site";
import { ConsultButtons } from "@/components/common/consult-buttons";

export const metadata: Metadata = {
  title: "Blog & Insights | Velex Infotech",
  description:
    "Insights on AI automation, agentic AI, voice agents, WhatsApp chatbots and building intelligent businesses — from the Velex Infotech team.",
  alternates: { canonical: `${siteConfig.url}/blog` },
};

const upcoming = [
  "What is Agentic AI? A Complete Guide for Indian Business Owners",
  "AI Automation ROI: How to Measure Real Results",
  "Voice AI Agents: How Businesses Replace Call Centers with AI",
  "WhatsApp Business API + AI: The Complete Integration Guide",
  "AI Automation vs Agentic AI: Which Does Your Business Need?",
  "How to Choose an AI Agency in India: A 2025 Guide",
];

export default function BlogPage() {
  return (
    <section className="relative overflow-hidden pb-24 pt-36">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="pointer-events-none absolute -top-24 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-purple-core/15 blur-[140px]" />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <span className="badge-pill mx-auto w-fit">
          <Sparkles className="size-3.5 text-gold" />
          <span className="font-mono-label text-primary">Insights</span>
        </span>
        <h1 className="mt-6 font-display text-h1 text-balance text-primary">
          The intelligence brief
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-secondary md:text-lg">
          Deep, practical writing on AI automation, agentic systems and building intelligent
          businesses is on the way. Here&apos;s what we&apos;re publishing first.
        </p>

        <ul className="mx-auto mt-12 flex max-w-2xl flex-col gap-3 text-left">
          {upcoming.map((title) => (
            <li
              key={title}
              className="glass-card flex items-center justify-between gap-4 p-5"
            >
              <span className="text-primary">{title}</span>
              <span className="shrink-0 font-mono-label text-muted">Soon</span>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-secondary">
          Want these in your inbox first? Get in touch and we&apos;ll keep you posted.
        </p>
        <div className="mt-6 flex justify-center">
          <ConsultButtons primaryLabel="Talk to Us" />
        </div>
      </div>
    </section>
  );
}
