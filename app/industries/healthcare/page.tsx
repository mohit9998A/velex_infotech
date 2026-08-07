import Link from "next/link";
import { ArrowUpRight, Check, ShieldAlert, ShieldCheck } from "lucide-react";

import type { IndustryItem, ServiceItem } from "@/types";
import industriesData from "@/content/industries.json";
import servicesData from "@/content/services.json";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd, serviceSchema } from "@/lib/schema";
import { getServiceIcon } from "@/lib/icons";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { SectionHeader } from "@/components/common/section-header";
import { ConsultButtons } from "@/components/common/consult-buttons";
import { CtaBanner } from "@/components/sections/cta-banner";
import { FaqSection } from "@/components/sections/faq-section";

const industries = industriesData as IndustryItem[];
const services = servicesData as ServiceItem[];
const industry = industries.find((i) => i.slug === "healthcare")!;

export const metadata = pageMetadata({
  path: "/industries/healthcare",
  title: industry.metaTitle,
  description: industry.metaDescription,
});

/**
 * Hand-written, one file — the same discipline as the location pages, and for
 * the same reason (AGENTS.md rule 8). There is deliberately no
 * `app/industries/[slug]/page.tsx`: a template makes adding a twentieth
 * vertical a one-line edit, and that ergonomic is exactly how a site ends up
 * with near-duplicate industry pages for markets it has never worked in.
 *
 * Every compliance sentence below is deliberately specific about what we do and
 * do not hold. AGENTS.md rule 1 forbids claims a buyer can falsify, and a bare
 * "HIPAA compliant" badge is the single most falsifiable claim on a healthcare
 * page — a procurement team asks for the attestation on the first call.
 */

const systems = [
  {
    title: "Patient intake and scheduling",
    body: "Booking, rescheduling and reminders that write to the practice management system rather than sitting in a parallel database. Most intake failures are sync failures, not UI failures.",
  },
  {
    title: "Clinic and diagnostics operations",
    body: "Sample tracking, report generation and turnaround-time dashboards for pathology and imaging labs, where the reporting SLA is the product.",
  },
  {
    title: "Integration with existing clinical systems",
    body: "HL7 v2 and FHIR interfaces to EMR, LIS and RIS systems, including the unglamorous work of reconciling patient identifiers across systems that disagree.",
  },
  {
    title: "Digital health products",
    body: "Patient-facing apps and portals where the regulatory surface, not the feature list, decides the architecture — including audit logging designed in from the first commit.",
  },
];

const safeguards = [
  "Encryption in transit and at rest, with keys held in a managed KMS rather than application config",
  "Role-based access control with least-privilege defaults, reviewed per role rather than per user",
  "Append-only audit logging of every read and write to patient data, retained independently of the application database",
  "Environment separation, with production data never copied into staging or a developer machine",
  "Documented breach-notification and incident-response runbooks handed to you at delivery",
];

const faqs = [
  {
    question: "How much does custom healthcare software development cost?",
    answer:
      "Cost is driven by integration count and regulatory surface, not by screen count. A product that reads from one EMR over FHIR is a fundamentally different build from one that writes to three legacy systems over HL7 v2 and carries a patient-facing app.",
  },
  {
    question: "Is your healthcare software HIPAA compliant?",
    answer:
      "Software cannot be HIPAA compliant on its own — compliance is a property of your organisation and how it operates the system. We build to HIPAA's technical safeguards and will sign a Business Associate Agreement where we handle protected health information.",
  },
  {
    question: "Is Velex Infotech HIPAA or HITRUST certified?",
    answer:
      "No. There is no official HIPAA certification body, so any vendor claiming to be HIPAA certified is describing a paid audit, not a legal status. We hold no HITRUST or SOC 2 attestation today, and we would rather tell you that now than during your procurement review.",
  },
  {
    question: "Can you integrate with our existing EMR?",
    answer:
      "Usually, and the deciding factor is what your EMR exposes. Modern systems offer FHIR APIs; older ones offer HL7 v2 feeds or a database export. We confirm which you have during scoping, because that answer sets the timeline more than anything else.",
  },
  {
    question: "How do Indian data protection rules affect this?",
    answer:
      "India's DPDP Act 2023 governs personal data including health data, and consent and purpose limitation are its operative requirements. For clinics operating only in India this replaces HIPAA as the relevant framework, and the technical safeguards largely overlap.",
  },
  {
    question: "Can AI be used safely with patient data?",
    answer:
      "Only with explicit choices about where inference runs and what is retained. We scope AI features so that protected health information is not sent to a public model endpoint by default, and we keep clinical judgement with a clinician rather than the model.",
  },
];

