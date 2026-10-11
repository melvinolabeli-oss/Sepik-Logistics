/* Sepik Logistics | js/quote.js (owner: Danda)
   Quote form: JavaScript validation, accessible errors, localStorage draft.
   There is no server, so submission is simulated. */
(function () {
  "use strict";

  const form = document.getElementById("quote-form");
  if (!form) return;

  const STORAGE_KEY = "sepikQuoteDraft";
  const status = document.getElementById("form-status");
  const fieldIds = ["name", "phone", "email", "pickup", "destination",
                    "cargo", "weight", "date", "notes", "consent"];
  const el = {};
  fieldIds.forEach(function (id) { el[id] = document.getElementById(id); });

  // Preferred date cannot be in the past (local date, not UTC)
  const now = new Date();
  const todayStr = now.getFullYear() + "-" +
    String(now.getMonth() + 1).padStart(2, "0") + "-" +
    String(now.getDate()).padStart(2, "0");
  el.date.min = todayStr;

  // ---------- Validators: return an error message, or "" when OK ----------
  const validators = {
    name: function (v) {
      return v.trim().length < 2 ? "Enter your full name (at least 2 characters)." : "";
    },
    phone: function (v) {
      const digits = v.replace(/[\s-]/g, "");
      const ok = /^(\+675)?\d{7,8}$/.test(digits);
      return ok ? "" : "Enter a PNG phone number, for example 7123 4567 or +675 7123 4567.";
    },
    email: function (v) {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
      return ok ? "" : "Enter a valid email address, for example name@example.com.";
    },
    pickup: function (v) { return v === "" ? "Choose a pickup town." : ""; },
    destination: function (v) {
      if (v === "") return "Choose a destination town.";
      if (v === el.pickup.value) return "Destination must be different from the pickup town.";
      return "";
    },
    cargo: function (v) { return v === "" ? "Choose a cargo type." : ""; },
    weight: function (v) {
      const n = parseFloat(v);
      if (!(n > 0)) return "Enter a weight greater than 0 kg.";
      if (n > 20000) return "For loads over 20,000 kg, please call us.";
      return "";
    },
    date: function (v) {
      if (v === "") return "Choose a preferred date.";
      return v < todayStr ? "The date cannot be in the past." : "";
    },
    notes: function () { return ""; },
    consent: function () {
      return el.consent.checked ? "" : "Tick the box so we can contact you about this quote.";
    }
  };

  function showError(id, message) {
    const input = el[id];
    const err = document.getElementById(id + "-error");
    if (err) err.textContent = message;
    if (id === "notes") return;
    if (input.type !== "checkbox") {
      input.classList.toggle("invalid", Boolean(message));
      input.classList.toggle("valid", !message && input.value !== "");
    }
    input.setAttribute("aria-invalid", message ? "true" : "false");
  }

  function validateField(id) {
    const value = el[id].type === "checkbox" ? el[id].checked : el[id].value;
    const message = validators[id](value);
    showError(id, message);
    return message === "";
  }

  // ---------- Draft saving (localStorage) ----------
  function saveDraft() {
    try {
      const data = {};
      fieldIds.forEach(function (id) {
        data[id] = el[id].type === "checkbox" ? el[id].checked : el[id].value;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) { /* storage unavailable: ignore */ }
  }

  function restoreDraft() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      fieldIds.forEach(function (id) {
        if (!(id in data)) return;
        if (el[id].type === "checkbox") el[id].checked = Boolean(data[id]);
        else el[id].value = data[id];
      });
    } catch (e) { /* ignore broken drafts */ }
  }

  function clearDraft() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
  }

  // ---------- Live validation on blur, draft saving on input ----------
  fieldIds.forEach(function (id) {
    el[id].addEventListener("blur", function () {
      if (id !== "notes") validateField(id);
    });
    el[id].addEventListener("input", saveDraft);
    el[id].addEventListener("change", saveDraft);
  });
  // Changing pickup affects the destination rule
  el.pickup.addEventListener("change", function () {
    if (el.destination.value !== "") validateField("destination");
  });

  restoreDraft();

  // Prefill from the routes page link: quote.html?from=Wewak&to=Maprik
  const params = new URLSearchParams(window.location.search);
  [["from", "pickup"], ["to", "destination"]].forEach(function (pair) {
    const val = params.get(pair[0]);
    if (val && Array.from(el[pair[1]].options).some(function (o) { return o.value === val; })) {
      el[pair[1]].value = val;
    }
  });

  // ---------- Submit ----------
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    status.hidden = true;

    let firstBad = null;
    fieldIds.forEach(function (id) {
      if (!validateField(id) && !firstBad) firstBad = el[id];
    });

    if (firstBad) {
      firstBad.focus();
      return;
    }

    // Build the confirmation with textContent (safe from HTML injection)
    status.textContent = "";
    const h = document.createElement("strong");
    h.textContent = "Thank you, " + el.name.value.trim() + ".";
    const msg = document.createElement("p");
    msg.textContent = "Your quote request for " + el.weight.value + " kg of " +
      el.cargo.value.toLowerCase() + " from " + el.pickup.value + " to " +
      el.destination.value + " has been received. We will contact you on " +
      el.phone.value.trim() + " within one working day.";
    status.appendChild(h);
    status.appendChild(msg);
    status.hidden = false;
    status.setAttribute("tabindex", "-1");
    status.focus();

    form.reset();
    fieldIds.forEach(function (id) {
      showError(id, "");
      if (el[id].classList) el[id].classList.remove("valid", "invalid");
      el[id].removeAttribute("aria-invalid");
    });
    clearDraft();
  });
})();
