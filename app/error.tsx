"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Route-level error boundary.
 *
 * Without one, a client render error unmounts the segment and leaves a blank
 * page — no navigation, no way back. This keeps the layout (navbar, footer)
 * and offers a retry.
 *
 * Resilience, not performance.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[velex:render-error]", error);
  }, [error]);

  return (
    <section className="relative overflow-hidden pb-20 pt-36">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="pointer-events-none absolute -top-24 left-1/2 size-[40rem] -translate-x-1/2 glow-blob" />

      <div className="relative mx-auto max-w-xl px-4 text-center sm:px-6">
        <span className="font-mono-label text-purple-glow">Something broke</span>
        <h1 className="mt-4 font-display text-h1 text-balance text-primary">
          This page didn&apos;t load
        </h1>
        <p className="mx-auto mt-5 text-secondary md:text-lg">
          Sorry — something went wrong on our side. Trying again usually fixes
          it.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="btn-glow inline-flex h-11 items-center justify-center rounded-xl bg-purple-core px-6 text-sm font-medium text-white transition hover:-translate-y-0.5"
          >
            Try again
          </button>
          <Link
            href="/"
            className="text-sm text-secondary transition-colors hover:text-purple-glow"
          >
            Go to the homepage
          </Link>
        </div>

        {error.digest && (
          <p className="mt-8 font-mono-label text-muted">
            Reference: {error.digest}
          </p>
        )}
      </div>
    </section>
  );
}
