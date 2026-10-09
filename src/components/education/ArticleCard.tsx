"use client";

import { ArrowRight, CheckCircle2, Clock, Globe, ShieldCheck } from "lucide-react";
import { EducationalArticle } from "@/types";
import { formatDate } from "@/lib/utils";

interface ArticleCardProps {
  article: EducationalArticle;
  onRead: (article: EducationalArticle) => void;
}

export function ArticleCard({ article, onRead }: ArticleCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group">
      <div className="p-5 sm:p-6 space-y-3">
        {/* Category & Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              {article.category}
            </span>
            {article.sourceMedia && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                <Globe className="w-2.5 h-2.5" />
                <span>Terbit di {article.sourceMedia}</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-[11px] text-slate-500">
            <Clock className="w-3.5 h-3.5" />
            <span>{article.readingTimeMinutes} mnt baca</span>
          </div>
        </div>

        {/* Title */}
        <h3
          onClick={() => onRead(article)}
          className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors cursor-pointer leading-snug line-clamp-2"
        >
          {article.title}
        </h3>

        {/* Summary */}
        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
          {article.summary}
        </p>
      </div>

      {/* Footer with doctor verification note */}
      <div className="p-4 sm:px-6 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-slate-800 truncate">
              {article.doctorReview.reviewerName}
            </p>
            <p className="text-[9px] text-emerald-700 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-2.5 h-2.5" />
              Terverifikasi Medis
            </p>
          </div>
        </div>

        <button
          onClick={() => onRead(article)}
          className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer shrink-0"
        >
          <span>Baca</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
