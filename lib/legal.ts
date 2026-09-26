// ===== Shah G Foods | legal copy (Privacy, Terms, Refund) =====
// Good-faith template for a restaurant that takes orders by phone and WhatsApp.
// Have a qualified lawyer review it before you rely on it.

import { PUBLIC_EMAIL } from "./copy";
import { ORDER_PHONE } from "./data";

export interface LegalSection {
  h: string;
  body: string[];
}
export interface LegalDoc {
  badge: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

const COMPANY = "Shah G Foods";
const SITE = "shahgfood.com";
const UPDATED = "Last updated: 26 September 2026";
const CONTACT = `Email ${PUBLIC_EMAIL} or call ${ORDER_PHONE}.`;

/* ---------------- PRIVACY ---------------- */
export const PRIVACY: LegalDoc = {
  badge: "LEGAL · PRIVACY",
  title: "Privacy Policy",
  updated: UPDATED,
  intro: `This policy explains what information ${COMPANY} ("we", "us") collects through ${SITE}, how we use it and the choices you have. By using the website you agree to the practices described here.`,
  sections: [
    {
      h: "1. Who we are",
      body: [`${COMPANY} is a desi restaurant with branches across Islamabad and Rawalpindi. This website shows our menu and branches and lets you order from us by phone or WhatsApp.`],
    },
    {
      h: "2. Information we collect",
      body: [
        "Orders: when you call or message us on WhatsApp, we receive your name, phone number, delivery address and the items you order.",
        "Location: if you allow it, your browser shares your approximate location so we can suggest your nearest branch and fill in your address. It is converted into a street address using OpenStreetMap and saved only in your own browser.",
        "Contact form: your name, phone number, email address, message and any file you choose to attach.",
        "Notifications: if you turn on browser notifications, we store a technical subscription key so we can send you occasional offers. It does not identify you personally.",
        "Technical data: basic information such as device type, browser and pages visited, plus local storage that keeps the site working.",
        "Advertising: we show ads from Google AdSense. Google and its partners use cookies to serve ads based on your previous visits to this and other websites. You can turn off personalised ads at https://adssettings.google.com, or opt out of third-party cookies at https://www.aboutads.info.",
      ],
    },
    {
      h: "3. How we use it",
      body: [
        "To prepare and deliver your order and to contact you about it.",
        "To reply to your questions, feedback and complaints.",
        "To send notifications you have agreed to receive.",
        "To keep the website secure and to improve it.",
        "To meet our legal and tax obligations.",
      ],
    },
    {
      h: "4. Sharing",
      body: [
        "We share your details only with the branch and rider handling your order, and with service providers that run the website (hosting, email, notifications and advertising).",
        "We may disclose information when the law requires it.",
        "We never sell your personal information.",
      ],
    },
    {
      h: "5. Retention and security",
      body: ["We keep information only as long as we need it for the purposes above, then delete or anonymise it. We take reasonable steps to protect it, but no method of storage or transfer is completely secure."],
    },
    {
      h: "6. Your choices",
      body: [
        "You can refuse location access, turn off notifications in your browser settings, or clear the site data stored in your browser at any time.",
        `You can ask us to show, correct or delete the personal information we hold about you. ${CONTACT}`,
      ],
    },
    {
      h: "7. Changes",
      body: ["We may update this policy from time to time. The latest version will always be on this page."],
    },
  ],
};

/* ---------------- TERMS ---------------- */
export const TERMS: LegalDoc = {
  badge: "LEGAL · TERMS",
  title: "Terms & Conditions",
  updated: UPDATED,
  intro: `These terms apply when you use ${SITE} or order food from ${COMPANY}. Please read them before you place an order.`,
  sections: [
    {
      h: "1. Placing an order",
      body: [
        "You order by calling us or sending a WhatsApp message. An order is confirmed only after our team repeats the items, total price and delivery address back to you.",
        "Please give an accurate address and a phone number we can reach. We may cancel an order if we cannot contact you.",
      ],
    },
    {
      h: "2. Prices and menu",
      body: [
        "Prices on the website are in Pakistani Rupees and include applicable taxes unless stated otherwise. Any delivery charge is confirmed before your order is prepared.",
        "Prices, dishes and availability can change without notice and may vary slightly between branches. The price confirmed when you order is the price you pay.",
        "Photos are for illustration. Portions and presentation may differ slightly.",
      ],
    },
    {
      h: "3. Payment",
      body: ["Payment is made in cash on delivery, or at the counter for pickup and dine-in, unless our team agrees another method with you."],
    },
    {
      h: "4. Delivery",
      body: [
        "We deliver within our service areas in Islamabad and Rawalpindi. Delivery times are estimates and can be longer at busy times, in bad weather or because of traffic.",
        "Someone should be available to receive the order. If a rider cannot reach you at the address given, the order may be treated as delivered.",
      ],
    },
    {
      h: "5. Cancellations",
      body: ["You can cancel free of charge before we start preparing your food. After that, cancellation is at the branch's discretion because the food has already been made."],
    },
    {
      h: "6. Allergies and dietary needs",
      body: ["Our kitchens handle nuts, dairy, gluten, eggs and other allergens. We cannot guarantee that any dish is allergen-free. Please tell us about allergies when you order."],
    },
    {
      h: "7. Website use",
      body: [
        "All content on this website, including our name, logo, photos and text, belongs to Shah G Foods. Do not copy or reuse it without permission.",
        "Do not misuse the website, submit false information or interfere with how it works.",
      ],
    },
    {
      h: "8. Liability",
      body: ["To the extent the law allows, our liability for any order is limited to the amount you paid for it. Nothing in these terms limits rights you have under Pakistani consumer protection law."],
    },
    {
      h: "9. Governing law and contact",
      body: [`These terms are governed by the laws of Pakistan, and the courts of Islamabad have jurisdiction. ${CONTACT}`],
    },
  ],
};

/* ---------------- REFUND ---------------- */
export const REFUND: LegalDoc = {
  badge: "LEGAL · REFUNDS",
  title: "Refund Policy",
  updated: UPDATED,
  intro: "We want every meal to be right. If something is wrong with your order, tell us and we will fix it.",
  sections: [
    {
      h: "1. When we offer a replacement or refund",
      body: [
        "A dish is missing, or you received the wrong item.",
        "The food is spoiled, undercooked or has a quality problem.",
        "Your order did not arrive.",
      ],
    },
    {
      h: "2. How to report a problem",
      body: [
        "Contact us within 2 hours of delivery. Share your name, phone number, the branch and what went wrong. A photo of the food helps us resolve it faster.",
        `Report it on the Contact page, or ${CONTACT.charAt(0).toLowerCase() + CONTACT.slice(1)}`,
      ],
    },
    {
      h: "3. How we resolve it",
      body: [
        "Depending on the issue, we will send a replacement, give you credit on your next order, or refund the affected items.",
        "Cash refunds are returned by the branch or rider, or by bank transfer, usually within 7 working days.",
      ],
    },
    {
      h: "4. What is not covered",
      body: [
        "Changes of mind after the food has been prepared.",
        "Delays caused by an incorrect address or an unreachable phone number.",
        "Complaints about taste preference where the dish was made as described.",
      ],
    },
  ],
};
