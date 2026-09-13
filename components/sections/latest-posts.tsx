"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, BookOpen, Clock } from "lucide-react";

import { blogPosts } from "@/content/blog";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
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
    <section className="defer-paint relative py-16 sm:py-24 bg-white dark:bg-[#04040A] text-slate-900 dark:text-white transition-colors duration-500 overflow-hidden scroll-mt-24">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[48rem] h-[28rem] bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-pink-600/10 blur-3xl rounded-full opacity-60 dark:opacity-30"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="relative text-center max-w-3xl mx-auto pb-10 sm:pb-14">
          {/* Eyebrow badge */}
          <motion.div
            className="inline-flex items-center justify-center gap-2 mb-3.5 sm:mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
          </motion.div>

          {/* Headline */}
          <motion.h2
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-tight text-slate-900 dark:text-white"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
          >
            From our{" "}
            <span className="italic text-[#7138FF] dark:text-[#8B4DFF]">
              engineering journal
            </span>
          </motion.h2>

          {/* Subheading */}
          <motion.p
            className="font-sans text-sm sm:text-base md:text-lg leading-relaxed mt-3 sm:mt-4 max-w-2xl mx-auto text-slate-600 dark:text-white/60"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            Practical guides on AI agents, custom software, and what builds actually cost — including the trade-offs vendors leave out.
          </motion.p>
        </div>

        {/* Staggered Post Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post, idx) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group relative flex flex-1 flex-col justify-between rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] backdrop-blur-md p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 hover:border-purple-400/80 dark:hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1.5"
              >
                <div>
                  {/* Top Meta Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-slate-500 dark:text-white/50 mb-4">
                    <time dateTime={post.publishedAt} className="font-semibold text-purple-600 dark:text-purple-400">
                      {dateFormatter.format(new Date(post.publishedAt))}
                    </time>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-white/60 font-semibold">
                      <Clock className="size-3" aria-hidden="true" />
                      {post.readingMinutes} min read
                    </span>
                  </div>

                  {/* Post Title */}
                  <h3 className="font-serif text-xl sm:text-2xl font-medium leading-snug tracking-tight text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors duration-300 mb-3">
                    {post.title}
                  </h3>

                  {/* Description Excerpt */}
                  <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-white/70 leading-relaxed line-clamp-3">
                    {post.description}
                  </p>
                </div>

                {/* Footer Meta & Read Link */}
                <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between font-mono text-xs text-slate-500 dark:text-white/50">
                  <span className="font-sans font-medium text-slate-500 dark:text-white/50">
                    By {post.author}
                  </span>
                  <span className="inline-flex items-center gap-1 font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                    <span>Read guide</span>
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Explore All CTA Button */}
        <motion.div
          className="mt-12 sm:mt-14 text-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-sans text-sm font-semibold transition-all duration-300 bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 hover:scale-[1.03] active:scale-[0.98] cursor-pointer group"
          >
            <span>Read every intelligence guide</span>
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
