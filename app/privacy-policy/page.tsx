import { siteConfig } from "@/config/site";
import { officesLine, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/privacy-policy",
  title: "Privacy Policy",
  description: "How Velex Infotech collects, uses, and protects your information.",
  // Was `follow: false`, which told crawlers to ignore every link on the page —
  // including the footer nav back into the site. Nofollowing your own legal
  // pages only strangles internal link flow; there is nothing to protect here.
  robots: { index: true, follow: true },
});

export default function PrivacyPolicyPage() {
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
              LEGAL &amp; COMPLIANCE
            </span>
            <span className="h-[2.5px] w-6 sm:w-7 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
          </div>

          <h1 className="mt-4 font-serif text-[clamp(2.35rem,5vw,3.75rem)] font-bold tracking-tight text-[#0D0A24] dark:text-white">
            Privacy Policy
          </h1>
          <p className="mt-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#7138FF] dark:text-[#B99CFF]">
            Last updated: August 2026
          </p>
        </div>

        {/* Legal Document Container (design.md 4.3) */}
        <div className="mt-10 rounded-3xl border border-slate-200/90 dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] p-8 sm:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
          <div className="flex flex-col gap-10 text-slate-600 dark:text-white/75 font-sans">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0D0A24] dark:text-white">
                1. Information we collect
              </h2>
              <p className="mt-3 text-base leading-relaxed">
                When you submit our consultation or contact forms, we collect the details you provide —
                such as your name, email, phone number, company, the service you&apos;re interested in, and
                your message.
              </p>
            </div>

            <div className="border-t border-slate-200/80 dark:border-white/[0.08] pt-8">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0D0A24] dark:text-white">
                2. Analytics and cookies
              </h2>
              <p className="mt-3 text-base leading-relaxed">
                This website uses Google Analytics 4 (measurement ID {siteConfig.gaMeasurementId}) to
                understand which pages people read and how they arrive. Google sets cookies in your
                browser to do this, and records your approximate location, device and browser, the
                pages you view, and the site or search that referred you. IP addresses are not stored
                by Google Analytics 4.
              </p>
              <p className="mt-3 text-base leading-relaxed">
                We do not use analytics data to identify you personally, and we do not combine it with
                anything you submit through our forms. You can opt out entirely with Google&apos;s{" "}
                <a
                  className="font-medium text-[#7138FF] dark:text-[#B99CFF] underline underline-offset-4 hover:text-[#5424D6] dark:hover:text-white"
                  href="https://tools.google.com/dlpage/gaoptout"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  browser add-on
                </a>
                , or by blocking cookies in your browser settings — the site works normally either way.
              </p>
            </div>

            <div className="border-t border-slate-200/80 dark:border-white/[0.08] pt-8">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0D0A24] dark:text-white">
                3. How we use your information
              </h2>
              <p className="mt-3 text-base leading-relaxed">
                We use your information solely to respond to your enquiry, deliver the services you
                request, and improve our website. We do not sell your personal information.
              </p>
            </div>

            <div className="border-t border-slate-200/80 dark:border-white/[0.08] pt-8">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0D0A24] dark:text-white">
                4. Data protection
              </h2>
              <p className="mt-3 text-base leading-relaxed">
                We take reasonable technical and organisational measures to protect your information.
                Access is limited to team members who need it to serve you.
              </p>
            </div>

            <div className="border-t border-slate-200/80 dark:border-white/[0.08] pt-8">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0D0A24] dark:text-white">
                5. Contact
              </h2>
              <p className="mt-3 text-base leading-relaxed">
                For any privacy questions or requests, contact us at{" "}
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
