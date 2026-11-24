import { Skeleton } from "@/components/ui/skeleton";

export function BentoSkeleton() {
  return (
    <section
      id="why-us"
      aria-label="Loading why us section"
      className="relative w-full pt-8 sm:pt-14 pb-20 sm:pb-28 bg-white dark:bg-[#04040A]"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto pb-6 sm:pb-12">
          <Skeleton className="h-9 sm:h-12 w-64 mx-auto rounded-xl mb-4" />
          <Skeleton className="h-4 sm:h-5 w-4/5 max-w-lg mx-auto rounded" />
        </div>

        {/* Bento Grid */}
        <div className="grid auto-rows-[minmax(140px,auto)] sm:auto-rows-[minmax(160px,auto)] grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* 1. Large Philosophy Tile (2 cols x 2 rows) */}
          <div className="col-span-2 sm:row-span-2 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-white/10 bg-slate-100/70 dark:bg-white/[0.03] p-5 sm:p-7 flex flex-col justify-between min-h-[280px]">
            <div className="flex items-center gap-3">
              <Skeleton className="size-8 rounded-full" />
              <Skeleton className="h-4 w-28 rounded" />
            </div>
            <div className="flex flex-col gap-3 my-4">
              <Skeleton className="h-6 sm:h-8 w-11/12 rounded-lg" />
              <Skeleton className="h-6 sm:h-8 w-4/5 rounded-lg" />
            </div>
            <div className="flex items-center justify-between pt-2">
              <Skeleton className="h-4 w-32 rounded" />
              <Skeleton className="h-8 w-24 rounded-full" />
            </div>
          </div>

          {/* 2. Speed Tile */}
          <div className="rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-white/[0.03] p-4 sm:p-6 flex flex-col justify-between">
            <Skeleton className="size-9 rounded-xl" />
            <div className="flex flex-col gap-1.5 mt-4">
              <Skeleton className="h-8 sm:h-10 w-24 rounded-lg" />
              <Skeleton className="h-3.5 w-20 rounded" />
            </div>
          </div>

          {/* 3. Precision Tile */}
          <div className="rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-white/[0.03] p-4 sm:p-6 flex flex-col justify-between">
            <Skeleton className="size-9 rounded-xl" />
            <div className="flex flex-col gap-1.5 mt-4">
              <Skeleton className="h-8 sm:h-10 w-24 rounded-lg" />
              <Skeleton className="h-3.5 w-28 rounded" />
            </div>
          </div>

          {/* 4. Confidentiality Tile */}
          <div className="rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-white/[0.03] p-4 sm:p-6 flex flex-col justify-between">
            <Skeleton className="size-9 rounded-xl" />
            <div className="flex flex-col gap-1.5 mt-4">
              <Skeleton className="h-5 w-32 rounded" />
              <Skeleton className="h-3 w-40 rounded" />
            </div>
          </div>

          {/* 5. Global Reach Tile */}
          <div className="rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-white/[0.03] p-4 sm:p-6 flex flex-col justify-between">
            <Skeleton className="size-9 rounded-xl" />
            <div className="flex flex-col gap-1.5 mt-4">
              <Skeleton className="h-5 w-28 rounded" />
              <Skeleton className="h-3 w-36 rounded" />
            </div>
          </div>

          {/* 6. Audio Consultation (2 cols) */}
          <div className="col-span-2 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-white/[0.03] p-4 sm:p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="size-12 rounded-full shrink-0" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-40 rounded" />
                <Skeleton className="h-3.5 w-56 rounded" />
              </div>
            </div>
            <Skeleton className="h-10 w-28 rounded-full hidden sm:block" />
          </div>

          {/* 7. Interactive Demo (2 cols) */}
          <div className="col-span-2 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-white/[0.03] p-4 sm:p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="size-12 rounded-xl shrink-0" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-44 rounded" />
                <Skeleton className="h-3.5 w-60 rounded" />
              </div>
            </div>
            <Skeleton className="h-10 w-28 rounded-full hidden sm:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
