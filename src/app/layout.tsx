import { Suspense } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { DiabetesProvider } from "@/components/providers/DiabetesProvider";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { DoctorWhatsAppFloatingButton } from "@/components/whatsapp/DoctorWhatsAppFloatingButton";
import { PwaInstallPrompt } from "@/components/pwa/PwaInstallPrompt";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DIASERA — Media Edukasi Interaktif & Pemantauan Perilaku Hidup Sehat untuk Pencegahan serta Pengendalian Diabetes Melitus",
  description:
    "Website DIASERA: Media edukasi interaktif terverifikasi dokter, skrining cek risiko diabetes FINDRISC, dan pemantauan perilaku hidup sehat mandiri untuk pencegahan serta pengendalian Diabetes Melitus.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "DIASERA",
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  themeColor: "#0f766e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50/60 text-slate-800 font-sans">
        <DiabetesProvider>
          <Suspense fallback={null}>
            <Navbar />
          </Suspense>
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <Suspense fallback={null}>
              <AuthGuard>{children}</AuthGuard>
            </Suspense>
          </main>
          <DoctorWhatsAppFloatingButton />
          <PwaInstallPrompt />
          <footer className="w-full border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-500">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="font-medium text-slate-600">
                © 2026 DIASERA — Media Edukasi Interaktif &amp; Pemantauan Perilaku Hidup Sehat
              </p>
              <p className="text-[11px] text-slate-600">
                Pencegahan serta Pengendalian Diabetes Melitus • Sesuai Pedoman Klinis Kemenkes RI &amp; PERKENI
              </p>
            </div>
          </footer>
        </DiabetesProvider>
      </body>
    </html>
  );
}
