import { About } from "@/components/sections/About";
import { Capabilities } from "@/components/sections/Capabilities";
import { Contact } from "@/components/sections/Contact";
import { Credentials } from "@/components/sections/Credentials";
import { Experience } from "@/components/sections/Experience";
import { Exploring } from "@/components/sections/Exploring";
import { Hero } from "@/components/sections/Hero";
import { Snapshot } from "@/components/sections/Snapshot";
import { Work } from "@/components/sections/Work";

/**
 * Homepage composition.
 *
 * Order is the main design decision on this page.
 *
 * Work leads with shipped products rather than with research. A live URL a
 * recruiter can open in one click outranks an unpublished dissertation, and
 * Quiet Compound is the most verifiable thing on the whole profile. The
 * agentic-AI research keeps a wide card and a full case study — including its
 * framing diagram — but no longer occupies the page's first chapter.
 *
 * Experience sits high because it is the question every recruiter asks first,
 * and it now carries three roles, two of them AI work, so it earns the slot.
 *
 * `page-rails` draws the two vertical hairlines that run the height of the
 * document and mark the content column. It is the one structural motif holding
 * the sections together as a single document rather than a stack of cards.
 */
export default function HomePage() {
  return (
    <main id="main" className="page-rails">
      <Hero />
      <Snapshot />
      <About />
      <Experience />
      <Work />
      <Capabilities />
      <Credentials />
      <Exploring />
      <Contact />
    </main>
  );
}
