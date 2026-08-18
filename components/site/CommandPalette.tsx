"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { SocialLink } from "@/content/types";
import { navSections } from "@/lib/nav";
import { isTodo } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "@/components/ui/Icon";
import { toggleTheme } from "./ThemeToggle";

export const OPEN_PALETTE_EVENT = "open-command-palette";

interface Action {
  id: string;
  label: string;
  hint: string;
  group: string;
  icon: IconName;
  run: () => void;
}

/**
 * Command palette (⌘K / Ctrl K).
 *
 * Included because it is genuinely the fastest route to the two things a
 * recruiter actually wants — the resume and a way to make contact — without
 * putting a second row of buttons in the header. It is an accelerator, never
 * the only path: every action here is also reachable by ordinary clicking.
 *
 * Built on <dialog> for platform focus management, with the ARIA combobox
 * pattern layered on top so the filtered list is announced correctly.
 */
export function CommandPalette({
  socials,
  resumePdf,
  projects,
}: {
  socials: SocialLink[];
  resumePdf: string | null;
  projects: { slug: string; title: string }[];
}) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);

  const close = useCallback(() => setOpen(false), []);

  const goToSection = useCallback(
    (id: string) => {
      if (window.location.pathname === "/") {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          history.replaceState(null, "", `#${id}`);
          return;
        }
      }
      router.push(`/#${id}`);
    },
    [router],
  );

  const actions = useMemo<Action[]>(() => {
    const list: Action[] = navSections.map((section) => ({
      id: `section-${section.id}`,
      label: section.label,
      hint: section.hint,
      group: "Go to",
      icon: "arrow-down",
      run: () => goToSection(section.id),
    }));

    list.push({
      id: "resume-view",
      label: "View resume",
      hint: "Plain, printable version",
      group: "Resume",
      icon: "file-text",
      run: () => router.push("/resume"),
    });

    if (resumePdf) {
      list.push({
        id: "resume-download",
        label: "Download resume (PDF)",
        hint: resumePdf,
        group: "Resume",
        icon: "download",
        run: () => window.open(resumePdf, "_blank", "noopener"),
      });
    }

    for (const project of projects) {
      list.push({
        id: `project-${project.slug}`,
        label: project.title,
        hint: "Open case study",
        group: "Work",
        icon: "arrow-up-right",
        run: () => router.push(`/work/${project.slug}`),
      });
    }

    for (const social of socials) {
      if (isTodo(social.href)) continue;
      const href =
        social.key === "email" && !social.href.startsWith("mailto:")
          ? `mailto:${social.href}`
          : social.href;
      list.push({
        id: `social-${social.key}`,
        label: social.key === "email" ? "Send an email" : `Open ${social.label}`,
        hint: social.display,
        group: "Connect",
        icon: social.key === "email" ? "mail" : (social.key as IconName),
        run: () => {
          if (social.key === "email") window.location.href = href;
          else window.open(href, "_blank", "noopener");
        },
      });
    }

    list.push({
      id: "theme",
      label: "Toggle theme",
      hint: "Switch between light and dark",
      group: "Preferences",
      icon: "sun",
      run: () => toggleTheme(),
    });

    return list;
  }, [goToSection, projects, resumePdf, router, socials]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((action) =>
      `${action.label} ${action.hint} ${action.group}`.toLowerCase().includes(q),
    );
  }, [actions, query]);

  // Global shortcut + the header trigger's custom event.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    const onOpen = () => setOpen(true);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      setQuery("");
      setCursor(0);
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    }
    if (!open && dialog.open) dialog.close();
    if (!open) document.body.style.overflow = "";
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handle = () => {
      setOpen(false);
      document.body.style.overflow = "";
    };
    dialog.addEventListener("close", handle);
    return () => dialog.removeEventListener("close", handle);
  }, []);

  // Keep the highlighted row in view during keyboard navigation.
  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [cursor, query]);

  const runAction = useCallback(
    (action: Action) => {
      setOpen(false);
      document.body.style.overflow = "";
      // Let the dialog finish closing before moving focus or the route.
      window.setTimeout(() => action.run(), 0);
    },
    [],
  );

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setCursor((c) => (results.length ? (c + 1) % results.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setCursor((c) => (results.length ? (c - 1 + results.length) % results.length : 0));
    } else if (event.key === "Home") {
      event.preventDefault();
      setCursor(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setCursor(Math.max(results.length - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const action = results[cursor];
      if (action) runAction(action);
    }
  };

  // Grouped for rendering, but each item keeps its flat index so arrow-key
  // navigation and aria-activedescendant continue to work off one sequence.
  const grouped = results.reduce<{ group: string; items: { action: Action; index: number }[] }[]>(
    (acc, action, index) => {
      const last = acc[acc.length - 1];
      if (last && last.group === action.group) last.items.push({ action, index });
      else acc.push({ group: action.group, items: [{ action, index }] });
      return acc;
    },
    [],
  );

  return (
      <dialog
        ref={dialogRef}
        aria-label="Command palette"
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
        className={cn(
          "command-palette m-0 w-full max-w-none bg-transparent p-0",
          /* Opaque scrim, no blur — see MobileMenu. REDESIGN §4.3. */
          "backdrop:bg-black/60",
        )}
      >
        <div className="flex min-h-dvh items-start justify-center px-4 pt-[12vh] pb-8">
          <div
            data-palette-panel
            className="w-full max-w-xl overflow-hidden rounded-lg border border-line bg-overlay shadow-[var(--shadow-elevated)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Icon name="search" size={17} className="shrink-0 text-ink-3" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setCursor(0);
                }}
                onKeyDown={onKeyDown}
                type="text"
                role="combobox"
                aria-expanded="true"
                aria-controls="command-results"
                aria-activedescendant={
                  results[cursor] ? `command-${results[cursor].id}` : undefined
                }
                aria-label="Search commands"
                placeholder="Search sections, work, contact…"
                autoComplete="off"
                spellCheck={false}
                className="h-14 flex-1 bg-transparent text-[0.9375rem] text-ink outline-none placeholder:text-ink-3"
              />
              <kbd className="label-sc hidden shrink-0 rounded-sm border border-line px-1.5 py-1 text-ink-3 sm:block">
                Esc
              </kbd>
            </div>

            {/* A listbox, not a <ul>. An <li> is not a valid child of a
                listbox, so wrapping each option in one made the browser
                silently discard the "option" role on every command — an
                accessibility-tree dump of the open palette returned zero
                selectable options. Grouped with role="group" so the section
                headings are announced rather than skipped. */}
            <div
              ref={listRef}
              id="command-results"
              role="listbox"
              aria-label="Commands"
              className="max-h-[min(24rem,50dvh)] overflow-y-auto p-2"
            >
              {results.length === 0 ? (
                <p className="px-3 py-8 text-center text-ui text-ink-3">
                  No matches for “{query}”
                </p>
              ) : (
                grouped.map(({ group, items }) => (
                  <div key={group} role="group" aria-label={group}>
                    <p className="label-sc px-3 pt-3 pb-1.5 text-ink-3" aria-hidden="true">
                      {group}
                    </p>
                    {items.map(({ action, index }) => {
                      const active = index === cursor;
                      return (
                        <button
                          key={action.id}
                          type="button"
                          id={`command-${action.id}`}
                          role="option"
                          aria-selected={active}
                          data-active={active}
                          onMouseMove={() => setCursor(index)}
                          onClick={() => runAction(action)}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left",
                            active ? "bg-surface text-ink" : "text-ink-2",
                          )}
                        >
                          <Icon
                            name={action.icon}
                            size={16}
                            className={cn("shrink-0", active ? "text-accent" : "text-ink-3")}
                          />
                          <span className="min-w-0 flex-1 truncate text-ui">
                            {action.label}
                          </span>
                          <span className="hidden shrink-0 truncate text-meta text-ink-3 sm:block sm:max-w-[45%]">
                            {action.hint}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </dialog>
  );
}

/**
 * Header affordance, rendered separately from the dialog and wired to it by a
 * window event. A palette nobody can discover is a party trick, so the shortcut
 * is advertised rather than hidden.
 */
export function PaletteTrigger() {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent(OPEN_PALETTE_EVENT))}
      className={cn(
        "hidden items-center gap-2 rounded-md border border-line bg-surface/60 py-1.5 pr-1.5 pl-3 md:inline-flex",
        "text-[0.8125rem] text-ink-3 transition-colors duration-200 hover:border-line-strong hover:text-ink-2",
      )}
    >
      <Icon name="search" size={14} />
      <span>Search</span>
      <kbd className="label-sc rounded-sm border border-line bg-bg px-1.5 py-1 text-ink-3">
        {isMac ? "⌘" : "Ctrl"} K
      </kbd>
    </button>
  );
}
