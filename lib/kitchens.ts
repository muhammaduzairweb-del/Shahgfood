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
  img?: string; // real dish photo — falls back to a gradient tile until supplied
}

export interface Kitchen {
  slug: string;
  name: string;
  tagline: string;
  taglineU: string;
  phone: string; // display format, e.g. "0334-1525640"
  whatsapp: string; // digits only, international format for wa.me
  areas: string[];
  deliveryFee: string; // display string, e.g. "Rs 250 flat, all covered areas"
  dishes: KitchenDish[];
  paused?: boolean; // menu stays in place, just covered with a banner — flip back on when resolved
  pausedReason?: string;
}

export const KITCHENS: Kitchen[] = [
  {
    slug: "jias-kitchen",
    name: "Jia's Kitchen",
    tagline: "Home-cooked comfort food, made fresh to order.",
    taglineU: "گھر کا خالص اور تازہ کھانا، آرڈر پر تیار۔",
    phone: "0334-1525640",
    whatsapp: "923341525640",
    areas: ["Range Road", "Peshawar Road", "Chor Chowk", "Ahsan Colony", "Shaliwali"],
    deliveryFee: "Rs 250 flat, anywhere in the covered areas",
    paused: true,
    pausedReason: "Kitchen is temporarily down — payment pending.",
    dishes: [
      { name: "Daal Chawal", type: "halffull", half: 350, full: 550, img: "/DaalChawel__Jiya's kitchen.jpg" },
      { name: "Butter Chicken", type: "halffull", half: 1000, full: 2500, img: "/Butterchicken__JIya kithven.jpg" },
      { name: "Achari Baingan Aloo", type: "fixed", price: 300, img: "/Achari bengan Jiya kithcen.jpg" }, // to be reconfirmed with the partner
      { name: "Chana Pulao", type: "fixed", price: 300, img: "/Chan pulao Jiya kitchen.jpg" }, // to be reconfirmed with the partner
      { name: "Pasta", type: "halffull", img: "/Pasta__Jiya Kitchen.jpg" }, // half/full prices to be confirmed with the partner
    ],
  },
];

export function getKitchen(slug: string): Kitchen | undefined {
  return KITCHENS.find((k) => k.slug === slug);
}

// ----- shared WhatsApp prefill messages, used for every listed kitchen/restaurant -----
// Mentions Shah G Online by name so the partner can see the order came from their listing.

export function kitchenDishPriceText(d: KitchenDish): string {
  if (d.type === "fixed" && d.price != null) return `Rs ${d.price.toLocaleString()}`;
  if (d.type === "halffull" && d.half != null && d.full != null) return `Half Rs ${d.half.toLocaleString()} / Full Rs ${d.full.toLocaleString()}`;
  if (d.note) return d.note;
  return "";
}

export function kitchenDishWaLink(kitchen: Kitchen, dish: KitchenDish): string {
  const price = kitchenDishPriceText(dish);
  const msg = `Assalam-o-Alaikum! 🍛\nMain Shah G Online (shahgfood.com) par listed aap ka "${dish.name}"${price ? ` (${price})` : ""} order karna chahta/chahti hoon.\nShukriya!`;
  return `https://wa.me/${kitchen.whatsapp}?text=${encodeURIComponent(msg)}`;
}

export function kitchenWaLink(kitchen: Kitchen): string {
  const msg = `Assalam-o-Alaikum! 🍛\nMain aap ko Shah G Online (shahgfood.com) par listed dekh kar order karna chahta/chahti hoon.\nMehrbani karke menu aur rates bata dein, shukriya!`;
  return `https://wa.me/${kitchen.whatsapp}?text=${encodeURIComponent(msg)}`;
}
