import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import type { CaseStudySection } from "@/content/types";
import { real } from "@/lib/content";
import { siteDescription } from "@/lib/seo";
import { Icon } from "@/components/ui/Icon";
import { PendingNote } from "@/components/ui/PendingNote";
import { Reveal } from "@/components/ui/Reveal";
import { Tag, TagRow } from "@/components/ui/Tag";
import { ProjectPlate } from "@/components/work/ProjectPlate";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.summary || siteDescription,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.summary,
      url: `/work/${project.slug}`,
    },
  };
}

/**
 * Case study.
 *
 * A single reading column at a comfortable measure, with the metadata pulled
 * out into a panel so it does not interrupt the prose. Sections come straight
 * from the content file, which means a project's write-up is edited in one
 * place and its page rebuilds itself.
 *
 * Sections flagged `pending` render an explicit note rather than filler. That
 * is the entire integrity model of this site: the shape of a finished case
 * study, with the unfinished parts named.
 */
export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const year = real(project.year);
  const externalUrl = real(project.externalUrl);

  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <main id="main" className="page-rails">
      <article>
        <header className="container-page pt-10 pb-12 sm:pt-14">
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 text-[0.875rem] text-ink-3 transition-colors hover:text-ink"
          >
            <Icon
              name="arrow-right"
              size={15}
              className="rotate-180 transition-transform duration-200 group-hover:-translate-x-0.5"
            />
            Back to selected work
          </Link>

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-8">
              <p className="label-sc text-accent">{project.category}</p>
              <h1 className="mt-4 text-title font-medium text-ink">
                {project.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lede leading-relaxed text-ink-2">
                {project.thesis}
              </p>
            </Reveal>

            <Reveal delay={80} className="lg:col-span-4">
              <dl className="rounded-lg border border-line bg-elevated">
                <div className="flex items-baseline justify-between gap-4 border-b border-line px-4 py-3">
                  <dt className="label-sc text-ink-3">Status</dt>
                  <dd>
                    <Tag tone="accent">{project.status}</Tag>
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-line px-4 py-3">
                  <dt className="label-sc text-ink-3">Year</dt>
                  <dd className="text-[0.8125rem] text-ink-2">
                    {year ?? <span className="text-ink-3">To be added</span>}
                  </dd>
                </div>
                <div className="px-4 py-3">
                  <dt className="label-sc text-ink-3">Methods &amp; topics</dt>
                  <dd className="mt-2.5">
                    <TagRow items={project.methods} />
                  </dd>
                </div>
              </dl>

              {externalUrl ? (
                <a
                  href={externalUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-line px-4 py-3 text-[0.875rem] text-ink transition-colors hover:border-line-strong hover:text-accent"
                >
                  {project.externalLabel ?? "View the document"}
                  <Icon name="arrow-up-right" size={15} />
                </a>
              ) : null}
            </Reveal>
          </div>
        </header>

        <div className="container-page">
          <Reveal className="relative aspect-[2/1] overflow-hidden rounded-lg border border-line sm:aspect-[21/9]">
            <ProjectPlate
              kind={project.kind}
              seed={project.slug}
              image={project.image}
              imageAlt={project.imageAlt}
              priority
              size="hero"
              sizes="100vw"
            />
          </Reveal>
        </div>

        <div className="container-page py-14 sm:py-20">
          <div className="max-w-2xl">
            {project.caseStudy.map((section, sectionIndex) => (
              <Section
                key={section.heading}
                section={section}
                index={sectionIndex}
              />
            ))}
          </div>
        </div>
      </article>

      <nav
        aria-label="More work"
        className="container-page border-t border-line py-10"
      >
        <Link
          href={`/work/${next.slug}`}
          className="group flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
        >
          <span className="label-sc text-ink-3">Next project</span>
          <span className="flex items-center gap-3 text-subheading font-medium text-ink transition-colors group-hover:text-accent">
            {next.title}
            <Icon
              name="arrow-right"
              size={18}
              className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </span>
        </Link>
      </nav>
    </main>
  );
}

function Section({
  section,
  index,
}: {
  section: CaseStudySection;
  index: number;
}) {
  return (
    <Reveal
      as="section"
      delay={Math.min(index * 40, 160)}
      className="border-t border-line pt-7 pb-10 first:border-t-0 first:pt-0 last:pb-0"
    >
      <h2 className="text-subheading font-medium text-ink">{section.heading}</h2>

      {section.pending ? (
        <PendingNote hint={section.body?.[0]} />
      ) : (
        <>
          {section.body?.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-4 leading-[1.7] text-ink-2 first:mt-5"
            >
              {paragraph}
            </p>
          ))}

          {section.points ? (
            <ul className="mt-5 flex flex-col gap-3">
              {section.points.map((point) => (
                <li key={point} className="flex gap-3.5 leading-relaxed text-ink-2">
                  <span
                    aria-hidden="true"
                    className="mt-[0.7em] h-px w-3.5 shrink-0 bg-accent-line"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {section.sources ? (
            <ul className="mt-6 flex flex-col gap-1.5 border-t border-line pt-4">
              {section.sources.map((source) => (
                <li key={source.label} className="text-meta text-ink-3">
                  {source.href ? (
                    <a
                      href={source.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link-underline hover:text-ink-2"
                    >
                      {source.label}
                    </a>
                  ) : (
                    source.label
                  )}
                </li>
              ))}
            </ul>
          ) : null}
        </>
      )}
    </Reveal>
  );
}
