import type { Project } from "@/content/types";
import { real } from "@/lib/content";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";
import { Tag, TagRow } from "@/components/ui/Tag";
import { ProjectPlate } from "./ProjectPlate";

/**
 * The lead project — the single strongest piece of work, given a full-width
 * editorial block rather than a card.
 *
 * Unlike every other project on the page, this one is *not* a single wrapping
 * link. It has two genuinely different destinations — the live application and
 * the written case study — and burying one inside a card that navigates
 * somewhere else on click would be a trap. So the block is inert and the two
 * actions are explicit buttons.
 *
 * That also fixes the accessibility problem a "card link with buttons inside"
 * always has: nested interactive elements inside an anchor.
 */
export function LeadProject({ project }: { project: Project }) {
  const year = real(project.year);
  const liveUrl = real(project.externalUrl);

  return (
    <Reveal
      as="article"
      className={cn(
        "folio-product overflow-hidden lg:grid lg:grid-cols-12",
        // The one element allowed to cross and cover the margin rule. Pulled
        // back across the stub so it sits over the ruling the way a plate is
        // glued over the ruling of a bound ledger. Everything else on the page
        // respects the rule absolutely; this exception carries the whole
        // hierarchy argument and costs one z-index.
        // Left only. Pulling both sides overflows the viewport, because only
        // the left has a stub to absorb it.
        "-ml-[calc(var(--stub)+var(--stub-gap))]",
      )}
    >
      <div className="relative aspect-[16/10] border-b border-line lg:col-span-6 lg:aspect-auto lg:min-h-[380px] lg:border-r lg:border-b-0">
        <ProjectPlate
          kind={project.kind}
          seed={project.slug}
          image={project.image}
          imageAlt={project.imageAlt}
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>

      <div className="flex flex-col justify-center p-6 sm:p-9 lg:col-span-6">
        <div className="well flex flex-wrap items-center gap-x-3 gap-y-2 px-3 py-2">
          <Tag tone="accent">{project.status}</Tag>
          <span className="label-sc text-ink-3">{project.category}</span>
          {year ? <span className="label-sc text-ink-3">{year}</span> : null}
        </div>

        <h3 className="mt-5 text-heading-sm font-medium text-ink">{project.title}</h3>

        <p className="mt-4 max-w-xl text-lede leading-relaxed text-ink-2">
          {project.thesis}
        </p>

        <TagRow items={project.methods} className="mt-6" />

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {liveUrl ? (
            <ButtonLink
              href={liveUrl}
              external
              target="_blank"
              rel="noreferrer noopener"
              icon="arrow-up-right"
            >
              {project.externalLabel ?? "Open the live app"}
            </ButtonLink>
          ) : null}

          <ButtonLink
            href={`/work/${project.slug}`}
            variant={liveUrl ? "secondary" : "primary"}
            icon="arrow-right"
          >
            Read the case study
          </ButtonLink>
        </div>
      </div>
    </Reveal>
  );
}
