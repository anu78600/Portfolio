import type { Metadata } from "next";
import Link from "next/link";
import { certifications, education } from "@/content/education";
import { goals } from "@/content/goals";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { mailto, real } from "@/lib/content";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ResumeControls } from "@/components/resume/ResumeControls";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "A plain, printable resume — education, experience, projects, skills and certifications.",
  alternates: { canonical: "/resume" },
};

/**
 * Resume view.
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
        <ResumeControls email={email} resumePdf={resumePdf} />

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

          <Block title="Profile" icon="file-text">
            <p className="leading-relaxed text-ink-2">{profile.headline}</p>
            {profile.intro.map((line) => (
              <p
                key={line}
                data-compact-hide
                className="mt-3 leading-relaxed text-ink-2"
              >
                {line}
              </p>
            ))}
          </Block>

          <Block title="Experience" icon="briefcase">
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
                      <span className="label-sc text-ink-3">
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

          <Block title="Education" icon="graduation-cap">
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
                      <span className="label-sc text-ink-3">
                        {period ?? "Years to be added"}
                      </span>
                    </div>
                    {real(item.institution) ? (
                      <p className="mt-1 text-[0.9375rem] text-ink-2">
                        {real(item.institution)}
                      </p>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </Block>

          <Block title="Selected projects" icon="layers">
            <ol className="flex flex-col gap-3.5">
              {projects.map((project) => (
                <li key={project.slug}>
                  <h3 className="text-[0.9375rem] font-medium">
                    {project.title}
                    <span className="ml-2 font-normal text-ink-3">
                      {project.status}
                    </span>
                  </h3>
                  <p
                    data-compact-hide
                    className="mt-1 text-[0.9375rem] leading-relaxed text-ink-2"
                  >
                    {project.summary}
                  </p>
                </li>
              ))}
            </ol>
          </Block>

          <Block title="Skills" icon="sparkles">
            <dl className="flex flex-col gap-3">
              {skillGroups.map((group) => (
                <div key={group.id} className="sm:flex sm:gap-4">
                  <dt className="label-sc shrink-0 pt-1 text-ink-3 sm:w-44">
                    {group.title}
                  </dt>
                  <dd className="text-[0.9375rem] leading-relaxed text-ink-2">
                    {group.items.map((item) => item.name).join(" · ")}
                  </dd>
                </div>
              ))}
            </dl>
          </Block>

          <Block title="Certifications" icon="award">
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
                      {/* The separator is wrapped with the value it separates.
                          Guarding only the issuer would ship a dangling " · ". */}
                      {real(cert.issuer) ? (
                        <>
                          <span className="text-ink-3"> · </span>
                          <span className="text-ink-2">{real(cert.issuer)}</span>
                        </>
                      ) : null}
                    </span>
                    {date ? (
                      <span className="label-sc text-ink-3">{date}</span>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </Block>

          <Block title="Where I’m going" icon="compass">
            <ol className="flex flex-col gap-3">
              {goals.map((goal) => (
                <li key={goal.index}>
                  <h3 className="text-[0.9375rem] font-medium">
                    {goal.title}
                    <span className="ml-2 font-normal text-ink-3">
                      {goal.horizon}
                    </span>
                  </h3>
                  <p
                    data-compact-hide
                    className="mt-1 text-[0.9375rem] leading-relaxed text-ink-2"
                  >
                    {goal.body}
                  </p>
                </li>
              ))}
            </ol>
          </Block>
        </article>
      </div>
    </main>
  );
}

function Block({
  title,
  icon,
  children,
}: {
  title: string;
  icon: IconName;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-9 border-t border-line pt-6">
      <h2 className="label-sc mb-4 flex items-center gap-2 text-accent">
        <Icon name={icon} size={14} />
        {title}
      </h2>
      {children}
    </section>
  );
}
