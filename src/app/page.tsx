"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Award,
  BookOpen,
  Calculator,
  CalendarDays,
  CheckCircle2,
  Droplet,
  FileCheck2,
  Footprints,
  HeartPulse,
  Moon,
  Plus,
  Salad,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import { useDiabetesStore } from "@/lib/storage";
import { ArticleModal } from "@/components/education/ArticleModal";
import { EducationalArticle } from "@/types";
import { formatDate } from "@/lib/utils";
import { DoctorWhatsAppCard } from "@/components/whatsapp/DoctorWhatsAppCard";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function HomePage() {
  const { profile, habitLogs, riskAssessments, articles } = useDiabetesStore();
  const [readingArticle, setReadingArticle] = useState<EducationalArticle | null>(null);

  const latestHabit = habitLogs[0] || {
    habitScore: 95,
    physicalActivityMinutes: 35,
    stepCount: 7800,
    waterGlasses: 8,
    veggieFruitPortions: 4,
    sleepHours: 7.5,
    activityType: "Jalan Cepat Pagi",
    date: new Date().toISOString().split("T")[0],
  };

  const latestRisk = riskAssessments[0] || {
    totalScore: profile.latestRiskScore ?? 6,
    riskCategory: profile.latestRiskCategory ?? "Rendah",
    tenYearRiskEstimate: "< 1% (Hanya 1 dari 100 orang berisiko)",
  };

  const featuredArticle = articles[0];

  // Chart data 7 days
  const chartData = [...habitLogs]
    .slice(0, 7)
    .reverse()
    .map((log) => ({
      date: new Date(log.date).toLocaleDateString("id-ID", { weekday: "short", day: "numeric" }),
      score: log.habitScore,
      menit: log.physicalActivityMinutes,
      air: log.waterGlasses,
    }));

  return (
    <div className="space-y-8">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
              <HeartPulse className="w-4 h-4 animate-pulse" />
              <span>DIASERA • Media Edukasi Interaktif &amp; Pemantauan Perilaku Hidup Sehat</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Selamat Datang di DIASERA, {profile.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Platform mandiri untuk pencegahan serta pengendalian Diabetes Melitus: cek risiko diabetes mandiri bagi yang belum kena DM, pantau perilaku hidup sehat harian, dan pelajari edukasi interaktif terverifikasi dokter.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
            <Link
              href="/risk-check"
              className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-500/30 transition-transform hover:scale-105"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Cek Risiko DM</span>
            </Link>
            <Link
              href="/activity-tracker"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 border border-white/20 backdrop-blur-xs transition-colors"
            >
              <Activity className="w-4 h-4" />
              <span>Pantau Aktivitas</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Summary Parameter Cards */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">
            Parameter Pemantauan Perilaku Hidup Sehat &amp; Risiko
          </h2>
          <span className="text-xs text-slate-500">Pembaruan data terkini</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Status Risiko Diabetes */}
          <Link
            href="/risk-check"
            className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Tingkat Risiko Diabetes</span>
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  latestRisk.riskCategory === "Rendah"
                    ? "bg-emerald-100 text-emerald-700"
                    : latestRisk.riskCategory === "Sedang"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-extrabold text-slate-900">
                {latestRisk.riskCategory}
              </span>
              <span className="text-xs text-slate-500 ml-1.5 font-medium">
                (Skor {latestRisk.totalScore}/26)
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
              Skrining FINDRISC • Klik cek ulang
            </p>
          </Link>

          {/* Card 2: Skor Perilaku Hidup Sehat */}
          <Link
            href="/activity-tracker"
            className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Indeks Hidup Sehat Hari Ini</span>
              <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-extrabold text-emerald-700">
                {latestHabit.habitScore}%
              </span>
              <span className="text-xs font-semibold text-emerald-800 ml-1.5">Optimal</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Kepatuhan olahraga, air, serat &amp; tidur</p>
          </Link>

          {/* Card 3: Aktivitas Fisik */}
          <Link
            href="/activity-tracker"
            className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Aktivitas Fisik &amp; Langkah</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Footprints className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-extrabold text-slate-900">
                {latestHabit.physicalActivityMinutes}
              </span>
              <span className="text-xs text-slate-500 ml-1">/ 30 Menit</span>
            </div>
            <p className="text-[11px] text-emerald-700 font-semibold mt-1">
              ✓ {latestHabit.stepCount.toLocaleString()} langkah kaki tercapai
            </p>
          </Link>

          {/* Card 4: Asupan Air & Serat */}
          <Link
            href="/activity-tracker"
            className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Air Putih &amp; Sayur Buah</span>
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                <Droplet className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-extrabold text-blue-700">
                {latestHabit.waterGlasses}
              </span>
              <span className="text-xs text-slate-500 ml-1">/ 8 Gelas</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {latestHabit.veggieFruitPortions} porsi sayur &amp; buah harian
            </p>
          </Link>
        </div>
      </section>

      {/* Habit Trend Chart & Fast Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Trend Chart (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-base">
                  Tren Kepatuhan Perilaku Hidup Sehat (7 Hari)
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                Indeks skor hidup sehat harian (%) vs durasi aktivitas fisik (menit)
              </p>
            </div>
            <Link
              href="/activity-tracker"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              <span>Buka Pelacak Lengkap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#64748b" }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#64748b" }} />
                <Tooltip
                  formatter={(value: any, name: any) => [
                    name === "score" ? `${value}%` : `${value} mnt`,
                    name === "score" ? "Skor Hidup Sehat" : "Durasi Aktivitas",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#059669"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#scoreGrad)"
                  name="score"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>Standar Target: Skor &gt; 80% (Perilaku Sehat Optimal)</span>
            <span className="font-semibold text-emerald-700">Konsistensi: 7 Hari Beruntun</span>
          </div>
        </div>

        {/* Quick Menu (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Fitur Utama DIASERA</h3>
            <p className="text-xs text-slate-500">Akses cepat menu pencegahan &amp; gaya hidup</p>

            <div className="space-y-2 pt-1">
              <Link
                href="/risk-check"
                className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-emerald-50/80 hover:border-emerald-200 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-xs text-slate-900 group-hover:text-emerald-800">
                      Cek Risiko Diabetes
                    </p>
                    <p className="text-[11px] text-slate-500">Skrining ilmiah untuk yang belum kena DM</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
              </Link>

              <Link
                href="/activity-tracker"
                className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-emerald-50/80 hover:border-emerald-200 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-xs text-slate-900 group-hover:text-emerald-800">
                      Pantau Aktivitas Harian
                    </p>
                    <p className="text-[11px] text-slate-500">Catat olahraga, air putih &amp; sayur</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
              </Link>

              <Link
                href="/calculator"
                className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-emerald-50/80 hover:border-emerald-200 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-xs text-slate-900 group-hover:text-emerald-800">
                      Kalkulator Beban Glikemik
                    </p>
                    <p className="text-[11px] text-slate-500">Hitung pengaruh makanan pada gula darah</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
              </Link>

              <Link
                href="/education"
                className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-emerald-50/80 hover:border-emerald-200 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-xs text-slate-900 group-hover:text-emerald-800">
                      Edukasi Terverifikasi
                    </p>
                    <p className="text-[11px] text-slate-500">Artikel dokter &amp; materi Kumparan</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
              </Link>

              <Link
                href="/meals"
                className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-emerald-50/80 hover:border-emerald-200 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                    <CalendarDays className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-xs text-slate-900 group-hover:text-emerald-800">
                      Rekomendasi Menu Sehat
                    </p>
                    <p className="text-[11px] text-slate-500">Inspirasi sarapan, makan siang &amp; malam</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Educational Article */}
      {featuredArticle && (
        <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Edukasi Pencegahan &amp; Pola Makan Sehat Terpilih
                </h2>
              </div>
              <p className="text-xs text-slate-500">
                Materi edukasi interaktif bersumber dari Kumparan dan telah diverifikasi dokter spesialis
              </p>
            </div>
            <Link
              href="/education"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 shrink-0"
            >
              <span>Lihat Semua Artikel</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {featuredArticle.featuredImage && (
              <div
                onClick={() => setReadingArticle(featuredArticle)}
                className="md:col-span-5 h-52 sm:h-64 rounded-2xl overflow-hidden bg-slate-100 cursor-pointer group relative"
              >
                <img
                  src={featuredArticle.featuredImage}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
                  {featuredArticle.category}
                </div>
              </div>
            )}
            <div className={featuredArticle.featuredImage ? "md:col-span-7 space-y-3" : "md:col-span-12 space-y-3"}>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-emerald-700">Sumber: {featuredArticle.sourceMedia || "Kumparan"}</span>
                <span>•</span>
                <span>{featuredArticle.readingTimeMinutes} menit membaca</span>
              </div>
              <h3
                onClick={() => setReadingArticle(featuredArticle)}
                className="text-lg sm:text-xl font-bold text-slate-900 hover:text-emerald-700 cursor-pointer transition-colors leading-snug"
              >
                {featuredArticle.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                {featuredArticle.summary}
              </p>
              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-semibold text-slate-700">
                    Ditinjau oleh: {featuredArticle.doctorReview.reviewerName}
                  </span>
                </div>
                <button
                  onClick={() => setReadingArticle(featuredArticle)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
                >
                  Baca Materi
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Doctor WhatsApp Teleconsultation */}
      <DoctorWhatsAppCard />

      {/* Article Reader Modal */}
      <ArticleModal
        article={readingArticle}
        onClose={() => setReadingArticle(null)}
      />
    </div>
  );
}
