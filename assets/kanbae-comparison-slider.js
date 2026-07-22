document.addEventListener("DOMContentLoaded", () => {

  const roots = document.querySelectorAll("[data-comparison-root]");

  roots.forEach((root) => {

    const after = root.querySelector("[data-comparison-after]");
    const divider = root.querySelector("[data-comparison-divider]");

    if (!after || !divider) return;

    let dragging = false;

    function setPosition(percent) {
      const clamped = Math.min(100, Math.max(0, percent));

      after.style.clipPath = `inset(0 0 0 ${clamped}%)`;
      divider.style.left = `${clamped}%`;
      root.setAttribute("aria-valuenow", Math.round(clamped));
      root.setAttribute("aria-valuetext", `${Math.round(clamped)}%`);
    }

    function percentFromEvent(event) {
      const rect = root.getBoundingClientRect();
      const x = event.clientX - rect.left;

      return (x / rect.width) * 100;
    }

    function onPointerMove(event) {
      if (!dragging) return;
      setPosition(percentFromEvent(event));
    }

    function stopDragging() {
      if (!dragging) return;
      dragging = false;
      root.classList.remove("is-dragging");
    }

    root.addEventListener("pointerdown", (event) => {
      dragging = true;
      root.classList.add("is-dragging");
      root.setPointerCapture(event.pointerId);
      setPosition(percentFromEvent(event));
    });

    root.addEventListener("pointermove", onPointerMove);
    root.addEventListener("pointerup", stopDragging);
    root.addEventListener("pointercancel", stopDragging);

    root.addEventListener("keydown", (event) => {
      const current = parseFloat(root.getAttribute("aria-valuenow")) || 50;
      const step = 5;

      if (event.key === "ArrowLeft") {
        setPosition(current - step);
        event.preventDefault();
      } else if (event.key === "ArrowRight") {
        setPosition(current + step);
        event.preventDefault();
      }
    });

    setPosition(50);

  });

});
