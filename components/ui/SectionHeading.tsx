import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

/**
 * The section header used by every section on the page.
 *
 * Editorial numbering + a small mono label + a hairline that runs to the edge
 * of the content column. Repeating this exact structure is what gives the page
 * its vertical rhythm — the sections read as chapters of one document rather
 * than as a stack of unrelated cards.
 */
export function SectionHeading({
  index,
  label,
  title,
  lede,
  id,
  align = "start",
  action,
  className,
}: {
  /** Editorial number, e.g. "02". Omit for anything that is not an act. */
  index?: string;
  /** Small uppercase label, e.g. "Selected work". */
  label: string;
  /** The visible section heading. */
  title: ReactNode;
  /** Optional single paragraph beneath the heading. */
  lede?: string;
  /** Id for the <h2>, used by aria-labelledby on the section. */
  id?: string;
  align?: "start" | "wide";
  /** Optional control rendered opposite the label on wide screens. */
  action?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("mb-10 sm:mb-14", className)}>
      <Reveal className="relative flex items-center gap-4">
        {/* The folio hangs in the stub, outside the margin rule. It is the
            clearest statement of the whole grid: numbers live in the margin,
            prose lives in the column, and nothing crosses. */}
        {index ? (
          <span
            aria-hidden="true"
            className="stub-item label-sc top-1 pr-3 text-accent"
          >
            {index}
          </span>
        ) : null}
        <span className="label-sc text-ink-3">{label}</span>
        <span aria-hidden="true" className="rule-fade h-px flex-1" />
        {action ? <div className="hidden sm:block">{action}</div> : null}
      </Reveal>

      <Reveal delay={60} className={cn("mt-6", align === "start" && "max-w-3xl")}>
        <h2 id={id} className="text-heading font-medium text-ink">
          {title}
        </h2>
        {lede ? (
          <p className="mt-4 max-w-2xl text-lede text-ink-2">{lede}</p>
        ) : null}
      </Reveal>
    </header>
  );
}
