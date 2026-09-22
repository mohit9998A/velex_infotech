"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { PortfolioItem } from "@/types";

function domainOf(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
}

/**
 * The "browser window" at the top of a portfolio card: chrome bar with domain
 * address plus the cover viewport showing the verified project screenshot.
 */
export function PortfolioPreview({
  item,
}: {
  item: PortfolioItem;
  isLive?: boolean;
}) {
  const { preview } = item;
  const label =
    item.external && item.href ? domainOf(item.href) : "case-study · confidential";

  return (
    <div className="border-b border-vx-border">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 bg-void/40 px-3 py-2.5">
        <span className="size-2 shrink-0 rounded-full bg-error/70" />
        <span className="size-2 shrink-0 rounded-full bg-warning/70" />
        <span className="size-2 shrink-0 rounded-full bg-success/70" />
        <span className="ml-2 truncate font-mono text-xs text-secondary">
          {label}
        </span>
      </div>

      {/* Viewport */}
      <div
        className={cn(
          "relative aspect-[16/8.5] sm:aspect-[16/10] overflow-hidden",
          preview ? "bg-elevated" : cn("bg-gradient-to-br", item.accent),
        )}
      >
        {/* Hover Overlay Badge */}
        {item.external && item.href && (
          <div className="pointer-events-none absolute inset-0 bg-slate-950/30 backdrop-blur-[2px] opacity-0 group-hover/media:opacity-100 transition-all duration-300 flex items-center justify-center z-20">
            <div className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-full bg-slate-950/90 text-white dark:bg-white dark:text-slate-950 border border-white/20 dark:border-slate-800 font-mono text-xs font-semibold shadow-2xl transition-transform duration-300 scale-90 group-hover/media:scale-100">
              <span>Click to open project</span>
              <ArrowUpRight className="size-4" />
            </div>
          </div>
        )}

        {preview ? (
          <Image
            src={preview.poster}
            alt={`${item.client} website homepage`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-700 group-hover/media:scale-[1.02]"
            priority={false}
          />
        ) : (
          <>
            <div className="absolute inset-0 grid-bg opacity-50" />
            <div className="absolute inset-x-0 bottom-0 flex items-end p-4">
              <span className="font-display text-2xl text-white/90 drop-shadow">
                {item.client}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

