export function mountInteractiveIdentityObject(rootSelector = "[data-identity-object]") {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return () => {};
  }
  const node = document.querySelector(rootSelector);
  if (!node) {
    return () => {};
  }

  const onMove = (event) => {
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.setProperty("--identity-rotate-x", `${(-py * 18).toFixed(2)}deg`);
    node.style.setProperty("--identity-rotate-y", `${(px * 22).toFixed(2)}deg`);
    node.style.setProperty("--identity-shift-x", `${(px * 18).toFixed(2)}px`);
    node.style.setProperty("--identity-shift-y", `${(py * 14).toFixed(2)}px`);
  };

  const reset = () => {
    node.style.setProperty("--identity-rotate-x", "0deg");
    node.style.setProperty("--identity-rotate-y", "0deg");
    node.style.setProperty("--identity-shift-x", "0px");
    node.style.setProperty("--identity-shift-y", "0px");
  };

  node.addEventListener("pointermove", onMove);
  node.addEventListener("pointerleave", reset);
  return () => {
    node.removeEventListener("pointermove", onMove);
    node.removeEventListener("pointerleave", reset);
  };
}