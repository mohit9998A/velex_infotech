import { Skeleton } from "@/components/ui/skeleton";

export function TestimonialsSkeleton() {
  return (
    <section
      aria-label="Loading testimonials"
      className="section-pad relative overflow-hidden bg-white dark:bg-[#04040A]"
    >
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto pb-10 sm:pb-12">
          <Skeleton className="h-4 w-28 mx-auto rounded-sm mb-3" />
          <Skeleton className="h-10 sm:h-12 w-64 mx-auto rounded-xl" />
        </div>

        {/* Carousel Card */}
        <div className="max-w-3xl mx-auto rounded-3xl border border-slate-200/80 dark:border-white/10 bg-slate-50/70 dark:bg-white/[0.03] p-8 md:p-10 flex flex-col gap-6">
          <Skeleton className="size-9 rounded-xl" />
          <div className="flex flex-col gap-3">
            <Skeleton className="h-6 sm:h-7 w-full rounded-lg" />
            <Skeleton className="h-6 sm:h-7 w-4/5 rounded-lg" />
          </div>
          <div className="flex gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="size-4 rounded-sm" />
            ))}
          </div>
          <div className="flex items-center gap-3 pt-2">
            <Skeleton className="size-11 rounded-full shrink-0" />
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-4 w-28 rounded" />
              <Skeleton className="h-3 w-40 rounded" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
