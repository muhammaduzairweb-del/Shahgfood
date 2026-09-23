// ===== Shah G Foods | core data (menu, categories, branches) =====

// Brand logo (transparent PNG, gold food-art wordmark). Used standalone everywhere.
export const LOGO = "/Shahglogo.png";
// Shared filter so the gold wordmark reads clearly on both dark and light backgrounds.
export const LOGO_FILTER = "brightness(1.15) contrast(1.05) drop-shadow(0 2px 6px rgba(0,0,0,.45))";

export type CategoryKey = "rice" | "curry" | "karahi" | "bbq" | "breakfast" | "fast" | "chaat" | "shakes" | "juice" | "sweets" | "drinks";

export interface Dish {
  id: number;
  name: string;
  cat: CategoryKey;
  price: number;
  desc: string;
  p: boolean; // popular / featured
  img?: string; // real photo URL (filled in later); falls back to gradient tile
  // ----- variants (e.g. Half/Full, piece counts). Collapsed on the menu, chosen on the dish page -----
  group?: string; // variants that share a group are one item on the menu
  groupName?: string; // clean name shown on the menu for the whole group
  variant?: string; // e.g. "Half", "Full", "3 Pcs"
  serves?: string; // e.g. "1–2", "3–4"
  primary?: boolean; // the variant shown on the menu (usually the smallest)
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
  5: "/Chicken Achari Handi.jpg", // Chicken Karahi (Full)
  6: "/Chicken Achari Handi.jpg", // Chicken Karahi (Half)
  7: "/Beef Karahi.jpg", // Chicken Karahi Desi (Full)
  8: "/Beef Karahi.jpg", // Chicken Karahi Desi (Half)
  9: "/Mutton Karahi.jpg", // Mutton Karahi (Full)
  91: "/Mutton Karahi.jpg", // Mutton Karahi (Half)
  92: "/BBQ Chicken Karahi.jpg", // BBQ Chicken Karahi (Full)
  93: "/BBQ Chicken Karahi.jpg", // BBQ Chicken Karahi (Half)
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
  // Shakes
  55: "/Strawberry_shake_in_glass_2K_202607070157.jpeg",
  56: "/Almond_shake_in_glass.jpeg",
  57: "/Apple_shake_in_glass_2K_202607070159.jpeg",
  58: "/Apple_banana_shake_in_glass_202607070158.jpeg",
  59: "/Creamy_pineapple_shake_glass_2K_202607070159.jpeg",
  60: "/Dates_and_almond_shake_glass_202607070157.jpeg",
  // Fresh Juices
  61: "/Apple_juice_in_glass_2K_202607070200.jpeg",
  62: "/Orange_juice_in_glass_2K_202607070202.jpeg",
  63: "/Carrot_juice_in_glass_2K_202607070202.jpeg",
  64: "/Fresh_pomegranate_juice_in_glass_202607070200.jpeg",
  65: "/Strawberry_juice_in_glass_2K_202607070201.jpeg",
  // Breads & Tandoor
  66: "/Hot_kulcha_with_butter_plate_202607071314.jpeg",
  67: "/Roghni naan.jpeg",
  68: "/Hot_naan_on_ceramic_plate_202607071316.jpeg",
  71: "/Crispy_golgappay_with_chutneys.jpeg",
  // Rice, Curry, Sides & Karahi
  72: "/Haleem_chawal_in_ceramic_bowl_202607071318.jpeg",
  73: "/Chicken_haleem_in_ceramic_bowl_202607071319.jpeg",
  74: "/Creamy_dal_maash_in_bowl_202607071319.jpeg",
  75: "/Lobia_curry_in_ceramic_bowl_202607071321.jpeg",
  76: "/Fry_gosht_in_ceramic_bowl_202607071322.jpeg",
  77: "/Green_saag_in_ceramic_bowl_202607071323.jpeg",
  78: "/Karhi_pakora_in_ceramic_bowl_202607071323.jpeg",
  79: "/Fresh_raita_in_ceramic_bowl_202607071324.jpeg",
  80: "/Fresh_salad_in_white_plate_202607071325.jpeg",
  // BBQ / Karahi / Breakfast / Tea (new photos)
  81: "/Shami Kabab.jpg",
  82: "/Tawa Mix Karahi.jpg",
  83: "/Plain Egg.jpg",
  84: "/Plain Yogurt Plate.jpg",
  85: "/Egg Omelet.jpg",
  86: "/Fried Egg.jpg",
  87: "/Aalo PAratha.jpg",
  88: "/Boti Fry.jpg",
  89: "/Chicken Kabab Fry.jpg",
  94: "/Chicken Kabab Fry.jpg",
  90: "/Green Tea.jpg",
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
  icon: string;
  short: string;
  sub?: string; // english subheading (banner)
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
  curry: "linear-gradient(140deg,#C56A1A,#8a410c)",
  karahi: "linear-gradient(140deg,#9E1B2F,#5f1018)",
  bbq: "linear-gradient(140deg,#8E1B12,#5f120b)",
  breakfast: "linear-gradient(140deg,#C98A2B,#8a5a14)",
  fast: "linear-gradient(140deg,#E0821C,#B5560F)",
  chaat: "linear-gradient(140deg,#4A7C2E,#2f5a1a)",
  shakes: "linear-gradient(140deg,#B7318C,#6E1A86)",
  juice: "linear-gradient(140deg,#E0A020,#C56A1A)",
  sweets: "linear-gradient(140deg,#B5892B,#7a5a12)",
  drinks: "linear-gradient(140deg,#2A6BB0,#194a80)",
};

