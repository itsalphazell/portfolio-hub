import Lenis from "lenis";

export function mountLenis() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return () => {};
  }
  const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
  let raf = 0;
  const tick = (time) => {
    lenis.raf(time);
    raf = window.requestAnimationFrame(tick);
  };
  raf = window.requestAnimationFrame(tick);
  return () => {
    window.cancelAnimationFrame(raf);
    lenis.destroy();
  };
}