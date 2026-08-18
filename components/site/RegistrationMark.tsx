"use client";

import { useEffect } from "react";

/**
 * The cursor, as a printer's registration mark.
 *
 * A registration mark is the crosshair a printer uses to align one plate over
 * another — the exact instrument this site's metaphor is built on. That is why
 * it is a crosshair and not the usual soft blob: a blob is a web-app cursor
 * wearing a serif, and it would be the one object on the page borrowed from a
 * different craft.
 *
 * DESKTOP ONLY, by construction. The CSS is wrapped in `(pointer: fine)`, so
 * on the phones that carry nearly all of this traffic the component mounts,
 * finds no fine pointer, and paints nothing. It also never hides the real
 * cursor — a portfolio that takes away the system cursor to show you a circle
 * is trading usability for a trick, and the mark rides ALONGSIDE the pointer.
 *
 * Two custom properties on <html>, written inside one rAF. No dependency, no
 * state, no re-render: React never sees the pointer move.
 */
export function RegistrationMark() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    let x = 0;
    let y = 0;
    let queued = false;

    const paint = () => {
      queued = false;
      root.style.setProperty("--mark-x", `${x}px`);
      root.style.setProperty("--mark-y", `${y}px`);
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      /* Coalesce to one write per frame. A naive mousemove handler writes
         custom properties dozens of times between paints, and each write
         invalidates style on the root element. */
      if (!queued) {
        queued = true;
        requestAnimationFrame(paint);
      }
      root.dataset.mark = "on";
    };

    const onLeave = () => {
      delete root.dataset.mark;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      delete root.dataset.mark;
    };
  }, []);

  return null;
}
