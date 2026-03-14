(function initEditorialShowcaseHero() {
  const root = document.querySelector("[data-editorial-hero]");
  if (!root) {
    return;
  }

  const copyNodes = root.querySelectorAll("[data-editorial-copy]");
  const visual = root.querySelector("[data-editorial-visual]");
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce || !window.gsap) {
    return;
  }

  window.gsap.fromTo(
    copyNodes,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.1,
    }
  );

  if (visual) {
    window.gsap.fromTo(
      visual,
      { opacity: 0, x: 24, scale: 0.97 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.95,
        ease: "power3.out",
      }
    );
  }
})();
