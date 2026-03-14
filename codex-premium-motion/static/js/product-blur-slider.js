(function () {
  const shell = document.querySelector("[data-product-blur-slider]")
  if (!shell) {
    return
  }

  const slides = [
    {
      name: "QuietComfort Ultra",
      description: "Spatial audio earbuds with active noise cancelling and a hero image that needs room to breathe.",
      price: "$279",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
      halo: "linear-gradient(135deg, rgba(148,163,184,0.7), rgba(71,85,105,0.35))",
    },
    {
      name: "Open Ear Studio",
      description: "Open-fit audio hardware presented like a premium campaign slide instead of a plain carousel.",
      price: "$299",
      image: "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80",
      halo: "linear-gradient(135deg, rgba(103,232,249,0.7), rgba(37,99,235,0.36))",
    },
    {
      name: "Carbon Monitor",
      description: "A product story card with depth, blur, and clear buying context under motion.",
      price: "$605",
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
      halo: "linear-gradient(135deg, rgba(253,186,116,0.7), rgba(244,63,94,0.34))",
    },
  ]

  const title = shell.querySelector("[data-slide-title]")
  const description = shell.querySelector("[data-slide-description]")
  const price = shell.querySelector("[data-slide-price]")
  const stage = shell.querySelector("[data-stage]")
  const buttons = shell.querySelectorAll("[data-direction]")
  let activeIndex = 0

  function render() {
    title.textContent = slides[activeIndex].name
    description.textContent = slides[activeIndex].description
    price.textContent = slides[activeIndex].price
    stage.innerHTML = ""

    slides.forEach((slide, index) => {
      const delta = (index - activeIndex + slides.length) % slides.length
      const item = document.createElement("article")
      item.className = "product-blur-slider__slide"
      if (delta === 0) {
        item.style.transform = "translateX(-12%) scale(1.55)"
        item.style.opacity = "0"
        item.style.filter = "blur(22px)"
        item.style.zIndex = "1"
      } else if (delta === 1) {
        item.style.transform = "translateX(18%) scale(1.1)"
        item.style.opacity = "1"
        item.style.filter = "blur(0px)"
        item.style.zIndex = "3"
      } else {
        item.style.transform = `translateX(${22 + delta * 6}%) scale(${Math.max(0.68, 1 - delta * 0.12)})`
        item.style.opacity = String(Math.max(0.2, 0.72 - delta * 0.16))
        item.style.filter = `blur(${Math.min(12, delta * 4)}px)`
        item.style.zIndex = String(Math.max(1, 4 - delta))
      }

      const halo = document.createElement("div")
      halo.className = "product-blur-slider__halo"
      halo.style.background = slide.halo
      halo.style.opacity = delta === 1 ? "0.55" : "0.2"

      const image = document.createElement("img")
      image.src = slide.image
      image.alt = slide.name

      item.appendChild(halo)
      item.appendChild(image)
      stage.appendChild(item)
    })
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.getAttribute("data-direction")
      activeIndex = direction === "next"
        ? (activeIndex + 1) % slides.length
        : (activeIndex - 1 + slides.length) % slides.length
      render()
    })
  })

  render()
})()
