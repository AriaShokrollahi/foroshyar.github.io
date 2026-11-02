/* ==========================================================================
   components.js — small helpers that return HTML strings.
   Pages are built by composing these, so markup lives in one place.
   ========================================================================== */

/* ---------- Formatting ---------- */

/** 1250000 → "۱٬۲۵۰٬۰۰۰" */
const fa = (n) => Number(n).toLocaleString("fa-IR");

/** 1250000 → "۱٬۲۵۰٬۰۰۰ تومان" */
const toman = (n) => `${fa(n)} تومان`;

/** Escapes user text before it is placed inside HTML. */
const escapeHtml = (text) =>
  String(text).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

/* ---------- Building blocks ---------- */

/** Colored status label, e.g. pill("pending"). */
function pill(status) {
  const { label, tone } = STATUS_MAP[status] || { label: status, tone: "neutral" };
  return `<span class="pill ${tone}">${label}</span>`;
}

/** Button with an optional leading icon. */
function button(label, { iconName, primary = false } = {}) {
  const classes = primary ? "btn primary" : "btn";
  return `<button class="${classes}">${iconName ? icon(iconName) : ""}${label}</button>`;
}

/** Rounded square with an icon or an initial letter. */
function thumb(content) {
  return `<span class="thumb">${content}</span>`;
}

/**
 * Card with an optional header.
 * options: { title, subtitle, action, flush }
 */
function card(body, { title = "", subtitle = "", action = "", flush = false } = {}) {
  const header = title
    ? `<div class="card-header">
         <div>
           <div class="card-title">${title}</div>
           ${subtitle ? `<span class="card-sub">${subtitle}</span>` : ""}
         </div>
         ${action}
       </div>`
    : "";
  return `<div class="card${flush ? " card-flush" : ""}">${header}${body}</div>`;
}

/** Small "view all" style link that navigates to another page. */
function pageLink(label, pageId) {
  return `<span class="link" data-go="${pageId}">${label}</span>`;
}

/** KPI card with icon, value and trend arrow. */
function kpiCard({ label, value, trend, up, iconName, color }) {
  const arrow = icon(up ? "arrowUp" : "arrowDown", 12);
  return `
    <div class="card">
      <div class="kpi-head">
        <div class="kpi-icon" style="background:${color}22; color:${color}">${icon(iconName)}</div>
        <div class="kpi-label">${label}</div>
      </div>
      <div class="kpi-value">${value}</div>
      <div class="kpi-trend ${up ? "up" : "down"}">
        ${arrow}${trend}<span class="vs">نسبت به ماه قبل</span>
      </div>
    </div>`;
}

/**
 * Tabs row. items: [{ label, filter }]
 * When `filter` is set, clicking the tab shows only table rows whose
 * data-status matches (see app.js → handleTabClick).
 */
function tabs(items) {
  const html = items
    .map(
      (item, i) =>
        `<div class="tab${i === 0 ? " active" : ""}"${item.filter ? ` data-filter="${item.filter}"` : ""}>${item.label}</div>`,
    )
    .join("");
  return `<div class="tabs">${html}</div>`;
}

/** Search + filter + sort on one side, custom actions on the other. */
function toolbar(actionsHtml = "") {
  return `
    <div class="toolbar">
      <div class="toolbar-group">
        <div class="search-box">${icon("search")}<input placeholder="جستجو..."></div>
        ${button("فیلتر", { iconName: "filter" })}
        ${button("مرتب‌سازی", { iconName: "sort" })}
      </div>
      <div class="toolbar-group">${actionsHtml}</div>
    </div>`;
}

/** One <tr>. `cells` are already-built HTML strings. */
function tableRow(cells, attributes = "") {
  return `<tr ${attributes}>${cells.map((cell) => `<td>${cell}</td>`).join("")}</tr>`;
}

/** Scrollable table. `rows` is an array of tableRow() strings. */
function dataTable(headers, rows) {
  return `
    <div class="table-wrap">
      <table class="data">
        <thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead>
        <tbody>${rows.join("")}</tbody>
      </table>
    </div>`;
}

/** Avatar with initial and optional online dot. */
function avatar(name, online = false) {
  return `<div class="avatar">${name[0]}${online ? '<span class="online"></span>' : ""}</div>`;
}
