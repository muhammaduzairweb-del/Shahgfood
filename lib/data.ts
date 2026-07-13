// ===== Shah G Foods — core data (menu, categories, branches) =====

// Brand logo (transparent PNG, gold food-art wordmark). Used standalone everywhere.
export const LOGO = "/Shahglogo.png";
// Shared filter so the gold wordmark reads clearly on both dark and light backgrounds.
export const LOGO_FILTER = "brightness(1.15) contrast(1.05) drop-shadow(0 2px 6px rgba(0,0,0,.45))";

export type CategoryKey = "rice" | "curry" | "karahi" | "bbq" | "breakfast" | "fast" | "chaat" | "shakes" | "juice" | "sweets" | "drinks";

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
  // ----- variants (e.g. Half/Full, piece counts). Collapsed on the menu, chosen on the dish page -----
  group?: string; // variants that share a group are one item on the menu
  groupName?: string; // clean name shown on the menu for the whole group
  groupNameU?: string;
  variant?: string; // e.g. "Half", "Full", "3 Pcs"
  variantU?: string;
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
  lu: string; // urdu label
  icon: string;
  short: string;
  su: string; // urdu short
  sub?: string; // english subheading (banner)
  subu?: string; // urdu subheading (banner)
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
  urdu: string,
  cat: CategoryKey,
  price: number,
  desc: string,
  du: string,
  p?: boolean
): Dish => ({ id, name, urdu, cat, price, desc, du, p: !!p });

