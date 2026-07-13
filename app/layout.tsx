import type { Metadata, Viewport } from "next";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import { AppProvider } from "@/components/AppProvider";
import Overlays from "@/components/Overlays";
import { BRANCHES, branchSlug } from "@/lib/data";

const SITE_URL = "https://shahgfood.com";
const DESCRIPTION =
  "Order legendary Daal Chawal, biryani, karahi, BBQ, rolls, chaat and desi chai from Shah G Foods. Fast delivery across 35+ branches in Islamabad & Rawalpindi.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Shah G Foods — Desi Comfort Food Delivery | Islamabad & Rawalpindi",
    template: "%s | Shah G Foods",
  },
  description: DESCRIPTION,
  applicationName: "Shah G Foods",
  keywords: [
    "Shah G Foods",
    "Daal Chawal",
    "food delivery Islamabad",
    "food delivery Rawalpindi",
    "biryani delivery",
    "karahi",
    "desi food",
    "Pakistani food online order",
    "BBQ Islamabad",
    "paratha roll",
    "chaat",
    "desi chai",
  ],
  authors: [{ name: "Shah G Foods" }],
  creator: "Shah G Foods",
  publisher: "Shah G Foods",
  category: "Food & Drink",
  alternates: {
    canonical: "/",
    languages: {
      "en-PK": "/",
      "ur-PK": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: SITE_URL,
    siteName: "Shah G Foods",
    title: "Shah G Foods — The legendary Daal Chawal, delivered hot.",
    description: DESCRIPTION,
    images: [
      {
        url: "/Shahglogo.png",
        width: 1200,
        height: 630,
        alt: "Shah G Foods — desi comfort food",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shah G Foods — The legendary Daal Chawal, delivered hot.",
    description: DESCRIPTION,
    images: ["/Shahglogo.png"],
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

// Local-business structured data (JSON-LD) — helps Google identify & rank the real site
const PHONE = "+923307862992";
const restaurant = {
  "@type": "Restaurant",
  "@id": `${SITE_URL}/#restaurant`,
  name: "Shah G Foods",
  alternateName: ["Shah G Food", "Shah Gee Foods"],
  description: DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/Shahglogo.png`,
  logo: `${SITE_URL}/Shahglogo.png`,
  telephone: PHONE,
  servesCuisine: ["Pakistani", "Desi", "BBQ", "Fast Food"],
  priceRange: "Rs 100–2000",
  currenciesAccepted: "PKR",
  paymentAccepted: "Cash, Credit Card, Debit Card",
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
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "15000",
    bestRating: "5",
    worstRating: "1",
  },
  sameAs: ["https://www.facebook.com/profile.php?id=61592033124593", "https://www.instagram.com/shahgfoodsofficial/"],
};

// WebSite schema tells Google the site name → shows "Shah G Foods" (not the URL) in results
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Shah G Foods",
      alternateName: ["Shah G Food", "Shah Gee Foods", "Shah G"],
      inLanguage: "en-PK",
      publisher: { "@id": `${SITE_URL}/#restaurant` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Shah G Foods",
      alternateName: ["Shah G Food", "Shah Gee Foods"],
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/Shahglogo.png` },
      sameAs: ["https://www.facebook.com/profile.php?id=61592033124593", "https://www.instagram.com/shahgfoodsofficial/"],
    },
    restaurant,
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Noto+Nastaliq+Urdu:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
