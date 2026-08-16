import type { Metadata } from "next";
import Link from "next/link";
import { certifications, education, learning } from "@/content/education";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { mailto, real } from "@/lib/content";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PrintButton } from "@/components/site/PrintButton";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "A plain, printable résumé — education, experience, projects, skills and certifications.",
  alternates: { canonical: "/resume" },
};

/**
 * Résumé view.
 *
 * This is the "resume mode" the brief asked about, built as a route rather than
 * a toggle on the homepage. A toggle would have to unwind every layout decision
 * on the main page and would leave the visitor unsure which version they are
 * looking at; a dedicated URL is shareable, linkable, printable, and honest
 * about what it is.
 *
 * It renders from exactly the same content files as the homepage, so the two
 * can never drift apart. Print rules in globals.css strip the site chrome and
 * flatten the palette to ink on paper.
 */
export default function ResumePage() {
  const emailHref = mailto(profile.email);
  const email = real(profile.email);
  const location = real(profile.location);
  const resumePdf = real(profile.resumePdf);

  const contactLinks = profile.socials
    .filter((social) => social.key !== "email")
    .map((social) => ({ ...social, url: real(social.href) }))
    .filter((social) => social.url);

  return (
    <main id="main" className="container-page py-10 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <div
          data-print="hide"
          className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-[0.875rem] text-ink-3 transition-colors hover:text-ink"
          >
            <Icon
              name="arrow-right"
              size={15}
              className="rotate-180 transition-transform duration-200 group-hover:-translate-x-0.5"
            />
            Back to the site
          </Link>

          <div className="flex items-center gap-2">
            <PrintButton />
            {resumePdf ? (
              <ButtonLink
                href={resumePdf}
                external
                download
                size="sm"
                icon="download"
                iconPosition="leading"
              >
                Download PDF
              </ButtonLink>
            ) : null}
          </div>
        </div>

        <article className="text-ink">
          {/* Header */}
          <header>
            <h1 className="text-heading font-medium">{profile.name}</h1>
            <p className="mt-2 text-lede text-ink-2">{profile.jobTitle}</p>

            <ul className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.875rem] text-ink-2">
              {email ? (
                <li>
                  <a
                    href={emailHref!}
                    data-print-url
                    className="link-underline hover:text-accent"
                  >
                    {email}
                  </a>
                </li>
              ) : null}
              {contactLinks.map((social) => (
                <li key={social.key}>
                  <a
                    href={social.url!}
                    target="_blank"
                    rel="noreferrer noopener"
                    data-print-url
                    className="link-underline hover:text-accent"
                  >
                    {social.display}
                  </a>
                </li>
              ))}
              {location ? <li>{location}</li> : null}
            </ul>
          </header>

          <Block title="Profile">
            <p className="leading-relaxed text-ink-2">{profile.headline}</p>
            {profile.intro.map((line) => (
              <p key={line} className="mt-3 leading-relaxed text-ink-2">
                {line}
              </p>
            ))}
          </Block>

          <Block title="Experience">
            <ol className="flex flex-col gap-6">
              {experience.map((item) => {
                const period = real(item.period);
                const itemLocation = real(item.location);
                return (
                  <li key={item.id}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="font-medium">
                        {item.role}
                        <span className="text-ink-3"> · </span>
                        {item.organisation}
                      </h3>
                      <span className="label-mono text-ink-3">
                        {[period, itemLocation].filter(Boolean).join(" · ") ||
                          "Dates to be added"}
                      </span>
                    </div>
                    <ul className="mt-3 flex flex-col gap-1.5">
                      {item.contributions.map((contribution) => (
                        <li
                          key={contribution}
                          className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-ink-2"
                        >
                          <span aria-hidden="true" className="text-ink-3">
                            —
                          </span>
                          <span>{contribution}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ol>
          </Block>

          <Block title="Education">
            <ol className="flex flex-col gap-4">
              {education.map((item) => {
                const period = real(item.period);
                return (
                  <li key={item.id}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="font-medium">
                        {item.qualification}
                        {item.specialisation ? (
                          <span className="font-normal text-ink-2">
                            {" "}
                            — {item.specialisation}
                          </span>
                        ) : null}
                      </h3>
                      <span className="label-mono text-ink-3">
                        {period ?? "Years to be added"}
                      </span>
                    </div>
                    <p className="mt-1 text-[0.9375rem] text-ink-2">
                      {item.institution}
                    </p>
                  </li>
                );
              })}
            </ol>
          </Block>

          <Block title="Selected projects">
            <ol className="flex flex-col gap-3.5">
              {projects.map((project) => (
                <li key={project.slug}>
                  <h3 className="text-[0.9375rem] font-medium">
                    {project.title}
                    <span className="ml-2 font-normal text-ink-3">
                      {project.status}
                    </span>
                  </h3>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-2">
                    {project.summary}
                  </p>
                </li>
              ))}
            </ol>
          </Block>

          <Block title="Skills">
            <dl className="flex flex-col gap-3">
              {skillGroups.map((group) => (
                <div key={group.id} className="sm:flex sm:gap-4">
                  <dt className="label-mono shrink-0 pt-1 text-ink-3 sm:w-44">
                    {group.title}
                  </dt>
                  <dd className="text-[0.9375rem] leading-relaxed text-ink-2">
                    {group.items.map((item) => item.name).join(" · ")}
                  </dd>
                </div>
              ))}
            </dl>
          </Block>

          <Block title="Certifications">
            <ul className="flex flex-col gap-2">
              {certifications.map((cert) => {
                const date = real(cert.date);
                return (
                  <li
                    key={cert.id}
                    className="flex flex-wrap items-baseline justify-between gap-x-4 text-[0.9375rem]"
                  >
                    <span>
                      {cert.name}
                      <span className="text-ink-3"> · </span>
                      <span className="text-ink-2">{cert.issuer}</span>
                    </span>
                    {date ? (
                      <span className="label-mono text-ink-3">{date}</span>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </Block>

          <Block title="Currently exploring">
            <p className="text-[0.9375rem] leading-relaxed text-ink-2">
              {learning
                .map((item) => `${item.topic} → ${item.applicationTo}`)
                .join("  ·  ")}
            </p>
          </Block>
        </article>
      </div>
    </main>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-9 border-t border-line pt-6">
      <h2 className="label-mono mb-4 text-accent">{title}</h2>
      {children}
    </section>
  );
}
