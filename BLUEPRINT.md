# Blueprint — the ground-up restructure

**Status: PROPOSED. Nothing here is implemented. Awaiting his sign-off, per his
instruction: "make the blueprint first, and ask me at the time of
implementations."**

Drafted 19 Aug 2026 from a 104-agent deep-research run (96 claims extracted,
25 adversarially verified by 3-vote panels, 9 findings survived, 6 refuted)
plus everything this project has measured on its own pages. Findings are cited
as [F1]–[F9]; session measurements as [M].

---

## 0. The one-sentence thesis

The site's visual system is now strong and stays; the **structure** still
buries the proof. A recruiter is a fast negative filter [F1], the strongest
current hero formula leads with actual work [F2], and shipped products outrank
everything else in a thin portfolio [F3] — so the restructure moves the live
product from screen 8.7 [M] into the hero, fuses identity + proof + contact
into the first viewport, and renumbers the acts around that inversion.

---

## 1. What the research established (and how much to trust it)

| # | Finding | Confidence | Who says it |
|---|---|---|---|
| F1 | Review is a fast negative filter (order-of-magnitude: under a minute). Seniority signal + visible contact email belong above the fold. | medium | hirers + educators; second-counts are folklore |
| F2 | The strongest hero formula leads with actual work — one strongest screen, shown large, plus a short verbal anchor. Montage heroes and animated intros are named mistakes. | medium (12-0) | award anatomy + educators |
| F3 | Shipped > concept ("real work faces trials and tribulations"); case studies follow problem → before → artifacts → validation → metrics. | **high** (6-0) | six named hiring managers |
| F4 | 3–5 case studies optimal; junior floor is 2–3. Two projects is the bottom edge of credible, not outside it. | medium | mixed |
| F5 | The thin-portfolio remedy is real-constraint work (nonprofit/small-business projects, structured redesigns) — not padding. | medium | hirers |
| F6 | Template-ecosystem skeleton: hero → work → about → skills → testimonials → contact. A tendency, **not** a canon — the over-specified versions of this claim were refuted. | medium | templates/Figma course |
| F7 | Award tier is contested between motion-maximal and minimal tracks; every 2026 Awwwards portfolio winner also carries a Developer Award. | medium | award coverage |
| F8 | Awwwards juror (Netflix): over-animation is the dominant failure — "the substance has to be louder than the form." | **high** (3-0) | a judge |
| F9 | A minimal client/brief/output project format coexists with the full arc — different reader modes. | low | single source |

