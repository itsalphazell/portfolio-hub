import gsap from "gsap";
import SplitType from "split-type";

export function createTextReveal(element: HTMLElement) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return { revert() {} };
  }

  const split = new SplitType(element, { types: "lines,words" });
  gsap.set(split.lines, { overflow: "hidden" });
  gsap.fromTo(
    split.words,
    { yPercent: 100, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      ease: "power3.out",
      duration: 0.72,
      stagger: 0.025,
    }
  );

  return {
    revert() {
      split.revert();
    },
  };
}