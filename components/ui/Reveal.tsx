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
  act = false,
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
  /**
   * Opt IN to the reveal. Default is off.
   *
   * This was inverted on 18 Aug. Every wrapper on the site was revealing, so
   * `/` ran 41 instances of one keyframe — on list rows and paragraph wrappers,
   * which REDESIGN §4.5 forbids in those words: "applied to sections only —
   * never paragraphs, never individual rows. Scroll-linked opacity on body copy
   * is a readability tax."
   *
   * A reveal is a promise that something is arriving. Made 41 times over 16
   * viewports it is a texture, and a texture cannot be an event. It is now
   * carried by exactly three objects — the three act headings — which is the
   * page's own cardinality. Contact is deliberately unnumbered, so the ABSENCE
   * of the gesture there says the same thing the absent folio says.
   */
  act?: boolean;
  className?: string;
  children: ReactNode;
} & Record<string, unknown>) {
  const shift = Math.min(delay / 24, 10);

  return (
    <Tag
      {...(act ? { "data-reveal": "" } : {})}
      style={
        act && shift
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
