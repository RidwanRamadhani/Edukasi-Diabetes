"use client";

import { CheckCircle2, Clock, Globe, ShieldCheck, User, X, ExternalLink } from "lucide-react";
import { EducationalArticle } from "@/types";
import { formatDate } from "@/lib/utils";

interface ArticleModalProps {
  article: EducationalArticle | null;
  onClose: () => void;
}

export function ArticleModal({ article, onClose }: ArticleModalProps) {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              {article.category}
            </span>
            {article.sourceMedia && (
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-1">
                <Globe className="w-3 h-3" />
                <span>Publikasi: {article.sourceMedia}</span>
              </span>
            )}
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readingTimeMinutes} menit baca
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              {article.title}
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-2">
              <span>Dipublikasikan {formatDate(article.createdAt)}</span>
              <span>•</span>
              <span className="font-medium text-slate-700">Penulis: {article.author}</span>
            </div>
          </div>

          {/* Doctor Verification Ribbon */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border border-emerald-200/80 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-xs space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-emerald-950 text-sm">
                  {article.doctorReview.reviewerName}
                </span>
                <span className="inline-flex items-center gap-1 bg-emerald-200/70 text-emerald-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                  Terverifikasi Peer Review Medis
                </span>
              </div>
              <p className="text-slate-600">
                {article.doctorReview.reviewerTitle} • {article.doctorReview.hospital}
              </p>
              <p className="text-[11px] text-slate-500">
                Nomor STR: <span className="font-mono">{article.doctorReview.strNumber}</span>
              </p>
              {article.doctorReview.reviewNotes && (
                <div className="mt-2 p-2.5 rounded-lg bg-white/80 border border-emerald-100 text-slate-700 italic">
                  &quot;{article.doctorReview.reviewNotes}&quot;
                </div>
              )}
            </div>
          </div>

          {/* Article Text Content */}
          <div className="prose prose-slate prose-sm sm:prose-base max-w-none text-slate-700 leading-relaxed space-y-4">
            {article.content.split("\n\n").map((para, i) => {
              if (para.startsWith("### ")) {
                return (
                  <h3 key={i} className="text-base sm:text-lg font-bold text-slate-900 pt-2">
                    {para.replace("### ", "")}
                  </h3>
                );
              }
              if (para.startsWith("```")) {
                const codeContent = para.replace(/```/g, "").trim();
                return (
                  <pre
                    key={i}
                    className="bg-slate-900 text-emerald-300 p-3.5 rounded-xl font-mono text-xs overflow-x-auto"
                  >
                    {codeContent}
                  </pre>
                );
              }
              return (
                <p key={i} className="text-slate-700 text-sm leading-relaxed">
                  {para}
                </p>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span>Sumber Asli Materi: kumparan.com</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold cursor-pointer"
          >
            Tutup Artikel
          </button>
        </div>
      </div>
    </div>
  );
}
