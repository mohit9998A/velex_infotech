import * as React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shimmer?: boolean;
}

/**
 * Base Google-style skeleton loading primitive.
 * Low contrast, subtle neutral tone, smooth hardware-accelerated CSS shimmer.
 */
export function Skeleton({
  className,
  shimmer = true,
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "rounded-md bg-slate-200/75 dark:bg-white/[0.06]",
        shimmer && "animate-skeleton-shimmer",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Multi-line paragraph placeholder with realistic line-width staggering.
 */
export function SkeletonText({
  lines = 3,
  className,
  lastLineWidth = "w-3/5",
}: {
  lines?: number;
  className?: string;
  lastLineWidth?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2.5", className)} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4 rounded-sm",
            i === lines - 1 ? lastLineWidth : "w-full",
          )}
        />
      ))}
    </div>
  );
}

/**
 * Button-shaped skeleton placeholder.
 */
export function SkeletonButton({
  className,
}: {
  className?: string;
}) {
  return (
    <Skeleton
      className={cn("h-11 w-36 rounded-full", className)}
      aria-hidden="true"
    />
  );
}

/**
 * Card container skeleton with matching hairline borders and background.
 */
export function SkeletonCard({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.02] p-6 shadow-xs",
        className,
      )}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}
