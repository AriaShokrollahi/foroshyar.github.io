/* ==========================================================================
   data.js — navigation config and demo (mock) data.
   Replace these arrays with real API calls when a backend is connected.
   ========================================================================== */

/* ---------- Navigation ---------- */
const NAV_ITEMS = [
  { id: "dashboard", label: "داشبورد", icon: "dashboard" },
  { id: "orders", label: "سفارشات", icon: "orders", badge: "۸" },
  { id: "products", label: "محصولات", icon: "products" },
  { id: "inventory", label: "انبار", icon: "inventory" },
  { id: "customers", label: "مشتریان", icon: "customers" },
  { id: "chat", label: "پیام‌ها", icon: "chat", badge: "" }, // badge is filled with the unread count
  { id: "analytics", label: "تحلیل فروش", icon: "analytics" },
  { id: "marketing", label: "بازاریابی", icon: "marketing" },
  { id: "reviews", label: "نظرات", icon: "reviews" },
  { id: "shipping", label: "ارسال", icon: "shipping" },
  { id: "finance", label: "مالی", icon: "finance" },
  { id: "notifications", label: "اعلانات", icon: "notifications" },
  { id: "settings", label: "تنظیمات", icon: "settings" },
];

/* [title, subtitle] shown in the topbar for each page */
const PAGE_TITLES = {
  dashboard: ["نمای کلی", "خلاصه عملکرد فروشگاه شما امروز"],
  orders: ["سفارشات", "مدیریت سفارش‌های آنلاین و حضوری"],
  products: ["محصولات", "فهرست و مدیریت کالاهای فروشگاه"],
  inventory: ["انبار", "وضعیت موجودی و جابه‌جایی کالا"],
  customers: ["مشتریان", "فهرست و تاریخچه خرید مشتریان"],
  chat: ["پیام‌ها", "گفتگو با مشتریان و اعضای تیم"],
  analytics: ["تحلیل فروش", "گزارش‌های عملکرد فروش، محصول و مشتری"],
  marketing: ["بازاریابی", "کدهای تخفیف، کمپین‌ها و سبدهای رهاشده"],
  reviews: ["نظرات", "مدیریت نظرات و امتیازهای مشتریان"],
  shipping: ["ارسال", "پیگیری و مدیریت مرسولات"],
  finance: ["مالی", "درآمد، هزینه و تراکنش‌های مالی"],
  notifications: ["اعلانات", "هشدارها و پیام‌های سیستمی"],
  settings: ["تنظیمات", "پیکربندی فروشگاه، پرداخت و دسترسی‌ها"],
};

/* ---------- Status labels (used by the pill component) ---------- */
const STATUS_MAP = {
  // orders
  pending: { label: "در انتظار", tone: "warning" },
  processing: { label: "در حال آماده‌سازی", tone: "info" },
  shipped: { label: "ارسال شده", tone: "info" },
  completed: { label: "تکمیل شده", tone: "success" },
  cancelled: { label: "لغو شده", tone: "danger" },
  refunded: { label: "مرجوعی", tone: "neutral" },
  // products / inventory
  active: { label: "فعال", tone: "success" },
  out: { label: "ناموجود", tone: "danger" },
  low: { label: "موجودی کم", tone: "warning" },
  // customers
  vip: { label: "VIP", tone: "info" },
  new: { label: "جدید", tone: "neutral" },
  // reviews
  published: { label: "منتشرشده", tone: "success" },
};

