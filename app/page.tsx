import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Credentials } from "@/components/sections/Credentials";
import { Experience } from "@/components/sections/Experience";
import { Direction } from "@/components/sections/Direction";
import { Hero } from "@/components/sections/Hero";
import { Glance } from "@/components/sections/Glance";
import { Work } from "@/components/sections/Work";

/**
 * Homepage composition — three acts.
 *
 *   01  What I have done      background, roles, capabilities, credentials
 *   02  What I have built     the two shipped products, framed by the problem
 *   03  Where I am going      two goals, and two is a ceiling
 *
 * His directive, and it replaced an eight-section catalogue. The catalogue was
 * well organised and that was the problem: a list has no momentum, and nobody
 * retells a list after closing the tab. Past, present, direction is a shape a
 * reader can hold.
 *
 * Everything that used to be its own chapter now sits inside an act. Skills and
 * certifications are supporting detail, not movements. "Currently exploring"
 * became Act 3, which is what it was always gesturing at.
 *
 * `counterfoil` draws the single vermilion margin rule. Folios hang outside it in
 * the stub; prose sits inside. That rule about where things go is the structure
 * — and it is harder to fake than a composition, because it has to hold on
 * every row of every section.
 */
export default function HomePage() {
  return (
    <main id="main" className="counterfoil">
      <Hero />
      <Glance />

      {/* Act one carries Roles and the academic record, and nothing else.
          ─────────────────────────────────────────────────────────────────────
          Capabilities and Certifications were cut from the home page on
          19 Aug 2026 and now live only on /resume, which already rendered both
          in full — so nothing was lost, it stopped being FIRST.

          Measured before the cut, at 390px: the page ran 16.2 screens, Act 01
          was 7,721px against the work section's 1,751px, and the Capabilities
          block alone was 1.5x the entire section about what he has built. The
          words "Quiet Compound" first appeared 12.2 screens down.

          Two respected text-forward sites were read directly for comparison —
          macwright.com and maggieappleton.com — and NEITHER carries a skills
          list, an education section or certifications anywhere on its home
          page. His 33-word hero already matches Appleton's 32. The opening was
          never the problem; what followed it was. */}
      <About>
        <Experience />
        <Credentials />
      </About>

      <Work />
      <Direction />
      <Contact />
    </main>
  );
}
