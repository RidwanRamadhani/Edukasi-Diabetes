import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "DIASERA — Edukasi Diabetes & Hidup Sehat",
    short_name: "DIASERA",
    description:
      "Media Edukasi Interaktif & Pemantauan Perilaku Hidup Sehat untuk Pencegahan serta Pengendalian Diabetes Melitus",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0f766e",
    theme_color: "#0f766e",
    orientation: "portrait",
    lang: "id",
    dir: "ltr",
    categories: ["health", "lifestyle", "medical", "education"],
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
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
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/screenshot-desktop.png",
        sizes: "1280x720",
        type: "image/png",
        form_factor: "wide",
        label: "Tampilan Desktop DIASERA",
      },
      {
        src: "/screenshot-mobile.png",
        sizes: "720x1280",
        type: "image/png",
        form_factor: "narrow",
        label: "Tampilan Mobile DIASERA",
      },
    ],
    shortcuts: [
      {
        name: "Skrining FINDRISC",
        short_name: "Skrining",
        description: "Cek risiko diabetes mandiri",
        url: "/skrining",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Progres Saya",
        short_name: "Progres",
        description: "Pantau kepatuhan hidup sehat",
        url: "/progres",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
    ],
  };
}
