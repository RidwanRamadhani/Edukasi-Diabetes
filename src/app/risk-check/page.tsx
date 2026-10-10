"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Flame,
  HeartPulse,
  HelpCircle,
  History,
  RotateCcw,
  Save,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TrendingDown,
  UserCheck,
} from "lucide-react";
import { useDiabetesStore } from "@/lib/storage";
import { formatDate } from "@/lib/utils";

export default function RiskCheckPage() {
  const { profile, riskAssessments, addRiskAssessment } = useDiabetesStore();

  // Form states
  const [ageRange, setAgeRange] = useState<number>(0); // 0: <45, 2: 45-54, 3: 55-64, 4: >64
  const [weightKg, setWeightKg] = useState<number>(profile.currentWeight || 65);
  const [heightCm, setHeightCm] = useState<number>(profile.height || 165);
  const [gender, setGender] = useState<"Laki-laki" | "Perempuan">(profile.gender || "Laki-laki");
  const [waistRange, setWaistRange] = useState<number>(0); // 0: normal, 3: sedang, 4: berlebih
  const [hasPhysicalActivity, setHasPhysicalActivity] = useState<boolean>(true); // 0 or 2
  const [hasDailyVeggie, setHasDailyVeggie] = useState<boolean>(true); // 0 or 1
  const [hasHypertensionMeds, setHasHypertensionMeds] = useState<boolean>(false); // 0 or 2
  const [hasHighGlucoseHistory, setHasHighGlucoseHistory] = useState<boolean>(false); // 0 or 5
  const [familyHistory, setFamilyHistory] = useState<"none" | "secondDegree" | "firstDegree">("none");

  const [hasCalculated, setHasCalculated] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");

  // BMI Calculation
  const heightM = heightCm / 100;
  const bmi = heightM > 0 ? parseFloat((weightKg / (heightM * heightM)).toFixed(1)) : 22;
  const bmiScore = bmi < 25 ? 0 : bmi <= 30 ? 1 : 3;

  // Family history score
  const familyScore = familyHistory === "none" ? 0 : familyHistory === "secondDegree" ? 3 : 5;

  // Physical activity score
  const activityScore = hasPhysicalActivity ? 0 : 2;

  // Veggie fruit score
  const veggieScore = hasDailyVeggie ? 0 : 1;

  // Hypertension meds score
  const hypertensionScore = hasHypertensionMeds ? 2 : 0;

  // High glucose history score
  const highGlucoseScore = hasHighGlucoseHistory ? 5 : 0;

  // Total FINDRISC Score
  const totalScore =
    ageRange +
    bmiScore +
    waistRange +
    activityScore +
    veggieScore +
    hypertensionScore +
    highGlucoseScore +
    familyScore;

  // Evaluation
  let riskCategory: "Rendah" | "Sedang" | "Tinggi" = "Rendah";
  let riskColor = "emerald";
  let riskEstimate = "< 1% (Hanya 1 dari 100 orang berisiko)";
  let riskBadge = "bg-emerald-100 text-emerald-800 border-emerald-300";
  let riskDescription =
    "Potensi Anda menderita Diabetes Melitus dalam 10 tahun mendatang tergolong SANGAT RENDAH. Terus pertahankan pola makan seimbang dan kebiasaan aktif Anda.";

  if (totalScore >= 15) {
    riskCategory = "Tinggi";
    riskColor = "red";
    riskEstimate = "33% - 50% (1 dari 2 hingga 3 orang berisiko)";
    riskBadge = "bg-red-100 text-red-800 border-red-300";
    riskDescription =
      "Potensi Anda menderita Diabetes Melitus dalam 10 tahun mendatang tergolong TINGGI. Disarankan segera berkonsultasi dengan dokter untuk pemeriksaan glukosa darah berkala dan perbaikan intensif pola hidup.";
  } else if (totalScore >= 7) {
    riskCategory = "Sedang";
    riskColor = "amber";
    riskEstimate = "17% (1 dari 6 orang berisiko)";
    riskBadge = "bg-amber-100 text-amber-800 border-amber-300";
    riskDescription =
      "Potensi Anda tergolong SEDANG (Waspada). Perubahan gaya hidup seperti jalan kaki 30 menit per hari dan penurunan berat badan 5-7% dapat menurunkan risiko diabetes hingga 58%.";
  }

  const recommendations =
    riskCategory === "Rendah"
      ? [
          "Pertahankan rutinitas aktivitas fisik aerobik minimal 150 menit per minggu (30 menit, 5 hari/minggu).",
          "Terapkan konsep 'Isi Piringku': 50% sayur & buah, 25% lauk protein, 25% karbohidrat kompleks.",
          "Hindari minuman manis kemasan, boba, dan batasi konsumsi gula maksimal 4 sendok makan per hari.",
          "Cek kesehatan berkala dan skrining ulang risiko diabetes setiap 1-2 tahun sekali.",
        ]
      : riskCategory === "Sedang"
      ? [
          "Tingkatkan aktivitas fisik harian: target minimal 7.500 langkah atau jalan cepat 30-45 menit per hari.",
          "Turunkan berat badan secara bertahap jika IMT > 23 kg/m² (target penurunan 5-7% dari berat awal).",
          "Ganti nasi putih atau roti putih dengan karbohidrat tinggi serat (nasi merah, oatmeal, ubi rebus).",
          "Lakukan pemeriksaan laboratorium: Gula Darah Puasa (GDP) atau HbA1c ke fasilitas kesehatan terdekat.",
          "Manfaatkan fitur 'Pantau Aktivitas' di DIASERA untuk memonitor kepatuhan minum air, olahraga, dan sayur.",
        ]
      : [
          "Sangat dianjurkan segera memeriksakan diri ke dokter atau puskesmas untuk tes Gula Darah Puasa dan HbA1c.",
          "Konsultasikan riwayat tekanan darah dan faktor risiko keluarga dengan dokter spesialis penyakit dalam.",
          "Mulai program modifikasi gaya hidup terstruktur: kurangi karbohidrat sederhana, hentikan konsumsi gorengan berlebih.",
          "Lakukan olahraga teratur dengan pengawasan medis jika ada keluhan penyerta.",
          "Catat aktivitas harian dan pola makan setiap hari di website DIASERA untuk memantau perbaikan.",
        ];

  const handleSaveResult = () => {
    addRiskAssessment({
      userId: profile.id,
      totalScore,
      riskCategory,
      tenYearRiskEstimate: riskEstimate,
      bmi,
      answers: {
        ageCategory:
          ageRange === 0
            ? "< 45 tahun"
            : ageRange === 2
            ? "45 - 54 tahun"
            : ageRange === 3
            ? "55 - 64 tahun"
            : "> 64 tahun",
        bmiCategory:
          bmi < 25 ? "< 25 kg/m² (Normal)" : bmi <= 30 ? "25 - 30 kg/m² (Berlebih)" : "> 30 kg/m² (Obesitas)",
        waistCategory:
          waistRange === 0
            ? gender === "Laki-laki"
              ? "< 90 cm"
              : "< 80 cm"
            : waistRange === 3
            ? gender === "Laki-laki"
              ? "90 - 102 cm"
              : "80 - 88 cm"
            : gender === "Laki-laki"
            ? "> 102 cm"
            : "> 88 cm",
        dailyPhysicalActivity: hasPhysicalActivity,
        dailyVeggieFruit: hasDailyVeggie,
        hypertensionMeds: hasHypertensionMeds,
        highBloodSugarHistory: hasHighGlucoseHistory,
        familyDiabetesHistory: familyHistory,
      },
      recommendations,
    });
    setIsSaved(true);
    setSaveSuccessMsg("Hasil skrining berhasil disimpan ke profil DIASERA Anda!");
    setTimeout(() => setSaveSuccessMsg(""), 4000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
            <HeartPulse className="w-4 h-4 animate-pulse" />
            <span>Skrining FINDRISC • Pencegahan Primer untuk Individu Belum Terdiagnosis DM</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Cek Risiko Diabetes Melitus Mandiri
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Metode ilmiah berstandar internasional (*Finnish Diabetes Risk Score*) yang diadaptasi untuk mendeteksi dini faktor risiko diabetes melitus tipe 2 dalam 10 tahun mendatang, disertai panduan pencegahan terstruktur.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Kuisioner (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">Kuisioner Faktor Risiko</h2>
              <p className="text-xs text-slate-500">Isi seluruh data sesuai kondisi nyata Anda saat ini</p>
            </div>
            <button
              onClick={() => {
                setAgeRange(0);
                setWeightKg(profile.currentWeight || 65);
                setHeightCm(profile.height || 165);
                setWaistRange(0);
                setHasPhysicalActivity(true);
                setHasDailyVeggie(true);
                setHasHypertensionMeds(false);
                setHasHighGlucoseHistory(false);
                setFamilyHistory("none");
                setHasCalculated(false);
                setIsSaved(false);
              }}
              className="text-xs text-slate-500 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="space-y-5">
            {/* 1. Usia */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                <span>1. Berapa usia Anda saat ini?</span>
                <span className="text-[11px] font-normal text-slate-500">Poin: +{ageRange}</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { label: "< 45 tahun", score: 0 },
                  { label: "45 - 54 tahun", score: 2 },
                  { label: "55 - 64 tahun", score: 3 },
                  { label: "> 64 tahun", score: 4 },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setAgeRange(item.score);
                      setHasCalculated(true);
                    }}
                    className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                      ageRange === item.score
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Berat & Tinggi Badan (IMT) */}
            <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800">
                  2. Berat &amp; Tinggi Badan (Indeks Massa Tubuh / IMT)
                </label>
                <span className="text-[11px] font-bold text-emerald-700">
                  IMT: {bmi} kg/m² (+{bmiScore} poin)
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="text-[11px] text-slate-500">Berat Badan (kg)</label>
                  <input
                    type="number"
                    value={weightKg}
                    onChange={(e) => {
                      setWeightKg(Math.max(30, Number(e.target.value)));
                      setHasCalculated(true);
                    }}
                    className="w-full mt-1 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-500">Tinggi Badan (cm)</label>
                  <input
                    type="number"
                    value={heightCm}
                    onChange={(e) => {
                      setHeightCm(Math.max(100, Number(e.target.value)));
                      setHasCalculated(true);
                    }}
                    className="w-full mt-1 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1">
                <span>Status:</span>
                <span className="font-bold">
                  {bmi < 18.5
                    ? "Berat Kurang (< 18.5)"
                    : bmi < 25
                    ? "Normal / Ideal (< 25)"
                    : bmi < 30
                    ? "Kelebihan Berat / Overweight (25 - 30)"
                    : "Obesitas (> 30)"}
                </span>
              </div>
            </div>

            {/* 3. Lingkar Pinggang */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800">
                  3. Ukuran Lingkar Pinggang / Perut
                </label>
                <div className="flex items-center gap-1 text-[11px]">
                  <span className="text-slate-500">Jenis Kelamin:</span>
                  <button
                    type="button"
                    onClick={() => setGender(gender === "Laki-laki" ? "Perempuan" : "Laki-laki")}
                    className="font-bold text-emerald-700 underline cursor-pointer"
                  >
                    {gender}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    label: gender === "Laki-laki" ? "< 90 cm" : "< 80 cm",
                    sub: "Normal",
                    score: 0,
                  },
                  {
                    label: gender === "Laki-laki" ? "90 - 102 cm" : "80 - 88 cm",
                    sub: "Meningkat",
                    score: 3,
                  },
                  {
                    label: gender === "Laki-laki" ? "> 102 cm" : "> 88 cm",
                    sub: "Berlebih",
                    score: 4,
                  },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setWaistRange(item.score);
                      setHasCalculated(true);
                    }}
                    className={`p-2.5 rounded-xl text-xs border transition-all text-center cursor-pointer ${
                      waistRange === item.score
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <div className="font-bold">{item.label}</div>
                    <div className="text-[10px] opacity-80">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Aktivitas Fisik */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                <span>4. Apakah Anda berolahraga / aktif fisik minimal 30 menit setiap hari?</span>
                <span className="text-[11px] font-normal text-slate-500">Poin: +{activityScore}</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setHasPhysicalActivity(true);
                    setHasCalculated(true);
                  }}
                  className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                    hasPhysicalActivity
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  Ya, rutin ≥ 30 menit / hari (0 poin)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setHasPhysicalActivity(false);
                    setHasCalculated(true);
                  }}
                  className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                    !hasPhysicalActivity
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  Tidak / Kurang dari 30 menit (+2 poin)
                </button>
              </div>
            </div>

            {/* 5. Sayur & Buah */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                <span>5. Seberapa sering Anda makan sayur dan buah segar?</span>
                <span className="text-[11px] font-normal text-slate-500">Poin: +{veggieScore}</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setHasDailyVeggie(true);
                    setHasCalculated(true);
                  }}
                  className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                    hasDailyVeggie
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  Setiap hari (0 poin)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setHasDailyVeggie(false);
                    setHasCalculated(true);
                  }}
                  className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                    !hasDailyVeggie
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  Jarang / Tidak setiap hari (+1 poin)
                </button>
              </div>
            </div>

            {/* 6. Obat Darah Tinggi */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                <span>6. Pernahkah Anda rutin mengonsumsi obat anti-hipertensi / darah tinggi?</span>
                <span className="text-[11px] font-normal text-slate-500">Poin: +{hypertensionScore}</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setHasHypertensionMeds(false);
                    setHasCalculated(true);
                  }}
                  className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                    !hasHypertensionMeds
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  Tidak pernah (0 poin)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setHasHypertensionMeds(true);
                    setHasCalculated(true);
                  }}
                  className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                    hasHypertensionMeds
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  Ya, pernah / sedang rutin (+2 poin)
                </button>
              </div>
            </div>

            {/* 7. Riwayat Gula Darah Tinggi */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                <span>7. Pernahkah gula darah Anda ditemukan tinggi (saat MCU / sakit / hamil)?</span>
                <span className="text-[11px] font-normal text-slate-500">Poin: +{highGlucoseScore}</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setHasHighGlucoseHistory(false);
                    setHasCalculated(true);
                  }}
                  className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                    !hasHighGlucoseHistory
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  Tidak pernah (0 poin)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setHasHighGlucoseHistory(true);
                    setHasCalculated(true);
                  }}
                  className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                    hasHighGlucoseHistory
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  Ya, pernah tinggi (+5 poin)
                </button>
              </div>
            </div>

            {/* 8. Riwayat Keluarga */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                <span>8. Adakah anggota keluarga kandung yang memiliki riwayat diabetes?</span>
                <span className="text-[11px] font-normal text-slate-500">Poin: +{familyScore}</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: "none", label: "Tidak Ada", sub: "0 poin" },
                  { id: "secondDegree", label: "Kakek/Nenek/Paman", sub: "+3 poin" },
                  { id: "firstDegree", label: "Orang Tua/Saudara", sub: "+5 poin" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setFamilyHistory(item.id as any);
                      setHasCalculated(true);
                    }}
                    className={`p-2.5 rounded-xl text-xs border transition-all text-center cursor-pointer ${
                      familyHistory === item.id
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <div className="font-bold">{item.label}</div>
                    <div className="text-[10px] opacity-80">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hasil Analisis & Rekomendasi (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Hasil Skrining FINDRISC</span>
              </h3>
              <span className="text-[11px] text-slate-400">Total Skor Maks: 26</span>
            </div>

            {/* Skor Box */}
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/80 border border-slate-200/70 space-y-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total Skor Risiko Anda
              </span>
              <div className="text-5xl font-extrabold text-slate-900 tracking-tight">
                {totalScore}
              </div>
              <div className="pt-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${riskBadge}`}
                >
                  {riskCategory === "Rendah" ? (
                    <ShieldCheck className="w-4 h-4" />
                  ) : riskCategory === "Sedang" ? (
                    <AlertTriangle className="w-4 h-4" />
                  ) : (
                    <ShieldAlert className="w-4 h-4" />
                  )}
                  Tingkat Risiko: {riskCategory}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 pt-2 font-medium">
                Peluang terkena DM tipe 2 dalam 10 tahun: <br />
                <span className="font-bold text-slate-900">{riskEstimate}</span>
              </p>
            </div>

            {/* Deskripsi Risiko */}
            <p className="text-xs text-slate-700 leading-relaxed bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100">
              {riskDescription}
            </p>

            {/* Rekomendasi Pencegahan */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Rekomendasi Gaya Hidup Pencegahan</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                {recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Save Button */}
            <div className="pt-2">
              <button
                onClick={handleSaveResult}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{isSaved ? "Tersimpan di Profil" : "Simpan Hasil Skrining"}</span>
              </button>
              {saveSuccessMsg && (
                <p className="text-[11px] text-emerald-700 font-semibold text-center mt-2 animate-in fade-in">
                  ✓ {saveSuccessMsg}
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <Link
                href="/activity-tracker"
                className="font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <span>Pantau Aktivitas Sehat</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/education"
                className="text-slate-500 hover:text-slate-800 flex items-center gap-1"
              >
                <span>Baca Edukasi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Riwayat Skrining Terakhir */}
          {riskAssessments.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-slate-500" />
                <h4 className="text-xs font-bold text-slate-900">Riwayat Skrining Anda</h4>
              </div>
              <div className="space-y-2 divide-y divide-slate-100">
                {riskAssessments.slice(0, 3).map((item) => (
                  <div key={item.id} className="pt-2 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-slate-800">
                        Skor {item.totalScore} ({item.riskCategory})
                      </p>
                      <p className="text-[10px] text-slate-400">{formatDate(item.assessedAt)}</p>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        item.riskCategory === "Rendah"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : item.riskCategory === "Sedang"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      }`}
                    >
                      {item.riskCategory}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
