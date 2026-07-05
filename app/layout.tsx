import type { Metadata, Viewport } from "next";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import { AppProvider } from "@/components/AppProvider";
import Overlays from "@/components/Overlays";
import DevBanner from "@/components/DevBanner";

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
  icons: {
    icon: "/Shahglogo.png",
    apple: "/Shahglogo.png",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#C1272D",
  width: "device-width",
  initialScale: 1,
};

// Restaurant structured data (JSON-LD) for rich results
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Shah G Foods",
  description: DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/Shahglogo.png`,
  logo: `${SITE_URL}/Shahglogo.png`,
  servesCuisine: ["Pakistani", "Desi", "BBQ", "Fast Food"],
  priceRange: "Rs. 20 – Rs. 1550",
  openingHours: "Mo-Su 11:00-02:00",
  areaServed: ["Islamabad", "Rawalpindi"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "F-10/4",
    addressLocality: "Islamabad",
    addressRegion: "Islamabad Capital Territory",
    addressCountry: "PK",
  },
  sameAs: ["https://www.facebook.com/shah.g.foods.627153/", "https://www.instagram.com/shahgfoodsofficial/"],
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
          <DevBanner />
          {children}
          <Overlays />
        </AppProvider>
      </body>
    </html>
  );
}
