/**
 * animations.js — IntersectionObserver fade-up reveal
 *
 * Observes elements with class "fade-up".
 * Adds "is-visible" once they enter the viewport (once only).
 * rootMargin "-80px" means element must scroll 80px past the fold.
 */

(function () {
  'use strict';

  function init() {
    var elements = document.querySelectorAll('.fade-up');
    if (!elements.length) return;

    // If IntersectionObserver is not available, show everything
    if (!('IntersectionObserver' in window)) {
      elements.forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '-80px',
        threshold: 0,
      }
    );

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
