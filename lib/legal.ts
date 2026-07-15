// ===== Shah G Online — legal copy (Privacy, Terms, Refund, Service) — bilingual =====
// Written for a digital FOOD MARKETPLACE / directory (SaaS listing platform).
// NOTE: Good-faith template. Have a qualified lawyer review before you rely on it.

import type { Lang } from "./i18n";

export interface LegalSection {
  h: string;
  body: string[];
}
export interface LegalDoc {
  badge: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

const COMPANY = "Shah G Online";
const SITE = "shahgfood.com";
const EMAIL = "business@shahgfood.com";
const LOCATION = "Islamabad, Pakistan (online-only B2B service — no physical storefront)";
const UPDATED_EN = "Last updated: 13 July 2026";
const UPDATED_UR = "آخری اپ ڈیٹ: 13 جولائی 2026";

/* ---------------- PRIVACY ---------------- */
const PRIVACY_EN: LegalDoc = {
  badge: "LEGAL · PRIVACY",
  title: "Privacy Policy",
  updated: UPDATED_EN,
  intro: `This Privacy Policy explains how ${COMPANY} ("we", "us", "our") — an online food marketplace at ${SITE} — collects, uses, shares and protects your information. By using our website you agree to these practices.`,
  sections: [
    { h: "1. Who we are", body: [`${COMPANY} is a digital marketplace that lists the menus of partner restaurants and home kitchens across Pakistan. We are an online-only service based in ${LOCATION}. We do not cook, sell, or deliver food ourselves — orders are placed directly with the listed restaurant.`] },
    { h: "2. Information we collect", body: [
      "From customers: nothing is required to browse. If you choose to order, you contact the restaurant directly by phone or WhatsApp — any details you share then go to that restaurant, not to us.",
      "From restaurant partners: business name, owner name, phone, email, service areas, dish and pricing details, and payment confirmation details for your listing subscription.",
      "Automatically: basic technical data (device, browser, IP, pages viewed) and cookies/local storage to keep the site working and to remember your language preference.",
    ] },
    { h: "3. How we use your information", body: [
      "To display restaurant listings to customers in the relevant service areas.",
      "To process and manage restaurant listing subscriptions and to contact partners about their account.",
      "To improve, secure and operate the website.",
      "To meet our legal, tax and regulatory obligations.",
    ] },
    { h: "4. Payments", body: [`Listing subscription payment details are shared with partner restaurants by email after they submit a listing request, and payments are settled by bank transfer. We do not store your card or bank details on our servers. Customer food payments are made directly to the restaurant and are outside our systems.`] },
    { h: "5. How we share information", body: [
      "With partner restaurants, only as needed to operate their listing.",
      "With service providers (payment processor, hosting, email) strictly to run the service.",
      "Where required by law, regulation or a valid request from a public authority.",
      "We never sell your personal information.",
    ] },
    { h: "6. Cookies", body: ["We use essential cookies and local storage to remember your language, keep the site working, and understand usage so we can improve it. You can control cookies in your browser."] },
    { h: "7. Data retention & security", body: ["We keep information only as long as needed to provide the service and meet legal requirements, then delete or anonymise it. We use reasonable technical and organisational measures to protect it, though no method is 100% secure."] },
    { h: "8. Your rights", body: ["You may request access to, correction of, or deletion of your information, and withdraw marketing consent, by contacting us below."] },
    { h: "9. Changes & contact", body: [`We may update this policy and will post the new version here. Questions? Email us at ${EMAIL}.`] },
  ],
};

/* ---------------- TERMS ---------------- */
const TERMS_EN: LegalDoc = {
  badge: "LEGAL · TERMS",
  title: "Terms & Conditions",
  updated: UPDATED_EN,
  intro: `These Terms govern your use of ${COMPANY} (${SITE}). By using the website — as a customer or a restaurant partner — you agree to them.`,
  sections: [
    { h: "1. Our role — a marketplace only", body: [`${COMPANY} is a digital marketplace and directory. We list menus of independent restaurants and home kitchens. We are not the seller, cook or courier of any food. Every order is a direct contract between you and the restaurant you contact. ${COMPANY} is not responsible for the preparation, quality, hygiene, pricing, availability or delivery of any food.`] },
    { h: "2. Ordering", body: ["Customers order by contacting a listed restaurant directly via phone or WhatsApp. There is no cart, checkout or payment on this website for food. Prices, timings, delivery and availability are set by each restaurant and may change without notice."] },
    { h: "3. Restaurant partners — listings", body: [
      "By subscribing to a listing package you confirm you are authorised to represent the restaurant and that all information (name, menu, prices, areas, contact) is accurate and lawful.",
      "You are solely responsible for fulfilling orders, food quality and safety, and for honouring the prices you list.",
      "We may edit, suspend or remove a listing that is inaccurate, unlawful, or in breach of these terms.",
    ] },
    { h: "4. Listing fees & payment (B2B only)", body: [
      `Listing packages are billed as published on the “List your restaurant” page (monthly or yearly). Fees are for the listing / advertising service only — ${COMPANY} charges 0% commission on your food sales.`,
      `${COMPANY} operates a digital food marketplace and B2B restaurant directory platform. We provide online visibility, advertising and lead-generation services to restaurant owners by showcasing their signature menus on our high-traffic platform. Any payments we collect are intended EXCLUSIVELY as fixed monthly digital slot rentals, subscription fees and software listing charges directly from our onboarding restaurant partners (B2B clients). No retail consumer-end food-delivery payments or cash-on-delivery transactions are processed through our systems — billing is strictly for corporate vendor subscriptions. ${COMPANY} is an IT / service provider, not a food seller.`,
    ] },
    { h: "5. Acceptable use", body: ["Do not misuse the website, submit false or fraudulent listings, scrape data, or use it for any unlawful purpose. We may suspend accounts that break these terms."] },
    { h: "6. Intellectual property", body: [`The ${COMPANY} name, logo, design and content are owned by or licensed to us. Restaurant names, logos and dish images remain the property of the respective partners, used with permission for their listing.`] },
    { h: "7. Limitation of liability", body: [`To the extent permitted by law, ${COMPANY} is not liable for any loss arising from food ordered through a listing, or for any dealings between customers and restaurants. Our total liability to a partner is limited to the listing fee paid for the current term.`] },
    { h: "8. Governing law", body: ["These terms are governed by the laws of Pakistan, and the courts of Islamabad shall have jurisdiction over any dispute."] },
    { h: "9. Changes & contact", body: [`We may update these terms; the current version is always posted here. Contact us at ${EMAIL}.`] },
  ],
};

/* ---------------- REFUND ---------------- */
const REFUND_EN: LegalDoc = {
  badge: "LEGAL · REFUNDS",
  title: "Return & Refund Policy",
  updated: UPDATED_EN,
  intro: `This policy explains refunds for ${COMPANY}. Because we are a marketplace, refunds work differently for food orders and for restaurant listing subscriptions.`,
  sections: [
    { h: "1. Food orders", body: [`${COMPANY} does not sell food and does not take payment for food. Any refund, replacement or complaint about an order is handled directly by the restaurant you ordered from, under their own policy. Please keep your order details and contact the restaurant directly.`] },
    { h: "2. Restaurant listing subscriptions", body: [
      "Listing fees are for a digital service that goes live after verification.",
      "If your listing has not yet been activated, you may request a full refund within 3 days of payment.",
      "Once your listing is live, the subscription is generally non-refundable for the current period, as the service is already being delivered. Yearly plans may be cancelled going forward; already-used months are not refunded.",
      "If we are unable to activate your listing at all, you will receive a full refund.",
    ] },
    { h: "3. How to request a refund", body: [`Email us at ${EMAIL} with your payment reference. Approved refunds are returned to your original payment method within 7–10 working days.`] },
  ],
};

/* ---------------- SERVICE / SHIPPING ---------------- */
const SERVICE_EN: LegalDoc = {
  badge: "LEGAL · SERVICE",
  title: "Service Delivery Policy",
  updated: UPDATED_EN,
  intro: `${COMPANY} provides a digital service (online restaurant listings). We do not ship physical goods, so this policy explains how our digital service is delivered.`,
  sections: [
    { h: "1. Digital service — no physical shipping", body: [`${COMPANY} is an online-only marketplace. We do not sell or ship any physical product. There are no shipping charges from us. Food delivery, when offered, is arranged directly between the customer and the restaurant.`] },
    { h: "2. Restaurant listing activation", body: ["After a restaurant partner subscribes and payment is verified, we review the submitted details and activate the listing — normally within 24 hours (up to 2 business days at peak times). Activation is confirmed by email."] },
    { h: "3. Availability", body: ["We aim to keep the website available at all times. Occasional downtime may occur for maintenance or reasons beyond our control."] },
    { h: "4. Contact", body: [`For anything about our service, email us at ${EMAIL}. ${COMPANY} operates online from ${LOCATION}.`] },
  ],
};

/* ---------------- URDU ---------------- */
const PRIVACY_UR: LegalDoc = {
  badge: "قانونی · پرائیویسی",
  title: "پرائیویسی پالیسی",
  updated: UPDATED_UR,
  intro: "یہ پالیسی بیان کرتی ہے کہ شاہ جی آن لائن (ایک آن لائن فوڈ مارکیٹ پلیس) آپ کی معلومات کیسے جمع، استعمال، شیئر اور محفوظ کرتا ہے۔ ویب سائٹ استعمال کرنے سے آپ اِن سے اتفاق کرتے ہیں۔",
  sections: [
    { h: "1. ہم کون ہیں", body: ["شاہ جی آن لائن ایک ڈیجیٹل مارکیٹ پلیس ہے جو پاکستان بھر کے ریستورانوں اور ہوم کچن کے مینو لسٹ کرتا ہے۔ ہم صرف آن لائن سروس ہیں (کوئی فزیکل دکان نہیں)۔ ہم خود کھانا نہیں پکاتے، بیچتے یا ڈیلیور نہیں کرتے — آرڈر سیدھا ریستوران کو جاتا ہے۔"] },
    { h: "2. ہم کیا جمع کرتے ہیں", body: [
      "گاہکوں سے: براؤز کرنے کے لیے کچھ ضروری نہیں۔ آرڈر کے لیے آپ سیدھا ریستوران سے رابطہ کرتے ہیں، آپ کی تفصیلات اُسی کو جاتی ہیں۔",
      "پارٹنر ریستورانوں سے: کاروبار کا نام، مالک، فون، ای میل، سروس ایریاز، ڈشز و قیمتیں اور لسٹنگ کی ادائیگی کی تصدیق۔",
      "خودکار: بنیادی تکنیکی ڈیٹا (ڈیوائس، براؤزر، IP) اور کوکیز/لوکل اسٹوریج۔",
    ] },
    { h: "3. استعمال", body: ["لسٹنگ دکھانے، پارٹنر سبسکرپشن چلانے، ویب سائٹ بہتر و محفوظ رکھنے اور قانونی تقاضے پورے کرنے کے لیے۔"] },
    { h: "4. ادائیگیاں", body: ["لسٹنگ درخواست جمع کرانے کے بعد ادائیگی کی تفصیلات پارٹنر ریستوران کو ای میل پر بھیجی جاتی ہیں اور ادائیگی بینک ٹرانسفر سے ہوتی ہے۔ ہم آپ کے کارڈ/بینک تفصیلات محفوظ نہیں کرتے۔ کھانے کی ادائیگی سیدھا ریستوران کو ہوتی ہے۔"] },
    { h: "5. شیئرنگ", body: ["پارٹنر ریستوران اور سروس فراہم کنندگان کے ساتھ صرف ضرورت کے مطابق، یا قانوناً لازم ہونے پر۔ ہم آپ کی معلومات کبھی فروخت نہیں کرتے۔"] },
    { h: "6. کوکیز", body: ["ہم ضروری کوکیز اور لوکل اسٹوریج استعمال کرتے ہیں تاکہ زبان یاد رہے اور سائٹ بہتر ہو۔ آپ براؤزر سے کنٹرول کر سکتے ہیں۔"] },
    { h: "7. حفاظت و مدت", body: ["معلومات صرف ضرورت اور قانونی تقاضوں تک رکھی جاتی ہیں، پھر حذف کر دی جاتی ہیں۔ ہم مناسب حفاظتی اقدامات کرتے ہیں۔"] },
    { h: "8. آپ کے حقوق", body: ["آپ اپنی معلومات دیکھنے، درست یا حذف کرانے کی درخواست کر سکتے ہیں۔ نیچے رابطہ کریں۔"] },
    { h: "9. رابطہ", body: [`سوالات کے لیے ${EMAIL} پر ای میل کریں۔`] },
  ],
};

const TERMS_UR: LegalDoc = {
  badge: "قانونی · شرائط",
  title: "شرائط و ضوابط",
  updated: UPDATED_UR,
  intro: "یہ شرائط شاہ جی آن لائن کے استعمال پر لاگو ہوتی ہیں۔ گاہک یا پارٹنر کی حیثیت سے ویب سائٹ استعمال کرنے پر آپ اِن سے اتفاق کرتے ہیں۔",
  sections: [
    { h: "1. ہمارا کردار — صرف مارکیٹ پلیس", body: ["شاہ جی آن لائن ایک ڈیجیٹل مارکیٹ پلیس ہے جو خودمختار ریستورانوں کے مینو لسٹ کرتا ہے۔ ہم کھانے کے بیچنے والے، پکانے والے یا ڈیلیور کرنے والے نہیں۔ ہر آرڈر آپ اور ریستوران کے درمیان براہِ راست معاہدہ ہے۔ کھانے کے معیار، صفائی، قیمت یا ڈیلیوری کے ہم ذمہ دار نہیں۔"] },
    { h: "2. آرڈرنگ", body: ["گاہک لسٹڈ ریستوران سے سیدھا فون یا واٹس ایپ پر رابطہ کر کے آرڈر کرتے ہیں۔ اس سائٹ پر کھانے کی کوئی کارٹ، چیک آؤٹ یا ادائیگی نہیں۔ قیمتیں و اوقات ہر ریستوران خود مقرر کرتا ہے۔"] },
    { h: "3. پارٹنر ریستوران — لسٹنگ", body: [
      "لسٹنگ پیکج لے کر آپ تصدیق کرتے ہیں کہ آپ ریستوران کے مجاز نمائندہ ہیں اور تمام معلومات درست و قانونی ہیں۔",
      "آرڈر پورا کرنے، کھانے کے معیار و حفاظت اور قیمتوں کے آپ خود ذمہ دار ہیں۔",
      "غلط یا خلافِ قانون لسٹنگ ہم ایڈٹ، معطل یا ہٹا سکتے ہیں۔",
    ] },
    { h: "4. لسٹنگ فیس (صرف B2B)", body: [
      "لسٹنگ پیکج ”اپنا ریستوران لسٹ کریں“ صفحے کے مطابق بل ہوتے ہیں۔ فیس صرف لسٹنگ/ایڈورٹائزنگ سروس کے لیے ہے — کھانے کی سیلز پر 0% کمیشن۔",
      "شاہ جی آن لائن ایک ڈیجیٹل فوڈ مارکیٹ پلیس اور B2B ریستوران ڈائریکٹری پلیٹ فارم ہے۔ ہم ریستوران مالکان کو آن لائن وزیبلٹی، ایڈورٹائزنگ اور لیڈ جنریشن فراہم کرتے ہیں۔ ہم جو ادائیگیاں وصول کرتے ہیں وہ صرف پارٹنر ریستورانوں (B2B کلائنٹس) سے ماہانہ ڈیجیٹل سلاٹ رینٹل، سبسکرپشن اور سافٹ ویئر لسٹنگ فیس ہیں۔ کوئی ریٹیل کنزیومر فوڈ ڈیلیوری یا کیش آن ڈیلیوری ادائیگی ہمارے نظام سے پروسیس نہیں ہوتی — بلنگ صرف کارپوریٹ وینڈر سبسکرپشن کے لیے ہے۔ شاہ جی آن لائن ایک IT/سروس فراہم کنندہ ہے، کھانے کا بیچنے والا نہیں۔",
    ] },
    { h: "5. مناسب استعمال", body: ["جعلی لسٹنگ، ڈیٹا اسکریپنگ یا غیر قانونی استعمال ممنوع ہے۔ خلاف ورزی پر اکاؤنٹ معطل ہو سکتا ہے۔"] },
    { h: "6. دانشورانہ املاک", body: ["شاہ جی آن لائن کا نام، لوگو اور ڈیزائن ہماری ملکیت ہیں۔ ریستوران کے نام و تصاویر اُن کی اپنی ملکیت ہیں، اجازت سے استعمال۔"] },
    { h: "7. ذمہ داری کی حد", body: ["قانون کی حد تک، لسٹنگ کے ذریعے آرڈر کیے کھانے یا گاہک و ریستوران کے لین دین کے ہم ذمہ دار نہیں۔ پارٹنر کے لیے ہماری کل ذمہ داری موجودہ مدت کی ادا شدہ فیس تک محدود ہے۔"] },
    { h: "8. قابلِ اطلاق قانون", body: ["یہ شرائط پاکستان کے قوانین کے تابع ہیں، اور اسلام آباد کی عدالتوں کو دائرہ اختیار حاصل ہوگا۔"] },
    { h: "9. رابطہ", body: [`${EMAIL}`] },
  ],
};

const REFUND_UR: LegalDoc = {
  badge: "قانونی · ری فنڈ",
  title: "ریٹرن اور ری فنڈ پالیسی",
  updated: UPDATED_UR,
  intro: "یہ پالیسی شاہ جی آن لائن کے ری فنڈ بیان کرتی ہے۔ چونکہ ہم مارکیٹ پلیس ہیں، کھانے کے آرڈر اور لسٹنگ سبسکرپشن کے ری فنڈ مختلف ہیں۔",
  sections: [
    { h: "1. کھانے کے آرڈر", body: ["شاہ جی آن لائن کھانا نہیں بیچتا اور نہ ادائیگی لیتا ہے۔ آرڈر سے متعلق ری فنڈ یا شکایت متعلقہ ریستوران اپنی پالیسی کے تحت خود دیکھتا ہے۔ براہ کرم سیدھا ریستوران سے رابطہ کریں۔"] },
    { h: "2. لسٹنگ سبسکرپشن", body: [
      "لسٹنگ فیس ایک ڈیجیٹل سروس کے لیے ہے جو تصدیق کے بعد لائیو ہوتی ہے۔",
      "اگر لسٹنگ ابھی فعال نہیں ہوئی تو ادائیگی کے 3 دن کے اندر مکمل ری فنڈ کی درخواست کر سکتے ہیں۔",
      "لائیو ہونے کے بعد موجودہ مدت کے لیے سبسکرپشن عموماً نان ری فنڈ ایبل ہے۔ سالانہ پلان آگے کے لیے منسوخ ہو سکتا ہے۔",
      "اگر ہم لسٹنگ فعال ہی نہ کر سکیں تو مکمل ری فنڈ ملے گا۔",
    ] },
    { h: "3. ری فنڈ کیسے مانگیں", body: [`${EMAIL} پر ادائیگی کے حوالے کے ساتھ رابطہ کریں۔ منظور شدہ ری فنڈ 7–10 کاروباری دنوں میں اصل طریقے پر واپس ہوتا ہے۔`] },
  ],
};

const SERVICE_UR: LegalDoc = {
  badge: "قانونی · سروس",
  title: "سروس ڈیلیوری پالیسی",
  updated: UPDATED_UR,
  intro: "شاہ جی آن لائن ایک ڈیجیٹل سروس (آن لائن لسٹنگ) فراہم کرتا ہے۔ ہم کوئی فزیکل چیز شپ نہیں کرتے، یہ پالیسی بتاتی ہے کہ ہماری ڈیجیٹل سروس کیسے فراہم ہوتی ہے۔",
  sections: [
    { h: "1. ڈیجیٹل سروس — کوئی شپنگ نہیں", body: ["شاہ جی آن لائن صرف آن لائن مارکیٹ پلیس ہے۔ ہم کوئی فزیکل پروڈکٹ نہیں بیچتے یا شپ کرتے، اس لیے ہماری طرف سے کوئی شپنگ چارج نہیں۔ کھانے کی ڈیلیوری گاہک اور ریستوران کے درمیان طے ہوتی ہے۔"] },
    { h: "2. لسٹنگ فعال ہونا", body: ["پارٹنر کی سبسکرپشن اور ادائیگی کی تصدیق کے بعد ہم تفصیلات دیکھ کر لسٹنگ فعال کرتے ہیں — عموماً 24 گھنٹے میں۔ تصدیق ای میل پر ہوتی ہے۔"] },
    { h: "3. دستیابی", body: ["ہم ویب سائٹ کو ہر وقت دستیاب رکھنے کی کوشش کرتے ہیں۔ کبھی کبھار مینٹیننس کے لیے بندش ہو سکتی ہے۔"] },
    { h: "4. رابطہ", body: [`${EMAIL}`] },
  ],
};

export const PRIVACY: Record<Lang, LegalDoc> = { en: PRIVACY_EN, ur: PRIVACY_UR };
export const TERMS: Record<Lang, LegalDoc> = { en: TERMS_EN, ur: TERMS_UR };
export const REFUND: Record<Lang, LegalDoc> = { en: REFUND_EN, ur: REFUND_UR };
export const SERVICE: Record<Lang, LegalDoc> = { en: SERVICE_EN, ur: SERVICE_UR };
