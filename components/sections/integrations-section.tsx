"use client";

import type { CSSProperties } from "react";
import { motion } from "motion/react";
import type { IntegrationItem } from "@/types";
import integrationsData from "@/content/integrations.json";

const integrations = integrationsData as IntegrationItem[];

function Tile({ item, ariaHidden }: { item: IntegrationItem; ariaHidden?: boolean }) {
  return (
    <div
      aria-hidden={ariaHidden || undefined}
      className="flex w-max items-center gap-3.5 rounded-xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-white/[0.04] backdrop-blur-md px-5 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_4px_16px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 hover:border-purple-300 dark:hover:border-purple-500/30 transition-all duration-300"
    >
      {item.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.logo}
          alt=""
          width={20}
          height={20}
          loading="lazy"
          decoding="async"
          className="size-5 object-contain shrink-0"
        />
      ) : (
        <span className="font-mono text-sm font-semibold text-purple-600 dark:text-purple-400 shrink-0">
          {item.abbr}
        </span>
      )}
      <span className="whitespace-nowrap font-sans text-sm font-semibold text-slate-800 dark:text-white">
        {item.name}
      </span>
    </div>
  );
}

function MarqueeRow({
  items,
  reverse,
}: {
  items: IntegrationItem[];
  reverse?: boolean;
}) {
  return (
    <div className="group overflow-hidden">
      <div
        style={{ "--marquee-gap": "1rem" } as CSSProperties}
        className={`flex w-max gap-4 ${
          reverse ? "animate-scroll-right" : "animate-scroll-left-slow"
        } group-hover:[animation-play-state:paused]`}
      >
        {items.map((item) => (
          <Tile key={item.name} item={item} />
        ))}
        {items.map((item) => (
          <Tile key={`${item.name}-dup`} item={item} ariaHidden />
        ))}
      </div>
    </div>
  );
}

export function IntegrationsSection() {
  const mid = Math.ceil(integrations.length / 2);
  const rowA = integrations.slice(0, mid);
  const rowB = integrations.slice(mid);

  return (
    <section className="defer-paint section-pad relative overflow-hidden bg-white dark:bg-[#04040A] text-slate-900 dark:text-white transition-colors duration-500">
      {/* Background pattern & ambient glows */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30 dark:opacity-20" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[48rem] h-[28rem] bg-gradient-to-r from-blue-500/10 via-purple-500/15 to-pink-500/10 blur-3xl rounded-full opacity-70 dark:opacity-40"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="relative text-center max-w-3xl mx-auto pb-10 sm:pb-14">
          {/* Eyebrow */}
          <motion.div
            className="inline-flex items-center justify-center gap-2.5 mb-2.5 sm:mb-3"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            
          </motion.div>

          {/* Headline */}
          <motion.h2
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-tight text-slate-900 dark:text-white"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
          >
            Plugs into your{" "}
            <span className="italic text-[#7138FF] dark:text-[#8B4DFF]">
              entire stack
            </span>
          </motion.h2>

          {/* Subheading */}
          <motion.p
            className="font-sans text-sm sm:text-base md:text-lg leading-relaxed mt-3 sm:mt-4 max-w-2xl mx-auto text-slate-600 dark:text-white/60"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            We seamlessly integrate with the tools you already rely on — and the AI platforms defining what&apos;s next.
          </motion.p>
        </div>

        {/* Marquee Rows with Side Fade Mask */}
        <div className="flex flex-col gap-4 py-2 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <MarqueeRow items={rowA} />
          <MarqueeRow items={rowB} reverse />
        </div>
      </div>
    </section>
  );
}
