import { Skeleton } from "@/components/ui/skeleton";

export function TrustBarSkeleton() {
  return (
    <section
      aria-label="Loading client marquee"
      className="border-y border-slate-200/80 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] py-10 overflow-hidden"
    >
      <div className="mx-auto flex flex-col items-center">
        <Skeleton className="mb-7 h-3.5 w-36 rounded-sm" />
        <div className="flex w-full justify-center gap-8 sm:gap-14 px-4 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-6 w-28 sm:w-36 shrink-0 rounded-md opacity-60"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
