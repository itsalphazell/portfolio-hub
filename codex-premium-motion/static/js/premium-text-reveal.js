export function runPremiumTextReveal(targetSelector = "[data-premium-reveal]") {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }
  const node = document.querySelector(targetSelector);
  if (!node || typeof window.gsap === "undefined" || typeof window.SplitType === "undefined") {
    return;
  }

  const split = new window.SplitType(node, { types: "lines,words" });
  window.gsap.set(split.lines, { overflow: "hidden" });
  window.gsap.fromTo(
    split.words,
    { yPercent: 100, opacity: 0, filter: "blur(8px)" },
    {
      yPercent: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.74,
      ease: "power3.out",
      stagger: 0.03,
    }
  );
}