"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  ExternalLink,
  Globe,
  MessageCircle,
  Share2,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { useDiabetesStore } from "@/lib/storage";
import { formatDate } from "@/lib/utils";
import { cleanWhatsAppNumber } from "@/components/doctor-dashboard/PatientMonitoringTable";

interface ArticleDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { articles, activeDoctor } = useDiabetesStore();

  const article = articles.find((a) => a.id === resolvedParams.id);

  if (!article) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 mx-auto flex items-center justify-center font-bold">
          <BookOpen className="w-8 h-8" />
        </div>
        <h1 className="text-xl font-bold text-slate-900">Artikel Tidak Ditemukan</h1>
        <p className="text-xs text-slate-600 max-w-md mx-auto">
          Artikel yang Anda cari mungkin telah diperbarui atau dipindahkan ke daftar artikel lainnya.
        </p>
        <Link
          href="/education"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Pustaka Edukasi</span>
        </Link>
      </div>
    );
  }

  const doctorPhone = activeDoctor?.phone ? cleanWhatsAppNumber(activeDoctor.phone) : "6289668251739";

  return (
    <article className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Navigation */}
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/education"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Semua Materi Edukasi</span>
        </Link>

        {article.sourceUrl && (
          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Kunjungi Liputan Kumparan</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        {/* Banner Image */}
        {article.featuredImage && (
          <div className="relative w-full h-64 sm:h-96 bg-slate-100 overflow-hidden">
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />

            <div className="absolute top-4 inset-x-4 flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-emerald-600 text-white shadow-md">
                {article.category}
              </span>
              <span className="text-[11px] font-semibold text-white bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{article.readingTimeMinutes} Menit Membaca</span>
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-xs text-white/80">Dokumentasi Liputan: {article.sourceMedia || "kumparan.com"}</span>
            </div>
          </div>
        )}

        <div className="p-6 sm:p-10 space-y-6">
          {/* Title & Metadata */}
          <div className="space-y-3 pb-6 border-b border-slate-100">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span>Dipublikasikan: {formatDate(article.createdAt)}</span>
              <span>•</span>
              <span className="font-semibold text-slate-700">Kontributor: {article.author}</span>
              <span>•</span>
              <span className="text-blue-600 font-bold">Media: {article.sourceMedia}</span>
            </div>
          </div>

          {/* Doctor Verification Badge */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border border-emerald-200/90 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-xs space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-emerald-950 text-sm">
                  {article.doctorReview.reviewerName}
                </span>
                <span className="inline-flex items-center gap-1 bg-emerald-200/70 text-emerald-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                  Terverifikasi Peer Review Medis DIASERA
                </span>
              </div>
              <p className="text-slate-600">
                {article.doctorReview.reviewerTitle} • {article.doctorReview.hospital}
              </p>
              <p className="text-slate-500 font-mono text-[11px]">{article.doctorReview.strNumber}</p>
              {article.doctorReview.reviewNotes && (
                <div className="mt-2.5 p-3 rounded-xl bg-white/90 border border-emerald-200/70 text-slate-700 text-xs italic leading-relaxed">
                  &ldquo;{article.doctorReview.reviewNotes}&rdquo;
                </div>
              )}
            </div>
          </div>

          {/* Article Summary Lead */}
          <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-emerald-600 text-slate-800 text-xs sm:text-sm leading-relaxed font-medium">
            {article.summary}
          </div>

          {/* Article Markdown Content Body */}
          <div className="space-y-4 pt-2">
            {article.content.split("\n\n").map((para, i) => {
              const trimmed = para.trim();
              if (!trimmed) return null;

              if (trimmed.startsWith("###")) {
                return (
                  <h3 key={i} className="text-base sm:text-lg font-bold text-slate-900 pt-3">
                    {trimmed.replace(/^###\s*/, "")}
                  </h3>
                );
              }
              if (trimmed.startsWith("##")) {
                return (
                  <h2 key={i} className="text-lg sm:text-xl font-bold text-slate-900 pt-4">
                    {trimmed.replace(/^##\s*/, "")}
                  </h2>
                );
              }
              if (trimmed.startsWith("-") || trimmed.startsWith("*")) {
                const items = trimmed.split("\n").filter(Boolean);
                return (
                  <ul key={i} className="space-y-1.5 list-disc list-inside text-xs sm:text-sm text-slate-700">
                    {items.map((it, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {it.replace(/^[-*]\s*/, "")}
                      </li>
                    ))}
                  </ul>
                );
              }

              return (
                <p key={i} className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {trimmed}
                </p>
              );
            })}
          </div>

          {/* Bottom Teleconsultation CTA */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Punya Pertanyaan Medis Terkait Artikel Ini?</p>
                <p className="text-[11px] text-slate-500">Diskusikan langsung dengan tim dokter DIASERA via WhatsApp</p>
              </div>
            </div>

            <a
              href={`https://api.whatsapp.com/send?phone=${doctorPhone}&text=${encodeURIComponent(
                `Halo Dokter DIASERA, saya ingin berkonsultasi mengenai materi artikel: "${article.title}"`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Tanya Dokter di WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
