"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

type Density = "detailed" | "compact";

/**
 * Resume toolbar.
 *
 * The one genuinely useful interaction on a resume page is letting the reader
 * choose how much of it they want. A recruiter doing a first pass wants the
 * one-page version; someone who has decided to take you seriously wants the
 * detail. "Compact" collapses supporting prose — the profile paragraphs and
 * project descriptions — while every fact a resume is judged on (roles, dates,
 * responsibilities, grades, credentials) stays on the page in both modes.
 *
 * That constraint is deliberate: hiding substance behind a toggle is how
 * interactive resumes usually fail. This one only ever hides elaboration.
 *
 * Density is applied as a data attribute on <html> and the hiding is pure CSS,
 * so the server render is unaffected and there is no hydration mismatch. The
 * choice persists, and Compact is what the print stylesheet honours too.
 */
export function ResumeControls({
  email,
  resumePdf,
}: {
  email: string | null;
  resumePdf: string | null;
}) {
  const [density, setDensity] = useState<Density>("detailed");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("resume-density");
    } catch {
      /* storage unavailable */
    }
    if (stored === "compact" || stored === "detailed") {
      setDensity(stored);
      document.documentElement.setAttribute("data-resume-density", stored);
    } else {
      document.documentElement.setAttribute("data-resume-density", "detailed");
    }
    return () => document.documentElement.removeAttribute("data-resume-density");
  }, []);

  const apply = useCallback((next: Density) => {
    setDensity(next);
    document.documentElement.setAttribute("data-resume-density", next);
    try {
      localStorage.setItem("resume-density", next);
    } catch {
      /* storage unavailable */
    }
  }, []);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(timer);
  }, [copied]);

  return (
    <div
      data-print="hide"
      className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6"
    >
      <Link
        href="/"
        className="group inline-flex items-center gap-2 text-[0.875rem] text-ink-3 transition-colors hover:text-ink"
      >
        <Icon
          name="arrow-right"
          size={15}
          className="rotate-180 transition-transform duration-200 group-hover:-translate-x-0.5"
        />
        Back to the site
      </Link>

      <div className="flex flex-wrap items-center gap-2">
        <div
          role="group"
          aria-label="Level of detail"
          className="flex items-center rounded-md border border-line bg-surface p-0.5"
        >
          {(["detailed", "compact"] as const).map((mode) => {
            const active = density === mode;
            return (
              <button
                key={mode}
                type="button"
                onClick={() => apply(mode)}
                aria-pressed={active}
                className={cn(
                  "inline-flex h-8 items-center gap-1.5 rounded-sm px-2.5 text-[0.8125rem] capitalize",
                  "transition-colors duration-150",
                  active
                    ? "bg-elevated text-ink shadow-[var(--shadow-subtle)]"
                    : "text-ink-3 hover:text-ink-2",
                )}
              >
                <Icon name={mode === "compact" ? "minus" : "plus"} size={13} />
                {mode}
              </button>
            );
          })}
        </div>

        {email ? (
          <>
            <Button
              variant="secondary"
              size="sm"
              icon={copied ? "check" : "copy"}
              iconPosition="leading"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(email);
                  setCopied(true);
                } catch {
                  /* clipboard blocked — the address is printed above */
                }
              }}
            >
              {copied ? "Copied" : "Copy email"}
            </Button>
            <span role="status" aria-live="polite" className="sr-only">
              {copied ? `${email} copied to clipboard` : ""}
            </span>
          </>
        ) : null}

        <Button
          variant="secondary"
          size="sm"
          icon="file-text"
          iconPosition="leading"
          onClick={() => window.print()}
        >
          Print
        </Button>

        {resumePdf ? (
          <ButtonLink
            href={resumePdf}
            external
            download
            size="sm"
            icon="download"
            iconPosition="leading"
          >
            PDF
          </ButtonLink>
        ) : null}
      </div>
    </div>
  );
}
