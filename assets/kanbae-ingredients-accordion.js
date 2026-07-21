document.addEventListener('DOMContentLoaded', () => {

  const accordions = document.querySelectorAll('.js-ingredients-accordion');

  accordions.forEach(accordion => {
    const items = Array.from(accordion.querySelectorAll('[data-item]'));

    items.forEach(item => {
      const trigger = item.querySelector('.kanbae-ing__trigger');
      if (!trigger) return;

      trigger.addEventListener('click', () => {
        const willOpen = !item.classList.contains('is-open');

        items.forEach(other => {
          other.classList.remove('is-open');
          other.querySelector('.kanbae-ing__trigger').setAttribute('aria-expanded', 'false');
        });

        if (willOpen) {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
  });
})