const M = (
  id: number,
  name: string,
  cat: CategoryKey,
  price: number,
  desc: string,
  p?: boolean
): Dish => ({ id, name, cat, price, desc, p: !!p });

export const MENU: Dish[] = [
  M(1, "Daal Chawal", "rice", 216, "Signature lentils over fluffy rice", true),
  M(2, "Chana Chawal", "rice", 240, "Spiced chickpeas over rice"),
  M(3, "Bannu Beef Pulao", "rice", 420, "Aromatic Bannu-style beef pulao", true),
  M(4, "Chicken Biryani", "rice", 336, "Classic spicy chicken biryani", true),
  M(5, "Chicken Karahi (Full)", "karahi", 1800, "Tomato chicken karahi · full", true),
  M(6, "Chicken Karahi (Half)", "karahi", 960, "Tomato chicken karahi · half"),
  M(7, "Chicken Karahi Desi (Full)", "karahi", 2160, "Desi-style chicken karahi · full"),
  M(8, "Chicken Karahi Desi (Half)", "karahi", 1140, "Desi-style chicken karahi · half"),
  M(9, "Mutton Karahi (Full)", "karahi", 4080, "Tender mutton karahi · full", true),
  M(91, "Mutton Karahi (Half)", "karahi", 2040, "Tender mutton karahi · half"),
  M(92, "BBQ Chicken Karahi (Full)", "karahi", 1920, "Smoky BBQ chicken karahi · full"),
  M(93, "BBQ Chicken Karahi (Half)", "karahi", 1020, "Smoky BBQ chicken karahi · half"),
  M(10, "Daal Fry", "curry", 312, "Tempered yellow daal"),
  M(11, "Chana Masala", "curry", 216, "Spiced chickpea curry"),
  M(12, "Qeema", "curry", 552, "Minced beef masala"),
  M(13, "Aloo Palak", "curry", 312, "Potato & spinach curry"),
  M(14, "Mix Vegetable", "curry", 216, "Seasonal mixed vegetables"),
  M(15, "Anda Chana", "curry", 276, "Egg & chickpea curry"),
  M(16, "Chicken Tikka (Leg)", "bbq", 372, "Charcoal-grilled leg piece", true),
  M(17, "Chicken Tikka (Chest)", "bbq", 396, "Charcoal-grilled chest piece"),
  M(18, "Seekh Kebab", "bbq", 156, "Beef seekh kebab · 4 pcs"),
  M(19, "Malai Boti", "bbq", 552, "Creamy grilled chicken boti", true),
  M(20, "Chicken Malai Tikka", "bbq", 384, "Soft, mild malai tikka"),
  M(21, "Reshmi Kebab", "bbq", 504, "Silky smooth chicken kebab"),
  M(22, "Chicken Wings", "bbq", 432, "Grilled spiced wings · 6 pcs"),
  M(23, "Tandoori Naan", "bbq", 30, "Fresh clay-oven naan"),
  M(24, "Roti", "bbq", 30, "Tandoori roti"),
  M(25, "Garlic Naan", "bbq", 108, "Buttery garlic naan"),
  M(26, "Chicken Paratha Roll", "fast", 276, "Chicken in a flaky paratha", true),
  M(27, "Beef Paratha Roll", "fast", 336, "Beef in a flaky paratha"),
  M(28, "Zinger Burger", "fast", 420, "Crispy zinger fillet burger", true),
  M(29, "Zinger Cheese Burger", "fast", 480, "Zinger loaded with cheese"),
  M(30, "Egg Shami Cheese Burger", "fast", 360, "Shami, egg & cheese burger"),
  M(31, "Afghani Burger", "fast", 384, "Stuffed with fries & sausage", true),
  M(32, "Chicken Cheese Roll", "fast", 360, "Cheesy grilled chicken roll"),
  M(33, "Chicken Shawarma", "fast", 300, "Loaded chicken shawarma"),
  M(34, "Loaded Fries", "fast", 360, "Fries with sauces & chicken"),
  M(35, "Chicken Nuggets", "fast", 420, "Crispy nuggets · 6 pcs"),
  M(36, "Club Sandwich", "fast", 384, "Triple-decker club sandwich"),
  M(37, "Dahi Bhallay", "chaat", 216, "Lentil dumplings in yogurt", true),
  M(38, "Samosa Chaat", "chaat", 216, "Crushed samosa chaat"),
  M(39, "Mix Chaat", "chaat", 240, "Everything-in chaat"),
  M(40, "Papri Chaat", "chaat", 216, "Crispy papri chaat"),
  M(41, "Chana Chaat", "chaat", 216, "Tangy chickpea chaat"),
  M(42, "Fruit Chaat", "chaat", 240, "Fresh seasonal fruit chaat"),
  // ---- Shakes (exclusive) ----
  M(45, "Mango Milkshake", "shakes", 264, "Creamy mango shake"),
  M(46, "Chocolate Milkshake", "shakes", 288, "Rich chocolate shake"),
  M(55, "Strawberry Shake", "shakes", 300, "Fresh strawberry milkshake", true),
  M(56, "Almond Shake", "shakes", 300, "Rich roasted almond shake"),
  M(57, "Apple Shake", "shakes", 240, "Creamy fresh apple shake"),
  M(58, "Apple Banana Shake", "shakes", 240, "Apple & banana blended shake"),
  M(59, "Pineapple Shake", "shakes", 300, "Creamy pineapple shake"),
  M(60, "Dates & Almond Shake", "shakes", 420, "Dates & almond energy shake", true),
  // ---- Fresh Juices (exclusive) ----
  M(61, "Apple Juice", "juice", 300, "Freshly pressed apple juice"),
  M(62, "Orange Juice", "juice", 300, "Fresh orange juice", true),
  M(63, "Carrot Juice", "juice", 240, "Fresh carrot juice"),
  M(64, "Pomegranate Juice", "juice", 480, "Fresh pomegranate juice", true),
  M(65, "Strawberry Juice", "juice", 300, "Fresh strawberry juice"),
  // ---- Sweets ----
  M(49, "Kheer", "sweets", 180, "Creamy rice pudding"),
  M(50, "Gulab Jamun", "sweets", 144, "Warm gulab jamun · 2 pcs"),
  // ---- Drinks ----
  M(43, "Sweet Lassi", "drinks", 180, "Thick sweet yogurt lassi", true),
  M(44, "Salty Lassi", "drinks", 180, "Refreshing salty lassi"),
  M(47, "Desi Chai", "drinks", 96, "Traditional doodh patti chai", true),
  M(48, "Kashmiri Chai", "drinks", 144, "Pink Kashmiri tea"),
  M(51, "Fresh Lime", "drinks", 108, "Fresh lime soda"),
  M(52, "Mint Margarita", "drinks", 180, "Minty lime cooler"),
  M(53, "Soft Drink", "drinks", 84, "Chilled soft drink"),
  M(54, "Water Bottle", "drinks", 72, "Mineral water"),
  // ---- Breads & Tandoor ----
  M(66, "Special Kulcha", "bbq", 36, "Soft tandoor-baked kulcha"),
  M(67, "Roghni Naan", "bbq", 96, "Sesame-topped roghni naan", true),
  M(68, "Veggie Naan", "bbq", 120, "Naan stuffed with spiced veg"),
  // ---- Chaat & Snacks ----
  M(71, "Golgappay", "chaat", 216, "Crispy golgappay with chutneys", true),
  // ---- Rice ----
  M(72, "Haleem Chawal", "rice", 240, "Wheat & lentil haleem over rice", true),
  // ---- Curry, Daal & Sides ----
  M(73, "Chicken Haleem", "curry", 228, "Slow-cooked chicken haleem"),
  M(74, "Dal Maash", "curry", 216, "Creamy white maash daal"),
  M(75, "Lobia", "curry", 216, "Kidney bean curry"),
  M(77, "Saag", "curry", 216, "Green mustard & spinach saag"),
  M(78, "Karhi Pakora", "curry", 216, "Yogurt curry with pakoras"),
  M(79, "Raita", "curry", 72, "Cooling yogurt raita"),
  M(80, "Salad", "curry", 108, "Fresh garden salad"),
  // ---- Karahi & Handi ----
  M(76, "Fry Gosht", "karahi", 360, "Bhuna fried beef & mutton", true),
  M(82, "Tawa Mix Karahi", "karahi", 528, "Mixed meat tawa karahi", true),
  // ---- BBQ ----
  M(81, "Shami Kabab", "bbq", 48, "Fried beef shami kabab · 1 pc"),
  // ---- Breakfast & Specialty Fried Meats ----
  M(83, "Plain Egg", "breakfast", 72, "Boiled plain egg"),
  M(84, "Yogurt Plate", "breakfast", 120, "Fresh plain yogurt"),
  M(85, "Egg Omelet", "breakfast", 72, "Fluffy egg omelet"),
  M(86, "Fried Egg", "breakfast", 72, "Sunny-side fried egg"),
  M(87, "Aloo Paratha", "breakfast", 120, "Potato-stuffed paratha", true),
  M(88, "Boti Fry", "bbq", 900, "Fried meat boti · 15 pcs"),
  M(89, "Chicken Kabab Fry (3 Pcs)", "bbq", 720, "Fried chicken kababs · 3 pcs"),
  M(94, "Chicken Kabab Fry (6 Pcs)", "bbq", 1320, "Fried chicken kababs · 6 pcs"),
  // ---- Tea ----
  M(90, "Green Tea", "drinks", 84, "Fresh green tea"),
];

