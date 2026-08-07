import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { ServiceItem } from "@/types";
import servicesData from "@/content/services.json";
import { getServiceIcon } from "@/lib/icons";

const services = (servicesData as ServiceItem[]).slice(0, 6);

/**
 * Branded 404.
 *
 * There was no not-found.tsx at all, so an unknown URL rendered Next's default
 * monochrome page: off-brand, no navigation, a dead end. And it gets hit — both
 * dynamic routes set `dynamicParams = false`, so every bad service or blog slug
 * lands here. This renders inside the root layout, so navbar and footer come
 * free.
 */

/**
 * Next injects its own `<meta name="robots" content="noindex">` for a 404, so
 * this page was never going to be indexed — but exporting no metadata at all
 * was not harmless. Metadata inheritance is shallow and per-key, so this page
 * inherited `alternates.canonical` and the permissive `robots` block from
 * app/layout.tsx, and the built HTML shipped a self-contradicting pair of
 * robots tags plus `<link rel="canonical" href="https://velexinfotech.com">`.
 * Since both dynamic routes set `dynamicParams = false`, that canonical was
 * telling Google every bad service and blog slug *was* the homepage.
 *
 * `canonical: null` suppresses the tag outright (resolveCanonicalUrl returns
 * null for a falsy value); `robots` replaces the parent object wholesale,
 * discarding its googleBot block along with it.
 */
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden pb-20 pt-36">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="pointer-events-none absolute -top-24 left-1/2 size-[40rem] -translate-x-1/2 glow-blob" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center">
          <span className="font-mono-label text-purple-glow">404</span>
          <h1 className="mt-4 font-display text-h1 text-balance text-primary">
            This page doesn&apos;t exist
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-secondary md:text-lg">
            The link may be out of date, or the page may have moved. Here&apos;s
            where most people are heading.
          </p>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = getServiceIcon(service.icon);
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group glass-card flex items-center gap-3 p-4"
              >
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-vx-border-bright bg-purple-core/10 text-purple-glow">
                  <Icon className="size-5" />
                </span>
                <span className="min-w-0 flex-1 text-sm text-primary">
                  {service.title}
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
          {[
            { label: "All services", href: "/services" },
            { label: "Blog", href: "/blog" },
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
            { label: "Home", href: "/" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-secondary transition-colors hover:text-purple-glow"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
