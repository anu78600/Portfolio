import { experience } from "@/content/experience";
import { real } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SubHeading } from "@/components/ui/SubHeading";
import { TagRow } from "@/components/ui/Tag";

/**
 * Experience.
 *
 * An editorial two-column record rather than a decorated timeline. With one
 * entry, a timeline with a lone dot on a vertical line looks like a mistake;
 * this layout reads as deliberate at one entry and still works at five.
 *
 * The internship is described exactly as it was. Nothing here is inflated into
 * ownership or impact it did not have — an obviously honest junior entry is
 * more persuasive than an obviously inflated one.
 */
export function Experience() {
  return (
    <div className="mt-16">
      <SubHeading
        label="Roles"
        lede="Reverse chronological. Two of the three are AI work."
      />

        <ol className="flex flex-col gap-12">
          {experience.map((item, index) => {
            const period = real(item.period);
            const location = real(item.location);

            return (
              <Reveal
                as="li"
                key={item.id}
                delay={index * 80}
                className="grid grid-cols-1 gap-6 border-t border-line pt-8 lg:grid-cols-12 lg:gap-10"
              >
                <div className="lg:col-span-4">
                  {/* Editorial numbering: the roles read as a sequence rather
                      than as three unrelated blocks, and the badge gives the
                      left column a fixed optical start. */}
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="label-sc grid h-8 w-8 shrink-0 place-items-center rounded-md border border-line bg-surface text-accent"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-subheading font-medium text-ink">
                      {item.organisation}
                    </h3>
                  </div>

                  <p className="label-sc mt-3.5 text-ink-3">
                    {period ?? "Dates to be added"}
                  </p>
                  {location ? (
                    <p className="mt-1.5 flex items-center gap-1.5 text-[0.8125rem] text-ink-3">
                      <Icon name="map-pin" size={13} className="shrink-0" />
                      {location}
                    </p>
                  ) : null}
                </div>

                <div className="lg:col-span-8">
                  <p className="text-lede font-medium text-ink">{item.role}</p>
                  <p className="mt-3 max-w-2xl leading-relaxed text-ink-2">
                    {item.summary}
                  </p>

                  <ul className="mt-6 flex flex-col gap-3">
                    {item.contributions.map((contribution) => (
                      <li
                        key={contribution}
                        className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-2"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.6em] h-px w-3 shrink-0 bg-accent-line"
                        />
                        <span>{contribution}</span>
                      </li>
                    ))}
                  </ul>

                  <TagRow items={item.skills} className="mt-6" />
                </div>
              </Reveal>
            );
          })}
      </ol>
    </div>
  );
}
