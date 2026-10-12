import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Clock, Sparkles } from "lucide-react";

import type { ServiceItem } from "@/types";
import servicesData from "@/content/services.json";
import { getPost, postLoaders } from "@/content/blog";
import { getBlogPostBySlug, getPublishedBlogs } from "@/lib/blogs-db";
import { pageMetadata } from "@/lib/seo";
import { blogPostingSchema, breadcrumbSchema, jsonLd } from "@/lib/schema";
import { getServiceIcon } from "@/lib/icons";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { CtaBanner } from "@/components/sections/cta-banner";

const services = servicesData as ServiceItem[];

export const dynamicParams = true;

export async function generateStaticParams() {
  const dbPosts = await getPublishedBlogs();
  return dbPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getBlogPostBySlug(slug)) || getPost(slug);
  if (!post) return {};

  return pageMetadata({
    path: `/blog/${post.slug}`,
    title: post.title,
    description: post.description,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
  });
}

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Query MongoDB first, fallback to static post definition
  const post = (await getBlogPostBySlug(slug)) || getPost(slug);
  if (!post || post.status === "hidden") notFound();

  const loader = postLoaders[post.slug];
  let PostBody: React.ComponentType | null = null;
  if (loader) {
    const loaded = await loader();
    PostBody = loaded.default;
  }

  const relatedServicesList = post.relatedServices || [];
  const related = services.filter((s) => relatedServicesList.includes(s.slug));
  const allBlogs = await getPublishedBlogs();
  const more = allBlogs.filter((p) => p.slug !== post.slug).slice(0, 3);

  const staticPostFormat = getPost(post.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            blogPostingSchema(staticPostFormat || {
              slug: post.slug,
              title: post.title,
              description: post.description,
              publishedAt: post.publishedAt,
              author: post.author,
              readingMinutes: post.readingMinutes,
              targetKeyword: post.targetKeyword || "",
              relatedServices: post.relatedServices || [],
            }),
            breadcrumbSchema([
              { name: "Blog", path: "/blog" },
              { name: post.title, path: `/blog/${post.slug}` },
            ])
          ),
        }}
      />

      <article className="relative overflow-hidden pb-20 pt-28 lg:pt-36">
        {/* Soft background ambient layers */}
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-30 dark:opacity-20" />
        <div className="pointer-events-none absolute -top-32 left-1/2 size-[44rem] -translate-x-1/2 rounded-full bg-purple-500/10 dark:bg-purple-600/15 blur-[120px] [transform:translateZ(0)]" />
        <div className="pointer-events-none absolute top-1/3 right-0 size-[32rem] rounded-full bg-indigo-500/10 dark:bg-indigo-600/15 blur-[120px] [transform:translateZ(0)]" />

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <Breadcrumbs
            trail={[
              { name: "Blog", path: "/blog" },
              { name: post.title, path: `/blog/${post.slug}` },
            ]}
            className="mb-6"
          />

          <header>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7138FF]/[0.07] dark:bg-[#8B4DFF]/15 border border-[#7138FF]/20 dark:border-[#8B4DFF]/30 text-[#7138FF] dark:text-[#B99CFF] font-sans text-xs font-semibold tracking-wide">
              <Sparkles className="size-3.5 text-[#7138FF] dark:text-[#8B4DFF]" />
              <span>THE INTELLIGENCE BRIEF</span>
            </div>

            <h1 className="mt-4 font-serif text-[clamp(2.2rem,4.8vw,3.8rem)] font-bold tracking-tight text-balance leading-[1.12] text-[#0D0A24] dark:text-white">
              {post.title}
            </h1>

            <p className="mt-5 text-pretty text-lg sm:text-xl text-slate-600 dark:text-white/70 font-sans leading-relaxed">
              {post.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-slate-200/80 dark:border-white/[0.08] py-4 font-mono text-xs font-semibold text-slate-500 dark:text-white/60 uppercase tracking-wider">
              <span>
                By{" "}
                <Link
                  href="/about#mohit-dutta"
                  className="text-[#7138FF] dark:text-[#B99CFF] hover:underline"
                >
                  {post.author}
                </Link>
              </span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.publishedAt}>
                {dateFormatter.format(new Date(post.publishedAt))}
              </time>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5" aria-hidden="true" />
                {post.readingMinutes} min read
              </span>
            </div>
          </header>

          {/* Post Content Body */}
          <div className="mt-12 text-slate-700 dark:text-white/80">
            {PostBody ? (
              <PostBody />
            ) : (
              <div className="prose dark:prose-invert max-w-none font-sans leading-relaxed whitespace-pre-wrap">
                {post.content}
              </div>
            )}
          </div>

          {/* Related Services */}
          {related.length > 0 && (
            <aside className="mt-16 border-t border-slate-200/80 dark:border-white/[0.08] pt-12">
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-6 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7138FF] dark:text-[#8B4DFF]">
                  RELATED SERVICES
                </span>
              </div>
              <h2 className="mt-3 font-serif text-2xl font-bold tracking-tight text-[#0D0A24] dark:text-white">
                Capabilities referenced in this brief
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {related.map((s) => {
                  const Icon = getServiceIcon(s.icon);
                  return (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="group relative rounded-2xl border border-slate-200/90 dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-400/80 dark:hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 flex flex-col justify-between"
                    >
                      <div>
                        <span className="inline-flex size-10 items-center justify-center rounded-xl border border-[#7138FF]/20 dark:border-[#8B4DFF]/30 bg-[#7138FF]/10 dark:bg-[#8B4DFF]/15 text-[#7138FF] dark:text-[#8B4DFF] group-hover:scale-105 transition-transform">
                          <Icon className="size-5" />
                        </span>
                        <h3 className="mt-3 font-serif text-lg font-bold text-[#0D0A24] dark:text-white">
                          {s.title}
                        </h3>
                        <p className="mt-1 text-sm text-slate-600 dark:text-white/70 font-sans line-clamp-2">
                          {s.tagline}
                        </p>
                      </div>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#7138FF] dark:text-[#B99CFF] group-hover:text-[#5424D6] dark:group-hover:text-white transition-colors">
                        Learn more
                        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </aside>
          )}

          {/* More Articles */}
          {more.length > 0 && (
            <aside className="mt-16 border-t border-slate-200/80 dark:border-white/[0.08] pt-12">
              <h2 className="font-serif text-2xl font-bold text-[#0D0A24] dark:text-white">
                More from The Intelligence Brief
              </h2>
              <ul className="mt-6 space-y-4">
                {more.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="group flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-xl border border-slate-200/90 dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.02] p-4 transition-all hover:border-purple-400/80 hover:bg-white dark:hover:bg-white/[0.05]"
                    >
                      <div>
                        <h3 className="font-serif text-base font-bold text-[#0D0A24] dark:text-white group-hover:text-[#7138FF] dark:group-hover:text-[#B99CFF] transition-colors">
                          {p.title}
                        </h3>
                        <p className="mt-1 text-xs text-slate-500 dark:text-white/60 line-clamp-1">
                          {p.description}
                        </p>
                      </div>
                      <span className="mt-2 sm:mt-0 shrink-0 text-xs font-semibold text-[#7138FF] dark:text-[#B99CFF] flex items-center gap-1">
                        Read <ArrowUpRight className="size-3.5" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>

        <div className="mt-20">
          <CtaBanner />
        </div>
      </article>
    </>
  );
}
