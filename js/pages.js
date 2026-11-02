/* ==========================================================================
   pages.js — one function per page. Each returns an HTML string that the
   router (app.js) places inside #content.
   ========================================================================== */

/* Reusable cell: small icon + product name */
const productCell = (name) =>
  `<div class="row">${thumb(icon("inventory"))}<span class="cell-main">${name}</span></div>`;

/* Reusable cell: avatar initial + person name */
const personCell = (name) => `<div class="row">${thumb(name[0])}<span class="cell-main">${name}</span></div>`;

const Pages = {
  /* ------------------------------------------------------------------ */
  dashboard() {
    const kpis = [
      { label: "درآمد کل", value: toman(184500000), trend: "۱۲.۴٪", up: true, iconName: "finance", color: "#3346ff" },
      { label: "تعداد سفارش", value: fa(1240), trend: "۸.۱٪", up: true, iconName: "orders", color: "#0891b2" },
      { label: "مشتریان", value: fa(586), trend: "۳.۲٪", up: true, iconName: "customers", color: "#16a34a" },
      {
        label: "میانگین ارزش سفارش",
        value: toman(1488000),
        trend: "۲.۱٪",
        up: false,
        iconName: "analytics",
        color: "#d97706",
      },
    ];

    const recentOrders = dataTable(
      ["سفارش", "مشتری", "کانال", "مبلغ", "وضعیت"],
      ORDERS.slice(0, 5).map((o) =>
        tableRow([`<span class="cell-main">${o.id}</span>`, o.customer, o.channel, toman(o.total), pill(o.status)]),
      ),
    );

    const topProducts = [...PRODUCTS]
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 4)
      .map(
        (p) => `
        <div class="list-row">
          <div class="row">${thumb(icon("inventory"))}
            <div><div class="cell-main">${p.name}</div><div class="cell-sub">${fa(p.sales)} فروش</div></div>
          </div>
          <div class="cell-main">${toman(p.price)}</div>
        </div>`,
      )
      .join("");

    const lowStock = PRODUCTS.filter((p) => p.status !== "active")
      .map((p) => `<div class="list-row"><div>${p.name}</div>${pill(p.status)}</div>`)
      .join("");

    return `
      <div class="grid kpi-grid mb">${kpis.map(kpiCard).join("")}</div>

      <div class="grid two-col mb">
        ${card('<div class="chart-box"><canvas id="salesChart"></canvas></div>', {
          title: "روند فروش",
          subtitle: "۱۴ روز اخیر",
          action: pageLink("مشاهده گزارش کامل", "analytics"),
        })}
        ${card('<div class="chart-box tall"><canvas id="categoryChart"></canvas></div>', {
          title: "فروش بر اساس دسته‌بندی",
        })}
      </div>

      <div class="grid two-col">
        ${card(recentOrders, {
          title: "آخرین سفارش‌ها",
          action: pageLink("مشاهده همه", "orders"),
        })}
        <div class="stack">
          ${card(topProducts, { title: "پرفروش‌ترین محصولات" })}
          ${card(lowStock, { title: "موجودی کم", action: pageLink("مشاهده انبار", "inventory") })}
        </div>
      </div>`;
  },

  /* ------------------------------------------------------------------ */
  orders() {
    const rows = ORDERS.map((o) =>
      tableRow(
        [
          '<input type="checkbox">',
          `<span class="cell-main">${o.id}</span>`,
          o.customer,
          o.channel,
          toman(o.total),
          pill(o.status),
          `<span class="cell-sub">${o.date}</span>`,
          '<span class="link">مشاهده</span>',
        ],
        `data-status="${o.status}"`,
      ),
    );

    return `
      ${tabs([
        { label: "همه", filter: "all" },
        { label: "در انتظار", filter: "pending" },
        { label: "در حال آماده‌سازی", filter: "processing" },
        { label: "ارسال شده", filter: "shipped" },
        { label: "تکمیل شده", filter: "completed" },
        { label: "لغو شده", filter: "cancelled" },
        { label: "مرجوعی", filter: "refunded" },
      ])}
      ${toolbar(button("خروجی", { iconName: "download" }) + button("عملیات گروهی", { iconName: "archive" }))}
      ${card(dataTable(["", "شماره سفارش", "مشتری", "کانال", "مبلغ کل", "وضعیت", "تاریخ", ""], rows), {
        flush: true,
      })}`;
  },

  /* ------------------------------------------------------------------ */
  products() {
    const rows = PRODUCTS.map((p) =>
      tableRow([productCell(p.name), p.category, toman(p.price), fa(p.stock), fa(p.sales), pill(p.status)]),
    );

    return `
      ${tabs([{ label: "همه محصولات" }, { label: "دسته‌بندی‌ها" }, { label: "برندها" }])}
      ${toolbar(button("افزودن محصول", { iconName: "plus", primary: true }))}
      ${card(dataTable(["محصول", "دسته‌بندی", "قیمت", "موجودی", "فروش", "وضعیت"], rows), { flush: true })}`;
  },

  /* ------------------------------------------------------------------ */
  inventory() {
    const count = (status) => PRODUCTS.filter((p) => p.status === status).length;
    const kpis = [
      { label: "کل کالاها", value: fa(PRODUCTS.length), iconName: "products", color: "#3346ff" },
      { label: "موجود", value: fa(count("active")), iconName: "inventory", color: "#16a34a" },
      { label: "موجودی کم", value: fa(count("low")), iconName: "analytics", color: "#d97706" },
      { label: "ناموجود", value: fa(count("out")), iconName: "notifications", color: "#dc2626" },
    ];

    const rows = PRODUCTS.map((p) =>
      tableRow([productCell(p.name), fa(p.stock), fa(5), pill(p.status), '<span class="link">تنظیم</span>']),
    );

    return `
      <div class="grid kpi-grid mb">${kpis.map(inventoryKpi).join("")}</div>
      ${toolbar(
        button("افزایش موجودی", { iconName: "plus" }) +
          button("کاهش موجودی", { iconName: "minus" }) +
          button("تاریخچه"),
      )}
      ${card(dataTable(["محصول", "موجودی فعلی", "حداقل موجودی", "وضعیت", ""], rows), { flush: true })}`;
  },

  /* ------------------------------------------------------------------ */
  customers() {
    const rows = CUSTOMERS.map((c) =>
      tableRow([
        personCell(c.name),
        `<span class="cell-sub">${c.email}</span>`,
        `<span class="cell-sub">${c.phone}</span>`,
        fa(c.orders),
        toman(c.spent),
        toman(c.average),
        `<span class="cell-sub">${c.lastOrder}</span>`,
        pill(c.status),
      ]),
    );

    return `
      ${toolbar(button("خروجی", { iconName: "download" }))}
      ${card(
        dataTable(["نام", "ایمیل", "تلفن", "سفارشات", "مجموع خرید", "میانگین سفارش", "آخرین سفارش", "وضعیت"], rows),
        { flush: true },
      )}`;
  },

  /* ------------------------------------------------------------------ */
  analytics() {
    const kpis = [
      { label: "درآمد", value: toman(184500000), trend: "۱۲.۴٪", up: true, iconName: "finance", color: "#3346ff" },
      { label: "رشد فروش", value: "۹.۷٪", trend: "۱.۲٪", up: true, iconName: "analytics", color: "#16a34a" },
      { label: "میانگین سفارش", value: toman(1488000), trend: "۲.۱٪", up: false, iconName: "orders", color: "#d97706" },
      { label: "نرخ مرجوعی", value: "۲.۳٪", trend: "۰.۴٪", up: false, iconName: "reviews", color: "#dc2626" },
    ];

    const customerSplit = `
      <div class="list-row"><div>مشتریان جدید</div><div class="cell-main">${fa(214)}</div></div>
      <div class="progress"><div style="width:38%"></div></div>
      <div class="list-row"><div>مشتریان بازگشتی</div><div class="cell-main">${fa(372)}</div></div>
      <div class="progress"><div style="width:62%"></div></div>`;

    return `
      ${tabs([{ label: "فروش" }, { label: "محصول" }, { label: "مشتری" }])}
      <div class="grid kpi-grid mb">${kpis.map(kpiCard).join("")}</div>
      <div class="grid two-col">
        ${card('<div class="chart-box"><canvas id="analyticsChart"></canvas></div>', { title: "روند درآمد ماهانه" })}
        ${card(customerSplit, { title: "مشتریان جدید در برابر بازگشتی" })}
      </div>`;
  },

  /* ------------------------------------------------------------------ */
  marketing() {
    const coupons = [
      { code: "WELCOME20", type: "درصدی", value: "۲۰٪", expires: "۱۴۰۵/۰۷/۰۱", limit: "۵۰۰ بار", status: "active" },
      {
        code: "FREESHIP",
        type: "مبلغ ثابت",
        value: "۵۰٬۰۰۰ تومان",
        expires: "۱۴۰۵/۰۶/۱۵",
        limit: "۲۰۰ بار",
        status: "active",
      },
      { code: "SUMMER10", type: "درصدی", value: "۱۰٪", expires: "۱۴۰۵/۰۵/۱۰", limit: "نامحدود", status: "cancelled" },
    ];

    const rows = coupons.map((c) =>
      tableRow([`<span class="cell-main">${c.code}</span>`, c.type, c.value, c.expires, c.limit, pill(c.status)]),
    );

    const campaigns = `
      <div class="list-row"><div>کمپین بازگشایی مهر</div><div class="cell-main">${toman(42000000)}</div></div>
      <div class="list-row"><div>تخفیف شب یلدا</div><div class="cell-main">${toman(18500000)}</div></div>`;

    const abandonedCart = `
      <div class="list-row"><div>تعداد سبدهای رهاشده</div><div class="cell-main">${fa(86)}</div></div>
      <div class="list-row"><div>ارزش سبدها</div><div class="cell-main">${toman(94000000)}</div></div>
      <div class="list-row"><div>نرخ بازگشت</div><div class="cell-main">۱۸٪</div></div>`;

    return `
      ${tabs([{ label: "کدهای تخفیف" }, { label: "کمپین‌ها" }, { label: "سبد رهاشده" }])}
      ${toolbar(button("ایجاد کد تخفیف", { iconName: "plus", primary: true }))}
      ${card(dataTable(["کد", "نوع", "مقدار", "انقضا", "سقف استفاده", "وضعیت"], rows), { flush: true })}
      <div class="grid two-col mt">
        ${card(campaigns, { title: "کمپین‌های فعال" })}
        ${card(abandonedCart, { title: "سبدهای رهاشده" })}
      </div>`;
  },

  /* ------------------------------------------------------------------ */
  reviews() {
    const stars = (n) => "★".repeat(n) + "☆".repeat(5 - n);

    const cards = REVIEWS.map((r) =>
      card(
        `<p class="mb">${r.text}</p>
         <div class="toolbar-group">
           ${button("تایید")}${button("پاسخ")}${button("گزارش")}${button("حذف")}
         </div>`,
        {
          title: `<div class="row">${thumb(r.author[0])}
                    <div><div class="cell-main">${r.author}</div>
                    <div class="cell-sub">${r.product} · ${stars(r.rating)}</div></div>
                  </div>`,
          action: pill(r.status),
        },
      ),
    ).join("");

    return `
      ${tabs([{ label: "همه" }, { label: "در انتظار" }, { label: "منتشرشده" }, { label: "گزارش‌شده" }])}
      <div class="stack">${cards}</div>`;
  },

  /* ------------------------------------------------------------------ */
  shipping() {
    const shipments = [
      { order: "#10479", customer: "کیان توکلی", method: "پست پیشتاز", tracking: "TP4471228IR", status: "shipped" },
      { order: "#10480", customer: "نگار احمدی", method: "پیک موتوری", tracking: "—", status: "processing" },
      { order: "#10475", customer: "حسین کریمی", method: "تحویل حضوری", tracking: "—", status: "completed" },
    ];

    const rows = shipments.map((s) =>
      tableRow([
        `<span class="cell-main">${s.order}</span>`,
        s.customer,
        s.method,
        `<span class="cell-sub">${s.tracking}</span>`,
        pill(s.status),
      ]),
    );

    return `
      ${toolbar(button("ثبت مرسوله", { iconName: "plus", primary: true }))}
      ${card(dataTable(["سفارش", "مشتری", "روش ارسال", "کد رهگیری", "وضعیت"], rows), { flush: true })}`;
  },

  /* ------------------------------------------------------------------ */
  finance() {
    const kpis = [
      { label: "درآمد", value: toman(184500000), trend: "۱۲.۴٪", up: true, iconName: "finance", color: "#3346ff" },
      { label: "هزینه‌ها", value: toman(62300000), trend: "۴.۱٪", up: false, iconName: "orders", color: "#d97706" },
      { label: "مرجوعی‌ها", value: toman(4100000), trend: "۰.۹٪", up: false, iconName: "reviews", color: "#dc2626" },
      { label: "سود خالص", value: toman(118100000), trend: "۱۵.۲٪", up: true, iconName: "analytics", color: "#16a34a" },
    ];

    const transactions = [
      { id: "TXN-88231", type: "پرداخت", amount: 2450000, date: "امروز، ۱۰:۲۲", status: "completed" },
      { id: "TXN-88214", type: "برداشت", amount: 35000000, date: "دیروز", status: "completed" },
      { id: "TXN-88190", type: "مرجوعی", amount: 980000, date: "۳ روز پیش", status: "pending" },
    ];

    const rows = transactions.map((t) =>
      tableRow([
        `<span class="cell-main">${t.id}</span>`,
        t.type,
        toman(t.amount),
        `<span class="cell-sub">${t.date}</span>`,
        pill(t.status),
      ]),
    );

    return `
      <div class="grid kpi-grid mb">${kpis.map(kpiCard).join("")}</div>
      ${tabs([{ label: "پرداخت‌ها" }, { label: "مرجوعی‌ها" }, { label: "برداشت‌ها" }, { label: "کارمزدها" }])}
      ${card(dataTable(["تراکنش", "نوع", "مبلغ", "تاریخ", "وضعیت"], rows), { flush: true })}`;
  },

  /* ------------------------------------------------------------------ */
  chat() {
    // The list and thread are filled in by renderChat() (chat.js)
    return `
      <div class="chat-shell" id="chatShell">
        <div class="chat-list">
          <div class="chat-list-head">
            <div class="search-box">${icon("search")}<input id="chatSearch" placeholder="جستجوی گفتگو..."></div>
          </div>
          <div class="chat-conversations" id="conversationList"></div>
        </div>
        <div class="chat-thread" id="thread"></div>
      </div>`;
  },

  /* ------------------------------------------------------------------ */
  notifications() {
    const rows = NOTIFICATION_SETTINGS.map(
      (n) => `
        <div class="toggle-row">
          <div><div class="cell-main">${n.title}</div><div class="cell-sub">${n.text}</div></div>
          <div class="switch${n.on ? " on" : ""}" role="switch" aria-checked="${n.on}"></div>
        </div>`,
    ).join("");

    return card(rows);
  },

  /* ------------------------------------------------------------------ */
  settings() {
    const storeForm = `
      <div class="section-title">اطلاعات فروشگاه</div>
      <div class="section-sub">این اطلاعات روی فاکتورها و صفحه فروشگاه شما نمایش داده می‌شود</div>
      <div class="grid form-grid">
        <div class="field"><label>نام فروشگاه</label><input value="فروش‌یار"></div>
        <div class="field"><label>واحد پول</label><select><option>تومان</option><option>ریال</option></select></div>
        <div class="field"><label>زبان</label><select><option>فارسی</option><option>English</option></select></div>
        <div class="field"><label>منطقه زمانی</label><select><option>Asia/Tehran</option></select></div>
      </div>
      <div class="mt">${button("ذخیره تغییرات", { primary: true })}</div>`;

    const users = [
      { name: "آریا شکراللهی", role: "صاحب فروشگاه", branch: "مرکزی", status: "active" },
      { name: "پریسا نجفی", role: "اپراتور فروش", branch: "شعبه ۲", status: "active" },
    ];

    const usersTable = `
      <div class="section-title">کاربران و دسترسی‌ها</div>
      <div class="section-sub">مدیریت اپراتورها و سطح دسترسی هر یک</div>
      ${dataTable(
        ["کاربر", "نقش", "شعبه", "وضعیت"],
        users.map((u) => tableRow([`<span class="cell-main">${u.name}</span>`, u.role, u.branch, pill(u.status)])),
      )}`;

    return `
      ${tabs([{ label: "فروشگاه" }, { label: "پرداخت" }, { label: "ارسال" }, { label: "کاربران" }, { label: "امنیت" }])}
      ${card(storeForm)}
      <div class="mt">${card(usersTable)}</div>`;
  },
};

/* KPI variant without a trend line (inventory counters) */
function inventoryKpi({ label, value, iconName, color }) {
  return `
    <div class="card">
      <div class="kpi-head">
        <div class="kpi-icon" style="background:${color}22; color:${color}">${icon(iconName)}</div>
        <div class="kpi-label">${label}</div>
      </div>
      <div class="kpi-value">${value}</div>
    </div>`;
}
