import type { ExperienceItem } from "./types";

/**
 * Experience, reverse-chronological.
 *
 * NOTE ON NUMBERS — read before editing.
 *
 * The source résumé attached percentages to three of these bullets: "100%
 * compliance", "morale by 20%", "accuracy by 15–20%". They are not reproduced
 * here, and the omission is deliberate rather than an oversight.
 *
 * None of the three is measurable by the person claiming it. A two-month
 * intern cannot measure a 20% change in morale, and a freelancer cannot
 * baseline a 15% accuracy gain without a held-out evaluation set. A recruiter
 * who stops on one of those numbers starts discounting the rest of the page —
 * including the parts that are genuinely strong and genuinely checkable, like
 * a live product and a top-10% academic standing.
 *
 * The underlying work is all still here, stated in terms that survive being
 * asked about in an interview. If you want the figures back, add them to the
 * relevant strings below; nothing else needs to change.
 */
export const experience: ExperienceItem[] = [
  {
    id: "outlier-ai-trainer",
    organisation: "Outlier AI",
    role: "AI Trainer",
    period: "Jun 2026",
    location: "Remote",
    summary:
      "Grading model output, which is where model behaviour actually gets decided. You watch fluency and correctness come apart in real time.",
    contributions: [
      "Trained and evaluated model responses for accuracy and helpfulness",
      "Worked on output quality for an image generation model",
      "Wrote and refined prompts to improve the quality of model responses",
      "Assessed how reliably models followed instructions and held context across a conversation",
    ],
    skills: [
      "Model evaluation",
      "Prompt engineering",
      "Output quality",
      "Instruction following",
    ],
  },
  {
    id: "freelance-prompt-engineer",
    organisation: "Freelance",
    role: "Prompt Engineer",
    period: "Jul 2025 — Present",
    location: "Remote",
    summary:
      "Prompt work, treated as engineering. Versioned, logged, adapted to whatever the client's domain turns out to need.",
    contributions: [
      "Compare prompt variants against client requirements instead of judging by feel",
      "Keep iteration logs of prompt variants, so an improvement is traceable to a specific change",
      "Adapt prompt-engineering frameworks across different industry contexts",
    ],
    skills: [
      "Prompt engineering",
      "Iterative testing",
      "Client work",
      "Documentation",
    ],
  },
  {
    id: "iffco-hr-trainee",
    organisation: "IFFCO",
    role: "HR Trainee Intern",
    period: "Aug 2025 — Sep 2025",
    location: "Uttar Pradesh, India",
    summary:
      "Two months inside the HR function of one of India's largest fertiliser cooperatives. The layer underneath the policy, where processes meet the systems that record them.",
    contributions: [
      "Maintained employee records in line with HR policy and procedure",
      "Supported employee engagement initiatives run by the HR team",
      "Documented HR workflows, mapping how compliance is handled in practice and not on paper",
    ],
    skills: [
      "HR operations",
      "Employee records",
      "Employee engagement",
      "Process documentation",
    ],
  },
];
