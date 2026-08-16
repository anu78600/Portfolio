/**
 * Section registry.
 *
 * One list drives the desktop nav, the mobile menu, the scroll-spy observer and
 * the command palette — so a section can never appear in one and be missing
 * from another.
 *
 * Order note: Work sits before Experience in the *page* on purpose (see
 * app/page.tsx), but the nav lists Experience first because that is the order a
 * recruiter expects to scan. Both point at the same anchors.
 */
export interface NavSection {
  id: string;
  label: string;
  /** Longer description used in the command palette. */
  hint: string;
}

export const navSections: NavSection[] = [
  { id: "record", label: "Done", hint: "Background, roles, capabilities, credentials" },
  { id: "work", label: "Built", hint: "Quiet Compound and ReminderPro" },
  { id: "direction", label: "Going", hint: "Where this is heading" },
  { id: "contact", label: "Contact", hint: "Email and LinkedIn" },
];

/** Sections observed by the scroll spy, including ones not in the nav. */
export const spySections: string[] = ["top", ...navSections.map((s) => s.id)];
