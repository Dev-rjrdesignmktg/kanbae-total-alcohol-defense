document.addEventListener("DOMContentLoaded", () => {

  const heroes = document.querySelectorAll(".kanbae-hero");

  heroes.forEach((hero) => {

    const slides = [...hero.querySelectorAll(".kanbae-hero__slide")];
    const dots = [...hero.querySelectorAll(".kanbae-hero__dot")];

    const prevBtn = hero.querySelector(".kanbae-hero__arrow--prev");
    const nextBtn = hero.querySelector(".kanbae-hero__arrow--next");

    if (!slides.length) return;

    let current = 0;
    let autoplay = 0;
    const DELAY = 5000;

    function updateSlider(index) {

      slides.forEach((slide, i) => {
        slide.classList.toggle("is-active", i === index);
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle("is-active", i === index);
      });

      current = index;
    }

    function nextSlide() {
      const next = (current + 1) % slides.length;
      updateSlider(next);
    }

    function prevSlide() {
      const prev = (current - 1 + slides.length) % slides.length;
      updateSlider(prev);
    }

    function startAutoplay() {
      stopAutoplay();

      autoplay = setInterval(() => {
        nextSlide();
      }, DELAY);
    }

    function stopAutoplay() {
      if (autoplay) {
        clearInterval(autoplay);
      }
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        nextSlide();
        startAutoplay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        prevSlide();
        startAutoplay();
      });
    }

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        updateSlider(index);
        startAutoplay();
      });
    });

    hero.addEventListener("mouseenter", stopAutoplay);
    hero.addEventListener("mouseleave", startAutoplay);

    updateSlider(0);
    startAutoplay();

  });

});