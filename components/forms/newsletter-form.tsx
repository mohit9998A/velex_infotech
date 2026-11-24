"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

import { siteConfig } from "@/config/site";
import { Input } from "@/components/ui/input";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * This form previously performed no network call at all: it validated the
 * address client-side, discarded it, and rendered "You're on the list. Talk
 * soon." Every signup since launch was silently dropped while the user was
 * told the opposite.
 *
 * Until there is a real subscribe endpoint, it hands off to the user's mail
 * client — which actually delivers, and which the success copy can honestly
 * describe.
 *
 * TODO(velex): replace with a POST to /api/newsletter once a list exists.
 * Keep the failure mode honest when you do.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  const submit = () => {
    if (!emailRe.test(email)) {
      setStatus("error");
      return;
    }
    const subject = encodeURIComponent("Subscribe to the intelligence brief");
    const body = encodeURIComponent(
      `Please add ${email} to the Velex Infotech mailing list.`,
    );
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
    setEmail("");
  };

  if (status === "sent") {
    return (
      <p className="flex items-start gap-2 text-sm text-success">
        <Check className="mt-0.5 size-4 shrink-0" />
        <span>
          Your email app should be open — send the message and we&apos;ll add you.
        </span>
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      noValidate
    >
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
          className="flex-1"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="btn-glow inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-purple-core text-white transition hover:-translate-y-0.5 cursor-pointer"
        >
          <ArrowRight className="size-4" />
        </button>
      </div>
      {status === "error" && (
        <p role="alert" className="mt-2 text-xs text-error">Please enter a valid email.</p>
      )}
    </form>
  );
}
