// ===== Supplementary bilingual copy for the newer features =====
// (auth pages, location picker, live tracking, admin & super-admin dashboards)

import type { Lang } from "./i18n";

export interface Extra {
  // Location picker
  locTitle: string; locDesc: string; locDetect: string; locDetecting: string; locOr: string;
  locCityLabel: string; locNearest: string; locConfirm: string; locSkip: string; locChangeArea: string;

  // Auth
  welcomeBack: string; loginSub: string; createAccount: string; signupSub: string;
  emailOrPhone: string; phoneLbl: string; passwordLbl: string; confirmPw: string; fullName: string;
  loginBtn: string; signupBtn: string; forgotQ: string; noAccount: string; haveAccount: string;
  loginLink: string; signupLink: string; orContinue: string; guestBrowse: string;
  forgotTitle: string; forgotSub: string; sendReset: string; resetSent: string; resetSentSub: string;
  backToLogin: string; agree: string; nameReq: string; welcomeUser: string;

  // Live tracking
  liveTracking: string; riderOnMap: string; kmAway: string; arrivingAt: string; deliveredAt: string;
  orderReceivedFull: string; yourAddress: string; branchLabel: string;

  // Admin
  adminPortal: string; adminSubtitle: string; branchAdmin: string; superAdmin: string;
  selectBranch: string; adminPassword: string; signIn: string; wrongPw: string;
  liveOrders: string; noOrdersYet: string; noOrdersSub: string; ordersToday: string; revenueToday: string;
  activeNow: string; markPreparing: string; markOnway: string; markDelivered: string; done: string;
  newBadge: string; itemsLabel: string; logout: string; autoRefresh: string; viewStore: string;
  allBranchesTitle: string; superSubtitle: string; branchesLabel: string; totalOrdersLabel: string;
  perBranch: string; ordersLower: string; openDashboard: string; backToOverview: string;
  st: { received: string; preparing: string; onway: string; delivered: string };
}

const EN_X: Extra = {
  locTitle: "Where should we deliver?",
  locDesc: "Pick your area so we can connect you to the nearest Shah Jee Foods branch.",
  locDetect: "📍 Use my current location",
  locDetecting: "Detecting…",
  locOr: "or choose your area",
  locCityLabel: "City",
  locNearest: "Nearest branch",
  locConfirm: "Confirm & start ordering",
  locSkip: "Skip for now",
  locChangeArea: "Change area",

  welcomeBack: "Welcome back",
  loginSub: "Log in to reorder your favourites in seconds.",
  createAccount: "Create your account",
  signupSub: "Join Shah Jee Foods for faster checkout & order tracking.",
  emailOrPhone: "Phone or email",
  phoneLbl: "Phone number",
  passwordLbl: "Password",
  confirmPw: "Confirm password",
  fullName: "Full name",
  loginBtn: "Log in",
  signupBtn: "Create account",
  forgotQ: "Forgot password?",
  noAccount: "New to Shah Jee Foods?",
  haveAccount: "Already have an account?",
  loginLink: "Log in",
  signupLink: "Create one",
  orContinue: "or",
  guestBrowse: "Continue as guest →",
  forgotTitle: "Reset your password",
  forgotSub: "Enter your phone or email and we'll send you a reset link.",
  sendReset: "Send reset link",
  resetSent: "Check your messages",
  resetSentSub: "If an account exists, a reset link is on its way.",
  backToLogin: "← Back to log in",
  agree: "By continuing you agree to our Terms & Privacy Policy.",
  nameReq: "Please enter your name",
  welcomeUser: "Signed in",

  liveTracking: "Live tracking",
  riderOnMap: "Your rider on the map",
  kmAway: "km away",
  arrivingAt: "Arriving in",
  deliveredAt: "Delivered — enjoy!",
  orderReceivedFull: "Order received",
  yourAddress: "Your address",
  branchLabel: "Branch",

  adminPortal: "Shah Jee Foods — Admin",
  adminSubtitle: "Manage live orders across your branch.",
  branchAdmin: "Branch admin",
  superAdmin: "Super admin",
  selectBranch: "Select branch",
  adminPassword: "Password",
  signIn: "Sign in",
  wrongPw: "Incorrect password. Try again.",
  liveOrders: "Live orders",
  noOrdersYet: "No orders yet",
  noOrdersSub: "New orders will appear here the moment they come in.",
  ordersToday: "Orders",
  revenueToday: "Revenue",
  activeNow: "Active now",
  markPreparing: "Start preparing",
  markOnway: "Send out for delivery",
  markDelivered: "Mark delivered",
  done: "Completed",
  newBadge: "NEW",
  itemsLabel: "items",
  logout: "Log out",
  autoRefresh: "Live · auto-refreshing",
  viewStore: "View store ↗",
  allBranchesTitle: "All branches",
  superSubtitle: "Every branch, every order, one dashboard.",
  branchesLabel: "Branches",
  totalOrdersLabel: "Total orders",
  perBranch: "Orders per branch",
  ordersLower: "orders",
  openDashboard: "Open dashboard →",
  backToOverview: "← All branches",
  st: { received: "Received", preparing: "Preparing", onway: "On the way", delivered: "Delivered" },
};

