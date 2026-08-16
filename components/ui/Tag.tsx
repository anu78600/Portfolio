import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Small metadata chip. Deliberately low-contrast and un-rounded — these are
 * labels, not buttons, and should never compete with an actual control.
 */
export function Tag({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "accent";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-2 py-[3px] text-[0.75rem] leading-none",
        tone === "accent"
          ? "border-accent-line/60 bg-accent-soft text-accent"
          : "border-line bg-surface text-ink-2",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function TagRow({
  items,
  tone,
  className,
}: {
  items: string[];
  tone?: "neutral" | "accent";
  className?: string;
}) {
  if (!items.length) return null;
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {items.map((item) => (
        <li key={item}>
          <Tag tone={tone}>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}
