document.addEventListener("DOMContentLoaded", () => {

  const sections = document.querySelectorAll(".kanbae-timeline");

  sections.forEach((section) => {

    const cards = [...section.querySelectorAll("[data-timeline-card]")];
    const slides = [...section.querySelectorAll("[data-timeline-slide]")];

    if (!cards.length || !slides.length) return;

    function goTo(index) {
      cards.forEach((card) => {
        const isActive = card.dataset.index === String(index);
        card.classList.toggle("is-active", isActive);
        card.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
      slides.forEach((slide) => {
        slide.classList.toggle("is-active", slide.dataset.index === String(index));
      });
    }

    cards.forEach((card) => {
      const index = card.dataset.index;
      card.addEventListener("mouseenter", () => goTo(index));
      card.addEventListener("focus", () => goTo(index));
      card.addEventListener("click", () => goTo(index));
    });
  });
});
