/**
 * Shared content types.
 *
 * The whole site renders from the objects in `content/*`. No component should
 * ever hard-code a fact about the person — if you need new copy on screen, add
 * a field here first, then read it in the component.
 */

/**
 * A value that has not been supplied yet.
 *
 * Placeholders are written as `[ADD SOMETHING]` and are detected at runtime by
 * `isTodo()` in `lib/content.ts`. The UI degrades gracefully around them:
 * links become disabled, images fall back to a typographic plate, and optional
 * blocks disappear entirely rather than shipping an empty shell.
 */
export type Todo = string;

export type SocialKey = "linkedin" | "github" | "email" | "x" | "website";

export interface SocialLink {
  key: SocialKey;
  /** Short label used in lists and the command palette. */
  label: string;
  /** Full accessible name, e.g. "LinkedIn profile (opens in a new tab)". */
  accessibleLabel: string;
  /** `mailto:` or absolute URL. May be a `[ADD …]` placeholder. */
  href: string;
  /** What the visitor sees, e.g. "linkedin.com/in/…". */
  display: string;
}

export interface Profile {
  name: Todo | string;
  /** Two or three initials used for the brand mark and favicon. */
  initials: Todo | string;
  /** Small mono eyebrow above the name in the hero. */
  eyebrow: string;
  /** The single sentence that positions the person. Kept under ~120 chars. */
  headline: string;
  /** Two to three lines of supporting hero copy. */
  intro: string[];
  /** Used for the résumé header and the JSON-LD `jobTitle`. */
  jobTitle: string;
  location: Todo | string;
  /** Optional one-line availability note. Hidden entirely if placeholder. */
  availability: Todo | string;
  email: Todo | string;
  socials: SocialLink[];
  /** Path inside /public, or a placeholder. */
  resumePdf: Todo | string;
  /** Editorial portrait, 4:5. Falls back to a typographic plate. */
  portrait: Todo | string;
  portraitAlt: string;
  /** Absolute production URL, used for canonical tags and OG metadata. */
  siteUrl: string;
}

/** A capability domain shown in the snapshot strip. */
export interface Domain {
  label: string;
  detail: string;
}

export interface AboutBlock {
  /** Editorial index, e.g. "01". */
  index: string;
  title: string;
  body: string;
}

export interface ExperienceItem {
  id: string;
  organisation: string;
  role: string;
  /** Free text so partial dates are honest, e.g. "[ADD DATES]". */
  period: Todo | string;
  location: Todo | string;
  /** One-line framing of the placement. */
  summary: string;
  /** Responsibilities as actually described — no invented outcomes. */
  contributions: string[];
  /** Exposure gained, rendered as tags. */
  skills: string[];
}

export type ProjectKind =
  | "research"
  | "analysis"
  | "concept"
  | "report"
  | "product";

export type ProjectStatus =
  | "Flagship research"
  | "Live product"
  | "Personal product"
  | "Academic research"
  | "Academic analysis"
  | "Concept"
  | "Industry report";

export interface CaseStudySection {
  heading: string;
  /** Paragraphs. Omit the section entirely rather than shipping filler. */
  body?: string[];
  /** Bulleted points. */
  points?: string[];
  /**
   * External references for a section, rendered as a small attributed list.
   * Every factual claim in `body` or `points` that is not the author's own
   * must be traceable to an entry here. The rule: if you cannot open the
   * primary source, the sentence does not go on the page.
   */
  sources?: { label: string; href?: string }[];
  /**
   * When true, this section is knowingly incomplete: the write-up exists
   * offline but has not been transcribed. Rendered as an honest note rather
   * than invented content.
   */
  pending?: boolean;
}

export interface Project {
  slug: string;
  title: string;
  /** Short label used on cards, e.g. "Agentic AI · Logistics". */
  category: string;
  kind: ProjectKind;
  status: ProjectStatus;
  /** Single sentence shown on the card. */
  summary: string;
  /** Longer framing shown at the top of the case study. */
  thesis: string;
  /** Methods, tools and frameworks actually used. */
  methods: string[];
  /** Drives layout: `featured` gets the wide card, `standard` the grid. */
  weight: "flagship" | "featured" | "standard";
  /** Year or range. Placeholder-safe. */
  year: Todo | string;
  caseStudy: CaseStudySection[];
  /**
   * Real screenshot, relative to /public. When present it replaces the drawn
   * plate everywhere the project appears. A picture of the actual thing always
   * beats an abstraction of it — the abstraction exists only for work that has
   * no artefact to show.
   */
  image?: string;
  imageAlt?: string;
  /** Optional portrait-orientation shot, used on the case study page. */
  imageMobile?: string;
  /**
   * Optional diagram rendered on the case study page, below the plate.
   * Keeps a bespoke visual attached to the project that needs it without
   * every project carrying an empty slot.
   */
  diagram?: "agentic-framework";
  /** Optional external link, e.g. a published PDF. */
  externalUrl?: Todo | string;
  externalLabel?: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  /** Why this cluster exists — one sentence, not a slogan. */
  description: string;
  items: { name: string; note?: string }[];
}

export interface EducationItem {
  id: string;
  qualification: string;
  specialisation?: string;
  institution: string;
  period: Todo | string;
  note?: string;
}

export type CertificationCategory =
  | "AI"
  | "Finance"
  | "Business"
  | "Product"
  | "Other";

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  category: CertificationCategory;
  date: Todo | string;
  credentialUrl?: Todo | string;
}

export interface LearningItem {
  topic: string;
  /** What the topic is being pointed at — the "→" half. */
  applicationTo: string;
  detail: string;
}
