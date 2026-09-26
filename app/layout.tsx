import type { Metadata, Viewport } from "next";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import { AppProvider } from "@/components/AppProvider";
import Overlays from "@/components/Overlays";
import { BRANCHES, ORDER_TEL, branchSlug } from "@/lib/data";
import { SITE_URL, PUBLIC_EMAIL } from "@/lib/copy";

const DESCRIPTION =
  "Shah G Foods is the home of the famous Daal Chawal in Islamabad and Rawalpindi. Order biryani, karahi, charcoal BBQ, rolls, chaat and chai from 40 branches, open daily 8 AM to 2 AM. Call or WhatsApp to order.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Shah G Foods | Famous Daal Chawal, Karahi & BBQ in Islamabad & Rawalpindi",
    template: "%s | Shah G Foods",
  },
  description: DESCRIPTION,
  applicationName: "Shah G Foods",
  keywords: [
    "Shah G Foods",
    "Shah G Food",
    "Shah Gee Foods",
    "Shah Ji Foods",
    "Shahji Foods",
    "Shah G Foods Islamabad",
    "Shah G Foods Rawalpindi",
    "Shah G Foods menu",
    "Shah G Foods F-10",
    "Shah G daal chawal",
    "best daal chawal Islamabad",
    "desi food Islamabad",
    "desi food Rawalpindi",
    "biryani Islamabad",
    "karahi Islamabad",
    "BBQ Islamabad",
    "food delivery Islamabad",
    "food delivery Rawalpindi",
  ],
  authors: [{ name: "Shah G Foods" }],
  creator: "Shah G Foods",
  publisher: "Shah G Foods",
  category: "Food & Drink",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: SITE_URL,
    siteName: "Shah G Foods",
    title: "Shah G Foods | Famous Daal Chawal in Islamabad & Rawalpindi",
    description: DESCRIPTION,
    images: [{ url: "/Shahgfoods__Feature.jpg", alt: "Shah G Foods, desi restaurant in Islamabad and Rawalpindi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shah G Foods | Famous Daal Chawal in Islamabad & Rawalpindi",
    description: DESCRIPTION,
    images: ["/Shahgfoods__Feature.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#C1272D",
  width: "device-width",
  initialScale: 1,
};

// Restaurant structured data (JSON-LD) so Google can identify the business and its branches
const PHONE = ORDER_TEL;
const SAME_AS = ["https://www.facebook.com/profile.php?id=61592033124593", "https://www.instagram.com/shahgfoodsofficial/"];
const restaurant = {
  "@type": "Restaurant",
  "@id": `${SITE_URL}/#restaurant`,
  name: "Shah G Foods",
  alternateName: ["Shah G Food", "Shah Gee Foods", "Shah Ji Foods", "Shahji Foods"],
  description: DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/Shahgfoods__Feature.jpg`,
  logo: `${SITE_URL}/Shahglogo.png`,
  telephone: PHONE,
  email: PUBLIC_EMAIL,
  servesCuisine: ["Pakistani", "Desi", "BBQ", "Fast Food"],
  priceRange: "Rs 100–2000",
  currenciesAccepted: "PKR",
  paymentAccepted: "Cash",
  openingHours: "Mo-Su 08:00-02:00",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "08:00",
      closes: "02:00",
    },
  ],
  areaServed: [
    { "@type": "City", name: "Islamabad" },
    { "@type": "City", name: "Rawalpindi" },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "F-10/4 Markaz",
    addressLocality: "Islamabad",
    addressRegion: "Islamabad Capital Territory",
    postalCode: "44000",
    addressCountry: "PK",
  },
  geo: { "@type": "GeoCoordinates", latitude: 33.6975, longitude: 73.0119 },
  hasMenu: `${SITE_URL}/menu`,
  acceptsReservations: false,
  // every branch as its own location so Google knows all of them
  department: BRANCHES.map((b) => ({
    "@type": "Restaurant",
    name: `Shah G Foods ${b.name}`,
    image: `${SITE_URL}/Shahglogo.png`,
    url: `${SITE_URL}/branches/${branchSlug(b.name)}`,
    telephone: PHONE,
    servesCuisine: ["Pakistani", "Desi", "BBQ"],
    priceRange: "Rs 100–2000",
    openingHours: "Mo-Su 08:00-02:00",
    address: {
      "@type": "PostalAddress",
      streetAddress: b.address,
      addressLocality: b.city,
      addressRegion: b.city === "Rawalpindi" ? "Punjab" : "Islamabad Capital Territory",
      addressCountry: "PK",
    },
    geo: { "@type": "GeoCoordinates", latitude: b.lat, longitude: b.lng },
  })),
  sameAs: SAME_AS,
};

// WebSite schema is what Google reads for the site name shown above results
// ("Shah G Foods" instead of "shahgfood.com"). Kept as its own block, exactly
// in the shape Google documents: https://developers.google.com/search/docs/appearance/site-names
const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Shah G Foods",
  alternateName: ["Shah G Food", "Shah Gee Foods", "Shah Ji Foods", "shahgfood.com"],
  url: `${SITE_URL}/`,
  inLanguage: "en-PK",
  publisher: { "@id": `${SITE_URL}/#restaurant` },
};

const restaurantLd = { "@context": "https://schema.org", ...restaurant };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Google AdSense (publisher ca-pub-4077671965859493) */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4077671965859493" crossOrigin="anonymous" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantLd) }} />
      </head>
      <body suppressHydrationWarning>
        <AppProvider>
          {children}
          <Overlays />
        </AppProvider>
      </body>
    </html>
  );
}
