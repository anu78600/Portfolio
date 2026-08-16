import type { Metadata } from "next";
import Link from "next/link";
import { navSections } from "@/lib/nav";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/**
 * 404.
 *
 * A little personality, then straight to the useful part: the actual routes.
 * A joke with no way out of it is just a dead end with better copy.
 */
export default function NotFound() {
  return (
    <main id="main" className="container-page flex min-h-[70dvh] items-center py-20">
      <div className="max-w-xl">
        <p className="label-mono text-accent">Error 404</p>

        <h1 className="mt-5 text-title font-medium text-ink">
          This one isn&apos;t on the roadmap.
        </h1>

        <p className="mt-5 text-lede leading-relaxed text-ink-2">
          The page you asked for doesn&apos;t exist — most likely a stale link or
          a typo in the address. Everything that does exist is one click away.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/" icon="arrow-right">
            Back to the homepage
          </ButtonLink>
          <ButtonLink href="/resume" variant="secondary">
            View résumé
          </ButtonLink>
        </div>

        <nav aria-label="Sections" className="mt-12 border-t border-line pt-6">
          <p className="label-mono text-ink-3">Or jump to</p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
            {navSections.map((section) => (
              <li key={section.id}>
                <Link
                  href={`/#${section.id}`}
                  className="link-underline text-[0.9375rem] text-ink-2 transition-colors hover:text-accent"
                >
                  {section.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}
