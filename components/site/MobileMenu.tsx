"use client";

import { useCallback, useEffect, useRef } from "react";
import type { SocialLink } from "@/content/types";
import { navSections } from "@/lib/nav";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { SocialIconLinks } from "@/components/ui/SocialLinks";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Mobile navigation.
 *
 * Built on the native <dialog> element with `showModal()`, which supplies focus
 * trapping, Escape-to-close, background inertness and an accessible modal role
 * from the platform. Hand-rolling those is the usual source of broken mobile
 * menus — a focus trap that leaks, or a menu a screen reader can scroll behind.
 *
 * Only the body scroll lock has to be added manually.
 */
export function MobileMenu({
  open,
  onClose,
  activeId,
  socials,
  resumePdf,
}: {
  open: boolean;
  onClose: () => void;
  activeId: string;
  socials: SocialLink[];
  resumePdf: string | null;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();

    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape and backdrop dismissal both fire the native close event.
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const handle = () => onClose();
    dialog.addEventListener("close", handle);
    return () => dialog.removeEventListener("close", handle);
  }, [onClose]);

  const onBackdropClick = useCallback(
    (event: React.MouseEvent<HTMLDialogElement>) => {
      if (event.target === ref.current) onClose();
    },
    [onClose],
  );

  return (
    <dialog
      ref={ref}
      onClick={onBackdropClick}
      aria-label="Site navigation"
      className={cn(
        "mobile-menu m-0 h-dvh max-h-none w-full max-w-none bg-bg p-0 text-ink",
        "backdrop:bg-black/40 backdrop:backdrop-blur-[2px]",
      )}
    >
      <div className="flex h-full flex-col">
        <div className="container-page flex h-16 shrink-0 items-center justify-between border-b border-line">
          <span className="label-mono text-ink-3">Menu</span>
          <button
            type="button"
            onClick={onClose}
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-ink-2 transition-colors hover:bg-surface hover:text-ink"
          >
            <Icon name="close" size={20} />
            <span className="sr-only">Close menu</span>
          </button>
        </div>

        <nav className="container-page flex-1 overflow-y-auto py-4" aria-label="Sections">
          <ul>
            {navSections.map((section, i) => {
              const active = activeId === section.id;
              return (
                <li key={section.id}>
                  {/* Absolute fragment, not `#id` — the menu is rendered on
                      case-study routes too, where a bare fragment points at
                      nothing. */}
                  <a
                    href={`/#${section.id}`}
                    onClick={onClose}
                    aria-current={active ? "true" : undefined}
                    className={cn(
                      "flex min-h-[64px] items-baseline gap-4 border-b border-line py-4",
                      "transition-colors duration-150",
                      active ? "text-accent" : "text-ink hover:text-accent",
                    )}
                  >
                    <span className="label-mono w-6 shrink-0 text-ink-3 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[1.375rem] font-medium tracking-[-0.02em]">
                      {section.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href="/resume"
              onClick={onClose}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-accent px-5 font-medium text-accent-contrast"
            >
              <Icon name="file-text" size={16} />
              View résumé
            </a>

            {resumePdf ? (
              <a
                href={resumePdf}
                download
                onClick={onClose}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-line-strong px-5 font-medium text-ink"
              >
                <Icon name="download" size={16} />
                Download PDF
              </a>
            ) : null}
          </div>
        </nav>

        <div className="container-page flex shrink-0 items-center justify-between border-t border-line py-3">
          <SocialIconLinks links={socials} />
          <ThemeToggle />
        </div>
      </div>
    </dialog>
  );
}
