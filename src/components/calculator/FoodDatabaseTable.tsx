"use client";

import { useState } from "react";
import { Search, Utensils } from "lucide-react";
import { FoodItem } from "@/types";

interface FoodDatabaseTableProps {
  foods: FoodItem[];
  onSelectFood?: (food: FoodItem) => void;
}

export function FoodDatabaseTable({ foods, onSelectFood }: FoodDatabaseTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [giFilter, setGiFilter] = useState("ALL");

  const filteredFoods = foods.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (f.benefits && f.benefits.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = categoryFilter === "ALL" || f.category === categoryFilter;
    const matchesGi = giFilter === "ALL" || f.giClassification === giFilter;

    return matchesSearch && matchesCategory && matchesGi;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Utensils className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-base">
              Katalog Makanan &amp; Indeks Glikemik
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Database nilai GI dan kandungan karbohidrat terverifikasi ({filteredFoods.length} bahan)
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Search */}
          <div className="relative flex-1 md:w-48">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari makanan..."
              className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="ALL">Semua Kategori</option>
            <option value="Karbohidrat & Biji-bijian">Karbohidrat &amp; Biji-bijian</option>
            <option value="Buah & Sayuran">Buah &amp; Sayuran</option>
            <option value="Protein & Olahan">Protein &amp; Olahan</option>
          </select>

          {/* GI Filter */}
          <select
            value={giFilter}
            onChange={(e) => setGiFilter(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="ALL">Semua Tingkat GI</option>
            <option value="Rendah">GI Rendah (&le; 55)</option>
            <option value="Sedang">GI Sedang (56 - 69)</option>
            <option value="Tinggi">GI Tinggi (&ge; 70)</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase font-semibold">
              <th className="py-3 px-4">Nama Makanan</th>
              <th className="py-3 px-4">Kategori</th>
              <th className="py-3 px-4">Indeks Glikemik (GI)</th>
              <th className="py-3 px-4">Karbohidrat / 100g</th>
              <th className="py-3 px-4">Porsi Standar</th>
              <th className="py-3 px-4">Catatan Medis</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filteredFoods.map((food) => {
              const giBadgeColor =
                food.giClassification === "Rendah"
                  ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                  : food.giClassification === "Sedang"
                  ? "bg-amber-100 text-amber-800 border-amber-200"
                  : "bg-rose-100 text-rose-800 border-rose-200";

              return (
                <tr key={food.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    {food.name}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">{food.category}</td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${giBadgeColor}`}
                    >
                      {food.glycemicIndex} ({food.giClassification})
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    {food.carbohydrateGramPer100g} g
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{food.servingDescription}</td>
                  <td className="py-3.5 px-4 max-w-xs text-slate-500 text-[11px] leading-relaxed">
                    {food.benefits || "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
