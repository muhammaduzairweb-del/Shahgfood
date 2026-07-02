import { MENU, type Dish } from "./data";
import type { Cart } from "@/components/AppProvider";

export interface CartLine {
  d: Dish;
  qty: number;
}

export function cartLines(cart: Cart): CartLine[] {
  return Object.keys(cart)
    .map((id) => {
      const d = MENU.find((x) => x.id === +id);
      return d ? { d, qty: cart[+id] } : null;
    })
    .filter(Boolean) as CartLine[];
}

export interface CartMath {
  count: number;
  subtotal: number;
  delivery: number;
  tax: number;
  total: number;
}

export function cartMath(cart: Cart): CartMath {
  const lines = cartLines(cart);
  const subtotal = lines.reduce((a, l) => a + l.d.price * l.qty, 0);
  const count = lines.reduce((a, l) => a + l.qty, 0);
  const delivery = subtotal >= 1500 || subtotal === 0 ? 0 : 99;
  const tax = Math.round(subtotal * 0.05);
  return { count, subtotal, delivery, tax, total: subtotal + delivery + tax };
}

export function fmt(n: number, ur: boolean): string {
  return (ur ? "" : "Rs. ") + n.toLocaleString("en-US") + (ur ? " روپے" : "");
}

export function mono(name: string): string {
  const w = name.replace(/[()]/g, "").trim().split(/\s+/);
  return ((w[0] || "")[0] || "") + ((w[1] || "")[0] || "");
}
