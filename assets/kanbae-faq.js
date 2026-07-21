class KanbaeFaqItem {
  constructor(el, group) {
    this.el = el;
    this.group = group;
    this.summary = el.querySelector('.kanbae-faq__summary');
    this.content = el.querySelector('.kanbae-faq__content');
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.summary.addEventListener('click', (e) => this.onClick(e));
  }

  onClick(e) {
    e.preventDefault();
    if (this.reduceMotion) {
      this.el.open = !this.el.open;
      if (this.el.open) this.closeSiblings();
      return;
    }

    this.el.style.overflow = 'hidden';

    if (this.isClosing || !this.el.open) {
      this.open();
    } else if (this.isExpanding || this.el.open) {
      this.shrink();
    }
  }

  closeSiblings() {
    this.group
      .filter((item) => item !== this && item.el.open)
      .forEach((item) => item.instantClose());
  }

  instantClose() {
    if (this.animation) this.animation.cancel();
    this.el.open = false;
  }

  shrink() {
    this.isClosing = true;
    const startHeight = `${this.el.offsetHeight}px`;
    const endHeight = `${this.summary.offsetHeight}px`;

    if (this.animation) this.animation.cancel();

    this.animation = this.el.animate(
      { height: [startHeight, endHeight] },
      { duration: 300, easing: 'ease-out' }
    );

    this.animation.onfinish = () => this.onAnimationFinish(false);
    this.animation.oncancel = () => { this.isClosing = false; };
  }

  open() {
    this.el.style.height = `${this.el.offsetHeight}px`;
    this.el.open = true;
    this.closeSiblings();
    window.requestAnimationFrame(() => this.expand());
  }

  expand() {
    this.isExpanding = true;
    const startHeight = `${this.el.offsetHeight}px`;
    const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight}px`;

    if (this.animation) this.animation.cancel();

    this.animation = this.el.animate(
      { height: [startHeight, endHeight] },
      { duration: 300, easing: 'ease-out' }
    );

    this.animation.onfinish = () => this.onAnimationFinish(true);
    this.animation.oncancel = () => { this.isExpanding = false; };
  }

  onAnimationFinish(open) {
    this.el.open = open;
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.el.style.height = '';
    this.el.style.overflow = '';
  }
}

document.querySelectorAll('.js-faq-accordion').forEach((accordion) => {
  const group = [];
  accordion.querySelectorAll('.kanbae-faq__item').forEach((item) => {
    group.push(new KanbaeFaqItem(item, group));
  });
});
