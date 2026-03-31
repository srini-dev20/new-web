/**
 * nav.js — Mobile hamburger menu
 *
 * Toggles the full-screen overlay on mobile.
 * Closes on: overlay link click, Escape key press.
 * Locks body scroll while open.
 */

(function () {
  'use strict';

  function init() {
    var hamburger = document.querySelector('.nav__hamburger');
    var overlay   = document.querySelector('.nav__overlay');

    if (!hamburger || !overlay) return;

    function openMenu() {
      hamburger.classList.add('is-open');
      overlay.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.setAttribute('aria-label', 'Close menu');
      document.body.style.overflow = 'hidden';
      // Move focus into overlay for accessibility
      var firstLink = overlay.querySelector('a');
      if (firstLink) firstLink.focus();
    }

    function closeMenu() {
      hamburger.classList.remove('is-open');
      overlay.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open menu');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', function () {
      if (hamburger.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close when a nav link inside the overlay is clicked
    overlay.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && hamburger.classList.contains('is-open')) {
        closeMenu();
        hamburger.focus();
      }
    });

    // Close when viewport grows beyond mobile breakpoint
    var mq = window.matchMedia('(min-width: 769px)');
    mq.addEventListener('change', function (e) {
      if (e.matches && hamburger.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
