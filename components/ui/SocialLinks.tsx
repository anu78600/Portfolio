import type { SocialLink } from "@/content/types";
import { isTodo, mailto, todoClass } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

const iconFor: Record<string, IconName> = {
  linkedin: "linkedin",
  github: "github",
  email: "mail",
  x: "arrow-up-right",
  website: "arrow-up-right",
};

function hrefFor(link: SocialLink): string | null {
  if (link.key === "email") return mailto(link.href);
  return isTodo(link.href) ? null : link.href;
}

/**
 * Compact icon row (hero, footer). Every link carries a real accessible name;
 * an icon alone is never the only label.
 */
export function SocialIconLinks({
  links,
  className,
  size = 18,
}: {
  links: SocialLink[];
  className?: string;
  size?: number;
}) {
  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {links.map((link) => {
        const href = hrefFor(link);
        const shared =
          "inline-flex h-10 w-10 items-center justify-center rounded-md transition-colors duration-200";

        return (
          <li key={link.key}>
            {href ? (
              <a
                href={href}
                {...(link.key !== "email"
                  ? { target: "_blank", rel: "noreferrer noopener" }
                  : {})}
                className={cn(shared, "text-ink-3 hover:bg-surface hover:text-ink")}
              >
                <Icon name={iconFor[link.key]} size={size} />
                <span className="sr-only">{link.accessibleLabel}</span>
              </a>
            ) : (
              <span
                className={cn(
                  shared,
                  "cursor-not-allowed text-ink-3/45",
                  todoClass(link.href),
                )}
                title={`${link.label} link not added yet`}
                aria-disabled="true"
              >
                <Icon name={iconFor[link.key]} size={size} />
                <span className="sr-only">{link.label} — not added yet</span>
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/**
 * The large editorial list used in the contact section: label on the left,
 * destination on the right, whole row is the target.
 */
export function SocialRowLinks({ links }: { links: SocialLink[] }) {
  return (
    <ul className="border-t border-line">
      {links.map((link) => {
        const href = hrefFor(link);
        const unavailable = href === null;

        const row = (
          <>
            <span className="flex shrink-0 items-center gap-3">
              <Icon
                name={iconFor[link.key]}
                size={18}
                className={cn(
                  "shrink-0 transition-colors duration-200",
                  unavailable ? "text-ink-3/45" : "text-ink-3 group-hover:text-accent",
                )}
              />
              <span className="text-subheading font-medium">{link.label}</span>
            </span>

            <span className="flex min-w-0 items-center gap-3 pl-8 xs:pl-0">
              {/*
                Truncation only applies once the row is side-by-side. Stacked on
                a phone the address gets its own line and is shown in full —
                truncating the one string the visitor might want to copy would
                be a strange thing to optimise for.
              */}
              <span
                className={cn(
                  "font-mono text-[0.8125rem] break-all text-ink-3 xs:truncate xs:break-normal",
                  todoClass(link.display),
                )}
              >
                {unavailable ? "Not added yet" : link.display}
              </span>
              {!unavailable && (
                <Icon
                  name="arrow-up-right"
                  size={16}
                  className="hidden shrink-0 text-ink-3 transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent xs:block"
                />
              )}
            </span>
          </>
        );

        const shared =
          "flex min-h-[64px] flex-col justify-center gap-1 border-b border-line py-4 " +
          "xs:flex-row xs:items-center xs:justify-between xs:gap-4 xs:py-5";

        return (
          <li key={link.key}>
            {unavailable ? (
              <span
                className={cn(shared, "cursor-not-allowed text-ink-3")}
                aria-disabled="true"
                title={`${link.label} link not added yet`}
              >
                {row}
              </span>
            ) : (
              <a
                href={href}
                {...(link.key !== "email"
                  ? { target: "_blank", rel: "noreferrer noopener" }
                  : {})}
                className={cn(
                  shared,
                  "group text-ink transition-colors duration-200 hover:text-accent",
                )}
              >
                {row}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}
