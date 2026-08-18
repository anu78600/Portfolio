import { profile } from "@/content/profile";
import { certifications, education } from "@/content/education";
import { real, realOr } from "@/lib/content";

export const siteName = realOr(profile.name, "Personal site");

export const siteDescription =
  "MBA in Human Resource Management and International Business, working at the " +
  "intersection of AI, analytics and strategy. Research on agentic AI in global " +
  "logistics, with special reference to the shipping sector.";

export const siteUrl = profile.siteUrl.replace(/\/$/, "");

/**
 * JSON-LD.
 *
 * Only fields backed by supplied information are emitted — a placeholder never
 * becomes structured data. Publishing `sameAs: "[ADD LINKEDIN URL]"` would put
 * a fabricated claim into a machine-readable format, which is exactly where a
 * wrong fact does the most damage.
 */
export function buildJsonLd() {
  const name = real(profile.name);
  const email = real(profile.email);
  const location = real(profile.location);

  const sameAs = profile.socials
    .filter((social) => social.key !== "email")
    .map((social) => real(social.href))
    .filter((href): href is string => Boolean(href));

  const person: Record<string, unknown> = {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    jobTitle: profile.jobTitle,
    description: siteDescription,
    knowsAbout: [
      "Generative AI",
      "Agentic AI",
      "Data analytics",
      "Financial statement analysis",
      "Human resource management",
      "International business",
    ],
    /* Only institutions that are real. `alumniOf` published whatever string the
       content file held, so entering a course before its institution is
       confirmed — the LLB — put an EducationalOrganization literally named
       "[ADD LLB INSTITUTION]" into structured data on every route. Exactly the
       failure "[ADD ISSUER]" caused in `hasCredential` below, in a second field
       nobody thought to guard. */
    alumniOf: education
      .map((item) => real(item.institution))
      .filter(Boolean)
      .map((name) => ({ "@type": "EducationalOrganization", name })),
    /* `recognizedBy` only when the issuer is real. Unguarded, this published an
       Organization literally named "[ADD ISSUER]" as machine-readable structured
       data on EVERY route — including the case studies, which show no
       certifications at all. That is the exact failure this file's own header
       comment promises does not happen, and a fabricated credential issuer is
       where a wrong fact does the most damage. `recognizedBy` is optional on
       EducationalOccupationalCredential, so omitting it stays valid schema.org. */
    hasCredential: certifications.map((cert) => {
      const issuer = real(cert.issuer);
      const credential: Record<string, unknown> = {
        "@type": "EducationalOccupationalCredential",
        name: cert.name,
        credentialCategory: "certificate",
      };
      if (issuer) credential.recognizedBy = { "@type": "Organization", name: issuer };
      return credential;
    }),
  };

  if (name) person.name = name;
  if (email) person.email = email;
  if (location) person.address = { "@type": "PostalAddress", addressLocality: location };
  if (sameAs.length) person.sameAs = sameAs;

  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        description: siteDescription,
        inLanguage: "en",
        publisher: { "@id": `${siteUrl}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#profilepage`,
        url: siteUrl,
        name: `${siteName} — ${profile.jobTitle}`,
        about: { "@id": `${siteUrl}/#person` },
        isPartOf: { "@id": `${siteUrl}/#website` },
      },
    ],
  };
}
