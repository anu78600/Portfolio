/**
 * Resolves the theme before first paint.
 *
 * This runs as a blocking inline script in <head>, ahead of any stylesheet
 * application, so the correct palette is on <html> before the browser paints —
 * there is no flash of the wrong theme on load, which is the usual failure of
 * hook-based theme switching.
 *
 * It also drops the `no-js` class, which is what makes the reveal animations
 * safe: with JavaScript disabled the class stays and CSS shows all content
 * immediately.
 */
const script = `(function(){try{var s=localStorage.getItem("theme");var d=window.matchMedia("(prefers-color-scheme: dark)").matches;var t=(s==="light"||s==="dark")?s:(d?"dark":"light");document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","light");}document.documentElement.classList.remove("no-js");})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
