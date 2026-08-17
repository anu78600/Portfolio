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

**And after every phase, run two agents** (his instruction, 17 Aug):

1. **Analyse** the whole site as built — read the actual files, find real defects.
2. **Report** — errors, improvement suggestions, and where it can be made more
   premium.

Run them as a Workflow so the analyst's findings feed the reporter. Give the
analyst the repo path and make it read files rather than reason from the diff;
the most valuable findings this session all came from reading shipped code and
compiled CSS, not from reasoning about intent.

## 4e. The verification harness — `npm run verify`

141 checks, ~30s, exits non-zero. Needs a production server on `BASE_URL` and
headless Chrome on `--remote-debugging-port=9222`.

```
powershell -ExecutionPolicy Bypass -File scripts/serve.ps1
npm run verify
```

Every check exists because something real got through:

| Group | What it catches |
|---|---|
| contrast | Full Cartesian product of (text x surface) in light, dark, the light plate AND the dark plate, read from **compiled** CSS. Found a defect the 2-agent audit missed on its first run. |
| print | Emulates print, asserts every text colour clears 4.5:1 **against white** — because printers drop backgrounds. This is the check that would have caught the plate printing as a white hole at 1.16:1. |
| layout | Overflow at 9 widths x 2 themes with real device emulation — **both directions**, right and left. |
| share | The OG card responds 200, is a valid PNG, is 1200x630, and is not blank. It broke twice: wrong palette once, failed to render once. |
| structure | One h1, a main landmark, a skip link, alt on every image — and **that the stylesheet actually loaded**, which catches the stale-server failure. |
| assets | Brass appears nowhere outside the plate. |

Things learned building it, all worth keeping:

- **Do not `process.exit()`** — it tears down the CDP socket mid-flight, trips a
  libuv assertion on Windows and returns 127, which destroys the exit status. A
  harness whose exit code cannot be trusted cannot gate anything. Set
  `process.exitCode` and let the loop drain.
- **Verify the harness fails.** The first "break a token and check it fails"
  test passed with exit 0 because the sed targeted a value that no longer
  existed. A harness proven only in the passing direction proves nothing.
- **A green harness is evidence about what it measures, nothing more.** On
  18 Aug it read 141/141 while the flagship block hung 50px off the left edge of
  every phone and the dark plate carried a 2.96:1 border. Both were found by
  agents looking at the thing, then written into the harness as checks 142–192.
  When a design agent reports a defect the suite calls green, the suite is
  usually the thing that is wrong.

**Now 225 checks**, after three more families were added on 18 Aug — each,
again, because something real got through:

| Group | What it catches |
|---|---|
| motion | Every `view()` timeline must resolve to `<html>`. A clipping ancestor re-parents it *silently*: the animation stays listed, `playState` reads "running", progress pins at a constant, and nothing ever moves. |
| content | No `[ADD …]` placeholder in visible text **or in JSON-LD**, on `/`, `/resume` and a case study. |
| assets | No blurred backdrop in compiled CSS. The ban had been stated absolutely since REDESIGN §4.3 and never tested, so it survived two purges on a floating button. |

`/work/[slug]` had never been loaded by any check. That blind spot is why a raw
Markdown asterisk sat in the flagship case study's opening sentence. Layout and
structure now cover it too.

Blind spots it had, all now closed — and all are general traps:

- **`scrollWidth` cannot see LEFT overflow.** In LTR, content placed left of the
  origin is *clipped*, not scrolled to, so `scrollWidth - clientWidth` stays 0
  no matter how far off-canvas an element sits. Any overflow probe built only on
  scroll extent is half a probe. `checkLayout` now also measures every box's
  `getBoundingClientRect().left` and fails below −1.
- **A regex `match()` returns the FIRST block.** `checkContrast` read
  `/\.folio-product\{([^}]*)\}/`, which is the light plate — so the dark plate's
  tokens were graded as the light plate's, 87 times, and never once tested. Any
  theme that overrides a subset of tokens has to be **merged over its base**
  before checking, the way the cascade does it.

---

## 4f. `npm run copy-metrics` — and how not to abuse it

