import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { DiabetesProvider } from "@/components/providers/DiabetesProvider";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { DoctorWhatsAppFloatingButton } from "@/components/whatsapp/DoctorWhatsAppFloatingButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DiaCare — Aplikasi Edukasi dan Manajemen Kesehatan Diabetes",
  description:
    "Platform manajemen mandiri diabetes terintegrasi: pencatatan gula darah, kalkulator indeks & beban glikemik, serta edukasi terverifikasi dokter spesialis.",
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
          <Navbar />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <AuthGuard>{children}</AuthGuard>
          </main>
          <DoctorWhatsAppFloatingButton />
          <footer className="w-full border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-500">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="font-medium text-slate-600">
                © 2026 DiaCare — Edukasi &amp; Manajemen Mandiri Diabetes
              </p>
              <p className="text-[11px] text-slate-600">
                Diverifikasi Klinis sesuai Pedoman PERKENI (Perkumpulan Endokrinologi Indonesia)
              </p>
            </div>
          </footer>
        </DiabetesProvider>
      </body>
    </html>
  );
}
