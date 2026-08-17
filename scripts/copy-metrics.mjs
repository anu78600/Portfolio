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

/*
 * Split WITHIN each string, never across the join. Bullets and labels do not
 * end in a full stop, so splitting the joined text on `(?<=[.!?])\s+` welded
 * every punctuation-less string to its neighbour: the "longest sentence" was
 * reported as 66 words when it was two separate 12-word bullets. That also fed
 * the flat-run detector garbage, which is worse — a diagnostic reporting a tic
 * that is an artefact of its own parser.
 */
const sentences = strings
  .flatMap((s) => s.split(/(?<=[.!?])\s+/))
  .map((s) => s.trim())
  .filter((s) => s.split(/\s+/).length > 1);

const lens = sentences.map((s) => s.split(/\s+/).length);
const short = lens.filter((n) => n < 8).length;

/*
 * Three consecutive sentences all within ±25% of the middle one's length —
 * the monotonous rhythm that gives generated prose away.
 *
 * Scoped WITHIN a paragraph. Run globally it walked from the last sentence of
 * one string into the first of the next, so four deliberately parallel bullets
 * ("Trading journal — …", "Smart charts — …") scored as a flat run. Parallelism
 * across list items is a rhetorical figure and good writing; monotony inside a
 * paragraph is the tic. Only the second is worth flagging.
 */
let flatRuns = 0;
for (const para of strings) {
  const p = para
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim().split(/\s+/).length)
    .filter((n) => n > 1);
  for (let i = 1; i < p.length - 1; i++) {
    const [a, b, c] = [p[i - 1], p[i], p[i + 1]];
    if (Math.abs(a - b) <= b * 0.25 && Math.abs(c - b) <= b * 0.25) flatRuns++;
  }
}

const count = (re) => (text.match(re) ?? []).length;

/*
 * The em-dash budget is about a WRITING tic — the model's habit of hanging an
 * aside off a dash mid-sentence — so it must not count dashes that are doing
 * a different job. `Term — gloss` is a definition list: "Udhar tracker —
 * informal lending, treated as the real debt it is", "MBA — Human Resource
 * Management". A human product writer writes exactly that, and four parallel
 * bullets in that form are a deliberate structure, not a verbal habit.
 *
 * Nine of the fourteen dashes flagged here were that. Counting them made the
 * budget unreachable without wrecking a feature list, which is how a smoke
 * detector trains you to disconnect it.
 *
 * A dash is a gloss dash when it is the string's first, sits within the first
 * 50 characters, and no sentence has ended before it. Prose asides fail all
 * three: they arrive late, after at least one full stop or a long clause.
 * (The bibliographic carve-out at `prose()` above is the same idea.)
 */
const glossDashes = strings.filter((s) => {
  const i = s.indexOf("—");
  return i > 0 && i < 50 && !s.slice(0, i).includes(".");
}).length;

const emDash = count(/—/g) - glossDashes;
const per1k = (emDash / words) * 1000;
const antithesis = count(/\brather than\b|\bnot just\b|\bisn't just\b|\bis not\b[^.]{0,40}\bit is\b/gi);
const semicolons = count(/;/g);
// "a, b and c" — three noun-ish beats in one clause.
const tricolon = count(/\b\w+(?:\s\w+){0,2},\s\w+(?:\s\w+){0,2}\s+and\s+\w+(?:\s\w+){0,2}\b/g);

/*
 * Long stretches with nothing concrete in them — no name, no number, no thing
 * you could point at. The most reliable tell of all, and the hardest to fake
 * your way out of.
 *
 * "Specific" includes acronyms. The pattern was `[A-Z][a-z]{2,}`, which does
 * not match AI, HR, MBA or NSE, so a sentence naming a dissertation on agentic
 * AI in shipping scored as pure abstraction. Requiring a capitalised word to
 * have lowercase letters after it is a rule about orthography, not aboutness.
 */
const SPECIFIC = /[A-Z][a-z]{2,}|[A-Z]{2,}|\d/;
const noSpecific = strings.filter(
  (s) => s.split(/\s+/).length > 25 && !SPECIFIC.test(s.slice(1)),
).length;

const rows = [
  ["em dashes / 1,000 words", per1k.toFixed(2), "<= 4.00", per1k <= 4],
  ["em dashes (prose asides)", emDash, "-", null],
  ["em dashes (Term — gloss, exempt)", glossDashes, "-", null],
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
