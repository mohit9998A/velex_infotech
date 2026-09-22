import { siteConfig } from "@/config/site";
import { officesLine, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/terms-of-service",
  title: "Terms of Service",
  description: "The terms that govern your use of the Velex Infotech website and services.",
  // See the note in privacy-policy: `follow: false` was suppressing internal
  // link flow for no benefit.
  robots: { index: true, follow: true },
});

export default function TermsOfServicePage() {
  return (
    <section className="relative overflow-hidden pb-24 pt-28 lg:pt-36">
      {/* Soft background ambient layers with hardware acceleration (design.md 7.2) */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30 dark:opacity-20" />
      <div className="pointer-events-none absolute -top-32 left-1/2 size-[44rem] -translate-x-1/2 rounded-full bg-purple-500/10 dark:bg-purple-600/15 blur-[120px] [transform:translateZ(0)]" />
      <div className="pointer-events-none absolute top-1/3 right-0 size-[32rem] rounded-full bg-indigo-500/10 dark:bg-indigo-600/15 blur-[120px] [transform:translateZ(0)]" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          {/* Aesthetic Kicker (design.md 4.2) */}
          <div className="flex items-center justify-center gap-3">
            <span className="h-[2.5px] w-6 sm:w-7 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
            <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#7138FF] dark:text-[#8B4DFF]">
              TERMS &amp; CONDITIONS
            </span>
            <span className="h-[2.5px] w-6 sm:w-7 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
          </div>

          <h1 className="mt-4 font-serif text-[clamp(2.35rem,5vw,3.75rem)] font-bold tracking-tight text-[#0D0A24] dark:text-white">
            Terms of Service
          </h1>
          <p className="mt-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#7138FF] dark:text-[#B99CFF]">
            Last updated: June 2025
          </p>
        </div>

        {/* Legal Document Container (design.md 4.3) */}
        <div className="mt-10 rounded-3xl border border-slate-200/90 dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] p-8 sm:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
          <div className="flex flex-col gap-10 text-slate-600 dark:text-white/75 font-sans">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0D0A24] dark:text-white">
                1. Use of this website
              </h2>
              <p className="mt-3 text-base leading-relaxed">
                By accessing this website you agree to use it lawfully and not to misuse, disrupt, or
                attempt to gain unauthorised access to any part of it or its systems.
              </p>
            </div>

            <div className="border-t border-slate-200/80 dark:border-white/[0.08] pt-8">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0D0A24] dark:text-white">
                2. Services &amp; quotes
              </h2>
              <p className="mt-3 text-base leading-relaxed">
                Information on this site is for general guidance. Pricing, timelines, and scope are
                indicative and confirmed in a written proposal before any engagement begins.
              </p>
            </div>

            <div className="border-t border-slate-200/80 dark:border-white/[0.08] pt-8">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0D0A24] dark:text-white">
                3. Intellectual property
              </h2>
              <p className="mt-3 text-base leading-relaxed">
                All content, branding, and design on this website are the property of {siteConfig.name}{" "}
                unless otherwise stated, and may not be reused without permission.
              </p>
            </div>

            <div className="border-t border-slate-200/80 dark:border-white/[0.08] pt-8">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0D0A24] dark:text-white">
                4. Contact
              </h2>
              <p className="mt-3 text-base leading-relaxed">
                Questions about these terms? Reach us at{" "}
                <a
                  className="font-medium text-[#7138FF] dark:text-[#B99CFF] underline underline-offset-4 hover:text-[#5424D6] dark:hover:text-white"
                  href={`mailto:${siteConfig.email}`}
                >
                  {siteConfig.email}
                </a>{" "}
                or {siteConfig.phoneDisplay}, {officesLine}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
