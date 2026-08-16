import { projects } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadProject } from "@/components/work/LeadProject";
import { FeaturedProjectCard, ProjectCard } from "@/components/work/ProjectCard";

/**
 * Selected work.
 *
 * Three tiers, and the tiering is the argument: one lead block for the shipped
 * product a visitor can open and use right now, two wide cards for the next
 * strongest pieces, and a grid for the academic body of work.
 *
 * A flat grid of eight equal cards pushes the ranking decision onto the
 * visitor, and they will not make it — they will scan two and leave. Stating an
 * opinion about which work matters most is this section's real job.
 *
 * There is deliberately no filter UI. The categories already sit on every card,
 * and a filter row costs a click and a decision to reveal work that is one
 * scroll away.
 */
export function Work() {
  const lead = projects.find((project) => project.weight === "flagship");
  const featured = projects.filter((project) => project.weight === "featured");
  const standard = projects.filter((project) => project.weight === "standard");

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="section-y border-t border-line"
    >
      <div className="container-page">
        <SectionHeading
          index="03"
          label="Selected work"
          id="work-title"
          title="Products I've shipped, and the research behind how I think."
          lede="One of these is live and you can open it right now. Where a write-up is not finished, the case study says so instead of filling the gap."
        />

        {lead ? <LeadProject project={lead} /> : null}

        <div className="mt-12 flex flex-col gap-6">
          {featured.map((project, index) => (
            <FeaturedProjectCard
              key={project.slug}
              project={project}
              reverse={index % 2 === 1}
              delay={index * 60}
            />
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {standard.map((project, index) => (
            <ProjectCard key={project.slug} project={project} delay={index * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}
