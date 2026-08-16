import { About } from "@/components/sections/About";
import { Capabilities } from "@/components/sections/Capabilities";
import { Contact } from "@/components/sections/Contact";
import { Credentials } from "@/components/sections/Credentials";
import { Experience } from "@/components/sections/Experience";
import { Direction } from "@/components/sections/Direction";
import { Hero } from "@/components/sections/Hero";
import { Snapshot } from "@/components/sections/Snapshot";
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
      <Snapshot />

      {/* Act one carries Roles, Capabilities and On-the-record as children,
          so the page has three numbered movements rather than eight chapters. */}
      <About>
        <Experience />
        <Capabilities />
        <Credentials />
      </About>

      <Work />
      <Direction />
      <Contact />
    </main>
  );
}
