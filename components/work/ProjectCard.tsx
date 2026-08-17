import Link from "next/link";
import type { Project } from "@/content/types";
import { real } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { TagRow } from "@/components/ui/Tag";
import { ProjectPlate } from "./ProjectPlate";

/**
 * Every card is a single link with no nested interactive elements, so the whole
 * surface is one tab stop and one target — the pattern that survives both
 * keyboard navigation and a thumb on a phone.
 */
const cardShell =
  /* `overflow-clip`, NOT `overflow-hidden`. Both clip to the same padding box
     and honour the same radius, but `hidden` is a SCROLL CONTAINER: any
     `animation-timeline: view()` inside this anchor would re-parent to it, and
     an anchor never scrolls — so the animation pins at a constant and nothing
     moves, while getAnimations() still lists it and playState still reads
     "running". Measured on this exact shell at 13 scroll positions: source
     A.group…, progress 1.000, scale 1 throughout. Indistinguishable from
     forgetting to write the CSS. */
  "group flex h-full flex-col overflow-clip rounded-lg border border-line bg-elevated " +
  "transition-[border-color,box-shadow,transform] duration-300 ease-[var(--ease-out)] " +
  "hover:border-line-hover hover:shadow-[var(--shadow-elevated)]";

const plateMotion =
  "transition-transform duration-[600ms] ease-[var(--ease-out)] group-hover:scale-[1.03]";

/**
 * Status is a fact, so both cards state it in identical type at identical size
 * and only the ink differs. Without this the two cards were separated by
 * nothing at all: `CardMeta` rendered category and year only, while the section
 * lede directly above asserts that one of the two is live. A reader had even
 * odds of attributing "live" to the app that was never deployed — on a site
 * whose entire claim is that nothing is invented.
 */
function CardMeta({ project }: { project: Project }) {
  const year = real(project.year);
  const live = project.status === "Live product";

  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
      <span
        className={cn(
          "label-sc rounded-sm border px-1.5 py-px",
          live
            ? "border-accent-line text-accent"
            : "border-line-strong text-ink-3",
        )}
      >
        {project.status}
      </span>
      <span className="label-sc truncate text-ink-3">{project.category}</span>
      {year ? (
        <span className="label-sc ml-auto shrink-0 text-ink-3">{year}</span>
      ) : null}
    </div>
  );
}

function CardCta({ label = "View case study" }: { label?: string }) {
  return (
    <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[0.875rem] font-medium text-accent">
      {label}
      <Icon
        name="arrow-up-right"
        size={14}
        className="transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </span>
  );
}

/**
 * The wide card. Both projects get this one, at the same size.
 *
 * Neither card shows a photograph. The drawn figure is forced rather than
 * merely un-passed: `ProjectPlate` prefers a real `image` whenever it is given
 * one, so a future edit that innocently re-adds `image={project.image}` would
 * silently undo the decision to keep the capture behind the click.
 */
export function FeaturedProjectCard({
  project,
  delay = 0,
}: {
  project: Project;
  delay?: number;
}) {
  return (
    <Reveal as="article" delay={delay}>
      <Link href={`/work/${project.slug}`} className={cn(cardShell, "md:grid md:grid-cols-12")}>
        <div className="relative aspect-[16/10] overflow-clip border-b border-line md:col-span-5 md:aspect-auto md:min-h-[280px] md:border-r md:border-b-0">
          <ProjectPlate
            figure={project.figure}
            drawn
            className={plateMotion}
          />
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-8 md:col-span-7">
          <CardMeta project={project} />
          <h3 className="mt-3 text-heading-sm font-medium text-ink transition-colors duration-200 group-hover:text-accent">
            {project.title}
          </h3>
          <p className="mt-4 max-w-xl text-lede text-ink-2">{project.summary}</p>
          <TagRow items={project.methods} className="mt-6" />
          <CardCta />
        </div>
      </Link>
    </Reveal>
  );
}
