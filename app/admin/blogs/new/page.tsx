"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BlogEditorForm } from "@/components/admin/blog-editor-form";

export default function NewBlogPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    fetch("/api/admin/check")
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated) {
          router.push("/admin");
        } else {
          setChecking(false);
        }
      })
      .catch(() => router.push("/admin"));
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
      </div>
    );
  }

  return <BlogEditorForm isEditing={false} />;
}