// Variant grouping — Half/Full & piece options. On the menu these show as ONE item;
// the size/pieces are chosen on the dish page (each variant is its own real dish + page).
type VInfo = Omit<Dish, "id" | "name" | "cat" | "price" | "desc" | "p" | "img">;
const VARIANTS: Record<number, VInfo> = {
  // Chicken Karahi
  6: { group: "chicken-karahi", groupName: "Chicken Karahi", variant: "Half", serves: "1–2", primary: true },
  5: { group: "chicken-karahi", groupName: "Chicken Karahi", variant: "Full", serves: "3–4" },
  // Chicken Karahi Desi
  8: { group: "chicken-karahi-desi", groupName: "Chicken Karahi Desi", variant: "Half", serves: "1–2", primary: true },
  7: { group: "chicken-karahi-desi", groupName: "Chicken Karahi Desi", variant: "Full", serves: "3–4" },
  // Mutton Karahi
  91: { group: "mutton-karahi", groupName: "Mutton Karahi", variant: "Half", serves: "1–2", primary: true },
  9: { group: "mutton-karahi", groupName: "Mutton Karahi", variant: "Full", serves: "3–4" },
  // BBQ Chicken Karahi
  93: { group: "bbq-chicken-karahi", groupName: "BBQ Chicken Karahi", variant: "Half", serves: "1–2", primary: true },
  92: { group: "bbq-chicken-karahi", groupName: "BBQ Chicken Karahi", variant: "Full", serves: "3–4" },
  // Chicken Kabab Fry (pieces)
  89: { group: "chicken-kabab-fry", groupName: "Chicken Kabab Fry", variant: "3 Pcs", serves: "1", primary: true },
  94: { group: "chicken-kabab-fry", groupName: "Chicken Kabab Fry", variant: "6 Pcs", serves: "2–3" },
};
for (const d of MENU) {
  const v = VARIANTS[d.id];
  if (v) Object.assign(d, v);
}

