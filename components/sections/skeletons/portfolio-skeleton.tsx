import { Skeleton } from "@/components/ui/skeleton";

export function PortfolioSkeleton() {
  return (
    <section
      id="portfolio"
      aria-label="Loading portfolio"
      className="relative py-16 sm:py-24 bg-white dark:bg-[#04040A]"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto pb-8 sm:pb-12">
          <Skeleton className="h-10 sm:h-12 w-3/4 max-w-md mx-auto rounded-xl mb-4" />
          <Skeleton className="h-4 sm:h-5 w-4/5 max-w-lg mx-auto rounded" />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 sm:mb-12">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-9 w-24 sm:w-32 rounded-full"
            />
          ))}
        </div>

        {/* Featured Case Study Card Skeleton */}
        <div className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-slate-50/70 dark:bg-white/[0.03] p-6 sm:p-10 grid lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Visual Frame */}
          <div className="lg:col-span-7 aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-200/60 dark:border-white/10 bg-slate-100 dark:bg-white/[0.04]">
            <Skeleton className="size-full" />
          </div>

          {/* Details */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <Skeleton className="h-8 sm:h-9 w-4/5 rounded-xl" />
            <div className="flex flex-col gap-2 py-1">
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-11/12 rounded" />
              <Skeleton className="h-4 w-3/4 rounded" />
            </div>
            {/* Impact Metric */}
            <div className="rounded-xl border border-slate-200/60 dark:border-white/5 bg-white dark:bg-white/[0.02] p-4 flex flex-col gap-1 my-2">
              <Skeleton className="h-7 w-28 rounded" />
              <Skeleton className="h-3 w-40 rounded" />
            </div>
            <Skeleton className="h-11 w-36 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
