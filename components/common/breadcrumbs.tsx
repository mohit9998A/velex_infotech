import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export interface Crumb {
  name: string;
  /** Root-relative path. The final crumb renders as plain text, not a link. */
  path: string;
}

/**
 * Visible breadcrumb trail. Pair with `breadcrumbSchema()` from lib/schema —
 * BreadcrumbList markup without a matching visible trail is a mismatch Google
 * can flag, so the two should always ship together.
 *
 * Pass the trail without "Home"; it's prepended here to match the schema
 * builder.
 */
export function Breadcrumbs({ trail, className }: { trail: Crumb[]; className?: string }) {
  const items: Crumb[] = [{ name: "Home", path: "/" }, ...trail];

  return (
    <nav aria-label="Breadcrumb" className={cn("mb-8", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="size-3.5 shrink-0" aria-hidden="true" />}
              {isLast ? (
                <span
                  className="font-medium text-purple-600 dark:text-purple-400"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="transition-colors hover:text-primary">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
