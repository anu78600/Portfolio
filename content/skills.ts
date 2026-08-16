import type { SkillGroup } from "./types";

/**
 * Capabilities are grouped by what they are *for*, not dumped into one cloud,
 * and carry no proficiency percentages — a self-assigned "85%" communicates
 * nothing a reader can verify.
 *
 * Two things from the source résumé are deliberately absent. "Touch typing"
 * is not a professional differentiator and its presence invites the reader to
 * discount the rest of the list. "Collaboration" and "multi-tasking" are the
 * generic soft skills every résumé claims and none evidences — the experience
 * and project sections demonstrate both far better than a bullet asserting
 * them. Add them back here if you disagree.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: "ai",
    icon: "sparkles",
    title: "AI & Emerging Technology",
    description:
      "Where most of my attention goes. Used seriously enough to know where these systems break.",
    items: [
      { name: "Prompt engineering", note: "Professionally, freelance" },
      { name: "Model training & evaluation", note: "AI Trainer, Outlier" },
      { name: "Generative AI", note: "Applied to research, analysis and drafting" },
      { name: "Agentic AI", note: "Primary research interest" },
      { name: "AI-assisted workflows" },
      { name: "ChatGPT" },
      { name: "Claude" },
      { name: "Gemini" },
      { name: "Perplexity" },
      { name: "Microsoft Copilot" },
    ],
  },
  {
    id: "business",
    icon: "briefcase",
    title: "Business & Management",
    description:
      "The MBA core — dual specialisation in Human Resource Management and International Business.",
    items: [
      { name: "Human Resource Management", note: "MBA specialisation" },
      { name: "International Business", note: "MBA specialisation" },
      { name: "Business strategy" },
      { name: "Digital transformation", note: "Focus of my HR research" },
      { name: "HR reporting" },
      { name: "Business research" },
    ],
  },
  {
    id: "finance",
    icon: "trending-up",
    title: "Finance & Analytics",
    description:
      "Reading a business through its numbers. Certified in equity markets by IIM Bangalore, February 2025.",
    items: [
      { name: "Equity market analysis", note: "Certified — IIM Bangalore" },
      { name: "Investment research" },
      { name: "Financial statement analysis", note: "Ratio and performance analysis" },
      { name: "Stock market research" },
      { name: "Data analysis" },
      { name: "MS Excel" },
      { name: "TradingView" },
      { name: "Pine Script", note: "Indicator and strategy scripting" },
    ],
  },
  {
    id: "building",
    icon: "layers",
    title: "Building & Communication",
    description:
      "Analysis is worth what someone can act on. So what ships matters as much as the work behind it.",
    items: [
      { name: "AI-assisted development", note: "Two products built, one live" },
      { name: "HTML" },
      { name: "Figma" },
      { name: "Canva" },
      { name: "Gamma", note: "Presentation generation" },
      { name: "DaVinci Resolve", note: "Video editing and grading" },
      { name: "Report and research writing" },
    ],
  },
];
