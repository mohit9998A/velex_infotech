import Link from "next/link";
import { MapPin, Phone, Mail, Globe } from "lucide-react";

import { siteConfig } from "@/config/site";
import { marketsShortLine, officesLine, siteDomain } from "@/lib/seo";
import { navGroups } from "@/config/navigation";
import { Logo } from "@/components/common/logo";
import { NewsletterForm } from "@/components/forms/newsletter-form";

type IconProps = { className?: string };

const InstagramIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
/**
 * Only profiles that resolve.
 *
 * This row previously rendered four links, three of which (LinkedIn, X,
 * YouTube) returned 404 — visibly broken to a human, and worse to a crawler,
 * because the same three URLs were also in the Organization `sameAs`. Add an
 * icon back here only when the profile exists and is in siteConfig.social.
 */
const socialIcons: Record<string, (props: IconProps) => React.ReactElement> = {
  instagram: InstagramIcon,
};

const socials = Object.entries(siteConfig.social)
  .filter(([key]) => key in socialIcons)
  .map(([key, href]) => ({
    icon: socialIcons[key],
    href,
    label: key.charAt(0).toUpperCase() + key.slice(1),
  }));

export function Footer() {
  return (
    <footer className="relative border-t border-slate-200/80 dark:border-white/10 bg-slate-50/50 dark:bg-[#04040A] text-slate-900 dark:text-white transition-colors duration-500 overflow-hidden">
      {/* Subtle top border gradient line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand + newsletter */}
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-xs font-sans text-sm text-slate-600 dark:text-white/70 leading-relaxed">
              {siteConfig.tagline} AI agents, automation and custom software for
              businesses in the {marketsShortLine} — engineered from{" "}
              {officesLine}.
            </p>
            <div className="mt-1 max-w-sm">
              <p className="mb-2 font-mono text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Join the intelligence brief
              </p>
              <NewsletterForm />
            </div>
          </div>

          {/* Link columns from nav groups */}
          {navGroups.map((group) => (
            <div key={group.label}>
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-4">
                {group.label}
              </h3>
              <ul className="flex flex-col gap-2.5 font-sans text-sm">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-600 dark:text-white/60 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact row */}
        <div className="mt-12 grid gap-4 border-t border-slate-200/80 dark:border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          <ContactItem icon={MapPin} text={officesLine} />
          <ContactItem icon={Phone} text={siteConfig.phoneDisplay} href={`tel:${siteConfig.phone}`} />
          <ContactItem icon={Mail} text={siteConfig.email} href={`mailto:${siteConfig.email}`} />
          <ContactItem icon={Globe} text={siteDomain} href={siteConfig.url} />
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200/80 dark:border-white/10 pt-6 sm:flex-row font-sans">
          <p className="text-xs text-slate-500 dark:text-white/50">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved. ·{" "}
            <Link href="/privacy-policy" className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors">
              Privacy
            </Link>{" "}
            ·{" "}
            <Link href="/terms-of-service" className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors">
              Terms
            </Link>
          </p>
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex size-9 items-center justify-center rounded-full border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/70 hover:border-purple-500/40 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-500/10 transition-all"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function ContactItem({
  icon: Icon,
  text,
  href,
}: {
  icon: typeof MapPin;
  text: string;
  href?: string;
}) {
  const content = (
    <span className="flex items-center gap-2.5 font-sans text-sm text-slate-600 dark:text-white/70">
      <Icon className="size-4 shrink-0 text-purple-600 dark:text-purple-400" />
      <span>{text}</span>
    </span>
  );

  return href ? (
    <a href={href} className="transition-colors hover:text-purple-600 dark:hover:text-purple-300 [&_span]:hover:text-purple-600 dark:[&_span]:hover:text-purple-300">
      {content}
    </a>
  ) : (
    content
  );
}
