# Project memory

**Read this before starting any new task on this repo.** It is the durable
record of what is true, what was decided, and what was deliberately rejected —
so decisions don't get relitigated and mistakes don't get reintroduced.

Last updated: 16 August 2026.

---

## 1. Who this is for

**Anupam Mishra** — MBA (Human Resource Management + International Business),
AKTU, 2024–2026, graduated in the top 10% of the batch. BCA, Awadhesh Pratap
Singh University (APSU), Madhya Pradesh, 2020–2023, top 3%.

Based in Uttar Pradesh, India · anupam78600@gmail.com ·
linkedin.com/in/anupammishra01

**Targeting four tracks at once** (his own words, in this order): business/data
analyst, HR / HR-tech / people analytics, consulting & graduate schemes, and
"AI generalist". This breadth is a real constraint — the site cannot be tuned
hard to any one of them.

**Where it will be seen:** linked from his LinkedIn profile. Traffic will be
overwhelmingly mobile. He has stated the site "looks generic" and wants it to
read as premium.

### Verified facts

| | |
|---|---|
| Source of truth | `Anupam_Resume_Updated 1.1.pdf`, supplied 16 Aug 2026 |
| Roles | AI Trainer @ Outlier AI (Jun 2026, remote) · Prompt Engineer, freelance (Jul 2025 – present, remote) · HR Trainee Intern @ IFFCO (Aug–Sep 2025, Uttar Pradesh) |
| Shipped | **Quiet Compound** — live at quiet-compound.vercel.app · **ReminderPro** — built, no known deployment |
| Research | MBA dissertation: agentic AI in global logistics, shipping sector. Findings NOT supplied. **Cut as a project 17 Aug**; survives only as an education note and one line in About. |
| Certificates | Generative AI Foundations (Udemy, Aug 2025) · Stock Market Using AI (issuer unknown, Aug 2025) · Equity Stock Market (IIM Bangalore, Feb 2025) · GenAI-Powered Data Analytics (Tata/Forage) · Product Management (EA/Forage) |
| No GitHub | Confirmed by him. Portfolio repo `github.com/anu78600/Portfolio` is his first. |

### Things NOT to reintroduce

- **The résumé's percentage claims.** "100% compliance", "morale by 20%",
  "accuracy by 15–20%". Removed deliberately. None is measurable by the person
  claiming it; a recruiter who stops on one discounts the whole page. The work
  itself is all still described. Reasoning lives in `content/experience.ts`.
- **"Basics of Nutrition" certificate**, and the soft skills "touch typing",
  "collaboration", "multi-tasking". Off-brand or unevidenced.
- **"ANURAG MISHRA"** — appeared twice in his own notes. The name is **Anupam**.
- **`#FBA71B` as the brand gold.** It is only Quiet Compound's `theme-color`
  meta tag and appears nowhere on screen. See §3.

---

## 2. The integrity model — the non-negotiable

Nothing on this site is invented. No metrics, outcomes, dates, client names or
research findings. Where a write-up exists offline but was not supplied, the
case study renders an explicit "not yet published" note.

Mechanically:

- `[ADD …]` placeholders are detected at runtime by `lib/content.ts`.
- Placeholders **never** enter JSON-LD — a fabricated `sameAs` is where a wrong
  fact does the most damage.
- Case-study sections carrying `pending: true` render `PendingNote`.
- Research citations are attributed inline and link to primary sources.
- **Rule for citations: if you cannot open the primary source, the sentence does
  not go on the page.**

A research agent found and excluded nine fabricated claims circulating in search
results — a non-existent "McKinsey 2025 Global Shipping Report", a Maersk
"$300M saved" figure traceable only to a vendor blog, invented IAPH port
statistics. Do not let these back in.

---

## 3. Brand and palette — "Counterfoil"

The site now runs the **Counterfoil** direction from `REDESIGN.md`: warm laid
paper, iron-gall ink, and red as "the hand". Three inks with nameable sources —
**black is what was printed, red is what a person added by hand, brass is what
the product looks like.**

| | Light | Dark |
|---|---|---|
| Paper / ground | `#f8f5f0` | `#181511` |
| Ink | `#281e17` | `#efede7` |
| Red (links, focus, hand) | `#892f20` | `#eda088` |
| Brass (product plate only) | `#dcbb4d` | `#dcbb4d` |

**Brass is contained.** It resolves only inside the product plate — never the
header, footer, a hover or the favicon. Gold everywhere reads as a
trading-signals site; gold contained to the product's own block reads as
quoting the product. This needs a lint rule, not a convention.

Brass values still derive from Quiet Compound, measured from the running site
via CDP: `#D9B540` text / `#C9A227` fill in dark, `#8C6D16` in light. The
widely-quoted `#FBA71B` is only its `theme-color` meta tag and appears nowhere
on screen.

