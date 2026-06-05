"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import type { PortfolioItem } from "@/types";
import { Badge } from "@/components/ui/badge";

function domainOf(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
}

export function PortfolioCard({ item }: { item: PortfolioItem }) {
  const isLink = item.external && item.href;

  const inner = (
    <>
      {/* Cover */}
      <div className={cn("relative h-44 overflow-hidden bg-gradient-to-br", item.accent)}>
        <div className="absolute inset-0 grid-bg opacity-50" />
        {/* Browser chrome mock */}
        <div className="absolute inset-x-4 top-4 flex items-center gap-2 rounded-lg border border-white/10 bg-void/60 px-3 py-2 backdrop-blur-sm">
          <span className="size-2 rounded-full bg-error/70" />
          <span className="size-2 rounded-full bg-warning/70" />
          <span className="size-2 rounded-full bg-success/70" />
          <span className="ml-2 truncate text-xs text-secondary">
            {isLink && item.href ? domainOf(item.href) : "case-study · confidential"}
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex h-20 items-end p-4">
          <span className="font-display text-2xl text-white/90 drop-shadow">
            {item.client}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <Badge variant="outline">{item.category}</Badge>
          <Badge variant="outline">{item.segment}</Badge>
        </div>
        <h3 className="mt-3 font-display text-lg text-primary">{item.title}</h3>
        <p className="mt-2 text-sm text-secondary">{item.description}</p>
        <p className="mt-3 text-sm font-medium text-gold">{item.result}</p>

        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
          {isLink ? (
            <>
              Visit live site
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-secondary">
              <Lock className="size-3.5" /> Under NDA
            </span>
          )}
        </span>
      </div>
    </>
  );

  const baseClass =
    "group flex h-full flex-col overflow-hidden rounded-2xl border border-vx-border bg-surface/60 backdrop-blur-sm transition-colors hover:border-vx-border-bright";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {isLink && item.href ? (
        <a href={item.href} target="_blank" rel="noopener noreferrer" className={baseClass}>
          {inner}
        </a>
      ) : (
        <div className={baseClass}>{inner}</div>
      )}
    </motion.div>
  );
}