const UR_X: Extra = {
  locTitle: "ہم کہاں ڈیلیور کریں؟",
  locDesc: "اپنا علاقہ منتخب کریں تاکہ ہم آپ کو قریب ترین شاہ جی فوڈز شاخ سے جوڑ سکیں۔",
  locDetect: "📍 میری موجودہ لوکیشن استعمال کریں",
  locDetecting: "تلاش کیا جا رہا ہے…",
  locOr: "یا اپنا علاقہ منتخب کریں",
  locCityLabel: "شہر",
  locNearest: "قریب ترین شاخ",
  locConfirm: "تصدیق کریں اور آرڈر شروع کریں",
  locSkip: "ابھی چھوڑ دیں",
  locChangeArea: "علاقہ تبدیل کریں",

  welcomeBack: "خوش آمدید",
  loginSub: "لاگ ان کریں اور سیکنڈوں میں دوبارہ آرڈر کریں۔",
  createAccount: "اپنا اکاؤنٹ بنائیں",
  signupSub: "تیز چیک آؤٹ اور آرڈر ٹریکنگ کے لیے شاہ جی فوڈز جوائن کریں۔",
  emailOrPhone: "فون یا ای میل",
  phoneLbl: "فون نمبر",
  passwordLbl: "پاس ورڈ",
  confirmPw: "پاس ورڈ کی تصدیق",
  fullName: "پورا نام",
  loginBtn: "لاگ ان",
  signupBtn: "اکاؤنٹ بنائیں",
  forgotQ: "پاس ورڈ بھول گئے؟",
  noAccount: "شاہ جی فوڈز پر نئے ہیں؟",
  haveAccount: "پہلے سے اکاؤنٹ ہے؟",
  loginLink: "لاگ ان",
  signupLink: "بنائیں",
  orContinue: "یا",
  guestBrowse: "بطور مہمان جاری رکھیں ←",
  forgotTitle: "پاس ورڈ ری سیٹ کریں",
  forgotSub: "اپنا فون یا ای میل درج کریں، ہم آپ کو ری سیٹ لنک بھیجیں گے۔",
  sendReset: "ری سیٹ لنک بھیجیں",
  resetSent: "اپنے پیغامات دیکھیں",
  resetSentSub: "اگر اکاؤنٹ موجود ہے تو ری سیٹ لنک بھیج دیا گیا ہے۔",
  backToLogin: "← لاگ ان پر واپس",
  agree: "جاری رکھنے سے آپ ہماری شرائط اور پرائیویسی پالیسی سے اتفاق کرتے ہیں۔",
  nameReq: "براہ کرم اپنا نام درج کریں",
  welcomeUser: "سائن ان ہو گیا",

  liveTracking: "لائیو ٹریکنگ",
  riderOnMap: "نقشے پر آپ کا رائیڈر",
  kmAway: "کلومیٹر دور",
  arrivingAt: "پہنچنے میں",
  deliveredAt: "ڈیلیور ہو گیا — لطف اٹھائیں!",
  orderReceivedFull: "آرڈر موصول ہوا",
  yourAddress: "آپ کا پتہ",
  branchLabel: "شاخ",

  adminPortal: "شاہ جی فوڈز — ایڈمن",
  adminSubtitle: "اپنی شاخ کے لائیو آرڈرز کا انتظام کریں۔",
  branchAdmin: "برانچ ایڈمن",
  superAdmin: "سپر ایڈمن",
  selectBranch: "شاخ منتخب کریں",
  adminPassword: "پاس ورڈ",
  signIn: "سائن ان",
  wrongPw: "غلط پاس ورڈ۔ دوبارہ کوشش کریں۔",
  liveOrders: "لائیو آرڈرز",
  noOrdersYet: "ابھی کوئی آرڈر نہیں",
  noOrdersSub: "نئے آرڈرز آتے ہی یہاں دکھائی دیں گے۔",
  ordersToday: "آرڈرز",
  revenueToday: "آمدنی",
  activeNow: "ابھی فعال",
  markPreparing: "تیاری شروع کریں",
  markOnway: "ڈیلیوری کے لیے بھیجیں",
  markDelivered: "ڈیلیور شدہ نشان زد کریں",
  done: "مکمل",
  newBadge: "نیا",
  itemsLabel: "اشیاء",
  logout: "لاگ آؤٹ",
  autoRefresh: "لائیو · خودکار ریفریش",
  viewStore: "اسٹور دیکھیں ↗",
  allBranchesTitle: "تمام شاخیں",
  superSubtitle: "ہر شاخ، ہر آرڈر، ایک ڈیش بورڈ۔",
  branchesLabel: "شاخیں",
  totalOrdersLabel: "کل آرڈرز",
  perBranch: "فی شاخ آرڈرز",
  ordersLower: "آرڈرز",
  openDashboard: "ڈیش بورڈ کھولیں ←",
  backToOverview: "← تمام شاخیں",
  st: { received: "موصول", preparing: "تیاری", onway: "راستے میں", delivered: "ڈیلیور شدہ" },
};