Measures the mechanical tells of LLM prose. **Deliberately not in a commit
hook**: a hook turns a diagnostic into a target, and a writer optimising for
"em dashes < 4" just starts substituting semicolons — the same tic in a hat.
The script tracks semicolons for exactly that reason.

Three of its rules were wrong on 18 Aug, and fixing a measurement is legitimate
only when you can say what it was mis-measuring. All three were category
errors, not inconvenient results:

- **`Term — gloss` is not the em-dash tic.** "Udhar tracker — informal lending,
  treated as the real debt it is" is a definition list, and four parallel
  bullets in that form are a deliberate structure. Nine of fourteen flagged
  dashes were that. A dash is exempt when it is the string's first, sits in the
  first 50 characters, and no sentence has ended before it. **Five genuine
  prose asides remain and the budget is real: 3.95 / 1,000 against a ≤4 ceiling
  and a human mean of 3.23.** It is not passing by much. Do not spend the slack.
- **Flat runs are a property of a paragraph.** Scoped globally, the detector
  walked from one string's last sentence into the next string's first, so
  parallel list items scored as monotony. Parallelism across items is a
  rhetorical figure; monotony inside a paragraph is the tic.
- **Sentences must be split per string.** Bullets have no full stop, so
  splitting the joined text welded each to its neighbour — the "longest
  sentence" reported 66 words when it was two 12-word bullets.

The honest test each time: *would a good human writer have written this?* If
yes, the metric is wrong. If no, the copy is. **One red remains and it is a
true positive** — the Act 3 goals paragraph has no concrete anchor. It is also
the copy awaiting his sign-off, so it is his to fix, not mine.

---

## 5. Hard-won gotchas

- **`pkill` DOES NOT WORK HERE. Use `scripts/serve.ps1`.** This has now bitten
  twice. When `pkill` silently fails you get two Next servers; the stale one
  keeps port 3000 and serves an old file manifest, so **the stylesheet 404s and
  the browser renders raw unstyled HTML** — default bullets, no layout, skill
  names running into their notes. It looks exactly like the site is broken. It
  is not. Symptom to recognise instantly: the page's own CSS URL returns HTTP
  404 with a 9-byte body.

  `scripts/serve.ps1` kills every next process, asserts none survived, builds,
  starts one server, **fetches the page's own stylesheet and fails if it is not
  200**, and then **starts headless Chrome on 9222** if nothing is listening
  there. Always use it. Never hand-roll the restart again.

  Two later repairs to it: the fixed 9-second sleep was a race that reported
  "no stylesheet referenced" when it really meant "the server was not up yet" —
  it polls now; and Chrome needs its own `--user-data-dir`, or it hands the
  arguments to the user's already-running browser, exits, and never opens the
  debugging port.
- **Headless Chrome `--window-size` is not mobile emulation.** It clips instead
  of reflowing, which looks exactly like a horizontal-overflow bug. Use CDP
  `Emulation.setDeviceMetricsOverride`. `scratchpad/shoot.mjs` does this and also
  reports overflow offenders by selector.
- **`overflow: hidden` IS A SCROLL CONTAINER; `overflow: clip` is not.** Any
  `animation-timeline: view()` on a descendant of a `hidden` box re-parents to
  that box. If the box never scrolls, progress pins at a constant forever and
  the animation is a **silent no-op** — it stays in `getAnimations()`,
  `playState` reads "running", and nothing moves. Indistinguishable from
  forgetting to write the CSS. `clip` clips to the same padding box, honours the
  same radius, and is paint-identical (diffed at DPR 2: byte-identical PNGs).
  The plate is `overflow-clip` for exactly this reason. `scripts/verify.mjs`
  now asserts every timeline resolves to `<html>`.
- **Two animations that both write `transform` do not compose — the later name
  wins outright.** Measured on the plate: adding `transform: scale()` beside the
  reveal yields `matrix(0.942705,0,0,0.942705,0,0)` — the translateY is exactly
  0 and the reveal's 12px lift is silently deleted. Use the independent `scale`
  property: it yields `matrix(1,0,0,1,0,3.02572)` **and** `scale: 0.941879`,
  both applied, because CSS resolves translate → rotate → scale → transform.
