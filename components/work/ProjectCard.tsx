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
  "group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-elevated " +
  "transition-[border-color,box-shadow,transform] duration-300 ease-[var(--ease-out)] " +
  "hover:border-line-hover hover:shadow-[var(--shadow-elevated)]";

const plateMotion =
  "transition-transform duration-[600ms] ease-[var(--ease-out)] group-hover:scale-[1.03]";

function CardMeta({ project }: { project: Project }) {
  const year = real(project.year);
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="label-sc truncate text-ink-3">{project.category}</span>
      {year ? <span className="label-sc shrink-0 text-ink-3">{year}</span> : null}
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

export function ProjectCard({
  project,
  delay = 0,
}: {
  project: Project;
  delay?: number;
}) {
  return (
    <Reveal as="article" delay={delay} className="h-full">
      <Link href={`/work/${project.slug}`} className={cardShell}>
        <div className="relative aspect-[16/10] shrink-0 overflow-hidden border-b border-line">
          <ProjectPlate
            kind={project.kind}
            seed={project.slug}
            image={project.image}
            imageAlt={project.imageAlt}
            className={plateMotion}
          />
        </div>

        <div className="flex flex-1 flex-col p-5">
          <CardMeta project={project} />
          <h3 className="mt-3 text-subheading font-medium text-ink transition-colors duration-200 group-hover:text-accent">
            {project.title}
          </h3>
          <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-2">
            {project.summary}
          </p>
          <TagRow items={project.methods.slice(0, 3)} className="mt-5" />
          <CardCta />
        </div>
      </Link>
    </Reveal>
  );
}

/**
 * The wide variant. Alternating the plate between left and right gives the
 * section a rhythm without needing a different card design for each project.
 */
export function FeaturedProjectCard({
  project,
  reverse = false,
  delay = 0,
}: {
  project: Project;
  reverse?: boolean;
  delay?: number;
}) {
  return (
    <Reveal as="article" delay={delay}>
      <Link href={`/work/${project.slug}`} className={cn(cardShell, "md:grid md:grid-cols-12")}>
        <div
          className={cn(
            "relative aspect-[16/10] overflow-hidden border-b border-line md:col-span-5 md:aspect-auto md:min-h-[280px] md:border-b-0",
            reverse ? "md:order-2 md:border-l" : "md:border-r",
          )}
        >
          <ProjectPlate
            kind={project.kind}
            seed={project.slug}
            image={project.image}
            imageAlt={project.imageAlt}
            className={plateMotion}
          />
        </div>

        <div
          className={cn(
            "flex flex-col justify-center p-6 sm:p-8 md:col-span-7",
            reverse && "md:order-1",
          )}
        >
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