export const EXTRA: Record<Lang, Extra> = { en: EN_X, ur: UR_X };

// ===== Content pages (about / branches / careers / contact / faqs / track) =====
export interface PageCopy {
  backToStore: string;
  orderNowCta: string;
  aboutTitle: string;
  aboutBadge: string;
  aboutHeadline: string;
  aboutSub: string;
  aboutIntro: string;
  aboutBlocks: { h: string; p: string }[];
  aboutQuote: string;
  branchesNote: string;
  careersTitle: string; careersSub: string; openRoles: string; perksTitle: string; apply: string;
  roles: { title: string; type: string; loc: string }[];
  perks: string[];
  contactTitle: string; contactSub: string;
  callTitle: string; callVal: string; emailTitle: string; emailVal: string; visitTitle: string; visitVal: string; hoursTitle: string;
  formTitle: string; fName: string; fPhone: string; fMsg: string; fSend: string; fSent: string;
  faqTitle: string; faqSub: string; faqs: { q: string; a: string }[];
  trackTitle: string; trackSub: string; trackPh: string; trackBtn: string; trackNotFound: string;
}

const EN_P: PageCopy = {
  backToStore: "← Back to store",
  orderNowCta: "Order now →",
  aboutTitle: "Our story",
  aboutBadge: "OUR STORY · SINCE DAY ONE",
  aboutHeadline: "It started with one plate of Daal Chawal in F-10.",
  aboutSub: "Today, that same humble plate has grown into 35+ branches across Islamabad & Rawalpindi — but the taste, and the promise, has never changed.",
  aboutIntro:
    "Shah Jee Foods began with a simple idea: give hard-working people a hot, honest, home-style meal they could actually afford. No shortcuts, no compromise — just proper desi food, cooked the way it's meant to be. That idea started at a single counter in F-10 Markaz, Islamabad, with one dish that would go on to define us: Daal Chawal.",
  aboutBlocks: [
    {
      h: "Where it all began — F-10 Markaz",
      p: "Our very first branch opened its shutters in F-10 Markaz with a small kitchen, a big degh of daal, and a mountain of fluffy rice. Students, office workers, families and late-night friends lined up for a plate that filled you up without emptying your pocket. Word spread the way good food always does — one satisfied customer at a time. That legendary Daal Chawal is still on our menu today, at a price that still surprises people.",
    },
    {
      h: "One dish, a devoted following",
      p: "As the queues grew, so did the menu. We added Bannu beef pulao, chicken biryani, sizzling karahi and handi, charcoal BBQ, crispy rolls and burgers, tangy chaat, and proper doodh-patti chai. But we refused to lose what made us special: everything is cooked fresh, seasoned by hand, and served fast and hot. People didn't just come back — they brought everyone they knew.",
    },
    {
      h: "35+ branches and still counting",
      p: "From that one counter in F-10, Shah Jee Foods has grown to more than 35 branches across the twin cities — from Blue Area and Bahria Town to Saddar and beyond. Every new kitchen follows the same recipe book, the same standards, and the same belief that great desi food should be within everyone's reach. Wherever you are in Islamabad or Rawalpindi, a hot plate is only minutes away.",
    },
  ],
  aboutQuote: "“Great food shouldn't be a luxury. It should be a plate of Daal Chawal that anyone can afford.”",
  branchesNote: "Tap a branch to set it as your delivery location on the store.",
  careersTitle: "Work with us",
  careersSub: "Help us serve legendary desi food across Islamabad & Rawalpindi. We're always hiring good people.",
  openRoles: "Open positions",
  perksTitle: "Why join Shah Jee Foods",
  apply: "Apply now",
  roles: [
    { title: "Branch Manager", type: "Full-time", loc: "Islamabad / Rawalpindi" },
    { title: "Chef — Desi & BBQ", type: "Full-time", loc: "All branches" },
    { title: "Delivery Rider", type: "Full-time / Part-time", loc: "All branches" },
    { title: "Cashier / Counter Staff", type: "Full-time", loc: "All branches" },
    { title: "Kitchen Helper", type: "Full-time", loc: "All branches" },
  ],
  perks: ["Competitive salary + tips", "Free staff meals every shift", "Growth into management", "Friendly desi team culture"],
  contactTitle: "Get in touch",
  contactSub: "Questions, feedback or catering orders — we'd love to hear from you.",
  callTitle: "Call us", callVal: "+92 51 111 000 786",
  emailTitle: "Email", emailVal: "hello@shahjeefoods.com",
  visitTitle: "Head office", visitVal: "F-10/4 Markaz, Islamabad",
  hoursTitle: "Open daily · 11:00 AM – 2:00 AM",
  formTitle: "Send us a message",
  fName: "Your name", fPhone: "Phone number", fMsg: "Your message", fSend: "Send message", fSent: "Thanks! We'll get back to you soon.",
  faqTitle: "Frequently asked questions",
  faqSub: "Everything you need to know about ordering from Shah Jee Foods.",
  faqs: [
    { q: "What areas do you deliver to?", a: "We deliver across 35+ branches in Islamabad and Rawalpindi. Pick your area on the store and we'll connect you to the nearest branch." },
    { q: "How long does delivery take?", a: "Most orders arrive in 30–40 minutes, depending on your distance from the branch and the time of day." },
    { q: "Is there a delivery fee?", a: "Delivery is Rs. 99, and it's free on orders of Rs. 1500 or more." },
    { q: "What payment methods do you accept?", a: "Cash on Delivery and credit/debit cards (Visa, Mastercard)." },
    { q: "Can I track my order live?", a: "Yes! After you place an order you get a live map with your rider and a countdown ETA. You can also track any order from the Order tracking page using your Order ID." },
    { q: "What are your timings?", a: "All branches are open daily from 11:00 AM to 2:00 AM." },
  ],
  trackTitle: "Track your order",
  trackSub: "Enter your Order ID to see live status and your rider on the map.",
  trackPh: "e.g. SJF-1234",
  trackBtn: "Track order",
  trackNotFound: "We couldn't find that Order ID. Please check and try again.",
};

