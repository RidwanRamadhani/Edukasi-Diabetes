"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  FileCheck2,
  KeyRound,
  Lock,
  LogIn,
  Mail,
  ShieldCheck,
  Stethoscope,
  UserCheck,
  Users,
} from "lucide-react";
import { useDiabetesStore } from "@/lib/storage";

export function DoctorLoginView() {
  const router = useRouter();
  const { doctorLogin, isDoctorAuthenticated, activeDoctor, doctorLogout } = useDiabetesStore();

  const [identifier, setIdentifier] = useState("dr.ridwan@diacare.med");
  const [password, setPassword] = useState("doctor123");
  const [showPassword, setShowPassword] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!identifier.trim() || !password.trim()) {
      setErrorMsg("Harap masukkan email/STR dan kata sandi dokter.");
      return;
    }

    const res = doctorLogin(identifier, password);
    if (res.success) {
      setSuccessMsg(res.message);
      setTimeout(() => {
        router.push("/doctor-dashboard");
      }, 1200);
    } else {
      setErrorMsg(res.message);
    }
  };

  const fillDoctorDemo = (email: string) => {
    setIdentifier(email);
    setPassword("doctor123");
    setErrorMsg("");
  };

  return (
    <div className="max-w-xl mx-auto my-4 sm:my-8 px-2">
      {/* Jika dokter sudah login */}
      {isDoctorAuthenticated && activeDoctor && (
        <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-teal-50 border border-teal-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              {activeDoctor.avatarInitials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-teal-200 text-teal-900 font-bold px-2 py-0.5 rounded-full">
                  Dokter Terautentikasi
                </span>
                <span className="text-[11px] text-teal-700 font-mono">{activeDoctor.strNumber}</span>
              </div>
              <p className="text-sm font-bold text-slate-900 mt-0.5">{activeDoctor.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Link
              href="/doctor-dashboard"
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <span>Buka Dashboard Dokter</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={() => {
                doctorLogout();
                setSuccessMsg("Sesi dokter telah dinonaktifkan.");
                setTimeout(() => setSuccessMsg(""), 3500);
              }}
              className="px-3 py-2 rounded-xl bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-xs font-semibold text-rose-600 transition-colors cursor-pointer"
            >
              Keluar
            </button>
          </div>
        </div>
      )}

      {/* Main Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden">
        {/* Top Medical Banner */}
        <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 p-6 sm:p-8 text-white text-center relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-teal-500/20 border border-teal-400/30 backdrop-blur-md mx-auto flex items-center justify-center mb-3 text-teal-300 shadow-inner">
              <Stethoscope className="w-8 h-8" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-[10px] font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Portal Tenaga Medis &amp; Dokter Spesialis</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Dia<span className="text-teal-400">Care</span> Medical Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md mx-auto leading-relaxed">
              Autentikasi verifikasi klinis, antrean peer-review artikel edukasi, dan pemantauan gula darah pasien
            </p>
          </div>
        </div>

        {/* Security Rule Bar */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200/80 text-xs text-slate-600 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span>Akses Dibatasi: Role Tenaga Medis Terdaftar (STR Aktif)</span>
          </div>
          <Link
            href="/auth"
            className="text-xs text-emerald-700 hover:text-emerald-800 font-bold hover:underline"
          >
            Portal Pasien &rarr;
          </Link>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-5">
          {successMsg && (
            <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-teal-950 text-xs font-semibold flex items-center gap-2.5 shadow-xs animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-semibold flex items-center gap-2.5 shadow-xs animate-in fade-in">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email / Nomor STR Dokter <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Contoh: dr.ridwan@diacare.med atau STR-3171-8842-2024"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Kata Sandi Tenaga Medis <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi dokter"
                  required
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  title={showPassword ? "Sembunyikan sandi" : "Tampilkan sandi"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Quick Doctor Login Buttons */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                Akun Dokter Terverifikasi (Pilihan Cepat Pengujian):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => fillDoctorDemo("dr.ridwan@diacare.med")}
                  className="text-left p-2.5 rounded-xl bg-white border border-teal-200/80 hover:bg-teal-50 text-xs transition-colors cursor-pointer"
                >
                  <p className="font-bold text-teal-900">dr. Ridwan Ramadhani, Sp.PD</p>
                  <p className="text-[10px] text-slate-500 font-mono">dr.ridwan@diacare.med</p>
                </button>

                <button
                  type="button"
                  onClick={() => fillDoctorDemo("dr.handoko@diacare.med")}
                  className="text-left p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-xs transition-colors cursor-pointer"
                >
                  <p className="font-bold text-slate-800">dr. Handoko Santoso, Sp.PD</p>
                  <p className="text-[10px] text-slate-500 font-mono">dr.handoko@diacare.med</p>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-3 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-teal-700/20 flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.01]"
            >
              <LogIn className="w-4 h-4" />
              <span>Masuk ke Dashboard Dokter</span>
            </button>
          </form>

          {/* Bottom Security Card */}
          <div className="pt-3 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Bukan tenaga medis?{" "}
              <Link href="/auth" className="text-emerald-700 font-bold hover:underline">
                Masuk sebagai Pasien Diabetes
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
