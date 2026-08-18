import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Progressive disclosure for prose the page wants glanceable.
 *
 * Native <details>/<summary>: keyboard, screen-reader and find-in-page
 * behaviour come from the platform, not from us. The opening animates where
 * `::details-content` transitions are supported (Chromium); everywhere else it
 * toggles instantly, which is a fallback and not a failure.
 *
 * Nothing routed through this is deleted from the record — /resume renders
 * every folded word in full. This is pacing, not concealment.
 */
export function Disclose({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <details className={cn("disclose", className)}>
      <summary className="label-sc inline-flex cursor-pointer items-center gap-2 text-accent select-none">
        <span
          aria-hidden="true"
          className="disclose-mark font-mono text-[0.8125rem] leading-none"
        >
          +
        </span>
        {label}
      </summary>
      <div className="pt-3">{children}</div>
    </details>
  );
}
