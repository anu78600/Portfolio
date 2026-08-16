import type { ReactNode } from "react";

/**
 * Renders *emphasis* in a content string as real italic.
 *
 * Content files hold plain strings, which is what keeps them editable without
 * touching components — but it also meant the site had no italic anywhere, and
 * an absence of italic is itself a tell: properly set prose uses it for the
 * titles of works and for the one word in a sentence that carries the weight.
 *
 * Deliberately the smallest possible markup vocabulary. One delimiter, no
 * nesting, no parser. If a string ever needs more than emphasis, it wants a
 * component, not a richer syntax.
 */
export function Prose({ children }: { children: string }): ReactNode {
  if (!children.includes("*")) return children;

  return children.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") && part.length > 2 ? (
      <em key={i}>{part.slice(1, -1)}</em>
    ) : (
      part
    ),
  );
}
