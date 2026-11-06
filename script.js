(() => {
  'use strict';
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.primary-nav');
  const topButton = document.querySelector('.back-top');
  const filters = [...document.querySelectorAll('.filter-button')];
  const items = [...document.querySelectorAll('.menu-card')];

  function closeMenu() {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', '開啟選單');
  }

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? '關閉選單' : '開啟選單');
  });

  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 740) closeMenu(); });

  filters.forEach(button => button.addEventListener('click', () => {
    const group = button.dataset.filter;
    filters.forEach(other => {
      const active = other === button;
      other.classList.toggle('is-active', active);
      other.setAttribute('aria-pressed', String(active));
    });
    items.forEach(item => { item.hidden = group !== 'all' && item.dataset.category !== group; });
  }));

  const onScroll = () => topButton.classList.toggle('is-visible', window.scrollY > 500);
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
  topButton.addEventListener('click', () => window.scrollTo({top:0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'}));
  document.querySelector('#year').textContent = new Date().getFullYear();
})();
