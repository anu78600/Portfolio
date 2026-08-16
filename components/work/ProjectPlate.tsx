import Image from "next/image";
import type { ProjectKind } from "@/content/types";
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
 * Each figure also takes a `variant`, derived from the project slug, so that
 * two projects of the same kind never render the same picture. Without it, the
 * grid showed two identical bar charts side by side, which reads as a bug
 * rather than as a system.
 *
 * They are monochrome with a single accent element, sit on a shared hairline
 * grid, and use one fixed frame across every card — which is what keeps a set
 * of otherwise imageless projects looking composed.
 */

const stroke = "stroke-[var(--border-strong)]";
const accent = "stroke-[var(--accent)]";

/** Stable small integer from a slug, so a project's plate never changes. */
function variantFrom(seed: string, count: number) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return hash % count;
}

function Research({ v }: { v: number }) {
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

function Analysis({ v }: { v: number }) {
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

function Concept({ v }: { v: number }) {
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

function Report({ v }: { v: number }) {
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

/**
 * Shipped software. An application frame rather than a fake screenshot — the
 * shape of a product without pretending to be a picture of one.
 */
function Product({ v }: { v: number }) {
  const finance = v % 2 === 0;
  const rows = [30, 46, 22, 38];

  return (
    <g fill="none" strokeWidth="1">
      <rect x="16" y="16" width="88" height="60" rx="5" className={stroke} />
      <line x1="16" y1="29" x2="104" y2="29" className={stroke} />
      {[23, 30, 37].map((cx) => (
        <circle key={cx} cx={cx} cy="22.5" r="1.6" className={stroke} />
      ))}
      <rect x="24" y="37" width="26" height="31" rx="2" className={stroke} />
      {rows.map((w, i) => (
        <line
          key={i}
          x1="58"
          y1={40 + i * 8}
          x2={58 + w}
          y2={40 + i * 8}
          className={i === 1 ? accent : stroke}
          strokeWidth={i === 1 ? 1.5 : 1}
        />
      ))}
      {finance ? (
        // A rising trend for the finance tracker…
        <polyline
          points="28,62 34,54 40,58 46,45"
          className={accent}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        // …a checklist for the reminders app.
        [0, 1, 2].map((i) => (
          <g key={i}>
            <rect
              x="28"
              y={42 + i * 9}
              width="5"
              height="5"
              rx="1"
              className={i === 0 ? accent : stroke}
              strokeWidth={i === 0 ? 1.5 : 1}
            />
            <line
              x1="37"
              y1={44.5 + i * 9}
              x2={46 - i * 3}
              y2={44.5 + i * 9}
              className={stroke}
            />
          </g>
        ))
      )}
    </g>
  );
}

const figures: Record<ProjectKind, (props: { v: number }) => React.ReactElement> = {
  research: Research,
  analysis: Analysis,
  concept: Concept,
  report: Report,
  product: Product,
};

export function ProjectPlate({
  kind,
  seed,
  image,
  imageAlt,
  priority,
  size = "card",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className,
}: {
  kind: ProjectKind;
  /** Project slug — keeps each plate stable and distinct from its neighbours. */
  seed: string;
  /** Real screenshot. When present, the drawn figure is not used at all. */
  image?: string;
  imageAlt?: string;
  priority?: boolean;
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
  if (image) {
    return (
      <div className={cn("relative h-full w-full overflow-hidden bg-sunken", className)}>
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

  const Figure = figures[kind];

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
          <Figure v={variantFrom(seed, 6)} />
        </svg>
      </div>
    </div>
  );
}
