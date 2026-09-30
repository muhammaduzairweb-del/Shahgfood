// ===== Sale listing details (one place to change the price or wording) =====

const SALE_EMAIL_ADDRESS = "muhammaduzair.web@gmail.com";

const rs = (n: number) => "Rs " + n.toLocaleString("en-US");

/** One price for everything: the domain, the website, the code and the traffic. */
export const PACKAGE_PRICE_NUM = 900000;
export const PACKAGE_PRICE = rs(PACKAGE_PRICE_NUM);

/** Live GoDaddy search page for the domain, so buyers can check ownership themselves. */
export const GODADDY_LISTING_URL = "https://www.godaddy.com/domainsearch/find?domainToCheck=shahgfood.com";

/** Date the Search Console numbers on the sale page were taken. */
export const TRAFFIC_AS_OF = "26 September 2026";

function template() {
  const subject = "Interested in buying shahgfood.com (domain + website)";
  const body = [
    "Hello,",
    "",
    `I saw shahgfood.com is for sale and I am interested in the exclusive Shah G Foods owners' package: the domain and the website (${PACKAGE_PRICE}).`,
    "",
    "My details:",
    "Name: ",
    "Business name: ",
    "Phone / WhatsApp: ",
    "",
    "Please share the next steps for the purchase and handover.",
    "",
    "Thank you",
  ].join("\n");
  return { subject, body };
}

/** Seller's WhatsApp for purchase enquiries. */
export const SALE_WHATSAPP_DISPLAY = "+971 50 698 9552";
const SALE_WHATSAPP_NUMBER = "971506989552"; // wa.me format: country code + number, no + or spaces

/** Opens a WhatsApp chat with the seller, message pre-filled. */
export function whatsappLink(): string {
  const msg = `Hello! I saw that shahgfood.com is for sale and I am interested in the exclusive Shah G Foods owners' package: the domain and the website (${PACKAGE_PRICE}). Please share the next steps.\n\nName: \nBusiness name: `;
  return `https://wa.me/${SALE_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

/** Opens Gmail's compose window in the browser with everything pre-filled. */
export function gmailLink(): string {
  const { subject, body } = template();
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(SALE_EMAIL_ADDRESS)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Same message for a phone or desktop email app. */
export function mailtoLink(): string {
  const { subject, body } = template();
  return `mailto:${SALE_EMAIL_ADDRESS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
