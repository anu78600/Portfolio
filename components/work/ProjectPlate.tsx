import Image from "next/image";
import type { ProjectFigure } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Project visuals.
 *
 * No screenshots were supplied, and inventing application UI that could be
 * mistaken for real work is worse than having no image at all. So each project
 * gets a drawn abstraction of its *method* instead — an application frame for
 * shipped software, a network for research, a chart for analysis, a
 * construction outline for a concept, a document for a report.
 *
 * Which drawing a project gets is a REQUIRED content field, not a hash of its
 * slug. The hash gave the two products different pictures by parity luck;
 * renaming a slug would have silently collided them.
 *
 * They are monochrome with a single accent element, sit on a shared hairline
 * grid, and use one fixed frame across every card — which is what keeps a set
 * of otherwise imageless projects looking composed.
 */

const stroke = "stroke-[var(--border-strong)]";
const accent = "stroke-[var(--accent)]";

function Research({ v = 0 }: { v?: number } = {}) {
  const layouts: [number, number][][] = [
    [[22, 26], [22, 62], [58, 18], [58, 44], [58, 70], [96, 44]],
    [[20, 20], [20, 45], [20, 70], [60, 32], [60, 58], [98, 45]],
  ];
  const edgeSets: [number, number][][] = [
    [[0, 2], [0, 3], [1, 3], [1, 4], [2, 5], [3, 5], [4, 5]],
    [[0, 3], [1, 3], [1, 4], [2, 4], [3, 5], [4, 5]],
  ];
  const nodes = layouts[v % layouts.length];
  const edges = edgeSets[v % edgeSets.length];

  return (
    <g fill="none" strokeWidth="1">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          className={stroke}
        />
      ))}
      {nodes.map(([x, y], i) => {
        const isDecision = i === nodes.length - 1;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={isDecision ? 6 : 4}
            className={isDecision ? accent : stroke}
            fill={isDecision ? "var(--accent)" : "var(--surface)"}
            strokeWidth={isDecision ? 1.5 : 1}
          />
        );
      })}
    </g>
  );
}

