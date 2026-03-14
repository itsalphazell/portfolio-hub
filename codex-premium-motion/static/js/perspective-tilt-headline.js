(function () {
  const shells = document.querySelectorAll("[data-premium-perspective-headline]")
  shells.forEach((shell) => {
    const card = shell.querySelector(".perspective-tilt-headline")
    if (!card) {
      return
    }

    shell.addEventListener("pointermove", (event) => {
      const rect = shell.getBoundingClientRect()
      const relativeX = (event.clientX - rect.left) / rect.width - 0.5
      const relativeY = (event.clientY - rect.top) / rect.height - 0.5
      card.style.transform = `rotateX(${relativeY * -12}deg) rotateY(${relativeX * 16}deg)`
    })

    shell.addEventListener("pointerleave", () => {
      card.style.transform = "rotateX(0deg) rotateY(0deg)"
    })
  })
})()