export default function HealthcarePage() {
  const trail = [
    { name: "Industries", path: "/industries" },
    { name: industry.shortName, path: "/industries/healthcare" },
  ];
  const related = services.filter((s) => industry.relatedServices.includes(s.slug));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            // `path` keeps this node off the /services/software-development
            // @id — one @id per entity (AGENTS.md rule 5).
            serviceSchema({
              slug: "healthcare-software-development",
              path: "/industries/healthcare",
              title: "Custom Healthcare Software Development",
              description: industry.metaDescription,
            }),
            // faqSchema is emitted by <FaqSection> below, from the same array
            // it renders — do not add it here as well.
            breadcrumbSchema(trail),
          ),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-36">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
        <div className="pointer-events-none absolute -top-24 left-1/2 size-[40rem] -translate-x-1/2 glow-blob" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <Breadcrumbs trail={trail} />

          <span className="badge-pill w-fit">
            <ShieldCheck className="size-3.5 text-gold" />
            <span className="font-mono-label text-primary">Healthcare</span>
          </span>

          <h1 className="mt-6 font-display text-h1 text-balance text-primary">
            Custom healthcare software development
          </h1>

          {/* The 40-word liftable answer, first thing after the H1. */}
          <p className="mt-5 max-w-2xl text-pretty text-secondary md:text-lg">
            Custom healthcare software is built for clinics, diagnostics labs and
            digital health products where no off-the-shelf system fits the
            workflow. Velex Infotech builds intake, operations and integration
            systems around your existing EMR — designed for audit from the first
            commit rather than retrofitted before a review.
          </p>

          <div className="mt-9">
            <ConsultButtons presetService="Software Development" />
          </div>
        </div>
      </section>

      {/* What we build */}
      <section className="section-pad relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="What we build"
            title="Systems healthcare businesses actually ask for"
            subtitle="Four categories cover most of the work. Each one lives or dies on how well it talks to the systems already in the building."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {systems.map((item) => (
              <div key={item.title} className="glass-card p-6">
                <h2 className="font-display text-xl text-primary">{item.title}</h2>
                <p className="mt-2 text-secondary">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance posture — the honest version */}
      <section className="relative pb-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="Compliance"
            title="What we hold, and what we don't"
            subtitle="Stated plainly, because a procurement team will ask on the first call and a vague answer costs you the deal, not us."
          />

          <div className="mt-10 glass-gold flex items-start gap-4 rounded-xl p-6">
            <ShieldAlert className="mt-0.5 size-5 shrink-0 text-gold" />
            <div>
              <h3 className="font-display text-lg text-primary">
                Velex Infotech holds no HIPAA, HITRUST or SOC 2 attestation
              </h3>
              <p className="mt-2 text-secondary">
                There is no government body that certifies software as HIPAA
                compliant, so any vendor advertising HIPAA certification is
                describing a paid third-party audit rather than a legal status.
                We have not bought one. What we do instead is build to HIPAA&apos;s
                technical safeguards, sign a Business Associate Agreement where we
                handle protected health information, and hand you the
                documentation an auditor will ask for.
              </p>
            </div>
          </div>

          <h3 className="mt-12 font-display text-xl text-primary">
            Technical safeguards we build in as standard
          </h3>
          <ul className="mt-6 flex flex-col gap-3">
            {safeguards.map((item) => (
              <li key={item} className="flex items-start gap-3 text-secondary">
                <Check className="mt-0.5 size-4 shrink-0 text-success" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Related services */}
      <section className="section-pad relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="Services"
            title="What a healthcare build usually draws on"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((s) => {
              const Icon = getServiceIcon(s.icon);
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group glass-card flex flex-col p-6"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-xl border border-vx-border-bright bg-purple-core/10 text-purple-glow">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg text-primary">{s.title}</h3>
                  <p className="mt-1 text-sm text-secondary">{s.tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Learn more
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <FaqSection faqs={faqs} title="Healthcare software — common questions" />

      <CtaBanner />
    </>
  );
}
