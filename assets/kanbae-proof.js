document.addEventListener("DOMContentLoaded", () => {

  const sections = document.querySelectorAll(".kanbae-proof");

  sections.forEach((section) => {

    const slides = [...section.querySelectorAll(".kanbae-proof__slide")];
    const panels = [...section.querySelectorAll(".kanbae-proof__panel")];
    const dots = [...section.querySelectorAll(".kanbae-proof__indicator")];
    const prevBtn = section.querySelector(".kanbae-proof__chevron--prev");
    const nextBtn = section.querySelector(".kanbae-proof__chevron--next");

    if (!slides.length) return;

    let current = 0;

    function goTo(index) {
      const total = slides.length;
      current = (index + total) % total;

      slides.forEach((slide, i) => slide.classList.toggle("is-active", i === current));
      panels.forEach((panel, i) => panel.classList.toggle("is-active", i === current));
      dots.forEach((dot, i) => {
        dot.classList.toggle("is-active", i === current);
        dot.setAttribute("aria-selected", i === current ? "true" : "false");
      });
    }

    if (prevBtn) prevBtn.addEventListener("click", () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => goTo(current + 1));

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => goTo(index));
    });
  });
});
