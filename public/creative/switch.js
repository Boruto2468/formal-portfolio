/* Dual-mode controls. Isolated to the original creative document. */
(() => {
  'use strict';
  const returnLink = document.getElementById('formalEscape');
  const veil = document.getElementById('formalLeaving');
  if (!returnLink || !veil) return;
  try { localStorage.setItem('frank-portfolio-creative-unlocked', 'true'); } catch { /* private browsing */ }
  try {
    if (sessionStorage.getItem('frank-portfolio-arriving') === '1') {
      sessionStorage.removeItem('frank-portfolio-arriving');
      document.documentElement.classList.add('creative-just-arrived');
      window.setTimeout(() => document.documentElement.classList.remove('creative-just-arrived'), 700);
    }
  } catch { /* no session storage */ }
  let navigating = false;
  returnLink.addEventListener('click', (event) => {
    if (navigating) { event.preventDefault(); return; }
    event.preventDefault();
    navigating = true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.location.assign('/');
      return;
    }
    veil.classList.add('is-visible');
    veil.setAttribute('aria-hidden', 'false');
    window.setTimeout(() => window.location.assign('/'), 850);
  });
})();
