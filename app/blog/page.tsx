import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";

import { blogPosts } from "@/content/blog";
import { pageMetadata, absoluteUrl } from "@/lib/seo";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { ConsultButtons } from "@/components/common/consult-buttons";

export const metadata = pageMetadata({
  path: "/blog",
  title: "Blog & Insights",
  description:
    "Practical writing on AI automation, agentic AI, voice agents and WhatsApp chatbots — what works, what it costs, and when not to bother.",
});

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

const blogListSchema = {
  "@type": "Blog",
  "@id": absoluteUrl("/blog#blog"),
  name: "Velex Infotech — The Intelligence Brief",
  url: absoluteUrl("/blog"),
  blogPost: blogPosts.map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    url: absoluteUrl(`/blog/${p.slug}`),
    datePublished: p.publishedAt,
    author: { "@type": "Organization", name: "Velex Infotech" },
  })),
};

export default function BlogPage() {
  return (
    <section className="relative overflow-hidden pb-24 pt-28 lg:pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(blogListSchema, breadcrumbSchema([{ name: "Blog", path: "/blog" }])),
        }}
      />

      {/* Ambient background lighting with hardware acceleration (design.md 7.2) */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30 dark:opacity-20" />
      <div className="pointer-events-none absolute -top-32 left-1/2 size-[44rem] -translate-x-1/2 rounded-full bg-purple-500/10 dark:bg-purple-600/15 blur-[120px] [transform:translateZ(0)]" />
      <div className="pointer-events-none absolute top-1/3 right-0 size-[32rem] rounded-full bg-indigo-500/10 dark:bg-indigo-600/15 blur-[120px] [transform:translateZ(0)]" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <Breadcrumbs trail={[{ name: "Blog", path: "/blog" }]} className="mb-6 sm:mb-8" />

        <div className="text-center">
          {/* Aesthetic Kicker (design.md 4.2) */}
          <div className="flex items-center justify-center gap-3">
            <span className="h-[2.5px] w-6 sm:w-7 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
            <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#7138FF] dark:text-[#8B4DFF]">
              THE INTELLIGENCE BRIEF
            </span>
            <span className="h-[2.5px] w-6 sm:w-7 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
          </div>

          {/* Main Headline (design.md 3.1 & 2.1) */}
          <h1 className="mt-4 font-serif text-[clamp(2.35rem,5.2vw,4.25rem)] font-bold tracking-tight text-balance leading-[1.08] text-[#0D0A24] dark:text-white">
            Practical insights on{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5424D6] via-[#7138FF] to-[#8B4DFF] dark:from-[#A87FFF] dark:via-[#B99CFF] dark:to-white">
              applied AI systems
            </span>
          </h1>

          {/* Subtitle / Lede (design.md 3.1) */}
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-slate-600 dark:text-white/70 font-sans leading-relaxed">
            Practical writing on AI automation, agentic workflows and building production-grade
            software — including the architectural trade-offs vendors leave out.
          </p>
        </div>

        {/* Article Cards Grid (design.md 4.3) */}
        <ul className="mt-14 flex flex-col gap-5">
          {blogPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group relative rounded-2xl border border-slate-200/90 dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] p-7 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-400/80 dark:hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 flex flex-col"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs font-semibold text-[#7138FF] dark:text-[#8B4DFF] uppercase tracking-wider">
                  <time dateTime={post.publishedAt}>
                    {dateFormatter.format(new Date(post.publishedAt))}
                  </time>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-3.5" aria-hidden="true" />
                    {post.readingMinutes} min read
                  </span>
                </div>

                <h2 className="mt-3 font-serif text-xl sm:text-2xl font-bold text-[#0D0A24] dark:text-white group-hover:text-[#7138FF] dark:group-hover:text-[#B99CFF] transition-colors text-balance">
                  {post.title}
                </h2>

                <p className="mt-2.5 text-base text-slate-600 dark:text-white/70 font-sans leading-relaxed text-pretty">
                  {post.description}
                </p>

                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#7138FF] dark:text-[#B99CFF] group-hover:text-[#5424D6] dark:group-hover:text-white transition-colors">
                  Read the guide
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Bottom Consultation Box (design.md 4.3 & 4.1) */}
        <div className="mt-16 rounded-3xl border border-slate-200/90 dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] p-8 sm:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md text-center">
          <h3 className="font-serif text-2xl font-bold text-[#0D0A24] dark:text-white">
            Have an automation process you&apos;re weighing up?
          </h3>
          <p className="mt-2.5 text-base text-slate-600 dark:text-white/70 font-sans max-w-xl mx-auto">
            We&apos;ll tell you honestly whether it&apos;s worth automating, what architecture fits, and what it should realistically cost.
          </p>
          <div className="mt-7 flex justify-center">
            <ConsultButtons
              primaryLabel="Book a Discovery Call"
              primaryIcon={<ArrowRight className="size-4" />}
              primaryClassName="rounded-full bg-gradient-to-r from-[#7138FF] to-[#8B4DFF] text-white shadow-[0_4px_24px_rgba(113,56,255,0.45)] hover:scale-[1.02] px-7 py-3.5 text-sm sm:text-base font-semibold transition-all"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
