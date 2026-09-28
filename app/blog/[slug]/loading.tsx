export default function BlogPostLoading() {
  return (
    <article
      aria-busy="true"
      aria-label="Loading article"
      className="relative min-h-screen pt-28 pb-20 overflow-hidden"
    >
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 animate-pulse">
        {/* Breadcrumbs skeleton */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-4 w-12 rounded bg-slate-200 dark:bg-white/10" />
          <div className="h-4 w-3 rounded bg-slate-200 dark:bg-white/10" />
          <div className="h-4 w-32 rounded bg-slate-200 dark:bg-white/10" />
        </div>

        <header>
          {/* Category pill skeleton */}
          <div className="h-7 w-44 rounded-full bg-slate-200 dark:bg-white/10" />

          {/* Title skeleton */}
          <div className="mt-4 space-y-3">
            <div className="h-10 sm:h-12 w-full rounded-xl bg-slate-200 dark:bg-white/10" />
            <div className="h-10 sm:h-12 w-3/4 rounded-xl bg-slate-200 dark:bg-white/10" />
          </div>

          {/* Lede skeleton */}
          <div className="mt-5 space-y-2">
            <div className="h-5 w-full rounded bg-slate-200 dark:bg-white/10" />
            <div className="h-5 w-5/6 rounded bg-slate-200 dark:bg-white/10" />
          </div>

          {/* Meta bar skeleton */}
          <div className="mt-6 flex items-center gap-4 border-y border-slate-200/80 dark:border-white/[0.08] py-4">
            <div className="h-4 w-28 rounded bg-slate-200 dark:bg-white/10" />
            <div className="h-4 w-24 rounded bg-slate-200 dark:bg-white/10" />
            <div className="h-4 w-20 rounded bg-slate-200 dark:bg-white/10" />
          </div>
        </header>

        {/* Content body skeleton */}
        <div className="mt-12 space-y-4">
          <div className="h-4 w-full rounded bg-slate-200 dark:bg-white/10" />
          <div className="h-4 w-full rounded bg-slate-200 dark:bg-white/10" />
          <div className="h-4 w-11/12 rounded bg-slate-200 dark:bg-white/10" />
          <div className="h-4 w-4/5 rounded bg-slate-200 dark:bg-white/10" />

          <div className="pt-6 space-y-4">
            <div className="h-7 w-1/2 rounded-lg bg-slate-200 dark:bg-white/10" />
            <div className="h-4 w-full rounded bg-slate-200 dark:bg-white/10" />
            <div className="h-4 w-full rounded bg-slate-200 dark:bg-white/10" />
            <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-white/10" />
          </div>
        </div>
      </div>
    </article>
  );
}
