/* Sepik Logistics | js/routes.js (owner: Moyo)
   Loads data/routes.json with fetch(), renders cards, search + mode filter. */
(function () {
  "use strict";

  const list = document.getElementById("route-list");
  const search = document.getElementById("route-search");
  const modeSelect = document.getElementById("route-mode");
  const count = document.getElementById("route-count");
  if (!list) return;

  let routes = [];

  function esc(text) {
    const d = document.createElement("div");
    d.textContent = String(text);
    return d.innerHTML;
  }

  function cap(word) { return word.charAt(0).toUpperCase() + word.slice(1); }

  function render() {
    const q = search.value.trim().toLowerCase();
    const mode = modeSelect.value;

    const shown = routes.filter(function (r) {
      const matchesText = (r.from + " " + r.to).toLowerCase().includes(q);
      const matchesMode = mode === "all" || r.mode === mode;
      return matchesText && matchesMode;
    });

    count.textContent = "Showing " + shown.length + " of " + routes.length + " routes";

    if (shown.length === 0) {
      list.innerHTML = '<p>No routes found. Try a different town or choose "All modes".</p>';
      return;
    }

    list.innerHTML = shown.map(function (r) {
      return '<article class="card">' +
        '<h3>' + esc(r.from) + ' to ' + esc(r.to) + '</h3>' +
        '<p class="meta"><span class="badge">' + esc(cap(r.mode)) + '</span></p>' +
        '<p class="meta">About ' + esc(r.distanceKm) + ' km, ' +
          esc(r.durationHours) + ' hours</p>' +
        '<p class="meta">Departures: ' + esc(r.frequency) + '</p>' +
        '<a href="quote.html?from=' + encodeURIComponent(r.from) +
          '&amp;to=' + encodeURIComponent(r.to) + '">Request a quote</a>' +
        '</article>';
    }).join("");
  }

  async function load() {
    try {
      const response = await fetch("data/routes.json");
      if (!response.ok) throw new Error("HTTP " + response.status);
      routes = await response.json();
      render();
    } catch (err) {
      console.error(err);
      count.textContent = "";
      list.innerHTML = '<p class="notice">We could not load the route list. ' +
        'Please refresh the page or try again later.</p>';
    }
  }

  search.addEventListener("input", render);
  modeSelect.addEventListener("change", render);
  load();
})();
