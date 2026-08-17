import { aboutBlocks } from "@/content/profile";
import { Prose } from "@/components/ui/Prose";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Act one — what I have done.
 *
 * Opens with the four numbered blocks, then carries Roles, Capabilities and
 * On-the-record as children rather than as sibling sections, so the page keeps
 * exactly three numbered movements instead of eight equal chapters.
 *
 * Four short, numbered movements — background, method, learning, direction —
 * instead of one autobiographical block. A recruiter reads the one they care
 * about and skips the rest, which is how this section is actually used.
 */
export function About({ children }: { children?: React.ReactNode }) {
  return (
    <section
      id="record"
      aria-labelledby="record-title"
      /* No top rule. It is a full-bleed hairline, so it crossed the vermilion
         margin rule — which the plate is supposed to be the only thing on the
         page permitted to cross. `section-y` already separates the acts by
         128px, and the folio number names them, so this rule had nothing
         hanging off it: the site's own test for whether a rule has earned its
         place. */
      className="section-y"
    >
      <div className="container-counterfoil">
        <SectionHeading
          index="01"
          label="What I have done"
          id="record-title"
          title="Two disciplines, pointed at one question."
          lede="A computer applications degree and an MBA, aimed at the same problem: how organisations actually make decisions, and what changes when AI is in the loop."
        />

        <div className="grid grid-cols-1 gap-x-14 gap-y-10 md:grid-cols-2">
          {aboutBlocks.map((block, index) => (
            <Reveal
              key={block.index}
              delay={index * 70}
              className="border-t border-line pt-6"
            >
              {/* No folio number here. Only acts are numbered — three of them.
                  With these numbered too a reader saw "01 What I have done" and
                  "01 Background" on the same screen, and the numbering stopped
                  meaning "one of three movements". `block.index` survives in
                  the content file as the sort key. */}
              <h3 className="text-subheading font-medium text-ink">
                {block.title}
              </h3>
              <p className="mt-4 leading-relaxed text-ink-2">
                <Prose>{block.body}</Prose>
              </p>
            </Reveal>
          ))}
        </div>
        {children}
      </div>
    </section>
  );
}
