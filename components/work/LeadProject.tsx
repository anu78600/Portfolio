import type { Project } from "@/content/types";
import { real } from "@/lib/content";
import { ButtonLink } from "@/components/ui/Button";
import { Prose } from "@/components/ui/Prose";
import { Reveal } from "@/components/ui/Reveal";
import { TagRow } from "@/components/ui/Tag";
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
  /* Derived, not typed out. A hardcoded hostname in a component that takes a
     project as a prop is a caption that lies the moment the lead changes. */
  const liveHost = liveUrl?.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    /* The pull lives on a wrapper, not on the plate, so the caption below moves
       with it and stays aligned to the plate's left edge rather than the
       column's.

       The one element allowed to cross and cover the margin rule: pulled back
       across the stub so it sits over the ruling the way a plate is glued over
       the ruling of a bound ledger. Everything else on the page respects the
       rule absolutely; this exception carries the whole hierarchy argument and
       costs one z-index. Left only — pulling both sides overflows the viewport,
       because only the left has a stub to absorb it.

       From `sm` only. `container-counterfoil` stopped reserving the stub below
       40rem, so on every phone this was a 68px pull against an 18px gutter: the
       plate hung 50px off the left edge with its contents clipped and
       unreachable, and there was no margin rule down there for it to cross in
       the first place. `scrollWidth` never saw it — content left of the origin
       is clipped, not scrolled to — so the harness reported green until the
       left-edge probe was added. */
    <div className="sm:-ml-[calc(var(--stub)+var(--stub-gap))]">
      <Reveal
        as="article"
        className="folio-product overflow-hidden lg:grid lg:grid-cols-12"
      >
        {/* The mat.

            The figure now carries the asset's own ratio and floats in the
            plate's ground, so the screenshot's blue-black never shares an edge
            with the plate's warm black — the mat is the transition between two
            colour worlds that were previously butted straight together.

            Before this, the column had no ratio of its own: it stretched to
            whatever height the prose reached, and a landscape capture was
            poured into the portrait box that produced. The crop was therefore
            decided by copy length, and `object-cover` centred it on the empty
            gutter between the app's two panels. It is now decided by the asset.

            `5cqi` finally consumes the `container-type: inline-size` declared on
            `.folio-product`, which had no consumer: the mat scales with the
            plate rather than with the viewport. */}
        <div className="relative flex items-center justify-center border-b border-line p-[clamp(1.25rem,5cqi,2.25rem)] lg:col-span-6 lg:border-r lg:border-b-0">
          <div className="relative aspect-[13/15] w-full overflow-hidden rounded-[2px] border border-line">
            <ProjectPlate
              kind={project.kind}
              seed={project.slug}
              image={project.imageDetail ?? project.image}
              imageAlt={project.imageDetailAlt ?? project.imageAlt}
              priority
              sizes="(min-width: 1024px) 34vw, 82vw"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-9 lg:col-span-6">
          {/* Not a well. A recess claims "below the surface", which is a strange
              thing to say about a category label — and `--well-shadow` is
              tuned for cream, so inside the always-dark plate it painted a
              70%-white hairline across near-black. That was the loudest single
              reason the metadata read as bolted on. A stamped line under a rule
              is more Counterfoil, and it cannot orphan the year: a no-break
              space glues the year to the category. */}
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-line pb-2.5">
            <span className="label-sc text-ink-2">{project.status}</span>
            <span className="label-sc text-ink-3">
              {project.category}
              {year ? (
                <span className="whitespace-nowrap">{" · " + year}</span>
              ) : null}
            </span>
          </div>

          <h3 className="mt-5 text-heading-sm font-medium text-ink">
            {project.title}
          </h3>

          <p className="mt-4 max-w-xl text-lede leading-relaxed text-ink-2">
            <Prose>{project.thesis}</Prose>
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

      {/* A plate caption — the most credible-looking text object in publishing,
          and the thing that tells a reader the dark rectangle is a reproduction
          of another application rather than a panel of this page. That is most
          of why the hue difference stops reading as a fault. */}
      <p className="mt-3 font-sans text-[0.875rem] leading-normal text-ink-2">
        {project.title}, entry view.
        {liveHost ? (
          <span className="text-ink-3"> Live at {liveHost}.</span>
        ) : null}
      </p>
    </div>
  );
}
