"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  HeartPulse,
  Save,
  User,
  Phone,
  Scale,
  Stethoscope,
  Mail,
  Calendar,
  AlertCircle,
  Activity,
  Droplet,
  Footprints,
  ShieldCheck,
  Sparkles,
  LogOut,
} from "lucide-react";
import { UserProfile, HealthGoal } from "@/types";
import { useDiabetesStore } from "@/lib/storage";

interface ProfileViewProps {
  profile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
}

export function ProfileView({ profile, onUpdateProfile }: ProfileViewProps) {
  const { logout } = useDiabetesStore();
  // Form fields state
  const [name, setName] = useState(profile.name || "");
  const [email, setEmail] = useState(profile.email || "");
  const [phone, setPhone] = useState(profile.phone || "");
  const [gender, setGender] = useState<"Laki-laki" | "Perempuan">(
    profile.gender || "Laki-laki"
  );
  const [healthGoal, setHealthGoal] = useState<HealthGoal>(
    profile.healthGoal || "Pencegahan Primer (Belum Kena DM)"
  );
  const [age, setAge] = useState<string>(String(profile.age || 35));
  const [currentWeight, setCurrentWeight] = useState<string>(
    String(profile.currentWeight || 65)
  );
  const [height, setHeight] = useState<string>(String(profile.height || 165));
  const [targetSteps, setTargetSteps] = useState<string>(
    String(profile.targetDailySteps || 7500)
  );
  const [targetActivityMinutes, setTargetActivityMinutes] = useState<string>(
    String(profile.targetDailyActivityMinutes || 30)
  );
  const [targetWaterGlasses, setTargetWaterGlasses] = useState<string>(
    String(profile.targetWaterGlasses || 8)
  );
  const [medicalHistory, setMedicalHistory] = useState(
    profile.medicalHistory || ""
  );
  const [emergencyContact, setEmergencyContact] = useState(
    profile.emergencyContact || ""
  );

  const [savedMsg, setSavedMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Sync internal state when profile prop changes
  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setEmail(profile.email || "");
      setPhone(profile.phone || "");
      setGender(profile.gender || "Laki-laki");
      setHealthGoal(profile.healthGoal || "Pencegahan Primer (Belum Kena DM)");
      setAge(String(profile.age || 35));
      setCurrentWeight(String(profile.currentWeight || 65));
      setHeight(String(profile.height || 165));
      setTargetSteps(String(profile.targetDailySteps || 7500));
      setTargetActivityMinutes(String(profile.targetDailyActivityMinutes || 30));
      setTargetWaterGlasses(String(profile.targetWaterGlasses || 8));
      setMedicalHistory(profile.medicalHistory || "");
      setEmergencyContact(profile.emergencyContact || "");
    }
  }, [profile]);

  const initials = name
    ? name
        .split(" ")
        .filter(Boolean)
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "P";

  // Calculate BMI dynamically
  const numWeight = parseFloat(currentWeight) || 0;
  const numHeight = parseFloat(height) || 0;
  const heightInMeters = numHeight / 100;
  const bmi =
    heightInMeters > 0
      ? Math.round((numWeight / (heightInMeters * heightInMeters)) * 10) / 10
      : 0;

  const getBmiCategory = (bmiValue: number) => {
    if (bmiValue < 18.5)
      return { label: "Berat Kurang", color: "text-blue-600 bg-blue-50 border-blue-200" };
    if (bmiValue <= 22.9)
      return {
        label: "Berat Normal / Ideal",
        color: "text-emerald-700 bg-emerald-50 border-emerald-200",
      };
    if (bmiValue <= 24.9)
      return {
        label: "Batas Normal Atas",
        color: "text-teal-700 bg-teal-50 border-teal-200",
      };
    if (bmiValue <= 29.9)
      return {
        label: "Kelebihan Berat Badan (Overweight)",
        color: "text-amber-700 bg-amber-50 border-amber-200",
      };
    return { label: "Obesitas", color: "text-rose-700 bg-rose-50 border-rose-200" };
  };

  const bmiCat = getBmiCategory(bmi);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSavedMsg("");

    if (!name.trim()) {
      setErrorMsg("Nama pengguna tidak boleh kosong.");
      return;
    }

    const updatedProfile: UserProfile = {
      ...profile,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      gender,
      healthGoal,
      diabetesType: "Pencegahan Primer",
      age: parseInt(age) || 35,
      currentWeight: parseFloat(currentWeight) || 65,
      height: parseFloat(height) || 165,
      targetDailySteps: parseInt(targetSteps) || 7500,
      targetDailyActivityMinutes: parseInt(targetActivityMinutes) || 30,
      targetWaterGlasses: parseInt(targetWaterGlasses) || 8,
      medicalHistory: medicalHistory.trim(),
      emergencyContact: emergencyContact.trim(),
    };

    onUpdateProfile(updatedProfile);
    setSavedMsg("Profil DIASERA dan target hidup sehat Anda berhasil diperbarui!");
    setTimeout(() => setSavedMsg(""), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Alert Notification */}
      {savedMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-3 shadow-xs animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{savedMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-semibold flex items-center gap-3 shadow-xs animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Header Profile Card */}
      <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-bold text-2xl shadow-md shrink-0">
            {initials}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">{name || "Pengguna DIASERA"}</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                {healthGoal}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {email} • {age} Tahun • {gender}
              {phone ? ` • WA: ${phone}` : ""}
            </p>
            <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-[10px] text-teal-800 font-medium">
              <Sparkles className="w-3 h-3 text-teal-600" />
              <span>DIASERA • Pencegahan &amp; Pemantauan Perilaku Hidup Sehat Mandiri</span>
            </div>
          </div>
        </div>

        {/* BMI Metric Card & Action */}
        <div className="flex flex-col sm:items-end gap-2.5 w-full sm:w-auto shrink-0">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-right w-full sm:w-auto">
            <span className="text-[10px] uppercase font-bold text-slate-400">
              Indeks Massa Tubuh (BMI)
            </span>
            <div className="flex items-baseline justify-end gap-1.5 mt-0.5">
              <span className="text-2xl font-black text-slate-900">{bmi}</span>
              <span className="text-xs text-slate-500 font-semibold">kg/m²</span>
            </div>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border inline-block mt-1 ${bmiCat.color}`}
            >
              {bmiCat.label}
            </span>
          </div>

          <button
            type="button"
            onClick={() => logout()}
            className="w-full sm:w-auto px-3.5 py-1.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
            title="Keluar dari akun pasien"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-600" />
            <span>Keluar dari Akun</span>
          </button>
        </div>
      </div>

      {/* Main Profile Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-bold text-base text-slate-900">
              Pengaturan Profil &amp; Target Perilaku Hidup Sehat
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Sesuaikan target aktivitas fisik, asupan air, dan data antropometri untuk evaluasi pencegahan.
            </p>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shrink-0">
            Penyimpanan Aktif
          </span>
        </div>

        {/* 1. Data Identitas Pribadi */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Identitas Pengguna
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Nama Lengkap <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama Lengkap"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-sm text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Nomor WhatsApp
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="081234567890"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Jenis Kelamin
              </label>
              <select
                value={gender}
                onChange={(e) =>
                  setGender(e.target.value as "Laki-laki" | "Perempuan")
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 cursor-pointer"
              >
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Fokus Penggunaan DIASERA
              </label>
              <select
                value={healthGoal}
                onChange={(e) => setHealthGoal(e.target.value as HealthGoal)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 cursor-pointer"
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
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Usia (Tahun)
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="35"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Berat Badan (kg)
              </label>
              <div className="relative">
                <Scale className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="number"
                  step="0.1"
                  min="20"
                  max="300"
                  value={currentWeight}
                  onChange={(e) => setCurrentWeight(e.target.value)}
                  placeholder="65"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Tinggi Badan (cm)
              </label>
              <div className="relative">
                <Scale className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="number"
                  step="0.5"
                  min="50"
                  max="250"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="165"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Target Harian Pola Hidup Sehat */}
        <div className="pt-4 border-t border-slate-100">
          <h4 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-600" />
            <span>Target Harian Perilaku Hidup Sehat Mandiri</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Target Aktivitas Fisik (Menit/Hari)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="10"
                  max="180"
                  value={targetActivityMinutes}
                  onChange={(e) => setTargetActivityMinutes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
                <span className="text-xs text-slate-500 font-semibold shrink-0">Menit</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5">Standar WHO: ≥ 30 menit / hari</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Target Langkah Kaki (Steps/Hari)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="2000"
                  max="30000"
                  step="500"
                  value={targetSteps}
                  onChange={(e) => setTargetSteps(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
                <span className="text-xs text-slate-500 font-semibold shrink-0">Langkah</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5">Target sehat: 7.000 - 10.000</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Target Air Putih (Gelas/Hari)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="4"
                  max="16"
                  value={targetWaterGlasses}
                  onChange={(e) => setTargetWaterGlasses(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
                <span className="text-xs text-slate-500 font-semibold shrink-0">Gelas</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5">Standar hidrasi: 8 gelas (2.000 ml)</p>
            </div>
          </div>
        </div>

        {/* 3. Riwayat Kesehatan & Kontak Darurat */}
        <div className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Catatan Kesehatan Pribadi / Riwayat Keluarga
            </label>
            <textarea
              rows={3}
              value={medicalHistory}
              onChange={(e) => setMedicalHistory(e.target.value)}
              placeholder="Contoh: Belum terdiagnosis diabetes. Orang tua memiliki riwayat DM tipe 2. Fokus pada pencegahan primer dan menjaga berat badan ideal."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Kontak Darurat (Keluarga Terdekat)
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                placeholder="Contoh: +62 812-3456-7890 (Ibu Dewi - Istri)"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            </div>
          </div>
        </div>

        {/* Save & Logout Buttons */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => logout()}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <LogOut className="w-4 h-4 text-rose-600" />
            <span>Keluar dari Akun</span>
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 cursor-pointer transition-transform hover:scale-105"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan Profil</span>
          </button>
        </div>
      </form>
    </div>
  );
}
