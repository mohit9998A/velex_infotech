"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Eye,
  EyeOff,
  Edit3,
  Trash2,
  LogOut,
  ExternalLink,
  Database,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  RefreshCw,
} from "lucide-react";
import type { MongoBlogPost } from "@/types/blog";

interface AdminDashboardProps {
  onLogout: () => void;
  adminEmail?: string;
}

export function AdminDashboard({ onLogout, adminEmail }: AdminDashboardProps) {
  const [posts, setPosts] = useState<MongoBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "hidden">("all");
  const [seeding, setSeeding] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/blogs");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load posts");
      setPosts(data.posts || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error loading blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleToggleHide = async (post: MongoBlogPost) => {
    const newStatus = post.status === "published" ? "hidden" : "published";
    const targetId = post._id || post.slug;

    // Optimistic UI update
    setPosts((prev) =>
      prev.map((p) => (p.slug === post.slug ? { ...p, status: newStatus } : p))
    );

    try {
      const res = await fetch(`/api/admin/blogs/${targetId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        // Revert on failure
        fetchPosts();
        throw new Error("Failed to toggle status");
      }

      showToast(`Post "${post.title}" is now ${newStatus}`);
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Error toggling status");
    }
  };

  const handleDelete = async (post: MongoBlogPost) => {
    if (!confirm(`Are you sure you want to delete "${post.title}"? This cannot be undone.`)) {
      return;
    }

    const targetId = post._id || post.slug;
    setDeletingId(targetId);

    try {
      const res = await fetch(`/api/admin/blogs/${targetId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete post");
      }

      setPosts((prev) => prev.filter((p) => p.slug !== post.slug));
      showToast("Post deleted successfully");
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Error deleting post");
    } finally {
      setDeletingId(null);
    }
  };

  const handleSeed = async () => {
    setSeeding(true);
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to seed database");
      showToast(data.message || "Database seeded successfully!");
      fetchPosts();
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Seeding failed");
    } finally {
      setSeeding(false);
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.slug.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPosts = posts.length;
  const publishedCount = posts.filter((p) => p.status === "published").length;
  const hiddenCount = posts.filter((p) => p.status === "hidden").length;

  return (
    <div className="mx-auto max-w-7xl px-3.5 sm:px-6 pt-24 sm:pt-32 lg:pt-40 pb-16">
      {/* Toast alert notification */}
      {toastMessage && (
        <div className="fixed top-4 inset-x-4 sm:inset-x-auto sm:right-6 sm:top-6 sm:max-w-md z-50 flex items-center gap-2.5 rounded-xl border border-purple-500/30 bg-[#0D0A24] p-3.5 sm:p-4 text-xs sm:text-sm font-medium text-white shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="size-4 sm:size-5 text-purple-400 shrink-0" />
          <span className="truncate">{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-200 dark:border-white/10 pb-5 sm:pb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#7138FF] dark:text-[#8B4DFF]">
              ADMIN DASHBOARD
            </span>
            {adminEmail && (
              <span className="max-w-[200px] sm:max-w-xs truncate rounded-full bg-purple-500/10 dark:bg-purple-500/20 px-2.5 py-0.5 font-mono text-[10px] sm:text-[11px] font-medium text-purple-600 dark:text-purple-300">
                {adminEmail}
              </span>
            )}
          </div>
          <h1 className="mt-1 font-serif text-2xl sm:text-3xl font-bold text-[#0D0A24] dark:text-white">
            Blog Content Manager
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Link
            href="/blog"
            target="_blank"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-white/80 hover:bg-slate-50 dark:hover:bg-white/10 transition"
          >
            <ExternalLink className="size-3.5 shrink-0" />
            <span className="whitespace-nowrap">View Live Blog</span>
          </Link>

          <button
            onClick={handleSeed}
            disabled={seeding}
            title="Import existing static MDX blog posts into MongoDB"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 rounded-xl border border-purple-500/30 bg-purple-500/10 px-3.5 py-2 text-xs font-semibold text-purple-600 dark:text-purple-300 hover:bg-purple-500/20 disabled:opacity-50 transition"
          >
            <Database className="size-3.5 shrink-0" />
            <span className="whitespace-nowrap">{seeding ? "Importing..." : "Seed Static"}</span>
          </button>

          <button
            onClick={onLogout}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-red-500/20 bg-red-500/10 px-3.5 py-2 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-500/20 transition"
          >
            <LogOut className="size-3.5 shrink-0" />
            <span className="whitespace-nowrap">Logout</span>
          </button>
        </div>
      </div>

      {/* Metrics Widgets */}
      <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="rounded-2xl border border-slate-200/90 dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] p-4 sm:p-5 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-white/60">Total Posts</span>
            <FileText className="size-4 text-purple-500" />
          </div>
          <div className="mt-1.5 sm:mt-2 font-serif text-2xl sm:text-3xl font-bold text-[#0D0A24] dark:text-white">
            {totalPosts}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/90 dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] p-4 sm:p-5 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-white/60">Published & Visible</span>
            <Eye className="size-4 text-emerald-500" />
          </div>
          <div className="mt-1.5 sm:mt-2 font-serif text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            {publishedCount}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/90 dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] p-4 sm:p-5 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-white/60">Hidden / Drafts</span>
            <EyeOff className="size-4 text-amber-500" />
          </div>
          <div className="mt-1.5 sm:mt-2 font-serif text-2xl sm:text-3xl font-bold text-amber-600 dark:text-amber-400">
            {hiddenCount}
          </div>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="mt-6 sm:mt-8 flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
          {/* Search */}
          <div className="relative w-full sm:w-auto sm:min-w-[260px] flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 dark:text-white/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search posts..."
              className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-white/[0.04] py-2.5 pl-10 pr-4 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 focus:border-purple-500 focus:outline-none"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center overflow-x-auto rounded-xl border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/[0.04] p-1">
            <button
              onClick={() => setStatusFilter("all")}
              className={`flex-1 sm:flex-initial whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                statusFilter === "all"
                  ? "bg-white dark:bg-purple-600 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              All ({totalPosts})
            </button>
            <button
              onClick={() => setStatusFilter("published")}
              className={`flex-1 sm:flex-initial whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                statusFilter === "published"
                  ? "bg-white dark:bg-purple-600 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Published ({publishedCount})
            </button>
            <button
              onClick={() => setStatusFilter("hidden")}
              className={`flex-1 sm:flex-initial whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                statusFilter === "hidden"
                  ? "bg-white dark:bg-purple-600 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Hidden ({hiddenCount})
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 justify-between sm:justify-start">
          <button
            onClick={fetchPosts}
            title="Refresh List"
            className="rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-white/[0.04] p-2.5 text-slate-600 dark:text-white/70 hover:bg-slate-50 dark:hover:bg-white/10 transition"
          >
            <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          <Link
            href="/admin/blogs/new"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7138FF] to-[#8B4DFF] px-4 sm:px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-purple-500/25 hover:brightness-110 active:scale-[0.99] transition touch-manipulation"
          >
            <Plus className="size-4 shrink-0" />
            <span className="whitespace-nowrap">New Blog Post</span>
          </Link>
        </div>
      </div>

      {/* Posts Content */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200/90 dark:border-white/[0.08] bg-white/80 dark:bg-[#0D0A24]/60 backdrop-blur-md shadow-xl">
        {loading ? (
          <div className="py-20 text-center text-sm text-slate-500 dark:text-white/50">
            <RefreshCw className="mx-auto size-6 animate-spin text-purple-500 mb-2" />
            Loading blog posts from MongoDB...
          </div>
        ) : error ? (
          <div className="py-16 text-center text-sm text-red-500 flex flex-col items-center gap-2 px-4">
            <AlertCircle className="size-8 text-red-500/80" />
            <span className="break-words">{error}</span>
            <button
              onClick={fetchPosts}
              className="mt-2 rounded-lg bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-500 hover:bg-red-500/20"
            >
              Try Again
            </button>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="py-20 text-center text-sm text-slate-500 dark:text-white/50 px-4">
            No blog posts found matching your criteria.
          </div>
        ) : (
          <>
            {/* Desktop / Tablet Table View (md+) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] font-mono uppercase tracking-wider text-slate-500 dark:text-white/50">
                  <tr>
                    <th className="px-6 py-4">Title & Slug</th>
                    <th className="px-6 py-4">Author</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date & Read Time</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-white/5 font-sans">
                  {filteredPosts.map((post) => (
                    <tr
                      key={post._id || post.slug}
                      className="hover:bg-slate-50/80 dark:hover:bg-white/[0.02] transition"
                    >
                      <td className="px-6 py-4 max-w-md">
                        <div className="font-serif font-bold text-slate-900 dark:text-white text-sm line-clamp-1">
                          {post.title}
                        </div>
                        <div className="font-mono text-[11px] text-slate-500 dark:text-white/40 truncate">
                          /blog/{post.slug}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-slate-700 dark:text-white/80 font-medium">
                        {post.author}
                      </td>

                      <td className="px-6 py-4">
                        {post.status === "published" ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                            <EyeOff className="size-3" />
                            Hidden
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-slate-500 dark:text-white/60">
                        <div>{post.publishedAt}</div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400 dark:text-white/40">
                          <Clock className="size-3" />
                          {post.readingMinutes} min read
                        </div>
                      </td>

                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View link */}
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            title="View Post"
                            className="rounded-lg p-2 text-slate-600 dark:text-white/60 hover:bg-slate-100 dark:hover:bg-white/10 transition"
                          >
                            <ExternalLink className="size-4" />
                          </Link>

                          {/* Toggle Hide/Show */}
                          <button
                            onClick={() => handleToggleHide(post)}
                            title={post.status === "published" ? "Hide Post" : "Publish Post"}
                            className={`rounded-lg p-2 transition ${
                              post.status === "published"
                                ? "text-slate-600 dark:text-white/60 hover:bg-amber-500/10 hover:text-amber-600"
                                : "text-amber-600 dark:text-amber-400 hover:bg-emerald-500/10 hover:text-emerald-500"
                            }`}
                          >
                            {post.status === "published" ? (
                              <EyeOff className="size-4" />
                            ) : (
                              <Eye className="size-4" />
                            )}
                          </button>

                          {/* Edit */}
                          <Link
                            href={`/admin/blogs/${post.slug}/edit`}
                            title="Edit Post"
                            className="rounded-lg p-2 text-slate-600 dark:text-white/60 hover:bg-purple-500/10 hover:text-purple-500 transition"
                          >
                            <Edit3 className="size-4" />
                          </Link>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(post)}
                            disabled={deletingId === (post._id || post.slug)}
                            title="Delete Post"
                            className="rounded-lg p-2 text-slate-600 dark:text-white/60 hover:bg-red-500/10 hover:text-red-500 disabled:opacity-30 transition"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Touch-Friendly Card View (< md) */}
            <div className="md:hidden divide-y divide-slate-200 dark:divide-white/5">
              {filteredPosts.map((post) => (
                <div
                  key={post._id || post.slug}
                  className="p-4 sm:p-5 hover:bg-slate-50/60 dark:hover:bg-white/[0.02] transition"
                >
                  {/* Top Bar: Status + Date */}
                  <div className="flex items-center justify-between gap-2">
                    {post.status === "published" ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                        <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                        <EyeOff className="size-3" />
                        Hidden
                      </span>
                    )}

                    <div className="flex items-center gap-2 text-[11px] text-slate-400 dark:text-white/40">
                      <span>{post.publishedAt}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        {post.readingMinutes}m
                      </span>
                    </div>
                  </div>

                  {/* Title & Slug */}
                  <div className="mt-2.5">
                    <h3 className="font-serif font-bold text-slate-900 dark:text-white text-base leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mt-0.5 font-mono text-[11px] text-slate-500 dark:text-white/40 truncate">
                      /blog/{post.slug}
                    </p>
                  </div>

                  {/* Author & Action Buttons */}
                  <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between gap-2">
                    <span className="text-xs text-slate-600 dark:text-white/70 font-medium truncate max-w-[130px]">
                      By {post.author}
                    </span>

                    <div className="flex items-center gap-1">
                      {/* View Post */}
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        title="View Live"
                        className="rounded-lg p-2 text-slate-600 dark:text-white/60 hover:bg-slate-100 dark:hover:bg-white/10 active:scale-95 transition touch-manipulation"
                      >
                        <ExternalLink className="size-4" />
                      </Link>

                      {/* Toggle Hide/Show */}
                      <button
                        onClick={() => handleToggleHide(post)}
                        title={post.status === "published" ? "Hide" : "Publish"}
                        className={`rounded-lg p-2 active:scale-95 transition touch-manipulation ${
                          post.status === "published"
                            ? "text-slate-600 dark:text-white/60 hover:bg-amber-500/10 hover:text-amber-600"
                            : "text-amber-600 dark:text-amber-400 hover:bg-emerald-500/10 hover:text-emerald-500"
                        }`}
                      >
                        {post.status === "published" ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>

                      {/* Edit */}
                      <Link
                        href={`/admin/blogs/${post.slug}/edit`}
                        title="Edit Post"
                        className="rounded-lg p-2 text-purple-600 dark:text-purple-400 hover:bg-purple-500/10 active:scale-95 transition touch-manipulation"
                      >
                        <Edit3 className="size-4" />
                      </Link>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(post)}
                        disabled={deletingId === (post._id || post.slug)}
                        title="Delete"
                        className="rounded-lg p-2 text-red-600 dark:text-red-400 hover:bg-red-500/10 active:scale-95 disabled:opacity-30 transition touch-manipulation"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
