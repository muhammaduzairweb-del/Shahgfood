// ===== Client-side order store (localStorage) =====
// Demo mode: no database. Orders live in the browser's localStorage so the whole
// customer + admin + live-tracking flow works on a static/serverless deploy with
// zero backend. Everything is scoped to a single browser — a customer and an
// admin in two tabs of the SAME browser share state (and update each other live
// via the `storage` event); two different devices/browsers do NOT sync.
//
// The API (createOrder / getOrder / listOrders / updateStatus) matches the old
// server store, so swapping in a real DB later means reimplementing just this file.

import { BRANCHES } from "./data";

export const ORDER_STATUSES = ["received", "preparing", "onway", "delivered"] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export interface OrderItem {
  id: number;
  name: string;
  urdu: string;
  qty: number;
  price: number;
  cat: string;
}

export interface Order {
  id: string;
  branch: string;
  city: string;
  customer: { name: string; phone: string; address: string; notes: string };
  items: OrderItem[];
  subtotal: number;
  delivery: number;
  tax: number;
  total: number;
  status: OrderStatus;
  createdAt: number;
  updatedAt: number;
  lang: "en" | "ur";
  dest: { lat: number; lng: number };
}

const LS = "sjf.orders.v1";
// Fired on same-tab writes so listeners in the same tab update too (the native
// `storage` event only fires in OTHER tabs).
const EVT = "sjf-orders-changed";

export function statusToStep(s: OrderStatus): number {
  return ORDER_STATUSES.indexOf(s);
}

function readAll(): Record<string, Order> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(LS);
    return raw ? (JSON.parse(raw) as Record<string, Order>) : {};
  } catch {
    return {};
  }
}

function writeAll(map: Record<string, Order>): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LS, JSON.stringify(map));
    window.dispatchEvent(new Event(EVT));
  } catch {
    /* ignore quota / private-mode errors */
  }
}

function randomId(): string {
  return "SJF-" + Math.floor(1000 + Math.random() * 9000);
}

// Give the customer destination a plausible spot ~1–2km from the branch so the
// rider marker has somewhere to travel on the map.
function destForBranch(branchName: string): { lat: number; lng: number } {
  const b = BRANCHES.find((x) => x.name === branchName) || BRANCHES[0];
  const jitter = () => (Math.random() - 0.5) * 0.03;
  return { lat: b.lat + jitter(), lng: b.lng + jitter() };
}

export function createOrder(input: {
  branch: string;
  city: string;
  customer: Order["customer"];
  items: OrderItem[];
  subtotal: number;
  delivery: number;
  tax: number;
  total: number;
  lang: "en" | "ur";
  dest?: { lat: number; lng: number };
}): Order {
  const map = readAll();
  let id = randomId();
  while (map[id]) id = randomId();
  const now = Date.now();
  const order: Order = {
    id,
    branch: input.branch,
    city: input.city,
    customer: input.customer,
    items: input.items,
    subtotal: input.subtotal,
    delivery: input.delivery,
    tax: input.tax,
    total: input.total,
    status: "received",
    createdAt: now,
    updatedAt: now,
    lang: input.lang,
    dest: input.dest && input.dest.lat ? input.dest : destForBranch(input.branch),
  };
  map[id] = order;
  writeAll(map);
  return order;
}

export function getOrder(id: string): Order | undefined {
  return readAll()[id];
}

export function listOrders(branch?: string): Order[] {
  const all = Object.values(readAll()).sort((a, b) => b.createdAt - a.createdAt);
  return branch ? all.filter((o) => o.branch === branch) : all;
}

export function updateStatus(id: string, status: OrderStatus): Order | undefined {
  const map = readAll();
  const o = map[id];
  if (!o) return undefined;
  o.status = status;
  o.updatedAt = Date.now();
  map[id] = o;
  writeAll(map);
  return o;
}

/** Notify on any change to the order store — same-tab (custom event) and
 *  cross-tab (native `storage` event). Returns an unsubscribe function. */
export function subscribeOrders(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => cb();
  window.addEventListener("storage", handler);
  window.addEventListener(EVT, handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(EVT, handler);
  };
}