/** All variants of a dish's group (Half/Full…), ordered by price. Single dish → just itself. */
export function dishVariants(d: Dish): Dish[] {
  if (!d.group) return [d];
  return MENU.filter((x) => x.group === d.group).sort((a, b) => a.price - b.price);
}

export const CATS: Category[] = [
  { key: "all", label: "All", icon: "🍽️", short: "Everything", sub: "The full Shah G Foods menu: our famous Daal Chawal, fresh karahi, charcoal BBQ, rolls, chaat, shakes and juices. 92 dishes, all cooked fresh to order.", },
  { key: "rice", label: "Rice & Pulao", icon: "🍛", short: "Rice & Pulao", sub: "The heart of our menu. Our famous Daal Chawal, Bannu beef pulao, chicken biryani, chana chawal and haleem chawal, all served over fluffy long-grain rice.", },
  { key: "curry", label: "Curry & Daal", icon: "🍲", short: "Curry & Daal", sub: "Home-style curries at fair prices. Daal fry, chana masala, beef qeema, aloo palak, dal maash, saag, karhi pakora and seasonal vegetables.", },
  { key: "karahi", label: "Karahi", icon: "🥘", short: "Karahi", sub: "Karahi cooked fresh when you order. Chicken, desi chicken, mutton and BBQ chicken karahi in half or full, plus fry gosht and tawa mix karahi. Best with hot naan.", },
  { key: "bbq", label: "BBQ & Tandoor", icon: "🔥", short: "BBQ & Tandoor", sub: "Straight off the charcoal. Chicken tikka, seekh kebab, malai boti, reshmi kebab and grilled wings, with fresh tandoori, roghni and garlic naan.", },
  { key: "breakfast", label: "Breakfast", icon: "🍳", short: "Breakfast", sub: "A proper desi breakfast. Eggs any way you like, fresh yogurt and stuffed aloo paratha.", },
  { key: "fast", label: "Fast Food", icon: "🍔", short: "Fast Food", sub: "Quick bites done right. Chicken and beef paratha rolls, zinger and Afghani burgers, shawarma, loaded fries, nuggets and club sandwiches.", },
  { key: "chaat", label: "Chaat", icon: "🥗", short: "Chaat", sub: "Tangy street-style chaat. Dahi bhallay, samosa chaat, papri, chana chaat, fruit chaat and golgappay.", },
  { key: "shakes", label: "Shakes", icon: "🧋", short: "Shakes", sub: "Thick milkshakes blended fresh. Mango, chocolate, strawberry, almond, apple, banana, pineapple and our dates and almond shake.", },
  { key: "juice", label: "Fresh Juices", icon: "🧃", short: "Fresh Juices", sub: "Freshly pressed juices with no concentrate and no added colour. Apple, orange, carrot, pomegranate and strawberry.", },
  { key: "sweets", label: "Sweets", icon: "🍮", short: "Sweets", sub: "Something sweet to finish. Creamy rice kheer and warm gulab jamun, made the traditional way.", },
  { key: "drinks", label: "Drinks", icon: "🥤", short: "Drinks", sub: "Sweet or salty lassi, doodh patti, pink Kashmiri chai, green tea, fresh lime, mint margarita, soft drinks and mineral water.", },
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
  // High-demand sectors people search for (added for local SEO coverage)
  B("G-15 Markaz", "G-15 Markaz, Islamabad", "13.2 km", 33.6318, 72.9155, "Islamabad"),
  B("B-17", "Multi Gardens B-17, Islamabad", "20.5 km", 33.6606, 72.833, "Islamabad"),
  B("Faisal Town", "Faisal Town, Islamabad", "9.5 km", 33.648, 72.965, "Islamabad"),
  B("Bhara Kahu", "Bhara Kahu, Islamabad", "17.0 km", 33.7415, 73.178, "Islamabad"),
];

