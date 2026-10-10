"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  ExternalLink,
  Eye,
  FileCheck,
  ShieldAlert,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { EducationalArticle } from "@/types";
import { formatDateTime } from "@/lib/utils";
import { ArticleModal } from "@/components/education/ArticleModal";

interface DoctorReviewPanelProps {
  articles: EducationalArticle[];
  onUpdateReviewStatus: (
    articleId: string,
    status: "Approved" | "Revision Needed" | "Pending Review",
    doctorNotes: string,
    doctorName: string
  ) => void;
}

export function DoctorReviewPanel({ articles, onUpdateReviewStatus }: DoctorReviewPanelProps) {
  const [selectedArticleId, setSelectedArticleId] = useState<string>(articles[0]?.id || "");
  const [doctorName, setDoctorName] = useState("");
  const [doctorNotes, setDoctorNotes] = useState("");
  const [statusAction, setStatusAction] = useState<"Approved" | "Revision Needed">("Approved");
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [previewArticle, setPreviewArticle] = useState<EducationalArticle | null>(null);

  const selectedArticle = articles.find((a) => a.id === selectedArticleId);

  // Sync inputs with selected article's current review data
  useEffect(() => {
    if (selectedArticle) {
      setDoctorName(selectedArticle.doctorReview.reviewerName || "dr. Handoko Santoso, Sp.PD, KEMD");
      setDoctorNotes(selectedArticle.doctorReview.reviewNotes || "");
      setStatusAction(
        selectedArticle.doctorReview.approvalStatus === "Revision Needed"
          ? "Revision Needed"
          : "Approved"
      );
    }
  }, [selectedArticleId, selectedArticle]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedArticle) return;

    const noteToSave = doctorNotes.trim() || "Diverifikasi sesuai kaidah medis pedoman PERKENI 2023.";

    onUpdateReviewStatus(selectedArticle.id, statusAction, noteToSave, doctorName);

    setFeedbackMsg(
      `Sertifikasi medis untuk "${selectedArticle.title}" berhasil disimpan! Catatan Anda kini otomatis aktif dan tampil pada modul Edukasi Pasien.`
    );
    setTimeout(() => setFeedbackMsg(""), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Banner Dokter */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
            <Stethoscope className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold">Portal Verifikasi Medis &amp; Peer Review Dokter</h2>
              <span className="text-[10px] bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 px-2 py-0.5 rounded-full font-bold">
                Klinis Aktif
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Sesuai PRD Fase 3: Seluruh catatan klinis dan tanda tangan dokter akan langsung dipublikasikan ke halaman edukasi pasien dengan tanda verifikasi resmi.
            </p>
          </div>
        </div>

        <Link
          href="/education"
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold flex items-center gap-2 text-emerald-200 hover:text-white transition-all shrink-0"
        >
          <BookOpen className="w-4 h-4" />
          <span>Lihat Halaman Edukasi Pasien</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {feedbackMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2.5 shadow-xs animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Kolom Kiri: Daftar Artikel */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-900">
              Daftar Artikel Siap Tinjau ({articles.length})
            </h3>
            <span className="text-[11px] text-slate-500">Pilih naskah</span>
          </div>

          <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
            {articles.map((art) => {
              const isSelected = art.id === selectedArticleId;
              const isApproved = art.doctorReview.approvalStatus === "Approved";
              return (
                <div
                  key={art.id}
                  onClick={() => setSelectedArticleId(art.id)}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    isSelected
                      ? "bg-emerald-50/90 border-emerald-400 shadow-sm ring-1 ring-emerald-400/30"
                      : "bg-slate-50/60 border-slate-200/70 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">
                      {art.category}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        isApproved
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : "bg-amber-100 text-amber-800 border border-amber-200"
                      }`}
                    >
                      {isApproved ? "✓ Disetujui" : "⚠ Perlu Revisi"}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 leading-snug line-clamp-2">
                    {art.title}
                  </h4>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/50 text-[10px] text-slate-500">
                    <span className="truncate max-w-[170px]">
                      Dokter: {art.doctorReview.reviewerName}
                    </span>
                    <span className="text-emerald-700 font-semibold">Tinjau &rarr;</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Kolom Kanan: Form Evaluasi Dokter & Live Output */}
        <div className="lg:col-span-7 space-y-6">
          {selectedArticle ? (
            <>
              {/* Form Input Evaluasi */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div className="pb-3 border-b border-slate-100 flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        Formulir Tinjauan Medis
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-2">
                        {selectedArticle.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Penulis: {selectedArticle.author} • Estimasi: {selectedArticle.readingTimeMinutes} menit baca
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setPreviewArticle(selectedArticle)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 flex items-center gap-1.5 shrink-0 transition-colors"
                      title="Lihat tampilan artikel lengkap"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      <span>Baca Naskah</span>
                    </button>
                  </div>

                  {/* Ringkasan Naskah */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700 leading-relaxed">
                    <span className="font-bold text-slate-900 block mb-1">Ringkasan Materi Pasien:</span>
                    {selectedArticle.summary}
                  </div>

                  {/* Input Reviewer & Keputusan */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Nama Dokter Peninjau (Reviewer) <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={doctorName}
                        onChange={(e) => setDoctorName(e.target.value)}
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Status Keputusan Medis <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={statusAction}
                        onChange={(e) => setStatusAction(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      >
                        <option value="Approved">Setujui &amp; Beri Label Terverifikasi</option>
                        <option value="Revision Needed">Minta Revisi Medis ke Penulis</option>
                      </select>
                    </div>
                  </div>

                  {/* Catatan Evaluasi Klinis */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Catatan Evaluasi Klinis Dokter &amp; Referensi Medis
                    </label>
                    <textarea
                      rows={3}
                      value={doctorNotes}
                      onChange={(e) => setDoctorNotes(e.target.value)}
                      placeholder="Ketik catatan evaluasi medis Anda di sini. Catatan ini akan ditampilkan secara publik kepada pasien..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 placeholder:text-slate-400"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      Catatan ini menjadi acuan kredibilitas klinis bagi pembaca/pasien di aplikasi.
                    </p>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.01]"
                    >
                      <FileCheck className="w-4 h-4" />
                      <span>Simpan Verifikasi Medis &amp; Tanda Tangan</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* OUTPUT TAMPILAN RESMI (HASIL EVALUASI YANG DILIHAT PASIEN) */}
              <div className="bg-white rounded-2xl border-2 border-emerald-200/80 p-5 sm:p-6 shadow-sm space-y-3.5">
                <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        Output Sertifikasi Medis (Tampilan di Sisi Pasien)
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Inilah tampilan yang dibaca pengguna pada modul edukasi DIASERA
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setPreviewArticle(selectedArticle)}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Buka Tampilan Pasien</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Banner Kotak Sertifikat Medis yang Tampil di Pasien */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border border-emerald-200 space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-emerald-950">
                        {selectedArticle.doctorReview.reviewerName}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                          selectedArticle.doctorReview.approvalStatus === "Approved"
                            ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                            : "bg-amber-100 text-amber-800 border-amber-200"
                        }`}
                      >
                        {selectedArticle.doctorReview.approvalStatus === "Approved"
                          ? "✓ Terverifikasi Peer Review Medis"
                          : "⚠ Revisi Medis Diperlukan"}
                      </span>
                    </div>

                    <span className="text-[11px] text-slate-500 font-mono">
                      STR: {selectedArticle.doctorReview.strNumber}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600">
                    {selectedArticle.doctorReview.reviewerTitle} • {selectedArticle.doctorReview.hospital}
                  </p>

                  {/* Kotak Catatan Dokter */}
                  <div className="p-3 rounded-lg bg-white/90 border border-emerald-200/70 text-xs text-slate-800 shadow-xs">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-bold mb-1 text-[11px]">
                      <span>Catatan Klinis Dokter:</span>
                    </div>
                    <p className="italic leading-relaxed">
                      &quot;{selectedArticle.doctorReview.reviewNotes || "Belum ada catatan evaluasi."}&quot;
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                    <span>
                      Waktu Verifikasi Terakhir:{" "}
                      <strong>{formatDateTime(selectedArticle.doctorReview.reviewedAt)}</strong>
                    </span>
                    <span className="text-emerald-700 font-semibold">Tersinkronisasi Realtime</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="h-64 flex items-center justify-center text-xs text-slate-400 bg-white rounded-2xl border border-slate-200">
              Pilih artikel dari daftar di sebelah kiri untuk memulai peninjauan.
            </div>
          )}
        </div>
      </div>

      {/* Modal Preview Pasien */}
      {previewArticle && (
        <ArticleModal article={previewArticle} onClose={() => setPreviewArticle(null)} />
      )}
    </div>
  );
}
