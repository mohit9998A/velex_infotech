import type { MDXComponents } from "mdx/types";
import Link from "next/link";

/**
 * Maps MDX elements onto the site's existing Tailwind design tokens so blog
 * posts inherit the design system without any per-post styling.
 *
 * Required by @next/mdx — the App Router integration does not work without this
 * file at the project root. Note the Next 16 signature: `useMDXComponents`
 * takes no arguments (it received a `components` object in earlier versions).
 */

const components: MDXComponents = {
  h2: ({ children, ...props }) => (
    <h2
      className="mt-14 scroll-mt-28 font-display text-h3 text-balance text-primary"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="mt-10 scroll-mt-28 font-display text-xl text-primary"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="mt-5 text-pretty leading-relaxed text-secondary" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="mt-5 flex list-disc flex-col gap-2 pl-5 text-secondary" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mt-5 flex list-decimal flex-col gap-2 pl-5 text-secondary" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-primary" {...props}>
      {children}
    </strong>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="mt-6 border-l-2 border-purple-core/60 pl-5 text-lg italic text-primary"
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
      "text-purple-glow underline underline-offset-4 transition-colors hover:text-primary";

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
    <div className="mt-6 overflow-x-auto rounded-xl border border-vx-border">
      <table className="w-full border-collapse text-left text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th
      className="border-b border-vx-border bg-surface/60 px-4 py-3 font-mono-label text-primary"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="border-b border-vx-border/60 px-4 py-3 text-secondary" {...props}>
      {children}
    </td>
  ),
  hr: (props) => <hr className="my-12 border-vx-border" {...props} />,
  code: ({ children, ...props }) => (
    <code
      className="rounded bg-surface px-1.5 py-0.5 font-mono text-[0.9em] text-purple-glow"
      {...props}
    >
      {children}
    </code>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
