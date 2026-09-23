import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shah G Foods",
    short_name: "Shah G Foods",
    description: "Shah G Foods: famous Daal Chawal, karahi, BBQ and desi food delivered across Islamabad and Rawalpindi.",
    start_url: "/",
    display: "standalone",
    background_color: "#F2ECE1",
    theme_color: "#C1272D",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
