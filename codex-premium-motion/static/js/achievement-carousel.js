const achievementCards = Array.from(document.querySelectorAll("[data-achievement-card]"));
const achievementTriggers = Array.from(document.querySelectorAll("[data-achievement-trigger]"));
const previousAchievementButton = document.querySelector("[data-achievement-prev]");
const nextAchievementButton = document.querySelector("[data-achievement-next]");

if (achievementCards.length && achievementTriggers.length) {
  let activeIndex = 0;

  const renderAchievementCards = () => {
    achievementCards.forEach((card, index) => {
      const offset = index - activeIndex;
      const isActive = offset === 0;
      card.classList.toggle("is-active", isActive);
      card.style.top = `${index * 1.1}rem`;
      card.style.transform = `translateX(${Math.max(0, offset) * 2.6}rem) rotate(${offset * 1.8}deg) scale(${isActive ? 1 : Math.max(0.86, 1 - Math.abs(offset) * 0.06)})`;
      card.style.opacity = isActive ? "1" : `${Math.max(0.32, 0.82 - Math.abs(offset) * 0.16)}`;
      card.style.zIndex = `${achievementCards.length - index}`;
      card.style.borderColor = isActive ? "rgba(34, 211, 238, 0.28)" : "rgba(255, 255, 255, 0.1)";
    });

    achievementTriggers.forEach((trigger, index) => {
      trigger.classList.toggle("is-active", index === activeIndex);
    });
  };

  achievementTriggers.forEach((trigger, index) => {
    trigger.addEventListener("mouseenter", () => {
      activeIndex = index;
      renderAchievementCards();
    });
    trigger.addEventListener("focus", () => {
      activeIndex = index;
      renderAchievementCards();
    });
    trigger.addEventListener("click", () => {
      activeIndex = index;
      renderAchievementCards();
    });
  });

  previousAchievementButton?.addEventListener("click", () => {
    activeIndex = activeIndex === 0 ? achievementCards.length - 1 : activeIndex - 1;
    renderAchievementCards();
  });

  nextAchievementButton?.addEventListener("click", () => {
    activeIndex = activeIndex === achievementCards.length - 1 ? 0 : activeIndex + 1;
    renderAchievementCards();
  });

  renderAchievementCards();
}
