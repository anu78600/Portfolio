import { isDev } from "@/lib/content";

/**
 * Rendered where a case-study section exists offline but has not been written
 * up here.
 *
 * The alternative — inventing findings so the page looks finished — would
 * undermine the one thing a research portfolio has to get right. Saying
 * plainly that the analysis is not published yet costs a little polish and buys
 * credibility, so it is designed to look deliberate rather than broken.
 *
 * In development the raw `[ADD …]` prompt is shown so the gap is actionable.
 */
export function PendingNote({ hint }: { hint?: string }) {
  return (
    <div className="mt-4 border-l-2 border-dashed border-line-strong pl-5">
      <p className="label-sc text-ink-3">Not yet published</p>
      <p className="mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-ink-2">
        This part of the work exists but has not been written up for the web
        yet. No findings are stated here rather than approximated.
      </p>
      {isDev && hint ? (
        <p className="mt-3 font-mono text-[0.75rem] text-amber-600 dark:text-amber-400">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
