import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * The framing diagram for the agentic-AI research.
 *
 * Built from real HTML and text rather than a flat SVG or an image, for three
 * reasons: it reflows properly on a 320px screen, every label is selectable and
 * readable by a screen reader, and it costs nothing to load.
 *
 * It is explicitly captioned as a conceptual framing — it is how the study is
 * *structured*, not a result it produced. That distinction is the whole point:
 * showing method without implying findings that have not been published.
 */

const columns = [
  {
    label: "Signal layer",
    caption: "What the system can see",
    items: [
      "Vessel telemetry & position",
      "Port congestion and berth availability",
      "Weather and routing conditions",
      "Freight rates and capacity",
      "Customs and documentation status",
    ],
  },
  {
    label: "Agent layer",
    caption: "Where agency is claimed",
    items: ["Perceive", "Plan", "Act", "Verify"],
    highlight: true,
  },
  {
    label: "Decision surface",
    caption: "What could be delegated",
    items: [
      "Route and speed selection",
      "Berth and slot booking",
      "Charter and rate decisions",
      "Exception and disruption handling",
    ],
  },
];

function Arrow() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-center py-2 lg:py-0"
    >
      <Icon
        name="arrow-right"
        size={18}
        className="rotate-90 text-ink-3 lg:rotate-0"
      />
    </div>
  );
}

export function AgenticFramework() {
  return (
    <figure className="rounded-lg border border-line bg-elevated p-5 sm:p-6">
      <div className="grid grid-cols-1 gap-1 lg:grid-cols-[1fr_auto_minmax(0,0.8fr)_auto_1fr] lg:items-stretch lg:gap-3">
        {columns.map((column, index) => (
          <div key={column.label} className="contents">
            {index > 0 ? <Arrow /> : null}

            <div
              className={cn(
                "flex flex-col rounded-md border p-4",
                column.highlight
                  ? "border-accent-line bg-accent-soft/40"
                  : "border-line bg-surface/50",
              )}
            >
              <p
                className={cn(
                  "label-mono",
                  column.highlight ? "text-accent" : "text-ink-3",
                )}
              >
                {column.label}
              </p>
              <p className="mt-1.5 text-[0.75rem] text-ink-3">{column.caption}</p>

              <ul className="mt-4 flex flex-col gap-2">
                {column.items.map((item) => (
                  <li
                    key={item}
                    className={cn(
                      "text-[0.8125rem] leading-snug",
                      column.highlight
                        ? "flex items-center gap-2 font-medium text-ink"
                        : "border-t border-line pt-2 text-ink-2 first:border-t-0 first:pt-0",
                    )}
                  >
                    {column.highlight ? (
                      <span
                        aria-hidden="true"
                        className="h-1 w-1 shrink-0 rounded-full bg-accent"
                      />
                    ) : null}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-md border border-dashed border-line px-4 py-2.5">
        <Icon name="arrow-up" size={14} className="shrink-0 -scale-x-100 text-ink-3" />
        <p className="text-[0.8125rem] text-ink-2">
          Outcomes return to the signal layer — the loop is what separates an
          agent from a recommendation engine.
        </p>
      </div>

      <figcaption className="mt-4 text-[0.75rem] leading-relaxed text-ink-3">
        Conceptual framing used to structure the study — how the question is
        broken down, not a result it has produced.
      </figcaption>
    </figure>
  );
}