**Known bug in his product:** its light-mode link gold `#B08A1C` measures
3.10:1, below AA for body text. Do not copy that value.

**Hard rules.** Light-on-dark body text at L >= 0.77; dark-on-light at L <= 0.51
(dark mode needs ~55% more lightness separation for the same perceived contrast
and WCAG 2 does not know that). `--border` and `--accent-line` are decorative
*by contract* — if anything informational depends on seeing them, it must use
`--border-strong` or `--red-mark`. No red on a fill, beside a number, or next to
green; ceiling roughly 3% of painted pixels.

**The ambient glow is deleted.** There is no light source in a printed page, and
that radial was simultaneously the crypto tell and the template tell.

Colour is solved, not eyeballed: `scratchpad/gold.py` converts OKLCH to linear
sRGB, checks the chroma ceiling, and binary-searches for a target ratio.
**Always verify against compiled CSS** — Lightning CSS rewrites values and
Tailwind's `@theme inline` aliasing means the source token name is not what
ships. Three real bugs were caught this way.

---

## 4. Decisions with reasons

| Decision | Why |
|---|---|
| Work leads with **shipped products**, research second | A live URL a recruiter opens in one click outranks an unpublished dissertation. His call, 16 Aug. |
| **All six academic projects cut** (17 Aug) | Reverses the 16 Aug "keep all five". His call: they are theory-based and "do not add value". Correct — none had a problem statement, and a section where six of eight entries open with "this study asks" trains the reader to skim. Only Quiet Compound and ReminderPro remain. |
| No GitHub link on site (until repo is public) | An empty profile linked from a portfolio is worse than no link. Revisit once `Portfolio` is pushed. |
| No contact form | Needs a backend to be real; a form that silently fails loses the message and the trust. |
| `/resume` as a route, not a homepage toggle | Shareable, linkable, printable, unambiguous. Renders from the same content files so they cannot drift. |
| No project or certification filter | Filters over 5–8 items cost a click to reveal what is one scroll away. |
| No skill proficiency bars | Self-assigned percentages are unverifiable padding. |
| No animation library | Reveals are one IntersectionObserver + CSS. Four runtime deps total. |
| Résumé **compact mode hides elaboration only** | Roles, dates, responsibilities, grades and credentials stay in both modes — enforced by functional test. Hiding substance is how interactive résumés fail. |

---

## 4b. The narrative spine — HIS directive, 16 Aug 2026

He asked for the site to be built as a three-act story, in this order:

> **1.** What I have done · **2.** My projects — *and what problem each one
> solves* · **3.** What my future goal is — **no more than two.**

This supersedes the eight-section catalogue currently on the site. Three things
about it are load-bearing and must not be quietly dropped:

**It is a narrative, not an index.** Past, present, direction. A visitor should
be able to retell it after closing the tab. The current site is a well-organised
list, which is exactly why it reads generic — lists have no momentum.

**Projects are framed by the PROBLEM, not the artefact.** "Quiet Compound is a
trading journal" is a description. "People aren't honest in tools they don't
trust, so the data lives on your device" is a problem and a decision. The second
is what a consulting or analyst recruiter is actually reading for, and it is the
framing that makes an academic project sound like work rather than coursework.

**Maximum two future goals.** This is a discipline, not a budget — and it
resolves his real weakness. He is targeting four job tracks at once (analyst,
HR-tech, consulting, AI generalist), which reads as unfocused. Two goals stated
at a level *above* those four tracks let the breadth look deliberate instead of
scattered. Do not let this list grow to three, four or five.

**Implemented 17 Aug.** The page is now exactly three numbered movements:

```
01  What I have done   About prose + Roles + Capabilities + On the record
02  What I have built   Quiet Compound (lead) + ReminderPro
03  Where I am going    two goals, and two is a ceiling
    Contact
```

Only the acts carry folio numbers. Blocks inside an act use `SubHeading`, which
is deliberately unnumbered — if every block had a number, the numbering would
stop meaning "one of three movements" and start meaning "a heading", which is
what the old eight-section site did. Nav is Done / Built / Going / Contact.

`content/goals.ts` holds Act 3 and documents the two-item ceiling in a comment
so it is a decision rather than an accident. **The goals are the only content on
this site that cannot be verified from the inventory — they are statements of
intent and need his sign-off in his own voice.**

---

## 4c. Type system (phase 3, 17 Aug)

Geist is gone. It is what `create-next-app` installs, so on a Next site
deployed to Vercel it reads as the absence of a typeface choice.

| Face | Job | Shipped |
|---|---|---|
| Source Serif 4 VF (wght 370–650, opsz 10–34) | body, prose, small-caps labels | 145 kB |
| Instrument Sans 500 / 600 | headings, row titles, buttons | 44 kB |
| IBM Plex Mono 400 | folios, dates, stamps | 10 kB |
| Source Serif Italic, Fraunces wordmark | on disk, unused until phases 4–5 | 18 kB |

