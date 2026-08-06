import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";

import { blogPosts } from "@/content/blog";
import { SectionHeader } from "@/components/common/section-header";

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

/**
 * Three most recent posts, on the homepage.
 *
 * The blog previously had zero inbound links from `/` — it was reachable only
 * through the nav dropdown. For a site where almost nothing is indexed, a link
 * from the strongest page on the domain is the most useful internal signal a
 * new post can receive.
 */
export function LatestPostsSection() {
  const posts = blogPosts.slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="defer-paint section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Writing"
          title="From the intelligence brief"
          subtitle="Practical guides on AI agents, automation and what things actually cost — including the parts vendors leave out."
        />

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug} className="flex">
              <Link
                href={`/blog/${post.slug}`}
                className="group glass-card flex flex-1 flex-col p-6 transition-transform hover:-translate-y-0.5"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono-label text-muted">
                  <time dateTime={post.publishedAt}>
                    {dateFormatter.format(new Date(post.publishedAt))}
                  </time>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-3.5" aria-hidden="true" />
                    {post.readingMinutes} min
                  </span>
                </div>
                <h3 className="mt-3 font-display text-lg text-balance text-primary">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-pretty text-sm text-secondary">
                  {post.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Read the guide
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-medium text-purple-glow transition-colors hover:text-primary"
          >
            Read every guide
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
