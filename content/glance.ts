import { projects } from "./projects";
import { certifications } from "./education";

/**
 * The at-a-glance band: the page's honest numbers, big enough to judge in a
 * second. DERIVED where a count exists in content — the band can never drift
 * from the truth it summarises — and authored only for the two standings,
 * which education.ts states in prose ("top 10% of the batch", "top 3%").
 *
 * Nothing here is a performance metric. Counts and academic standings are the
 * only numerals this site owns.
 */
export interface GlanceStat {
  n: number;
  suffix?: string;
  /** Small-caps line under the numeral. Keep it under six words. */
  label: string;
}

export const glance: GlanceStat[] = [
  { n: projects.length, label: "products built" },
  {
    n: projects.filter((p) => p.status === "Live product").length,
    label: "live right now",
  },
  { n: 10, suffix: "%", label: "top of batch, MBA" },
  { n: 3, suffix: "%", label: "top of batch, BCA" },
  { n: certifications.length, label: "certificates" },
];
