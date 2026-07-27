// ===== Shah G Online — listed partner kitchens (home kitchens & independent restaurants) =====
// Separate from lib/data.ts (which is the Shah G Foods menu/branch data, our founding partner).
// Each entry here is a partner who came through the /partner listing flow.

export type KitchenDishType = "fixed" | "halffull" | "pieces" | "weight" | "size";

export interface KitchenDish {
  name: string;
  nameU?: string;
  type: KitchenDishType;
  price?: number; // used when type === "fixed"
  half?: number; // used when type === "halffull"
  full?: number; // used when type === "halffull"
  note?: string; // freeform fallback, e.g. "6 pcs Rs 720 · 12 pcs Rs 1320"
}

export interface Kitchen {
  slug: string;
  name: string;
  tagline: string;
  taglineU: string;
  phone: string; // display format, e.g. "0334-1525640"
  whatsapp: string; // digits only, international format for wa.me
  areas: string[];
  dishes: KitchenDish[];
}

export const KITCHENS: Kitchen[] = [
  {
    slug: "jias-kitchen",
    name: "Jia's Kitchen",
    tagline: "Home-cooked comfort food, made fresh to order.",
    taglineU: "گھر کا خالص اور تازہ کھانا، آرڈر پر تیار۔",
    phone: "0334-1525640",
    whatsapp: "923341525640",
    areas: ["Range Road", "Peshawar Road", "Chur Chowk", "Ahsan Colony", "Shally Wally"],
    dishes: [
      { name: "Daal Chawal", type: "fixed", price: 350 },
      { name: "Butter Chicken", type: "halffull" }, // half/full prices to be confirmed with the partner
      { name: "Achari Baingan Aloo", type: "fixed", price: 300 },
      { name: "Chana Pulao", type: "fixed", price: 300 },
      { name: "Pasta", type: "halffull" }, // half/full prices to be confirmed with the partner
    ],
  },
];

export function getKitchen(slug: string): Kitchen | undefined {
  return KITCHENS.find((k) => k.slug === slug);
}
