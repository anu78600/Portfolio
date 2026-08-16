import { profile } from "@/content/profile";
import { real, todoClass } from "@/lib/content";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SocialIconLinks } from "@/components/ui/SocialLinks";
import { IdentityPanel } from "./IdentityPanel";

/**
 * Hero.
 *
 * Answers who / what / what-they-care-about / what-they-offer above the fold,
 * in that reading order, and gives the visitor exactly two things to do.
 *
 * The type stack is: mono eyebrow → name at display size → positioning
 * statement at title size → two lines of supporting copy. Nothing here is a
 * card, and nothing animates on a loop.
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
      <div className="container-page">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal immediate className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-accent"
              />
              <p className="label-sc text-accent">{profile.eyebrow}</p>
            </Reveal>

            <Reveal immediate>
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

            <Reveal immediate>
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

            <Reveal immediate>
              <div className="mt-7 max-w-xl space-y-3.5">
                {profile.intro.map((line) => (
                  <p key={line} className="text-lede text-ink-2">
                    {line}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal
              immediate
              className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <div className="grid grid-cols-2 gap-3 xs:flex xs:flex-wrap xs:items-center">
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
                    Download résumé
                  </ButtonLink>
                ) : (
                  <ButtonLink
                    href="/resume"
                    variant="secondary"
                    icon="arrow-up-right"
                  >
                    View résumé
                  </ButtonLink>
                )}
              </div>

              <SocialIconLinks
                links={profile.socials}
                className="sm:ml-auto"
              />
            </Reveal>
          </div>

          <Reveal delay={140} className="lg:col-span-5">
            <IdentityPanel />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
