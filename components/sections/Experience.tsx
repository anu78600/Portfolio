import { experience } from "@/content/experience";
import { real } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="section-y border-t border-line"
    >
      <div className="container-page">
        <SectionHeading
          index="02"
          label="Experience"
          id="experience-title"
          title="Inside an HR function."
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
                  <h3 className="text-subheading font-medium text-ink">
                    {item.organisation}
                  </h3>
                  <p className="label-mono mt-2 text-ink-3">
                    {period ?? "Dates to be added"}
                  </p>
                  {location ? (
                    <p className="mt-1 text-[0.8125rem] text-ink-3">{location}</p>
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
    </section>
  );
}
