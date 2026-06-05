import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Service | Velex Infotech",
  description: "The terms that govern your use of the Velex Infotech website and services.",
  alternates: { canonical: `${siteConfig.url}/terms-of-service` },
  robots: { index: true, follow: false },
};

export default function TermsOfServicePage() {
  return (
    <section className="relative pb-24 pt-36">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="font-display text-h2 text-primary">Terms of Service</h1>
        <p className="mt-3 text-sm text-muted">Last updated: June 2025</p>

        <div className="mt-10 flex flex-col gap-8 text-secondary">
          <div>
            <h2 className="font-display text-xl text-primary">1. Use of this website</h2>
            <p className="mt-3">
              By accessing this website you agree to use it lawfully and not to misuse, disrupt, or
              attempt to gain unauthorised access to any part of it or its systems.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl text-primary">2. Services &amp; quotes</h2>
            <p className="mt-3">
              Information on this site is for general guidance. Pricing, timelines, and scope are
              indicative and confirmed in a written proposal before any engagement begins.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl text-primary">3. Intellectual property</h2>
            <p className="mt-3">
              All content, branding, and design on this website are the property of {siteConfig.name}
              unless otherwise stated, and may not be reused without permission.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl text-primary">4. Contact</h2>
            <p className="mt-3">
              Questions about these terms? Reach us at{" "}
              <a className="text-purple-glow hover:text-primary" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>{" "}
              or {siteConfig.phoneDisplay}, {siteConfig.location}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