**Caveats that bind this blueprint** (from the report, verbatim in spirit):
nearly all prescriptive advice is UX-designer-specific — transfer to an
analyst/HR/consulting/AI profile is inference; no source addressed India,
LinkedIn-referred traffic, or phones; the Figma Community itself was JS-walled,
so template findings lean on Figma's own course and secondary coverage; the
6 refuted claims (incl. "restraint is the central thesis" and the "three
pillars of award sites") must not creep back in as common knowledge.

**Where the research agrees with what we measured ourselves [M]:** hiring
managers zero in on the intro then look for proof (60+ manager survey, earlier
session); 65% would definitely open an *inexperienced* candidate's portfolio;
his work sat 12 screens down before the last cut and sits at 8.7 now; his
33-word hero already matches the best comparable sites.

---

## 2. The proposed structure

One page + two case studies + `/resume`. Mobile-first. Target: whole page
**≤ 9 phone screens** (now 12.8; was 16.2).

### S1 — HERO: identity, proof and contact in one viewport  *(the big change)*

Leads with the work [F2], carries the negative-filter essentials [F1]:

```
┌────────────────────────────────────────────┐
│ AM · Anupam Mishra          nav · [Resume] │
│                                            │
│ BUSINESS × AI × ANALYTICS   (typed, mono)  │
│ Anupam Mishra — MBA (HR+IB) top 10%,       │
│ open to analyst & AI roles · India         │  ← seniority signal [F1]
│                                            │
│ "Most AI work stops at the demo.           │  ← verbal anchor [F2]
│  I want the part after."                   │
│                                            │
│ ┌──────────────────────────────┐           │
│ │  QUIET COMPOUND — journal    │           │  ← the strongest single
│ │  view, REAL screenshot,      │           │    screen, shown large [F2]
│ │  shown large. LIVE ●         │           │    (the unused 780×900
│ │  [Open the live app ↗]       │           │    journal crop returns)
│ └──────────────────────────────┘           │
│ anupam78600@gmail.com · LinkedIn           │  ← contact above fold [F1]
└────────────────────────────────────────────┘
```

- The **product screenshot becomes the hero image** — one screen, not a
  montage, with the live link on it. This is the single largest structural
  change and the one every source family converges on.
- The three-paragraph intro leaves the hero (the anchor line + seniority line
  carry it); the paragraphs move into About (S3).
- **Email is visible in the hero.** It currently first appears ~12,000px down.

### S2 — ACT 01 · WHAT I HAVE BUILT  *(work moves to first position)*

- Quiet Compound: full-width panel card → case study. Already hero'd above,
  so this card is compact — thesis + methods + case-study link.
- ReminderPro: honest row, `Built · not deployed`, drawn checklist figure.
- Two projects is the junior floor, acceptable [F4]. The remedy for thinness
  is **his** to choose, not mine to fake [F5] — see §5.

### S3 — ACT 02 · WHAT I HAVE DONE

- About, compressed to two blocks (Background, How I work) from four; the
  displaced hero paragraphs fold in here.
- Roles (three, as now).
- **The record**: education stays prominent — it is his strongest verified
  signal and no source addressed academics placement at all (open question in
  the report), so our own reasoning governs: top-10% / top-3% / LLB-in-progress
  earns its place for an early-career candidate. Certifications + skills stay
  on `/resume` (previous session's evidence stands; F6's skeleton includes a
  skills section but only as a template tendency, and its strong versions were
  refuted).

### S4 — ACT 03 · WHERE I AM GOING

Unchanged in substance: two goals, ceiling of two (his 16 Aug directive).
Still awaiting his sign-off on the copy — the one remaining copy-metrics red.

### S5 — CONTACT

As now, plus the hero already carries the email so this section can shrink.

### Case study — `/work/quiet-compound` restructured to the hiring-manager arc [F3]

problem → before-state → artifacts → validation → metrics, **adapted to the
integrity model**: the "metrics" step becomes *"what can be checked"* (the live
URL, the local-first architecture, the shipped modules) because inventing
success metrics is the one thing this site never does. The deviation is
deliberate and documented — honest validation beats fabricated impact, and the
hirer source itself demands data over assertions. ReminderPro keeps the minimal
client/brief/output format [F9] — right-sized for an undeployed project.

### Navigation

`Built · Done · Going · Contact` + the one boxed `Resume` CTA (unchanged
one-filled-element-per-bar grammar).

---

## 3. What survives unchanged (the system is an asset, not the problem)

- Type system (Source Serif 4 / Instrument Sans / IBM Plex Mono, real small
  caps, figure routing) and the sans UI-chrome pass.
- Austere zero-chroma palette + deep teal accent; panel/glass elevation
  grammar; aurora.
- The signature motion set — drawn hairlines, act slides, settle, typewriter,
  registration mark — **within F8's warning**: substance louder than form. No
  additions. The motion-maximal award track is explicitly rejected [F7, F8]:
  it is developer-showcase-coupled and this is not a developer showcase.
- Margin rule + stub + folios at every width.
- The 185-check harness, `/resume`, print stylesheet, integrity model.

## 4. What is discarded

- The 16 Aug act order (done → built → going). **This inversion supersedes his
  own earlier directive and is the main thing requiring his explicit consent.**
- The intro-first hero (three paragraphs before any proof).
- The drawn figure for Quiet Compound on the home page — the real screenshot
  returns, as the hero [F2]. The drawn journal figure remains available for
  compact contexts.
- Contact as the only home of the email address.

## 5. Needs him, not me

1. **Consent to the act inversion** (supersedes 16 Aug three-act order).
2. **Consent to the hero formula** (product screenshot as the hero image).
3. Act 03 goals copy sign-off (unchanged ask).
4. Optional third project via the credible remedy [F5]: a real-constraint
   piece (a nonprofit/small-business build, or a structured redesign of a
   named product, labelled as an exercise). His call whether to pursue.
5. The standing blockers: `siteUrl`, `resume.pdf`, portrait, LLB years.

## 6. Implementation plan (after sign-off only)

| Phase | Scope | Gate |
|---|---|---|
| 1 | Hero rebuild (identity line, anchor, product-screenshot hero, contact row) | typecheck → build → verify → screenshots both themes at 390/1440 |
| 2 | Act reorder + About compression + nav/folio renumbering | same + scroll-spy/anchor checks |
| 3 | Case-study arc restructure (content file reshuffle, no invented copy) | same + content checks |
| 4 | Harness updates (hero-contact check, section-order check, page-height budget ≤9 screens at 390) | prove each new check fails first |

Each phase is a separate commit; any phase can be reverted alone.
