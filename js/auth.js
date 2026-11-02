/* ==========================================================================
   auth.js — login / sign-up page behavior (front-end demo).
   Replace the redirect in handleSubmit() with a real API call when a
   backend is available.
   ========================================================================== */

const DASHBOARD_URL = "dashboard.html";
const STRENGTH_COLORS = ["#dc2626", "#d97706", "#0891b2", "#16a34a"];

/* ---------- Switch between login and sign-up ---------- */

function showView(name) {
  document.querySelectorAll(".auth-view").forEach((view) => {
    view.classList.toggle("active", view.id === `view-${name}`);
  });
  document.querySelectorAll(".auth-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.view === name);
  });
}

/* ---------- Password helpers ---------- */

function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  input.type = input.type === "password" ? "text" : "password";
}

/** 0–4 points: length, uppercase, digit, symbol. */
function passwordScore(value) {
  return [value.length >= 8, /[A-Z]/.test(value), /[0-9]/.test(value), /[^A-Za-z0-9]/.test(value)].filter(Boolean)
    .length;
}

function showStrength(value) {
  const score = passwordScore(value);
  document.querySelectorAll("#strength div").forEach((bar, i) => {
    bar.style.background = i < score ? STRENGTH_COLORS[score - 1] : "";
  });
}

/* ---------- Submit ---------- */

function handleSubmit(form) {
  const button = form.querySelector(".btn-submit");
  button.disabled = true;
  button.querySelector("span").textContent =
    form.dataset.authForm === "login" ? "در حال ورود..." : "در حال ایجاد حساب...";

  // Demo only: pretend the request took a moment, then open the dashboard
  setTimeout(() => (window.location.href = DASHBOARD_URL), 700);
}

/* ---------- Events ---------- */

document.addEventListener("click", (event) => {
  const viewButton = event.target.closest("[data-view]");
  if (viewButton) showView(viewButton.dataset.view);

  const eye = event.target.closest("[data-toggle-password]");
  if (eye) togglePassword(eye.dataset.togglePassword);
});

document.addEventListener("input", (event) => {
  if (event.target.id === "signup-pass") showStrength(event.target.value);
});

document.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-auth-form]");
  if (!form) return;
  event.preventDefault();
  handleSubmit(form);
});

hydrateIcons();
