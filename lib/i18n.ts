// ===== Shah G Foods — bilingual copy (English / Urdu) =====

export type Lang = "en" | "ur";

export interface Translation {
  home: string; menu: string; branches: string; about: string; deliverTo: string; login: string; cart: string; add: string; searchPh: string;
  badge: string; heroTitle: string; heroTagline: string; heroDesc: string;
  orderNow: string; findBranch: string; featBadge: string; sigSub: string; browseCat: string; mostLoved: string; seeFullMenu: string; dishesWord: string;
  menuTitle: string; menuSub: string; brTitle: string; brDesc: string;
  mapTitle: string; selectedLabel: string; openNow: string; hoursText: string;
  aboutH: string; aboutStory: string;
  statBranches: string; statDishes: string; statCities: string; knownFor: string;
  c1t: string; c1d: string; c2t: string; c2d: string; c3t: string; c3d: string; seeMenu: string;
  cartTitle: string; emptyTitle: string; emptyDesc: string; browseMenu: string; subtotal: string; delivery: string; gst: string; total: string; free: string; placeOrder: string;
  fullName: string; phoneLbl: string; passwordLbl: string; haveAccount: string; newHere: string; loginLink: string; createLink: string; createAccount: string; loginTitle: string;
  orderPlaced: string; orderDescA: string; orderDescB: string; backHome: string;
  footTag: string; footCompany: string; footHelp: string; footFollow: string; footCompanyLinks: string[]; footHelpLinks: string[];
  checkout: string; stepAddress: string; stepPayment: string; stepTrack: string; deliveryDetails: string;
  lblName: string; lblPhone: string; lblAddress: string; lblCity: string; lblNotes: string;
  phName: string; phPhone: string; phAddress: string; phNotes: string;
  continuePay: string; backAddress: string; payMethod: string; cod: string; codDesc: string; card: string; cardDesc: string;
  lblCardNum: string; lblExp: string; lblCvc: string; orderSummary: string; etaLabel: string; etaVal: string; placeOrderBtn: string;
  orderConfirmed: string; orderId: string; trackTitle: string; arriving: string;
  st0: string; st0d: string; st1: string; st1d: string; st2: string; st2d: string; st3: string; st3d: string;
  rider: string; riderName: string; vehicle: string; call: string; orderAgain: string;
  tagBest: string; tagPop: string;
  reviewsBadge: string; reviewsTitle: string; reviewsSub: string; onGoogle: string; homeFaqTitle: string; homeFaqSub: string;
}

