import { skillGroups } from "@/content/skills";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Capabilities.
 *
 * Grouped by what the skill is *for*, with a line of context on the ones where
 * context is meaningful. No proficiency bars: a self-assigned "Excel — 90%"
 * is unverifiable and reads as padding, and the certifications section below
 * carries the claims that can actually be checked.
 */
export function Capabilities() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="section-y border-t border-line"
    >
      <div className="container-page">
        <SectionHeading
          index="04"
          label="Capabilities"
          id="skills-title"
          title="Grouped by what each one is for."
          lede="Tools are listed where I use them for something specific, not to lengthen the list."
        />

        <div className="grid grid-cols-1 gap-x-14 gap-y-12 lg:grid-cols-2">
          {skillGroups.map((group, index) => (
            <Reveal
              key={group.id}
              delay={index * 70}
              className="border-t border-line pt-6"
            >
              <h3 className="text-subheading font-medium text-ink">
                {group.title}
              </h3>
              <p className="mt-2.5 max-w-md text-[0.9375rem] leading-relaxed text-ink-2">
                {group.description}
              </p>

              <ul className="mt-6">
                {/*
                  Stacked at the narrowest widths, paired from 480px up. The
                  note is only held on one line (`shrink-0`) once there is room
                  for it — at 320px an unshrinkable note forced the row wider
                  than the viewport and pushed the whole page into horizontal
                  scroll.
                */}
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex flex-col gap-0.5 border-b border-line py-2.5 last:border-b-0 xs:flex-row xs:items-baseline xs:justify-between xs:gap-6"
                  >
                    <span className="text-[0.9375rem] text-ink">{item.name}</span>
                    {item.note ? (
                      <span className="text-[0.8125rem] text-ink-3 xs:shrink-0 xs:text-right">
                        {item.note}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
