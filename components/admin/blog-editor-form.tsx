"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";
import type { MongoBlogPost } from "@/types/blog";

interface BlogEditorFormProps {
  initialData?: Partial<MongoBlogPost>;
  isEditing?: boolean;
  targetId?: string;
}

export function BlogEditorForm({
  initialData,
  isEditing = false,
  targetId,
}: BlogEditorFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [author, setAuthor] = useState(initialData?.author || "Mohit Dutta");
  const [publishedAt, setPublishedAt] = useState(
    initialData?.publishedAt || new Date().toISOString().split("T")[0]
  );
  const [readingMinutes, setReadingMinutes] = useState(
    initialData?.readingMinutes || 5
  );
  const [targetKeyword, setTargetKeyword] = useState(
    initialData?.targetKeyword || ""
  );
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || "");
  const [status, setStatus] = useState<"published" | "hidden">(
    initialData?.status || "published"
  );

  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto generate slug from title if not manually edited in create mode
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (!isEditing && !slug) {
      const generatedSlug = newTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      setSlug(generatedSlug);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      title,
      slug: slug.toLowerCase().trim().replace(/[^a-z0-9-]+/g, "-"),
      description,
      content,
      author,
      publishedAt,
      readingMinutes: Number(readingMinutes),
      targetKeyword,
      coverImage,
      status,
    };

    try {
      const url = isEditing
        ? `/api/admin/blogs/${targetId || slug}`
        : "/api/admin/blogs";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save blog post");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error saving post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-3.5 sm:px-6 pt-24 sm:pt-32 lg:pt-40 pb-16">
      {/* Back button */}
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-white/70 hover:text-purple-600 dark:hover:text-white transition mb-4 sm:mb-6"
      >
        <ArrowLeft className="size-4" />
        Back to Dashboard
      </Link>

      <div className="flex flex-col gap-1.5 border-b border-slate-200 dark:border-white/10 pb-5 sm:pb-6 mb-6 sm:mb-8">
        <span className="font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#7138FF] dark:text-[#8B4DFF]">
          {isEditing ? "EDIT POST" : "CREATE NEW POST"}
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D0A24] dark:text-white">
          {isEditing ? `Editing "${initialData?.title || "Blog Post"}"` : "Draft a New Blog Post"}
        </h1>
      </div>

      {error && (
        <div className="mb-6 flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 sm:p-4 text-xs text-red-600 dark:text-red-400 break-words">
          <AlertCircle className="size-4 shrink-0 mt-0.5" />
          <span className="break-all">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
        {/* Main Title & Slug Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-white/80 mb-1.5">
              Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Building Agentic AI Systems in Production"
              className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-white/[0.04] p-3 text-base sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-white/80 mb-1.5">
              URL Slug *
            </label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="building-agentic-ai-systems"
              className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-white/[0.04] p-3 text-base sm:text-sm font-mono text-purple-600 dark:text-purple-300 placeholder-slate-400 focus:border-purple-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Excerpt / Description */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-white/80 mb-1.5">
            Excerpt / Meta Description *
          </label>
          <textarea
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A short, compelling summary of the article for social sharing and search engines..."
            className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-white/[0.04] p-3 text-base sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 focus:border-purple-500 focus:outline-none"
          />
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-white/80 mb-1.5">
              Author
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-white/[0.04] p-2.5 text-base sm:text-xs text-slate-900 dark:text-white focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-white/80 mb-1.5">
              Publish Date
            </label>
            <input
              type="date"
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-white/[0.04] p-2.5 text-base sm:text-xs text-slate-900 dark:text-white focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-white/80 mb-1.5">
              Read Time (Mins)
            </label>
            <input
              type="number"
              min="1"
              max="60"
              value={readingMinutes}
              onChange={(e) => setReadingMinutes(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-white/[0.04] p-2.5 text-base sm:text-xs text-slate-900 dark:text-white focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-white/80 mb-1.5">
              Visibility Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as "published" | "hidden")}
              className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-[#0D0A24] p-2.5 text-base sm:text-xs text-slate-900 dark:text-white focus:border-purple-500 focus:outline-none"
            >
              <option value="published">Published (Visible)</option>
              <option value="hidden">Hidden (Draft)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-white/80 mb-1.5">
              Target Keyword (SEO)
            </label>
            <input
              type="text"
              value={targetKeyword}
              onChange={(e) => setTargetKeyword(e.target.value)}
              placeholder="e.g. agentic ai development"
              className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-white/[0.04] p-2.5 text-base sm:text-xs text-slate-900 dark:text-white focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-white/80 mb-1.5">
              Cover Image URL (Optional)
            </label>
            <input
              type="text"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://example.com/cover.jpg"
              className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-white/[0.04] p-2.5 text-base sm:text-xs text-slate-900 dark:text-white focus:border-purple-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Content Editor & Live Preview */}
        <div className="rounded-2xl border border-slate-200/90 dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] p-3.5 sm:p-4 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3 mb-4 gap-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-white/80">
              Article Content (Markdown) *
            </label>

            <div className="flex items-center gap-1 rounded-lg border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/[0.04] p-1">
              <button
                type="button"
                onClick={() => setActiveTab("write")}
                className={`rounded-md px-3 py-1 text-xs font-medium transition ${
                  activeTab === "write"
                    ? "bg-white dark:bg-purple-600 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-white/60"
                }`}
              >
                Write
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={`rounded-md px-3 py-1 text-xs font-medium transition ${
                  activeTab === "preview"
                    ? "bg-white dark:bg-purple-600 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-white/60"
                }`}
              >
                Preview
              </button>
            </div>
          </div>

          {activeTab === "write" ? (
            <textarea
              required
              rows={12}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your article in Markdown syntax... Use ## Headings, **bold**, lists, and links."
              className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-black/30 p-3 sm:p-4 font-mono text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 focus:border-purple-500 focus:outline-none leading-relaxed sm:rows-16"
            />
          ) : (
            <div className="min-h-[280px] sm:min-h-[380px] rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-black/30 p-4 sm:p-6 prose dark:prose-invert max-w-none font-sans text-sm text-slate-800 dark:text-white/90 overflow-auto">
              {content ? (
                <div className="whitespace-pre-wrap leading-relaxed">{content}</div>
              ) : (
                <span className="text-slate-400 italic">Nothing to preview yet. Write some content first!</span>
              )}
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center sm:justify-end gap-2.5 sm:gap-3 pt-3 sm:pt-4">
          <Link
            href="/admin"
            className="rounded-xl border border-slate-300 dark:border-white/10 px-5 py-3 text-xs font-semibold text-slate-700 dark:text-white/80 hover:bg-slate-50 dark:hover:bg-white/10 transition text-center justify-center inline-flex items-center"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7138FF] to-[#8B4DFF] px-6 py-3 text-xs font-semibold text-white shadow-lg shadow-purple-500/25 hover:brightness-110 active:scale-[0.99] disabled:opacity-50 transition touch-manipulation"
          >
            {loading ? (
              <span className="animate-pulse">Saving Post...</span>
            ) : (
              <>
                <Save className="size-4" />
                {isEditing ? "Update Post" : "Publish / Save Post"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
