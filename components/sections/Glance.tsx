import { glance } from "@/content/glance";

/**
 * The at-a-glance band — the section a scanner judges in one second.
 *
 * This replaced the Snapshot strip, which was five cells of label-plus-sentence
 * prose: accurate, but text answering a glance with more text. Numerals answer
 * it. Each one counts up from zero as the band scrolls in (Chromium; everyone
 * else sees the settled number, which is also what reduced-motion and print
 * get), and the real value sits in the DOM for screen readers and copy-paste —
 * the animated digits are aria-hidden paint.
 *
 * The hairline lattice is one background trick: `gap-px` over a border-colour
 * ground, cells painted `bg-bg`. Every breakpoint gets correct hairlines with
 * zero border arithmetic.
 */
export function Glance() {
  return (
    <section aria-label="At a glance" className="border-y border-line">
      <div className="container-counterfoil">
        <dl className="grid grid-cols-2 gap-px overflow-clip bg-line sm:grid-cols-5">
          {glance.map((stat) => (
            <div
              key={stat.label}
              /* Five cells in a two-column lattice leave one empty slot showing
                  the gap ground through it; the last cell spans the pair on
                  phones and the lattice closes. */
              className="flex flex-col gap-1 bg-bg px-4 py-6 last:col-span-2 sm:px-5 sm:last:col-span-1"
            >
              <dd className="font-sans text-[2rem] leading-none font-semibold text-ink sm:text-[2.375rem]">
                <span
                  aria-hidden="true"
                  className="count-up"
                  style={
                    {
                      "--count": stat.n,
                    } as React.CSSProperties
                  }
                />
                {stat.suffix ? (
                  <span aria-hidden="true" className="text-accent">
                    {stat.suffix}
                  </span>
                ) : null}
                <span className="sr-only">
                  {stat.n}
                  {stat.suffix ?? ""}
                </span>
              </dd>
              <dt className="label-sc text-ink-3">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
