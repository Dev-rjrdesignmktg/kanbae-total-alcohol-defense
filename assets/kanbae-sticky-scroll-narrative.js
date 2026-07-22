document.addEventListener("DOMContentLoaded", () => {

  const sections = document.querySelectorAll("[data-kanbae-ssn]");

  sections.forEach((section) => {

    const stages = [...section.querySelectorAll("[data-ssn-stage]")];
    const items = [...section.querySelectorAll("[data-ssn-item]")];

    if (!stages.length || !items.length) return;

    function setActive(index) {
      stages.forEach((stage) => {
        stage.classList.toggle("is-active", stage.dataset.index === String(index));
      });
      items.forEach((item) => {
        item.classList.toggle("is-active", item.dataset.index === String(index));
      });
    }

    if (!("IntersectionObserver" in window)) {
      setActive(0);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.dataset.index);
          }
        });
      },
      {
        root: null,
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0
      }
    );

    items.forEach((item) => observer.observe(item));
  });
});
