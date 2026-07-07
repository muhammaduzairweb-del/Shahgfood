// ===== Shah G Foods — dish "knowledge base" (prep time, ingredients, serving) =====
// Written in a Pakistani-local style. Keyed by category, with a few dish overrides.

import type { CategoryKey, Dish } from "./data";

export interface KB {
  prep: string;
  prepU: string;
  serves: string;
  servesU: string;
  ing: string[];
  ingU: string[];
}

const BY_CAT: Record<CategoryKey, KB> = {
  rice: {
    prep: "20–25 min", prepU: "20–25 منٹ", serves: "1 person", servesU: "1 فرد",
    ing: ["Fluffy basmati rice", "Slow-cooked daal / chholay", "Onion & tomato", "Ginger-garlic", "Desi garam masala", "Ghee & fresh coriander"],
    ingU: ["نرم باسمتی چاول", "دھیمی آنچ پر دال / چھولے", "پیاز اور ٹماٹر", "ادرک لہسن", "دیسی گرم مصالحہ", "گھی اور تازہ دھنیا"],
  },
  curry: {
    prep: "25–30 min", prepU: "25–30 منٹ", serves: "1–2 people", servesU: "1–2 افراد",
    ing: ["Fresh daal / sabzi", "Bhuna onion-tomato masala", "Ginger-garlic paste", "Green chillies", "Haldi & red chilli", "Tarka in desi ghee"],
    ingU: ["تازہ دال / سبزی", "بھنا پیاز ٹماٹر مصالحہ", "ادرک لہسن پیسٹ", "ہری مرچ", "ہلدی اور لال مرچ", "دیسی گھی کا تڑکا"],
  },
  karahi: {
    prep: "30–40 min", prepU: "30–40 منٹ", serves: "Half 1–2 · Full 3–4", servesU: "ہاف 1–2 · فل 3–4",
    ing: ["Fresh chicken / mutton", "Ripe tomatoes", "Green chillies", "Ginger-garlic", "Crushed black pepper & cumin", "Fresh coriander & julienne ginger"],
    ingU: ["تازہ چکن / مٹن", "پکے ٹماٹر", "ہری مرچ", "ادرک لہسن", "کٹی کالی مرچ اور زیرہ", "تازہ دھنیا اور ادرک"],
  },
  bbq: {
    prep: "20–30 min on charcoal", prepU: "کوئلوں پر 20–30 منٹ", serves: "1–2 people", servesU: "1–2 افراد",
    ing: ["Marinated chicken / beef", "Yogurt & tikka masala", "Lemon & raw papaya", "Ginger-garlic", "Charcoal-grilled", "Served with chutney & naan"],
    ingU: ["میرینیٹ چکن / بیف", "دہی اور تکہ مصالحہ", "لیموں اور کچا پپیتا", "ادرک لہسن", "کوئلوں پر بھنا", "چٹنی اور نان کے ساتھ"],
  },
  breakfast: {
    prep: "10–15 min", prepU: "10–15 منٹ", serves: "1 person", servesU: "1 فرد",
    ing: ["Farm-fresh eggs", "Desi ghee / butter", "Tomato & green chilli", "Tawa-cooked", "Served hot with naan"],
    ingU: ["تازہ دیسی انڈے", "دیسی گھی / مکھن", "ٹماٹر اور ہری مرچ", "توے پر تیار", "گرم نان کے ساتھ"],
  },
  fast: {
    prep: "10–15 min", prepU: "10–15 منٹ", serves: "1 person", servesU: "1 فرد",
    ing: ["Crispy chicken / beef", "Fresh bun / paratha", "House sauces", "Lettuce & veggies", "Fried fresh to order"],
    ingU: ["کرسپی چکن / بیف", "تازہ بن / پراٹھا", "خاص ساس", "سلاد اور سبزیاں", "تازہ فرائی"],
  },
  chaat: {
    prep: "8–10 min", prepU: "8–10 منٹ", serves: "1 person", servesU: "1 فرد",
    ing: ["Chholay / aloo", "Imli & podina chutney", "Dahi", "Chaat masala", "Onion, tomato & coriander"],
    ingU: ["چھولے / آلو", "املی اور پودینہ چٹنی", "دہی", "چاٹ مصالحہ", "پیاز، ٹماٹر اور دھنیا"],
  },
  shakes: {
    prep: "5–8 min", prepU: "5–8 منٹ", serves: "1 person", servesU: "1 فرد",
    ing: ["Fresh seasonal fruit", "Chilled full-cream milk", "Scoop of ice cream", "Sugar", "Blended thick"],
    ingU: ["تازہ موسمی پھل", "ٹھنڈا فل کریم دودھ", "آئس کریم", "چینی", "گاڑھا بلینڈ"],
  },
  juice: {
    prep: "5 min", prepU: "5 منٹ", serves: "1 person", servesU: "1 فرد",
    ing: ["100% fresh fruit", "Freshly pressed", "No added colour or concentrate", "Served over ice"],
    ingU: ["سو فیصد تازہ پھل", "تازہ نچوڑا", "بغیر رنگ و کنسنٹریٹ", "برف کے ساتھ"],
  },
  sweets: {
    prep: "Served fresh", prepU: "تازہ پیش", serves: "1–2 people", servesU: "1–2 افراد",
    ing: ["Full-cream milk / khoya", "Sugar syrup", "Cardamom (elaichi)", "Garnished with dry fruits"],
    ingU: ["فل کریم دودھ / کھویا", "چینی کا شیرہ", "الائچی", "خشک میوہ جات"],
  },
  drinks: {
    prep: "3–5 min", prepU: "3–5 منٹ", serves: "1 person", servesU: "1 فرد",
    ing: ["Fresh milk / yogurt", "Tea leaves (for chai)", "Sugar to taste", "Served piping hot or ice-cold"],
    ingU: ["تازہ دودھ / دہی", "چائے پتی", "حسبِ ذائقہ چینی", "گرم یا ٹھنڈا"],
  },
};

// A few dish-specific overrides for the signatures
const BY_ID: Record<number, Partial<KB>> = {
  1: { prep: "15–20 min", prepU: "15–20 منٹ", ing: ["Slow-simmered maash/chana daal", "Hand-made tarka", "Fluffy long-grain rice", "Onion, tomato & green chilli", "Desi spices", "Fresh coriander"], ingU: ["دھیمی آنچ پر دال", "ہاتھ کا تڑکا", "نرم لمبے چاول", "پیاز، ٹماٹر، ہری مرچ", "دیسی مصالحے", "تازہ دھنیا"] },
  3: { ing: ["Bannu-style beef", "Aromatic pulao rice", "Whole spices (khara masala)", "Onion & ginger", "Beef yakhni stock"], ingU: ["بنوں طرز بیف", "خوشبودار پلاؤ چاول", "کھڑا مصالحہ", "پیاز اور ادرک", "بیف یخنی"] },
  72: { ing: ["Slow-cooked wheat & lentil haleem", "Shredded beef", "Fried onion, ginger & lemon", "Chaat masala", "Over fluffy rice"], ingU: ["دھیمی آنچ پر حلیم", "ریشہ دار بیف", "تلی پیاز، ادرک، لیموں", "چاٹ مصالحہ", "نرم چاول پر"] },
};

export function dishKB(d: Dish): KB {
  return { ...BY_CAT[d.cat], ...BY_ID[d.id] };
}
