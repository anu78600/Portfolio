import { profile } from "@/content/profile";
import { mailto, real } from "@/lib/content";
import { ButtonLink, UnavailableButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialRowLinks } from "@/components/ui/SocialLinks";
import { CopyEmail } from "@/components/site/CopyEmail";

/**
 * Contact.
 *
 * Deliberately no form. A contact form on a static site needs a backend to be
 * real, and a form that silently fails is worse than no form — it loses the
 * message *and* the visitor's trust. Direct email, a copy button and the two
 * profiles a recruiter will check anyway are faster and cannot break.
 *
 * If a form is wanted later, the honest version is a hosted endpoint
 * (Formspree, Resend, a Next route handler) with real success and error states.
 */
export function Contact() {
  const emailHref = mailto(profile.email);
  const email = real(profile.email);

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      /* No top rule — see About. It crossed the margin rule and had nothing
         hanging off it. */
      className="section-y"
    >
      <div className="container-counterfoil">
        <SectionHeading
          label="Contact"
          id="contact-title"
          title="Let’s connect."
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <p className="max-w-md text-lede leading-relaxed text-ink-2">
              I’m looking for analyst, people-analytics, consulting and
              AI-focused roles — anywhere the work is turning a business
              question into something a decision-maker can act on. I’m also
              glad to talk about where agentic systems are genuinely being put
              to work. If any of that overlaps with what you’re building, email
              is the fastest route.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {emailHref && email ? (
                <>
                  <ButtonLink
                    href={emailHref}
                    external
                    icon="mail"
                    iconPosition="leading"
                  >
                    Email me
                  </ButtonLink>
                  <CopyEmail email={email} />
                </>
              ) : (
                <UnavailableButton reason="Email address has not been added yet">
                  Email address not added yet
                </UnavailableButton>
              )}
            </div>
          </Reveal>

          <Reveal delay={80} className="lg:col-span-7">
            <SocialRowLinks links={profile.socials} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