/** URL-safe slug for a branch name, e.g. "F-10 Markaz" → "f-10-markaz". */
export function branchSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

/** Find a branch by its slug (used by the dedicated /branches/[slug] pages). */
export function getBranchBySlug(slug: string): Branch | undefined {
  return BRANCHES.find((b) => branchSlug(b.name) === slug);
}

/** URL-safe slug for a dish, e.g. "Chicken Karahi (Full)" → "chicken-karahi-full". */
export function dishSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

/** Find a dish by its slug (used by the dedicated /menu/[slug] pages). */
export function getDishBySlug(slug: string): Dish | undefined {
  return MENU.find((d) => dishSlug(d.name) === slug);
}

// ===== Ordering: by phone call or WhatsApp =====
export const ORDER_PHONE = "+92 330 786 2992"; // display
export const ORDER_TEL = "+923307862992"; // tel: link
export const ORDER_WA = "923307862992"; // wa.me number

/** WhatsApp order link with a pre-filled message for a given dish. Pass the
 *  customer's saved address so the branch gets the delivery location upfront. */
export function waOrderLink(dishName: string, address?: string): string {
  const loc = address && address.trim() ? `\nDelivery address: ${address.trim()}` : "";
  const msg = `Hello Shah G Foods! I would like to order: ${dishName}.${loc}\nPlease confirm the price and total bill. Thank you!`;
  return `https://wa.me/${ORDER_WA}?text=${encodeURIComponent(msg)}`;
}

