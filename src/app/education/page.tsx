"use client";

import { useState } from "react";
import { BookOpen, Filter, Search, ShieldCheck } from "lucide-react";
import { useDiabetesStore } from "@/lib/storage";
import { ArticleCard } from "@/components/education/ArticleCard";
import { ArticleModal } from "@/components/education/ArticleModal";
import { EducationalArticle } from "@/types";
import { DoctorWhatsAppCard } from "@/components/whatsapp/DoctorWhatsAppCard";

export default function EducationPage() {
  const { articles } = useDiabetesStore();
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedArticle, setSelectedArticle] = useState<EducationalArticle | null>(null);

  const categories = [
    "ALL",
    "Nutrisi & Diet",
    "Pola Hidup & Aktivitas",
    "Pencegahan Komplikasi",
    "Panduan Obat & Insulin",
  ];

  const filteredArticles = articles.filter((art) => {
    const matchesCategory = activeCategory === "ALL" || art.category === activeCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.doctorReview.reviewerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Page Title & Medical Guarantee Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-900 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-700 text-emerald-100 text-[10px] font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verifikasi Dokter Spesialis Penyakit Dalam (Sp.PD)</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Pustaka Edukasi Medis Diabetes
          </h1>
          <p className="text-xs text-emerald-100 mt-1 max-w-2xl leading-relaxed">
            Seluruh materi disusun berbasis bukti klinis (Evidence-Based Medicine) dan telah melalui
            proses Peer Review oleh dokter spesialis terdaftar untuk menjamin keakuratan informasi.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => {
            const count =
              cat === "ALL"
                ? articles.length
                : articles.filter((a) => a.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs rounded-xl font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeCategory === cat
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                <span>{cat === "ALL" ? "Semua Kategori" : cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    activeCategory === cat
                      ? "bg-white/25 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari artikel, topik, atau dokter..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-800"
          />
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-700">Tidak ada artikel yang cocok</p>
          <p className="text-xs text-slate-400 mt-1">Coba kata kunci atau kategori yang berbeda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onRead={(art) => setSelectedArticle(art)}
            />
          ))}
        </div>
      )}

      {/* WhatsApp Doctor Consultation Card */}
      <section className="pt-4">
        <DoctorWhatsAppCard />
      </section>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
}
