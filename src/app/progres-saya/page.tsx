"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  HeartPulse,
  Footprints,
  CupSoda,
  Moon,
  Printer,
  Download,
  ShieldCheck,
  PlayCircle,
  Utensils,
  TrendingUp,
  CheckCircle2,
  Calendar,
  AlertCircle,
  FileSpreadsheet,
  Info,
  ChevronRight,
  Plus,
  Flame,
  Award,
} from "lucide-react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useDiabetesStore } from "@/lib/storage";

interface DailyChartItem {
  rawDate: string;
  displayDate: string;
  physicalActivityMinutes: number;
  sugaryDrinkPortions: number;
  sleepHours: number;
  habitScore: number;
  dietCategory: string;
  notes?: string;
}

export default function ProgresSayaPage() {
  const { profile, habitLogs } = useDiabetesStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Format 10 days of data for the chart and metrics
  const chartData: DailyChartItem[] = useMemo(() => {
    // Sort ascending by date for chronological chart display
    const sorted = [...habitLogs]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-10);

    return sorted.map((log) => {
      // Format to DD/MM (misal: 03/10)
      const d = new Date(log.date);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      return {
        rawDate: log.date,
        displayDate: `${day}/${month}`,
        physicalActivityMinutes: log.physicalActivityMinutes || 0,
        sugaryDrinkPortions: log.sugaryDrinkPortions ?? (log.lowSugarSaltFat ? 0 : 1),
        sleepHours: log.sleepHours || 7,
        habitScore: log.habitScore || 85,
        dietCategory: log.dietCategory || (log.lowSugarSaltFat ? "balanced" : "controlled"),
        notes: log.notes,
      };
    });
  }, [habitLogs]);

  // Compute 7-day metric summaries
  const last7Days = useMemo(() => {
    return [...habitLogs]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 7);
  }, [habitLogs]);

  // Metric 1: Skor Gaya Hidup (latest or average)
  const lifestyleScore = useMemo(() => {
    if (!last7Days.length) return 100;
    const latest = last7Days[0];
    return latest.habitScore ?? 100;
  }, [last7Days]);

  // Metric 2: Aktivitas Fisik (rata-rata 7 hari & total)
  const { avgActivity, total7DaysActivity } = useMemo(() => {
    if (!last7Days.length) return { avgActivity: 35, total7DaysActivity: 245 };
    const sum = last7Days.reduce((acc, curr) => acc + (curr.physicalActivityMinutes || 0), 0);
    return {
      total7DaysActivity: sum,
      avgActivity: Math.round(sum / last7Days.length),
    };
  }, [last7Days]);

  // Metric 3: Minuman Manis (rata-rata porsi & hari bebas manis)
  const { avgSugaryDrinks, zeroDrinkDays } = useMemo(() => {
    if (!last7Days.length) return { avgSugaryDrinks: "0.4", zeroDrinkDays: 5 };
    const portions = last7Days.map((log) => log.sugaryDrinkPortions ?? (log.lowSugarSaltFat ? 0 : 1));
    const totalPortions = portions.reduce((a, b) => a + b, 0);
    const zeroDays = portions.filter((p) => p === 0).length;
    return {
      avgSugaryDrinks: (totalPortions / last7Days.length).toFixed(1),
      zeroDrinkDays: zeroDays,
    };
  }, [last7Days]);

  // Metric 4: Istirahat & Tidur (rata-rata jam)
  const avgSleep = useMemo(() => {
    if (!last7Days.length) return "7.3";
    const sum = last7Days.reduce((acc, curr) => acc + (curr.sleepHours || 7.5), 0);
    return (sum / last7Days.length).toFixed(1);
  }, [last7Days]);

  // Komposisi Pola Makan Donut Chart Data
  const dietCompositionData = useMemo(() => {
    let balanced = 0;
    let controlled = 0;
    let highSugar = 0;

    habitLogs.forEach((log) => {
      const cat = log.dietCategory || (log.lowSugarSaltFat ? "balanced" : "controlled");
      if (cat === "balanced") balanced++;
      else if (cat === "controlled") controlled++;
      else highSugar++;
    });

    const total = balanced + controlled + highSugar || 1;
    const balancedPct = Math.round((balanced / total) * 100);
    const controlledPct = Math.round((controlled / total) * 100);
    const highSugarPct = Math.max(0, 100 - balancedPct - controlledPct);

    return [
      { name: "Piring Seimbang (Baik)", value: balancedPct || 70, color: "#10b981" },
      { name: "Cukup Terkendali", value: controlledPct || 18, color: "#f59e0b" },
      { name: "Tinggi Gula/Karbo", value: highSugarPct || 12, color: "#f43f5e" },
    ];
  }, [habitLogs]);

  // Handler: Cetak Rekap (Print/PDF)
  const handlePrint = () => {
    window.print();
  };

  // Handler: Ekspor Data (CSV/Excel)
  const handleExportCSV = () => {
    const headers = [
      "Tanggal",
      "Aktivitas Fisik (Menit)",
      "Minuman Manis (Porsi)",
      "Langkah Harian",
      "Air Putih (Gelas)",
      "Sayur & Buah (Porsi)",
      "Istirahat Tidur (Jam)",
      "Skor Kepatuhan (%)",
      "Catatan",
    ];

    const rows = habitLogs.map((log) => [
      log.date,
      log.physicalActivityMinutes || 0,
      log.sugaryDrinkPortions ?? (log.lowSugarSaltFat ? 0 : 1),
      log.stepCount || 0,
      log.waterGlasses || 8,
      log.veggieFruitPortions || 4,
      log.sleepHours || 7.5,
      log.habitScore || 90,
      `"${(log.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `DIASERA_Progres_Kepatuhan_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 print:space-y-4 print:p-0">
      {/* Printable Report Header (only visible when printing) */}
      <div className="hidden print:block border-b-2 border-teal-800 pb-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-teal-900">DIASERA HEALTH • LAPORAN PROGRES SAYA</h1>
            <p className="text-sm text-slate-600">
              Evaluasi Kepatuhan 5 Pilar Gaya Hidup Sehat &amp; Pengendalian Diabetes Melitus
            </p>
          </div>
          <div className="text-right text-xs text-slate-500">
            <p>Nama Pasien: <strong>{profile.name}</strong></p>
            <p>Tanggal Cetak: {new Date().toLocaleDateString("id-ID", { dateStyle: "long" })}</p>
          </div>
        </div>
      </div>

      {/* 1. HERO SECTION / BANNER */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-900 via-teal-800 to-teal-700 text-white p-6 sm:p-8 lg:p-10 shadow-xl print:hidden">
        {/* Subtle patterned overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                Raih Hidup Sehat Sejahtera bersama{" "}
                <span className="text-yellow-300 drop-shadow-xs font-black inline-block">
                  DIASERA
                </span>
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-teal-50/90 leading-relaxed font-normal max-w-xl">
              Kenali gejala sejak dini, pelajari 5 pilar pengendalian diabetes, skrining risiko mandiri
              (FINDRISC), pantau perilaku harian (pola makan 3J, aktivitas, minuman manis), dan pantau
              rekap perkembangan kesehatan Anda.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/risk-check"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-teal-900 hover:bg-teal-50 text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <ShieldCheck className="w-4 h-4 text-teal-700" />
                <span>Cek Skor Risiko Anda</span>
              </Link>
              <Link
                href="/education"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-950/40 hover:bg-teal-950/60 border border-teal-300/40 text-white text-xs sm:text-sm font-semibold transition-all backdrop-blur-xs"
              >
                <PlayCircle className="w-4 h-4 text-amber-300" />
                <span>Materi &amp; Kuis Interaktif</span>
              </Link>
            </div>
          </div>

          {/* Right Hero Feature Badges Card */}
          <div className="lg:col-span-5">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 sm:p-5 space-y-3 shadow-inner">
              {/* Badge 1: 3J */}
              <div className="flex items-center gap-3.5 bg-teal-900/40 border border-teal-300/20 rounded-xl p-3 hover:bg-teal-900/60 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-teal-400/20 border border-teal-300/30 flex items-center justify-center font-black text-sm text-teal-200 shrink-0">
                  3J
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                    Jadwal, Jumlah, Jenis
                  </h4>
                  <p className="text-[11px] text-teal-100/80">Aturan dasar makan diabetesi</p>
                </div>
              </div>

              {/* Badge 2: G4 */}
              <div className="flex items-center gap-3.5 bg-teal-900/40 border border-teal-300/20 rounded-xl p-3 hover:bg-teal-900/60 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-amber-400/25 border border-amber-300/30 flex items-center justify-center font-black text-sm text-amber-300 shrink-0">
                  G4
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                    Maksimal 4 Sdm Gula/Hari
                  </h4>
                  <p className="text-[11px] text-teal-100/80">Batasi minuman kemasan &amp; boba</p>
                </div>
              </div>

              {/* Badge 3: 150' */}
              <div className="flex items-center gap-3.5 bg-teal-900/40 border border-teal-300/20 rounded-xl p-3 hover:bg-teal-900/60 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-cyan-400/20 border border-cyan-300/30 flex items-center justify-center font-black text-sm text-cyan-200 shrink-0">
                  150&apos;
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                    150 Menit Olahraga/Minggu
                  </h4>
                  <p className="text-[11px] text-teal-100/80">30 menit/hari, 5 kali seminggu</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION MODULE HEADER & ACTIONS */}
      <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200/80 text-[11px] font-bold text-teal-700 uppercase tracking-wider mb-1.5">
            MODUL EDUKASI 05
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Progres Saya
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Rekap perkembangan kepatuhan gaya hidup, visualisasi grafik tren harian, dan evaluasi kepatuhan.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0 print:hidden">
          <button
            onClick={handlePrint}
            type="button"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold shadow-2xs hover:border-slate-300 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Cetak Rekap</span>
          </button>
          <button
            onClick={handleExportCSV}
            type="button"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold shadow-2xs hover:border-slate-300 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Ekspor Data</span>
          </button>
        </div>
      </section>

      {/* 3. METRIC SUMMARY CARDS (4 CARDS) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Skor Gaya Hidup (Solid Dark Teal Card) */}
        <div className="rounded-2xl bg-teal-800 text-white p-5 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-200">
              SKOR GAYA HIDUP
            </span>
            <div className="w-9 h-9 rounded-xl bg-teal-700/60 border border-teal-500/30 flex items-center justify-center text-teal-100">
              <HeartPulse className="w-5 h-5" />
            </div>
          </div>

          <div className="my-3">
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight flex items-baseline">
              {lifestyleScore}
              <span className="text-lg font-medium text-teal-200 ml-1">/100</span>
            </div>
          </div>

          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-700/70 border border-teal-400/30 text-[11px] font-semibold text-white">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
              <span>Kepatuhan Sangat Prima!</span>
            </span>
          </div>
        </div>

        {/* Card 2: Aktivitas Fisik (White Card) */}
        <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              AKTIVITAS FISIK
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Footprints className="w-5 h-5" />
            </div>
          </div>

          <div className="my-3">
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight flex items-baseline">
              {avgActivity}
              <span className="text-xs sm:text-sm font-medium text-slate-500 ml-1.5">
                menit/hari
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-600">
            Total 7 hari: <strong className="text-slate-800">{total7DaysActivity} menit</strong>{" "}
            <span className="text-slate-500">(Target: ≥ 150 mnt)</span>
          </p>
        </div>

        {/* Card 3: Minuman Manis (White Card) */}
        <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              MINUMAN MANIS
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <CupSoda className="w-5 h-5" />
            </div>
          </div>

          <div className="my-3">
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight flex items-baseline">
              {avgSugaryDrinks}
              <span className="text-xs sm:text-sm font-medium text-slate-500 ml-1.5">
                porsi/hari
              </span>
            </div>
          </div>

          <p className="text-xs font-semibold text-teal-700">
            {zeroDrinkDays} dari 7 hari bebas minuman manis
          </p>
        </div>

        {/* Card 4: Istirahat & Tidur (White Card) */}
        <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              ISTIRAHAT &amp; TIDUR
            </span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Moon className="w-5 h-5" />
            </div>
          </div>

          <div className="my-3">
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight flex items-baseline">
              {avgSleep}
              <span className="text-xs sm:text-sm font-medium text-slate-500 ml-1.5">
                jam/hari
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-600">
            Rekomendasi ideal: <strong className="text-slate-800">7 – 8 jam</strong> per malam
          </p>
        </div>
      </section>

      {/* 4. CHARTS SECTION (2 COLUMNS) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Chart 1: Tren Aktivitas Fisik vs Minuman Manis (Bar & Line Chart) */}
        <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Tren Aktivitas Fisik vs Minuman Manis
                </h3>
                <p className="text-xs text-slate-500">Pantauan 10 hari terakhir</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
                Korelasi Kebiasaan
              </span>
            </div>

            {/* Custom Legend */}
            <div className="flex items-center justify-center gap-6 py-2 text-xs font-medium text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-xs bg-[#2aa69a]" />
                <span>Aktivitas Fisik (Menit)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-xs bg-[#f59e0b]" />
                <span>Minuman Manis (Porsi)</span>
              </div>
            </div>
          </div>

          {/* Chart Canvas */}
          <div className="w-full h-72 sm:h-80 mt-2">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={chartData}
                  margin={{ top: 15, right: 10, left: -15, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis
                    dataKey="displayDate"
                    stroke="#64748b"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: "#cbd5e1" }}
                  />
                  {/* Left Y-Axis: Menit Olahraga */}
                  <YAxis
                    yAxisId="left"
                    domain={[0, 50]}
                    ticks={[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50]}
                    stroke="#64748b"
                    fontSize={10}
                    tickLine={false}
                    axisLine={{ stroke: "#cbd5e1" }}
                    label={{
                      value: "Menit Olahraga",
                      angle: -90,
                      position: "insideLeft",
                      offset: 20,
                      style: { fontSize: 10, fill: "#64748b" },
                    }}
                  />
                  {/* Right Y-Axis: Porsi Minuman Manis */}
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    domain={[0, 4]}
                    ticks={[0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0]}
                    stroke="#64748b"
                    fontSize={10}
                    tickLine={false}
                    axisLine={{ stroke: "#cbd5e1" }}
                    label={{
                      value: "Porsi Minuman Manis",
                      angle: 90,
                      position: "insideRight",
                      offset: 20,
                      style: { fontSize: 10, fill: "#64748b" },
                    }}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload as DailyChartItem;
                        return (
                          <div className="bg-slate-900 text-white p-3 rounded-xl shadow-lg text-xs space-y-1">
                            <p className="font-bold border-b border-slate-700 pb-1">
                              Tanggal: {data.rawDate}
                            </p>
                            <p className="text-teal-300">
                              Aktivitas Fisik: <strong>{data.physicalActivityMinutes} menit</strong>
                            </p>
                            <p className="text-amber-300">
                              Minuman Manis: <strong>{data.sugaryDrinkPortions} porsi</strong>
                            </p>
                            <p className="text-slate-300">
                              Tidur: {data.sleepHours} jam • Skor: {data.habitScore}%
                            </p>
                            {data.notes && (
                              <p className="text-slate-400 italic text-[10px] pt-1">
                                &quot;{data.notes}&quot;
                              </p>
                            )}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  {/* Bar for Physical Activity */}
                  <Bar
                    yAxisId="left"
                    dataKey="physicalActivityMinutes"
                    fill="#2aa69a"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={38}
                  />
                  {/* Line for Sugary Drinks */}
                  <Line
                    yAxisId="right"
                    type="linear"
                    dataKey="sugaryDrinkPortions"
                    stroke="#f59e0b"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: "#f59e0b", strokeWidth: 2, stroke: "#ffffff" }}
                    activeDot={{ r: 6, fill: "#d97706" }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                Memuat grafik tren...
              </div>
            )}
          </div>
        </div>

        {/* Chart 2: Komposisi Pola Makan (Donut Chart) */}
        <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Komposisi Pola Makan
                </h3>
                <p className="text-xs text-slate-500">Distribusi kepatuhan 3J</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                <Utensils className="w-4 h-4" />
              </div>
            </div>

            {/* Donut Chart Canvas */}
            <div className="w-full h-56 flex items-center justify-center relative">
              {isMounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dietCompositionData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={56}
                      outerRadius={84}
                      paddingAngle={3}
                    >
                      {dietCompositionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: any, name: any) => [`${value}%`, name]}
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        borderRadius: "12px",
                        color: "#ffffff",
                        fontSize: "12px",
                        border: "none",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-xs text-slate-400">Memuat diagram komposisi...</div>
              )}
            </div>

            {/* Legend */}
            <div className="space-y-2 mt-2">
              {dietCompositionData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-bold">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer recommendation */}
          <div className="pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500 italic">
              Usahakan porsi Piring Seimbang mendominasi di atas 70%
            </p>
          </div>
        </div>
      </section>

      {/* 5. TABLE REKAP DETAIL & EDUKASI TAMBAHAN */}
      <section className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Riwayat Kepatuhan Harian Terperinci
            </h3>
            <p className="text-xs text-slate-500">
              Rincian komitmen harian dalam 10 hari terakhir untuk evaluasi konsultasi medis
            </p>
          </div>
          <Link
            href="/activity-tracker"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold shadow-2xs transition-colors shrink-0 print:hidden"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Catat Hari Ini</span>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600 font-bold uppercase text-[10px]">
                <th className="py-3 px-3.5">Tanggal</th>
                <th className="py-3 px-3.5">Aktivitas Fisik</th>
                <th className="py-3 px-3.5">Minuman Manis</th>
                <th className="py-3 px-3.5">Air Putih</th>
                <th className="py-3 px-3.5">Istirahat Tidur</th>
                <th className="py-3 px-3.5">Kategori 3J</th>
                <th className="py-3 px-3.5 text-right">Skor Kepatuhan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {chartData
                .slice()
                .reverse()
                .map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3.5 font-semibold text-slate-900 whitespace-nowrap">
                      {row.rawDate}
                    </td>
                    <td className="py-3 px-3.5 whitespace-nowrap">
                      <span className="font-bold text-teal-700">
                        {row.physicalActivityMinutes} menit
                      </span>
                    </td>
                    <td className="py-3 px-3.5 whitespace-nowrap">
                      {row.sugaryDrinkPortions === 0 ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                          ✓ Bebas Manis
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded-md">
                          {row.sugaryDrinkPortions} porsi
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3.5 whitespace-nowrap">8 gelas</td>
                    <td className="py-3 px-3.5 whitespace-nowrap">{row.sleepHours} jam</td>
                    <td className="py-3 px-3.5 whitespace-nowrap">
                      {row.dietCategory === "balanced" && (
                        <span className="text-emerald-700 font-medium">Piring Seimbang</span>
                      )}
                      {row.dietCategory === "controlled" && (
                        <span className="text-amber-700 font-medium">Cukup Terkendali</span>
                      )}
                      {row.dietCategory === "high_sugar" && (
                        <span className="text-rose-700 font-medium">Tinggi Gula/Karbo</span>
                      )}
                    </td>
                    <td className="py-3 px-3.5 text-right font-black whitespace-nowrap">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-md text-[11px] ${
                          row.habitScore >= 90
                            ? "bg-teal-100 text-teal-800"
                            : row.habitScore >= 75
                            ? "bg-amber-100 text-amber-800"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {row.habitScore}%
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Signature & Validation for Printout */}
      <div className="hidden print:grid grid-cols-2 gap-8 pt-8 mt-8 border-t border-slate-300 text-xs text-slate-700">
        <div>
          <p className="font-semibold text-slate-800">Tanda Tangan Pengguna:</p>
          <div className="h-16" />
          <p className="font-bold underline text-slate-900">{profile.name}</p>
          <p className="text-slate-500">Pasien Terdaftar DIASERA</p>
        </div>
        <div className="text-right">
          <p className="font-semibold text-slate-800">Dokter / Tenaga Medis Pembina:</p>
          <div className="h-16" />
          <p className="font-bold underline text-slate-900">(...........................................)</p>
          <p className="text-slate-500">SIP / STR Dokter Spesialis / Faskes</p>
        </div>
      </div>
    </div>
  );
}
