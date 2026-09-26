// ===== Restaurant complaints | shared types and helpers =====
// Flow: visitor submits via /api/complaints → it is emailed to the team →
// approved complaints are added by hand to lib/complaints-data.ts and deployed.
// The complainant's name, phone and email only ever go to the team inbox.

import { PUBLISHED_COMPLAINTS } from "./complaints-data";

export type ComplaintCity = string;

export interface Complaint {
  id: string;
  restaurant: string;
  city: ComplaintCity;
  area: string;
  category: string;
  rating: number; // 1..5
  title: string;
  story: string;
  orderDate: string;
  publishedAt: number;
  reply?: string; // the restaurant's response, if they sent one
  source?: string; // internal note of where it came from, e.g. "Google review" (not shown on the page)
}

// Cities across Pakistan, biggest first. "Other" covers everywhere else.
export const COMPLAINT_CITIES: ComplaintCity[] = [
  "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta",
  "Hyderabad", "Gujranwala", "Sialkot", "Sargodha", "Bahawalpur", "Sukkur", "Larkana", "Sheikhupura",
  "Rahim Yar Khan", "Gujrat", "Sahiwal", "Okara", "Jhang", "Dera Ghazi Khan", "Mardan", "Abbottabad",
  "Mingora (Swat)", "Murree", "Muzaffarabad", "Mirpur", "Gilgit", "Skardu", "Gwadar", "Other",
];

export const COMPLAINT_CATEGORIES = [
  "Food quality",
  "Hygiene",
  "Wrong or missing order",
  "Slow service",
  "Late or no delivery",
  "Overcharging",
  "Staff behaviour",
  "Other",
];

export const LIMITS = { restaurant: 80, area: 80, title: 120, story: 3000, orderDate: 40 };

export function restaurantKey(name: string): string {
  return name.toLowerCase().replace(/\s+/g, " ").trim();
}

/** Published complaints, newest first. */
export function publishedComplaints(): Complaint[] {
  return [...PUBLISHED_COMPLAINTS].sort((a, b) => b.publishedAt - a.publishedAt);
}

export interface RestaurantSummary {
  key: string;
  name: string;
  count: number;
  avg: number;
}

/** Per-restaurant complaint count and average rating, most-complained first. */
export function summarize(list: Complaint[]): RestaurantSummary[] {
  const map = new Map<string, RestaurantSummary & { sum: number }>();
  for (const c of list) {
    const key = restaurantKey(c.restaurant);
    const cur = map.get(key) ?? { key, name: c.restaurant, count: 0, avg: 0, sum: 0 };
    cur.count += 1;
    cur.sum += c.rating;
    map.set(key, cur);
  }
  return [...map.values()]
    .map(({ sum, ...r }) => ({ ...r, avg: sum / r.count }))
    .sort((a, b) => b.count - a.count || a.avg - b.avg);
}
