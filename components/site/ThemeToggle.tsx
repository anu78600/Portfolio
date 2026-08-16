"use client";

import { useCallback, useEffect } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

export type Theme = "light" | "dark";

export function currentTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

/**
 * Applies a theme and animates the change.
 *
 * The `theme-transition` class is added only for the duration of the switch.
 * Leaving a global colour transition on permanently would make every ordinary
 * hover state feel laggy, which is the usual tell of a bolted-on theme toggle.
 */
export function applyTheme(next: Theme) {
  const root = document.documentElement;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduced) {
    root.classList.add("theme-transition");
    window.setTimeout(() => root.classList.remove("theme-transition"), 300);
  }

  root.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch {
    /* storage unavailable — the theme still applies for this session */
  }
}

export function toggleTheme() {
  applyTheme(currentTheme() === "dark" ? "light" : "dark");
}

export function ThemeToggle({ className }: { className?: string }) {
  // Keep following the OS while the visitor has not made an explicit choice.
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem("theme")) return;
      } catch {
        /* ignore */
      }
      document.documentElement.setAttribute(
        "data-theme",
        event.matches ? "dark" : "light",
      );
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const onClick = useCallback(() => toggleTheme(), []);

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-md text-ink-2",
        "transition-colors duration-200 hover:bg-surface hover:text-ink",
        className,
      )}
    >
      {/*
        Both icons and both labels are rendered, and CSS picks which is live
        based on the resolved data-theme attribute. Nothing about this control
        depends on client state, so it is correct on the very first paint and
        cannot cause a hydration mismatch.
      */}
      <Icon name="moon" size={18} className="dark:hidden" />
      <Icon name="sun" size={18} className="hidden dark:block" />
      <span className="sr-only dark:hidden">Switch to dark theme</span>
      <span className="sr-only light:hidden">Switch to light theme</span>
    </button>
  );
}
