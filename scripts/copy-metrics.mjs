/**
 * Copy metrics.
 *
 * Measures the prose in content/ against the tells of LLM writing. None of
 * these numbers is a quality score — you can hit every target and still write
 * badly. They are smoke detectors: each one flags a specific mechanical habit
 * that human writers do not have and language models reliably do.
 *
 *   node scripts/copy-metrics.mjs
 *
 * Deliberately NOT wired into a commit hook. A hook turns a diagnostic into a
 * target, and the moment a writer optimises for "em dashes < 4" they start
 * substituting semicolons, which is the same tic wearing a different hat.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const DIR = "content";

/** Pull prose out of the TS content files: quoted strings of real length. */
function prose(source) {
  const out = [];
  // Double-quoted strings, allowing escaped quotes.
  for (const m of source.matchAll(/"((?:[^"\\]|\\.)*)"/g)) {
    const s = m[1].replace(/\\"/g, '"');
    if (s.length < 40) continue; // identifiers, class names, slugs, hrefs
    if (/^https?:|^\/|^\[ADD /.test(s)) continue; // urls, paths, placeholders
    if (!/\s/.test(s)) continue;
    // Citation labels ("IMO — MSC 111 …, 22 May 2026") are bibliographic
    // formatting, not prose. Their em dashes are not a writing tic.
    if (/—[^—]*\d{4}\s*$/.test(s)) continue;
    out.push(s);
  }
  return out;
}

const strings = readdirSync(DIR)
  .filter((f) => f.endsWith(".ts"))
  .flatMap((f) => prose(readFileSync(join(DIR, f), "utf8")));

const text = strings.join("\n");
const words = text.split(/\s+/).filter(Boolean).length;

const sentences = text
  .split(/(?<=[.!?])\s+/)
  .map((s) => s.trim())
  .filter((s) => s.split(/\s+/).length > 1);

const lens = sentences.map((s) => s.split(/\s+/).length);
const short = lens.filter((n) => n < 8).length;

// Three consecutive sentences all within ±25% of the middle one's length.
let flatRuns = 0;
for (let i = 1; i < lens.length - 1; i++) {
  const [a, b, c] = [lens[i - 1], lens[i], lens[i + 1]];
  if (Math.abs(a - b) <= b * 0.25 && Math.abs(c - b) <= b * 0.25) flatRuns++;
}

const count = (re) => (text.match(re) ?? []).length;

const emDash = count(/—/g);
const per1k = (emDash / words) * 1000;
const antithesis = count(/\brather than\b|\bnot just\b|\bisn't just\b|\bis not\b[^.]{0,40}\bit is\b/gi);
const semicolons = count(/;/g);
// "a, b and c" — three noun-ish beats in one clause.
const tricolon = count(/\b\w+(?:\s\w+){0,2},\s\w+(?:\s\w+){0,2}\s+and\s+\w+(?:\s\w+){0,2}\b/g);

const noSpecific = strings.filter(
  (s) => s.split(/\s+/).length > 25 && !/[A-Z][a-z]{2,}|\d/.test(s.slice(1)),
).length;

const rows = [
  ["em dashes / 1,000 words", per1k.toFixed(2), "<= 4.00", per1k <= 4],
  ["em dashes (absolute)", emDash, "-", null],
  ["semicolons (compensating tic)", semicolons, "watch", null],
  ["antithesis constructions", antithesis, "<= 2", antithesis <= 2],
  ["tricolons", tricolon, "<= 4", tricolon <= 4],
  ["sentences under 8 words", `${((short / lens.length) * 100).toFixed(1)}%`, ">= 15%", short / lens.length >= 0.15],
  ["flat runs (3 same-length)", flatRuns, "0", flatRuns === 0],
  ["long paras with no specific", noSpecific, "0", noSpecific === 0],
];

console.log(`\n  ${strings.length} prose strings · ${words} words · ${sentences.length} sentences\n`);
for (const [label, value, target, pass] of rows) {
  const mark = pass === null ? "  " : pass ? "ok" : "!!";
  console.log(`  ${mark} ${label.padEnd(32)} ${String(value).padStart(8)}   ${target}`);
}
console.log();

const longest = [...sentences].sort((a, b) => b.split(/\s+/).length - a.split(/\s+/).length).slice(0, 3);
console.log("  longest sentences:");
for (const s of longest) console.log(`    ${s.split(/\s+/).length}w  ${s.slice(0, 96)}…`);
console.log();
