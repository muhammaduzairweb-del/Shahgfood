// ===== Shah G Foods — core data (menu, categories, branches) =====

// Brand logo (transparent PNG, gold food-art wordmark). Used standalone everywhere.
export const LOGO = "/Shahglogo.png";
// Shared filter so the gold wordmark reads clearly on both dark and light backgrounds.
export const LOGO_FILTER = "brightness(1.15) contrast(1.05) drop-shadow(0 2px 6px rgba(0,0,0,.45))";

export type CategoryKey = "rice" | "bbq" | "fast" | "chaat" | "drinks";

export interface Dish {
  id: number;
  name: string;
  urdu: string;
  cat: CategoryKey;
  price: number;
  desc: string;
  du: string; // urdu description
  p: boolean; // popular / featured
  img?: string; // real photo URL (filled in later); falls back to gradient tile
}

// ===== Dish photos =====
// Paste image URLs here, keyed by dish id. Any dish without an entry falls back
// to the coloured gradient tile automatically. Example:
//   1: "https://.../daal-chawal.jpg",
export const DISH_IMAGES: Record<number, string> = {
  1: "/Daal Chawel.jpg",
  2: "/Chana Chawel.jpg",
  3: "/Banu Beef Pulao.jpg",
  4: "/chicken Biryani.jpg",
  5: "/Chicken Achari Handi.jpg",
  6: "/White Handi.jpg",
  7: "/Mutton Handi.jpg",
  8: "/Beef Karahi.jpg",
  9: "/Mutton Karahi.jpg",
  10: "/Daal Fry.jpg",
  11: "/Chana Masala.jpg",
  12: "/Qeema.jpg",
  13: "/Aloo Palak.jpg",
  14: "/Mix Vegetable.jpg",
  15: "/Anda Chana.jpg",
  16: "/Chicken Tikka (Leg).jpg",
  17: "/Chicken Tikka (Chest).jpg",
  18: "/Seekh Kebab.jpg",
  19: "/Malai Boti.jpg",
  20: "/Chicken Malai Tikka.jpg",
  21: "/Reshmi Kebab.jpg",
  22: "/Chicken Wings.jpg",
  23: "/Tandoori Naan.jpg",
  24: "/Roti.jpg",
  25: "/Garlic Naan.jpg",
  26: "/Chicken Paratha Roll.jpg",
  27: "/Beef Paratha Roll.jpg",
  28: "/Zinger Burger.jpg",
  29: "/Zinger Cheese Burger.jpg",
  30: "/Egg Shami Cheese Burger.jpg",
  31: "/Afghani Burger.jpg",
  32: "/Chicken Cheese Roll.jpg",
  33: "/Chicken Shawarma.jpg",
  34: "/Loaded Fries.jpg",
  35: "/Chicken Nuggets.jpg",
  36: "/Club Sandwich.jpg",
  37: "/Dahi Bhallay.jpg",
  38: "/Samosa Chaat.jpg",
  39: "/Mix Chaat.jpg",
  40: "/Papri Chaat.jpg",
  41: "/Chana Chaat.jpg",
  42: "/Fruit Chaat.jpg",
  43: "/Sweet Lassi.jpg",
  44: "/Salty Lassi.jpg",
  45: "/Mango Milkshake.jpg",
  46: "/Chocolate Milkshake.jpg",
  47: "/Desi Chai.jpg",
  48: "/Kashmiri Chai.jpg",
  49: "/Kheer.jpg",
  50: "/Hot Gulab Jamun.jpg",
  51: "/Freash Lime.jpg",
  52: "/Mint Margarita.jpg",
  53: "/Soft Drink.jpg",
  54: "/Water Bottle.jpg",
};

// ===== Editable site image slots =====
// Paste image URLs when ready. Empty string shows a styled placeholder that
// tells you the exact aspect ratio to use.
//   homeHero / aboutHero  → 16:9  (recommended 1600×900 or larger)
//   aboutStory1/2/3       → 4:3   (recommended 1200×900)
export const SITE_IMAGES = {
  homeHero: "/home-hero.jpg", // 16:9
  aboutHero: "/about-hero.jpg", // 16:9
  aboutStory1: "/story-1.jpg", // 1:1
  aboutStory2: "/story-2.jpg", // 1:1
  aboutStory3: "/story-3.jpg", // 1:1
};