const UR_P: PageCopy = {
  backToStore: "← اسٹور پر واپس",
  orderNowCta: "ابھی آرڈر کریں ←",
  aboutTitle: "ہماری کہانی",
  aboutBadge: "ہماری کہانی · پہلے دن سے",
  aboutHeadline: "سب کچھ F-10 میں دال چاول کی ایک پلیٹ سے شروع ہوا۔",
  aboutSub: "آج وہی سادہ سی پلیٹ اسلام آباد اور راولپنڈی میں 35+ شاخوں تک پھیل چکی ہے — مگر ذائقہ اور وعدہ آج بھی وہی ہے۔",
  aboutIntro:
    "شاہ جی فوڈز ایک سادہ سوچ سے شروع ہوا: محنت کش لوگوں کو گرم، خالص اور گھر جیسا کھانا ایسی قیمت پر دینا جو ان کی پہنچ میں ہو۔ نہ کوئی شارٹ کٹ، نہ سمجھوتہ — بس اصل دیسی کھانا، جیسے پکنا چاہیے۔ یہ سوچ اسلام آباد کے F-10 مرکز میں ایک چھوٹے سے کاؤنٹر سے شروع ہوئی، ایک ایسی ڈش کے ساتھ جو ہماری پہچان بن گئی: دال چاول۔",
  aboutBlocks: [
    {
      h: "جہاں سے سب شروع ہوا — F-10 مرکز",
      p: "ہماری پہلی شاخ F-10 مرکز میں کھلی — ایک چھوٹا کچن، دال کی بڑی دیگ اور نرم چاول کا ڈھیر۔ طلبہ، دفتر والے، خاندان اور رات گئے کے دوست ایک ایسی پلیٹ کے لیے قطار میں لگتے جو پیٹ بھر دیتی مگر جیب خالی نہ کرتی۔ اچھے کھانے کی طرح بات پھیلتی گئی — ایک مطمئن گاہک سے دوسرے تک۔ وہی مشہور دال چاول آج بھی ہمارے مینو پر ہے، اور اس کی قیمت آج بھی لوگوں کو حیران کر دیتی ہے۔",
    },
    {
      h: "ایک ڈش، بے شمار چاہنے والے",
      p: "قطاریں بڑھیں تو مینو بھی بڑھا۔ ہم نے بنوں بیف پلاؤ، چکن بریانی، کڑاہی اور ہانڈی، کوئلوں کا باربی کیو، کرسپی رول اور برگر، چٹ پٹی چاٹ اور اصل دودھ پتی چائے شامل کی۔ مگر جو چیز ہمیں خاص بناتی ہے وہ ہم نے نہیں چھوڑی: سب کچھ تازہ پکتا ہے، ہاتھ سے مصالحہ لگتا ہے، اور گرم گرم پیش ہوتا ہے۔ لوگ صرف واپس نہیں آئے — وہ اپنے سب جاننے والوں کو ساتھ لائے۔",
    },
    {
      h: "35+ شاخیں اور سلسلہ جاری ہے",
      p: "F-10 کے اُس ایک کاؤنٹر سے شاہ جی فوڈز جڑواں شہروں میں 35 سے زائد شاخوں تک پھیل چکا ہے — بلیو ایریا اور بحریہ ٹاؤن سے صدر اور اس سے آگے تک۔ ہر نیا کچن وہی ترکیب، وہی معیار اور وہی یقین رکھتا ہے کہ عمدہ دیسی کھانا سب کی پہنچ میں ہونا چاہیے۔ اسلام آباد یا راولپنڈی میں آپ جہاں بھی ہوں، گرم پلیٹ صرف چند منٹ کی دوری پر ہے۔",
    },
  ],
  aboutQuote: "”عمدہ کھانا عیاشی نہیں ہونا چاہیے۔ یہ دال چاول کی ایک ایسی پلیٹ ہونی چاہیے جو ہر کوئی خرید سکے۔“",
  branchesNote: "ڈیلیوری لوکیشن مقرر کرنے کے لیے کسی شاخ پر ٹیپ کریں۔",
  careersTitle: "ہمارے ساتھ کام کریں",
  careersSub: "اسلام آباد اور راولپنڈی میں لاجواب دیسی کھانا پہنچانے میں ہماری مدد کریں۔ ہمیں ہمیشہ اچھے لوگوں کی تلاش رہتی ہے۔",
  openRoles: "خالی آسامیاں",
  perksTitle: "شاہ جی فوڈز کیوں جوائن کریں",
  apply: "ابھی اپلائی کریں",
  roles: [
    { title: "برانچ مینیجر", type: "فل ٹائم", loc: "اسلام آباد / راولپنڈی" },
    { title: "شیف — دیسی اور باربی کیو", type: "فل ٹائم", loc: "تمام شاخیں" },
    { title: "ڈیلیوری رائیڈر", type: "فل / پارٹ ٹائم", loc: "تمام شاخیں" },
    { title: "کیشیئر / کاؤنٹر اسٹاف", type: "فل ٹائم", loc: "تمام شاخیں" },
    { title: "کچن ہیلپر", type: "فل ٹائم", loc: "تمام شاخیں" },
  ],
  perks: ["اچھی تنخواہ + ٹپس", "ہر شفٹ میں مفت کھانا", "مینیجمنٹ تک ترقی", "دوستانہ دیسی ٹیم"],
  contactTitle: "رابطہ کریں",
  contactSub: "سوالات، رائے یا کیٹرنگ آرڈرز — ہم آپ سے سننا پسند کریں گے۔",
  callTitle: "کال کریں", callVal: "+92 51 111 000 786",
  emailTitle: "ای میل", emailVal: "hello@shahjeefoods.com",
  visitTitle: "ہیڈ آفس", visitVal: "F-10/4 مرکز، اسلام آباد",
  hoursTitle: "روزانہ کھلا · صبح 11 – رات 2",
  formTitle: "ہمیں پیغام بھیجیں",
  fName: "آپ کا نام", fPhone: "فون نمبر", fMsg: "آپ کا پیغام", fSend: "پیغام بھیجیں", fSent: "شکریہ! ہم جلد آپ سے رابطہ کریں گے۔",
  faqTitle: "اکثر پوچھے گئے سوالات",
  faqSub: "شاہ جی فوڈز سے آرڈر کرنے کے بارے میں تمام معلومات۔",
  faqs: [
    { q: "آپ کن علاقوں میں ڈیلیور کرتے ہیں؟", a: "ہم اسلام آباد اور راولپنڈی میں 35+ شاخوں کے ذریعے ڈیلیور کرتے ہیں۔ اسٹور پر اپنا علاقہ منتخب کریں، ہم آپ کو قریب ترین شاخ سے جوڑ دیں گے۔" },
    { q: "ڈیلیوری میں کتنا وقت لگتا ہے؟", a: "زیادہ تر آرڈرز 30–40 منٹ میں پہنچ جاتے ہیں، آپ کے فاصلے اور وقت کے مطابق۔" },
    { q: "کیا ڈیلیوری فیس ہے؟", a: "ڈیلیوری فیس 99 روپے ہے، اور 1500 روپے یا اس سے زائد کے آرڈر پر مفت ہے۔" },
    { q: "آپ کون سے ادائیگی کے طریقے قبول کرتے ہیں؟", a: "کیش آن ڈیلیوری اور کریڈٹ/ڈیبٹ کارڈ (ویزا، ماسٹر کارڈ)۔" },
    { q: "کیا میں اپنا آرڈر لائیو ٹریک کر سکتا ہوں؟", a: "جی ہاں! آرڈر کرنے کے بعد آپ کو نقشے پر رائیڈر اور ETA کاؤنٹ ڈاؤن ملتا ہے۔ آرڈر آئی ڈی سے آرڈر ٹریکنگ صفحے پر بھی ٹریک کر سکتے ہیں۔" },
    { q: "آپ کے اوقات کیا ہیں؟", a: "تمام شاخیں روزانہ صبح 11 بجے سے رات 2 بجے تک کھلی رہتی ہیں۔" },
  ],
  trackTitle: "اپنا آرڈر ٹریک کریں",
  trackSub: "لائیو اسٹیٹس اور نقشے پر رائیڈر دیکھنے کے لیے اپنا آرڈر آئی ڈی درج کریں۔",
  trackPh: "مثلاً SJF-1234",
  trackBtn: "آرڈر ٹریک کریں",
  trackNotFound: "یہ آرڈر آئی ڈی نہیں ملی۔ براہ کرم دوبارہ کوشش کریں۔",
};

export const PAGES: Record<Lang, PageCopy> = { en: EN_P, ur: UR_P };
