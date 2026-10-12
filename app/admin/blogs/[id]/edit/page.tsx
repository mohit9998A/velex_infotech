"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { BlogEditorForm } from "@/components/admin/blog-editor-form";
import type { MongoBlogPost } from "@/types/blog";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);

  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<MongoBlogPost | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/check")
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated) {
          router.push("/admin");
          return;
        }

        // Fetch post details
        fetch(`/api/admin/blogs/${id}`)
          .then((res) => res.json())
          .then((postData) => {
            if (postData.error) {
              setError(postData.error);
            } else {
              setPost(postData.post);
            }
          })
          .catch((err) => setError(err.message))
          .finally(() => setLoading(false));
      })
      .catch(() => router.push("/admin"));
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-3">
        <RefreshCw className="size-8 animate-spin text-purple-500" />
        <span className="text-sm text-slate-500 dark:text-white/60">Loading blog post details...</span>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3 text-red-500">
        <AlertCircle className="size-10 text-red-500/80" />
        <span className="text-base font-semibold">{error || "Post not found"}</span>
        <button
          onClick={() => router.push("/admin")}
          className="mt-2 rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white hover:bg-purple-700"
        >
          Return to Admin Dashboard
        </button>
      </div>
    );
  }

  return <BlogEditorForm isEditing={true} initialData={post} targetId={id} />;
}
