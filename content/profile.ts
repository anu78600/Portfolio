import type { AboutBlock, Domain, Profile } from "./types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  Sourced from Anupam_Resume_Updated 1.1.pdf, August 2026.
 *  Remaining `[ADD …]` strings are facts the résumé did not carry. Nothing
 *  here is invented — see SETUP.md for what is still open.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const profile: Profile = {
  name: "Anupam Mishra",
  initials: "AM",

  eyebrow: "Business × AI × Analytics",

  // Three verbs, three real domains: HR (hire), finance and consulting
  // (decide), international business and logistics (move).
  headline:
    "Applying AI and analytics to the way organisations hire, decide and move.",

  intro: [
    "MBA in Human Resource Management and International Business, built on a computer applications degree.",
    "I train and evaluate AI models, freelance as a prompt engineer, and ship products of my own — pointed at where that meets real business decisions: HR processes, financial analysis and global logistics.",
  ],

  jobTitle: "Business & AI Professional",

  location: "Uttar Pradesh, India",
  availability: "Open to analyst, people-analytics and AI roles",

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

  // Save the résumé PDF as public/resume.pdf, then set this to "/resume.pdf".
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
    body: "A BCA gave me the technical literacy; the MBA gave me the commercial frame. The dual specialisation in Human Resource Management and International Business means I tend to read an organisation from two directions at once — the people running a process, and the market that process is serving.",
  },
  {
    index: "02",
    title: "How I work",
    body: "I start with the question rather than the tool. Most of my work is the same loop: define the problem precisely, find the data or the literature that speaks to it, analyse it, then reduce the result to something a decision-maker can act on in a page. AI has changed the speed of that loop, not the discipline of it.",
  },
  {
    index: "03",
    title: "Working with AI, not around it",
    body: "Training and evaluating model output at Outlier taught me where these systems fail, which is more useful than knowing where they succeed. Freelance prompt engineering turned that into a method — versioned prompts, logged iterations, changes I can point at rather than describe.",
  },
  {
    index: "04",
    title: "What I want to build",
    body: "A career on the operational edge of AI adoption — the point where a model stops being a demonstration and becomes part of how a business hires, decides, prices or ships. My research on agentic AI in the shipping sector is the first serious attempt at that.",
  },
];
