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
    <section className="relative pb-24 pt-36">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="font-display text-h2 text-primary">Privacy Policy</h1>
        <p className="mt-3 text-sm text-muted">Last updated: August 2026</p>

        <div className="mt-10 flex flex-col gap-8 text-secondary">
          <div>
            <h2 className="font-display text-xl text-primary">1. Information we collect</h2>
            <p className="mt-3">
              When you submit our consultation or contact forms, we collect the details you provide —
              such as your name, email, phone number, company, the service you&apos;re interested in, and
              your message.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl text-primary">2. Analytics and cookies</h2>
            <p className="mt-3">
              This website uses Google Analytics 4 (measurement ID {siteConfig.gaMeasurementId}) to
              understand which pages people read and how they arrive. Google sets cookies in your
              browser to do this, and records your approximate location, device and browser, the
              pages you view, and the site or search that referred you. IP addresses are not stored
              by Google Analytics 4.
            </p>
            <p className="mt-3">
              We do not use analytics data to identify you personally, and we do not combine it with
              anything you submit through our forms. You can opt out entirely with Google&apos;s{" "}
              <a
                className="text-purple-glow hover:text-primary"
                href="https://tools.google.com/dlpage/gaoptout"
                rel="noopener noreferrer"
                target="_blank"
              >
                browser add-on
              </a>
              , or by blocking cookies in your browser settings — the site works normally either way.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl text-primary">3. How we use your information</h2>
            <p className="mt-3">
              We use your information solely to respond to your enquiry, deliver the services you
              request, and improve our website. We do not sell your personal information.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl text-primary">4. Data protection</h2>
            <p className="mt-3">
              We take reasonable technical and organisational measures to protect your information.
              Access is limited to team members who need it to serve you.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl text-primary">5. Contact</h2>
            <p className="mt-3">
              For any privacy questions or requests, contact us at{" "}
              <a className="text-purple-glow hover:text-primary" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>{" "}
              or {siteConfig.phoneDisplay}, {officesLine}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
