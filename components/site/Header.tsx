"use client";

import Link from "next/link";
import { useState } from "react";
import type { SocialLink } from "@/content/types";
import { navSections, spySections } from "@/lib/nav";
import { useScrollState } from "@/lib/hooks";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { PaletteTrigger } from "./CommandPalette";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Sticky site header.
 *
 * Quiet by default: transparent over the hero, then a hairline border and a
 * backdrop blur once the page moves under it. It carries the reading-progress
 * indicator as its own bottom edge rather than as a separate floating bar —
 * one element, one purpose, no extra chrome.
 *
 * A single rAF-throttled scroll listener drives the scroll spy, the progress
 * value and the scrolled state (see lib/hooks.ts).
 */
export function Header({
  name,
  initials,
  socials,
  resumePdf,
  showSpy = true,
}: {
  name: string;
  initials: string;
  socials: SocialLink[];
  resumePdf: string | null;
  /** Case-study pages have no on-page sections to track. */
  showSpy?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { activeId, progress, scrolled } = useScrollState(spySections);

  return (
    <>
      <a
        href="#main"
        className={cn(
          "sr-only z-[60] focus:not-sr-only focus:fixed focus:top-3 focus:left-3",
          "focus:rounded-md focus:bg-accent focus:px-4 focus:py-2.5",
          "focus:text-[0.875rem] focus:font-medium focus:text-accent-contrast",
        )}
      >
        Skip to content
      </a>

      <header
        data-site-header
        className="sticky top-0 z-50 print:hidden"
        style={{ viewTransitionName: "site-header" } as React.CSSProperties}
      >
        <div
          className={cn(
            /* No backdrop-filter. REDESIGN §4.3 bans it outright and §7 lists
               systemic backdrop blur as a template signal — it is the "frosted
               glass header" every starter ships. It is also the most expensive
               paint on the mid-range Android this site is authored for, and it
               promotes a compositing layer that stays alive while scrolling.
               An opaque bar does the same job: it stops the text underneath
               showing through. */
            "relative border-b transition-[background-color,border-color] duration-300",
            scrolled ? "border-line bg-bg" : "border-transparent bg-transparent",
          )}
        >
          <div className="container-page flex h-16 items-center justify-between gap-3">
            <Link
              href="/"
              className="group flex shrink-0 items-center gap-2.5 rounded-md"
              aria-label={`${name} — home`}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "grid h-8 w-8 place-items-center rounded-sm border border-line-strong",
                  "font-mono text-[0.6875rem] font-medium tracking-tight text-accent",
                  "transition-colors duration-200 group-hover:border-accent",
                )}
              >
                {initials}
              </span>
              <span className="hidden text-[0.9375rem] font-medium tracking-[-0.015em] text-ink sm:block">
                {name}
              </span>
            </Link>

            <nav
              data-site-nav
              aria-label="Primary"
              className="hidden lg:block"
            >
              <ul className="flex items-center gap-0.5">
                {navSections.map((section) => {
                  const active = showSpy && activeId === section.id;
                  return (
                    <li key={section.id}>
                      <a
                        href={`/#${section.id}`}
                        aria-current={active ? "true" : undefined}
                        data-active={active}
                        className={cn(
                          "relative block px-3 py-2 text-[0.875rem] transition-colors duration-200",
                          "after:pointer-events-none after:absolute after:right-3 after:bottom-1 after:left-3",
                          "after:h-px after:origin-left after:scale-x-0 after:bg-accent",
                          "after:transition-transform after:duration-300 after:ease-[var(--ease-out)]",
                          "data-[active=true]:after:scale-x-100",
                          active ? "text-ink" : "text-ink-3 hover:text-ink",
                        )}
                      >
                        {section.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex shrink-0 items-center gap-1">
              <PaletteTrigger />

              <Link
                href="/resume"
                className={cn(
                  "hidden h-9 items-center gap-1.5 rounded-md border border-line-strong px-3.5",
                  "text-[0.875rem] font-medium text-ink transition-colors duration-200",
                  "hover:border-ink-3 hover:bg-surface sm:inline-flex",
                )}
              >
                Résumé
              </Link>

              <ThemeToggle />

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-expanded={menuOpen}
                aria-haspopup="dialog"
                className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-ink-2 transition-colors hover:bg-surface hover:text-ink lg:hidden"
              >
                <Icon name="menu" size={20} />
                <span className="sr-only">Open menu</span>
              </button>
            </div>
          </div>

          {/* Reading progress — the header's own bottom edge. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-px overflow-hidden"
          >
            <div
              className="h-full origin-left bg-accent transition-opacity duration-300"
              style={{
                transform: `scaleX(${progress})`,
                opacity: scrolled ? 1 : 0,
              }}
            />
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        activeId={activeId}
        socials={socials}
        resumePdf={resumePdf}
      />
    </>
  );
}
