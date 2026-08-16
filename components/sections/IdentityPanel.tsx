import Image from "next/image";
import { profile } from "@/content/profile";
import { leadProject } from "@/content/projects";
import { initialsFrom, real } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

/**
 * The hero's right-hand column.
 *
 * Not a portrait card. A recruiter's first question is "what is this person
 * for", not "what do they look like", so the panel is built as a compact
 * professional record in the register of a product interface.
 *
 * The important decision here is what occupies the space when no photograph
 * has been supplied. Reserving a large empty frame for an absent image is the
 * single fastest way to make a site look unfinished — so instead the panel
 * gives that space to the strongest verifiable fact available: a live product,
 * linked, above the fold. When a photograph does exist it takes the top of the
 * panel and everything else still holds.
 */

interface Row {
  label: string;
  value: string | null;
}

export function IdentityPanel() {
  const initials = initialsFrom(profile.name, profile.initials);
  const portrait = real(profile.portrait);
  const availability = real(profile.availability);
  const liveUrl = real(leadProject.externalUrl);

  const rows: Row[] = [
    { label: "Focus", value: "Agentic AI · Analytics · Finance" },
    { label: "Education", value: "MBA (HR + IB) · BCA" },
    { label: "Based", value: real(profile.location) },
  ];

  return (
    <div className="relative">
      {/* Offset hairline frame — depth without a drop shadow or a glass effect. */}
      <div
        aria-hidden="true"
        className="absolute -top-3 -right-3 bottom-3 left-3 rounded-lg border border-line"
      />

      <figure className="relative overflow-hidden rounded-lg border border-line bg-elevated shadow-[var(--shadow-elevated)]">
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
          <span className="label-sc text-ink-3">Profile</span>
          {availability ? (
            <span className="flex items-center gap-2 text-right text-[0.75rem] text-ink-2">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
              />
              {availability}
            </span>
          ) : null}
        </div>

        {portrait ? (
          <div className="relative aspect-[4/5] w-full bg-sunken">
            <Image
              src={portrait}
              alt={profile.portraitAlt}
              fill
              priority
              sizes="(min-width: 1024px) 32rem, 100vw"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex items-center gap-4 border-b border-line px-4 py-5">
            <span
              aria-hidden="true"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-md border border-line-strong font-mono text-[0.9375rem] font-medium text-accent"
            >
              {initials}
            </span>
            <span className="min-w-0">
              <span className="block truncate font-medium text-ink">
                {profile.name}
              </span>
              <span className="block truncate text-[0.8125rem] text-ink-3">
                {profile.jobTitle}
              </span>
            </span>
          </div>
        )}

        <figcaption>
          <dl className="divide-y divide-line">
            {rows.map((row) => (
              <div key={row.label} className="flex items-baseline gap-4 px-4 py-3">
                <dt className="label-sc w-20 shrink-0 text-ink-3">{row.label}</dt>
                <dd className="min-w-0 flex-1 text-right text-[0.8125rem] text-ink-2">
                  {row.value ?? <span className="text-ink-3">Not added yet</span>}
                </dd>
              </div>
            ))}
          </dl>
        </figcaption>

        {/*
          The live product, surfaced above the fold. It is the most verifiable
          thing on the whole profile and it costs one click to check — so it
          does not wait until the Work section to be mentioned.
        */}
        {liveUrl ? (
          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="group flex items-center gap-4 border-t border-line bg-surface px-4 py-4 transition-colors duration-200 hover:bg-sunken"
          >
            <span className="min-w-0 flex-1">
              <span className="label-sc flex items-center gap-2 text-accent">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-accent"
                />
                Live now
              </span>
              <span className="mt-1.5 block truncate font-medium text-ink">
                {leadProject.title}
              </span>
              <span className="mt-0.5 block truncate text-[0.8125rem] text-ink-3">
                Trades, cards, udhar · local-first
              </span>
            </span>
            <Icon
              name="arrow-up-right"
              size={18}
              className={cn(
                "shrink-0 text-ink-3 transition-transform duration-200 ease-[var(--ease-out)]",
                "group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent",
              )}
            />
            <span className="sr-only">— opens the live app in a new tab</span>
          </a>
        ) : null}
      </figure>
    </div>
  );
}
