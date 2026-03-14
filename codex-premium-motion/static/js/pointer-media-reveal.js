(function () {
  const root = document.querySelector("[data-pointer-media-reveal]")
  if (!root) {
    return
  }

  const items = [
    {
      eyebrow: "Campaign",
      title: "Launch direction",
      image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80",
    },
    {
      eyebrow: "Showcase",
      title: "Product detail",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    },
    {
      eyebrow: "Story",
      title: "Editorial motion",
      image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80",
    },
  ]

  const list = root.querySelector("[data-list]")
  const background = root.querySelector("[data-background]")
  const focus = root.querySelector("[data-focus]")
  const focusShell = root.querySelector("[data-focus-shell]")
  const activeEyebrow = root.querySelector("[data-active-eyebrow]")
  const activeTitle = root.querySelector("[data-active-title]")
  let activeIndex = 0

  function setActive(index) {
    activeIndex = index
    const item = items[index]
    background.src = item.image
    background.alt = item.title
    focus.src = item.image
    focus.alt = item.title
    activeEyebrow.textContent = item.eyebrow
    activeTitle.textContent = item.title
    Array.from(list.children).forEach((child, childIndex) => {
      child.classList.toggle("is-active", childIndex === index)
    })
  }

  items.forEach((item, index) => {
    const button = document.createElement("button")
    button.type = "button"
    button.className = "pointer-media-reveal__button"
    button.innerHTML = `<span class="pointer-media-reveal__eyebrow">${item.eyebrow}</span><span class="pointer-media-reveal__title">${item.title}</span>`
    button.addEventListener("mouseenter", () => setActive(index))
    button.addEventListener("focus", () => setActive(index))
    list.appendChild(button)
  })

  root.addEventListener("pointermove", (event) => {
    const rect = root.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    focusShell.style.left = `${x}%`
    focusShell.style.top = `${y}%`
  })

  setActive(0)
})()
