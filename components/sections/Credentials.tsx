import Link from "next/link";
import { education } from "@/content/education";
import { real } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SubHeading } from "@/components/ui/SubHeading";

/**
 * The academic record. Education only.
 *
 * The five certifications used to sit beside this in a second column and were
 * moved to /resume on 19 Aug 2026, along with the whole Capabilities block.
 * They were not deleted — /resume already rendered both in full — they stopped
 * being the first thing a reader met.
 *
 * The reasoning, measured rather than felt: at 390px this act ran 7,721px
 * against 1,751px for the section about what he has actually built, and the
 * words "Quiet Compound" first appeared 12.2 screens down a 16.2-screen page.
 * Hiring-manager survey evidence says they read the intro and then look for
 * proof; the proof was ten screens behind the intro.
 *
 * Education stays because it is the one inventory item that is genuinely load
 * bearing for an early-career candidate: two degrees with checkable standings
 * and a third in progress. macwright.com and maggieappleton.com both carry no
 * education at all — but both are established, and can afford to.
 */
export function Credentials() {
  return (
    <div id="credentials" className="mt-20 scroll-mt-24">
      <SubHeading
        label="On the record"
        lede="Three degrees, with the standings that can be checked."
      />

        <div className="grid grid-cols-1 gap-x-14 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h3 className="label-sc flex items-center gap-2 text-ink-3">
              <Icon name="graduation-cap" size={15} className="text-accent" />
              Education
            </h3>
            <ol className="mt-5">
              {education.map((item, index) => {
                const period = real(item.period);
                return (
                  <Reveal
                    as="li"
                    key={item.id}
                    delay={index * 70}
                    className="border-t border-line py-6 first:pt-0 last:pb-0"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <h4 className="text-subheading font-medium text-ink">
                        {item.qualification}
                      </h4>
                      <span className="label-sc shrink-0 text-ink-3">
                        {period ?? "Years to be added"}
                      </span>
                    </div>

                    {item.specialisation ? (
                      <p className="mt-2 text-[0.9375rem] text-accent">
                        {item.specialisation}
                      </p>
                    ) : null}

                    {/* Through `real`. A course can be entered before its
                        institution is confirmed — the LLB is — and an
                        unguarded field prints the placeholder on screen. */}
                    {real(item.institution) ? (
                      <p className="mt-1.5 text-[0.9375rem] text-ink-2">
                        {real(item.institution)}
                      </p>
                    ) : null}

                    {item.note ? (
                      <p className="mt-3 max-w-xl text-[0.875rem] leading-relaxed text-ink-3">
                        {item.note}
                      </p>
                    ) : null}
                  </Reveal>
                );
              })}
            </ol>
          </div>

          {/* Everything else is on the resume, and said so plainly. A
              reader who wants the full inventory should not have to guess that
              it exists. */}
          <div className="lg:col-span-5">
            <h3 className="label-sc flex items-center gap-2 text-ink-3">
              <Icon name="award" size={15} className="text-accent" />
              Also on the record
            </h3>
            <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-ink-2">
              Five certificates and the full capability inventory — tools,
              methods and the things I am only interested in so far — are set
              out on the resume, where a list belongs.
            </p>
            <Link
              href="/resume"
              className="mt-5 inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-accent"
            >
              Read the resume
              <Icon name="arrow-up-right" size={14} />
            </Link>
          </div>
      </div>
    </div>
  );
}
