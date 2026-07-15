document.addEventListener('DOMContentLoaded', () => {
    // Buscamos todas las instancias de la sección usando una clase común
    const sections = document.querySelectorAll('.kanbae-belief');
    
    sections.forEach(section => {
        const targets = section.querySelectorAll('[data-kanbae-animate]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        targets.forEach(el => observer.observe(el));
    });
});

document.addEventListener('shopify:section:load', (event) => {

    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    
    const section = target.querySelector('.kanbae-belief');
    if (!section) return;
    
    const targets = section.querySelectorAll('[data-kanbae-animate]');
    targets.forEach(el => el.classList.remove('is-visible'));
    // Pequeño delay para re-animar al entrar al editor
    setTimeout(() => {
        targets.forEach(el => el.classList.add('is-visible'));
    }, 100);
});