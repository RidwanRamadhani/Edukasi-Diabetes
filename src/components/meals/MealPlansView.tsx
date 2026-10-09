"use client";

import { useState } from "react";
import { Calendar, CheckCircle2, Coffee, Flame, Heart, Moon, Sparkles, Sun, Utensils } from "lucide-react";
import { initialMealRecommendations } from "@/data/mockMealPlans";
import { evaluateGlycemicLoad } from "@/lib/utils";

export function MealPlansView() {
  const [selectedMeal, setSelectedMeal] = useState<string>("ALL");

  const meals = initialMealRecommendations.filter((m) =>
    selectedMeal === "ALL" ? true : m.mealTime === selectedMeal
  );

  const getMealIcon = (mealTime: string) => {
    switch (mealTime) {
      case "Sarapan":
        return <Coffee className="w-5 h-5 text-amber-500" />;
      case "Makan Siang":
        return <Sun className="w-5 h-5 text-orange-500" />;
      case "Camilan Sore":
        return <Utensils className="w-5 h-5 text-emerald-500" />;
      case "Makan Malam":
        return <Moon className="w-5 h-5 text-indigo-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-teal-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-900 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-700 text-emerald-100">
            Nutrisi &amp; Diet Medis
          </span>
          <h2 className="text-xl font-bold mt-2 text-white">
            Rekomendasi Menu Harian Ramah Diabetes
          </h2>
          <p className="text-xs text-emerald-100 max-w-xl mt-1 leading-relaxed">
            Dirancang berdasarkan pedoman &quot;Piring Makanku&quot; dengan perhitungan Beban Glikemik
            (GL) terkontrol untuk mencegah fluktuasi tajam glukosa darah.
          </p>
        </div>

        {/* Filter Tab */}
        <div className="flex bg-emerald-950/60 p-1 rounded-xl text-xs font-medium border border-emerald-700/50">
          {["ALL", "Sarapan", "Makan Siang", "Camilan Sore", "Makan Malam"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedMeal(tab)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedMeal === tab
                  ? "bg-emerald-600 text-white font-bold shadow-xs"
                  : "text-emerald-200 hover:text-white"
              }`}
            >
              {tab === "ALL" ? "Semua Waktu" : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Meal Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {meals.map((meal) => {
          const evalGL = evaluateGlycemicLoad(meal.totalGlycemicLoad);
          return (
            <div
              key={meal.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                      {getMealIcon(meal.mealTime)}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {meal.mealTime}
                      </span>
                      <h3 className="font-bold text-slate-900 text-base leading-snug">
                        {meal.menuTitle}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Items List */}
                <div className="mt-4 space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Komponen Piring Makanan:
                  </span>
                  <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden bg-slate-50/50">
                    {meal.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 text-xs flex items-center justify-between hover:bg-slate-50"
                      >
                        <div>
                          <p className="font-semibold text-slate-800">{item.name}</p>
                          <p className="text-[11px] text-slate-500">{item.portion}</p>
                        </div>
                        <span className="font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200 text-[10px]">
                          GL: {item.glycemicLoad}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Nutrition Summary and Dietitian Notes */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100/70 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span>
                      Total Energi: <strong className="font-bold">{meal.totalCalories} kkal</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">Total GL:</span>
                    <span
                      className={`px-2 py-0.5 rounded-full font-bold text-[10px] border ${evalGL.badgeBg}`}
                    >
                      {meal.totalGlycemicLoad} ({evalGL.category})
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 text-[11px] text-slate-700 flex items-start gap-2">
                  <Heart className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <span className="font-bold text-emerald-900">Catatan Ahli Gizi:</span>{" "}
                    {meal.dietitianNotes}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
