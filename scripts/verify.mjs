/**
 * Verification harness.
 *
 *   node scripts/verify.mjs
 *
 * Runs the checks that would have caught the defects this project actually
 * shipped, rather than the ones a linter already covers. Exits non-zero on any
 * failure so it can gate CI.
 *
 * The design principle: every check here exists because something real got
 * through. Five of the twenty findings in the post-phase-5 audit were
 * mechanically detectable, and three of those were in print and share-image
 * code — the surfaces nobody looks at while developing. So print emulation and
 * an Open Graph render are first-class checks, not afterthoughts.
 *
 * Requires: a production server on BASE_URL, and headless Chrome with
 * --remote-debugging-port=9222.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const CDP = process.env.CDP_URL ?? "http://127.0.0.1:9222";

const results = [];
const record = (group, name, pass, detail = "") =>
  results.push({ group, name, pass, detail });

/* ── colour maths ─────────────────────────────────────────────────────────── */

const luminance = (hex) => {
  let h = hex.replace("#", "");
  if (h.length === 3) h = [...h].map((c) => c + c).join("");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const lin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};

const ratio = (a, b) => {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

/** rgb(a) → hex, for computed styles coming back from the browser. */
const toHex = (css) => {
  const m = css.match(/rgba?\(([^)]+)\)/);
  if (!m) return css.startsWith("#") ? css : null;
  const [r, g, b] = m[1].split(",").map((n) => Math.round(parseFloat(n)));
  return "#" + [r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("");
};

/* ── 1. contrast, against the COMPILED stylesheet ─────────────────────────── */

/*
 * Source tokens are not what ships: Lightning CSS rewrites values and
 * Tailwind's `@theme inline` aliasing renames them. Two real failures in this
 * project were only visible in the compiled output.
 */
function checkContrast() {
  const dir = join(".next", "static", "chunks");
  const file = readdirSync(dir).find((f) => f.endsWith(".css"));
  if (!file) return record("contrast", "compiled stylesheet found", false, dir);
  const css = readFileSync(join(dir, file), "utf8");

  const parse = (body) =>
    Object.fromEntries(
      body
        .split(";")
        .filter((kv) => kv.includes(":"))
        .map((kv) => {
          const i = kv.indexOf(":");
          return [kv.slice(0, i).trim(), kv.slice(i + 1).trim()];
        })
        .filter(([, v]) => v.startsWith("#")),
    );

  const blockOf = (re) => {
    const m = css.match(re);
    return m ? parse(m[1]) : null;
  };

  const themes = {
    light: (css.match(/:root\{([^}]*)\}/g) ?? [])
      .map((b) => parse(b.slice(6, -1)))
      .find((t) => t["--bg"]),
    dark: blockOf(/\[data-theme=dark\]\{([^}]*)\}/),
    /* eslint-disable-next-line no-unused-vars -- see EXPECT_PLATE below */
    /* ANCHORED on the preceding `{`, which only the @utility output has:
       `@layer utilities{.folio-product{`. `[data-theme=dark] .folio-product{`
       is preceded by a space and the print rule by `}`, so unanchored either
       could impersonate the base block the moment Tailwind tree-shakes the
       utility away — and @utility output is emitted ONLY if the class name
       appears in scanned source. Lose the last consumer and the entire plate
       colour world silently leaves the stylesheet. */
    plate: blockOf(/\{\.folio-product\{([^}]*)\}/),
    /* The dark plate is a SEPARATE block that overrides only some tokens, and
       `blockOf` returns the first match — which is the light plate. So every
       one of the checks below has been grading the light plate twice and the
       dark plate never, which is how --border-strong shipped at 2.96:1 inside
       it. Merge the override over the base, the way the cascade does. */
    plateDark: {
      ...blockOf(/\{\.folio-product\{([^}]*)\}/),
      ...blockOf(/\[data-theme=dark\] \.folio-product\{([^}]*)\}/),
    },
  };

  /* Absence must be a DECISION, never a discovery.
     Every other check here grades what it finds, so a vanished block reads as
     "nothing to grade" and the suite reports ALL PASSED on a smaller suite —
     the trap this file has fallen into twice. `.folio-product` is the plate's
     scoped colour world and the only place brass resolves; Tailwind emits
     `@utility` output only when the class appears in scanned source, so losing
     its last consumer deletes 26 contrast checks silently.
     The plate was removed from the case study on 18 Aug (his call — the mount
     read as awkward), so brass currently resolves nowhere and the block is
     correctly absent. This flag asserts THAT, in both directions: put a plate
     back without flipping it and the suite goes red rather than quietly
     growing. */
  const EXPECT_PLATE = false;
  const platePresent = Boolean(
    themes.plate && themes.plate["--text-primary"] && themes.plate["--bg"],
  );
  record(
    "contrast",
    EXPECT_PLATE
      ? "plate token block present in compiled CSS"
      : "no plate in compiled CSS (brass resolves nowhere)",
    platePresent === EXPECT_PLATE,
    EXPECT_PLATE
      ? "the @utility folio-product output is missing — tree-shaken?"
      : "a .folio-product block shipped — flip EXPECT_PLATE if that was intended",
  );
  if (!EXPECT_PLATE) {
    delete themes.plate;
    delete themes.plateDark;
  }

  const TEXT = ["--text-primary", "--text-secondary", "--text-muted", "--accent"];
  const SURFACES = [
    "--bg",
    "--surface",
    "--surface-elevated",
    "--surface-sunken",
    "--surface-overlay",
  ];
  /* --border and --accent-line are decorative BY CONTRACT and excluded on
     purpose; --border-strong is not, and slipped to 2.90:1 once. */
  const UI = ["--border-strong", "--focus"];

  for (const [theme, t] of Object.entries(themes)) {
    if (!t) {
      record("contrast", `${theme} tokens present`, false);
      continue;
    }
    for (const fg of TEXT)
      for (const bg of SURFACES) {
        if (!t[fg] || !t[bg]) continue;
        const r = ratio(t[fg], t[bg]);
        record(
          "contrast",
          `${theme}: ${fg} on ${bg}`,
          r >= 4.5,
          `${r.toFixed(2)}:1 (${t[fg]} on ${t[bg]})`,
        );
      }
    for (const tok of UI)
      for (const bg of SURFACES) {
        if (!t[tok] || !t[bg]) continue;
        const r = ratio(t[tok], t[bg]);
        record("contrast", `${theme}: ${tok} on ${bg}`, r >= 3, `${r.toFixed(2)}:1`);
      }
    if (t["--accent-contrast"] && t["--accent"]) {
      const r = ratio(t["--accent-contrast"], t["--accent"]);
      record("contrast", `${theme}: text on accent fill`, r >= 4.5, `${r.toFixed(2)}:1`);
    }
  }
}

