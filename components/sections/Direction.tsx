import { goals } from "@/content/goals";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Act three — where this is going.
 *
 * Two goals, and the ceiling is the point. He is targeting four job tracks at
 * once, which reads as unfocused; two goals stated one level above those tracks
 * make the same breadth look deliberate. A third entry would undo that, so
 * `content/goals.ts` documents the ceiling rather than leaving it to taste.
 *
 * This replaces the old "currently exploring" section, which was gesturing at
 * the same thing without committing to it — four topics with arrows is a
 * reading list, not a direction.
 */
export function Direction() {
  return (
    <section
      id="direction"
      aria-labelledby="direction-title"
      /* No top rule — see About. It crossed the margin rule and had nothing
         hanging off it. */
      className="section-y"
    >
      <div className="container-counterfoil">
        <SectionHeading
          index="03"
          label="Where I’m going"
          id="direction-title"
          title="Two things, not five."
          lede="Stated at the level above a job title, because the specific title is the part I am least attached to."
        />

        <ol className="grid grid-cols-1 gap-x-14 gap-y-12 md:grid-cols-2">
          {goals.map((goal, index) => (
            <Reveal
              as="li"
              key={goal.index}
              delay={index * 70}
              className="glass rounded-lg p-6 sm:p-7"
            >
              {/* Horizon only. Numbering the goals inside numbered act 03 made
                  the folio numbers mean nothing; the `<ol>` already carries the
                  ordering semantically. */}
              <span className="label-sc text-ink-3">{goal.horizon}</span>
              <h3 className="mt-4 text-heading-sm font-semibold text-ink">
                {goal.title}
              </h3>
              <p className="mt-3 leading-relaxed text-ink-2">{goal.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
