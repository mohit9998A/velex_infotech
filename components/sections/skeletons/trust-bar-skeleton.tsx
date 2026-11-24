import { Skeleton } from "@/components/ui/skeleton";

/** Mirrors trust-bar.tsx: stats row over a brands row, inside one panel. */
export function TrustBarSkeleton() {
  return (
    <section
      aria-label="Loading trusted brands"
      className="border-y border-slate-200/80 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] py-8 sm:py-10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-white/10">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-[repeat(4,minmax(0,1fr))_auto]">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2 px-3 py-5 lg:items-start lg:px-7">
                <Skeleton className="h-7 w-14 rounded-md" />
                <Skeleton className="h-3 w-24 rounded-sm opacity-60" />
              </div>
            ))}
            <div className="col-span-full flex items-center justify-center gap-3 px-4 py-4 lg:col-span-1 lg:px-7">
              <Skeleton className="h-9 w-24 rounded-full" />
              <Skeleton className="h-3 w-36 rounded-sm opacity-60" />
            </div>
          </div>
          <div className="flex flex-col items-center gap-5 border-t border-slate-200/80 dark:border-white/10 px-4 py-6 sm:px-6 xl:flex-row xl:px-8 xl:py-5">
            <Skeleton className="h-4 w-40 rounded-sm xl:w-28" />
            <div className="grid w-full flex-1 grid-cols-2 gap-6 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="mx-auto h-6 w-24 rounded-md opacity-60" />
              ))}
            </div>
            <Skeleton className="h-10 w-full rounded-full md:w-44" />
          </div>
        </div>
      </div>
    </section>
  );
}
