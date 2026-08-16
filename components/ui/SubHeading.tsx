import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

/**
 * The heading for a block that sits *inside* an act.
 *
 * Deliberately unnumbered. Only the three acts carry folio numbers; if every
 * block had one, the numbering would stop meaning "this is one of three
 * movements" and start meaning "this is a heading", which is what the old
 * eight-section site did.
 */
export function SubHeading({
  label,
  lede,
  className,
}: {
  label: string;
  lede?: string;
  className?: string;
}) {
  return (
    <Reveal className={cn("mb-8", className)}>
      <div className="flex items-baseline gap-4">
        <h3 className="label-sc text-ink-3">{label}</h3>
        <span aria-hidden="true" className="rule-fade h-px flex-1" />
      </div>
      {lede ? (
        <p className="mt-4 max-w-xl text-body-sm text-ink-2">{lede}</p>
      ) : null}
    </Reveal>
  );
}
