// ===== Shah G Foods — legal copy (Privacy Policy & Terms) — bilingual =====
// NOTE: This is a good-faith template written for a food-delivery business in
// Pakistan. Have a qualified lawyer review it before you rely on it in production.

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

const COMPANY = "Shah G Foods";
const EMAIL = "hello@shahgfood.com";
const PHONE = "+92 51 111 000 786";
const OFFICE = "F-10/4 Markaz, Islamabad, Pakistan";
const UPDATED_EN = "Last updated: 5 July 2026";
const UPDATED_UR = "آخری اپ ڈیٹ: 5 جولائی 2026";

// ---------------- PRIVACY POLICY ----------------
const PRIVACY_EN: LegalDoc = {
  badge: "LEGAL · PRIVACY",
  title: "Privacy Policy",
  updated: UPDATED_EN,
  intro: `This Privacy Policy explains how ${COMPANY} ("we", "us", "our") collects, uses, shares and protects your personal information when you use our website, place an order, or interact with us. By using our services you agree to the practices described below.`,
  sections: [
    {
      h: "1. Information we collect",
      body: [
        "Account details you give us: your name, phone number, email address and password when you create an account.",
        "Order details: your delivery address, the items you order, delivery notes and order history.",
        "Payment details: for card payments, your card information is entered on, and processed by, a secure third-party payment provider. We do not store your full card number or CVC on our servers.",
        "Location data: with your permission, your approximate location so we can connect you to your nearest branch and estimate delivery.",
        "Technical data: device type, browser, IP address and basic usage information collected automatically to keep the site working and secure.",
      ],
    },
    {
      h: "2. How we use your information",
      body: [
        "To take, prepare, deliver and track your orders, and to show you live rider updates.",
        "To manage your account, provide customer support, and respond to your questions or complaints.",
        "To improve our menu, website, delivery and overall service.",
        "To send you order updates and, only where you have agreed, occasional offers and promotions. You can opt out of marketing messages at any time.",
        "To detect and prevent fraud, and to meet our legal and tax obligations.",
      ],
    },
    {
      h: "3. Payments",
      body: [
        "We accept Cash on Delivery and credit/debit cards (Visa, Mastercard). Card payments are handled by trusted payment processors under their own security standards. We receive confirmation of payment but not your full card details.",
      ],
    },
    {
      h: "4. Location information",
      body: [
        "We use your area or location only to find the nearest branch and to arrange delivery. You can decline location access and choose your area manually instead — the service will still work.",
      ],
    },
    {
      h: "5. Cookies and similar technologies",
      body: [
        "We use essential cookies and local storage to keep you signed in, remember your language and cart, and understand how the site is used so we can improve it. You can control cookies through your browser settings, though some features may not work without them.",
      ],
    },
    {
      h: "6. How we share information",
      body: [
        "With our branches and delivery riders, so they can prepare and deliver your order.",
        "With service providers who help us run the business (for example payment processors, hosting and messaging providers), only as needed to provide the service.",
        "Where required by law, regulation, or a valid request from a public authority.",
        "We do not sell your personal information to anyone.",
      ],
    },
    {
      h: "7. Data retention",
      body: [
        "We keep your information for as long as your account is active or as needed to provide our services, resolve disputes, and meet legal, accounting or reporting requirements. When it is no longer needed, we delete or anonymise it.",
      ],
    },
    {
      h: "8. Security",
      body: [
        "We use reasonable technical and organisational measures to protect your information. No method of transmission or storage is completely secure, but we work to safeguard your data and to limit access to those who need it.",
      ],
    },
    {
      h: "9. Your rights",
      body: [
        "You may ask us to access, correct, update or delete your personal information, and you may withdraw consent for marketing at any time. To make a request, contact us using the details below and we will respond within a reasonable time.",
      ],
    },
    {
      h: "10. Children's privacy",
      body: [
        "Our services are intended for adults. We do not knowingly collect personal information from children. If you believe a child has provided us information, please contact us and we will remove it.",
      ],
    },
    {
      h: "11. Changes to this policy",
      body: [
        "We may update this Privacy Policy from time to time. We will post the updated version here with a new date. Continued use of our services after changes means you accept the updated policy.",
      ],
    },
    {
      h: "12. Contact us",
      body: [
        `If you have any questions about this policy or your information, contact us at ${EMAIL}, call ${PHONE}, or write to us at ${OFFICE}.`,
      ],
    },
  ],
};

