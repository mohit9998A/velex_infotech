import { Skeleton } from "@/components/ui/skeleton";

export function LocationShellSkeleton() {
  return (
    <div aria-label="Loading location page" className="relative w-full">
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-36 bg-white dark:bg-[#04040A]">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 mb-6">
            <Skeleton className="h-4 w-16 rounded" />
            <span className="text-slate-300 dark:text-white/20">/</span>
            <Skeleton className="h-4 w-24 rounded" />
          </div>

          {/* Badge */}
          <Skeleton className="h-7 w-32 rounded-full mb-6" />

          {/* H1 */}
          <div className="flex flex-col gap-3 mb-5">
            <Skeleton className="h-10 sm:h-14 w-4/5 rounded-2xl" />
            <Skeleton className="h-10 sm:h-14 w-3/5 rounded-2xl" />
          </div>

          {/* Lede */}
          <div className="flex flex-col gap-2 max-w-2xl mb-9">
            <Skeleton className="h-5 w-full rounded" />
            <Skeleton className="h-5 w-4/5 rounded" />
          </div>

          {/* CTA */}
          <Skeleton className="h-13 w-56 rounded-full mb-12" />

          {/* Facts Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-slate-50/70 dark:bg-white/[0.03] p-5 flex flex-col gap-2"
              >
                <Skeleton className="h-3.5 w-24 rounded" />
                <Skeleton className="h-5 w-48 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid Placeholder */}
      <section className="py-16 bg-slate-50/50 dark:bg-white/[0.01]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto pb-10">
            <Skeleton className="h-8 sm:h-10 w-64 mx-auto rounded-xl mb-3" />
            <Skeleton className="h-4 w-4/5 mx-auto rounded" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-white/[0.03] p-6 flex flex-col gap-3"
              >
                <Skeleton className="size-10 rounded-xl" />
                <Skeleton className="h-6 w-36 rounded-lg" />
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-4/5 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
