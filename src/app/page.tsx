"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BookOpen,
  Calculator,
  CalendarDays,
  FileCheck2,
  HeartPulse,
  Plus,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useDiabetesStore } from "@/lib/storage";
import { MetricCards } from "@/components/dashboard/MetricCards";
import { GlucoseChart } from "@/components/dashboard/GlucoseChart";
import { BloodSugarForm } from "@/components/blood-sugar/BloodSugarForm";
import { ArticleModal } from "@/components/education/ArticleModal";
import { EducationalArticle } from "@/types";
import { evaluateGlucoseLevel, formatDateTime } from "@/lib/utils";
import { DoctorWhatsAppCard } from "@/components/whatsapp/DoctorWhatsAppCard";

export default function HomePage() {
  const { logs, profile, articles, addBloodSugarLog } = useDiabetesStore();
  const [showQuickForm, setShowQuickForm] = useState(false);
  const [readingArticle, setReadingArticle] = useState<EducationalArticle | null>(null);

  const featuredArticle = articles[0];

  return (
    <div className="space-y-8">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
              <HeartPulse className="w-4 h-4 animate-pulse" />
              <span>Sesi Terautentikasi Pasien • Supabase Auth Terhubung</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Selamat Datang Kembali, {profile.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Pantau kadar gula darah mandiri, hitung Beban Glikemik (GL) piring makanan Anda, dan pelajari materi kesehatan diabetes yang telah diverifikasi oleh dokter spesialis.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
            <button
              onClick={() => setShowQuickForm(!showQuickForm)}
              className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-500/30 cursor-pointer transition-transform hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>{showQuickForm ? "Tutup Form" : "Catat Gula Darah"}</span>
            </button>
            <Link
              href="/calculator"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 border border-white/20 backdrop-blur-xs transition-colors"
            >
              <Calculator className="w-4 h-4" />
              <span>Kalkulator GL</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Expandable Quick Add Form */}
      {showQuickForm && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-300">
          <BloodSugarForm
            onAddLog={(newLog) => {
              addBloodSugarLog(newLog);
              setShowQuickForm(false);
            }}
          />
        </div>
      )}

      {/* 4 Clinical Metric Summary Cards */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Ringkasan Parameter Klinis</h2>
          <span className="text-xs text-slate-500">Berdasarkan data terkini</span>
        </div>
        <MetricCards logs={logs} profile={profile} />
      </section>

      {/* Glucose Trend Chart & Fast Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Trend Chart (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-base">
                  Kurva Dinamika Kadar Gula Darah
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                Garis acuan standar medis: target normal (&lt; 140 mg/dL) vs ambang waspada
              </p>
            </div>
            <Link
              href="/blood-sugar"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              <span>Semua Riwayat Log</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <GlucoseChart logs={logs} />
        </div>

        {/* Quick Menu / Navigation Shortcut (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Fitur Utama Aplikasi</h3>
            <p className="text-xs text-slate-500">Akses cepat modul manajemen diabetes</p>

            <div className="space-y-2 pt-1">
              <Link
                href="/calculator"
                className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-emerald-50/80 hover:border-emerald-200 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-xs text-slate-900 group-hover:text-emerald-800">
                      Kalkulator Indeks Glikemik
                    </p>
                    <p className="text-[11px] text-slate-500">Hitung beban glikemik porsi makanan</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
              </Link>

              <Link
                href="/education"
                className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-emerald-50/80 hover:border-emerald-200 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-xs text-slate-900 group-hover:text-emerald-800">
                      Pustaka Edukasi Terverifikasi
                    </p>
                    <p className="text-[11px] text-slate-500">Artikel hasil peer-review dokter spesialis</p>
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
                    <p className="text-[11px] text-slate-500">Piring model T rendah beban glikemik</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
              </Link>

              <Link
                href="/doctor-portal"
                className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-emerald-50/80 hover:border-emerald-200 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center">
                    <FileCheck2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-xs text-slate-900 group-hover:text-emerald-800">
                      Portal Peer Review Dokter
                    </p>
                    <p className="text-[11px] text-slate-500">Verifikasi dan tanda tangan medis</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Educational Article & Recent Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent logs table preview (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Catatan Gula Darah Terakhir</h3>
              <p className="text-xs text-slate-500">5 entri pengukuran terbaru</p>
            </div>
            <Link
              href="/blood-sugar"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
            >
              Lihat Semua ({logs.length})
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {logs.slice(0, 5).map((log) => {
              const evalInfo = evaluateGlucoseLevel(log.sugarLevel, log.measurementContext);
              return (
                <div key={log.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{log.sugarLevel} mg/dL</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.2 rounded-full border ${evalInfo.badgeBg}`}
                      >
                        {evalInfo.status}
                      </span>
                    </div>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      {log.measurementContext} • {formatDateTime(log.recordedAt)}
                    </p>
                  </div>
                  {log.notes && (
                    <span className="text-slate-400 text-[11px] italic max-w-[180px] truncate hidden sm:block">
                      &quot;{log.notes}&quot;
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Featured Doctor Reviewed Article (5 cols) */}
        {featuredArticle && (
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {featuredArticle.category}
                </span>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                  {featuredArticle.readingTimeMinutes} mnt baca
                </span>
              </div>

              <h3 className="font-bold text-base text-slate-900 leading-snug">
                {featuredArticle.title}
              </h3>

              <p className="text-xs text-slate-600 line-clamp-3 mt-2 leading-relaxed">
                {featuredArticle.summary}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-bold text-slate-800">
                  {featuredArticle.doctorReview.reviewerName}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 italic">
                &quot;{featuredArticle.doctorReview.reviewNotes}&quot;
              </p>
              <button
                onClick={() => setReadingArticle(featuredArticle)}
                className="w-full mt-2 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <span>Baca Materi Lengkap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* WhatsApp Doctor Consultation Card */}
      <section>
        <DoctorWhatsAppCard />
      </section>

      {/* Modal reader */}
      {readingArticle && (
        <ArticleModal article={readingArticle} onClose={() => setReadingArticle(null)} />
      )}
    </div>
  );
}
