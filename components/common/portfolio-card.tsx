"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";

import type { PortfolioItem } from "@/types";
import { Badge } from "@/components/ui/badge";
import { PortfolioPreview } from "@/components/common/portfolio-preview";

export function PortfolioCard({
  item,
  isLive,
  onActivate,
  onDeactivate,
}: {
  item: PortfolioItem;
  isLive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  const isLink = Boolean(item.external && item.href);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {/*
        An <article>, not an <a>: the live preview is an iframe, which cannot
        legally nest inside a link. The "Visit live site" anchor below stretches
        over the whole card instead, so the card stays one clickable target.
      */}
      <article
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-vx-border bg-surface/60 backdrop-blur-sm transition-colors hover:border-vx-border-bright focus-within:border-vx-border-bright"
        onMouseEnter={onActivate}
        onMouseLeave={onDeactivate}
      >
        <PortfolioPreview item={item} isLive={isLive} />

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-2">
            <Badge variant="outline">{item.category}</Badge>
            <Badge variant="outline">{item.segment}</Badge>
          </div>
          <h3 className="mt-3 font-display text-lg text-primary">{item.title}</h3>
          <p className="mt-2 text-sm text-secondary">{item.description}</p>
          <p className="mt-3 text-sm font-medium text-gold">{item.result}</p>

          {isLink ? (
            <a
              href={item.href!}
              target="_blank"
              rel="noopener noreferrer"
              onFocus={onActivate}
              onBlur={onDeactivate}
              className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-medium text-primary underline-offset-4 outline-none after:absolute after:inset-0 after:content-[''] hover:underline focus-visible:underline"
            >
              Visit live site
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span className="sr-only">{` — ${item.client} (opens in a new tab)`}</span>
            </a>
          ) : (
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-secondary">
              <Lock className="size-3.5" /> Under NDA
            </span>
          )}
        </div>
      </article>
    </motion.div>
  );
}
