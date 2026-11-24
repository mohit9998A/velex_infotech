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
