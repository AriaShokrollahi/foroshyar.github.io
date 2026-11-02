/* ==========================================================================
   topbar.js — notification / message dropdowns and unread badges.
   Hover opens them on desktop (CSS); clicking toggles them on touch screens.
   ========================================================================== */

function renderDropdowns() {
  document.getElementById("notificationList").innerHTML = NOTIFICATIONS.map(
    (n) => `
      <div class="dropdown-item" data-go="notifications">
        <span class="dropdown-dot" style="background:${n.color}"></span>
        <div class="dropdown-text"><b>${n.title}</b><p>${n.text}</p></div>
        <span class="dropdown-time">${n.time}</span>
      </div>`,
  ).join("");

  document.getElementById("messageList").innerHTML = CHATS.map((chat) => {
    const last = lastMessage(chat);
    const side = chat.unread
      ? `<span class="unread">${fa(chat.unread)}</span>`
      : `<span class="dropdown-time">${last.time}</span>`;
    return `
      <div class="dropdown-item" data-open-chat="${chat.id}">
        ${avatar(chat.name, chat.online)}
        <div class="dropdown-text"><b>${chat.name}</b><p>${escapeHtml(last.text)}</p></div>
        ${side}
      </div>`;
  }).join("");
}

/** Recalculates the unread counters (topbar icon + sidebar item). */
function updateBadges() {
  const total = CHATS.reduce((sum, chat) => sum + chat.unread, 0);
  const label = total ? fa(total) : "";

  document.getElementById("messageCount").textContent = label;

  const navBadge = document.querySelector('.nav-item[data-page="chat"] .badge');
  if (navBadge) {
    navBadge.textContent = label;
    navBadge.hidden = !total;
  }

  renderDropdowns();
}

function closeDropdowns() {
  document.querySelectorAll(".dropdown.open").forEach((d) => d.classList.remove("open"));
}

document.addEventListener("click", (event) => {
  // Toggle button
  const toggle = event.target.closest("[data-dropdown]");
  if (toggle) {
    event.stopPropagation();
    const dropdown = document.getElementById(toggle.dataset.dropdown);
    const wasOpen = dropdown.classList.contains("open");
    closeDropdowns();
    if (!wasOpen) dropdown.classList.add("open");
    return;
  }

  // Message row → open that conversation
  const messageRow = event.target.closest("[data-open-chat]");
  if (messageRow) {
    openChatPage(Number(messageRow.dataset.openChat));
    return;
  }

  // "Open chat" footer link
  if (event.target.closest("[data-open-chat-page]")) {
    openChatPage();
    return;
  }

  // Click anywhere outside closes the panels
  if (!event.target.closest(".dropdown")) closeDropdowns();
  else if (event.target.closest("[data-go]")) closeDropdowns();
});