/* ---------- Products ---------- */
const PRODUCTS = [
  { name: "هدفون بی‌سیم آریا X2", category: "الکترونیک", price: 1250000, stock: 42, sales: 318, status: "active" },
  { name: "کیف چرم دستی رزا", category: "مد و پوشاک", price: 890000, stock: 6, sales: 154, status: "active" },
  { name: "لامپ رومیزی هوشمند نور", category: "خانه و آشپزخانه", price: 620000, stock: 0, sales: 88, status: "out" },
  { name: "ساعت هوشمند پالس", category: "الکترونیک", price: 2350000, stock: 19, sales: 210, status: "active" },
  { name: "ست مراقبت پوست گلاب", category: "زیبایی", price: 410000, stock: 64, sales: 276, status: "active" },
  { name: "کفش دویدن ایرمکس", category: "ورزشی", price: 1590000, stock: 11, sales: 132, status: "low" },
  { name: "کوله پشتی سفری ترک", category: "اکسسوری", price: 980000, stock: 27, sales: 97, status: "active" },
  { name: "پاوربانک ۲۰۰۰۰ رعد", category: "الکترونیک", price: 540000, stock: 3, sales: 401, status: "low" },
];

/* ---------- Customers ---------- */
const CUSTOMERS = [
  {
    name: "سارا محمدی",
    email: "sara.m@mail.com",
    phone: "0912***4471",
    orders: 14,
    spent: 18450000,
    average: 1318000,
    lastOrder: "۲ روز پیش",
    status: "vip",
  },
  {
    name: "امیر رضایی",
    email: "amir.r@mail.com",
    phone: "0935***2290",
    orders: 6,
    spent: 5230000,
    average: 871000,
    lastOrder: "۵ روز پیش",
    status: "active",
  },
  {
    name: "نگار احمدی",
    email: "negar.a@mail.com",
    phone: "0919***7712",
    orders: 22,
    spent: 31200000,
    average: 1418000,
    lastOrder: "دیروز",
    status: "vip",
  },
  {
    name: "کیان توکلی",
    email: "kian.t@mail.com",
    phone: "0901***3345",
    orders: 2,
    spent: 980000,
    average: 490000,
    lastOrder: "۱۲ روز پیش",
    status: "new",
  },
  {
    name: "مریم قاسمی",
    email: "maryam.g@mail.com",
    phone: "0938***8890",
    orders: 9,
    spent: 9870000,
    average: 1096000,
    lastOrder: "۱ هفته پیش",
    status: "active",
  },
];

/* ---------- Orders ---------- */
const ORDERS = [
  { id: "#10482", customer: "سارا محمدی", channel: "آنلاین", total: 2450000, status: "pending", date: "امروز، ۱۰:۲۰" },
  { id: "#10481", customer: "امیر رضایی", channel: "حضوری", total: 890000, status: "completed", date: "امروز، ۰۹:۴۵" },
  {
    id: "#10480",
    customer: "نگار احمدی",
    channel: "آنلاین",
    total: 1590000,
    status: "processing",
    date: "دیروز، ۱۸:۱۰",
  },
  { id: "#10479", customer: "کیان توکلی", channel: "آنلاین", total: 620000, status: "shipped", date: "دیروز، ۱۴:۳۰" },
  { id: "#10478", customer: "مریم قاسمی", channel: "حضوری", total: 3120000, status: "completed", date: "دیروز، ۱۱:۰۵" },
  { id: "#10477", customer: "رضا نوری", channel: "آنلاین", total: 410000, status: "cancelled", date: "۲ روز پیش" },
  { id: "#10476", customer: "الهام صادقی", channel: "آنلاین", total: 980000, status: "refunded", date: "۳ روز پیش" },
  { id: "#10475", customer: "حسین کریمی", channel: "حضوری", total: 1250000, status: "completed", date: "۳ روز پیش" },
];

/* ---------- Reviews ---------- */
const REVIEWS = [
  {
    author: "سارا محمدی",
    product: "هدفون بی‌سیم آریا X2",
    rating: 5,
    text: "کیفیت صدا عالی بود، پیشنهاد می‌کنم.",
    status: "published",
  },
  {
    author: "کیان توکلی",
    product: "کفش دویدن ایرمکس",
    rating: 2,
    text: "سایزبندی با جدول فروشگاه همخوانی نداشت.",
    status: "pending",
  },
  {
    author: "نگار احمدی",
    product: "ست مراقبت پوست گلاب",
    rating: 4,
    text: "بسته‌بندی شیک، ارسال سریع.",
    status: "published",
  },
];