function Analysis({ v = 0 }: { v?: number } = {}) {
  const sets = [
    [18, 34, 26, 46, 38, 58, 50],
    [46, 30, 52, 24, 40, 34, 60],
    [24, 30, 44, 36, 54, 42, 64],
  ];
  const bars = sets[v % sets.length];

  return (
    <g fill="none" strokeWidth="1">
      <line x1="10" y1="76" x2="110" y2="76" className={stroke} />
      {bars.map((height, i) => (
        <rect
          key={i}
          x={16 + i * 13}
          y={76 - height}
          width="7"
          height={height}
          className={stroke}
          fill="var(--surface)"
        />
      ))}
      <polyline
        points={bars.map((h, i) => `${19.5 + i * 13},${76 - h - 8}`).join(" ")}
        className={accent}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

function Concept({ v = 0 }: { v?: number } = {}) {
  // Two distinct constructions rather than one drawing recoloured.
  if (v % 2 === 1) {
    return (
      <g fill="none" strokeWidth="1">
        <rect x="20" y="18" width="80" height="56" rx="28" className={stroke} />
        <line x1="20" y1="46" x2="100" y2="46" className={stroke} strokeDasharray="3 4" />
        <circle cx="42" cy="46" r="8" className={stroke} />
        <circle cx="78" cy="46" r="8" className={accent} strokeWidth="1.5" />
        <line x1="50" y1="46" x2="70" y2="46" className={accent} strokeWidth="1.5" />
      </g>
    );
  }

  return (
    <g fill="none" strokeWidth="1">
      <rect x="18" y="20" width="84" height="52" rx="4" className={stroke} />
      <rect
        x="30"
        y="30"
        width="60"
        height="32"
        rx="3"
        className={stroke}
        strokeDasharray="3 3"
      />
      <line x1="18" y1="46" x2="102" y2="46" className={stroke} strokeDasharray="2 4" />
      <circle cx="60" cy="46" r="7" className={accent} strokeWidth="1.5" />
      <circle cx="60" cy="46" r="2" fill="var(--accent)" stroke="none" />
    </g>
  );
}

function Report({ v = 0 }: { v?: number } = {}) {
  const sets = [
    [76, 60, 68, 44, 72, 52],
    [68, 74, 40, 70, 56, 66],
  ];
  const rules = sets[v % sets.length];
  const accentRow = v % 2 === 0 ? 1 : 3;

  return (
    <g fill="none" strokeWidth="1">
      <rect x="26" y="14" width="68" height="64" rx="3" className={stroke} />
      {rules.map((width, i) => (
        <line
          key={i}
          x1="36"
          y1={28 + i * 9}
          x2={36 + width * 0.62}
          y2={28 + i * 9}
          className={i === accentRow ? accent : stroke}
          strokeWidth={i === accentRow ? 1.5 : 1}
        />
      ))}
    </g>
  );
}

/* ── the two sheets ──────────────────────────────────────────────────────────
 *
 * The products used to share one drawing — a browser window with three traffic
 * lights — differing only by a small motif inside it, so an "identical pair" of
 * cards read as the same picture printed twice. Worse, the finance branch was a
 * RISING TREND LINE, on the one product whose case study argues that "almost
 * every finance tool is a dashboard, and dashboards reward watching. A journal
 * rewards reviewing." A rising chart is a dashboard, and it is the
 * trading-signals tell the whole palette exists to avoid.
 *
 * Both are now the same sheet of paper with different marks on it: same rect,
 * same radius, same fill, same red margin rule, same head marks, same left text
 * edge, same 8-unit pitch. You read the shared object first and the difference
 * second. Measured at DPR 2 inside the real card, against the same clip with
 * every stroke forced transparent so the fill cancels: ink ratio 0.985 between
 * the two, red within 0.5 of a point. That is what "one hand" means once you
 * stop eyeballing it.
 *
 * Everything here was chosen by downsampling the real screenshot to the size
 * the drawing actually renders at (133x153) and seeing what survives. Five
 * things do: a portrait panel, two marks at the head, a ragged block of
 * writing, a short detached line under it, one small object bottom-right.
 * The ruling does not survive, and neither does the red margin rule at
 * photographic scale — which is exactly why the drawing states it.
 */

/** The shared sheet. Both figures open with this. */
function Sheet() {
  return (
    <>
      {/* Portrait 68x78 ~ 13:15, the ratio of the real capture, so the
          abstraction and the photograph behind the click are the same shape. A
          landscape sheet reads as an index card or an envelope.
          The fill is not decoration: the parent draws a 28px hairline grid
          behind every figure, and an opaque sheet stops it at the paper's edge
          and turns it into the desk the page lies on. Without it the grid runs
          straight through the writing in dark. It also lifts --border-strong
          from 3.37:1 on the bare ground to 3.67:1 on the fill in light.
          rx 1.5 renders 2.8px at 1440 and 2.1px at 320 — under the documented
          3px ceiling at every width. rx 2 would not have been. */}
      <rect
        x="26"
        y="6"
        width="68"
        height="78"
        rx="1.5"
        className={stroke}
        fill="var(--surface)"
      />
      {/* The one accent, and the only vertical: the margin rule, full height, at
          10% of the sheet's width — the stub proportion the product's own sheet
          uses. It is what makes a rectangle a ruled page rather than a document,
          it is this site's structural device quoted at thumbnail size, and it is
          the single feature of Quiet Compound's sheet nothing else can say. In
          ink it reads as a book spine. */}
      <line x1="33" y1="6" x2="33" y2="84" className={accent} strokeWidth="1.5" />
      {/* Folio left, date right — the head of a bound page. Deliberately NOT a
          full-width rule under them: a horizontal crossing the vertical makes a
          table header, which is a dashboard's cousin. */}
      <line x1="38" y1="15" x2="52" y2="15" className={stroke} />
      <line x1="76" y1="15" x2="90" y2="15" className={stroke} />
    </>
  );
}

/** A page that has been written on, and come back to. */
function Journal() {
  return (
    <g fill="none" strokeWidth="1">
      <Sheet />
      {/* Writing drawn as its SETTING, never as letterforms — strokes shaped
          like script read at 240px as scribble, and that was tried.
          Pitch 8 with the SHORT line third, not last: that is the shape an entry
          with a number in it makes, and it is what the real sheet does
          ("240 -> 276"). A block whose short line comes last reads as justified
          body copy. The fifth line is detached by a 12-unit gap — the closing
          line, the product's "no FOMO · no revenge" — and it balances the sheet. */}
      {([
        [32, 76],
        [40, 78],
        [48, 60],
        [56, 88],
        [68, 64],
      ] as [number, number][]).map(([y, x2]) => (
        <line key={y} x1="38" y1={y} x2={x2} y2={y} className={stroke} />
      ))}
      {/* The seal. The difference between "a page with writing on it" and "a
          page someone came back to", which is the product's whole argument. The
          real sheet puts a ring in exactly this corner. A ring, not a stamp box:
          at this size a rounded rect reads as a tag or a button and a rotated
          one reads as a sticker. Ink, not red — one figure gets one accent, and
          it is spent on the margin rule. */}
      <circle cx="84" cy="71" r="5" className={stroke} />
    </g>
  );
}

/** The same page, with boxes instead of an entry. */
function Checklist() {
  return (
    <g fill="none" strokeWidth="1">
      <Sheet />
      {/* Boxes are 6x6, not 7x7. At 7 on a pitch of 8 they leave one unit
          between them and fuse into a single segmented bar at 2x — a real
          defect, measured. 6 leaves two units and they read as four boxes.
          The tick is ink: this figure's one accent is the margin rule, the same
          as its partner's, so neither card is the redder of the two. */}
      {([
        [32, 84],
        [40, 70],
        [48, 88],
        [56, 74],
      ] as [number, number][]).map(([y, x2], i) => (
        <g key={y}>
          <rect x="38" y={y - 3} width="6" height="6" rx="1" className={stroke} />
          {i === 0 ? (
            <polyline
              points={`39.4,${y + 0.1} 40.7,${y + 1.8} 43.6,${y - 2.6}`}
              className={stroke}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : null}
          <line x1="48" y1={y} x2={x2} y2={y} className={stroke} />
        </g>
      ))}
    </g>
  );
}

/* Keyed by `figure`, a required content field — never by a hash of the slug.
   The four legacy drawings keep their bodies but are unreachable today; they
   cost nothing and deleting them would throw away work that a third project
   would want back. */
const figures: Record<ProjectFigure, () => React.ReactElement> = {
  journal: Journal,
  checklist: Checklist,
  network: Research,
  series: Analysis,
  construction: Concept,
  document: Report,
};

export function ProjectPlate({
  figure,
  image,
  imageAlt,
  priority,
  drawn = false,
  size = "card",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className,
}: {
  /** Which drawing. A content decision, never derived from the slug. */
  figure: ProjectFigure;
  /** Real screenshot. When present, the drawn figure is not used at all. */
  image?: string;
  imageAlt?: string;
  priority?: boolean;
  /**
   * Force the drawn abstraction even where a real capture exists.
   *
   * The home-page cards use this. Not passing `image` would have the same
   * effect today, but an explicit flag survives the edit where someone re-adds
   * `image={project.image}` "for consistency" and silently undoes the decision
   * to keep the photograph behind the click.
   */
  drawn?: boolean;
  /** `hero` is the wide case-study banner, where a card-sized figure is lost. */
  size?: "card" | "hero";
  sizes?: string;
  className?: string;
}) {
  /*
   * A real screenshot always wins. The drawn plates exist because most of this
   * work has no artefact to photograph — but where there *is* a live product,
   * showing an abstraction of it instead of the thing itself is the single
   * clearest way to make a portfolio look unfinished.
   *
   * The shot is anchored to the top so the most identifying part of an
   * interface survives every crop ratio the card uses, and carries an inset
   * hairline so it sits in the card's material rather than floating on it.
   */
  if (image && !drawn) {
    return (
      /* `overflow-clip`, not `overflow-hidden`: this wrapper sits between the
         plate and the figure that carries the scroll settle, and `hidden` would
         make it a scroll container that captures the figure's view() timeline
         and pins it silently. */
      <div className={cn("relative h-full w-full overflow-clip bg-sunken", className)}>
        <Image
          src={image}
          alt={imageAlt ?? ""}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover object-top"
        />
        {/* Not a symmetric ring. The research flagged same-colour-on-all-four-
            edges as a tell: it flattens the object and destroys any implied
            light source. A top highlight and a bottom shade imply light from
            above, which is what every other surface on this page assumes. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 border-t border-b border-t-white/12 border-b-black/25"
        />
      </div>
    );
  }

  const Figure = figures[figure];

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative h-full w-full overflow-hidden bg-sunken",
        // Hairline grid, shared by every plate so the set reads as one system.
        "bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)]",
        "[background-size:28px_28px] [background-position:center]",
        className,
      )}
    >
      <div className="absolute inset-0 grid place-items-center p-6">
        <svg
          viewBox="0 0 120 90"
          className={
            size === "hero"
              ? "h-full max-h-[280px] w-full max-w-[440px]"
              : "h-full max-h-[168px] w-full max-w-[240px]"
          }
          role="presentation"
        >
          <Figure />
        </svg>
      </div>
    </div>
  );
}
