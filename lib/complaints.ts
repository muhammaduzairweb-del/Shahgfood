// ===== Restaurant complaints | shared types and helpers =====
// Flow: visitor submits via /api/complaints and it is emailed to the team.
// The complainant's name, phone and email only ever go to the team inbox.

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
