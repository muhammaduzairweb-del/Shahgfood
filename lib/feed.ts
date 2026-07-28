// ===== Shah G Online — welcome feed (announces new partners going live) =====
// English only by design — Google Translate handles other languages at render time.

export interface FeedPost {
  id: string;
  name: string;
  badge: string;
  href: string;
  avatarInitials: string;
  avatarGradient: string;
  createdAt: string; // real ISO datetime — relative time is computed live from this, not hardcoded
  body: string;
  likes: number;
  img?: string;
}

export const FEED_POSTS: FeedPost[] = [
  {
    id: "jias-kitchen-pasta",
    name: "Jia's Kitchen",
    badge: "MUST TRY",
    href: "/kitchen/jias-kitchen",
    avatarInitials: "JK",
    avatarGradient: "linear-gradient(135deg,#5E1A86,#B71C66)",
    createdAt: "2026-07-28T10:52:00Z",
    body: "New favourite alert: Jia's Kitchen Pasta 🍝 Creamy, rich, and made fresh to order — this one's quickly becoming the most-ordered dish on the menu. If you haven't tried it yet, today's the day. Order it hot and fresh, straight from Jia's Kitchen!",
    likes: 143,
    img: "/Pasta__Jiya Kitchen.jpg",
  },
  {
    id: "jias-kitchen-welcome",
    name: "Jia's Kitchen",
    badge: "NEW ON SHAH G ONLINE",
    href: "/kitchen/jias-kitchen",
    avatarInitials: "JK",
    avatarGradient: "linear-gradient(135deg,#5E1A86,#B71C66)",
    createdAt: "2026-07-28T07:15:00Z",
    body: "Welcome Jia's Kitchen to Shah G Online! 🎉 If you haven't tried Jia's Kofta yet, you're missing out — it's genuinely insane. And Jia's Daal Chawal? We tasted it ourselves, and it's honestly giving Shah G's legendary Daal Chawal a real run for its money. Home-cooked, fresh, and full of flavour. Check out the menu and order directly by call or WhatsApp!",
    likes: 182,
    img: "/DaalChawel__Jiya's kitchen.jpg",
  },
  {
    id: "shah-g-foods-welcome",
    name: "Shah G Foods",
    badge: "FOUNDING PARTNER",
    href: "/restaurant/shah-g-foods/menu",
    avatarInitials: "SG",
    avatarGradient: "linear-gradient(135deg,#C1272D,#8E1B12)",
    createdAt: "2026-07-05T09:00:00Z",
    body: "Welcome Shah G Foods, our very first partner on Shah G Online! The legend that started it all — that iconic Daal Chawal, sizzling Karahi, and smoky BBQ across 35+ branches in Islamabad & Rawalpindi. If you haven't ordered from Shah G yet, you genuinely haven't lived. Full menu is live now — order by call or WhatsApp!",
    likes: 1500,
    img: "/chicken Biryani.jpg",
  },
];

// Facebook/Instagram-style relative time — "Just now" → "5m" → "3h" → "2d" → "3w" → a date, computed live against the real clock.
export function relativeTime(iso: string, now: Date): string {
  const diffSec = Math.floor((now.getTime() - new Date(iso).getTime()) / 1000);
  if (diffSec < 60) return "Just now";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay}d`;
  const diffWeek = Math.floor(diffDay / 7);
  if (diffWeek < 5) return `${diffWeek}w`;
  const then = new Date(iso);
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" };
  if (then.getFullYear() !== now.getFullYear()) opts.year = "numeric";
  return then.toLocaleDateString("en-GB", opts);
}