// ---------------- TERMS & CONDITIONS ----------------
const TERMS_EN: LegalDoc = {
  badge: "LEGAL · TERMS",
  title: "Terms & Conditions",
  updated: UPDATED_EN,
  intro: `These Terms & Conditions govern your use of the ${COMPANY} website and your orders with us. By using our website or placing an order, you agree to these terms. Please read them carefully.`,
  sections: [
    {
      h: "1. Acceptance of terms",
      body: [
        "By accessing our website, creating an account or placing an order, you confirm that you accept these terms and our Privacy Policy. If you do not agree, please do not use our services.",
      ],
    },
    {
      h: "2. Eligibility",
      body: [
        "You must be at least 18 years old, or have the consent of a parent or guardian, and be able to enter into a binding contract, to place an order. You agree to provide accurate and complete information.",
      ],
    },
    {
      h: "3. Your account",
      body: [
        "You are responsible for keeping your account details and password secure, and for all activity that happens under your account. Please notify us immediately if you suspect any unauthorised use.",
      ],
    },
    {
      h: "4. Orders",
      body: [
        "When you place an order it is an offer to buy. An order is confirmed once we accept it. We may decline or cancel an order — for example if an item is unavailable, the delivery address is outside our area, or we suspect fraud — and where you have already paid, we will refund you.",
        "Menu items, availability and images are indicative and may vary between branches.",
      ],
    },
    {
      h: "5. Prices and payment",
      body: [
        "All prices are in Pakistani Rupees (PKR). Applicable taxes, including GST, are shown at checkout. A delivery fee of Rs. 99 applies and delivery is free on orders of Rs. 1,500 or more, unless stated otherwise.",
        "You can pay by Cash on Delivery or by credit/debit card. Prices and offers may change at any time before you place an order.",
      ],
    },
    {
      h: "6. Delivery",
      body: [
        "We deliver within our service areas in Islamabad and Rawalpindi. Delivery times (typically 30–40 minutes) are estimates and are not guaranteed, as they depend on distance, weather, traffic and demand.",
        "Please make sure your address and phone number are correct and that someone is available to receive the order. We are not responsible for delays or failed deliveries caused by incorrect details or no one being available.",
      ],
    },
    {
      h: "7. Cancellations and refunds",
      body: [
        "You may cancel an order before the kitchen begins preparing it. Once preparation has started, an order generally cannot be cancelled.",
        "If something is wrong with your order — for example it is incorrect, incomplete or of poor quality — please contact us promptly with your Order ID and we will make it right through a replacement or a refund. Refunds are made using your original payment method or as store credit, where applicable.",
      ],
    },
    {
      h: "8. Food quality and allergens",
      body: [
        "Our food is prepared fresh and is best enjoyed soon after delivery. Our dishes may contain or come into contact with common allergens such as dairy, gluten, nuts, eggs and soy. If you have an allergy or dietary requirement, please contact the branch before ordering.",
      ],
    },
    {
      h: "9. Promotions and offers",
      body: [
        "Promotions, discounts and vouchers may be subject to additional terms, minimum order values and expiry dates. We may change or withdraw an offer at any time. Offers cannot be exchanged for cash and may not be combined unless stated.",
      ],
    },
    {
      h: "10. Intellectual property",
      body: [
        `All content on this website — including the ${COMPANY} name, logo, text, images and design — is owned by or licensed to us and is protected by law. You may not copy, reproduce or use it without our written permission.`,
      ],
    },
    {
      h: "11. Acceptable use",
      body: [
        "You agree not to misuse the website, place fraudulent or fake orders, interfere with its operation, or use it for any unlawful purpose. We may suspend or close accounts that break these terms.",
      ],
    },
    {
      h: "12. Limitation of liability",
      body: [
        "To the extent permitted by law, we are not liable for indirect or consequential losses. Our total liability for any order is limited to the amount you paid for that order. Nothing in these terms limits liability that cannot be limited by law.",
      ],
    },
    {
      h: "13. Governing law",
      body: [
        "These terms are governed by the laws of Pakistan, and the courts of Islamabad shall have jurisdiction over any dispute arising from them.",
      ],
    },
    {
      h: "14. Changes to these terms",
      body: [
        "We may update these terms from time to time. The current version will always be posted here. Continued use of our services after changes means you accept the updated terms.",
      ],
    },
    {
      h: "15. Contact us",
      body: [
        `For any questions about these terms, contact us at ${EMAIL}, call ${PHONE}, or write to us at ${OFFICE}.`,
      ],
    },
  ],
};

