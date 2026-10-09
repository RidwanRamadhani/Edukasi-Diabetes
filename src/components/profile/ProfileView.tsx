"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";
import { UserProfile } from "@/types";

interface ProfileViewProps {
  profile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
}

export function ProfileView({ profile, onUpdateProfile }: ProfileViewProps) {
  // Form fields state
  const [name, setName] = useState(profile.name || "");
  const [email, setEmail] = useState(profile.email || "");
  const [phone, setPhone] = useState(profile.phone || "");
  const [gender, setGender] = useState<"Laki-laki" | "Perempuan">(
    profile.gender || "Laki-laki"
  );
  const [diabetesType, setDiabetesType] = useState<
    "Diabetes Tipe 1" | "Diabetes Tipe 2" | "Prediabetes" | "Gestasional"
  >(profile.diabetesType || "Diabetes Tipe 2");
  const [age, setAge] = useState<string>(String(profile.age || 45));
  const [currentWeight, setCurrentWeight] = useState<string>(
    String(profile.currentWeight || 70)
  );
  const [height, setHeight] = useState<string>(String(profile.height || 165));
  const [targetSugarFasting, setTargetSugarFasting] = useState<string>(
    String(profile.targetSugarFasting || 100)
  );
  const [targetSugarPostPrandial, setTargetSugarPostPrandial] = useState<string>(
    String(profile.targetSugarPostPrandial || 140)
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
      setDiabetesType(profile.diabetesType || "Diabetes Tipe 2");
      setAge(String(profile.age || 45));
      setCurrentWeight(String(profile.currentWeight || 70));
      setHeight(String(profile.height || 165));
      setTargetSugarFasting(String(profile.targetSugarFasting || 100));
      setTargetSugarPostPrandial(String(profile.targetSugarPostPrandial || 140));
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
      return { label: "Berat Kurang", color: "text-blue-600 bg-blue-50" };
    if (bmiValue <= 22.9)
      return {
        label: "Berat Normal (Kriteria Asia)",
        color: "text-emerald-700 bg-emerald-50",
      };
    if (bmiValue <= 24.9)
      return {
        label: "Kelebihan Berat Badan",
        color: "text-amber-700 bg-amber-50",
      };
    return { label: "Obesitas", color: "text-rose-700 bg-rose-50" };
  };

  const bmiCat = getBmiCategory(bmi);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSavedMsg("");

    if (!name.trim()) {
      setErrorMsg("Nama lengkap tidak boleh kosong.");
      return;
    }

    if (!email.trim()) {
      setErrorMsg("Email tidak boleh kosong.");
      return;
    }

    const parsedAge = parseInt(age) || profile.age || 45;
    const parsedWeight = parseFloat(currentWeight) || profile.currentWeight || 70;
    const parsedHeight = parseFloat(height) || profile.height || 165;
    const parsedFasting = parseInt(targetSugarFasting) || profile.targetSugarFasting || 100;
    const parsedPostPrandial =
      parseInt(targetSugarPostPrandial) || profile.targetSugarPostPrandial || 140;

    const updated: UserProfile = {
      ...profile,
      id: profile.id || `patient-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      gender,
      diabetesType,
      age: parsedAge,
      currentWeight: parsedWeight,
      height: parsedHeight,
      targetSugarFasting: parsedFasting,
      targetSugarPostPrandial: parsedPostPrandial,
      medicalHistory: medicalHistory.trim(),
      emergencyContact: emergencyContact.trim(),
    };

    onUpdateProfile(updated);

    setSavedMsg(
      `Profil pasien ${updated.name} berhasil disimpan dan otomatis terbarui di Dasbor Pemantauan Dokter!`
    );
    setTimeout(() => setSavedMsg(""), 5000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Feedback Alerts */}
      {savedMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-3 shadow-xs animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div className="flex-1">
            <p className="font-bold">{savedMsg}</p>
            <p className="text-[11px] text-emerald-700 mt-0.5 font-normal">
              Semua parameter klinis, target gula darah, dan riwayat langsung disinkronkan secara real-time.
            </p>
          </div>
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
              <h2 className="text-xl font-bold text-slate-900">{name || "Pasien DiaCare"}</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                {diabetesType}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {email} • {age} Tahun • {gender}
              {phone ? ` • WA: ${phone}` : ""}
            </p>
            <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-[10px] text-teal-800 font-medium">
              <Stethoscope className="w-3 h-3 text-teal-600" />
              <span>Terhubung dengan Portal Dokter &amp; Rekam Medis Klinis</span>
            </div>
          </div>
        </div>

        {/* BMI Metric Card */}
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-right w-full sm:w-auto">
          <span className="text-[10px] uppercase font-bold text-slate-400">
            Indeks Massa Tubuh (BMI)
          </span>
          <div className="flex items-baseline justify-end gap-1.5 mt-0.5">
            <span className="text-2xl font-black text-slate-900">{bmi}</span>
            <span className="text-xs text-slate-500 font-semibold">kg/m²</span>
          </div>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-1 ${bmiCat.color}`}
          >
            {bmiCat.label}
          </span>
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
              Pengaturan Profil Pasien &amp; Parameter Klinis
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Data yang Anda simpan di sini akan otomatis tampil dan diperbarui di dasbor dokter pemeriksa.
            </p>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shrink-0">
            Sinkronisasi Otomatis Aktif
          </span>
        </div>

        {/* 1. Data Identitas Pribadi */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Identitas Pasien
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
                  placeholder="Nama Lengkap Pasien"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Email Terdaftar <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Nomor WhatsApp / HP Pasien
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Contoh: 081234567890"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                Digunakan oleh dokter untuk telekonsultasi WhatsApp langsung dari dasbor dokter.
              </p>
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
                Klasifikasi Diabetes
              </label>
              <select
                value={diabetesType}
                onChange={(e) =>
                  setDiabetesType(
                    e.target.value as
                      | "Diabetes Tipe 1"
                      | "Diabetes Tipe 2"
                      | "Prediabetes"
                      | "Gestasional"
                  )
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 cursor-pointer"
              >
                <option value="Diabetes Tipe 2">Diabetes Tipe 2</option>
                <option value="Diabetes Tipe 1">Diabetes Tipe 1</option>
                <option value="Prediabetes">Prediabetes</option>
                <option value="Gestasional">Diabetes Gestasional</option>
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
                  placeholder="45"
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
                  placeholder="70"
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

        {/* 2. Target Klinis Glukosa */}
        <div className="pt-4 border-t border-slate-100">
          <h4 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-emerald-600" />
            <span>Target Klinis Glukosa Darah Pribadi</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Batas Target Gula Darah Puasa (mg/dL)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="50"
                  max="300"
                  value={targetSugarFasting}
                  onChange={(e) => setTargetSugarFasting(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
                <span className="text-xs text-slate-500 font-semibold shrink-0">
                  mg/dL
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5">
                Rekomendasi PERKENI: 80 - 130 mg/dL
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Batas Target 2 Jam Pasca Makan (mg/dL)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="50"
                  max="400"
                  value={targetSugarPostPrandial}
                  onChange={(e) => setTargetSugarPostPrandial(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
                <span className="text-xs text-slate-500 font-semibold shrink-0">
                  mg/dL
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5">
                Rekomendasi PERKENI: &lt; 180 mg/dL (atau &lt; 140 mg/dL)
              </p>
            </div>
          </div>
        </div>

        {/* 3. Riwayat Penyakit & Kontak Darurat */}
        <div className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Riwayat Penyakit, Komplikasi &amp; Obat Saat Ini
            </label>
            <textarea
              rows={3}
              value={medicalHistory}
              onChange={(e) => setMedicalHistory(e.target.value)}
              placeholder="Contoh: DM Tipe 2 sejak 2021. Konsumsi Metformin 500mg 2x sehari. Tidak ada riwayat alergi obat."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Catatan ini dapat dibaca oleh dokter spesialis pada modal rekam medis di dasbor dokter.
            </p>
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
                placeholder="Contoh: +62 812-3456-7890 (Istri / Anak)"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-slate-500 text-center sm:text-left">
            Pastikan data yang dimasukkan benar sesuai kondisi pemeriksaan kesehatan terkini Anda.
          </p>

          <button
            type="submit"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan Profil</span>
          </button>
        </div>
      </form>
    </div>
  );
}
