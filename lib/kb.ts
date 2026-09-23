// ===== Shah G Foods | dish "knowledge base" (prep time, ingredients, serving) =====
// Written in a Pakistani-local style. Keyed by category, with a few dish overrides.

import type { CategoryKey, Dish } from "./data";

export interface KB {
  prep: string;
  serves: string;
  ing: string[];
}

const BY_CAT: Record<CategoryKey, KB> = {
  rice: {
    prep: "20–25 min", serves: "1 person",
    ing: ["Fluffy basmati rice", "Slow-cooked daal / chholay", "Onion & tomato", "Ginger-garlic", "Desi garam masala", "Ghee & fresh coriander"],
  },
  curry: {
    prep: "25–30 min", serves: "1–2 people",
    ing: ["Fresh daal / sabzi", "Bhuna onion-tomato masala", "Ginger-garlic paste", "Green chillies", "Haldi & red chilli", "Tarka in desi ghee"],
  },
  karahi: {
    prep: "30–40 min", serves: "Half 1–2 · Full 3–4",
    ing: ["Fresh chicken / mutton", "Ripe tomatoes", "Green chillies", "Ginger-garlic", "Crushed black pepper & cumin", "Fresh coriander & julienne ginger"],
  },
  bbq: {
    prep: "20–30 min on charcoal", serves: "1–2 people",
    ing: ["Marinated chicken / beef", "Yogurt & tikka masala", "Lemon & raw papaya", "Ginger-garlic", "Charcoal-grilled", "Served with chutney & naan"],
  },
  breakfast: {
    prep: "10–15 min", serves: "1 person",
    ing: ["Farm-fresh eggs", "Desi ghee / butter", "Tomato & green chilli", "Tawa-cooked", "Served hot with naan"],
  },
  fast: {
    prep: "10–15 min", serves: "1 person",
    ing: ["Crispy chicken / beef", "Fresh bun / paratha", "House sauces", "Lettuce & veggies", "Fried fresh to order"],
  },
  chaat: {
    prep: "8–10 min", serves: "1 person",
    ing: ["Chholay / aloo", "Imli & podina chutney", "Dahi", "Chaat masala", "Onion, tomato & coriander"],
  },
  shakes: {
    prep: "5–8 min", serves: "1 person",
    ing: ["Fresh seasonal fruit", "Chilled full-cream milk", "Scoop of ice cream", "Sugar", "Blended thick"],
  },
  juice: {
    prep: "5 min", serves: "1 person",
    ing: ["100% fresh fruit", "Freshly pressed", "No added colour or concentrate", "Served over ice"],
  },
  sweets: {
    prep: "Served fresh", serves: "1–2 people",
    ing: ["Full-cream milk / khoya", "Sugar syrup", "Cardamom (elaichi)", "Garnished with dry fruits"],
  },
  drinks: {
    prep: "3–5 min", serves: "1 person",
    ing: ["Fresh milk / yogurt", "Tea leaves (for chai)", "Sugar to taste", "Served piping hot or ice-cold"],
  },
};

// A few dish-specific overrides for the signatures
const BY_ID: Record<number, Partial<KB>> = {
  1: { prep: "15–20 min", ing: ["Slow-simmered maash/chana daal", "Hand-made tarka", "Fluffy long-grain rice", "Onion, tomato & green chilli", "Desi spices", "Fresh coriander"] },
  3: { ing: ["Bannu-style beef", "Aromatic pulao rice", "Whole spices (khara masala)", "Onion & ginger", "Beef yakhni stock"] },
  72: { ing: ["Slow-cooked wheat & lentil haleem", "Shredded beef", "Fried onion, ginger & lemon", "Chaat masala", "Over fluffy rice"] },
};

export function dishKB(d: Dish): KB {
  return { ...BY_CAT[d.cat], ...BY_ID[d.id] };
}
