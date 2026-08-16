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
| Research | MBA dissertation: agentic AI in global logistics, shipping sector. Findings NOT supplied. |
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

## 3. Brand: derived from Quiet Compound

The portfolio's accent is taken from his live product so the two read as one
brand. Values were **measured** from the running site via CDP computed styles,
not guessed.

| | Dark | Light |
|---|---|---|
| Quiet Compound accent text | `#D9B540` | `#B08A1C` |
| Quiet Compound fill | `#C9A227` | `#8C6D16` |
| Portfolio accent (derived) | `#d8b346` | `#83680b` |

Quiet Compound is Tailwind v4 on **stock palette tokens** — it has no custom
design system. Fonts: Inter, Caveat (handwriting), Fraunces (serif). Its glow is
a single radial at 5–6% opacity, `circle at 50% -10% … transparent 55%`. Its
grain is an SVG `feTurbulence` data URI.

**Known bug in his product:** its light-mode link gold `#B08A1C` measures
**3.10:1** — below AA for body text. The portfolio uses a darker value. Do not
"fix" the portfolio to match his lighter gold.

**Deliberately not taken from the product:** its blue-tinted slate ground
(chroma 0.042 at hue 265). Blue ground under a gold accent is complementary and
turns garish, and a high-chroma darkest field is the main cause of a dated
blue-black cast.

Colour work is solved, not eyeballed: `scratchpad/gold.py` converts OKLCH →
linear sRGB, checks the chroma ceiling at each lightness, and binary-searches
the lightness that hits a target WCAG ratio. **Always verify against the
compiled CSS, not the source** — Lightning CSS rewrites values, and two real
bugs were caught this way.

---

## 4. Decisions with reasons

| Decision | Why |
|---|---|
| Work leads with **shipped products**, research second | A live URL a recruiter opens in one click outranks an unpublished dissertation. His call, 16 Aug. |
| All five academic projects kept | Useful for the consulting/graduate track. His call. |
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

Sections that survive fold into the three acts rather than sitting beside them:
experience and education become evidence inside act one; capabilities and
certifications become supporting detail rather than their own chapters;
"currently exploring" is absorbed into act three, which is what it was always
gesturing at. Contact remains the closing call.

---

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