- **`prefers-reduced-motion` must be an explicit guard on scroll-driven
  animation.** The global reset clamps `animation-duration`, and duration is
  meaningless to a progress-based timeline. Without the
  `@media (prefers-reduced-motion: no-preference)` wrapper it runs anyway.
- **A paginated print has no scrollport**, so every `view()` timeline sits at
  progress 0 and every reveal prints at **opacity 0**. Measured: 33 of 41
  reveals invisible, and the homepage PDF was 169 kB against 522 kB with
  `animation: none !important` in the print block. The print section had claimed
  "reveal animations are all removed" since before they were scroll-driven.
- **Tailwind v4 scans the WHOLE project — Markdown and scripts included — and
  treats any matching token as a class candidate.** `REDESIGN.md` and this file
  documenting the blurred-backdrop ban *by name*, plus the harness regex
  forbidding it, all caused Tailwind to emit that very utility into the shipped
  stylesheet. Writing down a prohibition shipped the prohibited thing, and the
  check enforcing it failed itself. Fixed with `@source not` for `*.md`,
  `scripts` and `scratchpad`. Any utility name a doc mentions has this problem.
- **`window.scrollTo` obeys `scroll-behavior: smooth`.** A CDP probe that scrolls
  and settles two rAFs measures the *old* position and reports progress 0 —
  which reads exactly like a broken animation. Pass `behavior: "instant"`.
- **`captureBeyondViewport` does not advance scroll-driven animations.** Reveals
  use `animation-timeline: view()`, which only progresses while the element is
  in the *scrollport*. A full-page screenshot therefore renders every
  below-the-fold section at opacity 0 — a blank image of perfectly good markup,
  which reads exactly like a regression you just caused. Size the viewport to
  the target and `scrollIntoView` it instead; `scratchpad/full.mjs` does this.
  Confirm with computed opacity before believing a blank capture.
- **Contrast must be checked on compiled output.** Two real failures were found
  this way (a near-black background, and `border-strong` below 3:1).
- **`scroll-padding-top` and the scroll-spy line must agree**, or clicking a nav
  link leaves the previous item highlighted.
- Bash heredocs choke on this content's quoting; write Python to a file and run
  it instead.
- The `[ADD …]` placeholder convention is load-bearing. Don't "tidy" it away.

---

## 6. Current state

Next.js 16 · React 19 · TypeScript strict · Tailwind v4 · Source Serif 4 /
Instrument Sans / IBM Plex Mono, vendored. Four runtime dependencies.
16 static routes. Zero overflow in **either** direction at
320/360/375/390/430/768/1024/1440/1920. WCAG 2.2 AA verified in light, dark,
light plate and dark plate against compiled CSS. **225 checks green.**

Repo: `github.com/anu78600/Portfolio` (public).

### The plate rebuild (18 Aug) — what changed and why

He said the plate "looks akward". It was: a 1440×900 landscape capture poured
into a figure column with **no ratio of its own**, so the column stretched to
whatever height the prose reached and `object-cover` cropped whatever that
produced — 526×636 at 1440. Only 52% of the image width survived, centred on
the empty gutter between the app's two panels, slicing UI text mid-word. The
crop was decided by copy length.

- The figure now has its own `aspect-[13/15]`, matching a **new crop** of the
  same capture (`quiet-compound-journal.png`, 780×900, no recapture, no
  invented UI). It frames the journal card: red margin rule, folio QC·0247, the
  handwritten entry, "no FOMO · no revenge", the REVIEWED stamp — Counterfoil's
  own vocabulary, rendered by his own product. It also drops the app's brass
  **Enter** button, which was the largest saturated-gold object on the site.
- Two frames need **two alts** (`imageDetail` / `imageDetailAlt`). The wide
  shot's alt describes a sign-in panel the crop does not show, and describing
  something not on screen is a fabrication like any other.
