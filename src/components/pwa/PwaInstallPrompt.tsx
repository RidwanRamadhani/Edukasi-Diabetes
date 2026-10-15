"use client";

import { useEffect, useState } from "react";
import { Download, Smartphone, X, CheckCircle2, ChevronRight, Share2, HelpCircle } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);

  useEffect(() => {
    // Register Service Worker for offline PWA support
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(console.error);
    }

    // Check if app is already running in standalone PWA / WebAPK mode
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true
    ) {
      setIsInstalled(true);
      return;
    }

    // Capture Chrome's beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Check if user dismissed banner recently
      const dismissed = localStorage.getItem("diasera_pwa_dismissed");
      if (!dismissed) {
        setShowBanner(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setShowBanner(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        setShowBanner(false);
      }
      setDeferredPrompt(null);
    } else {
      // If event not ready or on iOS/manual browser, open instructions modal
      setShowGuideModal(true);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem("diasera_pwa_dismissed", "true");
  };

  if (isInstalled) return null;

  return (
    <>
      {/* Floating Bottom Banner on Mobile / Chrome */}
      {showBanner && (
        <aside
          aria-label="Pemasangan Aplikasi DIASERA"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-gradient-to-r from-teal-900 to-emerald-900 text-white p-4 rounded-2xl shadow-2xl border border-teal-500/40 animate-in slide-in-from-bottom duration-300 backdrop-blur-md"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-teal-200 shrink-0">
              <Smartphone className="w-6 h-6 animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white tracking-tight">
                  Pasang DIASERA di HP
                </h4>
                <button
                  onClick={handleDismiss}
                  className="text-teal-200 hover:text-white p-1 rounded-md transition-colors"
                  aria-label="Tutup notifikasi pasang aplikasi"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-teal-100/90 mt-0.5 leading-snug">
                Buka langsung seperti aplikasi APK di layar utama HP Anda tanpa perlu masuk browser.
              </p>
              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={handleInstallClick}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Pasang Sekarang</span>
                </button>
                <button
                  onClick={() => setShowGuideModal(true)}
                  className="text-xs text-teal-200 hover:text-white font-medium underline px-1 py-1 transition-colors cursor-pointer"
                >
                  Petunjuk
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Guide Modal: Cara Install / Pasang dari Google Chrome */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                  <Smartphone className="w-5 h-5 text-teal-700" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Cara Pasang Aplikasi di HP
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Langsung dari Google Chrome (Tanpa Play Store)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowGuideModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
                <p className="font-bold flex items-center gap-1.5 text-xs text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Teknologi Resmi WebAPK Google Chrome
                </p>
                <p className="text-[11px] leading-relaxed text-emerald-800">
                  Aplikasi akan otomatis terpasang di menu utama HP, hemat kuota dan memori (hanya &plusmn; 2 MB), serta terbuka dalam mode layar penuh tanpa kolom URL browser.
                </p>
              </div>

              <div className="space-y-2.5 pt-1">
                <p className="font-bold text-slate-800">Langkah-langkah Mudah di HP Android:</p>

                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="w-6 h-6 rounded-full bg-teal-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    1
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">Buka Web di Google Chrome</p>
                    <p className="text-[11px] text-slate-500">
                      Pastikan Anda membuka alamat <strong>edukasidiabetes.vercel.app</strong> di browser Chrome HP.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="w-6 h-6 rounded-full bg-teal-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    2
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">Tekan Titik Tiga (⋮) di Kanan Atas</p>
                    <p className="text-[11px] text-slate-500">
                      Klik ikon menu <strong>titik tiga (⋮)</strong> yang ada di pojok kanan atas browser Google Chrome.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="w-6 h-6 rounded-full bg-teal-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    3
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">
                      Pilih &quot;Tambahkan ke Layar Utama&quot; / &quot;Pasang Aplikasi&quot;
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Pilih opsi <strong>&quot;Tambahkan ke Layar Utama&quot;</strong> atau <strong>&quot;Pasang aplikasi DIASERA&quot;</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    4
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">Selesai!</p>
                    <p className="text-[11px] text-slate-500">
                      Aplikasi DIASERA langsung terinstal di layar utama HP Anda dengan logo resmi toska dan siap digunakan kapan pun.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  if (deferredPrompt) {
                    deferredPrompt.prompt();
                  }
                  setShowGuideModal(false);
                }}
                className="w-full py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-md transition-colors cursor-pointer"
              >
                Tutup &amp; Coba Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
