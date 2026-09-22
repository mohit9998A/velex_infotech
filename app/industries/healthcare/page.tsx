import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, ShieldAlert, ShieldCheck } from "lucide-react";

import type { IndustryItem, ServiceItem } from "@/types";
import industriesData from "@/content/industries.json";
import servicesData from "@/content/services.json";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd, serviceSchema } from "@/lib/schema";
import { getServiceIcon } from "@/lib/icons";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
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

      {/* Hero Section (design.md 2.1, 2.2, 3.1, 7.2) */}
      <section className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
        {/* Soft background ambient layers with hardware acceleration (design.md 7.2) */}
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-30 dark:opacity-20" />
        <div className="pointer-events-none absolute -top-32 left-1/2 size-[44rem] -translate-x-1/2 rounded-full bg-purple-500/10 dark:bg-purple-600/15 blur-[120px] [transform:translateZ(0)]" />
        <div className="pointer-events-none absolute top-1/3 right-0 size-[32rem] rounded-full bg-indigo-500/10 dark:bg-indigo-600/15 blur-[120px] [transform:translateZ(0)]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <Breadcrumbs trail={trail} className="mb-6 sm:mb-8" />

          <div className="text-center">
            {/* Pill Badge (design.md 4.2) */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7138FF]/[0.07] dark:bg-[#8B4DFF]/15 border border-[#7138FF]/20 dark:border-[#8B4DFF]/30 text-[#7138FF] dark:text-[#B99CFF] font-sans text-xs font-semibold tracking-wide">
              <ShieldCheck className="size-4 text-[#7138FF] dark:text-[#8B4DFF]" />
              <span>HEALTHCARE &amp; CLINICAL SYSTEMS</span>
            </div>

            {/* Main Headline (design.md 3.1 & 2.1) */}
            <h1 className="mt-4 font-serif text-[clamp(2.35rem,5.2vw,4.25rem)] font-bold tracking-tight text-balance leading-[1.08] text-[#0D0A24] dark:text-white">
              Custom{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5424D6] via-[#7138FF] to-[#8B4DFF] dark:from-[#A87FFF] dark:via-[#B99CFF] dark:to-white">
                healthcare software
              </span>{" "}
              development
            </h1>

            {/* 40-word liftable answer (E-E-A-T) */}
            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-slate-600 dark:text-white/70 font-sans leading-relaxed">
              Custom healthcare software is built for clinics, diagnostics labs and
              digital health products where no off-the-shelf system fits the
              workflow. Velex Infotech builds intake, operations and integration
              systems around your existing EMR — designed for audit from the first
              commit rather than retrofitted before a review.
            </p>

            {/* Consultation & Action Buttons (design.md 4.1) */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <ConsultButtons
                presetService="Software Development"
                primaryLabel="Book Healthcare Scoping"
                primaryIcon={<ArrowRight className="size-4" />}
                primaryClassName="rounded-full bg-gradient-to-r from-[#7138FF] to-[#8B4DFF] text-white shadow-[0_4px_24px_rgba(113,56,255,0.45)] hover:scale-[1.02] px-7 py-3.5 text-sm sm:text-base font-semibold transition-all"
                secondary={
                  <Link
                    href="/services/software-development"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.04] px-6 py-3.5 text-sm sm:text-base font-semibold text-[#0D0A24] dark:text-white backdrop-blur-sm transition-all hover:bg-black/[0.07] dark:hover:bg-white/[0.08]"
                  >
                    Software Engineering
                  </Link>
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Build Section (design.md 4.2 & 4.3) */}
      <section className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            {/* Aesthetic Kicker (design.md 4.2) */}
            <div className="flex items-center justify-center gap-3">
              <span className="h-[2.5px] w-6 sm:w-7 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
              <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#7138FF] dark:text-[#8B4DFF]">
                CORE ARCHITECTURES
              </span>
              <span className="h-[2.5px] w-6 sm:w-7 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
            </div>

            <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0D0A24] dark:text-white">
              Systems healthcare businesses actually ask for
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base sm:text-lg text-slate-600 dark:text-white/70 font-sans">
              Four categories cover most of the work. Each one lives or dies on how well it talks to the systems already in the building.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {systems.map((item, idx) => (
              <div
                key={item.title}
                className="group relative rounded-2xl border border-slate-200/90 dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] p-7 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-400/80 dark:hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#7138FF] dark:text-[#8B4DFF]">
                    0{idx + 1} // DOMAIN SYSTEM
                  </span>
                  <h3 className="mt-3 font-serif text-xl font-bold text-[#0D0A24] dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-white/70 font-sans leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Posture Section (design.md 1, 3.1, 4.3) */}
      <section className="relative pb-20 pt-4">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center">
            {/* Aesthetic Kicker (design.md 4.2) */}
            <div className="flex items-center justify-center gap-3">
              <span className="h-[2.5px] w-6 sm:w-7 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
              <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#7138FF] dark:text-[#8B4DFF]">
                COMPLIANCE POSTURE
              </span>
              <span className="h-[2.5px] w-6 sm:w-7 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
            </div>

            <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0D0A24] dark:text-white">
              What we hold, and what we don&apos;t
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base sm:text-lg text-slate-600 dark:text-white/70 font-sans">
              Stated plainly, because a procurement team will ask on the first call and a vague answer costs you the deal, not us.
            </p>
          </div>

          {/* Compliance Callout Card */}
          <div className="mt-10 relative overflow-hidden rounded-2xl border border-amber-500/30 bg-amber-500/[0.04] dark:bg-amber-500/[0.08] p-7 sm:p-8 backdrop-blur-md">
            <div className="flex items-start gap-4">
              <ShieldAlert className="mt-1 size-6 shrink-0 text-amber-500" />
              <div>
                <h3 className="font-serif text-xl font-bold text-[#0D0A24] dark:text-white">
                  Velex Infotech holds no HIPAA, HITRUST or SOC 2 attestation
                </h3>
                <p className="mt-2.5 text-sm sm:text-base text-slate-600 dark:text-white/80 font-sans leading-relaxed">
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
          </div>

          {/* Technical Safeguards Grid */}
          <h3 className="mt-12 font-serif text-2xl font-bold text-[#0D0A24] dark:text-white">
            Technical safeguards we build in as standard
          </h3>
          <ul className="mt-6 flex flex-col gap-3">
            {safeguards.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3.5 rounded-xl border border-slate-200/80 dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.02] p-4.5 text-sm sm:text-base text-slate-700 dark:text-white/80 font-sans shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500 mt-0.5">
                  <Check className="size-3.5" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Related Services Section (design.md 4.3) */}
      <section className="relative pb-24 pt-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            {/* Aesthetic Kicker (design.md 4.2) */}
            <div className="flex items-center justify-center gap-3">
              <span className="h-[2.5px] w-6 sm:w-7 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
              <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#7138FF] dark:text-[#8B4DFF]">
                INTEGRATED CAPABILITIES
              </span>
              <span className="h-[2.5px] w-6 sm:w-7 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
            </div>

            <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0D0A24] dark:text-white">
              What a healthcare build usually draws on
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base sm:text-lg text-slate-600 dark:text-white/70 font-sans">
              Modular engineering disciplines deployed in coordinated architectural sprints.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((s) => {
              const Icon = getServiceIcon(s.icon);
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group relative rounded-2xl border border-slate-200/90 dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-400/80 dark:hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-flex size-11 items-center justify-center rounded-xl border border-[#7138FF]/20 dark:border-[#8B4DFF]/30 bg-[#7138FF]/10 dark:bg-[#8B4DFF]/15 text-[#7138FF] dark:text-[#8B4DFF] group-hover:scale-105 transition-transform">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-4 font-serif text-lg font-bold text-[#0D0A24] dark:text-white">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-slate-600 dark:text-white/70 font-sans line-clamp-2">
                      {s.tagline}
                    </p>
                  </div>

                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#7138FF] dark:text-[#B99CFF] group-hover:text-[#5424D6] dark:group-hover:text-white transition-colors">
                    Learn more
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FaqSection */}
      <FaqSection faqs={faqs} title="Healthcare software — common questions" />

      {/* Closing CTA */}
      <CtaBanner />
    </>
  );
}