**Never `next/font/google` for these.** Its CDN re-subsets and strips the
OpenType tables. Source Serif arrives from it without `smcp`/`c2sc`/`onum`/
`lnum`/`zero`/`case`, so every small-caps label would silently render as fake
squashed capitals. The upstream OFL files are fetched, axis-clipped, subset and
committed by `scratchpad/fonts3.py`, which prints the surviving GSUB features.
The shipped roman carries `c2sc case ccmp liga lnum onum pnum smcp tnum zero`,
verified against the compiled woff2.

**X-height normalisation** — measured from the shipped files, not from
specimens: Source Serif 0.4910 (reference), Instrument Sans 0.5100 →
`size-adjust: 96.3%`, IBM Plex Mono 0.5160 → `95.2%`. Skipping this is what
makes a multi-family system look assembled rather than designed.

**Body is 19px, not 17.** Source Serif's x-height is 7.7% below Geist's, so
keeping the old token would have shipped a legibility regression disguised as a
font swap.

**The label layer is real small caps** via `font-variant-caps: all-small-caps`,
source text left in normal case so copy-paste and screen readers stay clean.
The old letterspaced-uppercase-mono label (`label-mono`) is retired; the utility
is now `label-sc`. Held at `--ink-3` and targets ≥5.5:1, not 4.5:1, because
small caps carry less ink per glyph.

**Figure routing is deliberate and three-way:** lining+proportional by default,
oldstyle in prose (`p`, `li`), tabular+lining+slashed-zero in columns. The same
year renders two ways on one page; the boundary is intent, not inconsistency.

**Per-theme weight** — `--w-body` 400/380, `--w-heading` 600/570. Light text on
a dark ground optically thickens; this is a one-token fix no static-font site
can make.

**Cost, honestly:** preloaded font went 69 kB → 145 kB, first load ~304 kB →
~377 kB. Phases 4 and 6 delete the sticky header, mobile menu, scroll listener
and IntersectionObserver, which is where that comes back.

---

## 4d. Standing instruction — commit AND publish

**His instruction, 17 Aug 2026: commit and push after every set of changes.**
This is durable authorisation for pushing to `github.com/anu78600/Portfolio`
(public). Do not ask again each time; just verify the build first.

Order every time: typecheck -> build -> verify (overflow probe, contrast against
compiled CSS where colour changed) -> commit -> push. Never push a red build.

## 5. Hard-won gotchas

- **`pkill` does not work in this environment.** Stale `next start` processes
  keep serving old build manifests and you will screenshot a stale page and draw
  false conclusions. Kill via PowerShell `Get-CimInstance Win32_Process … |
  Stop-Process -Force`, then confirm the served CSS filename matches the one on
  disk before trusting any screenshot.
- **Headless Chrome `--window-size` is not mobile emulation.** It clips instead
  of reflowing, which looks exactly like a horizontal-overflow bug. Use CDP
  `Emulation.setDeviceMetricsOverride`. `scratchpad/shoot.mjs` does this and also
  reports overflow offenders by selector.
- **Contrast must be checked on compiled output.** Two real failures were found
  this way (a near-black background, and `border-strong` below 3:1).
- **`scroll-padding-top` and the scroll-spy line must agree**, or clicking a nav
  link leaves the previous item highlighted.
- Bash heredocs choke on this content's quoting; write Python to a file and run
  it instead.
- The `[ADD …]` placeholder convention is load-bearing. Don't "tidy" it away.

---

## 6. Current state

Next.js 16 · React 19 · TypeScript strict · Tailwind v4 · Geist Sans/Mono.
Four runtime dependencies. 16 static routes. ~304 kB first load.
Zero horizontal overflow verified at 320/375/390/430/768/1024/1440/1920.
WCAG 2.2 AA verified in both themes against compiled CSS.

Repo: `github.com/anu78600/Portfolio` (public). Two commits, **not yet pushed**.

### Still open

- `siteUrl` in `content/profile.ts` — blocks deploy
- Portrait photo → `public/portrait.jpg`
- `public/resume.pdf`
- Dissertation methodology / findings / implications (3 pending sections)
- Quiet Compound build detail; ReminderPro deployment status
- 6 project years, 5 credential URLs, 2 Forage dates
- Outlier AI end date (résumé shows "Jun'26" with no end)
- Whether to show a phone number (redacted in his PDF)

---

## 7. Where things live

```
content/          His facts. Components never hard-code them.
app/globals.css   The entire design system. All tokens.
DESIGN.md         Design reasoning, contrast tables, rejected ideas.
SETUP.md          Fill-in checklist for him.
scratchpad/gold.py, verify_ramp.py    Colour solver + palette validator
scratchpad/shoot.mjs                  CDP screenshot + overflow probe
scratchpad/test-density.mjs           Résumé toggle functional test
```
