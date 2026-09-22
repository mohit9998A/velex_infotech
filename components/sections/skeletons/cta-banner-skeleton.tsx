import { Skeleton } from "@/components/ui/skeleton";

export function CtaBannerSkeleton() {
  return (
    <section
      aria-label="Loading call to action"
      className="relative overflow-hidden py-20 sm:py-28 bg-white dark:bg-[#04040A]"
    >
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        {/* Headline */}
        <div className="flex flex-col items-center gap-3 mb-6">
          <Skeleton className="h-10 sm:h-14 md:h-16 w-4/5 max-w-2xl rounded-2xl" />
          <Skeleton className="h-10 sm:h-14 md:h-16 w-3/5 max-w-lg rounded-2xl" />
        </div>

        {/* Subheading */}
        <div className="flex flex-col items-center gap-2 max-w-2xl mx-auto mb-10">
          <Skeleton className="h-4 sm:h-5 w-full rounded" />
          <Skeleton className="h-4 sm:h-5 w-4/5 rounded" />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Skeleton className="h-13 w-64 rounded-full" />
          <Skeleton className="h-13 w-48 rounded-full" />
        </div>
      </div>
    </section>
  );
}
