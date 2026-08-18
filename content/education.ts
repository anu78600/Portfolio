import type { Certification, EducationItem, LearningItem } from "./types";

export const education: EducationItem[] = [
  {
    /* Current, so it leads. The array is authored most-recent-first and both
       the home page and /resume map it without sorting.

       He supplied the qualification and that he is in his first semester, and
       nothing else. The institution and the years are therefore placeholders,
       not guesses — `real()` hides them until they are filled, and the row
       renders with "Years to be added" rather than a date nobody supplied.
       Inferring "2026" from "first semester" would be inventing a date, which
       is the one thing this file may never do. */
    id: "llb",
    qualification: "Bachelor of Laws (LLB)",
    institution: "[ADD LLB INSTITUTION]",
    period: "[ADD LLB YEARS]",
    note: "Currently pursuing — first semester.",
  },
  {
    id: "mba",
    qualification: "Master of Business Administration",
    specialisation: "Human Resource Management + International Business",
    institution: "Dr. A.P.J. Abdul Kalam Technical University (AKTU)",
    period: "2024–2026",
    note: "Graduated in the top 10% of the batch. Dual specialisation, with research on agentic AI in global logistics and the shipping sector.",
  },
  {
    id: "bca",
    qualification: "Bachelor of Computer Applications",
    institution: "Awadhesh Pratap Singh University (APSU), Madhya Pradesh",
    period: "2020–2023",
    note: "Graduated in the top 3% of the batch. The technical foundation underneath the commercial training — and the reason AI tooling reads as familiar rather than novel.",
  },
];

/**
 * Certifications.
 *
 * "Basics of Nutrition" (Ministry of Women & Child Development / ICMR) is
 * deliberately not listed. It is a real certificate, but on a page aimed at
 * analyst and AI roles it reads as list-padding and pulls
 * against the focus everything else on the site establishes. Add it back here
 * if you are applying somewhere it is relevant.
 */
export const certifications: Certification[] = [
  {
    id: "genai-foundations",
    name: "Generative AI Foundations",
    issuer: "Udemy",
    category: "AI",
    date: "Aug 2025",
    credentialUrl: "[ADD CREDENTIAL URL]",
  },
  {
    id: "stock-market-ai",
    name: "Stock Market Using AI",
    issuer: "[ADD ISSUER]",
    category: "Finance",
    date: "Aug 2025",
    credentialUrl: "[ADD CREDENTIAL URL]",
  },
  {
    id: "equity-iimb",
    name: "Equity Stock Market",
    issuer: "IIM Bangalore",
    category: "Finance",
    date: "Feb 2025",
    credentialUrl: "[ADD CREDENTIAL URL]",
  },
  {
    id: "genai-tata-forage",
    name: "GenAI-Powered Data Analytics — Virtual Experience",
    issuer: "Tata via Forage",
    category: "AI",
    date: "[ADD DATE]",
    credentialUrl: "[ADD CREDENTIAL URL]",
  },
  {
    id: "product-ea-forage",
    name: "Product Management — Virtual Experience",
    issuer: "Electronic Arts via Forage",
    category: "Product",
    date: "[ADD DATE]",
    credentialUrl: "[ADD CREDENTIAL URL]",
  },
];

/**
 * "Currently exploring" — the point of this section is momentum, so each item
 * names the topic *and* what it is being pointed at. A list of nouns would say
 * nothing the capabilities section does not already say.
 */
export const learning: LearningItem[] = [
  {
    icon: "sparkles",
    topic: "Agentic AI",
    applicationTo: "Business automation",
    detail:
      "Systems that plan and act, not just answer. The open question is which business decisions can survive being handed over.",
  },
  {
    icon: "compass",
    topic: "Applied data analytics",
    applicationTo: "Decision intelligence",
    detail:
      "Getting from a dataset to a decision without quietly losing the assumptions on the way.",
  },
  {
    icon: "trending-up",
    topic: "Financial markets",
    applicationTo: "Systematic analysis",
    detail:
      "Rule-based views of equities instead of discretionary ones. TradingView and Pine Script, mostly.",
  },
  {
    icon: "layers",
    topic: "Shipping products",
    applicationTo: "AI-assisted development",
    detail:
      "One app live, one built and not deployed. The interesting part is how much of a build AI can carry, and exactly where it stops.",
  },
];
