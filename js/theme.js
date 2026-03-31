/**
 * theme.js — Theme toggle + localStorage persistence
 *
 * Flash prevention is handled by a tiny inline script in <head>.
 * This file wires up the toggle button(s) present on all pages.
 */

(function () {
  'use strict';

  function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') === 'light'
      ? 'light'
      : 'dark';
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    try {
      localStorage.setItem('theme', theme);
    } catch (_) {
      // localStorage not available (private browsing, etc.)
    }
    updateToggleLabel(theme);
  }

  function updateToggleLabel(theme) {
    var toggles = document.querySelectorAll('.theme-toggle');
    toggles.forEach(function (btn) {
      btn.setAttribute(
        'aria-label',
        theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
      );
    });
  }

  function init() {
    var toggles = document.querySelectorAll('.theme-toggle');
    if (!toggles.length) return;

    // Set correct aria-label on load
    updateToggleLabel(getCurrentTheme());

    toggles.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var next = getCurrentTheme() === 'light' ? 'dark' : 'light';
        applyTheme(next);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