export const MENU: Dish[] = [
  M(1, "Daal Chawal", "دال چاول", "rice", 216, "Signature lentils over fluffy rice", "نرم چاول پر خاص دال", true),
  M(2, "Chana Chawal", "چنا چاول", "rice", 240, "Spiced chickpeas over rice", "مصالحہ دار چنے چاول کے ساتھ"),
  M(3, "Bannu Beef Pulao", "بنوں بیف پلاؤ", "rice", 420, "Aromatic Bannu-style beef pulao", "بنوں طرز کا خوشبودار بیف پلاؤ", true),
  M(4, "Chicken Biryani", "چکن بریانی", "rice", 336, "Classic spicy chicken biryani", "روایتی مصالحہ دار چکن بریانی", true),
  M(5, "Chicken Karahi (Full)", "چکن کڑاہی (فل)", "karahi", 1800, "Tomato chicken karahi · full", "ٹماٹر چکن کڑاہی · فل", true),
  M(6, "Chicken Karahi (Half)", "چکن کڑاہی (ہاف)", "karahi", 960, "Tomato chicken karahi · half", "ٹماٹر چکن کڑاہی · ہاف"),
  M(7, "Chicken Karahi Desi (Full)", "چکن کڑاہی دیسی (فل)", "karahi", 2160, "Desi-style chicken karahi · full", "دیسی چکن کڑاہی · فل"),
  M(8, "Chicken Karahi Desi (Half)", "چکن کڑاہی دیسی (ہاف)", "karahi", 1140, "Desi-style chicken karahi · half", "دیسی چکن کڑاہی · ہاف"),
  M(9, "Mutton Karahi (Full)", "مٹن کڑاہی (فل)", "karahi", 4080, "Tender mutton karahi · full", "نرم مٹن کڑاہی · فل", true),
  M(91, "Mutton Karahi (Half)", "مٹن کڑاہی (ہاف)", "karahi", 2040, "Tender mutton karahi · half", "نرم مٹن کڑاہی · ہاف"),
  M(92, "BBQ Chicken Karahi (Full)", "باربی کیو چکن کڑاہی (فل)", "karahi", 1920, "Smoky BBQ chicken karahi · full", "باربی کیو چکن کڑاہی · فل"),
  M(93, "BBQ Chicken Karahi (Half)", "باربی کیو چکن کڑاہی (ہاف)", "karahi", 1020, "Smoky BBQ chicken karahi · half", "باربی کیو چکن کڑاہی · ہاف"),
  M(10, "Daal Fry", "دال فرائی", "curry", 312, "Tempered yellow daal", "بگھار والی زرد دال"),
  M(11, "Chana Masala", "چنا مصالحہ", "curry", 216, "Spiced chickpea curry", "مصالحہ دار چنے"),
  M(12, "Qeema", "قیمہ", "curry", 552, "Minced beef masala", "بھنا ہوا بیف قیمہ"),
  M(13, "Aloo Palak", "آلو پالک", "curry", 312, "Potato & spinach curry", "آلو اور پالک کا سالن"),
  M(14, "Mix Vegetable", "مکس سبزی", "curry", 216, "Seasonal mixed vegetables", "موسمی ملی جلی سبزیاں"),
  M(15, "Anda Chana", "انڈا چنا", "curry", 276, "Egg & chickpea curry", "انڈا اور چنے کا سالن"),
  M(16, "Chicken Tikka (Leg)", "چکن تکہ (لیگ)", "bbq", 372, "Charcoal-grilled leg piece", "کوئلوں پر بھنی ران", true),
  M(17, "Chicken Tikka (Chest)", "چکن تکہ (چیسٹ)", "bbq", 396, "Charcoal-grilled chest piece", "کوئلوں پر بھنا سینہ"),
  M(18, "Seekh Kebab", "سیخ کباب", "bbq", 156, "Beef seekh kebab · 4 pcs", "بیف سیخ کباب · 4 عدد"),
  M(19, "Malai Boti", "ملائی بوٹی", "bbq", 552, "Creamy grilled chicken boti", "کریمی گرلڈ چکن بوٹی", true),
  M(20, "Chicken Malai Tikka", "چکن ملائی تکہ", "bbq", 384, "Soft, mild malai tikka", "نرم ملائی تکہ"),
  M(21, "Reshmi Kebab", "ریشمی کباب", "bbq", 504, "Silky smooth chicken kebab", "ریشمی چکن کباب"),
  M(22, "Chicken Wings", "چکن ونگز", "bbq", 432, "Grilled spiced wings · 6 pcs", "مصالحہ دار گرلڈ ونگز · 6 عدد"),
  M(23, "Tandoori Naan", "تندوری نان", "bbq", 30, "Fresh clay-oven naan", "تازہ تندوری نان"),
  M(24, "Roti", "روٹی", "bbq", 30, "Tandoori roti", "تندوری روٹی"),
  M(25, "Garlic Naan", "گارلک نان", "bbq", 108, "Buttery garlic naan", "مکھن گارلک نان"),
  M(26, "Chicken Paratha Roll", "چکن پراٹھا رول", "fast", 276, "Chicken in a flaky paratha", "پراٹھے میں چکن رول", true),
  M(27, "Beef Paratha Roll", "بیف پراٹھا رول", "fast", 336, "Beef in a flaky paratha", "پراٹھے میں بیف رول"),
  M(28, "Zinger Burger", "زنگر برگر", "fast", 420, "Crispy zinger fillet burger", "کرسپی زنگر برگر", true),
  M(29, "Zinger Cheese Burger", "زنگر چیز برگر", "fast", 480, "Zinger loaded with cheese", "چیز والا زنگر برگر"),
  M(30, "Egg Shami Cheese Burger", "انڈا شامی چیز برگر", "fast", 360, "Shami, egg & cheese burger", "شامی، انڈا اور چیز برگر"),
  M(31, "Afghani Burger", "افغانی برگر", "fast", 384, "Stuffed with fries & sausage", "فرائز اور ساسیج والا برگر", true),
  M(32, "Chicken Cheese Roll", "چکن چیز رول", "fast", 360, "Cheesy grilled chicken roll", "چیزی چکن رول"),
  M(33, "Chicken Shawarma", "چکن شوارما", "fast", 300, "Loaded chicken shawarma", "بھرپور چکن شوارما"),
  M(34, "Loaded Fries", "لوڈڈ فرائز", "fast", 360, "Fries with sauces & chicken", "ساس اور چکن والی فرائز"),
  M(35, "Chicken Nuggets", "چکن نگٹس", "fast", 420, "Crispy nuggets · 6 pcs", "کرسپی نگٹس · 6 عدد"),
  M(36, "Club Sandwich", "کلب سینڈوچ", "fast", 384, "Triple-decker club sandwich", "ٹرپل ڈیکر کلب سینڈوچ"),
  M(37, "Dahi Bhallay", "دہی بھلے", "chaat", 216, "Lentil dumplings in yogurt", "دہی میں بھلے", true),
  M(38, "Samosa Chaat", "سموسہ چاٹ", "chaat", 216, "Crushed samosa chaat", "کرش سموسہ چاٹ"),
  M(39, "Mix Chaat", "مکس چاٹ", "chaat", 240, "Everything-in chaat", "ملی جلی چاٹ"),
  M(40, "Papri Chaat", "پاپڑی چاٹ", "chaat", 216, "Crispy papri chaat", "کرسپی پاپڑی چاٹ"),
  M(41, "Chana Chaat", "چنا چاٹ", "chaat", 216, "Tangy chickpea chaat", "چٹ پٹی چنا چاٹ"),
  M(42, "Fruit Chaat", "فروٹ چاٹ", "chaat", 240, "Fresh seasonal fruit chaat", "تازہ موسمی فروٹ چاٹ"),
  // ---- Shakes (exclusive) ----
  M(45, "Mango Milkshake", "مینگو ملک شیک", "shakes", 264, "Creamy mango shake", "کریمی آم شیک"),
  M(46, "Chocolate Milkshake", "چاکلیٹ ملک شیک", "shakes", 288, "Rich chocolate shake", "بھرپور چاکلیٹ شیک"),
  M(55, "Strawberry Shake", "اسٹرابیری شیک", "shakes", 300, "Fresh strawberry milkshake", "تازہ اسٹرابیری شیک", true),
  M(56, "Almond Shake", "بادام شیک", "shakes", 300, "Rich roasted almond shake", "بھنے بادام کا شیک"),
  M(57, "Apple Shake", "ایپل شیک", "shakes", 240, "Creamy fresh apple shake", "تازہ ایپل شیک"),
  M(58, "Apple Banana Shake", "ایپل بنانا شیک", "shakes", 240, "Apple & banana blended shake", "ایپل اور کیلے کا شیک"),
  M(59, "Pineapple Shake", "پائن ایپل شیک", "shakes", 300, "Creamy pineapple shake", "کریمی پائن ایپل شیک"),
  M(60, "Dates & Almond Shake", "کھجور بادام شیک", "shakes", 420, "Dates & almond energy shake", "کھجور اور بادام کا شیک", true),
  // ---- Fresh Juices (exclusive) ----
  M(61, "Apple Juice", "ایپل جوس", "juice", 300, "Freshly pressed apple juice", "تازہ نچوڑا ایپل جوس"),
  M(62, "Orange Juice", "اورنج جوس", "juice", 300, "Fresh orange juice", "تازہ اورنج جوس", true),
  M(63, "Carrot Juice", "گاجر جوس", "juice", 240, "Fresh carrot juice", "تازہ گاجر جوس"),
  M(64, "Pomegranate Juice", "انار جوس", "juice", 480, "Fresh pomegranate juice", "تازہ انار جوس", true),
  M(65, "Strawberry Juice", "اسٹرابیری جوس", "juice", 300, "Fresh strawberry juice", "تازہ اسٹرابیری جوس"),
  // ---- Sweets ----
  M(49, "Kheer", "کھیر", "sweets", 180, "Creamy rice pudding", "کریمی چاول کی کھیر"),
  M(50, "Gulab Jamun", "گلاب جامن", "sweets", 144, "Warm gulab jamun · 2 pcs", "گرم گلاب جامن · 2 عدد"),
  // ---- Drinks ----
  M(43, "Sweet Lassi", "میٹھی لسی", "drinks", 180, "Thick sweet yogurt lassi", "گاڑھی میٹھی لسی", true),
  M(44, "Salty Lassi", "نمکین لسی", "drinks", 180, "Refreshing salty lassi", "تازگی بھری نمکین لسی"),
  M(47, "Desi Chai", "دیسی چائے", "drinks", 96, "Traditional doodh patti chai", "روایتی دودھ پتی", true),
  M(48, "Kashmiri Chai", "کشمیری چائے", "drinks", 144, "Pink Kashmiri tea", "گلابی کشمیری چائے"),
  M(51, "Fresh Lime", "فریش لائم", "drinks", 108, "Fresh lime soda", "تازہ لیموں سوڈا"),
  M(52, "Mint Margarita", "منٹ مارجریٹا", "drinks", 180, "Minty lime cooler", "پودینے والا لیموں کولر"),
  M(53, "Soft Drink", "سافٹ ڈرنک", "drinks", 84, "Chilled soft drink", "ٹھنڈا سافٹ ڈرنک"),
  M(54, "Water Bottle", "پانی کی بوتل", "drinks", 72, "Mineral water", "منرل واٹر"),
  // ---- Breads & Tandoor ----
  M(66, "Special Kulcha", "سپیشل کلچہ", "bbq", 36, "Soft tandoor-baked kulcha", "تندور کا نرم کلچہ"),
  M(67, "Roghni Naan", "روغنی نان", "bbq", 96, "Sesame-topped roghni naan", "تلوں والا روغنی نان", true),
  M(68, "Veggie Naan", "سبزی والا نان", "bbq", 120, "Naan stuffed with spiced veg", "مصالحہ سبزی والا نان"),
  // ---- Chaat & Snacks ----
  M(71, "Golgappay", "گول گپے", "chaat", 216, "Crispy golgappay with chutneys", "چٹنیوں کے ساتھ گول گپے", true),
  // ---- Rice ----
  M(72, "Haleem Chawal", "حلیم چاول", "rice", 240, "Wheat & lentil haleem over rice", "چاول پر حلیم", true),
  // ---- Curry, Daal & Sides ----
  M(73, "Chicken Haleem", "چکن حلیم", "curry", 228, "Slow-cooked chicken haleem", "دم پر پکی چکن حلیم"),
  M(74, "Dal Maash", "دال ماش", "curry", 216, "Creamy white maash daal", "کریمی سفید ماش دال"),
  M(75, "Lobia", "لوبیا", "curry", 216, "Kidney bean curry", "لوبیا سالن"),
  M(77, "Saag", "ساگ", "curry", 216, "Green mustard & spinach saag", "ہرا ساگ"),
  M(78, "Karhi Pakora", "کڑھی پکوڑا", "curry", 216, "Yogurt curry with pakoras", "پکوڑوں والی کڑھی"),
  M(79, "Raita", "رائتہ", "curry", 72, "Cooling yogurt raita", "ٹھنڈا رائتہ"),
  M(80, "Salad", "سلاد", "curry", 108, "Fresh garden salad", "تازہ سلاد"),
  // ---- Karahi & Handi ----
  M(76, "Fry Gosht", "فرائی گوشت", "karahi", 360, "Bhuna fried beef & mutton", "بھنا فرائی گوشت", true),
  M(82, "Tawa Mix Karahi", "توا مکس کڑاہی", "karahi", 528, "Mixed meat tawa karahi", "مکس گوشت توا کڑاہی", true),
  // ---- BBQ ----
  M(81, "Shami Kabab", "شامی کباب", "bbq", 48, "Fried beef shami kabab · 1 pc", "بیف شامی کباب · 1 عدد"),
  // ---- Breakfast & Specialty Fried Meats ----
  M(83, "Plain Egg", "سادہ انڈہ", "breakfast", 72, "Boiled plain egg", "سادہ ابلا انڈہ"),
  M(84, "Yogurt Plate", "دہی پلیٹ", "breakfast", 120, "Fresh plain yogurt", "تازہ سادہ دہی"),
  M(85, "Egg Omelet", "انڈہ آملیٹ", "breakfast", 72, "Fluffy egg omelet", "انڈے کا آملیٹ"),
  M(86, "Fried Egg", "انڈہ فرائی", "breakfast", 72, "Sunny-side fried egg", "فرائی انڈہ"),
  M(87, "Aloo Paratha", "آلو پراٹھا", "breakfast", 120, "Potato-stuffed paratha", "آلو والا پراٹھا", true),
  M(88, "Boti Fry", "بوٹی فرائی", "bbq", 900, "Fried meat boti · 15 pcs", "فرائی بوٹی · 15 عدد"),
  M(89, "Chicken Kabab Fry (3 Pcs)", "چکن کباب فرائی (3 پیس)", "bbq", 720, "Fried chicken kababs · 3 pcs", "فرائی چکن کباب · 3 عدد"),
  M(94, "Chicken Kabab Fry (6 Pcs)", "چکن کباب فرائی (6 پیس)", "bbq", 1320, "Fried chicken kababs · 6 pcs", "فرائی چکن کباب · 6 عدد"),
  // ---- Tea ----
  M(90, "Green Tea", "سبز چائے", "drinks", 84, "Fresh green tea", "تازہ سبز چائے"),
];

