document.addEventListener("DOMContentLoaded", () => {

  const galleries = document.querySelectorAll(".kanbae-gallery");

  galleries.forEach((gallery) => {

    const viewport = gallery.querySelector(".kanbae-gallery__viewport");
    const slides = [...gallery.querySelectorAll(".kanbae-gallery__slide")];
    const dots = [...gallery.querySelectorAll(".kanbae-gallery__dot")];
    const prevBtn = gallery.querySelector(".kanbae-gallery__arrow--prev");
    const nextBtn = gallery.querySelector(".kanbae-gallery__arrow--next");

    if (!viewport || !slides.length) return;

    let current = 0;

    function setActive(index) {
      dots.forEach((dot, i) => dot.classList.toggle("is-active", i === index));
      current = index;
    }

    function scrollToSlide(index) {
      const clamped = Math.max(0, Math.min(index, slides.length - 1));
      slides[clamped].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => scrollToSlide(current - 1));
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => scrollToSlide(current + 1));
    }

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => scrollToSlide(index));
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = slides.indexOf(entry.target);
            if (index !== -1) setActive(index);
          }
        });
      },
      { root: viewport, threshold: 0.6 }
    );

    slides.forEach((slide) => observer.observe(slide));
  });
});
