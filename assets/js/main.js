// AYM site — small progressive enhancements (no dependencies)
(function () {
  "use strict";

  // Mobile navigation toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Focus-area chips -> switch the displayed focus panel (landing page)
  var chips = document.querySelectorAll("[data-focus]");
  if (chips.length) {
    var panels = document.querySelectorAll("[data-focus-panel]");
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var key = chip.getAttribute("data-focus");
        chips.forEach(function (c) { c.classList.remove("is-active"); });
        chip.classList.add("is-active");
        panels.forEach(function (p) {
          p.hidden = p.getAttribute("data-focus-panel") !== key;
        });
      });
    });
  }

  // Donation tier selection
  var tiers = document.querySelectorAll("[data-tier]");
  tiers.forEach(function (t) {
    t.addEventListener("click", function () {
      tiers.forEach(function (x) { x.classList.remove("is-active"); });
      t.classList.add("is-active");
      var input = document.querySelector("[data-tier-input]");
      var mount = document.querySelector("[data-tier-value]");
      if (input) { input.value = t.getAttribute("data-amount") || ""; }
      if (mount) { mount.textContent = "$" + (t.getAttribute("data-amount") || ""); }
    });
  });

  // Tabs (generic) — group defaults to the ungrouped set
  var tabButtons = document.querySelectorAll("[data-tab]");
  if (tabButtons.length) {
    tabButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var group = btn.getAttribute("data-tab-group");
        var btns = group
          ? document.querySelectorAll('[data-tab][data-tab-group="' + group + '"]')
          : document.querySelectorAll("[data-tab]:not([data-tab-group])");
        var pnls = group
          ? document.querySelectorAll('[data-tab-panel][data-tab-group="' + group + '"]')
          : document.querySelectorAll("[data-tab-panel]:not([data-tab-group])");
        btns.forEach(function (b) { b.classList.remove("is-active"); });
        pnls.forEach(function (p) {
          p.hidden = p.getAttribute("data-tab-panel") !== btn.getAttribute("data-tab");
        });
        btn.classList.add("is-active");
      });
    });
  }

  // Demo forms: prevent real submission, show a friendly confirmation
  document.querySelectorAll("form[data-demo]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = form.querySelector("[data-form-note]");
      if (note) {
        note.hidden = false;
        note.textContent = "Thanks — this is a demo form. In the live build this sends through your chosen form service.";
      }
    });
  });

  // Year in footer
  var y = document.querySelector("[data-year]");
  if (y) { y.textContent = new Date().getFullYear(); }
})();
