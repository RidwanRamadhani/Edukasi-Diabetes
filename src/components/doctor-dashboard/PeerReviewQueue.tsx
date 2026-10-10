"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Clock,
  Eye,
  FileCheck,
  FileText,
  Filter,
  Globe,
  Search,
  ShieldCheck,
  Stethoscope,
  X,
  AlertTriangle,
} from "lucide-react";
import { EducationalArticle, DoctorProfile } from "@/types";
import { formatDate, formatDateTime } from "@/lib/utils";

interface PeerReviewQueueProps {
  articles: EducationalArticle[];
  doctor: DoctorProfile;
  onUpdateReviewStatus: (
    articleId: string,
    status: "Approved" | "Revision Needed" | "Pending Review",
    doctorNotes: string,
    doctorName: string
  ) => void;
}

export function PeerReviewQueue({
  articles,
  doctor,
  onUpdateReviewStatus,
}: PeerReviewQueueProps) {
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [reviewingArticle, setReviewingArticle] = useState<EducationalArticle | null>(null);

  // Review modal state
  const [decision, setDecision] = useState<"Approved" | "Revision Needed">("Approved");
  const [clinicalNotes, setClinicalNotes] = useState("");
  const [successToast, setSuccessToast] = useState("");

  const filteredArticles = articles.filter((art) => {
    const matchesFilter =
      filterStatus === "ALL" || art.doctorReview.approvalStatus === filterStatus;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleOpenReviewModal = (art: EducationalArticle) => {
    setReviewingArticle(art);
    setDecision(art.doctorReview.approvalStatus === "Revision Needed" ? "Revision Needed" : "Approved");
    setClinicalNotes(art.doctorReview.reviewNotes || "");
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewingArticle) return;

    const noteToSave =
      clinicalNotes.trim() ||
      `Diverifikasi dan disetujui sesuai Panduan Klinis Edukasi Pencegahan & Pengendalian Diabetes Melitus DIASERA oleh ${doctor.name}.`;

    onUpdateReviewStatus(reviewingArticle.id, decision, noteToSave, doctor.name);

    setSuccessToast(`Keputusan review medis untuk "${reviewingArticle.title}" berhasil disimpan!`);
    setReviewingArticle(null);
    setTimeout(() => setSuccessToast(""), 4500);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
      {/* Header and Controls */}
      <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
              <FileCheck className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Antrean Peer Review Naskah Edukasi
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Daftar artikel kesehatan dan edukasi pencegahan diabetes yang menunggu validasi klinis dokter ({filteredArticles.length} naskah)
          </p>
        </div>

        {/* Filter & Search */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-transparent font-semibold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="ALL">Semua Status</option>
              <option value="Approved">Disetujui (Approved)</option>
              <option value="Revision Needed">Perlu Revisi (Revision)</option>
              <option value="Pending Review">Menunggu Tinjauan</option>
            </select>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari naskah / penulis..."
              className="text-xs pl-8 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800 w-44 sm:w-56"
            />
          </div>
        </div>
      </div>

      {successToast && (
        <div className="m-5 p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Table View */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-100 text-slate-500 uppercase tracking-wider font-semibold">
              <th className="py-3 px-4">Judul Naskah</th>
              <th className="py-3 px-4">Kategori &amp; Media</th>
              <th className="py-3 px-4">Penulis</th>
              <th className="py-3 px-4">Status Keputusan</th>
              <th className="py-3 px-4">Reviewer Terakhir</th>
              <th className="py-3 px-4 text-right">Aksi Tindakan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filteredArticles.map((art) => {
              const isApproved = art.doctorReview.approvalStatus === "Approved";
              return (
                <tr key={art.id} className="hover:bg-slate-50/70 transition-colors">
                  {/* Judul */}
                  <td className="py-3.5 px-4 max-w-sm">
                    <p className="font-bold text-slate-900 leading-snug line-clamp-2">
                      {art.title}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                      {art.summary}
                    </p>
                  </td>

                  {/* Kategori & Sumber */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 block w-fit mb-1">
                      {art.category}
                    </span>
                    {art.sourceMedia && (
                      <span className="text-[9px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200 flex items-center gap-1 w-fit">
                        <Globe className="w-2.5 h-2.5" />
                        <span>{art.sourceMedia}</span>
                      </span>
                    )}
                  </td>

                  {/* Penulis */}
                  <td className="py-3.5 px-4 whitespace-nowrap text-slate-600 font-medium">
                    {art.author}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        isApproved
                          ? "bg-teal-100 text-teal-800 border-teal-200"
                          : "bg-amber-100 text-amber-800 border-amber-200"
                      }`}
                    >
                      {isApproved ? "✓ Terverifikasi" : "⚠ Perlu Tinjauan"}
                    </span>
                  </td>

                  {/* Reviewer */}
                  <td className="py-3.5 px-4 text-[11px] text-slate-500 max-w-[160px] truncate">
                    {art.doctorReview.reviewerName}
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleOpenReviewModal(art)}
                      className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs inline-flex items-center gap-1.5 transition-transform hover:scale-105 cursor-pointer"
                    >
                      <Stethoscope className="w-3.5 h-3.5" />
                      <span>Review Medis</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MODAL REVIEW MEDIS */}
      {reviewingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 bg-slate-50/80 flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-200 uppercase tracking-wider">
                  Panel Evaluasi Klinis Dokter
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1 leading-snug">
                  {reviewingArticle.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Penulis: {reviewingArticle.author} • Kategori: {reviewingArticle.category}
                </p>
              </div>
              <button
                onClick={() => setReviewingArticle(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmitReview} className="p-6 overflow-y-auto space-y-4">
              {/* Ringkasan Naskah */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                <span className="font-bold text-slate-900 block mb-1">Ringkasan Materi Pasien:</span>
                {reviewingArticle.summary}
              </div>

              {/* Data Reviewer Dokter */}
              <div className="p-3.5 rounded-xl bg-teal-50/80 border border-teal-200 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-teal-950">{doctor.name}</span>
                  <span className="text-teal-700 font-mono text-[11px]">{doctor.strNumber}</span>
                </div>
                <p className="text-teal-900/80 text-[11px]">{doctor.title} • {doctor.hospital}</p>
              </div>

              {/* Keputusan Validasi */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Keputusan Validasi Medis <span className="text-rose-500">*</span>
                </label>
                <select
                  value={decision}
                  onChange={(e) => setDecision(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                >
                  <option value="Approved">
                    ✓ Setujui Naskah &amp; Sematkan Label Terverifikasi Dokter
                  </option>
                  <option value="Revision Needed">
                    ⚠ Minta Revisi Medis (Penulis Wajib Memperbaiki)
                  </option>
                </select>
              </div>

              {/* Catatan Evaluasi Klinis */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Catatan Evaluasi Klinis &amp; Referensi Medis
                </label>
                <textarea
                  rows={4}
                  value={clinicalNotes}
                  onChange={(e) => setClinicalNotes(e.target.value)}
                  placeholder="Ketik catatan evaluasi klinis Anda di sini (misal: Sesuai panduan pencegahan DIASERA, edukasi aktivitas fisik dan nutrisi seimbang sudah tepat dan ilmiah)..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                />
                <p className="text-[10px] text-slate-500 mt-1">
                  Catatan ini akan tampil sebagai kutipan dokter resmi terverifikasi di atas artikel bagi seluruh pembaca DIASERA.
                </p>
              </div>

              {/* Action buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setReviewingArticle(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-md shadow-teal-700/20 flex items-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Simpan Verifikasi &amp; Tanda Tangan Digital</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
