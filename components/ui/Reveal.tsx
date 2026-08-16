import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Marks a subtree for scroll reveal.
 *
 * A server component that stamps one attribute. There is no observer, no
 * client boundary and no JavaScript: the animation is driven entirely by
 * `animation-timeline: view()` in globals.css.
 *
 * Content is visible by default and the animation only hides-then-reveals
 * where it is supported, so browsers without scroll-driven animations, users
 * with reduced motion, and anyone whose JS fails all simply see the page.
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
  /**
   * Stagger, in the old millisecond vocabulary so call sites did not have to
   * change. A scroll-driven animation has no clock, so this maps onto a shift
   * in *where within the element's entry* the animation runs. Capped, because
   * past roughly 10% the later items in a group visibly lag the scroll.
   */
  delay?: number;
  /** Opt out entirely — used above the fold, where nothing should animate. */
  immediate?: boolean;
  className?: string;
  children: ReactNode;
} & Record<string, unknown>) {
  const shift = Math.min(delay / 24, 10);

  return (
    <Tag
      {...(immediate ? {} : { "data-reveal": "" })}
      style={
        !immediate && shift
          ? ({ "--reveal-shift": `${shift}%` } as React.CSSProperties)
          : undefined
      }
      className={cn(className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
