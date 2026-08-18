import Link from "next/link";
import { profile } from "@/content/profile";
import { initialsFrom, real, todoClass } from "@/lib/content";
import { cn } from "@/lib/cn";
import { SocialIconLinks } from "@/components/ui/SocialLinks";

export function Footer() {
  const initials = initialsFrom(profile.name, profile.initials);
  const year = new Date().getFullYear();
  const resumePdf = real(profile.resumePdf);

  return (
    <footer className="border-t border-line print:hidden">
      <div className="container-page py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="grid h-8 w-8 place-items-center rounded-sm border border-line-strong font-mono text-[0.6875rem] font-medium text-accent"
              >
                {initials}
              </span>
              <span className={cn("font-medium text-ink", todoClass(profile.name))}>
                {profile.name}
              </span>
            </div>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-2">
              {profile.headline}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3 text-[0.9375rem]">
            <Link
              href="/resume"
              className="link-underline w-fit text-ink-2 transition-colors hover:text-ink"
            >
              Resume
            </Link>
            {resumePdf ? (
              <a
                href={resumePdf}
                className="link-underline w-fit text-ink-2 transition-colors hover:text-ink"
              >
                Download PDF
              </a>
            ) : null}
            <a
              href="/#work"
              className="link-underline w-fit text-ink-2 transition-colors hover:text-ink"
            >
              Selected work
            </a>
            <a
              href="/#contact"
              className="link-underline w-fit text-ink-2 transition-colors hover:text-ink"
            >
              Contact
            </a>
          </nav>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-6 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="text-[0.8125rem] text-ink-3">
            <span className={todoClass(profile.name)}>
              © {year} {profile.name}
            </span>
            <span className="mx-2 text-line-strong" aria-hidden="true">
              ·
            </span>
            Designed and built with curiosity.
          </p>
          <SocialIconLinks links={profile.socials} />
        </div>
      </div>
    </footer>
  );
}