export interface Category {
  key: "all" | CategoryKey;
  label: string;
  lu: string; // urdu label
  icon: string;
  short: string;
  su: string; // urdu short
}

export interface Branch {
  name: string;
  address: string;
  dist: string;
  lat: number;
  lng: number;
  city: "Islamabad" | "Rawalpindi";
}

// Gradient tiles keyed by category (matches the original design)
export const TILE: Record<CategoryKey, string> = {
  rice: "linear-gradient(140deg,#C1272D,#8E1B12)",
  bbq: "linear-gradient(140deg,#8E1B12,#5f120b)",
  fast: "linear-gradient(140deg,#E0821C,#B5560F)",
  chaat: "linear-gradient(140deg,#4A7C2E,#2f5a1a)",
  drinks: "linear-gradient(140deg,#B5892B,#8a6417)",
};

const M = (
  id: number,
  name: string,
  urdu: string,
  cat: CategoryKey,
  price: number,
  desc: string,
  du: string,
  p?: boolean
): Dish => ({ id, name, urdu, cat, price, desc, du, p: !!p });

export const MENU: Dish[] = [
  M(1, "Daal Chawal", "دال چاول", "rice", 180, "Signature lentils over fluffy rice", "نرم چاول پر خاص دال", true),
  M(2, "Chana Chawal", "چنا چاول", "rice", 200, "Spiced chickpeas over rice", "مصالحہ دار چنے چاول کے ساتھ"),
  M(3, "Bannu Beef Pulao", "بنوں بیف پلاؤ", "rice", 350, "Aromatic Bannu-style beef pulao", "بنوں طرز کا خوشبودار بیف پلاؤ", true),
  M(4, "Chicken Biryani", "چکن بریانی", "rice", 320, "Classic spicy chicken biryani", "روایتی مصالحہ دار چکن بریانی", true),
  M(5, "Chicken Achari Handi", "چکن اچاری ہانڈی", "rice", 780, "Tangy pickle-spiced chicken · half", "اچار کے مصالحے والی چکن ہانڈی · ہاف"),
  M(6, "White Handi", "وائٹ ہانڈی", "rice", 820, "Creamy white chicken handi · half", "کریمی وائٹ چکن ہانڈی · ہاف"),
  M(7, "Mutton Handi", "مٹن ہانڈی", "rice", 1450, "Slow-cooked mutton handi · half", "دم پر پکی مٹن ہانڈی · ہاف"),
  M(8, "Beef Karahi", "بیف کڑاہی", "rice", 950, "Tomato beef karahi · half", "ٹماٹر والی بیف کڑاہی · ہاف", true),
  M(9, "Mutton Karahi", "مٹن کڑاہی", "rice", 1550, "Tender mutton karahi · half", "نرم مٹن کڑاہی · ہاف"),
  M(10, "Daal Fry", "دال فرائی", "rice", 260, "Tempered yellow daal", "بگھار والی زرد دال"),
  M(11, "Chana Masala", "چنا مصالحہ", "rice", 240, "Spiced chickpea curry", "مصالحہ دار چنے"),
  M(12, "Qeema", "قیمہ", "rice", 460, "Minced beef masala", "بھنا ہوا بیف قیمہ"),
  M(13, "Aloo Palak", "آلو پالک", "rice", 260, "Potato & spinach curry", "آلو اور پالک کا سالن"),
  M(14, "Mix Vegetable", "مکس سبزی", "rice", 260, "Seasonal mixed vegetables", "موسمی ملی جلی سبزیاں"),
  M(15, "Anda Chana", "انڈا چنا", "rice", 230, "Egg & chickpea curry", "انڈا اور چنے کا سالن"),
  M(16, "Chicken Tikka (Leg)", "چکن تکہ (لیگ)", "bbq", 280, "Charcoal-grilled leg piece", "کوئلوں پر بھنی ران", true),
  M(17, "Chicken Tikka (Chest)", "چکن تکہ (چیسٹ)", "bbq", 300, "Charcoal-grilled chest piece", "کوئلوں پر بھنا سینہ"),
  M(18, "Seekh Kebab", "سیخ کباب", "bbq", 400, "Beef seekh kebab · 4 pcs", "بیف سیخ کباب · 4 عدد"),
  M(19, "Malai Boti", "ملائی بوٹی", "bbq", 460, "Creamy grilled chicken boti", "کریمی گرلڈ چکن بوٹی", true),
  M(20, "Chicken Malai Tikka", "چکن ملائی تکہ", "bbq", 320, "Soft, mild malai tikka", "نرم ملائی تکہ"),
  M(21, "Reshmi Kebab", "ریشمی کباب", "bbq", 420, "Silky smooth chicken kebab", "ریشمی چکن کباب"),
  M(22, "Chicken Wings", "چکن ونگز", "bbq", 360, "Grilled spiced wings · 6 pcs", "مصالحہ دار گرلڈ ونگز · 6 عدد"),
  M(23, "Tandoori Naan", "تندوری نان", "bbq", 40, "Fresh clay-oven naan", "تازہ تندوری نان"),
  M(24, "Roti", "روٹی", "bbq", 20, "Tandoori roti", "تندوری روٹی"),
  M(25, "Garlic Naan", "گارلک نان", "bbq", 90, "Buttery garlic naan", "مکھن گارلک نان"),
  M(26, "Chicken Paratha Roll", "چکن پراٹھا رول", "fast", 250, "Chicken in a flaky paratha", "پراٹھے میں چکن رول", true),
  M(27, "Beef Paratha Roll", "بیف پراٹھا رول", "fast", 280, "Beef in a flaky paratha", "پراٹھے میں بیف رول"),
  M(28, "Zinger Burger", "زنگر برگر", "fast", 350, "Crispy zinger fillet burger", "کرسپی زنگر برگر", true),
  M(29, "Zinger Cheese Burger", "زنگر چیز برگر", "fast", 400, "Zinger loaded with cheese", "چیز والا زنگر برگر"),
  M(30, "Egg Shami Cheese Burger", "انڈا شامی چیز برگر", "fast", 300, "Shami, egg & cheese burger", "شامی، انڈا اور چیز برگر"),
  M(31, "Afghani Burger", "افغانی برگر", "fast", 320, "Stuffed with fries & sausage", "فرائز اور ساسیج والا برگر", true),
  M(32, "Chicken Cheese Roll", "چکن چیز رول", "fast", 300, "Cheesy grilled chicken roll", "چیزی چکن رول"),
  M(33, "Chicken Shawarma", "چکن شوارما", "fast", 250, "Loaded chicken shawarma", "بھرپور چکن شوارما"),
  M(34, "Loaded Fries", "لوڈڈ فرائز", "fast", 300, "Fries with sauces & chicken", "ساس اور چکن والی فرائز"),
  M(35, "Chicken Nuggets", "چکن نگٹس", "fast", 350, "Crispy nuggets · 6 pcs", "کرسپی نگٹس · 6 عدد"),
  M(36, "Club Sandwich", "کلب سینڈوچ", "fast", 320, "Triple-decker club sandwich", "ٹرپل ڈیکر کلب سینڈوچ"),
  M(37, "Dahi Bhallay", "دہی بھلے", "chaat", 200, "Lentil dumplings in yogurt", "دہی میں بھلے", true),
  M(38, "Samosa Chaat", "سموسہ چاٹ", "chaat", 180, "Crushed samosa chaat", "کرش سموسہ چاٹ"),
  M(39, "Mix Chaat", "مکس چاٹ", "chaat", 220, "Everything-in chaat", "ملی جلی چاٹ"),
  M(40, "Papri Chaat", "پاپڑی چاٹ", "chaat", 200, "Crispy papri chaat", "کرسپی پاپڑی چاٹ"),
  M(41, "Chana Chaat", "چنا چاٹ", "chaat", 180, "Tangy chickpea chaat", "چٹ پٹی چنا چاٹ"),
  M(42, "Fruit Chaat", "فروٹ چاٹ", "chaat", 200, "Fresh seasonal fruit chaat", "تازہ موسمی فروٹ چاٹ"),
  M(43, "Sweet Lassi", "میٹھی لسی", "drinks", 150, "Thick sweet yogurt lassi", "گاڑھی میٹھی لسی", true),
  M(44, "Salty Lassi", "نمکین لسی", "drinks", 150, "Refreshing salty lassi", "تازگی بھری نمکین لسی"),
  M(45, "Mango Milkshake", "مینگو ملک شیک", "drinks", 220, "Creamy mango shake", "کریمی آم شیک"),
  M(46, "Chocolate Milkshake", "چاکلیٹ ملک شیک", "drinks", 240, "Rich chocolate shake", "بھرپور چاکلیٹ شیک"),
  M(47, "Desi Chai", "دیسی چائے", "drinks", 80, "Traditional doodh patti chai", "روایتی دودھ پتی", true),
  M(48, "Kashmiri Chai", "کشمیری چائے", "drinks", 150, "Pink Kashmiri tea", "گلابی کشمیری چائے"),
  M(49, "Kheer", "کھیر", "drinks", 150, "Creamy rice pudding", "کریمی چاول کی کھیر"),
  M(50, "Gulab Jamun", "گلاب جامن", "drinks", 120, "Warm gulab jamun · 2 pcs", "گرم گلاب جامن · 2 عدد"),
  M(51, "Fresh Lime", "فریش لائم", "drinks", 120, "Fresh lime soda", "تازہ لیموں سوڈا"),
  M(52, "Mint Margarita", "منٹ مارجریٹا", "drinks", 200, "Minty lime cooler", "پودینے والا لیموں کولر"),
  M(53, "Soft Drink", "سافٹ ڈرنک", "drinks", 80, "Chilled soft drink", "ٹھنڈا سافٹ ڈرنک"),
  M(54, "Water Bottle", "پانی کی بوتل", "drinks", 60, "Mineral water", "منرل واٹر"),
];