/* ── 2. brass containment ─────────────────────────────────────────────────── */

/*
 * Brass may resolve only inside .folio-product. Gold across a site is the house
 * style of every trading-signals funnel; gold inside the product's own block is
 * quoting the product. This shipped broken twice — the favicon and the Open
 * Graph card both carried it.
 */
function checkBrassContainment() {
  const BRASS = /#(d8b346|dcbb4d|c9a227|d9b540|e8cd66|a7882a)/i;
  const roots = ["app", "components", "content", "lib"];
  const offenders = [];

  const walk = (dir) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (/\.(tsx?|css)$/.test(e.name)) {
        const src = readFileSync(p, "utf8");
        if (!BRASS.test(src)) continue;
        // globals.css is allowed: that is where .folio-product defines it.
        if (p.endsWith(join("app", "globals.css"))) continue;
        offenders.push(p);
      }
    }
  };
  roots.forEach((r) => walk(r));
  record(
    "assets",
    "brass appears only inside the plate",
    offenders.length === 0,
    offenders.join(", "),
  );

  /* Brass containment got a check; the blurred-backdrop ban never did, and it
     survived on a floating button for two purges while the header carried a
     comment saying it was banned. A rule stated this absolutely needs a test,
     not a convention.
     The property name is ASSEMBLED, never written literally. Tailwind v4 scans
     the whole project for class candidates, so spelling it out here made the
     build emit the very utility this forbids — the check failed itself, and
     shipped dead CSS to every visitor while doing it. */
  const BANNED = ["backdrop", "filter"].join("-");
  const dir = join(".next", "static", "chunks");
  const cssFile = readdirSync(dir).find((f) => f.endsWith(".css"));
  if (cssFile) {
    const css = readFileSync(join(dir, cssFile), "utf8");
    const hits = css.match(new RegExp(`${BANNED}:(?!\\s*none)[^;}]*`, "g")) ?? [];
    record(
      "assets",
      `no ${BANNED} in compiled CSS`,
      hits.length === 0,
      [...new Set(hits)].join(", ").slice(0, 160),
    );
  }
}

/* ── CDP ──────────────────────────────────────────────────────────────────── */

