import { skillGroups } from "@/content/skills";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SubHeading } from "@/components/ui/SubHeading";

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
    <div id="skills" className="mt-20 scroll-mt-24">
      <SubHeading
        label="Capabilities"
        lede="Grouped by what each one is for. Tools appear where I use them for something specific, not to lengthen the list."
      />

        {/* Columns, not a grid.
            A two-column grid aligns rows, so the shorter group in each row is
            padded out to the height of the taller one. With 10 items beside 4,
            that left roughly 360px of nothing under Business & Management.
            Multi-column flows instead of aligning: each group is only as tall
            as its own list, and the columns balance themselves as the content
            changes — which matters here, because these lists get edited.
            `break-inside-avoid` is what stops a group being split across the
            column boundary mid-list. */}
        <div className="lg:columns-2 lg:gap-x-14">
          {skillGroups.map((group, index) => (
            <Reveal
              key={group.id}
              delay={index * 70}
              className="mb-12 break-inside-avoid border-t border-line pt-6 last:mb-0"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-line bg-surface text-accent"
                >
                  <Icon name={group.icon} size={17} />
                </span>
                <h3 className="text-subheading font-medium text-ink">
                  {group.title}
                </h3>
              </div>
              <p className="mt-3.5 max-w-md text-[0.9375rem] leading-relaxed text-ink-2">
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
  );
}
