(function () {
  const root = document.querySelector("[data-card-showcase-stack]")
  if (!root) {
    return
  }

  const items = [
    {
      label: "Campaign",
      title: "Launch narrative",
      body: "Use one hero card to anchor the story, then let secondary cards support the scroll instead of competing with it.",
    },
    {
      label: "Product",
      title: "Feature reveal",
      body: "Card stacks work well when the page needs depth and hierarchy but cannot support a full scene or object pipeline.",
    },
    {
      label: "Premium web",
      title: "Proof block",
      body: "The stack creates visual pacing and keeps supporting information feeling designed rather than list-like.",
    },
    {
      label: "Conversion",
      title: "Offer framing",
      body: "Keep the active card readable and keep the stack secondary to the CTA and the core message.",
    },
  ]

  const stage = root.querySelector("[data-card-stage]")
  const controls = root.querySelector("[data-card-controls]")
  let activeIndex = 0

  function render() {
    stage.innerHTML = ""
    controls.innerHTML = ""

    items.forEach((item, index) => {
      const offset = index - activeIndex
      const card = document.createElement("article")
      card.className = "card-showcase-stack__card"
      card.style.top = `${index * 1.2}rem`
      card.style.transform = `translateX(${Math.max(0, offset) * 2.8}rem) rotate(${offset * 2.4}deg) scale(${offset === 0 ? 1 : Math.max(0.82, 1 - Math.abs(offset) * 0.06)})`
      card.style.opacity = String(offset === 0 ? 1 : Math.max(0.35, 0.82 - Math.abs(offset) * 0.18))
      card.style.zIndex = String(items.length - index)
      card.innerHTML = `<div class="card-showcase-stack__label">${item.label}</div><h3>${item.title}</h3><p>${item.body}</p>`
      stage.appendChild(card)

      const button = document.createElement("button")
      button.type = "button"
      button.className = index === activeIndex ? "is-active" : ""
      button.innerHTML = `<div class="card-showcase-stack__label">${item.label}</div><div style="margin-top:0.5rem;font-size:1.1rem;font-weight:600;">${item.title}</div>`
      button.addEventListener("mouseenter", () => {
        activeIndex = index
        render()
      })
      button.addEventListener("focus", () => {
        activeIndex = index
        render()
      })
      controls.appendChild(button)
    })
  }

  render()
})()
