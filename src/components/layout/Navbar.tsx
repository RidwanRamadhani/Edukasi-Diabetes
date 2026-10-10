"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BookOpen,
  Calculator,
  CalendarDays,
  FileCheck2,
  HeartPulse,
  LayoutDashboard,
  UserCheck,
  Menu,
  X,
  LogIn,
  LogOut,
  ShieldCheck,
  Lock,
  Stethoscope,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useDiabetesStore } from "@/lib/storage";

const patientNavItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Cek Risiko DM", href: "/risk-check", icon: ShieldCheck },
  { name: "Pantau Aktivitas", href: "/activity-tracker", icon: Activity },
  { name: "Edukasi Interaktif", href: "/education", icon: BookOpen },
  { name: "Kalkulator Glikemik", href: "/calculator", icon: Calculator },
  { name: "Menu Sehat", href: "/meals", icon: CalendarDays },
  { name: "Profil Saya", href: "/profile", icon: UserCheck },
];

const doctorNavItems = [
  { name: "Dashboard Dokter", href: "/doctor-dashboard", icon: LayoutDashboard },
  { name: "Antrean Peer Review", href: "/doctor-dashboard", icon: FileCheck2 },
  { name: "Monitoring Pengguna", href: "/doctor-dashboard", icon: Users },
  { name: "Edukasi Medis", href: "/education", icon: BookOpen },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    profile,
    isAuthenticated,
    logout,
    isDoctorAuthenticated,
    activeDoctor,
    doctorLogout,
  } = useDiabetesStore();

  const initials = profile.name
    ? profile.name
        .split(" ")
        .filter(Boolean)
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "P";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-emerald-100 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo & Brand */}
          <Link
            href={
              isDoctorAuthenticated
                ? "/doctor-dashboard"
                : isAuthenticated
                ? "/dashboard"
                : "/auth"
            }
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <HeartPulse className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl text-slate-900 tracking-tight">
                  DIA<span className="text-emerald-600">SERA</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {isDoctorAuthenticated ? "Portal Dokter" : "Pencegahan & Pengendalian"}
                </span>
              </div>
              <p className="text-[11px] text-slate-700 font-medium hidden sm:block">
                Edukasi Interaktif &amp; Pantau Hidup Sehat
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {isDoctorAuthenticated ? (
              doctorNavItems.map((item, idx) => {
                const Icon = item.icon;
                const isActive = pathname === item.href && idx === 0;
                return (
                  <Link
                    key={`${item.name}-${idx}`}
                    href={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-teal-50 text-teal-800 font-semibold shadow-xs"
                        : "text-slate-600 hover:text-teal-700 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-teal-700" : "text-slate-500"}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })
            ) : isAuthenticated ? (
              patientNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-emerald-50 text-emerald-700 font-semibold shadow-xs"
                        : "text-slate-600 hover:text-emerald-600 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-emerald-600" : "text-slate-500"}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })
            ) : (
              <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 border border-slate-200/80 px-3.5 py-1.5 rounded-full">
                <Lock className="w-3.5 h-3.5 text-amber-600" />
                <span>Portal Terkunci • Masuk akun pasien atau dokter di bawah</span>
              </div>
            )}
          </nav>

          {/* User Profile Mini Badge & Auth Status */}
          <div className="hidden sm:flex items-center gap-2.5">
            {isDoctorAuthenticated && activeDoctor ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/doctor-dashboard"
                  className="flex items-center gap-2.5 pl-3 pr-4 py-1.5 rounded-full border border-teal-200 bg-teal-50/80 hover:bg-teal-100/70 transition-all text-left"
                >
                  <div className="w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-teal-950 leading-tight">
                      {activeDoctor.name}
                    </p>
                    <p className="text-[10px] text-teal-700 font-medium">
                      {activeDoctor.specialization} • Dashboard
                    </p>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => doctorLogout()}
                  className="p-2 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Keluar dari sesi dokter"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/profile"
                  className="flex items-center gap-2.5 pl-3 pr-4 py-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-emerald-50/50 hover:border-emerald-200 transition-all text-left"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                    {initials}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800 leading-tight">{profile.name}</p>
                    <p className="text-[10px] text-emerald-600 font-medium">{profile.healthGoal || "Pencegahan Primer"} • Terpantau</p>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => logout()}
                  className="p-2 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Keluar dari akun saat ini"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Masuk Pasien</span>
                </Link>
                <Link
                  href="/auth/doctor-login"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-teal-300 bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold transition-colors"
                >
                  <Stethoscope className="w-3.5 h-3.5 text-teal-700" />
                  <span>Portal Dokter</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-emerald-100 bg-white px-4 pt-2 pb-5 space-y-1 shadow-lg">
          {isDoctorAuthenticated && activeDoctor ? (
            <>
              <div className="p-3 mb-2 bg-teal-50 rounded-xl flex items-center justify-between border border-teal-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-teal-700 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-teal-950">{activeDoctor.name}</p>
                    <p className="text-xs text-teal-700 font-medium">
                      {activeDoctor.specialization} • STR Aktif
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    doctorLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold px-2.5 py-1 rounded-lg"
                >
                  Keluar
                </button>
              </div>

              {doctorNavItems.map((item, idx) => {
                const Icon = item.icon;
                const isActive = pathname === item.href && idx === 0;
                return (
                  <Link
                    key={`mobile-doc-${item.name}-${idx}`}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-teal-700 text-white font-semibold shadow-xs"
                        : "text-slate-700 hover:bg-teal-50"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-teal-700"}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </>
          ) : isAuthenticated ? (
            <>
              <div className="p-3 mb-2 bg-emerald-50/80 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{profile.name}</p>
                    <p className="text-xs text-emerald-700">{profile.healthGoal || "Pencegahan Primer"}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs bg-rose-100 hover:bg-rose-200 text-rose-700 font-semibold px-2.5 py-1 rounded-lg"
                >
                  Keluar
                </button>
              </div>

              {patientNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-emerald-600 text-white font-semibold"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-500"}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </>
          ) : (
            <div className="p-4 space-y-3">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Silakan masuk atau daftar akun baru untuk membuka menu navigasi.</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Portal Pasien</span>
                </Link>
                <Link
                  href="/auth/doctor-login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 bg-teal-50 hover:bg-teal-100 border border-teal-300 text-teal-800 text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs"
                >
                  <Stethoscope className="w-4 h-4 text-teal-700" />
                  <span>Portal Dokter</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
