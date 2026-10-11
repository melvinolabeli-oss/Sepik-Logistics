/* Sepik Logistics | js/main.js (owner: Moyo)
   Loaded on every page: mobile menu, accordion, footer year. */
(function () {
  "use strict";

  // ---------- 1. Mobile menu ----------
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-links");

  function setMenu(open) {
    if (!toggle || !menu) return;
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "Close" : "Menu";
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      setMenu(!menu.classList.contains("open"));
    });
    // Escape closes the menu and returns focus to the button
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) {
        setMenu(false);
        toggle.focus();
      }
    });
  }

  // ---------- 2. Accordion (FAQ) ----------
  document.querySelectorAll(".accordion-button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const panel = document.getElementById(btn.getAttribute("aria-controls"));
      if (!panel) return;
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      panel.hidden = expanded;
    });
  });

  // ---------- 3. Footer year ----------
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