export const CATS: Category[] = [
  { key: "all", label: "All", lu: "تمام", icon: "🍽️", short: "Everything", su: "سب کچھ" },
  { key: "rice", label: "Curries & Rice", lu: "سالن اور چاول", icon: "🍛", short: "Curries & Rice", su: "سالن اور چاول" },
  { key: "bbq", label: "BBQ & Tandoor", lu: "باربی کیو اور تندور", icon: "🔥", short: "BBQ & Tandoor", su: "باربی کیو اور تندور" },
  { key: "fast", label: "Fast Food", lu: "فاسٹ فوڈ", icon: "🍔", short: "Fast Food", su: "فاسٹ فوڈ" },
  { key: "chaat", label: "Chaat & Snacks", lu: "چاٹ اور اسنیکس", icon: "🥗", short: "Chaat & Snacks", su: "چاٹ اور اسنیکس" },
  { key: "drinks", label: "Drinks & Desserts", lu: "مشروبات اور میٹھا", icon: "🥤", short: "Drinks & Sweets", su: "مشروبات اور میٹھا" },
];

const B = (
  name: string,
  address: string,
  dist: string,
  lat: number,
  lng: number,
  city: "Islamabad" | "Rawalpindi"
): Branch => ({ name, address, dist, lat, lng, city });

