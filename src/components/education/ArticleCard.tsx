"use client";

import { ArrowRight, CheckCircle2, Clock, Globe, ShieldCheck } from "lucide-react";
import { EducationalArticle } from "@/types";

interface ArticleCardProps {
  article: EducationalArticle;
  onRead: (article: EducationalArticle) => void;
}

export function ArticleCard({ article, onRead }: ArticleCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      <div>
        {/* Featured Image Thumbnail with Badge Overlay */}
        <div
          onClick={() => onRead(article)}
          className="relative w-full h-48 sm:h-52 overflow-hidden bg-slate-100 cursor-pointer"
        >
          {article.featuredImage ? (
            <img
              src={article.featuredImage}
              alt={article.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-teal-50 flex items-center justify-center text-emerald-700">
              <ShieldCheck className="w-12 h-12 opacity-40" />
            </div>
          )}

          {/* Gradient shadow for badges */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/30 pointer-events-none" />

          {/* Top badges: Category & Reading Time */}
          <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 pointer-events-none">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-emerald-600 text-white shadow-sm backdrop-blur-xs">
              {article.category}
            </span>
            <span className="text-[10px] font-semibold text-white/95 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{article.readingTimeMinutes} mnt baca</span>
            </span>
          </div>

          {/* Bottom badge: Source Kumparan */}
          {article.sourceMedia && (
            <div className="absolute bottom-2.5 left-3 pointer-events-none">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-blue-600/90 text-white backdrop-blur-xs flex items-center gap-1 shadow-xs">
                <Globe className="w-2.5 h-2.5" />
                <span>Liputan {article.sourceMedia}</span>
              </span>
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="p-5 sm:p-6 space-y-2.5">
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
      </div>

      {/* Footer with doctor verification note */}
      <div className="p-4 sm:px-6 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-slate-800 truncate">
              {article.doctorReview.reviewerName}
            </p>
            <p className="text-[9px] text-emerald-700 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-2.5 h-2.5 shrink-0" />
              <span>Terverifikasi Medis</span>
            </p>
          </div>
        </div>

        <button
          onClick={() => onRead(article)}
          className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer shrink-0 group-hover:translate-x-0.5 transition-transform"
        >
          <span>Baca</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
