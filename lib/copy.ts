// ===== Shah G Foods | site copy (English) =====
import { BRANCHES, MENU, HOURS } from "./data";

export const BRAND = "Shah G Foods";
export const SITE_URL = "https://shahgfood.com";
export const HOURS_TEXT = HOURS;
export const BRANCH_COUNT = BRANCHES.length;
export const DISH_COUNT = MENU.length;

export const T = {
  home: "Home",
  menu: "Menu",
  branches: "Branches",
  about: "About",
  searchPh: "Search the menu…",

  badge: "ISLAMABAD & RAWALPINDI · SINCE F-10",
  heroTitle: "Honest desi food, cooked fresh at Shah G Foods",
  heroDesc: `Famous Daal Chawal, fresh karahi, charcoal BBQ and proper doodh patti. ${BRANCH_COUNT} branches across Islamabad and Rawalpindi, open daily from 8 AM to 2 AM. Order by call or WhatsApp.`,

  featBadge: "OUR SIGNATURE",
  sigSub: "The dish that started it all. Slow-cooked daal over fluffy rice at a price anyone can afford, and still the most ordered plate at every branch.",
  browseCat: "Browse by category",
  mostLoved: "Customer favourites",
  seeFullMenu: "See full menu →",
  dishesWord: "dishes",

  menuSub: `Full menu · ${DISH_COUNT} dishes`,
  brDesc: `${BRANCH_COUNT} branches across Islamabad and Rawalpindi. Find the one nearest to you.`,
  openNow: "Open now",
  hoursText: HOURS_TEXT,

  tagBest: "Bestseller",
  tagPop: "Popular",

  reviewsBadge: "15,000+ GOOGLE REVIEWS",
  reviewsTitle: "What our customers say",
  reviewsSub: `Rated 4.8 from more than 15,000 Google reviews across our ${BRANCH_COUNT} branches. Here is why people keep coming back.`,
  onGoogle: "on Google",
  homeFaqTitle: "Frequently asked questions",
  homeFaqSub: "Quick answers before you order.",

  footTag: `Fresh desi food from ${BRANCH_COUNT} branches across Islamabad and Rawalpindi. Open daily, 8 AM to 2 AM.`,
  footCompany: "Shah G Foods",
  footHelp: "Help",
  footFollow: "Follow us",
};

export const FAQS: { q: string; a: string }[] = [
  {
    q: "How do I place an order?",
    a: "Pick a dish and tap Call or WhatsApp. Your order goes straight to our team, who confirm the total and send it out from the branch nearest to you.",
  },
  {
    q: "Which areas do you deliver to?",
    a: `We deliver across Islamabad and Rawalpindi from ${BRANCH_COUNT} branches. Share your address when you order and we will send it from the closest kitchen.`,
  },
  {
    q: "What are your opening hours?",
    a: "Every branch is open seven days a week, from 8:00 AM to 2:00 AM.",
  },
  {
    q: "How do I pay?",
    a: "Pay in cash when your food arrives, or at the counter if you dine in or pick up. We confirm the full bill, including any delivery charge, before your order is prepared.",
  },
  {
    q: "How long does delivery take?",
    a: "Most orders arrive in 30 to 40 minutes. It can take a little longer during the lunch and dinner rush or in bad weather.",
  },
  {
    q: "Do you take catering and bulk orders?",
    a: "Yes. Call us with the number of guests and the dishes you want, and we will prepare a quote for offices, events and family gatherings.",
  },
  {
    q: "Something went wrong with my order. What should I do?",
    a: "We are sorry. Call or WhatsApp us with your order details and the branch you ordered from, and our team will make it right. You can also file a complaint on the Complaints page.",
  },
];