async function connect() {
  const t = await (await fetch(`${CDP}/json/new?about:blank`, { method: "PUT" })).json();
  const ws = new WebSocket(t.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 0;
  const pending = new Map();
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) {
      pending.get(m.id)(m.result);
      pending.delete(m.id);
    }
  };
  const send = (method, params = {}) =>
    new Promise((res) => {
      const n = ++id;
      pending.set(n, res);
      ws.send(JSON.stringify({ id: n, method, params }));
    });
  await send("Page.enable");
  await send("Runtime.enable");
  const evaluate = async (expression) =>
    (await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true }))
      .result?.value;
  return { send, evaluate, detach: () => ws.close() };
}

/* ── 3. layout: overflow across widths and themes ─────────────────────────── */

const WIDTHS = [320, 360, 375, 390, 430, 768, 1024, 1440, 1920];

async function checkLayout(page, path, theme) {
  for (const width of WIDTHS) {
    await page.send("Emulation.setDeviceMetricsOverride", {
      width,
      height: 900,
      deviceScaleFactor: 1,
      mobile: width < 768,
    });
    await page.send("Emulation.setEmulatedMedia", {
      features: [{ name: "prefers-color-scheme", value: theme }],
    });
    await page.send("Page.navigate", { url: BASE + path });
    await new Promise((r) => setTimeout(r, 900));

    /*
     * Two directions, because they fail differently.
     *
     * RIGHT overflow grows `scrollWidth` and the user can scroll to it.
     * LEFT overflow does not: in LTR, content placed left of the origin is
     * clipped and simply never reachable, so `scrollWidth - clientWidth` stays
     * 0 and every check here passes while a third of the flagship block sits
     * off the side of the phone. That is exactly what happened — the plate's
     * unconditional -68px pull against an 18px gutter — and 141 checks called
     * it green. Measure the boxes, not just the scroll extent.
     */
    const probe = await page.evaluate(`(() => {
      const de = document.documentElement;
      const over = de.scrollWidth - de.clientWidth;
      let worst = null, under = 0, culprit = null;
      for (const el of document.querySelectorAll("body *")) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 && r.height === 0) continue;
        if (r.width <= 1 && r.height <= 1) continue; /* sr-only */
        const name = el.tagName.toLowerCase() + "." + String(el.className).slice(0, 60);
        if (over > 1 && !worst && r.right > de.clientWidth + 1) worst = name;
        if (r.left < under) { under = r.left; culprit = name; }
      }
      return { over, worst, under: Math.round(under), culprit };
    })()`);

    record(
      "layout",
      `${path} ${theme} @${width}`,
      probe.over <= 1,
      probe.over > 1 ? `${probe.over}px overflow — ${probe.worst}` : "",
    );
    record(
      "layout",
      `${path} ${theme} @${width} left edge`,
      probe.under >= -1,
      probe.under < -1 ? `${probe.under}px off-canvas — ${probe.culprit}` : "",
    );
  }
}

/* ── 4. print emulation ───────────────────────────────────────────────────── */

/*
 * The check that would have caught the worst defect in this project. The plate
 * carries its own colour world, so the page-level print reset never reached
 * inside it: near-white text on white paper at 1.16:1, with the black ground
 * dropped because printers do not print backgrounds by default. The entire
 * section about the only shipped product printed as a white hole — and it
 * looked perfect on screen, which is exactly why nobody catches this by eye.
 *
 * So: emulate print, and assert every text element contrasts against WHITE,
 * not against its own background.
 */
