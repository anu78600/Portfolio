"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * One IntersectionObserver for every reveal on the page.
 *
 * This replaces what would normally be an animation library. The whole
 * mechanism is: mark elements server-side with `data-reveal`, observe them
 * once, stamp `data-revealed` when they enter, unobserve. The transition is
 * pure CSS, so the reveal costs no JavaScript on the main thread beyond a
 * single callback per element, and the payload is this file rather than ~35 kB
 * of runtime.
 *
 * Elements are released immediately — not animated — when the visitor prefers
 * reduced motion or the browser has no observer support.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])"),
    );
    if (nodes.length === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      nodes.forEach((node) => node.setAttribute("data-revealed", ""));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
      },
      // Fires slightly before the element is fully on screen so the motion
      // finishes as it settles, rather than starting once it is already read.
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