export const BRANCHES: Branch[] = [
  B("F-10 Markaz", "F-10/4, Islamabad", "1.2 km", 33.6975, 73.0119, "Islamabad"),
  B("F-11 Markaz", "Street 73, F-11 Markaz, Islamabad", "2.8 km", 33.6862, 72.9976, "Islamabad"),
  B("G-8 Markaz", "Near PSO Petrol Pump, Islamabad", "3.4 km", 33.6949, 73.0349, "Islamabad"),
  B("I-8 Markaz", "Rose 1 Plaza, I-8 Markaz, Islamabad", "4.1 km", 33.6647, 73.0753, "Islamabad"),
  B("Blue Area", "G-6/2, Blue Area, Islamabad", "5.0 km", 33.7106, 73.0561, "Islamabad"),
  B("G-9 Markaz", "Karachi Company, G-9 Markaz, Islamabad", "4.6 km", 33.6919, 73.0345, "Islamabad"),
  B("G-10 Markaz", "G-10 Markaz, Islamabad", "3.9 km", 33.6835, 73.0122, "Islamabad"),
  B("G-11 Markaz", "G-11 Markaz, Islamabad", "5.5 km", 33.6668, 72.9948, "Islamabad"),
  B("I-10 Markaz", "I-10 Markaz, Islamabad", "6.2 km", 33.6519, 73.0521, "Islamabad"),
  B("F-8 Markaz", "F-8 Markaz, Islamabad", "3.1 km", 33.7092, 73.0342, "Islamabad"),
  B("Bahria Town", "Phase 4 Civic Centre, Rawalpindi", "12.4 km", 33.5316, 73.128, "Rawalpindi"),
  B("Saddar", "Saddar Bazaar, Rawalpindi", "9.8 km", 33.5977, 73.0479, "Rawalpindi"),
  B("Satellite Town", "Satellite Town, Rawalpindi", "8.6 km", 33.6362, 73.0703, "Rawalpindi"),
  B("Chaklala Scheme 3", "Chaklala Scheme 3, Rawalpindi", "10.2 km", 33.5859, 73.0993, "Rawalpindi"),
  B("Peshawar Road", "Peshawar Road, Rawalpindi", "11.1 km", 33.6096, 73.0197, "Rawalpindi"),
  B("DHA Phase 2", "DHA Phase 2, Islamabad", "14.0 km", 33.5349, 73.1519, "Islamabad"),
  B("F-7 Markaz", "Jinnah Super, F-7 Markaz, Islamabad", "2.2 km", 33.7215, 73.0555, "Islamabad"),
  B("F-6 Markaz", "Super Market, F-6, Islamabad", "3.0 km", 33.728, 73.079, "Islamabad"),
  B("E-11 Markaz", "E-11 Markaz, Islamabad", "5.8 km", 33.7009, 72.9709, "Islamabad"),
  B("G-13 Markaz", "G-13 Markaz, Islamabad", "7.0 km", 33.6479, 72.9631, "Islamabad"),
  B("H-8 Markaz", "H-8 Markaz, Islamabad", "4.8 km", 33.6742, 73.0713, "Islamabad"),
  B("I-9 Markaz", "I-9 Markaz, Islamabad", "6.6 km", 33.6607, 73.0641, "Islamabad"),
  B("D-12 Markaz", "D-12 Markaz, Islamabad", "8.2 km", 33.7127, 72.9542, "Islamabad"),
  B("PWD", "PWD Housing Society, Islamabad", "13.5 km", 33.5602, 73.1361, "Islamabad"),
  B("Bahria Enclave", "Bahria Enclave, Islamabad", "16.0 km", 33.6913, 73.1728, "Islamabad"),
  B("Gulberg Greens", "Gulberg Greens, Islamabad", "11.4 km", 33.611, 73.13, "Islamabad"),
  B("Ghauri Town", "Ghauri Town, Islamabad", "14.2 km", 33.5799, 73.152, "Islamabad"),
  B("Soan Garden", "Soan Garden, Islamabad", "12.8 km", 33.572, 73.118, "Islamabad"),
  B("Committee Chowk", "Committee Chowk, Rawalpindi", "9.4 km", 33.6001, 73.0553, "Rawalpindi"),
  B("6th Road", "6th Road, Satellite Town, Rawalpindi", "8.9 km", 33.642, 73.068, "Rawalpindi"),
  B("Murree Road", "Murree Road, Rawalpindi", "9.1 km", 33.628, 73.066, "Rawalpindi"),
  B("Gulraiz", "Gulraiz Housing Scheme, Rawalpindi", "13.0 km", 33.548, 73.124, "Rawalpindi"),
  B("Adiala Road", "Adiala Road, Rawalpindi", "15.5 km", 33.517, 73.023, "Rawalpindi"),
  B("Westridge", "Westridge, Rawalpindi", "10.8 km", 33.592, 72.999, "Rawalpindi"),
  B("Bahria Phase 7", "Bahria Town Phase 7, Rawalpindi", "13.8 km", 33.521, 73.103, "Rawalpindi"),
  B("DHA Phase 1", "DHA Phase 1, Rawalpindi", "12.1 km", 33.549, 73.149, "Rawalpindi"),
];

