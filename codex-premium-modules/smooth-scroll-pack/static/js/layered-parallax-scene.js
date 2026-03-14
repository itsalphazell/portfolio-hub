(function () {
  const sections = document.querySelectorAll("[data-layered-parallax-scene]")
  sections.forEach((section) => {
    const layers = Array.from(section.querySelectorAll("[data-depth]"))

    const update = () => {
      const rect = section.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)))
      layers.forEach((layer) => {
        const depth = Number(layer.getAttribute("data-depth") || 0)
        const offset = (progress - 0.5) * depth * 160
        layer.style.transform = `translate3d(0, ${offset}px, 0)`
      })
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
  })
})()
