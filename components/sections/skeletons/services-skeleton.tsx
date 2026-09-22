import { Skeleton } from "@/components/ui/skeleton";

export function ServicesSkeleton() {
  return (
    <section
      id="services"
      aria-label="Loading services"
      className="relative w-full bg-white dark:bg-[#04040A] py-16 sm:py-24"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto pb-8 sm:pb-12">
          <Skeleton className="h-4 w-32 mx-auto rounded-sm mb-3" />
          <Skeleton className="h-10 sm:h-12 w-3/4 mx-auto rounded-xl mb-4" />
          <Skeleton className="h-4 sm:h-5 w-4/5 mx-auto rounded" />
        </div>

        {/* Service selector pills row */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-10 w-28 sm:w-36 rounded-full"
            />
          ))}
        </div>

        {/* 2-Column Showcase */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center rounded-3xl border border-slate-200/80 dark:border-white/10 bg-slate-50/60 dark:bg-white/[0.02] p-6 sm:p-10">
          {/* Left Details */}
          <div className="flex flex-col gap-5">
            <Skeleton className="h-6 w-28 rounded-full" />
            <Skeleton className="h-8 sm:h-10 w-4/5 rounded-xl" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-11/12 rounded" />
              <Skeleton className="h-4 w-3/4 rounded" />
            </div>

            {/* 3 bullet points */}
            <div className="flex flex-col gap-3 pt-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="size-5 shrink-0 rounded-full" />
                  <Skeleton className="h-4 w-48 rounded" />
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex items-center gap-3 pt-4">
              <Skeleton className="h-12 w-40 rounded-full" />
              <Skeleton className="h-12 w-32 rounded-full" />
            </div>
          </div>

          {/* Right Image Frame */}
          <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-white/10 bg-slate-100 dark:bg-white/[0.04]">
            <Skeleton className="size-full rounded-2xl sm:rounded-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
