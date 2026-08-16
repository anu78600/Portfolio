import { aboutBlocks } from "@/content/profile";
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
      className="section-y border-t border-line"
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
              <div className="flex items-baseline gap-3">
                <span className="label-sc text-accent">
                  {block.index}
                </span>
                <h3 className="text-subheading font-medium text-ink">
                  {block.title}
                </h3>
              </div>
              <p className="mt-4 leading-relaxed text-ink-2">{block.body}</p>
            </Reveal>
          ))}
        </div>
        {children}
      </div>
    </section>
  );
}
