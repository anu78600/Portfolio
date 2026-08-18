import type { AboutBlock, Domain, Profile } from "./types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  Sourced from Anupam_Resume_Updated 1.1.pdf, August 2026.
 *  Remaining `[ADD …]` strings are facts the resume did not carry. Nothing
 *  here is invented — see SETUP.md for what is still open.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const profile: Profile = {
  name: "Anupam Mishra",
  initials: "AM",

  eyebrow: "Business × AI × Analytics",

  // Three verbs, three real domains: HR (hire), finance and consulting
  // (decide), international business and logistics (move).
  // Short, and it takes a position. The old line was a tricolon sitting under
  // an eyebrow that was also a tricolon — two identical rhythms are the first
  // thing a scanner registers, and they register as pattern, not as meaning.
  headline: "Most AI work stops at the demo. I want the part after.",
  headlineAccent: "the part after",

  intro: [
    "MBA in HR and international business, built on a computer applications degree. Top ten per cent, then top three.",
    "I grade model output at Outlier and take freelance prompt work. Versioned and logged, so an improvement is something I can point at.",
    "Quiet Compound is what I would show you first. It is live. I built it alone.",
  ],

  jobTitle: "Business & AI Professional",

  location: "Uttar Pradesh, India",
  availability: "Open to analyst and AI roles",

  email: "anupam78600@gmail.com",

  socials: [
    {
      key: "linkedin",
      label: "LinkedIn",
      accessibleLabel: "LinkedIn profile, opens in a new tab",
      href: "https://linkedin.com/in/anupammishra01/",
      display: "linkedin.com/in/anupammishra01",
    },
    // No GitHub link by design — an empty profile linked from a portfolio is
    // worse than no link, because recruiters click it. To add one later,
    // restore this entry; every surface (hero, contact, footer, command
    // palette, JSON-LD `sameAs`) picks it up automatically:
    //
    //   {
    //     key: "github",
    //     label: "GitHub",
    //     accessibleLabel: "GitHub profile, opens in a new tab",
    //     href: "https://github.com/yourhandle",
    //     display: "github.com/yourhandle",
    //   },
    {
      key: "email",
      label: "Email",
      accessibleLabel: "Send an email",
      href: "anupam78600@gmail.com",
      display: "anupam78600@gmail.com",
    },
  ],

  // Save the resume PDF as public/resume.pdf, then set this to "/resume.pdf".
  resumePdf: "[ADD RESUME PDF]",

  // Drop an editorial portrait at public/portrait.jpg (4:5 crop, ~1000×1250)
  // and change this to "/portrait.jpg". Until then a typographic plate renders.
  portrait: "[ADD PORTRAIT IMAGE]",
  portraitAlt: "Portrait of Anupam Mishra",

  // Used for canonical URLs, sitemap and Open Graph. Set before deploying.
  siteUrl: "https://your-domain.com",
};

/**
 * The rapid-scan band under the hero. Capability statements, not statistics —
 * the only numbers anywhere on this site are academic standings and dates,
 * both of which are checkable.
 */
export const domains: Domain[] = [
  {
    label: "Business & Strategy",
    detail: "MBA — Human Resource Management and International Business",
  },
  {
    label: "Artificial Intelligence",
    detail: "Model training and evaluation, prompt engineering, generative AI",
  },
  {
    label: "Analytics",
    detail: "Research design, data analysis, decision support",
  },
  {
    label: "Finance",
    detail: "Equity research and financial analysis — certified, IIM Bangalore",
  },
  {
    label: "Building",
    detail: "AI-assisted development — two products built, one live",
  },
];

export const aboutBlocks: AboutBlock[] = [
  {
    index: "01",
    title: "Background",
    body: "A BCA first, then the MBA. Most people reach business school from commerce. I came from *code*, and it shows in what I notice: the process before the strategy, the machinery before the plan.",
  },
  {
    index: "02",
    title: "How I work",
    body: "Define the question. Find what actually speaks to it. Reduce the answer to one page someone can act on. AI made that loop *faster*. It did not make it easier to know which question was worth asking, and that part still takes the longest.",
  },
  {
    index: "03",
    title: "Working with AI",
    body: "At Outlier I grade model output. Mostly you learn where a model is confidently wrong. That turns out to be more useful than knowing where it is right. Freelance prompt work made it a habit: version everything, log the change, keep the variant that won.",
  },
  {
    index: "04",
    title: "What I want to build",
    body: "The part of AI adoption nobody demos: where a model stops being impressive and starts being load-bearing in how a business hires, prices or ships. My dissertation on agentic AI in shipping is a first attempt at it.",
  },
];
