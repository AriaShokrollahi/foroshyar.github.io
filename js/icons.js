/* ==========================================================================
   icons.js — one place for every icon in the project.
   All icons are simple 24×24 line icons (stroke 1.5) that inherit the text
   color through `currentColor`.

   Usage in JS:    icon("orders")            → "<svg>…</svg>"
   Usage in HTML:  <button data-icon="plus">Text</button>
                   (hydrateIcons() inserts the SVG before the text)
   ========================================================================== */

const ICON_PATHS = {
  // Navigation
  dashboard: '<path d="M3 13h8V3H3zM13 21h8V11h-8zM13 3v6h8V3zM3 21h8v-6H3z"/>',
  orders:
    '<path d="M3 3h2l2.4 12.4a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21 8H6"/><circle cx="9" cy="21" r="1"/><circle cx="18" cy="21" r="1"/>',
  products:
    '<circle cx="9" cy="21" r="1"/><circle cx="18" cy="21" r="1"/><path d="M2.5 2.5h3l2.7 13.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21.5 7H6.5"/>',
  inventory: '<path d="M21 8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
  customers:
    '<path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-5.4A8 8 0 1 1 21 12z"/>',
  analytics: '<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/>',
  marketing:
    '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><line x1="21" y1="21" x2="16.5" y2="16.5"/>',
  reviews: '<path d="M12 17.3 6.2 21l1.6-6.6L2 9.8l6.7-.6L12 3l3.3 6.2 6.7.6-5.8 4.6L17.8 21z"/>',
  shipping:
    '<rect x="1" y="6" width="15" height="12" rx="1"/><path d="M16 10h4l3 4v4h-7"/><circle cx="6" cy="20" r="2"/><circle cx="18" cy="20" r="2"/>',
  finance: '<line x1="12" y1="2" x2="12" y2="22"/><path d="M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  notifications: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
  settings:
    '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9c.26-.6.14-1.3-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06c.52.47 1.22.59 1.82.33.55-.22.94-.74 1-1.36V3a2 2 0 0 1 4 0v.09c.06.62.45 1.14 1 1.36.6.26 1.3.14 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06c-.47.52-.59 1.22-.33 1.82.22.55.74.94 1.36 1H21a2 2 0 0 1 0 4h-.09c-.62.06-1.14.45-1.36 1z"/>',

  // Actions
  search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  filter: '<path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/>',
  sort: '<path d="M3 6h18M7 12h10M10 18h4"/>',
  plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  minus: '<line x1="5" y1="12" x2="19" y2="12"/>',
  download:
    '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  archive: '<rect x="3" y="4" width="18" height="4"/><path d="M4 8v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8M10 12h4"/>',
  send: '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
  menu: '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
  login:
    '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>',
  logout:
    '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
  chevronRight: '<polyline points="9 18 15 12 9 6"/>',
  arrowLeft: '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
  arrowUp: '<path d="M7 17L17 7M9 7h8v8"/>',
  arrowDown: '<path d="M7 7l10 10M17 9v8H9"/>',

  // Form & misc
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/>',
  lock: '<rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  eye: '<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/>',
  store: '<path d="M3 9l1.5-5h15L21 9"/><path d="M3 9h18v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M9 21v-6h6v6"/>',
  phone:
    '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.79.65 2.65a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.43-1.43a2 2 0 0 1 2.11-.45c.86.31 1.75.53 2.65.65A2 2 0 0 1 22 16.92z"/>',
  sparkle: '<path d="M12 3l2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2z"/>',
};

/* Google "G" is the only multi-color icon, so it is kept as a full SVG. */
const GOOGLE_SVG =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.3-1.6 3.8-5.5 3.8-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.1.8 3.9 1.5l2.6-2.5C16.9 3.2 14.7 2.2 12 2.2 6.9 2.2 2.7 6.4 2.7 11.5S6.9 20.8 12 20.8c6.9 0 9.3-4.8 9.3-7.3 0-.5 0-.9-.1-1.3H12z"/></svg>';

/** Returns the SVG markup for an icon. `size` (px) is optional. */
function icon(name, size) {
  if (name === "google") return GOOGLE_SVG;
  const dimensions = size ? ` width="${size}" height="${size}"` : "";
  return (
    `<svg${dimensions} viewBox="0 0 24 24" fill="none" stroke="currentColor" ` +
    `stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">` +
    `${ICON_PATHS[name] || ""}</svg>`
  );
}

/** Fills every [data-icon="name"] element inside `root` with its SVG. */
function hydrateIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach((el) => {
    if (!el.querySelector(":scope > svg")) {
      el.insertAdjacentHTML("afterbegin", icon(el.dataset.icon));
    }
  });
}