/* ---------- Notifications ---------- */
const NOTIFICATIONS = [
  { color: "#3346ff", title: "سفارش جدید #10482", text: "سارا محمدی یک سفارش آنلاین ثبت کرد", time: "۲ دقیقه پیش" },
  { color: "#dc2626", title: "پرداخت ناموفق", text: "تراکنش سفارش #10477 ناموفق بود", time: "۳۵ دقیقه پیش" },
  { color: "#d97706", title: "موجودی کم", text: "پاوربانک ۲۰۰۰۰ رعد فقط ۳ عدد مانده", time: "۱ ساعت پیش" },
  { color: "#16a34a", title: "نظر جدید", text: "نگار احمدی برای ست مراقبت پوست نظر داد", time: "دیروز" },
];

/* Notification types shown (with on/off switches) on the notifications page */
const NOTIFICATION_SETTINGS = [
  { title: "سفارش جدید", text: "دریافت اعلان برای هر سفارش تازه", on: true },
  { title: "پرداخت ناموفق", text: "اطلاع‌رسانی هنگام شکست تراکنش پرداخت", on: true },
  { title: "موجودی کم", text: "هشدار زمانی که موجودی از حد آستانه کمتر شود", on: true },
  { title: "نظر جدید", text: "اطلاع از ثبت نظر تازه روی محصولات", on: false },
  { title: "درخواست مرجوعی", text: "اعلان برای هر درخواست بازگشت وجه", on: true },
  { title: "مشکل در ارسال", text: "هشدار تاخیر یا مشکل در تحویل مرسوله", on: false },
  { title: "هشدار سیستمی", text: "پیام‌های فنی و امنیتی مربوط به داشبورد", on: true },
];

/* ---------- Chat ---------- */
/* f: "them" = received, "me" = sent */
const CHATS = [
  {
    id: 1,
    name: "سارا محمدی",
    role: "مشتری",
    online: true,
    unread: 2,
    messages: [
      { f: "them", text: "سلام، سفارش #10482 کی ارسال می‌شه؟", time: "۱۰:۲۰" },
      { f: "me", text: "سلام وقت بخیر، امروز تا ظهر تحویل پست می‌دیم.", time: "۱۰:۲۴" },
      { f: "them", text: "ممنون، کد رهگیری رو هم بفرستید لطفاً", time: "۱۰:۲۶" },
    ],
  },
  {
    id: 2,
    name: "پریسا نجفی",
    role: "اپراتور فروش · شعبه ۲",
    online: true,
    unread: 1,
    messages: [
      { f: "them", text: "موجودی هدفون آریا X2 توی شعبه ۲ تموم شده.", time: "۰۹:۴۰" },
      { f: "me", text: "از انبار مرکزی ۱۰ عدد ارسال می‌کنم.", time: "۰۹:۵۲" },
      { f: "them", text: "عالی، منتظرم.", time: "۰۹:۵۴" },
    ],
  },
  {
    id: 3,
    name: "انبار مرکزی",
    role: "تیم انبار",
    online: false,
    unread: 0,
    messages: [
      { f: "them", text: "بسته‌های ارسالی امروز آماده شد.", time: "دیروز" },
      { f: "me", text: "ممنون، پست تا ساعت ۴ میاد.", time: "دیروز" },
    ],
  },
  {
    id: 4,
    name: "کیان توکلی",
    role: "مشتری",
    online: false,
    unread: 0,
    messages: [
      { f: "them", text: "سایز کفش رو می‌شه عوض کنم؟", time: "۲ روز پیش" },
      { f: "me", text: "بله، تا ۷ روز امکان تعویض داره.", time: "۲ روز پیش" },
    ],
  },
];

/* Canned replies used by the chat demo */
const CHAT_REPLIES = [
  "باشه، ممنون از پیگیری شما.",
  "عالیه، متشکرم.",
  "لطفاً یه کم صبر کنید، بررسی می‌کنم.",
  "دریافت شد، ممنون.",
];
