/* Rock The Treatment — shared product-page interactivity (dependency-free).
   Behaviors are wired via data-* attributes so all three variation pages
   share this one script:
     [data-gallery]           gallery scope
       [data-main]            the large image whose src gets swapped
       [data-thumb]           a thumbnail; data-full = image to swap in
     [data-qty]               quantity stepper scope
       [data-qty-dec/inc]     buttons
       [data-qty-value]       the readout (min 1)
     [data-faq]               a clickable FAQ row (panel is the next sibling
                              carrying [data-faq-panel]; chevron is [data-faq-chevron])
     [data-countdown]         element whose text ticks down; data-start = seconds
*/
(function () {
  'use strict';

  function initGalleries(root) {
    root.querySelectorAll('[data-gallery]').forEach(function (gallery) {
      var main = gallery.querySelector('[data-main]');
      var thumbs = gallery.querySelectorAll('[data-thumb]');
      thumbs.forEach(function (thumb) {
        thumb.addEventListener('click', function () {
          var full = thumb.getAttribute('data-full');
          if (main && full) main.src = full;
          thumbs.forEach(function (t) { t.setAttribute('data-selected', 'false'); });
          thumb.setAttribute('data-selected', 'true');
        });
      });
    });
  }

  function initSteppers(root) {
    root.querySelectorAll('[data-qty]').forEach(function (stepper) {
      var value = stepper.querySelector('[data-qty-value]');
      var dec = stepper.querySelector('[data-qty-dec]');
      var inc = stepper.querySelector('[data-qty-inc]');
      var read = function () { return parseInt(value.textContent, 10) || 1; };
      var write = function (n) { value.textContent = String(Math.max(1, n)); };
      if (dec) dec.addEventListener('click', function () { write(read() - 1); });
      if (inc) inc.addEventListener('click', function () { write(read() + 1); });
    });
  }

  function initFaqs(root) {
    root.querySelectorAll('[data-faq]').forEach(function (row) {
      row.addEventListener('click', function () {
        var panel = row.querySelector('[data-faq-panel]');
        var chevron = row.querySelector('[data-faq-chevron]');
        var open = row.getAttribute('data-open') === 'true';
        row.setAttribute('data-open', open ? 'false' : 'true');
        if (panel) panel.style.maxHeight = open ? '0' : '320px';
        if (chevron) chevron.style.transform = open ? 'rotate(0deg)' : 'rotate(180deg)';
      });
    });
  }

  function initCountdowns(root) {
    root.querySelectorAll('[data-countdown]').forEach(function (el) {
      var secs = parseInt(el.getAttribute('data-start'), 10);
      if (isNaN(secs)) secs = 0;
      var fmt = function (n) {
        var h = Math.floor(n / 3600);
        var m = Math.floor((n % 3600) / 60);
        var s = n % 60;
        var pad = function (v) { return String(v).padStart(2, '0'); };
        return h + 'h ' + pad(m) + 'm ' + pad(s) + 's';
      };
      el.textContent = fmt(secs);
      setInterval(function () {
        if (secs > 0) secs -= 1;
        el.textContent = fmt(secs);
      }, 1000);
    });
  }

  function init() {
    initGalleries(document);
    initSteppers(document);
    initFaqs(document);
    initCountdowns(document);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