export const EN: Translation = {
  home: "Home", menu: "Menu", branches: "Branches", about: "About", deliverTo: "DELIVER TO", login: "Log in", cart: "Dastarkhwan", add: "Add +", searchPh: "Search dishes…",
  badge: "SHAH G ONLINE · FOOD MARKETPLACE", heroTitle: "Shah G Online — Pakistan's Premium Food Hub", heroTagline: "Where it all began.",
  heroDesc: "Order directly from Pakistan's finest kitchens and desi food masters — legendary Daal Chawal, karahi, biryani, BBQ and so much more.",
  orderNow: "Order now →", findBranch: "Find a branch", featBadge: "THE LEGEND", sigSub: "The dish that started it all — legendary, budget-friendly lentils served over fluffy rice. Loved at every branch.", browseCat: "Browse by category", mostLoved: "Most loved 🔥", seeFullMenu: "See full menu →", dishesWord: "dishes",
  menuTitle: "Order Now", menuSub: "Full menu · 92 dishes", brTitle: "Our Branches", brDesc: "35+ branches across Islamabad & Rawalpindi. Pick your nearest one.",
  mapTitle: "Branch locations", selectedLabel: "DELIVERING FROM", openNow: "Open now", hoursText: "8:00 AM – 2:00 AM",
  aboutH: "From one plate of Daal Chawal to 35+ branches.",
  aboutStory: "Shah G Foods is a much-loved desi restaurant serving traditional, comforting Pakistani street food and mainland subcontinental classics. The dish that started it all is our legendary, budget-friendly Daal Chawal — lentils served over fluffy rice — still a favourite across every branch.",
  statBranches: "Branches", statDishes: "Dishes", statCities: "Cities", knownFor: "What we're known for",
  c1t: "Desi curries & rice", c1d: "Daal Chawal, Bannu Pulao, Biryani, Karahi & Handi.", c2t: "Charcoal BBQ", c2d: "Tikka, seekh kebab, malai boti & fresh tandoori naan.", c3t: "Chai & lassi", c3d: "Sweet & salty lassi, milkshakes and proper desi chai.", seeMenu: "See the menu →",
  cartTitle: "Your Dastarkhwan", emptyTitle: "Your dastarkhwan is empty", emptyDesc: "Add some daal chawal, karahi or a paratha roll — let's fill it up!", browseMenu: "Browse menu", subtotal: "Subtotal", delivery: "Delivery", gst: "GST (5%)", total: "Total", free: "Free", placeOrder: "Place order · ",
  fullName: "FULL NAME", phoneLbl: "PHONE NUMBER", passwordLbl: "PASSWORD", haveAccount: "Already have an account?", newHere: "New here?", loginLink: "Log in", createLink: "Create account", createAccount: "Create account", loginTitle: "Log in",
  orderPlaced: "Order placed!", orderDescA: "Your food from ", orderDescB: " is being prepared. Estimated delivery in 30–40 mins.", backHome: "Back to home",
  footTag: "Pakistan's food marketplace — order from the best local kitchens, or list your own.", footCompany: "Company", footHelp: "Help", footFollow: "Follow", footCompanyLinks: ["About us", "Branches", "Careers"], footHelpLinks: ["Contact", "Order tracking", "FAQs"],
  checkout: "Checkout", stepAddress: "Address", stepPayment: "Payment", stepTrack: "Track", deliveryDetails: "Delivery details",
  lblName: "Full name", lblPhone: "Phone number", lblAddress: "Complete address", lblCity: "City", lblNotes: "Delivery notes (optional)",
  phName: "e.g. Ali Khan", phPhone: "03XX XXXXXXX", phAddress: "House #, street, sector / area", phNotes: "Ring the bell, call on arrival…",
  continuePay: "Continue to payment", backAddress: "← Back", payMethod: "Payment method", cod: "Cash on Delivery", codDesc: "Pay with cash when it arrives", card: "Credit / Debit Card", cardDesc: "Visa, Mastercard",
  lblCardNum: "Card number", lblExp: "Expiry", lblCvc: "CVC", orderSummary: "Order summary", etaLabel: "Estimated delivery", etaVal: "30–40 min", placeOrderBtn: "Place order · ",
  orderConfirmed: "Order confirmed!", orderId: "Order ID", trackTitle: "Track your order", arriving: "Arriving in",
  st0: "Order received", st0d: "We've got your order", st1: "Preparing your food", st1d: "The kitchen is on it", st2: "Out for delivery", st2d: "Your rider is on the way", st3: "Delivered", st3d: "Enjoy your meal!",
  rider: "Your rider", riderName: "Bilal Ahmed", vehicle: "Bike · RIQ-4521", call: "Call", orderAgain: "Order again",
  tagBest: "Bestseller", tagPop: "Popular",
  reviewsBadge: "15,000+ VERIFIED REVIEWS", reviewsTitle: "Loved across every branch", reviewsSub: "15,000+ verified reviews across our 35+ branches in Islamabad & Rawalpindi. Here's what people keep coming back for.", onGoogle: "on Google", homeFaqTitle: "Frequently asked questions", homeFaqSub: "Quick answers before you order.",
};

