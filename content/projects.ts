import type { Project } from "./types";

/**
 * Selected work.
 *
 * Rules applied throughout this file:
 *  • No result, metric, finding or client outcome is stated unless it was
 *    supplied. Where a write-up exists offline but was not provided, the
 *    section is marked `pending` and renders as an honest note.
 *  • `thesis` and `summary` describe the *question the work asks*, which is
 *    derivable from the brief. They never assert an answer.
 *  • `weight` drives layout: `flagship` gets the full-width lead treatment,
 *    `featured` the wide card. There is no `standard` tier in use — the six
 *    academic projects were cut on 17 Aug 2026 because they were theory with
 *    no problem statement, and two shipped products say more than eight
 *    entries where six begin "this study asks".
 */

export const projects: Project[] = [
  {
    slug: "quiet-compound",
    title: "Quiet Compound",
    category: "Personal Finance · Shipped Product",
    kind: "product",
    status: "Live product",
    weight: "flagship",
    year: "2026",
    summary:
      "A personal finance suite for students. It tracks trades, charts, credit cards, and the money you lent a friend that you have both half-forgotten.",
    thesis:
      "Student money is scattered, and the messiest part is the part no app touches. Udhar is real debt. It lives in memory, in screenshots, and in a slightly awkward feeling. Nobody builds for it, so everybody tracks it badly. Quiet Compound puts it beside the trades and the cards, and keeps all of it on your own device, because a tool you are not honest in is worthless.",
    methods: [
      "Product design",
      "Personal finance",
      "Local-first architecture",
      "Trading journal",
      "AI-assisted development",
      "Vercel",
    ],
    image: "/work/quiet-compound.png",
    imageAlt:
      "Quiet Compound's entry screen: a ruled paper folio with a handwritten trade entry on the left, and a sign-in panel showing live NSE market status on the right.",
    imageMobile: "/work/quiet-compound-mobile.png",
    externalUrl: "https://quiet-compound.vercel.app",
    externalLabel: "Open the live app",
    caseStudy: [
      {
        heading: "The problem",
        body: [
          "A student's money is scattered across places that do not talk to each other, and the messiest parts are the ones no finance app bothers with. Udhar is the clearest example: money lent to a friend or borrowed from family is real debt, but it lives in memory and screenshots, and it is socially awkward to chase. Nobody builds for it, so everybody tracks it badly or not at all.",
          "The same goes for a second credit card, or a trade taken for a reason already forgotten. Each is small on its own. Together they are why someone can be careful with money and still have no idea where they stand.",
        ],
      },
      {
        heading: "What it does",
        points: [
          "Trading journal — log the entry and the thinking behind it, then review what actually happened",
          "Smart charts — the market view, alongside live NSE status",
          "Udhar tracker — informal lending and borrowing, treated as the real debt it is",
          "Credit-card tracker — built for more than one card, and the cycles that come with them",
        ],
        body: ["The suite is broader than this list, and still growing."],
      },
      {
        heading: "Why it is local-first",
        body: [
          "Data is written to your own device by default and only syncs to a private account if you choose to sign in. That is an architectural decision made for a behavioural reason: the app only works if you are honest in it, and people are not honest in tools they do not trust with money they are embarrassed about.",
        ],
      },
      {
        heading: "Why it looks like a notebook",
        body: [
          "Almost every finance tool is a dashboard, and dashboards reward watching. A journal rewards reviewing. The folio treatment — ruled paper, a handwritten entry, a folio number, a “reviewed” stamp, a line reading “no FOMO · no revenge” — sets the behaviour the product is trying to encourage.",
        ],
      },
      {
        heading: "Build, stack and the hard parts",
        pending: true,
        body: [
          "[ADD BUILD DETAIL — stack, how local-first sync was implemented, what proved hardest, screenshots of the modules]",
        ],
      },
      {
        heading: "What I'd change",
        pending: true,
        body: ["[ADD RETROSPECTIVE — what you would do differently next time]"],
      },
    ],
  },

  {
    slug: "reminderpro",
    title: "ReminderPro",
    category: "Productivity · Shipped Product",
    kind: "product",
    status: "Personal product",
    weight: "featured",
    year: "2026",
    summary:
      "A reminders app. The entire design brief was that adding one should be faster than the thought that made you want to.",
    thesis:
      "A reminder app earns its place or it does not. Capture has to beat the thought that prompted it. So the interface stayed plain, and almost every feature I considered lost to the cost of one more step.",
    methods: ["Product design", "Productivity", "AI-assisted development"],
    caseStudy: [
      {
        heading: "The design constraint",
        body: [
          "Keep it simple enough that adding and managing a reminder is quick. Every feature considered had to justify itself against the cost of another step between intention and done.",
        ],
      },
      {
        heading: "Build detail and current state",
        pending: true,
        body: [
          "[ADD BUILD DETAIL — stack, current state, whether it is deployed anywhere, screenshots]",
        ],
      },
    ],
  },

];

/** The lead project — currently the shipped product, not the research. */
export const leadProject = projects.find((p) => p.weight === "flagship")!;

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
