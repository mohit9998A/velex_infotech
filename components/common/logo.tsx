import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  /**
   * `null` renders the lockup as plain markup rather than a link — for use
   * inside the lead-form dialog, where a click would navigate the visitor off
   * the page half-way through filling the form in.
   */
  href?: string | null;
}

/** Velex 3D crystal logo mark + wordmark. */
export function Logo({ className, showWordmark = true, href = "/" }: LogoProps) {
  const classes = cn("group inline-flex items-center gap-2.5", className);

  const lockup = (
    <>
      <span className="relative inline-flex items-center justify-center">
        <Image
          src="/images/logo/logo.png"
          alt="Velex Infotech"
          width={34}
          height={34}
          priority
          className="size-8 sm:size-9 object-contain drop-shadow-[0_0_12px_rgba(168,85,247,0.6)]"
        />
      </span>
      {showWordmark && (
        <span className="font-serif text-[1.4rem]/[2.1rem] font-bold tracking-tight text-primary">
          VELEX
        </span>
      )}
    </>
  );

  // No `aria-label` on this branch — it names a destination, and there is none.
  if (href === null) {
    return <span className={classes}>{lockup}</span>;
  }

  return (
    <Link href={href} aria-label={`${siteConfig.name} home`} className={classes}>
      {lockup}
    </Link>
  );
}
