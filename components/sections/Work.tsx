import { projects } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadProject } from "@/components/work/LeadProject";
import { FeaturedProjectCard, ProjectCard } from "@/components/work/ProjectCard";

/**
 * Selected work — two shipped products.
 *
 * The six academic projects were cut deliberately. They were theory, and none
 * of them had a problem statement; a section where six of eight entries open
 * with "this study asks" trains the reader to skim. Two things that exist beat
 * eight things that were considered.
 *
 * The lead block and the wide card carry the ranking argument between them:
 * one product gets a live link and a full treatment, the other gets a card and
 * an honest note that it was never deployed.
 */
export function Work() {
  const lead = projects.find((project) => project.weight === "flagship");
  const featured = projects.filter((project) => project.weight === "featured");

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
          title="Two things I built."
          lede="One is live and you can open it right now. The other is finished and not deployed, which is stated rather than hidden."
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

      </div>
    </section>
  );
}
