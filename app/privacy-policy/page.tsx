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
        <p className="mt-3 text-sm text-muted">Last updated: June 2025</p>

        <div className="mt-10 flex flex-col gap-8 text-secondary">
          <div>
            <h2 className="font-display text-xl text-primary">1. Information we collect</h2>
            <p className="mt-3">
              When you submit our consultation or contact forms, we collect the details you provide —
              such as your name, email, phone number, company, the service you&apos;re interested in, and
              your message. We may also collect basic analytics about how you use this website.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl text-primary">2. How we use your information</h2>
            <p className="mt-3">
              We use your information solely to respond to your enquiry, deliver the services you
              request, and improve our website. We do not sell your personal information.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl text-primary">3. Data protection</h2>
            <p className="mt-3">
              We take reasonable technical and organisational measures to protect your information.
              Access is limited to team members who need it to serve you.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl text-primary">4. Contact</h2>
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
