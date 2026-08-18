import { profile } from "@/content/profile";
import { real, todoClass } from "@/lib/content";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SocialIconLinks } from "@/components/ui/SocialLinks";
import { liveProject } from "@/content/projects";
import { Icon } from "@/components/ui/Icon";
import { ProjectPlate } from "@/components/work/ProjectPlate";

/**
 * Hero — identity, proof and contact in one viewport.
 *
 * Restructured to the blueprint (19 Aug, his sign-off): review is a fast
 * negative filter, so the seniority signal and a visible contact email sit
 * above the fold; and the strongest hero formula leads with actual work —
 * one strongest screen shown large with a short verbal anchor, not
 * introductory messaging. The three intro paragraphs left the hero: their
 * facts survive in the credential line, the About blocks and the hero card,
 * and /resume still renders them in full.
 *
 * He kept the act order below (Done → Built → Going stays his three-act
 * story); the hero alone carries the proof into viewport one.
 */
/**
 * Splits the headline so one phrase can carry the gradient, without hard-coding
 * the sentence into the component. If `accent` is missing or does not appear
 * verbatim, the full sentence renders unchanged.
 */
function AccentedHeadline({ text, accent }: { text: string; accent?: string }) {
  if (!accent) return <>{text}</>;
  const at = text.indexOf(accent);
  if (at === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, at)}
      <span className="text-gradient-accent">{accent}</span>
      {text.slice(at + accent.length)}
    </>
  );
}

export function Hero() {
  const resumePdf = real(profile.resumePdf);

  return (
    <section
      id="top"
      aria-labelledby="hero-name"
      className="relative pt-14 pb-16 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32"
    >
      <div className="container-counterfoil">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {/* Typed, in the mono face. A typewriter is a printing device, so
                this is on-metaphor here rather than the usual hero trick — and
                it finally gives IBM Plex Mono a visible job, which a face
                without one is the tell that a type system was assembled rather
                than designed. The string is whole in the DOM and only clipped,
                so screen readers and copy-paste get all of it. */}
            <Reveal className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-accent"
              />
              {/* 12px, not text-micro’s 11 — this is the FIRST thing that
                  moves on the page and it was also the smallest text on it.
                  11px stays for true marginalia: the folios. */}
              <p className="font-mono text-[0.75rem] tracking-[0.1em] text-accent uppercase">
                <span
                  data-typewriter
                  style={
                    { "--typed": profile.eyebrow.length } as React.CSSProperties
                  }
                >
                  {profile.eyebrow}
                </span>
              </p>
            </Reveal>

            <Reveal>
              <h1
                id="hero-name"
                className={cn(
                  "mt-6 text-display font-medium text-ink",
                  todoClass(profile.name),
                )}
              >
                {profile.name}
              </h1>
            </Reveal>

            <Reveal>
              {/* The negative-filter line: standing, availability, place —
                  all verifiable, all above the fold. */}
              <p className="mt-4 font-sans text-[0.9375rem] font-medium text-ink-2">
                {profile.credentialLine}
                {real(profile.availability) ? (
                  <span className="text-ink-3"> · {real(profile.availability)}</span>
                ) : null}
                {real(profile.location) ? (
                  <span className="text-ink-3"> · {real(profile.location)}</span>
                ) : null}
              </p>
            </Reveal>

            <Reveal>
              {/* Deliberately a <p>, not an <h2>. It reads like a heading, but
                  every other h2 on this page is a section landmark, and adding
                  a non-landmark h2 here breaks heading-based navigation. */}
              <p className="mt-5 max-w-xl text-title font-normal text-ink-2">
                <AccentedHeadline
                  text={profile.headline}
                  accent={profile.headlineAccent}
                />
              </p>
            </Reveal>

            <Reveal
              className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              {/* Stacked full-width below 480px. Forcing two columns gave each button
                  ~102px for a 137px un-wrappable label, so a third of the primary
                  call to action printed paper-on-paper and was invisible. */}
              <div className="flex flex-col items-stretch gap-3 xs:flex-row xs:flex-wrap xs:items-center">
                <ButtonLink href="#work" icon="arrow-down" iconPosition="trailing">
                  View selected work
                </ButtonLink>

                {resumePdf ? (
                  <ButtonLink
                    href={resumePdf}
                    external
                    variant="secondary"
                    icon="download"
                    download
                  >
                    Download resume
                  </ButtonLink>
                ) : (
                  <ButtonLink
                    href="/resume"
                    variant="secondary"
                    icon="arrow-up-right"
                  >
                    View resume
                  </ButtonLink>
                )}
              </div>

              <SocialIconLinks
                links={profile.socials}
                className="sm:ml-auto"
              />
            </Reveal>

            {/* Contact, above the fold and in plain text. The email address
                used to first appear ~12,000px down the page; an icon is not
                an address. */}
            <Reveal className="mt-6">
              <a
                href={`mailto:${profile.email}`}
                className="link-underline font-sans text-[0.875rem] text-ink-2"
              >
                {profile.email}
              </a>
            </Reveal>
          </div>

          {/* THE PROOF, as the hero image. One strongest screen shown
              large — the journal card with its margin rule, entry and
              REVIEWED stamp — not a montage, not a drawn stand-in. The whole
              card is one link to the running app: the single click a
              recruiter can use to verify the claim. */}
          {liveProject && real(liveProject.externalUrl) ? (
            <Reveal delay={140} className="lg:col-span-5">
              <a
                href={real(liveProject.externalUrl)!}
                target="_blank"
                rel="noreferrer noopener"
                className="panel group block overflow-clip rounded-lg transition-[border-color,box-shadow] duration-300 ease-[var(--ease-out)] hover:border-line-hover hover:shadow-[var(--shadow-elevated)]"
              >
                <div className="relative aspect-[13/15] max-h-[56vh] w-full overflow-clip border-b border-line">
                  <ProjectPlate
                    figure={liveProject.figure}
                    image={liveProject.imageDetail ?? liveProject.image}
                    imageAlt={liveProject.imageDetailAlt ?? liveProject.imageAlt}
                    priority
                    sizes="(min-width: 1024px) 40vw, 92vw"
                  />
                </div>
                <div className="flex items-center justify-between gap-3 px-4 py-3">
                  <span className="flex min-w-0 items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <span className="label-sc shrink-0 text-accent">Live</span>
                    <span className="truncate font-sans text-[0.9375rem] font-medium text-ink">
                      {liveProject.title}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1.5 font-sans text-[0.875rem] font-medium text-accent">
                    Open
                    <Icon
                      name="arrow-up-right"
                      size={14}
                      className="transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>
              </a>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
