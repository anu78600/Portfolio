import { learning } from "@/content/education";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Currently exploring.
 *
 * Early-career profiles are judged on trajectory as much as on record, and this
 * is the only section that speaks to trajectory directly. Each item names the
 * topic *and* what it is being pointed at — "Agentic AI → business automation"
 * says something a bare noun does not.
 *
 * The status dot does not pulse. A permanently animating element earns
 * attention it cannot repay, and the section is already legible as current.
 */
export function Exploring() {
  return (
    <section
      aria-labelledby="exploring-title"
      className="section-y border-t border-line"
    >
      <div className="container-page">
        <SectionHeading
          index="06"
          label="Currently exploring"
          id="exploring-title"
          title="What I'm working on next."
        />

        <ul className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {learning.map((item, index) => (
            <Reveal
              as="li"
              key={item.topic}
              delay={index * 60}
              className="border-t border-line pt-5"
            >
              <span className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-line bg-surface text-accent"
                >
                  <Icon name={item.icon} size={15} />
                </span>
                <span className="label-mono text-ink-3">In progress</span>
              </span>

              <h3 className="mt-4 text-subheading font-medium text-ink">
                {item.topic}
              </h3>

              <p className="mt-2 flex items-center gap-1.5 text-[0.875rem] font-medium text-accent">
                <Icon name="arrow-right" size={14} className="shrink-0" />
                {item.applicationTo}
              </p>

              <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-2">
                {item.detail}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