- A **mat** (padding in the plate's ground) sits between the screenshot's
  blue-black and the plate's warm black, so the two colour worlds never share
  an edge. This is what stops the hue difference reading as a fault.
- A **plate caption** under it. The most credible-looking text object in
  publishing, and what tells a reader the dark rectangle is a reproduction of
  another application rather than a panel of this page.
- The metadata `well` became a stamped line under a rule. `--well-shadow` is
  cream-tuned, and `.folio-product` never overrode it, so in **light** theme a
  well inside the always-dark plate painted a 70%-white hairline on near-black.

### Also fixed in that pass

- ReminderPro's card read "PRODUCTIVITY · SHIPPED PRODUCT" while the section
  lede said "finished and not deployed". Now `Built · not deployed`, and
  `ProjectStatus` is a two-value union so the academic values cannot come back.
- Dark `--surface-elevated` (0.272) sat **above** the plate ground (0.262), so
  ReminderPro's card outranked the flagship. Now 0.252.
- Light `--surface-elevated` (0.988) was paper whiter than the paper — i.e.
  `--paper-raised`, which REDESIGN §7 deleted *by name*, readmitted under
  another. Now equals `--surface`. Four planes: sunk, paper, tint, plate.
- Radii were 6/8/12/16 against a documented "nothing above 3px". Now 2/3/3/3;
  74 elements, no component touched.
- Four full-bleed section rules crossed the vermilion margin rule — the one
  thing only the plate may cross. Deleted. Snapshot's `border-y` moved onto the
  `<ul>` inside `container-counterfoil`. The footer keeps its rule: it sits
  outside `<main>`, so it never crosses the rule at all.
- Folio numbers appeared on About blocks and goals *inside* numbered acts, so a
  reader saw "01 What I have done" and "01 Background" on one screen. Only acts
  are numbered now; `index` survives as a sort key.
- `backdrop-filter` on the scrolled header — banned by REDESIGN §4.3, listed as
  a template signal in §7, and the most expensive paint on a mid-range Android.
  Gone, with `--header-bg` (which existed only to be blurred behind).

### The settle, and the professionalism pass (18 Aug, second run)

He asked for the plate to "first be short and gradually zoom" instead of being
permanently big. A 13-agent run designed it and audited the whole site: 73
findings, 8 adversarially verified, 0 refuted.

**The settle.** The figure — *not* the plate — scales 0.9 → 1 on
`animation-range: entry 45% entry 100%`. Scaling the plate was rejected: it holds
21px Source Serif and a composited scale resamples rendered text, and the plate
is never more than 71.6% visible on any phone (354 × 1179 at 390, 1.40
viewports), so the growth would happen on an object still sliding in. Measured:
the growth runs over **292px of scroll at 1440 and 190px at 390**, always
finishing exactly as the figure fully arrives. One range, no breakpoints — for a
box shorter than the scrollport the `entry` length equals the box's own height,
so entry progress *is* the fraction on screen, width-invariant by construction.

**Be honest about what it does not do:** he said "instead of it permanently this
big", and this changes the size for a fifth of a flick and then restores exactly
the size he objected to. The plate's desktop height (605px) is set entirely by
the **prose column** (603px vs the figure column's 598px), so no change to the
mat, the width or the figure can shrink it. Only shortening `project.thesis` or
the `TagRow` can. That is a copy decision and it is his.

**Also fixed, in value order:**

- `[ADD ISSUER]` rendered on screen at 5.76:1 **and inside JSON-LD on every
  route** — publishing an Organization that does not exist. The §2 rule that a
  placeholder never becomes structured data was documented, asserted in
  `lib/seo.ts`'s own header comment, and not enforced anywhere.
- Raw Markdown `*no app touches*` printed literally in the flagship case study's
  first sentence — the same string renders as `<em>` on the home page, because
  one call site wraps it in `Prose` and the other did not.
- The homepage printed a fraction of itself (see the print gotcha above).
- `BackToTop` deleted: it carried the last blurred backdrop on the site and
  parked 44×44 of furniture permanently over running body copy on every phone.
- Both remaining blur scrims (mobile menu, command palette) → opaque black.
- The header faded its background over 300ms, so text passed through a
  see-through bar for ~100–200ms. Only the hairline transitions now.
- List bullets used `--accent-line`, decorative *by contract*, at 2.20:1 light
  and 2.89:1 dark. Now `--border-strong` at 3.96:1 / 4.60:1.
- `sizes` under-declared the figure by 10% at 1024, costing a resolution rung.
- The mobile menu numbered Contact "04", against the three-act spine.

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
