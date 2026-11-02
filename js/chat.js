/* ==========================================================================
   chat.js — messages page.
   This is a front-end demo: sent messages are stored in memory and a canned
   reply arrives after a moment. Swap sendMessage() for a real API/WebSocket
   call when a backend exists.
   ========================================================================== */

let activeChatId = CHATS[0].id;
let chatFilter = "";
let pendingChatId = null; // conversation to open once the chat page is rendered

const getChat = (id) => CHATS.find((chat) => chat.id === id);
const lastMessage = (chat) => chat.messages[chat.messages.length - 1];
const timeNow = () => new Date().toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });

/* ---------- Rendering ---------- */

function renderConversationList() {
  const list = document.getElementById("conversationList");
  if (!list) return;

  const visible = CHATS.filter((chat) => chat.name.includes(chatFilter));

  list.innerHTML =
    visible
      .map((chat) => {
        const last = lastMessage(chat);
        const unread = chat.unread ? `<span class="unread">${fa(chat.unread)}</span>` : "";
        return `
          <div class="conversation${chat.id === activeChatId ? " active" : ""}" data-chat-id="${chat.id}">
            ${avatar(chat.name, chat.online)}
            <div class="conversation-body">
              <div class="conversation-name">${chat.name}<small>${last.time}</small></div>
              <div class="conversation-last"><span>${escapeHtml(last.text)}</span>${unread}</div>
            </div>
          </div>`;
      })
      .join("") || '<div class="empty-state">گفتگویی پیدا نشد</div>';
}

function renderMessages() {
  const body = document.getElementById("threadBody");
  if (!body) return;

  const chat = getChat(activeChatId);
  const bubbles = chat.messages
    .map((m) => `<div class="bubble ${m.f}">${escapeHtml(m.text)}<small>${m.time}</small></div>`)
    .join("");
  const typing = chat.typing ? '<div class="bubble them typing">در حال نوشتن...</div>' : "";

  body.innerHTML = bubbles + typing;
  body.scrollTop = body.scrollHeight;
}

function renderThread() {
  const thread = document.getElementById("thread");
  if (!thread) return;

  const chat = getChat(activeChatId);
  thread.innerHTML = `
    <div class="thread-head">
      <button class="back-btn" data-chat-back aria-label="بازگشت">${icon("chevronRight")}</button>
      ${avatar(chat.name, chat.online)}
      <div>
        <div class="thread-name">${chat.name}</div>
        <div class="thread-sub">${chat.role} · ${chat.online ? "آنلاین" : "آفلاین"}</div>
      </div>
    </div>
    <div class="thread-body" id="threadBody"></div>
    <form class="thread-form" id="threadForm">
      <input id="messageInput" placeholder="پیام خود را بنویسید..." autocomplete="off">
      <button class="send-btn" type="submit" aria-label="ارسال">${icon("send")}</button>
    </form>`;

  renderMessages();
}

/** Called by the router when the chat page opens. */
function renderChat() {
  renderConversationList();
  renderThread();

  // A conversation chosen from the topbar dropdown opens right away
  if (pendingChatId) {
    const id = pendingChatId;
    pendingChatId = null;
    openChat(id);
  }
}

/* ---------- Actions ---------- */

function openChat(id) {
  activeChatId = id;
  getChat(id).unread = 0;
  updateBadges();
  renderChat();

  // On phones the list and thread are separate screens
  const shell = document.getElementById("chatShell");
  if (shell) shell.classList.add("show-thread");
}

function closeChatThread() {
  const shell = document.getElementById("chatShell");
  if (shell) shell.classList.remove("show-thread");
}

/** Used by the messages dropdown: go to the chat page (optionally opening one conversation). */
function openChatPage(id) {
  closeDropdowns();
  pendingChatId = id || null;
  navigate("chat");
}

function sendMessage(text) {
  const chat = getChat(activeChatId);
  const chatId = chat.id;

  chat.messages.push({ f: "me", text, time: timeNow() });
  chat.typing = true;
  renderMessages();
  renderConversationList();

  // Demo reply
  setTimeout(() => {
    chat.typing = false;
    const reply = CHAT_REPLIES[Math.floor(Math.random() * CHAT_REPLIES.length)];
    chat.messages.push({ f: "them", text: reply, time: timeNow() });

    const stillViewing = document.getElementById("threadBody") && activeChatId === chatId;
    if (stillViewing) {
      renderMessages();
      renderConversationList();
    } else {
      chat.unread += 1;
      updateBadges();
    }
  }, 1200);
}

/* ---------- Events (delegated, so they survive re-rendering) ---------- */

document.addEventListener("click", (event) => {
  const conversation = event.target.closest("[data-chat-id]");
  if (conversation) openChat(Number(conversation.dataset.chatId));

  if (event.target.closest("[data-chat-back]")) closeChatThread();
});

document.addEventListener("submit", (event) => {
  if (event.target.id !== "threadForm") return;
  event.preventDefault();

  const input = document.getElementById("messageInput");
  const text = input.value.trim();
  if (!text) return;

  input.value = "";
  sendMessage(text);
});

document.addEventListener("input", (event) => {
  if (event.target.id !== "chatSearch") return;
  chatFilter = event.target.value.trim();
  renderConversationList();
});