/** Great-circle distance in km between two lat/lng points (for the "near me" finder). */
export function distanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ===== Service area (Islamabad & Rawalpindi) =====
export type City = "Islamabad" | "Rawalpindi";

/** What the user's location can resolve to: a served city, "other" (a real
 *  place we don't operate in yet), or "" (unknown / not set). */
export type CityChoice = City | "other" | "";

/** The cities Shah G Foods currently delivers to (used by the location picker). */
export const CITIES: City[] = ["Islamabad", "Rawalpindi"];

/**
 * Decide coverage from the reverse-geocoded ADMINISTRATIVE region, not distance.
 * Border towns (Khanpur is ~18 km from our B-17 branch) are physically close but
 * in a different province — only a positive region match counts as served:
 *  - anywhere in Islamabad Capital Territory → Islamabad
 *  - Rawalpindi CITY only (the district also covers Murree / Gujar Khan, unserved)
 */
export function matchCoverage(parts: { city?: string; district?: string; state?: string }): City | null {
  const isb = (v?: string) => !!v && (/islamabad/i.test(v));
  const rwp = (v?: string) => !!v && (/rawalpindi/i.test(v));
  if (isb(parts.state) || isb(parts.city)) return "Islamabad";
  if (rwp(parts.city)) return "Rawalpindi";
  return null;
}

/**
 * Best-effort city from GPS coordinates: pick the nearest known branch and use
 * its city. 25 km keeps this inside the actual twin-cities metro — anything
 * farther (Abbottabad is ~45 km from the nearest branch) is NOT served.
 */
