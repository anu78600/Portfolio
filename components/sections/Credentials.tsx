import { certifications, education } from "@/content/education";
import { real } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SubHeading } from "@/components/ui/SubHeading";
import { Tag } from "@/components/ui/Tag";

/**
 * Education and certifications, in one section.
 *
 * They answer the same recruiter question — "what is verifiable here?" — so
 * splitting them into two sections would add a scroll and a heading for no
 * gain.
 *
 * There is no category filter on the certifications. Five items spread across
 * five categories means every filter would return one or two results; the
 * category label on each row does the same job with no interaction cost.
 */
export function Credentials() {
  return (
    <div id="credentials" className="mt-20 scroll-mt-24">
      <SubHeading
        label="On the record"
        lede="Degrees and certificates, with the standings that can be checked."
      />

        <div className="grid grid-cols-1 gap-x-14 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h3 className="label-sc flex items-center gap-2 text-ink-3">
              <Icon name="graduation-cap" size={15} className="text-accent" />
              Education
            </h3>
            <ol className="mt-5">
              {education.map((item, index) => {
                const period = real(item.period);
                return (
                  <Reveal
                    as="li"
                    key={item.id}
                    delay={index * 70}
                    className="border-t border-line py-6 first:pt-0 last:pb-0"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <h4 className="text-subheading font-medium text-ink">
                        {item.qualification}
                      </h4>
                      <span className="label-sc shrink-0 text-ink-3">
                        {period ?? "Years to be added"}
                      </span>
                    </div>

                    {item.specialisation ? (
                      <p className="mt-2 text-[0.9375rem] text-accent">
                        {item.specialisation}
                      </p>
                    ) : null}

                    {/* Through `real`. A course can be entered before its
                        institution is confirmed — the LLB is — and an
                        unguarded field prints the placeholder on screen. */}
                    {real(item.institution) ? (
                      <p className="mt-1.5 text-[0.9375rem] text-ink-2">
                        {real(item.institution)}
                      </p>
                    ) : null}

                    {item.note ? (
                      <p className="mt-3 max-w-xl text-[0.875rem] leading-relaxed text-ink-3">
                        {item.note}
                      </p>
                    ) : null}
                  </Reveal>
                );
              })}
            </ol>
          </div>

          <div className="lg:col-span-5">
            <h3 className="label-sc flex items-center gap-2 text-ink-3">
              <Icon name="award" size={15} className="text-accent" />
              Certifications
            </h3>
            <ul className="mt-5 border-t border-line">
              {certifications.map((cert, index) => {
                const url = real(cert.credentialUrl);
                const date = real(cert.date);

                const body = (
                  <>
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-[0.9375rem] leading-snug font-medium text-ink">
                        {cert.name}
                      </p>
                      {url ? (
                        <Icon
                          name="arrow-up-right"
                          size={14}
                          className="mt-1 shrink-0 text-ink-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                        />
                      ) : null}
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
                      <Tag>{cert.category}</Tag>
                      {/* Through `real`, like every other placeholder-bearing
                          field. Unguarded, this printed the literal string
                          "[ADD ISSUER]" at 5.76:1 in light and 8.87:1 in dark —
                          fully legible, and sitting exactly where an issuer's
                          name goes, so it read as the issuer. */}
                      {real(cert.issuer) ? (
                        <span className="text-[0.8125rem] text-ink-3">
                          {real(cert.issuer)}
                        </span>
                      ) : null}
                      {date ? (
                        <span className="label-sc ml-auto text-ink-3">{date}</span>
                      ) : null}
                    </div>
                  </>
                );

                return (
                  <Reveal
                    as="li"
                    key={cert.id}
                    delay={index * 50}
                    className="border-b border-line"
                  >
                    {url ? (
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group block py-4 transition-colors hover:text-accent"
                      >
                        {body}
                        <span className="sr-only">
                          — view credential, opens in a new tab
                        </span>
                      </a>
                    ) : (
                      <div className="py-4">{body}</div>
                    )}
                  </Reveal>
                );
              })}
            </ul>
          </div>
      </div>
    </div>
  );
}
