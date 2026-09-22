import type { MDXComponents } from "mdx/types";
import Link from "next/link";

/**
 * Maps MDX elements onto the design system tokens from design.md so blog
 * posts inherit the design system with full dual-theme elegance without any per-post styling.
 *
 * Required by @next/mdx — the App Router integration does not work without this
 * file at the project root. Note the Next 16 signature: `useMDXComponents`
 * takes no arguments (it received a `components` object in earlier versions).
 */

const components: MDXComponents = {
  h2: ({ children, ...props }) => (
    <h2
      className="mt-14 scroll-mt-28 font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#0D0A24] dark:text-white text-balance"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="mt-10 scroll-mt-28 font-serif text-xl sm:text-2xl font-bold text-[#0D0A24] dark:text-white"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p
      className="mt-5 font-sans text-base sm:text-lg text-slate-600 dark:text-white/75 leading-relaxed text-pretty"
      {...props}
    >
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul
      className="mt-5 flex list-disc flex-col gap-2 pl-6 font-sans text-base text-slate-600 dark:text-white/75"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      className="mt-5 flex list-decimal flex-col gap-2 pl-6 font-sans text-base text-slate-600 dark:text-white/75"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="leading-relaxed font-sans" {...props}>
      {children}
    </li>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-[#0D0A24] dark:text-white" {...props}>
      {children}
    </strong>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="mt-6 border-l-2 border-[#7138FF] dark:border-[#8B4DFF] pl-5 font-serif text-lg italic text-[#0D0A24] dark:text-white leading-relaxed"
      {...props}
    >
      {children}
    </blockquote>
  ),
  // Internal links route through next/link so blog → service navigation is
  // client-side and prefetched; external links get the usual safety rel.
  a: ({ href = "", children, ...props }) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    const className =
      "text-[#7138FF] dark:text-[#B99CFF] font-medium underline underline-offset-4 transition-colors hover:text-[#5424D6] dark:hover:text-white";

    if (isInternal) {
      return (
        <Link href={href} className={className}>
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },
  table: ({ children, ...props }) => (
    // Wide tables scroll inside their own container rather than forcing the
    // page body to scroll horizontally on mobile.
    <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200/90 dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.02] backdrop-blur-md">
      <table className="w-full border-collapse text-left text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th
      className="border-b border-slate-200/90 dark:border-white/[0.08] bg-slate-100/70 dark:bg-white/[0.04] px-4 py-3 font-mono text-xs uppercase tracking-wider text-[#0D0A24] dark:text-white font-semibold"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td
      className="border-b border-slate-200/60 dark:border-white/[0.04] px-4 py-3.5 text-sm text-slate-600 dark:text-white/70 font-sans"
      {...props}
    >
      {children}
    </td>
  ),
  hr: (props) => (
    <hr className="my-12 border-slate-200/80 dark:border-white/[0.08]" {...props} />
  ),
  code: ({ children, ...props }) => (
    <code
      className="rounded-md border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.88em] text-[#7138FF] dark:text-[#B99CFF]"
      {...props}
    >
      {children}
    </code>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
