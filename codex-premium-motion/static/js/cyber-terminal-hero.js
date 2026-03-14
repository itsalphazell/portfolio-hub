const cyberTerminalRoot = document.querySelector(".cyber-terminal-hero");

if (cyberTerminalRoot && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const blocks = cyberTerminalRoot.querySelectorAll(".cyber-terminal-hero__copy > *, .cyber-terminal-hero__panel");
  blocks.forEach((element, index) => {
    element.animate(
      [
        { opacity: 0, transform: "translateY(18px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      {
        duration: 720,
        delay: index * 80,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "forwards",
      }
    );
  });
}
