"use client";

import { usePastFold } from "@/lib/hooks";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

/**
 * Appears once the reader is roughly a viewport down. Deliberately small and
 * low-contrast: it is a convenience, not a call to action, and it sits clear of
 * the bottom-right corner where mobile browser chrome lives.
 */
export function BackToTop() {
  const visible = usePastFold();

  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        })
      }
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={cn(
        "fixed right-4 bottom-5 z-40 inline-flex h-11 w-11 items-center justify-center sm:right-6 sm:bottom-6",
        "rounded-md border border-line bg-elevated/85 text-ink-2 shadow-[var(--shadow-subtle)] backdrop-blur-md",
        "transition-[opacity,transform,color,border-color] duration-300 ease-[var(--ease-out)]",
        "hover:border-line-strong hover:text-ink print:hidden",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0",
      )}
    >
      <Icon name="arrow-up" size={18} />
      <span className="sr-only">Back to top</span>
    </button>
  );
}
