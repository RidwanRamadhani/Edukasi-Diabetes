import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DIASERA — Edukasi Diabetes & Hidup Sehat",
    short_name: "DIASERA",
    description:
      "Media Edukasi Interaktif & Pemantauan Perilaku Hidup Sehat untuk Pencegahan serta Pengendalian Diabetes Melitus",
    start_url: "/",
    display: "standalone",
    background_color: "#0f766e",
    theme_color: "#0f766e",
    orientation: "portrait",
    categories: ["health", "lifestyle", "medical"],
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