// Variant grouping — Half/Full & piece options. On the menu these show as ONE item;
// the size/pieces are chosen on the dish page (each variant is its own real dish + page).
type VInfo = Omit<Dish, "id" | "name" | "urdu" | "cat" | "price" | "desc" | "du" | "p" | "img">;
const VARIANTS: Record<number, VInfo> = {
  // Chicken Karahi
  6: { group: "chicken-karahi", groupName: "Chicken Karahi", groupNameU: "چکن کڑاہی", variant: "Half", variantU: "ہاف", serves: "1–2", primary: true },
  5: { group: "chicken-karahi", groupName: "Chicken Karahi", groupNameU: "چکن کڑاہی", variant: "Full", variantU: "فل", serves: "3–4" },
  // Chicken Karahi Desi
  8: { group: "chicken-karahi-desi", groupName: "Chicken Karahi Desi", groupNameU: "چکن کڑاہی دیسی", variant: "Half", variantU: "ہاف", serves: "1–2", primary: true },
  7: { group: "chicken-karahi-desi", groupName: "Chicken Karahi Desi", groupNameU: "چکن کڑاہی دیسی", variant: "Full", variantU: "فل", serves: "3–4" },
  // Mutton Karahi
  91: { group: "mutton-karahi", groupName: "Mutton Karahi", groupNameU: "مٹن کڑاہی", variant: "Half", variantU: "ہاف", serves: "1–2", primary: true },
  9: { group: "mutton-karahi", groupName: "Mutton Karahi", groupNameU: "مٹن کڑاہی", variant: "Full", variantU: "فل", serves: "3–4" },
  // BBQ Chicken Karahi
  93: { group: "bbq-chicken-karahi", groupName: "BBQ Chicken Karahi", groupNameU: "باربی کیو چکن کڑاہی", variant: "Half", variantU: "ہاف", serves: "1–2", primary: true },
  92: { group: "bbq-chicken-karahi", groupName: "BBQ Chicken Karahi", groupNameU: "باربی کیو چکن کڑاہی", variant: "Full", variantU: "فل", serves: "3–4" },
  // Chicken Kabab Fry (pieces)
  89: { group: "chicken-kabab-fry", groupName: "Chicken Kabab Fry", groupNameU: "چکن کباب فرائی", variant: "3 Pcs", variantU: "3 پیس", serves: "1", primary: true },
  94: { group: "chicken-kabab-fry", groupName: "Chicken Kabab Fry", groupNameU: "چکن کباب فرائی", variant: "6 Pcs", variantU: "6 پیس", serves: "2–3" },
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
  { key: "all", label: "All", lu: "تمام", icon: "🍽️", short: "Everything", su: "سب کچھ", sub: "The complete Shah G Foods menu — from our legendary Daal Chawal to sizzling karahi, charcoal BBQ, fresh shakes and juices. 92 dishes, all cooked fresh and delivered hot.", subu: "شاہ جی فوڈز کا مکمل مینو — مشہور دال چاول سے لے کر کڑاہی، باربی کیو، تازہ شیک اور جوس تک۔ 92 ڈشز، سب تازہ پکی اور گرم گرم۔" },
  { key: "rice", label: "Rice & Pulao", lu: "چاول اور پلاؤ", icon: "🍛", short: "Rice & Pulao", su: "چاول اور پلاؤ", sub: "The heart of our menu — legendary budget-friendly Daal Chawal, aromatic Bannu beef pulao, spicy chicken biryani and chana chawal, all cooked fresh and served over fluffy long-grain rice.", subu: "ہمارے مینو کا دل — مشہور اور کم قیمت دال چاول، خوشبودار بنوں بیف پلاؤ، مصالحہ دار چکن بریانی اور چنا چاول، سب تازہ پکے اور نرم چاول پر۔" },
  { key: "curry", label: "Curry & Daal", lu: "سالن اور دال", icon: "🍲", short: "Curry & Daal", su: "سالن اور دال", sub: "Comforting home-style curries — tempered daal fry, spicy chana masala, bhuna beef qeema, aloo palak and seasonal mixed vegetables. Simple, hearty and easy on the pocket.", subu: "دل کو بھانے والے گھریلو سالن — بگھار والی دال فرائی، چنا مصالحہ، بھنا بیف قیمہ، آلو پالک اور موسمی سبزیاں۔ سادہ، بھرپور اور جیب پر ہلکے۔" },
  { key: "karahi", label: "Karahi", lu: "کڑاہی", icon: "🥘", short: "Karahi", su: "کڑاہی", sub: "Sizzling, freshly cooked karahi — chicken karahi, desi chicken karahi, mutton karahi and smoky BBQ chicken karahi (full & half), plus fry gosht and tawa mix karahi. Best with hot naan.", subu: "تازہ پکی کڑاہی — چکن کڑاہی، دیسی چکن کڑاہی، مٹن کڑاہی اور باربی کیو چکن کڑاہی (فل و ہاف)، ساتھ فرائی گوشت اور توا مکس کڑاہی۔ گرم نان کے ساتھ بہترین۔" },
  { key: "bbq", label: "BBQ & Tandoor", lu: "باربی کیو اور تندور", icon: "🔥", short: "BBQ & Tandoor", su: "باربی کیو اور تندور", sub: "Straight off the charcoal — juicy chicken tikka, beef seekh kebab, malai boti, reshmi kebab and grilled wings, with fresh tandoori, roghni and garlic naan.", subu: "کوئلوں سے سیدھا — رسیلا چکن تکہ، بیف سیخ کباب، ملائی بوٹی، ریشمی کباب اور گرلڈ ونگز، ساتھ تازہ تندوری، روغنی اور گارلک نان۔" },
  { key: "breakfast", label: "Breakfast", lu: "ناشتہ", icon: "🍳", short: "Breakfast", su: "ناشتہ", sub: "A hearty desi breakfast — plain egg, fluffy omelet, fried egg, fresh yogurt and stuffed aloo paratha.", subu: "بھرپور دیسی ناشتہ — سادہ انڈہ، نرم آملیٹ، فرائی انڈہ، تازہ دہی اور آلو پراٹھا۔" },
  { key: "fast", label: "Fast Food", lu: "فاسٹ فوڈ", icon: "🍔", short: "Fast Food", su: "فاسٹ فوڈ", sub: "Quick bites done right — chicken & beef paratha rolls, zinger and afghani burgers, loaded shawarma, cheesy fries, crispy nuggets and club sandwiches.", subu: "جھٹ پٹ مزیدار — چکن و بیف پراٹھا رول، زنگر اور افغانی برگر، بھرپور شوارما، چیزی فرائز، نگٹس اور کلب سینڈوچ۔" },
  { key: "chaat", label: "Chaat", lu: "چاٹ", icon: "🥗", short: "Chaat", su: "چاٹ", sub: "Tangy, chatpata street-style chaat — dahi bhallay, crushed samosa chaat, papri, chana and fresh fruit chaat. The perfect light, zingy snack.", subu: "چٹ پٹی اسٹریٹ اسٹائل چاٹ — دہی بھلے، سموسہ چاٹ، پاپڑی، چنا اور تازہ فروٹ چاٹ۔ ہلکا پھلکا زبردست اسنیک۔" },
  { key: "shakes", label: "Shakes", lu: "شیکس", icon: "🧋", short: "Shakes", su: "شیکس", sub: "Thick, creamy milkshakes blended fresh — mango, chocolate, strawberry, almond, apple, banana, pineapple and our signature dates & almond energy shake.", subu: "تازہ بلینڈ گاڑھے کریمی شیک — آم، چاکلیٹ، اسٹرابیری، بادام، ایپل، بنانا، پائن ایپل اور خاص کھجور بادام انرجی شیک۔" },
  { key: "juice", label: "Fresh Juices", lu: "تازہ جوس", icon: "🧃", short: "Fresh Juices", su: "تازہ جوس", sub: "100% freshly pressed juices — apple, orange, carrot, pomegranate and strawberry. No concentrates, no added colours — just real fruit poured over ice.", subu: "سو فیصد تازہ نچوڑے جوس — ایپل، اورنج، گاجر، انار اور اسٹرابیری۔ کوئی کنسنٹریٹ نہیں، صرف اصل پھل۔" },
  { key: "sweets", label: "Sweets", lu: "میٹھا", icon: "🍮", short: "Sweets", su: "میٹھا", sub: "Finish on a sweet note — creamy rice kheer and warm gulab jamun, made the traditional desi way to round off your meal.", subu: "میٹھے کا اختتام — کریمی چاول کی کھیر اور گرم گلاب جامن، روایتی دیسی انداز میں۔" },
  { key: "drinks", label: "Drinks", lu: "مشروبات", icon: "🥤", short: "Drinks", su: "مشروبات", sub: "Cool down with thick sweet or salty lassi, pink Kashmiri chai, doodh-patti, fresh lime, mint margarita, chilled soft drinks and mineral water.", subu: "ٹھنڈک کے لیے گاڑھی میٹھی یا نمکین لسی، گلابی کشمیری چائے، دودھ پتی، فریش لائم، منٹ مارجریٹا، سافٹ ڈرنکس اور منرل واٹر۔" },
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

// ===== Marketplace: order-via-call (no delivery / no cart) =====
// Every dish is listed by a vendor. For now the flagship vendor is Shah G Foods.
export const ORDER_PHONE = "+92 330 786 2992"; // display
export const ORDER_TEL = "+923307862992"; // tel: link
export const ORDER_WA = "923307862992"; // wa.me number

/** WhatsApp order link with a pre-filled message for a given dish. Pass the
 *  customer's saved address so the vendor gets the delivery location upfront. */
export function waOrderLink(dishName: string, address?: string): string {
  const loc = address && address.trim() ? `\n📍 Meri location: ${address.trim()}` : "";
  const msg = `Assalam-o-Alaikum! 🍛\nMain Shah G Online (shahgfood.com) par listed aap ka "${dishName}" order karna chahta/chahti hoon.${loc}\nMehrbani karke rate aur total bill bata dein, shukriya!`;
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

// ===== Multi-vendor directory (area-based filtering) =====
export type City = "Islamabad" | "Rawalpindi";

/** What the user's location can resolve to: a served city, "other" (a real
 *  place we don't operate in yet), or "" (unknown / not set). */
export type CityChoice = City | "other" | "";

/** The cities the platform currently operates in (used by the location picker). */
export const CITIES: City[] = ["Islamabad", "Rawalpindi"];

/**
 * Decide coverage from the reverse-geocoded ADMINISTRATIVE region, not distance.
 * Border towns (Khanpur is ~18 km from our B-17 branch) are physically close but
 * in a different province — only a positive region match counts as served:
 *  - anywhere in Islamabad Capital Territory → Islamabad
 *  - Rawalpindi CITY only (the district also covers Murree / Gujar Khan, unserved)
 */
export function matchCoverage(parts: { city?: string; district?: string; state?: string }): City | null {
  const isb = (v?: string) => !!v && (/islamabad/i.test(v) || v.includes("اسلام آباد"));
  const rwp = (v?: string) => !!v && (/rawalpindi/i.test(v) || v.includes("راولپنڈی"));
  if (isb(parts.state) || isb(parts.city)) return "Islamabad";
  if (rwp(parts.city)) return "Rawalpindi";
  return null;
}

export interface Restaurant {
  slug: string;
  name: string;
  nameUr: string;
  cuisine: string;
  cuisineUr: string;
  rating: number;
  reviews: number;
  image: string;
  featured?: boolean;
  /** Cities this restaurant serves. A customer outside these will NOT see it. */
  coverageCities: City[];
  /** Optional finer-grained areas/sectors for future sector-level filtering. */
  coverageAreas?: string[];
  menuPath: string;
}

/**
 * Listed restaurants. New paying vendors get appended here with their own
 * `coverageCities` so customers only ever see kitchens that serve their area.
 */
export const RESTAURANTS: Restaurant[] = [
  {
    slug: "shah-g-foods",
    name: "Shah G Foods",
    nameUr: "شاہ جی فوڈز",
    cuisine: "Desi · BBQ · Karahi · Breakfast",
    cuisineUr: "دیسی · باربی کیو · کڑاہی · ناشتہ",
    rating: 4.8,
    reviews: 15000,
    image: "/Shahgfoods__Feature.jpg",
    featured: true,
    coverageCities: ["Islamabad", "Rawalpindi"],
    menuPath: "/restaurant/shah-g-foods/menu",
  },
];

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

/** Restaurants that serve the given city. "" (unknown) shows all; "other"
 *  (a real place we don't operate in) shows none. */
export function restaurantsForCity(city: CityChoice): Restaurant[] {
  if (city === "other") return [];
  if (!city) return RESTAURANTS;
  return RESTAURANTS.filter((r) => r.coverageCities.includes(city));
}

export const HOURS = "8:00 AM – 2:00 AM";

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
