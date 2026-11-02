/* ==========================================================================
   app.js — starts the dashboard.
   • builds the sidebar navigation
   • hash router  (dashboard.html#orders → Orders page)
   • sidebar drawer for small screens
   • tab filtering and on/off switches (delegated events)
   Load order (see dashboard.html):
   icons → data → components → pages → charts → chat → topbar → app
   ========================================================================== */

const DEFAULT_PAGE = "dashboard";

/* ---------- Sidebar navigation ---------- */

function renderNav() {
  const html = NAV_ITEMS.map((item) => {
    // Items with a `badge` key always get a badge element (it may be empty)
    const badge = "badge" in item ? `<span class="badge"${item.badge ? "" : " hidden"}>${item.badge}</span>` : "";
    return `
      <a class="nav-item" href="#${item.id}" data-page="${item.id}">
        ${icon(item.icon)}<span>${item.label}</span>${badge}
      </a>`;
  }).join("");

  document.getElementById("nav").innerHTML = html;
}

function setActiveNav(pageId) {
  document.querySelectorAll(".nav-item[data-page]").forEach((el) => {
    el.classList.toggle("active", el.dataset.page === pageId);
  });

  const [title, subtitle] = PAGE_TITLES[pageId];
  document.getElementById("pageTitle").textContent = title;
  document.getElementById("pageSubtitle").textContent = subtitle;
  document.title = `فروش‌یار | ${title}`;
}

/* ---------- Router ---------- */

function currentPageId() {
  const id = location.hash.slice(1);
  return Pages[id] ? id : DEFAULT_PAGE;
}

/** Renders the page that matches the URL hash. */
function route() {
  const pageId = currentPageId();

  setActiveNav(pageId);
  document.getElementById("content").innerHTML = Pages[pageId]();
  hydrateIcons();
  renderCharts();
  if (pageId === "chat") renderChat();

  window.scrollTo(0, 0);
  closeSidebar();
  closeDropdowns();
}

/** Go to a page. If we are already there, just re-render it. */
function navigate(pageId) {
  if (location.hash === `#${pageId}`) route();
  else location.hash = pageId;
}

window.addEventListener("hashchange", route);

/* ---------- Sidebar drawer (screens ≤ 860px) ---------- */

function openSidebar() {
  document.getElementById("sidebar").classList.add("open");
  document.getElementById("overlay").classList.add("show");
}

function closeSidebar() {
  document.getElementById("sidebar").classList.remove("open");
  document.getElementById("overlay").classList.remove("show");
}

/* ---------- Delegated clicks ---------- */

document.addEventListener("click", (event) => {
  // Anything with data-go="pageId" navigates (links inside cards, dropdown rows)
  const goTarget = event.target.closest("[data-go]");
  if (goTarget) navigate(goTarget.dataset.go);

  // Drawer controls
  if (event.target.closest("[data-open-sidebar]")) openSidebar();
  if (event.target.closest("[data-close-sidebar]")) closeSidebar();

  // Tabs: highlight the clicked one and filter rows when it has data-filter
  const tab = event.target.closest(".tab");
  if (tab) {
    tab.parentElement.querySelectorAll(".tab").forEach((t) => t.classList.toggle("active", t === tab));

    if (tab.dataset.filter) {
      document.querySelectorAll("tr[data-status]").forEach((row) => {
        const show = tab.dataset.filter === "all" || row.dataset.status === tab.dataset.filter;
        row.classList.toggle("hidden", !show);
      });
    }
  }

  // On/off switches
  const toggle = event.target.closest(".switch");
  if (toggle) {
    const on = toggle.classList.toggle("on");
    toggle.setAttribute("aria-checked", on);
  }
});

/* ---------- Start ---------- */

renderNav();
hydrateIcons();
updateBadges();
route();
