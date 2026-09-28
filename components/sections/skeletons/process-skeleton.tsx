import { Skeleton } from "@/components/ui/skeleton";

export function ProcessSkeleton() {
  return (
    <section
      id="process"
      aria-label="Loading process section"
      className="relative w-full py-16 sm:py-28 bg-white dark:bg-[#04040A]"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto pb-12 sm:pb-16">
          <Skeleton className="h-4 w-28 mx-auto rounded-sm mb-3" />
          <Skeleton className="h-10 sm:h-12 w-3/4 mx-auto rounded-xl mb-4" />
          <Skeleton className="h-4 sm:h-5 w-4/5 mx-auto rounded" />
        </div>

        {/* 4 Process Step Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] p-5 sm:p-6 flex flex-col justify-between min-h-[360px]"
            >
              {/* Top Row: Number & Icon */}
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="size-10 rounded-xl" />
                <Skeleton className="h-6 w-10 rounded-full" />
              </div>

              {/* Title & Description */}
              <div className="flex flex-col gap-2 mb-4">
                <Skeleton className="h-6 w-32 rounded-lg" />
                <Skeleton className="h-3.5 w-full rounded" />
                <Skeleton className="h-3.5 w-4/5 rounded" />
              </div>

              {/* Step Visual Preview */}
              <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-200/60 dark:border-white/10 bg-slate-100 dark:bg-white/[0.04] mb-4">
                <Skeleton className="size-full" />
              </div>

              {/* Deliverable points */}
              <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 dark:border-white/5">
                <Skeleton className="h-3 w-28 rounded" />
                <Skeleton className="h-3 w-32 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
