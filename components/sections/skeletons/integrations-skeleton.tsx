import { Skeleton } from "@/components/ui/skeleton";

export function IntegrationsSkeleton() {
  return (
    <section
      aria-label="Loading integrations"
      className="relative overflow-hidden py-16 sm:py-24 bg-white dark:bg-[#04040A]"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto pb-10 sm:pb-14">
          <Skeleton className="h-10 sm:h-12 w-3/4 max-w-md mx-auto rounded-xl mb-4" />
          <Skeleton className="h-4 sm:h-5 w-4/5 max-w-lg mx-auto rounded" />
        </div>

        {/* Dual Marquee Rows */}
        <div className="flex flex-col gap-4 py-2 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          {/* Row A */}
          <div className="flex gap-4 justify-center overflow-hidden">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={`a-${i}`}
                className="flex items-center gap-3.5 rounded-xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-white/[0.04] px-5 py-3 shrink-0"
              >
                <Skeleton className="size-5 rounded-md shrink-0" />
                <Skeleton className="h-4 w-20 sm:w-28 rounded" />
              </div>
            ))}
          </div>

          {/* Row B */}
          <div className="flex gap-4 justify-center overflow-hidden">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={`b-${i}`}
                className="flex items-center gap-3.5 rounded-xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-white/[0.04] px-5 py-3 shrink-0"
              >
                <Skeleton className="size-5 rounded-md shrink-0" />
                <Skeleton className="h-4 w-24 sm:w-32 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
