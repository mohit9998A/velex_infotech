"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

import { Input } from "@/components/ui/input";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "done" | "error">("idle");

  const submit = () => {
    if (!emailRe.test(email)) {
      setStatus("error");
      return;
    }
    // Phase 1: no backend wired — acknowledge locally.
    // TODO: POST to /api/newsletter once Supabase/Resend are configured.
    setStatus("done");
    setEmail("");
  };

  if (status === "done") {
    return (
      <p className="flex items-center gap-2 text-sm text-success">
        <Check className="size-4" /> You&apos;re on the list. Talk soon.
      </p>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        <Input
          type="email"
          inputMode="email"
          aria-label="Email address"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          className="flex-1"
        />
        <button
          type="button"
          aria-label="Subscribe"
          onClick={submit}
          className="btn-glow inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-purple-core text-white transition hover:-translate-y-0.5"
        >
          <ArrowRight className="size-4" />
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-xs text-error">Please enter a valid email.</p>
      )}
    </div>
  );
}
