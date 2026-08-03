import Link from "next/link";
import { MapPin, Phone, Mail, Globe } from "lucide-react";

import { siteConfig } from "@/config/site";
import { siteDomain } from "@/lib/seo";
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
const LinkedinIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 9.5H5.67V18h2.67V9.5zM7 5.75a1.55 1.55 0 1 0 0 3.1 1.55 1.55 0 0 0 0-3.1zM18.33 18v-4.67c0-2.5-1.34-3.66-3.12-3.66a2.69 2.69 0 0 0-2.44 1.34V9.5h-2.67V18h2.67v-4.13c0-1.09.2-2.14 1.55-2.14 1.33 0 1.35 1.24 1.35 2.21V18h2.7z" />
  </svg>
);
const XIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.9 2H22l-7.6 8.7L23.3 22h-6.9l-5.4-7-6.2 7H1.7l8.1-9.3L1 2h7.1l4.9 6.4L18.9 2zm-1.2 18h1.9L7.1 4H5.1l12.6 16z" />
  </svg>
);
const YoutubeIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.8-1.8C19.3 5 12 5 12 5s-7.3 0-8.8.5A2.5 2.5 0 0 0 1.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.8 1.8C4.7 19 12 19 12 19s7.3 0 8.8-.5a2.5 2.5 0 0 0 1.8-1.8C23 15.2 23 12 23 12zM9.8 15.3V8.7l5.7 3.3-5.7 3.3z" />
  </svg>
);

const socials = [
  { icon: InstagramIcon, href: siteConfig.social.instagram, label: "Instagram" },
  { icon: LinkedinIcon, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: XIcon, href: siteConfig.social.twitter, label: "Twitter / X" },
  { icon: YoutubeIcon, href: siteConfig.social.youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-vx-border bg-surface/40">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-glow/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand + newsletter */}
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-xs text-sm text-secondary">
              {siteConfig.tagline} Premium AI-powered digital services for businesses
              that demand intelligence and luxury-grade execution.
            </p>
            <div className="mt-1 max-w-sm">
              <p className="mb-2 font-mono-label text-muted">Join the intelligence brief</p>
              <NewsletterForm />
            </div>
          </div>

          {/* Link columns from nav groups */}
          {navGroups.map((group) => (
            <div key={group.label}>
              <h3 className="font-mono-label text-muted">{group.label}</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-secondary transition-colors hover:text-purple-glow"
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
        <div className="mt-12 grid gap-4 border-t border-vx-border pt-8 sm:grid-cols-2 lg:grid-cols-4">
          <ContactItem icon={MapPin} text={siteConfig.location} />
          <ContactItem icon={Phone} text={siteConfig.phoneDisplay} href={`tel:${siteConfig.phone}`} />
          <ContactItem icon={Mail} text={siteConfig.email} href={`mailto:${siteConfig.email}`} />
          <ContactItem icon={Globe} text={siteDomain} href={siteConfig.url} />
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-vx-border pt-6 sm:flex-row">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved. ·{" "}
            <Link href="/privacy-policy" className="hover:text-secondary">Privacy</Link> ·{" "}
            <Link href="/terms-of-service" className="hover:text-secondary">Terms</Link>
          </p>
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex size-9 items-center justify-center rounded-full border border-vx-border text-secondary transition-colors hover:border-purple-glow hover:text-primary"
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
    <span className="flex items-center gap-2.5 text-sm text-secondary">
      <Icon className="size-4 shrink-0 text-purple-glow" />
      {text}
    </span>
  );
  return href ? (
    <a href={href} className="transition-colors hover:text-primary [&_span]:hover:text-primary">
      {content}
    </a>
  ) : (
    content
  );
}
