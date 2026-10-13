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
  HeartPulse,
  KeyRound,
  Lock,
  LogIn,
  Mail,
  ShieldCheck,
  User,
  UserPlus,
  Sparkles,
  LogOut,
  Stethoscope,
  Phone,
  Database,
  Loader2,
} from "lucide-react";
import { useDiabetesStore } from "@/lib/storage";
import { HealthGoal } from "@/types";

export function AuthView() {
  const router = useRouter();
  const {
    login,
    register,
    logout,
    profile,
    isAuthenticated,
    registeredUsers,
    isCloudDbConnected,
  } = useDiabetesStore();

  const [tab, setTab] = useState<"login" | "register">("login");

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register form state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regHealthGoal, setRegHealthGoal] = useState<HealthGoal>(
    "Pencegahan Primer (Belum Kena DM)"
  );
  const [regAge, setRegAge] = useState<number>(35);
  const [regGender, setRegGender] = useState<"Laki-laki" | "Perempuan">("Laki-laki");
  const [regPhone, setRegPhone] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Alert feedback
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setErrorMsg("Harap masukkan email dan kata sandi Anda.");
      return;
    }

    const res = login(loginEmail, loginPassword);
    if (res.success) {
      setSuccessMsg(res.message);
      setTimeout(() => {
        router.push("/dashboard");
      }, 1200);
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setErrorMsg("");
    setSuccessMsg("");

    if (!regName.trim() || !regEmail.trim() || !regPassword.trim()) {
      setErrorMsg("Harap isi semua kolom wajib pendaftaran.");
      return;
    }

    if (regPassword.length < 6) {
      setErrorMsg("Kata sandi minimal harus terdiri dari 6 karakter.");
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMsg("Konfirmasi kata sandi tidak cocok. Harap periksa kembali.");
      return;
    }

    if (!agreeTerms) {
      setErrorMsg("Anda harus menyetujui ketentuan privasi data medis sebelum mendaftar.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await register({
        name: regName,
        email: regEmail,
        phone: regPhone.trim() || undefined,
        password: regPassword,
        healthGoal: regHealthGoal,
        diabetesType: "Pencegahan Primer",
        age: regAge,
        gender: regGender,
      });

      if (res.success) {
        setSuccessMsg(res.message);
        setTimeout(() => {
          router.push("/dashboard");
        }, 1200);
      } else {
        setErrorMsg(res.message);
        setIsSubmitting(false);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Terjadi kendala saat mendaftarkan akun. Silakan coba lagi.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-4 sm:my-8 px-2">
      {/* Kartu Status Jika Pengguna Sudah Login */}
      {isAuthenticated && (
        <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-200/90 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              {profile.name
                ? profile.name
                    .split(" ")
                    .filter(Boolean)
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()
                : "P"}
            </div>
            <div>
              <p className="text-xs text-emerald-800 font-medium">Sesi Pasien Sedang Aktif:</p>
              <p className="text-sm font-bold text-slate-900">
                {profile.name}{" "}
                <span className="text-xs font-normal text-slate-500">({profile.email})</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Link
              href="/dashboard"
              className="flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <span>Ke Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={() => {
                logout();
                setSuccessMsg("Anda telah keluar dari akun. Silakan masuk kembali.");
                setTimeout(() => setSuccessMsg(""), 4000);
              }}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-xs font-semibold text-rose-600 flex items-center gap-1 transition-colors cursor-pointer"
              title="Keluar dari akun saat ini"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
        {/* Header Hero Banner */}
        <div className="bg-gradient-to-br from-emerald-800 via-teal-800 to-slate-900 p-6 sm:p-8 text-white text-center relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md mx-auto flex items-center justify-center mb-3 shadow-inner border border-white/20">
              <HeartPulse className="w-8 h-8 text-emerald-300 animate-pulse" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              DIA<span className="text-emerald-400">SERA</span>
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-sm mx-auto">
              Media Edukasi Interaktif &amp; Pemantauan Perilaku Hidup Sehat
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-[10px] text-emerald-300 font-semibold">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Autentikasi Terenkripsi</span>
              </div>
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-semibold border ${
                  isCloudDbConnected
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/40"
                    : "bg-teal-500/20 text-teal-200 border-teal-400/30"
                }`}
              >
                <Database className="w-3 h-3" />
                <span>
                  {isCloudDbConnected
                    ? "Cloud DB: Supabase Terhubung"
                    : "Cloud DB: Mode Siap Supabase"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50/70 p-1.5">
          <button
            type="button"
            onClick={() => {
              setTab("login");
              setErrorMsg("");
              setSuccessMsg("");
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              tab === "login"
                ? "bg-white text-emerald-800 shadow-xs border border-slate-200/60"
                : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/70"
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Masuk Akun</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setTab("register");
              setErrorMsg("");
              setSuccessMsg("");
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              tab === "register"
                ? "bg-white text-emerald-800 shadow-xs border border-slate-200/60"
                : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/70"
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Daftar Pasien Baru</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-5">
          {/* Feedback Alerts */}
          {successMsg && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2.5 shadow-xs animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-semibold flex items-center gap-2.5 shadow-xs animate-in fade-in">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* TAB 1: MASUK (LOGIN) */}
          {tab === "login" && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Pasien Terdaftar <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="nama@email.com"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Kata Sandi <span className="text-rose-500">*</span>
                  </label>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Masukkan kata sandi akun"
                    required
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    title={showLoginPassword ? "Sembunyikan sandi" : "Tampilkan sandi"}
                  >
                    {showLoginPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.01]"
              >
                <LogIn className="w-4 h-4" />
                <span>Masuk ke Akun Pasien</span>
              </button>

              <div className="pt-2 text-center">
                <p className="text-xs text-slate-500">
                  Belum memiliki akun terdaftar?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setTab("register");
                      setErrorMsg("");
                    }}
                    className="text-emerald-700 font-bold hover:underline cursor-pointer"
                  >
                    Daftar di sini
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* TAB 2: DAFTAR (REGISTER) */}
          {tab === "register" && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nama Lengkap Pasien <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Contoh: Siti Aisyah"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Aktif <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="nama@email.com"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nomor WhatsApp Pasien <span className="text-slate-400 font-normal">(Opsional)</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="Contoh: 081234567890"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Fokus Penggunaan <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={regHealthGoal}
                    onChange={(e) => setRegHealthGoal(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  >
                    <option value="Pencegahan Primer (Belum Kena DM)">
                      Pencegahan Primer (Belum Kena DM)
                    </option>
                    <option value="Deteksi Dini & Cek Risiko DM">
                      Deteksi Dini &amp; Cek Risiko DM
                    </option>
                    <option value="Pemantauan Pola Hidup Sehat">
                      Pemantauan Pola Hidup Sehat
                    </option>
                    <option value="Kelompok Waspada / Faktor Risiko Keluarga">
                      Kelompok Waspada / Faktor Risiko Keluarga
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Usia &amp; Jenis Kelamin
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      min="1"
                      max="120"
                      value={regAge}
                      onChange={(e) => setRegAge(parseInt(e.target.value) || 0)}
                      placeholder="Usia"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                    <select
                      value={regGender}
                      onChange={(e) => setRegGender(e.target.value as any)}
                      className="w-full px-2 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    >
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Kata Sandi <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showRegPassword ? "text" : "password"}
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Minimal 6 karakter"
                      required
                      className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Ulangi Kata Sandi <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showRegPassword ? "text" : "password"}
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="Ulangi kata sandi"
                      required
                      className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showRegPassword}
                    onChange={(e) => setShowRegPassword(e.target.checked)}
                    className="accent-emerald-600 rounded"
                  />
                  <span>Tampilkan karakter kata sandi</span>
                </label>
              </div>

              {/* Syarat & Ketentuan */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="accent-emerald-600 rounded mt-0.5"
                  />
                  <span>
                    Saya menyetujui perlindungan kerahasiaan data rekam medis mandiri sesuai standar
                    etika kesehatan digital.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full mt-2 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  isSubmitting
                    ? "bg-slate-400 text-white cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20 hover:scale-[1.01]"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Menyimpan ke Cloud Supabase...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Daftar &amp; Buka Rekam Medis</span>
                  </>
                )}
              </button>

              <div className="pt-2 text-center">
                <p className="text-xs text-slate-500">
                  Sudah memiliki akun?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setTab("login");
                      setErrorMsg("");
                    }}
                    className="text-emerald-700 font-bold hover:underline cursor-pointer"
                  >
                    Masuk di sini
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* Doctor Portal Callout */}
          <div className="mt-4 p-4 rounded-2xl bg-teal-50/90 border border-teal-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-teal-950">Tenaga Medis / Dokter Spesialis?</p>
                <p className="text-[11px] text-teal-800">
                  Akses antrean peer review artikel &amp; pemantauan rekam medis pasien di portal dokter.
                </p>
              </div>
            </div>
            <Link
              href="/auth/doctor-login"
              className="shrink-0 w-full sm:w-auto text-center px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
            >
              <span>Portal Dokter</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Security Assurance Badge */}
          <div className="pt-2 border-t border-slate-100 flex items-center gap-2.5 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Terkoneksi protokol sesi terenkripsi (Supabase Auth GoTrue JWT). Data rekam medis pasien terisolasi.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
