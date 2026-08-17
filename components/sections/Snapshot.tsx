import { domains } from "@/content/profile";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Professional snapshot.
 *
 * The rapid-scan band directly under the hero: five capability domains, each
 * with one line of substantiation. Capability statements rather than numbers —
 * there is no honest metric to put here, and an invented "5+ years" or
 * "20 projects" is exactly what makes a portfolio unbelievable.
 *
 * Built as a hairline-divided band rather than five cards, so it reads as one
 * instrument panel instead of fragmenting the page right below the hero.
 */

/**
 * Dividers change orientation with the grid: horizontal rules when the list is
 * stacked, vertical rules once it becomes a row. Each breakpoint writes its own
 * complete set of border/padding classes so no two conflicting utilities are
 * ever emitted for the same variant.
 */
function cellClasses(index: number) {
  const stacked = index > 0 && "border-t border-line";

  const twoUp =
    index % 2 === 0
      ? "sm:border-l-0 sm:pl-0"
      : "sm:border-l sm:border-line sm:pl-6";
  const twoUpTop = index === 1 && "sm:border-t-0";

  const fiveUp =
    index === 0
      ? "lg:border-t-0 lg:border-l-0 lg:pl-0"
      : "lg:border-t-0 lg:border-l lg:border-line lg:pl-6";

  return cn("flex flex-col gap-2 py-6 pr-4", stacked, twoUp, twoUpTop, fiveUp);
}

export function Snapshot() {
  return (
    <section aria-label="Professional snapshot">
      <div className="container-counterfoil">
        {/* The band's rules live on the list, not the section. On the section
            they were full-bleed and cut straight through the vermilion margin
            rule; the list sits inside `container-counterfoil`, so they now
            start after it and the vertical rule stays unbroken. */}
        <ul className="grid grid-cols-1 border-y border-line sm:grid-cols-2 lg:grid-cols-5">
          {domains.map((domain, index) => (
            <Reveal
              as="li"
              key={domain.label}
              delay={index * 45}
              className={cellClasses(index)}
            >
              <span className="label-sc text-ink-3">{domain.label}</span>
              <span className="text-[0.9375rem] leading-snug text-balance text-ink">
                {domain.detail}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
