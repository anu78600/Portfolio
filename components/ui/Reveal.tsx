import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Marks a subtree for scroll reveal.
 *
 * This is a server component — it only stamps `data-reveal` and a delay custom
 * property onto an element. A single IntersectionObserver in
 * `components/site/ScrollReveal.tsx` releases them. No animation library, no
 * per-element client component, and no hydration cost.
 *
 * The transition itself lives in globals.css, which also handles the two cases
 * that matter: `prefers-reduced-motion` and JavaScript never running.
 */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  immediate = false,
  className,
  children,
  ...rest
}: {
  as?: ElementType;
  /** Stagger in milliseconds. Keep under ~240ms; longer reads as lag. */
  delay?: number;
  /**
   * Render already-revealed.
   *
   * Above-the-fold content must never be animation-gated. `[data-reveal]` ships
   * from the server at `opacity: 0`, so without this the hero stays invisible
   * until React hydrates and the observer fires — a blank page on a mid-range
   * Android over mobile data, on the one screen that has to land. Stamping
   * `data-revealed` at render time paints it with the first byte of HTML;
   * `ScrollReveal` skips these because it selects `:not([data-revealed])`.
   */
  immediate?: boolean;
  className?: string;
  children: ReactNode;
} & Record<string, unknown>) {
  return (
    <Tag
      data-reveal=""
      {...(immediate ? { "data-revealed": "" } : {})}
      style={
        delay && !immediate
          ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties)
          : undefined
      }
      className={cn(className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
