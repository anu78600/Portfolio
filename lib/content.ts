/**
 * Placeholder handling.
 *
 * Content that has not been supplied is written as `[ADD SOMETHING]` in
 * `content/*`. Rather than printing those strings into a live page, the UI
 * asks these helpers what it is dealing with and degrades deliberately:
 *
 *   • a link with a placeholder href renders as a disabled control with an
 *     explanatory title, not a dead <a>
 *   • an optional line (location, availability, dates) disappears entirely
 *   • an image falls back to a designed typographic plate
 *
 * In development an amber outline marks anything still unfilled, so the gaps
 * are impossible to miss while editing. In production the site simply looks
 * complete-but-shorter instead of leaking scaffolding.
 */

const TODO_PATTERN = /^\[ADD\b[^\]]*\]$/;

export function isTodo(value: string | undefined | null): boolean {
  return typeof value === "string" && TODO_PATTERN.test(value.trim());
}

/** Returns the value, or `null` when it is still a placeholder. */
export function real(value: string | undefined | null): string | null {
  if (!value || isTodo(value)) return null;
  return value;
}

/** Returns the value, or the supplied fallback when it is a placeholder. */
export function realOr(value: string | undefined | null, fallback: string): string {
  return real(value) ?? fallback;
}

export const isDev = process.env.NODE_ENV === "development";

/**
 * Class applied to elements that are rendering placeholder content, so unfilled
 * fields are obvious while editing and invisible once deployed.
 */
export function todoClass(value: string | undefined | null): string {
  return isDev && isTodo(value)
    ? "outline-dashed outline-1 outline-amber-500/70 outline-offset-2 rounded-[2px]"
    : "";
}

/** Normalises an email into a usable `mailto:` href. */
export function mailto(email: string | undefined | null): string | null {
  const value = real(email);
  if (!value) return null;
  return value.startsWith("mailto:") ? value : `mailto:${value}`;
}

/** Human-readable form of a URL for display next to a link. */
export function prettyUrl(url: string): string {
  return url
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");
}

/** Initials fallback derived from a name, used by the brand mark. */
export function initialsFrom(name: string, explicit: string): string {
  const given = real(explicit);
  if (given) return given.toUpperCase();

  const realName = real(name);
  if (!realName) return "—";

  return realName
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}
