import { projects } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeaturedProjectCard } from "@/components/work/ProjectCard";

/**
 * Selected work — two shipped products.
 *
 * The six academic projects were cut deliberately. They were theory, and none
 * of them had a problem statement; a section where six of eight entries open
 * with "this study asks" trains the reader to skim. Two things that exist beat
 * eight things that were considered.
 *
 * An IDENTICAL PAIR, his decision, 18 Aug 2026. Neither project gets a size
 * advantage and neither shows a screenshot here — the real capture is the
 * reward for opening the case study. What separates them is a statement of
 * fact, not a difference of rank: one card is stamped "Live product" and the
 * other "Built · not deployed", in the same type at the same size.
 *
 * No alternation. `reverse` exists for a run of cards where flipping the plate
 * left and right is a rhythm; over exactly two items it is not a rhythm, it is
 * a reader hunting for a second left edge — the second card's title would move
 * 763px to 399px at 1440. Both plates sit left.
 *
 * Order is the ranking, and it lives in content/projects.ts. This maps the
 * array without sorting.
 */
export function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      /* No top rule — see About. It crossed the margin rule and had nothing
         hanging off it. */
      className="section-y"
    >
      <div className="container-counterfoil">
        <SectionHeading
          index="02"
          label="What I have built"
          id="work-title"
          title="Two things I built."
          lede="One is live at quiet-compound.vercel.app and you can open it right now. The other is finished and not deployed, which is stated rather than hidden."
        />

        <div className="mt-12 flex flex-col gap-6">
          {projects.map((project, index) => (
            <FeaturedProjectCard
              key={project.slug}
              project={project}
              delay={index * 60}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
