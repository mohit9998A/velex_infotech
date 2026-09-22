import { Skeleton } from "@/components/ui/skeleton";

export function HeroSkeleton() {
  return (
    <section
      aria-label="Loading hero"
      className="relative flex min-h-dvh w-full flex-col justify-between overflow-hidden pt-20 pb-4 sm:pb-6 md:flex-row md:items-center md:pt-[clamp(6rem,9svh,7rem)] md:pb-[clamp(3rem,8svh,5.5rem)] bg-white dark:bg-[#04040A]"
    >
      {/* Background ambient gradient placeholder */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 z-[1] size-[36rem] rounded-full bg-purple-500/5 blur-3xl"
      />

      {/* Right side visual placeholder */}
      <div
        aria-hidden="true"
        className="hidden md:flex absolute right-4 lg:right-12 top-1/2 -translate-y-1/2 z-0 size-[min(45vw,500px)] items-center justify-center opacity-40"
      >
        <div className="size-72 rounded-full border border-purple-500/15 bg-purple-500/5 animate-pulse" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 flex-1 flex flex-col justify-between">
        <div className="max-w-[52rem] lg:max-w-[58rem] xl:max-w-[62rem]">
          {/* Eyebrow */}
          <div className="mb-2.5 sm:mb-[clamp(0.85rem,2.4svh,1.75rem)] flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-[2.5px] w-6 sm:w-7 rounded-full bg-[#7138FF]/40"
            />
            <Skeleton className="h-4 w-52 rounded-sm" />
          </div>

          {/* Headline (3 lines matching fluid sizing) */}
          <div className="flex flex-col gap-2.5 sm:gap-3 py-1">
            <Skeleton className="h-[clamp(2.2rem,5vw,3.8rem)] w-[82%] max-w-lg rounded-xl" />
            <Skeleton className="h-[clamp(2.2rem,5vw,3.8rem)] w-[68%] max-w-md rounded-xl" />
            <Skeleton className="h-[clamp(2.2rem,5vw,3.8rem)] w-[92%] max-w-xl rounded-xl" />
          </div>

          {/* Subheadline (2 lines) */}
          <div className="mt-3 max-w-[270px] sm:max-w-xl flex flex-col gap-2">
            <Skeleton className="h-4 sm:h-5 w-full rounded" />
            <Skeleton className="h-4 sm:h-5 w-4/5 rounded" />
          </div>

          {/* CTA Buttons */}
          <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2.5 sm:gap-4">
            <Skeleton className="h-[44px] sm:h-13 w-[190px] rounded-full" />
            <Skeleton className="h-[44px] sm:h-13 w-[170px] rounded-full" />
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-[clamp(1.75rem,5.5svh,3.5rem)] flex flex-wrap items-center gap-6 sm:gap-10">
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-7 sm:h-8 w-20 rounded" />
            <Skeleton className="h-3.5 w-28 rounded-sm" />
          </div>
          <div className="h-8 w-px bg-slate-200 dark:bg-white/10 hidden sm:block" />
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-7 sm:h-8 w-20 rounded" />
            <Skeleton className="h-3.5 w-24 rounded-sm" />
          </div>
          <div className="h-8 w-px bg-slate-200 dark:bg-white/10 hidden sm:block" />
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-7 sm:h-8 w-16 rounded" />
            <Skeleton className="h-3.5 w-24 rounded-sm" />
          </div>
        </div>
      </div>
    </section>
  );
}