export function cityFromCoords(lat: number, lng: number): City | null {
  let best: Branch | null = null;
  let bestD = Infinity;
  for (const b of BRANCHES) {
    const d = distanceKm(lat, lng, b.lat, b.lng);
    if (d < bestD) { bestD = d; best = b; }
  }
  if (!best || bestD > 25) return null;
  return best.city;
}

export const HOURS = "8:00 AM to 2:00 AM";

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
  { name: "Arooj Bhatti", meta: "Local Guide · 83 reviews", rating: 5, when: "a month ago", text: "You'd think a place this cheap would lack quality, but the food packs a punch. The daal chawal is so good it reminds you of home-cooked food. I keep returning again and again. Deffo give it a shot :)" },
  { name: "MoIn Shah", meta: "Local Guide · 126 reviews", rating: 5, when: "2 months ago", text: "Shah G Foods is a culinary gem that has made a real impact, known for its authentic Pakistani flavours and high-quality food. They've truly carved a niche for themselves." },
  { name: "JustPassingBy", meta: "Local Guide · 53 reviews", rating: 5, when: "8 months ago", text: "Honestly the best branch of all. Food quality and taste are always on point, fresh, flavorful and well-balanced. Staff is active and polite, never had a wrong order or delay here." },
  { name: "Hassan Ali", meta: "Local Guide · 325 reviews", rating: 5, when: "3 months ago", text: "A nice dhaaba-styled restaurant where you can get food round the clock. Their expertise is desi dishes, haleem, sabzi, nihaari, channay, roghni and khameeri naan." },
  { name: "Zain T", meta: "Local Guide · 128 reviews", rating: 5, when: "4 months ago", text: "Their biryani is very good in taste and service is 10/10 quick. Recommended if you're looking for hygienic food at a nearly economical budget." },
  { name: "Muhammad Umair Saleem", meta: "Local Guide · 96 reviews", rating: 5, when: "5 months ago", text: "I usually visit for tea and daal chawal, both specialities are amazing here. Lassi is also good. A great spot for chapli kabab, daal chawal and aaloo parathas." },
  { name: "Muhammad Usman", meta: "Local Guide · 64 reviews", rating: 5, when: "2 months ago", text: "Delectable food. Especially the B.B.Q, potato-filled paratha and daal chawal. Highly satisfying every time." },
  { name: "Asmat Khan", meta: "Local Guide · 188 reviews", rating: 5, when: "6 months ago", text: "A delightful dining experience with a diverse menu of traditional Pakistani cuisine. The ambiance is warm and welcoming, ideal for family dinners and casual outings." },
  { name: "dr Rizwan", meta: "Local Guide · 68 reviews", rating: 5, when: "a month ago", text: "Daal chawal, cheap and tasty. One of my favourites, a must try!" },
  { name: "Atif Bilal Siddiqui", meta: "Local Guide · 323 reviews", rating: 5, when: "7 months ago", text: "Shah G is like a landmark of F-10 Markaz. We usually go for the tea which is very good, and their daal chawal is very popular. The rest of the food is decent too." },
  { name: "Shahid Says", meta: "Local Guide · 94 reviews", rating: 5, when: "11 months ago", text: "Tried breakfast, the parathas, omelette, chanay and nihari were all very tasty and satisfying. A proper desi breakfast spot." },
  { name: "Muhammad Muneem Shabir", meta: "Local Guide · 55 reviews", rating: 5, when: "3 weeks ago", text: "Quality is good and a pretty economical option. Plenty of items available, but daal chawal is the real speciality." },
  { name: "Sajjad Ali", meta: "Local Guide · 4 reviews", rating: 5, when: "7 months ago", text: "I've tasted their haleem, it was the best. Behtreen!" },
  { name: "Sarmad Mohsin", meta: "Local Guide · 17 reviews", rating: 5, when: "7 months ago", text: "Nice food and quick service. Fresh fish and a good desi menu." },
  { name: "Nazik Ali", meta: "Local Guide · 28 reviews", rating: 5, when: "7 months ago", text: "It's a very good taste, I like it very much. Will visit again." },
];
