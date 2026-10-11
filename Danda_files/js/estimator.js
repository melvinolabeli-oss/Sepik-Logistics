/* Sepik Logistics | js/estimator.js (owner: Danda)
   Illustrative freight cost calculator. Rates are examples only. */
(function () {
  "use strict";

  // Change these numbers to adjust the estimate (PNG Kina)
  const RATES = {
    road:  { baseFee: 30,  perKgKm: 0.0015 },
    river: { baseFee: 40,  perKgKm: 0.0020 },
    sea:   { baseFee: 80,  perKgKm: 0.0010 },
    air:   { baseFee: 150, perKgKm: 0.0060 }
  };

  const form = document.getElementById("estimator-form");
  if (!form) return;

  const modeEl = document.getElementById("mode");
  const distEl = document.getElementById("distance");
  const weightEl = document.getElementById("weight");
  const resultBox = document.getElementById("result");
  const priceEl = document.getElementById("price");
  const detailEl = document.getElementById("price-detail");

  function setError(input, message) {
    const err = document.getElementById(input.id + "-error");
    err.textContent = message;
    input.classList.toggle("invalid", Boolean(message));
    input.classList.toggle("valid", !message);
    input.setAttribute("aria-invalid", message ? "true" : "false");
    return !message;
  }

  function validate() {
    let ok = true;
    let firstBad = null;
    const checks = [
      [modeEl,   modeEl.value === "" ? "Choose a transport mode." : ""],
      [distEl,   !(parseFloat(distEl.value) > 0) ? "Enter a distance greater than 0 km." : ""],
      [weightEl, !(parseFloat(weightEl.value) > 0) ? "Enter a weight greater than 0 kg." : ""]
    ];
    checks.forEach(function (c) {
      const good = setError(c[0], c[1]);
      if (!good && !firstBad) firstBad = c[0];
      ok = ok && good;
    });
    if (firstBad) firstBad.focus();
    return ok;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    resultBox.hidden = true;
    if (!validate()) return;

    const rate = RATES[modeEl.value];
    const km = parseFloat(distEl.value);
    const kg = parseFloat(weightEl.value);
    const cost = rate.baseFee + kg * km * rate.perKgKm;

    priceEl.textContent = "K " + cost.toFixed(2);
    detailEl.textContent = "For " + kg + " kg over " + km + " km by " + modeEl.value +
      " (base fee K " + rate.baseFee.toFixed(2) + " plus distance and weight charge).";
    resultBox.hidden = false;
  });

  form.addEventListener("reset", function () {
    resultBox.hidden = true;
    [modeEl, distEl, weightEl].forEach(function (el) {
      el.classList.remove("invalid", "valid");
      el.removeAttribute("aria-invalid");
      document.getElementById(el.id + "-error").textContent = "";
    });
  });
})();
