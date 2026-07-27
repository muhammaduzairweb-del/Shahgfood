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
    { h: "1. Our role — a marketplace only", body: [
      `${COMPANY} is a digital marketplace and directory. We list menus of independent restaurants and home kitchens. We are not the seller, cook or courier of any food. Every order is a direct contract between you (the customer) and the restaurant or home kitchen you contact — not with ${COMPANY}.`,
      `${COMPANY} is not responsible for the preparation, quality, hygiene, pricing, accuracy, availability, timing or delivery of any food. Any issue with an order — wrong item, late delivery, food quality, refund, or anything else — is between the customer and that restaurant/home kitchen to resolve directly.`,
    ] },
    { h: "2. No guarantee of orders, sales or results", body: [
      `${COMPANY} does NOT guarantee any number of orders, calls, WhatsApp messages, customers, sales, or business results from a listing. Search visibility, customer interest and order volume depend on many factors outside our control and will vary.`,
      "Figures shown anywhere on the site describing traffic, visibility or search performance (including any example/sample dashboards) are illustrative only, not a promise of results for any specific partner.",
    ] },
    { h: "3. Ordering", body: ["Customers order by contacting a listed restaurant or home kitchen directly via phone or WhatsApp. There is no cart, checkout or payment on this website for food. Prices, timings, delivery and availability are set by each partner and may change without notice."] },
    { h: "4. Restaurant & home kitchen partners — listings", body: [
      "By subscribing to a listing package you confirm you are authorised to represent the business and that all information (name, menu, prices, areas, delivery fee, contact) is accurate and lawful.",
      "You are solely responsible for fulfilling orders, food quality and hygiene, safe delivery, honouring the prices and delivery fees you list, and for directly resolving any complaint or dispute a customer raises about their order.",
      "We may edit, suspend or remove a listing that is inaccurate, unlawful, or in breach of these terms.",
    ] },
    { h: "5. Listing fees & payment (B2B only)", body: [
      `Listing packages are billed as published on the “List your restaurant” page (monthly or yearly). The fee charged is EXCLUSIVELY to cover the cost of running and maintaining the ${COMPANY} platform (hosting, development, support and advertising your listing) — it is a fixed listing/advertising charge, not a commission, and not payment for any guaranteed outcome. ${COMPANY} charges 0% commission on your food sales.`,
      `${COMPANY} operates a digital food marketplace and B2B restaurant directory platform. We provide online visibility, advertising and lead-generation services to restaurant owners by showcasing their signature menus on our high-traffic platform. Any payments we collect are intended EXCLUSIVELY as fixed monthly digital slot rentals, subscription fees and software listing charges directly from our onboarding restaurant partners (B2B clients). No retail consumer-end food-delivery payments or cash-on-delivery transactions are processed through our systems — billing is strictly for corporate vendor subscriptions. ${COMPANY} is an IT / service provider, not a food seller.`,
    ] },
    { h: "6. Our support to partners", body: [`We provide reasonable support to help partners get listed correctly, update their menu/pricing, and to help mediate if a customer complaint is raised with us. This support is offered on a best-effort basis and does not make ${COMPANY} a party to, or liable for, the underlying order, food, or delivery.`] },
    { h: "7. Acceptable use", body: ["Do not misuse the website, submit false or fraudulent listings, scrape data, or use it for any unlawful purpose. We may suspend accounts that break these terms."] },
    { h: "8. Intellectual property", body: [`The ${COMPANY} name, logo, design and content are owned by or licensed to us. Restaurant/home kitchen names, logos and dish images remain the property of the respective partners, used with permission for their listing.`] },
    { h: "9. Limitation of liability", body: [`To the extent permitted by law, ${COMPANY} is not liable for any loss arising from food ordered through a listing, from any dealings between customers and partners, or from a listing not producing a particular number of orders or sales. Our total liability to a partner, in any case, is limited to the listing fee paid for the current term.`] },
    { h: "10. Your consent when you submit a listing", body: [`When a restaurant or home kitchen partner submits the listing form on the “List your restaurant” page, they must tick a checkbox confirming they have read, understood and agree to these Terms & Conditions and our Privacy Policy in full. This agreement, together with the time it was given, is recorded at the moment of submission as our record of consent.`] },
    { h: "11. Governing law", body: ["These terms are governed by the laws of Pakistan, and the courts of Islamabad shall have jurisdiction over any dispute."] },
    { h: "12. Changes & contact", body: [`We may update these terms; the current version is always posted here. Contact us at ${EMAIL}.`] },
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
    { h: "1. ہمارا کردار — صرف مارکیٹ پلیس", body: [
      "شاہ جی آن لائن ایک ڈیجیٹل مارکیٹ پلیس ہے جو خودمختار ریستورانوں اور ہوم کچنز کے مینو لسٹ کرتا ہے۔ ہم کھانے کے بیچنے والے، پکانے والے یا ڈیلیور کرنے والے نہیں۔ ہر آرڈر گاہک اور اُس ریستوران/ہوم کچن کے درمیان براہِ راست معاہدہ ہے — شاہ جی آن لائن کے ساتھ نہیں۔",
      "کھانے کی تیاری، معیار، صفائی، قیمت، دستیابی، وقت یا ڈیلیوری کے ہم ذمہ دار نہیں۔ آرڈر سے متعلق کوئی بھی مسئلہ — غلط آئٹم، دیر سے ڈیلیوری، معیار، ری فنڈ یا کچھ بھی — گاہک اور اُس ریستوران/ہوم کچن کے درمیان ہی حل ہوگا۔",
    ] },
    { h: "2. آرڈرز، سیلز یا نتائج کی کوئی گارنٹی نہیں", body: [
      "شاہ جی آن لائن کسی مخصوص تعداد میں آرڈرز، کالز، واٹس ایپ میسجز، گاہکوں، سیلز یا کاروباری نتائج کی کوئی گارنٹی نہیں دیتا۔ سرچ وزیبلٹی، گاہکوں کی دلچسپی اور آرڈر کی مقدار کئی عوامل پر منحصر ہے جو ہمارے اختیار سے باہر ہیں اور مختلف ہو سکتے ہیں۔",
      "ویب سائٹ پر دکھائے گئے کسی بھی ٹریفک، وزیبلٹی یا سرچ پرفارمنس کے اعداد (بشمول کوئی نمونہ/مثال ڈیش بورڈ) صرف مثال کے طور پر ہیں، کسی مخصوص پارٹنر کے لیے نتائج کا وعدہ نہیں۔",
    ] },
    { h: "3. آرڈرنگ", body: ["گاہک لسٹڈ ریستوران یا ہوم کچن سے سیدھا فون یا واٹس ایپ پر رابطہ کر کے آرڈر کرتے ہیں۔ اس سائٹ پر کھانے کی کوئی کارٹ، چیک آؤٹ یا ادائیگی نہیں۔ قیمتیں، ڈیلیوری فیس اور اوقات ہر پارٹنر خود مقرر کرتا ہے۔"] },
    { h: "4. پارٹنر ریستوران و ہوم کچن — لسٹنگ", body: [
      "لسٹنگ پیکج لے کر آپ تصدیق کرتے ہیں کہ آپ کاروبار کے مجاز نمائندہ ہیں اور تمام معلومات (نام، مینو، قیمتیں، علاقے، ڈیلیوری فیس، رابطہ) درست و قانونی ہیں۔",
      "آرڈر پورا کرنے، کھانے کے معیار و حفاظت، محفوظ ڈیلیوری، اپنی بتائی گئی قیمتوں و ڈیلیوری فیس کی پاسداری، اور گاہک کی کسی بھی شکایت کو براہِ راست حل کرنے کے آپ خود ذمہ دار ہیں۔",
      "غلط یا خلافِ قانون لسٹنگ ہم ایڈٹ، معطل یا ہٹا سکتے ہیں۔",
    ] },
    { h: "5. لسٹنگ فیس (صرف B2B)", body: [
      "لسٹنگ پیکج ”اپنا ریستوران لسٹ کریں“ صفحے کے مطابق بل ہوتے ہیں۔ لی جانے والی فیس صرف پلیٹ فارم چلانے اور برقرار رکھنے (ہوسٹنگ، ڈیولپمنٹ، سپورٹ اور آپ کی لسٹنگ کی ایڈورٹائزنگ) کے اخراجات پورے کرنے کے لیے ہے — یہ ایک مقررہ لسٹنگ/ایڈورٹائزنگ چارج ہے، کمیشن نہیں، اور کسی گارنٹیڈ نتیجے کی ادائیگی نہیں۔ کھانے کی سیلز پر 0% کمیشن۔",
      "شاہ جی آن لائن ایک ڈیجیٹل فوڈ مارکیٹ پلیس اور B2B ریستوران ڈائریکٹری پلیٹ فارم ہے۔ ہم ریستوران/ہوم کچن مالکان کو آن لائن وزیبلٹی، ایڈورٹائزنگ اور لیڈ جنریشن فراہم کرتے ہیں۔ ہم جو ادائیگیاں وصول کرتے ہیں وہ صرف پارٹنر ریستورانوں (B2B کلائنٹس) سے ماہانہ ڈیجیٹل سلاٹ رینٹل، سبسکرپشن اور سافٹ ویئر لسٹنگ فیس ہیں۔ کوئی ریٹیل کنزیومر فوڈ ڈیلیوری یا کیش آن ڈیلیوری ادائیگی ہمارے نظام سے پروسیس نہیں ہوتی — بلنگ صرف کارپوریٹ وینڈر سبسکرپشن کے لیے ہے۔ شاہ جی آن لائن ایک IT/سروس فراہم کنندہ ہے، کھانے کا بیچنے والا نہیں۔",
    ] },
    { h: "6. پارٹنرز کے لیے ہماری سپورٹ", body: ["ہم پارٹنرز کو صحیح طریقے سے لسٹ ہونے، مینو/قیمتیں اپڈیٹ کرنے، اور اگر ہمارے پاس کوئی شکایت آئے تو اُس میں ثالثی کرنے میں معقول سپورٹ فراہم کرتے ہیں۔ یہ سپورٹ بہترین کوشش کی بنیاد پر ہے اور اس سے شاہ جی آن لائن اصل آرڈر، کھانے یا ڈیلیوری کا فریق یا ذمہ دار نہیں بنتا۔"] },
    { h: "7. مناسب استعمال", body: ["جعلی لسٹنگ، ڈیٹا اسکریپنگ یا غیر قانونی استعمال ممنوع ہے۔ خلاف ورزی پر اکاؤنٹ معطل ہو سکتا ہے۔"] },
    { h: "8. دانشورانہ املاک", body: ["شاہ جی آن لائن کا نام، لوگو اور ڈیزائن ہماری ملکیت ہیں۔ ریستوران/ہوم کچن کے نام و تصاویر اُن کی اپنی ملکیت ہیں، اجازت سے استعمال۔"] },
    { h: "9. ذمہ داری کی حد", body: ["قانون کی حد تک، لسٹنگ کے ذریعے آرڈر کیے کھانے، گاہک و پارٹنر کے لین دین، یا لسٹنگ سے کسی مخصوص تعداد میں آرڈرز/سیلز نہ آنے کے ہم ذمہ دار نہیں۔ پارٹنر کے لیے ہماری کل ذمہ داری، کسی بھی صورت میں، موجودہ مدت کی ادا شدہ فیس تک محدود ہے۔"] },
    { h: "10. لسٹنگ جمع کراتے وقت آپ کی رضامندی", body: ["جب کوئی ریستوران یا ہوم کچن پارٹنر ”اپنا ریستوران لسٹ کریں“ صفحے پر فارم جمع کراتا ہے، تو اُسے ایک چیک باکس پر نشان لگا کر تصدیق کرنی ہوتی ہے کہ اُس نے یہ شرائط و ضوابط اور ہماری پرائیویسی پالیسی مکمل پڑھ، سمجھ اور قبول کر لی ہے۔ یہ رضامندی، وقت کے ساتھ، جمع کرانے کے وقت ہمارے ریکارڈ میں محفوظ ہو جاتی ہے۔"] },
    { h: "11. قابلِ اطلاق قانون", body: ["یہ شرائط پاکستان کے قوانین کے تابع ہیں، اور اسلام آباد کی عدالتوں کو دائرہ اختیار حاصل ہوگا۔"] },
    { h: "12. رابطہ", body: [`${EMAIL}`] },
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
