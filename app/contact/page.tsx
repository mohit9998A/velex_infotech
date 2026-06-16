import type { Metadata } from "next";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/lead-form";

export const metadata: Metadata = {
  title: "Contact Velex Infotech | Free AI Consultation | Ludhiana, Punjab",
  description:
    "Get a free consultation with Velex Infotech. Call +91 89689 35766, email velexinfotech@gmail.com, or WhatsApp. Located in Ludhiana, Punjab, India.",
  alternates: { canonical: `${siteConfig.url}/contact` },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteConfig.url}/#business`,
  name: siteConfig.name,
  image: `${siteConfig.url}/og-default.jpg`,
  priceRange: "₹₹₹",
  telephone: siteConfig.phone,
  email: siteConfig.email,
  url: siteConfig.url,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ludhiana",
    addressRegion: "Punjab",
    postalCode: "141001",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 30.9009, longitude: 75.8573 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", ratingCount: "47" },
};

const contactItems = [
  { icon: Phone, label: "Call us", value: siteConfig.phoneDisplay, href: `tel:${siteConfig.phone}` },
  { icon: Mail, label: "Email us", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat instantly", href: siteConfig.whatsapp },
  { icon: MapPin, label: "Visit", value: siteConfig.location, href: undefined },
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <section className="relative overflow-hidden pb-20 pt-36">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
        <div className="pointer-events-none absolute -top-24 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-purple-core/15 blur-[140px]" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-mono-label text-purple-glow">Contact</span>
            <h1 className="mt-4 font-display text-h1 text-balance text-primary">
              Let&apos;s build something
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-secondary md:text-lg">
              Tell us what you&apos;re building and we&apos;ll get back within 24 hours. Prefer to talk now?
              Call or message us on WhatsApp.
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
            {/* Contact details */}
            <div className="flex flex-col gap-4">
              {contactItems.map((c) => {
                const body = (
                  <div className="glass-card flex items-center gap-4 p-5">
                    <span className="inline-flex size-11 items-center justify-center rounded-xl border border-vx-border-bright bg-purple-core/10 text-purple-glow">
                      <c.icon className="size-5" />
                    </span>
                    <span className="flex flex-col">
                      <span className="font-mono-label text-muted">{c.label}</span>
                      <span className="text-primary">{c.value}</span>
                    </span>
                  </div>
                );
                return c.href ? (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="transition-transform hover:-translate-y-0.5"
                  >
                    {body}
                  </a>
                ) : (
                  <div key={c.label}>{body}</div>
                );
              })}
            </div>

            {/* Lead form */}
            <div className="glass-card p-6 sm:p-8">
              <h2 className="font-display text-2xl text-primary">Get your free consultation</h2>
              <p className="mt-1 text-sm text-secondary">
                No spam, ever. We respond within 24 hours.
              </p>
              <div className="mt-6">
                <LeadForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
