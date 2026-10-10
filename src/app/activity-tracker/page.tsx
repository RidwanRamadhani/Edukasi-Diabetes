"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Award,
  Check,
  CheckCircle2,
  Clock,
  CupSoda,
  Droplet,
  Flame,
  Footprints,
  HeartPulse,
  Moon,
  Plus,
  RotateCcw,
  Salad,
  Save,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useDiabetesStore } from "@/lib/storage";
import { calculateHabitScore } from "@/data/mockHabits";
import { formatDate } from "@/lib/utils";

export default function ActivityTrackerPage() {
  const { profile, habitLogs, addHabitLog, updateHabitLog } = useDiabetesStore();

  const todayStr = new Date().toISOString().split("T")[0];
  const existingTodayLog = habitLogs.find((h) => h.date === todayStr);

  // Form states (default to today's log if exists, otherwise defaults)
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [activityMinutes, setActivityMinutes] = useState<number>(
    existingTodayLog?.physicalActivityMinutes || 30
  );
  const [stepCount, setStepCount] = useState<number>(existingTodayLog?.stepCount || 7000);
  const [activityType, setActivityType] = useState<string>(
    existingTodayLog?.activityType || "Jalan Cepat Pagi"
  );
  const [waterGlasses, setWaterGlasses] = useState<number>(existingTodayLog?.waterGlasses || 8);
  const [veggiePortions, setVeggiePortions] = useState<number>(
    existingTodayLog?.veggieFruitPortions || 4
  );
  const [sleepHours, setSleepHours] = useState<number>(existingTodayLog?.sleepHours || 7.5);
  const [lowSugarSaltFat, setLowSugarSaltFat] = useState<boolean>(
    existingTodayLog?.lowSugarSaltFat ?? true
  );
  const [notes, setNotes] = useState<string>(existingTodayLog?.notes || "");

  const [savedFeedback, setSavedFeedback] = useState("");

  // Live Score Calculation
  const currentLiveScore = calculateHabitScore({
    physicalActivityMinutes: activityMinutes,
    waterGlasses,
    veggieFruitPortions: veggiePortions,
    sleepHours,
    lowSugarSaltFat,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addHabitLog({
      userId: profile.id,
      date: selectedDate,
      physicalActivityMinutes: Number(activityMinutes),
      stepCount: Number(stepCount),
      activityType,
      waterGlasses: Number(waterGlasses),
      veggieFruitPortions: Number(veggiePortions),
      sleepHours: Number(sleepHours),
      lowSugarSaltFat,
      notes: notes.trim() || undefined,
      habitScore: currentLiveScore,
    });
    setSavedFeedback("Catatan perilaku hidup sehat berhasil disimpan!");
    setTimeout(() => setSavedFeedback(""), 4000);
  };

  const activityOptions = [
    "Jalan Cepat Pagi",
    "Senam Aerobik / Zumba",
    "Bersepeda Santai",
    "Jogging / Lari Santai",
    "Peregangan & Yoga",
    "Latihan Beban Ringan",
    "Aktivitas Fisik Rumah Tangga",
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-900 via-emerald-900 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
              <Activity className="w-4 h-4 animate-pulse" />
              <span>Modul Pemantauan Hidup Sehat • DIASERA</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Pantau Aktivitas &amp; Perilaku Hidup Sehat
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Catat dan pantau aktivitas fisik harian, kecukupan hidrasi air putih, konsumsi buah dan sayur, serta jam istirahat untuk pencegahan primer diabetes melitus.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <Link
              href="/risk-check"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 backdrop-blur-xs transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Cek Risiko DM</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Tracker Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">Catat Aktivitas Harian</h2>
              <p className="text-xs text-slate-500">Pilih tanggal dan lengkapi indikator perilaku sehat</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            {/* 1. Aktivitas Fisik & Langkah */}
            <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Footprints className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">Aktivitas Fisik &amp; Langkah Kaki</h3>
                    <p className="text-[11px] text-slate-500">Target minimal: 30 menit atau 7.500 langkah</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700">{activityMinutes} Menit</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600">Durasi Olahraga (Menit)</label>
                  <input
                    type="range"
                    min="0"
                    max="120"
                    step="5"
                    value={activityMinutes}
                    onChange={(e) => setActivityMinutes(Number(e.target.value))}
                    className="w-full accent-emerald-600 mt-1"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>0 mnt</span>
                    <span>30 mnt (Target)</span>
                    <span>120 mnt</span>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600">Estimasi Langkah Kaki (Steps)</label>
                  <input
                    type="number"
                    min="0"
                    step="500"
                    value={stepCount}
                    onChange={(e) => setStepCount(Number(e.target.value))}
                    className="w-full mt-1 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600">Jenis Aktivitas Fisik</label>
                <select
                  value={activityType}
                  onChange={(e) => setActivityType(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  {activityOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 2. Air Putih (Water Tracker Gelas) */}
            <div className="space-y-3 p-4 rounded-xl bg-blue-50/50 border border-blue-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Droplet className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">Konsumsi Air Putih</h3>
                    <p className="text-[11px] text-slate-500">Target: 8 gelas (sekitar 2.000 ml per hari)</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-extrabold text-blue-700">{waterGlasses} / 8</span>
                  <span className="text-[11px] text-slate-500 ml-1">Gelas</span>
                </div>
              </div>

              {/* Visual Gelas Buttons */}
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 pt-1">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setWaterGlasses(waterGlasses >= g && waterGlasses === g ? g - 1 : g)}
                    className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                      waterGlasses >= g
                        ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                        : "bg-white text-slate-400 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <Droplet className="w-4 h-4" />
                    <span className="text-[10px] font-bold">Gelas {g}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Sayur & Buah + Jam Tidur */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Sayur & Buah */}
              <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-100 space-y-2">
                <div className="flex items-center gap-2">
                  <Salad className="w-4 h-4 text-emerald-700" />
                  <span className="text-xs font-bold text-slate-900">Sayur &amp; Buah</span>
                </div>
                <p className="text-[11px] text-slate-500">Target 4 porsi (sarapan, siang, malam, camilan)</p>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setVeggiePortions(Math.max(0, veggiePortions - 1))}
                      className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-bold text-sm text-slate-900 w-8 text-center">
                      {veggiePortions}
                    </span>
                    <button
                      type="button"
                      onClick={() => setVeggiePortions(Math.min(8, veggiePortions + 1))}
                      className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs font-bold text-emerald-700">Porsi</span>
                </div>
              </div>

              {/* Jam Tidur */}
              <div className="p-4 rounded-xl bg-purple-50/40 border border-purple-100 space-y-2">
                <div className="flex items-center gap-2">
                  <Moon className="w-4 h-4 text-purple-700" />
                  <span className="text-xs font-bold text-slate-900">Durasi Tidur</span>
                </div>
                <p className="text-[11px] text-slate-500">Target 7 - 8 jam per malam</p>
                <div className="flex items-center justify-between pt-1">
                  <input
                    type="number"
                    step="0.5"
                    min="3"
                    max="14"
                    value={sleepHours}
                    onChange={(e) => setSleepHours(Number(e.target.value))}
                    className="w-24 px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                  <span className="text-xs font-bold text-purple-700">Jam Semalam</span>
                </div>
              </div>
            </div>

            {/* 4. Komitmen Pembatasan GGL */}
            <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/80 space-y-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={lowSugarSaltFat}
                  onChange={(e) => setLowSugarSaltFat(e.target.checked)}
                  className="mt-1 w-4 h-4 text-emerald-600 rounded-sm focus:ring-emerald-500 cursor-pointer"
                />
                <div className="text-xs">
                  <span className="font-bold text-slate-900">
                    Komitmen Pembatasan Gula, Garam, dan Lemak (GGL) Hari Ini
                  </span>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                    Saya tidak mengonsumsi minuman manis kemasan berpemanis buatan dan membatasi makanan gorengan berlemak jenuh tinggi.
                  </p>
                </div>
              </label>
            </div>

            {/* Catatan Tambahan */}
            <div>
              <label className="text-[11px] font-semibold text-slate-600">
                Catatan Kondisi Fisik / Perasaan Hari Ini
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Misal: Jalan kaki 35 menit di taman, badan terasa lebih segar..."
                className="w-full mt-1 px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Catatan Aktivitas Hari Ini</span>
              </button>
              {savedFeedback && (
                <p className="text-[11px] text-emerald-700 font-semibold text-center mt-2 animate-in fade-in">
                  ✓ {savedFeedback}
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Skor & Ringkasan Progress (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Daily Habit Score Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Skor Kepatuhan Hidup Sehat Hari Ini</span>
              </h3>
              <span className="text-[11px] text-slate-400">Skala 0 - 100%</span>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-teal-50 via-emerald-50 to-slate-50 border border-emerald-100 space-y-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Indeks Perilaku Sehat
              </span>
              <div className="text-5xl font-extrabold text-emerald-700 tracking-tight">
                {currentLiveScore}%
              </div>
              <div className="pt-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                    currentLiveScore >= 80
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : currentLiveScore >= 60
                      ? "bg-amber-100 text-amber-800 border border-amber-300"
                      : "bg-red-100 text-red-800 border border-red-300"
                  }`}
                >
                  <Award className="w-4 h-4" />
                  {currentLiveScore >= 80
                    ? "Sangat Baik (Optimal)"
                    : currentLiveScore >= 60
                    ? "Cukup Baik (Tingkatkan)"
                    : "Perlu Perhatian Lebih"}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 pt-2 leading-relaxed">
                {currentLiveScore >= 80
                  ? "Luar biasa! Seluruh pilar pencegahan diabetes (olahraga, air putih, serat, dan istirahat) terpenuhi dengan optimal."
                  : currentLiveScore >= 60
                  ? "Sudah baik, coba tingkatkan durasi jalan kaki atau porsi sayur agar metabolisme glukosa tubuh semakin stabil."
                  : "Yuk penuhi target air putih 8 gelas dan luangkan minimal 30 menit jalan santai hari ini untuk kesehatan pankreas Anda."}
              </p>
            </div>

            {/* Checklist Realisasi Hari Ini */}
            <div className="space-y-2.5 pt-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Target Capaian Harian:
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-700 flex items-center gap-2">
                    <Footprints className="w-3.5 h-3.5 text-emerald-600" />
                    Aktivitas Fisik ≥ 30 Menit
                  </span>
                  <span
                    className={`font-bold ${
                      activityMinutes >= 30 ? "text-emerald-700" : "text-amber-700"
                    }`}
                  >
                    {activityMinutes >= 30 ? "✓ Tercapai" : `${activityMinutes}/30 mnt`}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-700 flex items-center gap-2">
                    <Droplet className="w-3.5 h-3.5 text-blue-600" />
                    Air Putih 8 Gelas
                  </span>
                  <span
                    className={`font-bold ${
                      waterGlasses >= 8 ? "text-blue-700" : "text-amber-700"
                    }`}
                  >
                    {waterGlasses >= 8 ? "✓ Tercapai" : `${waterGlasses}/8 gelas`}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-700 flex items-center gap-2">
                    <Salad className="w-3.5 h-3.5 text-emerald-600" />
                    Sayur &amp; Buah ≥ 4 Porsi
                  </span>
                  <span
                    className={`font-bold ${
                      veggiePortions >= 4 ? "text-emerald-700" : "text-amber-700"
                    }`}
                  >
                    {veggiePortions >= 4 ? "✓ Tercapai" : `${veggiePortions}/4 porsi`}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-700 flex items-center gap-2">
                    <Moon className="w-3.5 h-3.5 text-purple-600" />
                    Tidur Sehat 7 - 8 Jam
                  </span>
                  <span
                    className={`font-bold ${
                      sleepHours >= 7 && sleepHours <= 9 ? "text-purple-700" : "text-amber-700"
                    }`}
                  >
                    {sleepHours >= 7 && sleepHours <= 9 ? "✓ Optimal" : `${sleepHours} jam`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Riwayat 7 Hari Terakhir */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900">Riwayat Pemantauan 7 Hari</h4>
              <span className="text-[11px] text-slate-400">{habitLogs.length} Entri</span>
            </div>

            <div className="space-y-2.5 divide-y divide-slate-100 max-h-80 overflow-y-auto pr-1">
              {habitLogs.slice(0, 7).map((log) => (
                <div key={log.id} className="pt-2 flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-slate-900">{log.activityType}</p>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800">
                        {log.habitScore}%
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {formatDate(log.date)} • {log.physicalActivityMinutes} mnt • {log.waterGlasses} gelas • {log.veggieFruitPortions} porsi
                    </p>
                  </div>
                  <span className="text-xs font-bold text-slate-600">
                    {log.stepCount ? `${log.stepCount.toLocaleString()} steps` : ""}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
