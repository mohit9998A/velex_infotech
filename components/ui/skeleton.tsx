import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-white/[0.04] border border-vx-border",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
