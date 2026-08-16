"use client";

import { useEffect, useRef, useState } from "react";

/** Height of the sticky header, in px. Kept in one place. */
export const HEADER_OFFSET = 72;

/**
 * Must match `scroll-padding-top` in globals.css (6rem).
 *
 * The scroll-spy line has to sit at or below where an anchored section
 * actually comes to rest. With the line above that point, clicking a nav link
 * scrolls the target to 96px, the line is still at 80px, and the *previous*
 * section stays highlighted — the nav contradicts the page you are looking at.
 */
export const SCROLL_PADDING = 96;

/**
 * Tracks which section is currently under the header, plus how far down the
 * document the reader is.
 *
 * Deliberately a single rAF-throttled scroll listener rather than an
 * IntersectionObserver: with sections of very different heights, an observer
 * has to arbitrate between two simultaneously-intersecting entries and the
 * active state flickers at the boundary. Measuring against one line under the
 * header is unambiguous, and eight getBoundingClientRect reads per frame — all
 * reads, no interleaved writes — do not force extra layout.
 */
export function useScrollState(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const measure = () => {
      frame.current = null;

      const scrollY = window.scrollY;
      const viewport = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      setScrolled(scrollY > 8);

      const scrollable = Math.max(docHeight - viewport, 1);
      setProgress(Math.min(Math.max(scrollY / scrollable, 0), 1));

      // Sections are in document order, so the last one whose top has passed
      // the line under the header is the one being read. Every present section
      // is measured (no early break) so `lastPresent` is genuinely the final
      // one on the page and not just where a break happened to land.
      const line = scrollY + SCROLL_PADDING + 4;
      let current = "";
      let lastPresent = "";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        lastPresent = id;
        if (el.getBoundingClientRect().top + scrollY <= line) current = id;
      }

      // The bottom of the document belongs to the final section, which would
      // otherwise never activate if it is shorter than the viewport. Guarded on
      // `lastPresent`, or a page carrying none of these sections — a case
      // study — would light up "Contact" the moment the reader hit the bottom.
      if (lastPresent && scrollY + viewport >= docHeight - 4) current = lastPresent;

      setActiveId(current);
    };

    const onScroll = () => {
      if (frame.current === null) frame.current = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [sectionIds]);

  return { activeId, progress, scrolled };
}

/** True once the page has scrolled past roughly one viewport. */
export function usePastFold() {
  const [past, setPast] = useState(false);

  useEffect(() => {
    let frame: number | null = null;
    const measure = () => {
      frame = null;
      setPast(window.scrollY > window.innerHeight * 0.9);
    };
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return past;
}
