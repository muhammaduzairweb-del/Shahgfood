// ===== Server-side order store =====
// A simple in-memory store shared across API routes. It's attached to
// globalThis so it survives Next.js hot-reloads in dev. Swap this for a real
// database (Postgres / Prisma) when going to production — the API surface
// (createOrder / getOrder / listOrders / updateStatus) stays the same.

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

interface Store {
  orders: Map<string, Order>;
}

const g = globalThis as unknown as { __sjfStore?: Store };
const store: Store = g.__sjfStore ?? { orders: new Map() };
g.__sjfStore = store;

export function statusToStep(s: OrderStatus): number {
  return ORDER_STATUSES.indexOf(s);
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
  let id = randomId();
  while (store.orders.has(id)) id = randomId();
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
  store.orders.set(id, order);
  return order;
}

export function getOrder(id: string): Order | undefined {
  return store.orders.get(id);
}

export function listOrders(branch?: string): Order[] {
  const all = [...store.orders.values()].sort((a, b) => b.createdAt - a.createdAt);
  return branch ? all.filter((o) => o.branch === branch) : all;
}

export function updateStatus(id: string, status: OrderStatus): Order | undefined {
  const o = store.orders.get(id);
  if (!o) return undefined;
  o.status = status;
  o.updatedAt = Date.now();
  return o;
}