// ---------------- URDU ----------------
const PRIVACY_UR: LegalDoc = {
  badge: "قانونی · پرائیویسی",
  title: "پرائیویسی پالیسی",
  updated: UPDATED_UR,
  intro: "یہ پرائیویسی پالیسی بیان کرتی ہے کہ شاہ جی فوڈز آپ کی ذاتی معلومات کیسے جمع، استعمال، شیئر اور محفوظ کرتا ہے جب آپ ہماری ویب سائٹ استعمال کرتے ہیں، آرڈر دیتے ہیں یا ہم سے رابطہ کرتے ہیں۔ ہماری خدمات استعمال کرنے سے آپ ذیل میں بیان کردہ طریقوں سے اتفاق کرتے ہیں۔",
  sections: [
    {
      h: "1. ہم کون سی معلومات جمع کرتے ہیں",
      body: [
        "اکاؤنٹ کی تفصیلات: اکاؤنٹ بناتے وقت آپ کا نام، فون نمبر، ای میل اور پاس ورڈ۔",
        "آرڈر کی تفصیلات: آپ کا ڈیلیوری پتہ، آرڈر کی اشیاء، ڈیلیوری نوٹس اور آرڈر ہسٹری۔",
        "ادائیگی کی تفصیلات: کارڈ کی ادائیگی محفوظ تھرڈ پارٹی پیمنٹ فراہم کنندہ کے ذریعے ہوتی ہے۔ ہم آپ کا مکمل کارڈ نمبر یا CVC اپنے سرور پر محفوظ نہیں کرتے۔",
        "لوکیشن: آپ کی اجازت سے آپ کی تقریبی لوکیشن تاکہ ہم آپ کو قریب ترین شاخ سے جوڑ سکیں اور ڈیلیوری کا اندازہ لگا سکیں۔",
        "تکنیکی معلومات: ڈیوائس، براؤزر، IP ایڈریس اور بنیادی استعمال کی معلومات جو خودکار طور پر جمع ہوتی ہیں۔",
      ],
    },
    {
      h: "2. ہم آپ کی معلومات کیسے استعمال کرتے ہیں",
      body: [
        "آپ کے آرڈر لینے، تیار کرنے، پہنچانے اور لائیو ٹریکنگ فراہم کرنے کے لیے۔",
        "آپ کا اکاؤنٹ چلانے، کسٹمر سپورٹ دینے اور آپ کے سوالات یا شکایات کا جواب دینے کے لیے۔",
        "اپنے مینو، ویب سائٹ اور مجموعی سروس کو بہتر بنانے کے لیے۔",
        "آرڈر اپ ڈیٹس بھیجنے کے لیے، اور صرف آپ کی رضامندی سے کبھی کبھار پیشکشیں بھیجنے کے لیے۔ آپ کسی بھی وقت مارکیٹنگ پیغامات سے آپٹ آؤٹ کر سکتے ہیں۔",
        "دھوکہ دہی کی روک تھام اور اپنی قانونی و ٹیکس ذمہ داریاں پوری کرنے کے لیے۔",
      ],
    },
    {
      h: "3. ادائیگیاں",
      body: [
        "ہم کیش آن ڈیلیوری اور کریڈٹ/ڈیبٹ کارڈ (ویزا، ماسٹر کارڈ) قبول کرتے ہیں۔ کارڈ کی ادائیگیاں معتبر پیمنٹ پروسیسرز کے اپنے سیکیورٹی معیارات کے تحت ہوتی ہیں۔ ہمیں ادائیگی کی تصدیق ملتی ہے، آپ کے مکمل کارڈ کی تفصیلات نہیں۔",
      ],
    },
    {
      h: "4. لوکیشن کی معلومات",
      body: [
        "ہم آپ کی لوکیشن صرف قریب ترین شاخ تلاش کرنے اور ڈیلیوری کے انتظام کے لیے استعمال کرتے ہیں۔ آپ لوکیشن سے انکار کر کے خود اپنا علاقہ منتخب کر سکتے ہیں — سروس پھر بھی کام کرے گی۔",
      ],
    },
    {
      h: "5. کوکیز اور متعلقہ ٹیکنالوجیز",
      body: [
        "ہم ضروری کوکیز اور لوکل اسٹوریج استعمال کرتے ہیں تاکہ آپ سائن اِن رہیں، آپ کی زبان اور ٹوکری یاد رہے، اور سائٹ کے استعمال کو سمجھ کر اسے بہتر بنایا جا سکے۔ آپ اپنے براؤزر سے کوکیز کنٹرول کر سکتے ہیں، مگر کچھ فیچرز کام نہ کریں۔",
      ],
    },
    {
      h: "6. ہم معلومات کیسے شیئر کرتے ہیں",
      body: [
        "اپنی شاخوں اور ڈیلیوری رائیڈرز کے ساتھ تاکہ آپ کا آرڈر تیار اور ڈیلیور ہو سکے۔",
        "ان سروس فراہم کنندگان کے ساتھ جو ہماری مدد کرتے ہیں (مثلاً پیمنٹ، ہوسٹنگ) — صرف ضرورت کے مطابق۔",
        "جہاں قانون، ضابطے یا کسی مجاز ادارے کی جائز درخواست پر لازم ہو۔",
        "ہم آپ کی ذاتی معلومات کسی کو فروخت نہیں کرتے۔",
      ],
    },
    {
      h: "7. معلومات کی مدت",
      body: [
        "ہم آپ کی معلومات اُس وقت تک رکھتے ہیں جب تک آپ کا اکاؤنٹ فعال ہے یا خدمات، تنازعات کے حل اور قانونی تقاضوں کے لیے ضروری ہے۔ ضرورت ختم ہونے پر ہم اسے حذف یا غیر شناختی بنا دیتے ہیں۔",
      ],
    },
    {
      h: "8. سیکیورٹی",
      body: [
        "ہم آپ کی معلومات کے تحفظ کے لیے مناسب تکنیکی اور انتظامی اقدامات کرتے ہیں۔ کوئی بھی طریقہ مکمل طور پر محفوظ نہیں، مگر ہم آپ کے ڈیٹا کی حفاظت اور رسائی محدود رکھنے کی کوشش کرتے ہیں۔",
      ],
    },
    {
      h: "9. آپ کے حقوق",
      body: [
        "آپ اپنی معلومات دیکھنے، درست کرانے، اپ ڈیٹ یا حذف کرانے کی درخواست کر سکتے ہیں، اور کسی بھی وقت مارکیٹنگ کی رضامندی واپس لے سکتے ہیں۔ درخواست کے لیے نیچے دی گئی تفصیلات پر رابطہ کریں۔",
      ],
    },
    {
      h: "10. بچوں کی پرائیویسی",
      body: [
        "ہماری خدمات بالغ افراد کے لیے ہیں۔ ہم جان بوجھ کر بچوں سے معلومات جمع نہیں کرتے۔ اگر آپ کو لگے کہ کسی بچے نے معلومات دی ہیں تو ہم سے رابطہ کریں، ہم اسے ہٹا دیں گے۔",
      ],
    },
    {
      h: "11. اس پالیسی میں تبدیلیاں",
      body: [
        "ہم وقتاً فوقتاً یہ پالیسی اپ ڈیٹ کر سکتے ہیں۔ نئی تاریخ کے ساتھ اپ ڈیٹ شدہ نسخہ یہیں شائع کیا جائے گا۔ تبدیلی کے بعد خدمات کا استعمال جاری رکھنا اتفاق سمجھا جائے گا۔",
      ],
    },
    {
      h: "12. رابطہ کریں",
      body: [
        `اس پالیسی یا اپنی معلومات سے متعلق سوالات کے لیے ${EMAIL} پر ای میل کریں، ${PHONE} پر کال کریں، یا ${OFFICE} پر لکھیں۔`,
      ],
    },
  ],
};