async function checkPrint(page, path, expectPlate = false) {
  await page.send("Emulation.setDeviceMetricsOverride", {
    width: 1024,
    height: 1400,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await page.send("Page.navigate", { url: BASE + path });
  await new Promise((r) => setTimeout(r, 900));
  await page.send("Emulation.setEmulatedMedia", { media: "print" });
  await new Promise((r) => setTimeout(r, 400));

  const samples = await page.evaluate(`(() => {
    const out = [];
    const seen = new Set();
    for (const el of document.querySelectorAll("h1,h2,h3,p,li,a,span,dt,dd")) {
      if (!el.textContent || !el.textContent.trim()) continue;
      const r = el.getBoundingClientRect();
      if (r.width < 4 || r.height < 4) continue;
      const s = getComputedStyle(el);
      if (s.display === "none" || s.visibility === "hidden" || +s.opacity === 0) continue;
      const key = s.color + "|" + (el.closest(".folio-product") ? "plate" : "page");
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({
        color: s.color,
        zone: el.closest(".folio-product") ? "plate" : "page",
        sample: el.textContent.trim().slice(0, 34),
      });
    }
    return out;
  })()`);

  for (const s of samples ?? []) {
    const hex = toHex(s.color);
    if (!hex) continue;
    // Printers drop backgrounds, so the paper is white whatever the screen says.
    const r = ratio(hex, "#ffffff");
    record(
      "print",
      `${path} ${s.zone}: ${hex}`,
      r >= 4.5,
      `${r.toFixed(2)}:1 on paper — "${s.sample}"`,
    );
  }

  /* A check that measures nothing passes. Sampling TEXT inside the plate is not
     enough on its own: the plate now holds a figure and no copy, so a
     text-only probe finds zero rows and reports success by finding nothing —
     the same failure that let the dark plate go 87 checks ungraded.
     So assert the plate is on this route AND that the print reset actually
     reached it. `@media` adds no specificity, so a bare `.folio-product`
     (0,1,0) loses to `[data-theme="dark"] .folio-product` (0,2,0) and the
     screen tokens survive into print — measured --bg #2b2313 under near-white
     text before this was fixed. */
  if (expectPlate) {
    const plate = await page.evaluate(`(() => {
      const el = document.querySelector(".folio-product");
      if (!el) return null;
      const s = getComputedStyle(el);
      return {
        bg: s.getPropertyValue("--bg").trim(),
        text: s.getPropertyValue("--text-primary").trim(),
        contrast: s.getPropertyValue("--accent-contrast").trim(),
      };
    })()`);

    record("print", `${path}: plate present on this route`, Boolean(plate),
      "no .folio-product found — has it moved?");

    if (plate) {
      /* Print emulation flattens these to literal hex in both themes. */
      const flat = (v) => /^#f{3,6}$|^#0{3,6}$|^white$|^black$/i.test(v);
      record("print", `${path}: plate --bg reset for paper`, flat(plate.bg), plate.bg);
      record("print", `${path}: plate --text-primary reset for paper`, flat(plate.text), plate.text);
      record("print", `${path}: plate --accent-contrast reset for paper`, flat(plate.contrast), plate.contrast);
    }
  }

  await page.send("Emulation.setEmulatedMedia", { media: "" });
}

/* ── 5. the share card ────────────────────────────────────────────────────── */

/*
 * It renders in the LinkedIn feed whether or not anyone clicks, and it broke
 * twice: once carrying the wrong palette entirely, once failing to render at
 * all because satori cannot parse a variable font. A 500 here is invisible
 * until someone shares the link.
 */
async function checkShareCard() {
  try {
    const res = await fetch(`${BASE}/opengraph-image`);
    const buf = Buffer.from(await res.arrayBuffer());
    const isPng = buf[0] === 0x89 && buf.toString("latin1", 1, 4) === "PNG";
    const width = buf.readUInt32BE(16);
    const height = buf.readUInt32BE(20);
    record("share", "opengraph-image responds 200", res.status === 200, `HTTP ${res.status}`);
    record("share", "opengraph-image is a PNG", isPng);
    record(
      "share",
      "opengraph-image is 1200x630",
      width === 1200 && height === 630,
      `${width}x${height}`,
    );
    record("share", "opengraph-image is not blank", buf.length > 8000, `${buf.length} bytes`);
  } catch (e) {
    record("share", "opengraph-image renders", false, String(e).slice(0, 120));
  }
}

/* ── 6. document structure ────────────────────────────────────────────────── */

async function checkStructure(page, path) {
  await page.send("Page.navigate", { url: BASE + path });
  await new Promise((r) => setTimeout(r, 800));
  const probe = await page.evaluate(`(() => ({
    h1: document.querySelectorAll("h1").length,
    main: document.querySelectorAll("main").length,
    skip: !!document.querySelector('a[href="#main"]'),
    imgNoAlt: [...document.images].filter(i => !i.hasAttribute("alt")).length,
    stylesheet: [...document.styleSheets].some(s => { try { return s.cssRules.length > 0 } catch { return false } }),
  }))()`);
  record("structure", `${path}: exactly one h1`, probe.h1 === 1, `found ${probe.h1}`);
  record("structure", `${path}: has a main landmark`, probe.main === 1);
  record("structure", `${path}: skip link present`, probe.skip);
  record("structure", `${path}: every image has alt`, probe.imgNoAlt === 0, `${probe.imgNoAlt} missing`);
  /* Catches the stale-server failure: HTML served, stylesheet 404. */
  record("structure", `${path}: stylesheet actually loaded`, probe.stylesheet);
}

/* ── 7. motion, and placeholders on screen ────────────────────────────────── */

/*
 * Two failures that shipped green, both invisible to every check above.
 *
 * MOTION. `overflow: hidden` is a scroll container, so an `animation-timeline:
 * view()` on any descendant silently re-parents to that ancestor instead of the
 * document. The animation stays listed, playState reads "running", progress
 * pins at a constant and NOTHING EVER MOVES — indistinguishable from forgetting
 * to write the CSS. The plate is `overflow-clip` precisely so this cannot
 * happen; this check is what stops someone "tidying" it back to `hidden`.
 *
 * PLACEHOLDERS. `[ADD ISSUER]` rendered on screen at 5.76:1 and, worse, inside
 * JSON-LD on every route — publishing a credential issuer that does not exist.
 * The integrity model's single hardest rule is that a placeholder never becomes
 * structured data, and nothing was enforcing it.
 */
async function checkContent(page, path) {
  await page.send("Page.navigate", { url: BASE + path });
  await new Promise((r) => setTimeout(r, 800));

  const probe = await page.evaluate(`(() => {
    const P = /\\[ADD\\b[^\\]]*\\]/g;
    /* Text nodes only, and NOT the ones inside <script>/<style> — the RSC
       flight payload is a text node in <body>, so an unfiltered walk reports a
       placeholder as "visible" on routes that render no such content at all.
       Two checks that cannot tell each other's failure apart are one check. */
    const text = [];
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) =>
        /^(SCRIPT|STYLE|TEMPLATE|NOSCRIPT)$/.test(n.parentNode?.nodeName ?? "")
          ? NodeFilter.FILTER_REJECT
          : NodeFilter.FILTER_ACCEPT,
    });
    for (let n; (n = w.nextNode()); ) {
      const m = n.nodeValue.match(P);
      if (m) text.push(...m);
    }
    const ld = [...document.querySelectorAll('script[type="application/ld+json"]')]
      .flatMap((s) => s.textContent.match(P) || []);
    const stray = [];
    for (const el of document.querySelectorAll("[data-reveal],[data-plate-figure]")) {
      const a = el.getAnimations()[0];
      if (!a || !a.timeline) continue;
      if (a.timeline.source !== document.documentElement)
        stray.push(el.tagName + "." + String(el.className).slice(0, 40));
    }
    /* Drawn figures must be pairwise distinct. The figure field is a required
       union, so a typo is a type error — but two projects both correctly typed
       "journal" is not, and that failure is silent: an "identical pair" of
       cards becomes the same picture printed twice, which is exactly what
       shipped while the drawing was chosen by hashing the slug. Compare the
       rendered geometry, which is what a reader actually sees.
       (No backticks in this comment: it lives inside a template literal.) */
    const figures = [...document.querySelectorAll('#work svg[role="presentation"]')].map((s) =>
      [...s.querySelectorAll("*")].map((n) =>
        n.tagName + ":" + (n.getAttribute("points") || n.getAttribute("d") ||
          [n.getAttribute("x"), n.getAttribute("y"), n.getAttribute("x1"),
           n.getAttribute("y1"), n.getAttribute("cx")].join(",")),
      ).join("|"),
    );

    const tw = document.querySelector("[data-typewriter]");
    /* Measure the SETTLED box. The probe runs 800ms after navigation and the
       typewriter finishes at 1080ms, so measuring naively catches it mid-type
       and reports a clip that is really just the animation still running. */
    if (tw) {
      for (const a of tw.getAnimations()) {
        if (a.animationName === "typewriter") a.finish();
      }
    }
    const named = {};
    for (const a of document.getAnimations())
      named[a.animationName] = (named[a.animationName] || 0) + 1;

    return { text: [...new Set(text)], ld: [...new Set(ld)], stray,
             figures: figures.length, distinct: new Set(figures).size,
             reveals: named["slide-in"] || 0, rules: named["rule-draw"] || 0,
             typedVar: tw ? Number(getComputedStyle(tw).getPropertyValue("--typed")) : null,
             typedLen: tw ? (tw.textContent || "").length : null,
             typedClip: tw ? Math.round(tw.scrollWidth - tw.getBoundingClientRect().width) : 0 };
  })()`);

  record("content", `${path}: no placeholder in visible text`,
    probe.text.length === 0, probe.text.join(", "));
  record("content", `${path}: no placeholder in JSON-LD`,
    probe.ld.length === 0, probe.ld.join(", "));
  record("motion", `${path}: every view() timeline sourced at <html>`,
    probe.stray.length === 0, probe.stray.join(", "));

  /* The reveal population cannot silently regrow.
     It reached 41 — one keyframe on every wrapper, including list rows and
     paragraphs, which REDESIGN §4.5 forbids in those words: "applied to
     sections only — never paragraphs, never individual rows." A reveal is a
     promise that something is arriving; made 41 times over 16 viewports it is
     a texture, and a texture cannot be an event. Three: one per act, which is
     the page's own cardinality. Contact is deliberately unnumbered, so the
     ABSENCE of the gesture there carries the same signal as its absent folio. */
  if (path === "/") {
    record("motion", "/: exactly 3 act slides", probe.reveals === 3,
      `found ${probe.reveals}`);
    record("motion", "/: the drawn-rule gesture is present", probe.rules > 0,
      `found ${probe.rules} .rule-fade animations`);
    /* The typewriter's width is driven by the string's own length in `ch`. If
       the copy changes and --typed does not, the line is clipped mid-word and
       nothing else notices — the text is still whole in the DOM, so every
       content and structure check keeps passing. */
    record("motion", "/: typewriter width matches its own string",
      probe.typedVar === probe.typedLen,
      `--typed=${probe.typedVar} vs ${probe.typedLen} characters`);
    /* And that the settled box actually FITS the string. `ch` ignores
       letter-spacing, so a tracked label clips its own last word while the text
       stays whole in the DOM and every other check passes. Measured once at
       157px against a scrollWidth of 185. */
    record("motion", "/: typewriter does not clip its own text",
      probe.typedClip <= 1, `${probe.typedClip}px clipped`);
  }

  if (probe.figures > 1) {
    record("content", `${path}: drawn figures are pairwise distinct`,
      probe.distinct === probe.figures,
      `${probe.figures} figures, only ${probe.distinct} distinct`);
  }
}

/* ── run ──────────────────────────────────────────────────────────────────── */

const t0 = Date.now();
checkContrast();
checkBrassContainment();

const page = await connect();
try {
  for (const theme of ["light", "dark"]) await checkLayout(page, "/", theme);
  await checkLayout(page, "/resume", "light");
  await checkPrint(page, "/");
  await checkPrint(page, "/resume");
  /* Still checked, even with no plate on it: this is the route whose print
     behaviour has the most to lose, and it had never been printed at all until
     18 Aug. `expectPlate` is false because the plate was removed. */
  await checkPrint(page, "/work/quiet-compound");
  await checkStructure(page, "/");
  await checkStructure(page, "/resume");
  /* The case studies were a total blind spot: no check had ever loaded one, and
     a raw Markdown asterisk sat in the flagship's opening sentence as a result. */
  await checkStructure(page, "/work/quiet-compound");
  await checkLayout(page, "/work/quiet-compound", "dark");
  await checkContent(page, "/");
  await checkContent(page, "/resume");
  await checkContent(page, "/work/quiet-compound");
} finally {
  page.detach();
  /* Let the socket finish closing before the process winds down. Exiting in
     the same tick as ws.close() trips a libuv assertion on Windows, which
     crashes the process with code 127 and destroys the exit status — a harness
     whose exit code cannot be trusted cannot gate anything. */
  await new Promise((r) => setTimeout(r, 250));
}
await checkShareCard();

const failed = results.filter((r) => !r.pass);
const groups = [...new Set(results.map((r) => r.group))];

console.log();
for (const g of groups) {
  const rows = results.filter((r) => r.group === g);
  const bad = rows.filter((r) => !r.pass);
  console.log(
    `  ${bad.length === 0 ? "ok  " : "FAIL"} ${g.padEnd(10)} ${rows.length - bad.length}/${rows.length}`,
  );
}

if (failed.length) {
  console.log(`\n  ${failed.length} failure${failed.length > 1 ? "s" : ""}:\n`);
  for (const f of failed) console.log(`    ${f.group}/${f.name}\n      ${f.detail}`);
}

console.log(
  `\n  ${results.length} checks in ${((Date.now() - t0) / 1000).toFixed(1)}s — ` +
    (failed.length ? `${failed.length} FAILED\n` : "all passed\n"),
);
/* Set the code and let the event loop drain, rather than process.exit(), which
   tears down open handles mid-flight. */
process.exitCode = failed.length ? 1 : 0;
