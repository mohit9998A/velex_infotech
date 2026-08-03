import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Clock } from "lucide-react";

import type { ServiceItem } from "@/types";
import servicesData from "@/content/services.json";
import { blogPosts, getPost, postLoaders } from "@/content/blog";
import { pageMetadata } from "@/lib/seo";
import { blogPostingSchema, breadcrumbSchema, jsonLd } from "@/lib/schema";
import { getServiceIcon } from "@/lib/icons";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { CtaBanner } from "@/components/sections/cta-banner";

const services = servicesData as ServiceItem[];

// Any slug not in the registry 404s rather than being rendered on demand.
export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
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
  const post = getPost(slug);
  if (!post) notFound();

  const loader = postLoaders[post.slug];
  if (!loader) notFound();
  const { default: PostBody } = await loader();

  const related = services.filter((s) => post.relatedServices.includes(s.slug));
  const more = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            blogPostingSchema(post),
            breadcrumbSchema([
              { name: "Blog", path: "/blog" },
              { name: post.title, path: `/blog/${post.slug}` },
            ]),
          ),
        }}
      />

      <article className="relative overflow-hidden pb-20 pt-36">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
        <div className="pointer-events-none absolute -top-24 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-purple-core/15 blur-[140px]" />

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <Breadcrumbs
            trail={[
              { name: "Blog", path: "/blog" },
              { name: post.title, path: `/blog/${post.slug}` },
            ]}
          />

          <header>
            <h1 className="font-display text-h1 text-balance text-primary">
              {post.title}
            </h1>
            <p className="mt-5 text-pretty text-lg text-secondary">
              {post.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono-label text-muted">
              <span>
                By{" "}
                <Link href="/about" className="text-secondary hover:text-primary">
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

          <div className="mt-12">
            <PostBody />
          </div>

          {related.length > 0 && (
            <aside className="mt-16 border-t border-vx-border pt-10">
              <h2 className="font-display text-xl text-primary">Related services</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {related.map((s) => {
                  const Icon = getServiceIcon(s.icon);
                  return (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="group glass-card flex flex-col p-5"
                    >
                      <span className="inline-flex size-10 items-center justify-center rounded-xl border border-vx-border-bright bg-purple-core/10 text-purple-glow">
                        <Icon className="size-5" />
                      </span>
                      <h3 className="mt-3 font-display text-lg text-primary">{s.title}</h3>
                      <p className="mt-1 text-sm text-secondary">{s.tagline}</p>
                      <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                        Learn more
                        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </aside>
          )}

          {more.length > 0 && (
            <aside className="mt-12">
              <h2 className="font-display text-xl text-primary">Keep reading</h2>
              <ul className="mt-5 flex flex-col gap-3">
                {more.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="glass-card flex items-center justify-between gap-4 p-5 transition-transform hover:-translate-y-0.5"
                    >
                      <span className="text-primary">{p.title}</span>
                      <ArrowUpRight className="size-4 shrink-0 text-purple-glow" />
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </article>

      <CtaBanner />
    </>
  );
}