export const HOURS = "11:00 AM – 2:00 AM";

// Resolve a dish's photo URL (encoded for spaces/parentheses), or "" to fall
// back to the gradient tile.
export function dishImage(d: Dish): string {
  const raw = d.img || DISH_IMAGES[d.id] || "";
  return raw ? encodeURI(raw) : "";
}

// Rough centre of the service area (used to frame the tracking map).
export const CITY_CENTER = { lat: 33.65, lng: 73.05 };

// ===== Real Google reviews (used in the home-page testimonial marquee) =====
export interface Review {
  name: string;
  meta: string; // e.g. "Local Guide · 83 reviews"
  rating: number; // out of 5
  when: string;
  text: string;
}

export const REVIEWS: Review[] = [
  { name: "Arooj Bhatti", meta: "Local Guide · 83 reviews", rating: 5, when: "a month ago", text: "You'd think a place this cheap would lack quality — but the food packs a punch. The daal chawal is so good it reminds you of home-cooked food. I keep returning again and again. Deffo give it a shot :)" },
  { name: "MoIn Shah", meta: "Local Guide · 126 reviews", rating: 5, when: "2 months ago", text: "Shah G Foods is a culinary gem that has made a real impact — known for its authentic Pakistani flavours and high-quality food. They've truly carved a niche for themselves." },
  { name: "JustPassingBy", meta: "Local Guide · 53 reviews", rating: 5, when: "8 months ago", text: "Honestly the best branch of all. Food quality and taste are always on point — fresh, flavorful and well-balanced. Staff is active and polite, never had a wrong order or delay here." },
  { name: "Hassan Ali", meta: "Local Guide · 325 reviews", rating: 5, when: "3 months ago", text: "A nice dhaaba-styled restaurant where you can get food round the clock. Their expertise is desi dishes — haleem, sabzi, nihaari, channay, roghni and khameeri naan." },
  { name: "Zain T", meta: "Local Guide · 128 reviews", rating: 5, when: "4 months ago", text: "Their biryani is very good in taste and service is 10/10 quick. Recommended if you're looking for hygienic food at a nearly economical budget." },
  { name: "Muhammad Umair Saleem", meta: "Local Guide · 96 reviews", rating: 5, when: "5 months ago", text: "I usually visit for tea and daal chawal — both specialities are amazing here. Lassi is also good. A great spot for chapli kabab, daal chawal and aaloo parathas." },
  { name: "Muhammad Usman", meta: "Local Guide · 64 reviews", rating: 5, when: "2 months ago", text: "Delectable food. Especially the B.B.Q, potato-filled paratha and daal chawal. Highly satisfying every time." },
  { name: "Asmat Khan", meta: "Local Guide · 188 reviews", rating: 5, when: "6 months ago", text: "A delightful dining experience with a diverse menu of traditional Pakistani cuisine. The ambiance is warm and welcoming — ideal for family dinners and casual outings." },
  { name: "dr Rizwan", meta: "Local Guide · 68 reviews", rating: 5, when: "a month ago", text: "Daal chawal — cheap and tasty. One of my favourites, a must try!" },
  { name: "Atif Bilal Siddiqui", meta: "Local Guide · 323 reviews", rating: 5, when: "7 months ago", text: "Shah G is like a landmark of F-10 Markaz. We usually go for the tea which is very good, and their daal chawal is very popular. The rest of the food is decent too." },
  { name: "Shahid Says", meta: "Local Guide · 94 reviews", rating: 5, when: "11 months ago", text: "Tried breakfast — the parathas, omelette, chanay and nihari were all very tasty and satisfying. A proper desi breakfast spot." },
  { name: "Muhammad Muneem Shabir", meta: "Local Guide · 55 reviews", rating: 5, when: "3 weeks ago", text: "Quality is good and a pretty economical option. Plenty of items available, but daal chawal is the real speciality." },
  { name: "Sajjad Ali", meta: "Local Guide · 4 reviews", rating: 5, when: "7 months ago", text: "I've tasted their haleem — it was the best. Behtreen!" },
  { name: "Sarmad Mohsin", meta: "Local Guide · 17 reviews", rating: 5, when: "7 months ago", text: "Nice food and quick service. Fresh fish and a good desi menu." },
  { name: "Nazik Ali", meta: "Local Guide · 28 reviews", rating: 5, when: "7 months ago", text: "It's a very good taste, I like it very much. Will visit again." },
];