export const UR: Translation = {
  home: "ہوم", menu: "مینو", branches: "شاخیں", about: "تعارف", deliverTo: "ڈیلیوری", login: "لاگ ان", cart: "دسترخوان", add: "شامل کریں", searchPh: "کھانے تلاش کریں…",
  badge: "شاہ جی آن لائن · فوڈ مارکیٹ پلیس", heroTitle: "شاہ جی آن لائن — پاکستان کا پریمیم فوڈ حب", heroTagline: "جہاں سے سب شروع ہوا۔",
  heroDesc: "پاکستان کے بہترین کچن اور دیسی فوڈ ماہرین سے براہِ راست آرڈر کریں — دال چاول، کڑاہی، بریانی، باربی کیو اور بہت کچھ۔",
  orderNow: "ابھی آرڈر کریں ←", findBranch: "شاخ تلاش کریں", featBadge: "مشہورِ زمانہ", sigSub: "وہ ڈش جہاں سے سب شروع ہوا — مشہور اور کم قیمت، نرم چاول پر دال۔ ہر شاخ پر پسندیدہ۔", browseCat: "زمرہ منتخب کریں", mostLoved: "سب سے پسندیدہ 🔥", seeFullMenu: "مکمل مینو دیکھیں ←", dishesWord: "ڈشز",
  menuTitle: "ابھی آرڈر کریں", menuSub: "مکمل مینو · 92 ڈشز", brTitle: "ہماری شاخیں", brDesc: "اسلام آباد اور راولپنڈی میں 35+ شاخیں۔ اپنی قریب ترین شاخ منتخب کریں۔",
  mapTitle: "شاخوں کے مقامات", selectedLabel: "ڈیلیوری یہاں سے", openNow: "ابھی کھلا ہے", hoursText: "صبح 8 – رات 2",
  aboutH: "دال چاول کی ایک پلیٹ سے 35+ شاخوں تک۔",
  aboutStory: "شاہ جی فوڈز ایک مقبول دیسی ریستوران ہے جو روایتی اور دل کو بھانے والا پاکستانی اسٹریٹ فوڈ اور برصغیر کے کلاسک کھانے پیش کرتا ہے۔ جہاں سے سب شروع ہوا وہ ہماری مشہور اور کم قیمت دال چاول ہے — نرم چاول پر دال — جو آج بھی ہر شاخ پر سب سے پسندیدہ ہے۔",
  statBranches: "شاخیں", statDishes: "ڈشز", statCities: "شہر", knownFor: "ہماری پہچان",
  c1t: "دیسی سالن اور چاول", c1d: "دال چاول، بنوں پلاؤ، بریانی، کڑاہی اور ہانڈی۔", c2t: "کوئلوں کا باربی کیو", c2d: "تکہ، سیخ کباب، ملائی بوٹی اور تازہ تندوری نان۔", c3t: "چائے اور لسی", c3d: "میٹھی و نمکین لسی، ملک شیک اور اصل دیسی چائے۔", seeMenu: "مینو دیکھیں ←",
  cartTitle: "آپ کا دسترخوان", emptyTitle: "آپ کا دسترخوان ابھی خالی ہے", emptyDesc: "دال چاول، کڑاہی یا پراٹھا رول شامل کریں — چلیں دسترخوان سجائیں!", browseMenu: "مینو دیکھیں", subtotal: "ذیلی رقم", delivery: "ڈیلیوری", gst: "جی ایس ٹی (5%)", total: "کل رقم", free: "مفت", placeOrder: "آرڈر کریں · ",
  fullName: "پورا نام", phoneLbl: "فون نمبر", passwordLbl: "پاس ورڈ", haveAccount: "پہلے سے اکاؤنٹ ہے؟", newHere: "نئے ہیں؟", loginLink: "لاگ ان", createLink: "اکاؤنٹ بنائیں", createAccount: "اکاؤنٹ بنائیں", loginTitle: "لاگ ان",
  orderPlaced: "آرڈر موصول ہو گیا!", orderDescA: "", orderDescB: " سے آپ کا کھانا تیار ہو رہا ہے۔ متوقع ڈیلیوری 30–40 منٹ میں۔", backHome: "ہوم پر واپس",
  footTag: "پاکستان کا فوڈ مارکیٹ پلیس — بہترین مقامی کچن سے آرڈر کریں یا اپنا ریستوران لسٹ کریں۔", footCompany: "کمپنی", footHelp: "مدد", footFollow: "فالو کریں", footCompanyLinks: ["ہمارے بارے میں", "شاخیں", "کیریئر"], footHelpLinks: ["رابطہ", "آرڈر ٹریکنگ", "سوالات"],
  checkout: "چیک آؤٹ", stepAddress: "پتہ", stepPayment: "ادائیگی", stepTrack: "ٹریک", deliveryDetails: "ڈیلیوری کی تفصیلات",
  lblName: "پورا نام", lblPhone: "فون نمبر", lblAddress: "مکمل پتہ", lblCity: "شہر", lblNotes: "ڈیلیوری نوٹس (اختیاری)",
  phName: "مثلاً علی خان", phPhone: "03XX XXXXXXX", phAddress: "مکان نمبر، گلی، سیکٹر / علاقہ", phNotes: "گھنٹی بجائیں، پہنچ کر کال کریں…",
  continuePay: "ادائیگی کی طرف بڑھیں", backAddress: "← واپس", payMethod: "ادائیگی کا طریقہ", cod: "کیش آن ڈیلیوری", codDesc: "ڈیلیوری پر نقد ادائیگی", card: "کریڈٹ / ڈیبٹ کارڈ", cardDesc: "ویزا، ماسٹر کارڈ",
  lblCardNum: "کارڈ نمبر", lblExp: "میعاد", lblCvc: "سی وی سی", orderSummary: "آرڈر کا خلاصہ", etaLabel: "متوقع ڈیلیوری", etaVal: "30–40 منٹ", placeOrderBtn: "آرڈر کریں · ",
  orderConfirmed: "آرڈر کنفرم ہو گیا!", orderId: "آرڈر آئی ڈی", trackTitle: "اپنا آرڈر ٹریک کریں", arriving: "پہنچنے میں",
  st0: "آرڈر موصول ہوا", st0d: "ہمیں آپ کا آرڈر مل گیا", st1: "کھانا تیار ہو رہا ہے", st1d: "کچن میں کام جاری ہے", st2: "ڈیلیوری کے لیے روانہ", st2d: "رائیڈر راستے میں ہے", st3: "ڈیلیور ہو گیا", st3d: "کھانے سے لطف اٹھائیں!",
  rider: "آپ کا رائیڈر", riderName: "بلال احمد", vehicle: "بائیک · RIQ-4521", call: "کال کریں", orderAgain: "دوبارہ آرڈر کریں",
  tagBest: "بیسٹ سیلر", tagPop: "مقبول",
  reviewsBadge: "15,000+ تصدیق شدہ ریویوز", reviewsTitle: "ہر شاخ پر پسند کیا گیا", reviewsSub: "اسلام آباد اور راولپنڈی کی 35+ شاخوں پر 15,000+ تصدیق شدہ ریویوز۔ دیکھیں لوگ بار بار کیوں آتے ہیں۔", onGoogle: "گوگل پر", homeFaqTitle: "اکثر پوچھے گئے سوالات", homeFaqSub: "آرڈر سے پہلے چند فوری جوابات۔",
};

export const DICT: Record<Lang, Translation> = { en: EN, ur: UR };
