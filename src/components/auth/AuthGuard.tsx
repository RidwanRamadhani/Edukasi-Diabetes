"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { HeartPulse, Lock, Stethoscope } from "lucide-react";
import { useDiabetesStore } from "@/lib/storage";
import { AuthView } from "@/components/auth/AuthView";
import { DoctorLoginView } from "@/components/auth/DoctorLoginView";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isDoctorAuthenticated, isLoaded } = useDiabetesStore();
  const pathname = usePathname();

  // Loading state while checking localStorage session
  if (!isLoaded) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
        <HeartPulse className="w-10 h-10 text-emerald-600 animate-pulse" />
        <p className="text-xs text-slate-500 font-medium">Memuat sistem autentikasi DIASERA...</p>
      </div>
    );
  }

  // If already on auth pages or public feature pages, always render them
  if (
    pathname === "/auth" ||
    pathname === "/auth/doctor-login" ||
    pathname.startsWith("/progres-saya") ||
    pathname.startsWith("/education") ||
    pathname.startsWith("/risk-check") ||
    pathname.startsWith("/calculator") ||
    pathname.startsWith("/meals")
  ) {
    return <>{children}</>;
  }

  // 1. Guard for Doctor Dashboard (/doctor-dashboard)
  if (pathname.startsWith("/doctor-dashboard")) {
    if (!isDoctorAuthenticated) {
      return (
        <div className="py-2 space-y-4 animate-in fade-in duration-300">
          <div className="max-w-xl mx-auto p-4 rounded-2xl bg-teal-50 border border-teal-200 text-teal-900 text-xs flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-teal-200 text-teal-900 flex items-center justify-center shrink-0">
              <Stethoscope className="w-5 h-5 text-teal-800" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">Autentikasi Dokter Diperlukan</p>
              <p className="text-[11px] text-teal-800 leading-relaxed">
                Halaman Dashboard Dokter hanya dapat diakses oleh akun tenaga medis terverifikasi.
                Silakan masuk dengan akun dokter Anda.
              </p>
            </div>
          </div>
          <DoctorLoginView />
        </div>
      );
    }
    return <>{children}</>;
  }

  // 2. Guard for Patient Pages (/dashboard, /risk-check, /activity-tracker, etc.)
  if (!isAuthenticated && !isDoctorAuthenticated) {
    return (
      <div className="py-2 space-y-4 animate-in fade-in duration-300">
        <div className="max-w-xl mx-auto p-4 rounded-2xl bg-amber-50 border border-amber-200/90 text-amber-900 text-xs flex items-center gap-3 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-amber-200/60 text-amber-800 flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-slate-900 text-sm">Akses Fitur Terproteksi</p>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Anda harus masuk ke akun pengguna terlebih dahulu atau mendaftar akun baru untuk mengakses seluruh menu DIASERA.
            </p>
          </div>
        </div>

        <AuthView />
      </div>
    );
  }

  // If authenticated, grant access
  return <>{children}</>;
}
