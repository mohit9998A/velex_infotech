import Link from "next/link";
import { ArrowUpRight, Clock, Sparkles } from "lucide-react";

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
    author: { "@type": "Person", name: p.author },
  })),
};

export default function BlogPage() {
  return (
    <section className="relative overflow-hidden pb-24 pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(blogListSchema, breadcrumbSchema([{ name: "Blog", path: "/blog" }])),
        }}
      />

      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="pointer-events-none absolute -top-24 left-1/2 size-[40rem] -translate-x-1/2 glow-blob" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <Breadcrumbs trail={[{ name: "Blog", path: "/blog" }]} />

        <div className="text-center">
          <span className="badge-pill mx-auto w-fit">
            <Sparkles className="size-3.5 text-gold" />
            <span className="font-mono-label text-primary">Insights</span>
          </span>
          <h1 className="mt-6 font-display text-h1 text-balance text-primary">
            The intelligence brief
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-secondary md:text-lg">
            Practical writing on AI automation, agentic systems and building intelligent
            businesses — including the parts vendors leave out.
          </p>
        </div>

        <ul className="mt-14 flex flex-col gap-4">
          {blogPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group glass-card flex flex-col p-6 transition-transform hover:-translate-y-0.5"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono-label text-muted">
                  <time dateTime={post.publishedAt}>
                    {dateFormatter.format(new Date(post.publishedAt))}
                  </time>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-3.5" aria-hidden="true" />
                    {post.readingMinutes} min read
                  </span>
                </div>
                <h2 className="mt-3 font-display text-xl text-balance text-primary">
                  {post.title}
                </h2>
                <p className="mt-2 text-pretty text-secondary">{post.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Read the guide
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-14 text-center">
          <p className="text-secondary">
            Have a process you&apos;re weighing up? We&apos;ll tell you honestly whether
            it&apos;s worth automating.
          </p>
          <div className="mt-6 flex justify-center">
            <ConsultButtons primaryLabel="Talk to Us" />
          </div>
        </div>
      </div>
    </section>
  );
}
