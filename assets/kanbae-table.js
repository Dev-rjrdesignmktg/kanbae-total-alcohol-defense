(function () {
  // 1. Declaramos la función fuera para que sea global en este archivo
  function initKanbaeTable(root) {
    if (!root || root.dataset.kanbaeTableInit === 'true') return;
    root.dataset.kanbaeTableInit = 'true';

    const animate = root.getAttribute('data-animate') === 'true';
    const rows = root.querySelectorAll('tbody .kanbae-table__row');

    if (!animate || !('IntersectionObserver' in window) || !rows.length) {
      rows.forEach(function (row) { row.classList.add('is-visible'); });
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

    rows.forEach(function (row) { observer.observe(row); });
  }

  // 2. Inicialización al cargar la página
  function initAll() {
    document.querySelectorAll('[data-kanbae-table]').forEach(initKanbaeTable);
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  // 3. Listener para Shopify Editor
  document.addEventListener('shopify:section:load', function (event) {
    const el = event.target.querySelector('[data-kanbae-table]');
    if (el) {
      initKanbaeTable(el);
    }
  });
})();