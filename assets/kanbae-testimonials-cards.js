(function () {
  function initKanbaeTestimonials(root) {
    if (!root || root.dataset.kanbaeTestimonialsInit === 'true') return;
    root.dataset.kanbaeTestimonialsInit = 'true';

    const animate = root.getAttribute('data-animate') === 'true';
    const cards = root.querySelectorAll('.kanbae-testimonials__card');

    if (!animate || !('IntersectionObserver' in window) || !cards.length) {
      cards.forEach(function (card) { card.classList.add('is-visible'); });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    cards.forEach(function (card) { observer.observe(card); });
  }

  function initAll() {
    document.querySelectorAll('[data-kanbae-testimonials]').forEach(initKanbaeTestimonials);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  document.addEventListener('shopify:section:load', function (event) {
    const el = event.target.querySelector('[data-kanbae-testimonials]');
    if (el) {
      initKanbaeTestimonials(el);
    }
  });
})();
