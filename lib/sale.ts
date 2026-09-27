// ===== Sale listing details (one place to change prices or wording) =====

const SALE_EMAIL_ADDRESS = "muhammaduzair.web@gmail.com";

const rs = (n: number) => "Rs " + n.toLocaleString("en-US");

/** Website package: code, SEO, pages, features and handover. */
export const WEBSITE_PRICE_NUM = 180000;
/** The domain's listing price on GoDaddy's premium domain marketplace. */
export const DOMAIN_PRICE_NUM = 4215852;

export const WEBSITE_PRICE = rs(WEBSITE_PRICE_NUM);
export const GODADDY_LISTING_PRICE = rs(DOMAIN_PRICE_NUM);
export const BUNDLE_PRICE = rs(WEBSITE_PRICE_NUM + DOMAIN_PRICE_NUM);

/** Live GoDaddy search page for the domain, so buyers can check the listing themselves. */
export const GODADDY_LISTING_URL = "https://www.godaddy.com/domainsearch/find?domainToCheck=shahgfood.com";

/** Where the GoDaddy listing screenshot lives (public/). */
export const GODADDY_SCREENSHOT = "/godaddy-listing.webp";

/** Date the Search Console numbers on the sale page were taken. */
export const TRAFFIC_AS_OF = "26 September 2026";

function template() {
  const subject = "Interested in buying shahgfood.com (domain + website)";
  const body = [
    "Hello,",
    "",
    `I saw shahgfood.com is for sale and I am interested in the complete package: the domain and the website (${BUNDLE_PRICE}).`,
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
