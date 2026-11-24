import { Skeleton } from "@/components/ui/skeleton";

export function FaqSkeleton() {
  return (
    <section
      aria-label="Loading FAQs"
      className="relative py-16 sm:py-24 bg-white dark:bg-[#04040A]"
    >
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto pb-10 sm:pb-14">
          <Skeleton className="h-10 sm:h-12 w-64 mx-auto rounded-xl mb-4" />
          <Skeleton className="h-4 sm:h-5 w-4/5 max-w-lg mx-auto rounded" />
        </div>

        {/* Accordion Stack */}
        <div className="flex flex-col gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] px-6 sm:px-8 py-6 flex items-center justify-between"
            >
              <Skeleton className="h-6 w-3/4 sm:w-2/3 rounded-lg" />
              <Skeleton className="size-5 rounded-full shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
