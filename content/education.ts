import type { Certification, EducationItem, LearningItem } from "./types";

export const education: EducationItem[] = [
  {
    id: "mba",
    qualification: "Master of Business Administration",
    specialisation: "Human Resource Management + International Business",
    institution: "Dr. A.P.J. Abdul Kalam Technical University (AKTU)",
    period: "2024 — 2026",
    note: "Graduated in the top 10% of the batch. Dual specialisation, with research on agentic AI in global logistics and the shipping sector.",
  },
  {
    id: "bca",
    qualification: "Bachelor of Computer Applications",
    institution: "Awadhesh Pratap Singh University (APSU), Madhya Pradesh",
    period: "2020 — 2023",
    note: "Graduated in the top 3% of the batch. The technical foundation underneath the commercial training — and the reason AI tooling reads as familiar rather than novel.",
  },
];

/**
 * Certifications.
 *
 * "Basics of Nutrition" (Ministry of Women & Child Development / ICMR) is
 * deliberately not listed. It is a real certificate, but on a page aimed at
 * analyst, people-analytics and AI roles it reads as list-padding and pulls
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
    topic: "Agentic AI",
    applicationTo: "Business automation",
    detail:
      "Moving from systems that answer to systems that plan and act — and working out which business decisions can survive that.",
  },
  {
    topic: "Applied data analytics",
    applicationTo: "Decision intelligence",
    detail:
      "Getting from a dataset to a decision without losing the assumptions along the way.",
  },
  {
    topic: "Financial markets",
    applicationTo: "Systematic analysis",
    detail:
      "Building rule-based views of equities rather than discretionary ones — currently through TradingView and Pine Script.",
  },
  {
    topic: "Shipping products",
    applicationTo: "AI-assisted development",
    detail:
      "Two apps live so far. The interesting part is how much of the build AI can carry, and exactly where it stops being useful.",
  },
];
