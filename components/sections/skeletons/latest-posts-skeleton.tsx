import { Skeleton } from "@/components/ui/skeleton";

export function LatestPostsSkeleton() {
  return (
    <section
      aria-label="Loading latest posts"
      className="relative py-16 sm:py-24 bg-white dark:bg-[#04040A]"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto pb-10 sm:pb-14">
          <Skeleton className="h-10 sm:h-12 w-3/4 max-w-md mx-auto rounded-xl mb-4" />
          <Skeleton className="h-4 sm:h-5 w-4/5 max-w-lg mx-auto rounded" />
        </div>

        {/* 3 Post Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] p-6 sm:p-7 flex flex-col justify-between min-h-[300px]"
            >
              <div>
                {/* Meta row */}
                <div className="flex items-center justify-between mb-4">
                  <Skeleton className="h-4 w-24 rounded" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>
                {/* Title */}
                <div className="flex flex-col gap-2 mb-3">
                  <Skeleton className="h-6 w-full rounded-lg" />
                  <Skeleton className="h-6 w-4/5 rounded-lg" />
                </div>
                {/* Excerpt */}
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-3.5 w-full rounded" />
                  <Skeleton className="h-3.5 w-11/12 rounded" />
                  <Skeleton className="h-3.5 w-3/4 rounded" />
                </div>
              </div>

              {/* Footer link */}
              <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="size-4 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