const TERMS_UR: LegalDoc = {
  badge: "قانونی · شرائط",
  title: "شرائط و ضوابط",
  updated: UPDATED_UR,
  intro: "یہ شرائط و ضوابط شاہ جی فوڈز کی ویب سائٹ کے استعمال اور آپ کے آرڈرز پر لاگو ہوتی ہیں۔ ویب سائٹ استعمال کرنے یا آرڈر دینے سے آپ ان شرائط سے اتفاق کرتے ہیں۔ براہ کرم انہیں غور سے پڑھیں۔",
  sections: [
    {
      h: "1. شرائط کی قبولیت",
      body: [
        "ہماری ویب سائٹ تک رسائی، اکاؤنٹ بنانے یا آرڈر دینے سے آپ ان شرائط اور ہماری پرائیویسی پالیسی سے اتفاق کرتے ہیں۔ اگر آپ متفق نہیں تو براہ کرم خدمات استعمال نہ کریں۔",
      ],
    },
    {
      h: "2. اہلیت",
      body: [
        "آرڈر دینے کے لیے آپ کی عمر کم از کم 18 سال ہونی چاہیے، یا والدین/سرپرست کی اجازت ہو، اور آپ درست و مکمل معلومات فراہم کرنے کے پابند ہیں۔",
      ],
    },
    {
      h: "3. آپ کا اکاؤنٹ",
      body: [
        "اپنے اکاؤنٹ اور پاس ورڈ کی حفاظت اور اکاؤنٹ کے تحت ہونے والی تمام سرگرمی کے آپ ذمہ دار ہیں۔ کسی بھی غیر مجاز استعمال کا شبہ ہو تو فوراً ہمیں مطلع کریں۔",
      ],
    },
    {
      h: "4. آرڈرز",
      body: [
        "آرڈر دینا خریداری کی پیشکش ہے۔ آرڈر ہماری قبولیت پر مکمل ہوتا ہے۔ ہم آرڈر مسترد یا منسوخ کر سکتے ہیں (مثلاً کوئی چیز دستیاب نہ ہو، پتہ ہمارے علاقے سے باہر ہو، یا دھوکہ دہی کا شبہ ہو)، اور ادائیگی کی صورت میں رقم واپس کر دی جائے گی۔",
        "مینو کی اشیاء، دستیابی اور تصاویر تخمینی ہیں اور شاخوں میں فرق ہو سکتا ہے۔",
      ],
    },
    {
      h: "5. قیمتیں اور ادائیگی",
      body: [
        "تمام قیمتیں پاکستانی روپے میں ہیں۔ قابلِ اطلاق ٹیکس بشمول جی ایس ٹی چیک آؤٹ پر ظاہر ہوتے ہیں۔ 99 روپے ڈیلیوری فیس لاگو ہے اور 1,500 روپے یا اس سے زائد کے آرڈر پر ڈیلیوری مفت ہے، جب تک الگ نہ بتایا جائے۔",
        "آپ کیش آن ڈیلیوری یا کارڈ سے ادائیگی کر سکتے ہیں۔ آرڈر دینے سے پہلے قیمتیں اور پیشکشیں تبدیل ہو سکتی ہیں۔",
      ],
    },
    {
      h: "6. ڈیلیوری",
      body: [
        "ہم اسلام آباد اور راولپنڈی کے اپنے سروس ایریاز میں ڈیلیور کرتے ہیں۔ ڈیلیوری کا وقت (عموماً 30–40 منٹ) تخمینی ہے اور فاصلے، موسم، ٹریفک اور رش پر منحصر ہے، اس کی ضمانت نہیں۔",
        "براہ کرم اپنا پتہ اور فون نمبر درست رکھیں اور کوئی وصول کنندہ موجود ہو۔ غلط تفصیلات یا کسی کی عدم موجودگی سے ہونے والی تاخیر کے ہم ذمہ دار نہیں۔",
      ],
    },
    {
      h: "7. منسوخی اور رقم کی واپسی",
      body: [
        "کچن کے تیاری شروع کرنے سے پہلے آپ آرڈر منسوخ کر سکتے ہیں۔ تیاری شروع ہونے کے بعد عموماً آرڈر منسوخ نہیں ہو سکتا۔",
        "اگر آرڈر میں کوئی مسئلہ ہو (غلط، نامکمل یا ناقص) تو اپنے آرڈر آئی ڈی کے ساتھ فوراً رابطہ کریں؛ ہم متبادل یا رقم کی واپسی کے ذریعے اسے درست کریں گے۔ رقم اصل طریقۂ ادائیگی یا اسٹور کریڈٹ میں واپس ہوگی۔",
      ],
    },
    {
      h: "8. کھانے کا معیار اور الرجینز",
      body: [
        "ہمارا کھانا تازہ تیار ہوتا ہے اور ڈیلیوری کے فوراً بعد بہترین ہوتا ہے۔ ہمارے کھانوں میں دودھ، گلوٹن، گری دار میوے، انڈے اور سویا جیسے عام الرجینز ہو سکتے ہیں۔ الرجی یا خوراکی تقاضے کی صورت میں آرڈر سے پہلے شاخ سے رابطہ کریں۔",
      ],
    },
    {
      h: "9. پیشکشیں اور آفرز",
      body: [
        "پیشکشوں، رعایتوں اور واؤچرز پر اضافی شرائط، کم از کم آرڈر اور میعاد لاگو ہو سکتی ہے۔ ہم کسی بھی وقت آفر تبدیل یا واپس لے سکتے ہیں۔ آفرز نقد میں تبدیل نہیں ہو سکتیں اور بتائے بغیر یکجا نہیں کی جا سکتیں۔",
      ],
    },
    {
      h: "10. دانشورانہ املاک",
      body: [
        "اس ویب سائٹ کا تمام مواد — بشمول شاہ جی فوڈز کا نام، لوگو، متن، تصاویر اور ڈیزائن — ہماری ملکیت یا لائسنس یافتہ اور قانون سے محفوظ ہے۔ ہماری تحریری اجازت کے بغیر اسے نقل یا استعمال نہ کریں۔",
      ],
    },
    {
      h: "11. مناسب استعمال",
      body: [
        "آپ ویب سائٹ کے غلط استعمال، جعلی آرڈرز، اس کے کام میں مداخلت یا کسی غیر قانونی مقصد سے استعمال نہ کرنے پر متفق ہیں۔ ان شرائط کی خلاف ورزی پر ہم اکاؤنٹ معطل یا بند کر سکتے ہیں۔",
      ],
    },
    {
      h: "12. ذمہ داری کی حد",
      body: [
        "قانون کی اجازت کی حد تک، ہم بالواسطہ یا ثانوی نقصانات کے ذمہ دار نہیں۔ کسی بھی آرڈر کے لیے ہماری کل ذمہ داری اُس آرڈر کی ادا کردہ رقم تک محدود ہے۔ ان شرائط میں کوئی چیز اُس ذمہ داری کو محدود نہیں کرتی جسے قانوناً محدود نہیں کیا جا سکتا۔",
      ],
    },
    {
      h: "13. قابلِ اطلاق قانون",
      body: [
        "یہ شرائط پاکستان کے قوانین کے تابع ہیں، اور ان سے پیدا ہونے والے کسی تنازع پر اسلام آباد کی عدالتوں کو دائرہ اختیار حاصل ہوگا۔",
      ],
    },
    {
      h: "14. شرائط میں تبدیلیاں",
      body: [
        "ہم وقتاً فوقتاً یہ شرائط اپ ڈیٹ کر سکتے ہیں۔ موجودہ نسخہ ہمیشہ یہیں دستیاب ہوگا۔ تبدیلی کے بعد خدمات کا استعمال جاری رکھنا اتفاق سمجھا جائے گا۔",
      ],
    },
    {
      h: "15. رابطہ کریں",
      body: [
        `ان شرائط سے متعلق سوالات کے لیے ${EMAIL} پر ای میل کریں، ${PHONE} پر کال کریں، یا ${OFFICE} پر لکھیں۔`,
      ],
    },
  ],
};

export const PRIVACY: Record<Lang, LegalDoc> = { en: PRIVACY_EN, ur: PRIVACY_UR };
export const TERMS: Record<Lang, LegalDoc> = { en: TERMS_EN, ur: TERMS_UR };
