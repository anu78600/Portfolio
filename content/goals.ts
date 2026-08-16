import type { Goal } from "./types";

/**
 * Act three: where this is going.
 *
 * TWO. Not three, not five. He is currently chasing four job tracks at once —
 * analyst, HR-tech, consulting, AI generalist — and a list of four reads as
 * unfocused. Two goals pitched *above* those tracks make the breadth look
 * deliberate instead of scattered, because a reader can hold two things.
 *
 * These are the one category on the site that cannot be verified from the
 * inventory: they are statements of intent, not facts. They are drafted from
 * what he has actually said and built, and they need his sign-off in his own
 * voice before this ships. If a line here does not sound like him, it is wrong
 * even if it is well written.
 */
export const goals: Goal[] = [
  {
    index: "01",
    horizon: "Next role",
    title: "Analyst work where the AI is real",
    body: "People analytics, business analysis, or a graduate consulting scheme — the specific title matters less than whether the model is actually in the loop. I would rather be the person who knows what it is doing than the person who presents what it produced.",
  },
  {
    index: "02",
    horizon: "Alongside it",
    title: "Keep shipping",
    body: "Quiet Compound is live and I built it alone. The next one should solve something equally unglamorous — the problems people work around quietly because nobody has bothered to build for them.",
  },
];
