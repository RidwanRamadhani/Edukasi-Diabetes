"use client";

import { useState } from "react";
import { Calculator, CheckCircle2, ChevronRight, History, Info, Sparkles } from "lucide-react";
import { FoodItem, CalculationHistory } from "@/types";
import { evaluateGlycemicLoad } from "@/lib/utils";

interface GlycemicCalculatorProps {
  foods: FoodItem[];
  calculations: CalculationHistory[];
  onSaveCalculation: (calc: {
    userId: string;
    foodName: string;
    glycemicIndex: number;
    portionWeight: number;
    carbohydrateGram: number;
    computedGlycemicLoad: number;
    category: "Rendah" | "Sedang" | "Tinggi";
  }) => void;
}

export function GlycemicCalculator({
  foods,
  calculations,
  onSaveCalculation,
}: GlycemicCalculatorProps) {
  const [selectedFoodId, setSelectedFoodId] = useState<string>(foods[0]?.id || "");
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);

  // Custom inputs
  const [customName, setCustomName] = useState("");
  const [customGI, setCustomGI] = useState("50");
  const [customCarbPer100g, setCustomCarbPer100g] = useState("20");

  // Portion weight
  const [portionWeight, setPortionWeight] = useState<number>(100);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");

  const selectedFood = foods.find((f) => f.id === selectedFoodId);

  // Derive GI and Carb per 100g
  const activeGI = isCustomMode
    ? parseFloat(customGI) || 0
    : selectedFood
    ? selectedFood.glycemicIndex
    : 0;

  const activeCarbPer100g = isCustomMode
    ? parseFloat(customCarbPer100g) || 0
    : selectedFood
    ? selectedFood.carbohydrateGramPer100g
    : 0;

  const activeName = isCustomMode
    ? customName || "Makanan Kustom"
    : selectedFood
    ? selectedFood.name
    : "-";

  // Real-time calculation
  const calculatedCarb = (activeCarbPer100g * portionWeight) / 100;
  const rawGL = (activeGI * calculatedCarb) / 100;
  const computedGL = Math.round(rawGL * 10) / 10; // 1 decimal place

  const evaluation = evaluateGlycemicLoad(computedGL);

  const handleSave = () => {
    onSaveCalculation({
      userId: "patient-1",
      foodName: activeName,
      glycemicIndex: activeGI,
      portionWeight: portionWeight,
      carbohydrateGram: Math.round(calculatedCarb * 10) / 10,
      computedGlycemicLoad: computedGL,
      category: evaluation.category,
    });

    setSaveSuccessMsg(`Hasil perhitungan "${activeName}" berhasil disimpan ke riwayat.`);
    setTimeout(() => setSaveSuccessMsg(""), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Interactive Calculator Box */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 shadow-xs">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Kalkulator Indeks &amp; Beban Glikemik
              </h2>
              <p className="text-xs text-slate-500">
                Hitung dampak glukosa aktual berdasarkan gram porsi makanan
              </p>
            </div>
          </div>

          {/* Toggle between database & custom */}
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setIsCustomMode(false)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                !isCustomMode ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Pilih Database
            </button>
            <button
              onClick={() => setIsCustomMode(true)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                isCustomMode ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Input Kustom
            </button>
          </div>
        </div>

        {saveSuccessMsg && (
          <div className="mb-5 p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Food and Portion Inputs */}
          <div className="lg:col-span-7 space-y-4">
            {!isCustomMode ? (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Pilih Makanan dari Database
                </label>
                <select
                  value={selectedFoodId}
                  onChange={(e) => {
                    setSelectedFoodId(e.target.value);
                    const found = foods.find((f) => f.id === e.target.value);
                    if (found) setPortionWeight(found.standardServingGram);
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white font-medium text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                >
                  {foods.map((food) => (
                    <option key={food.id} value={food.id}>
                      {food.name} (GI: {food.glycemicIndex} • Karbo: {food.carbohydrateGramPer100g}g/100g)
                    </option>
                  ))}
                </select>

                {selectedFood && (
                  <div className="mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1">
                    <p>
                      <span className="font-semibold text-slate-700">Porsi Standar:</span>{" "}
                      {selectedFood.servingDescription}
                    </p>
                    {selectedFood.benefits && (
                      <p className="text-slate-500 italic">
                        &quot;{selectedFood.benefits}&quot;
                      </p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Nama Makanan / Minuman
                  </label>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="Misal: Ubi Cilembu Oven"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Indeks Glikemik (GI)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={customGI}
                      onChange={(e) => setCustomGI(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                    />
                    <p className="text-[10px] text-slate-600 mt-1">Skala 0 - 100</p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Karbohidrat (g / 100g)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.5"
                      value={customCarbPer100g}
                      onChange={(e) => setCustomCarbPer100g(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                    />
                    <p className="text-[10px] text-slate-600 mt-1">Gram per 100g</p>
                  </div>
                </div>
              </div>
            )}

            {/* Slider / Input Porsi Gram */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Berat Porsi yang Dikonsumsi
                </label>
                <span className="text-base font-extrabold text-teal-700">
                  {portionWeight} <span className="text-xs font-normal text-slate-500">gram</span>
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                step="5"
                value={portionWeight}
                onChange={(e) => setPortionWeight(parseInt(e.target.value) || 0)}
                className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>10g (Cicip)</span>
                <span>100g (Porsi Sedang)</span>
                <span>250g (Porsi Kenyang)</span>
                <span>500g (Porsi Besar)</span>
              </div>
            </div>

            {/* Quick portion buttons */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs text-slate-500 font-medium">Pilihan Cepat:</span>
              {[50, 100, 150, 200].map((gram) => (
                <button
                  key={gram}
                  type="button"
                  onClick={() => setPortionWeight(gram)}
                  className={`px-2.5 py-1 text-xs rounded-lg border cursor-pointer transition-all ${
                    portionWeight === gram
                      ? "bg-teal-50 border-teal-300 text-teal-700 font-bold"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {gram}g
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Calculated GL Result Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 sm:p-6 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Sparkles className="w-32 h-32 text-teal-300" />
            </div>

            <div className="relative z-10 space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-teal-300 bg-teal-950/60 border border-teal-800/80 px-2.5 py-1 rounded-full">
                  Hasil Perhitungan Medis
                </span>
                <h3 className="text-base font-bold mt-2 text-white truncate">{activeName}</h3>
                <p className="text-xs text-slate-300">
                  Porsi {portionWeight}g • Karbohidrat aktual:{" "}
                  {Math.round(calculatedCarb * 10) / 10}g
                </p>
              </div>

              {/* Huge GL Display */}
              <div className="py-2">
                <p className="text-xs text-slate-300 uppercase tracking-wider font-semibold">
                  Beban Glikemik (Glycemic Load)
                </p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-5xl font-black text-white tracking-tight">{computedGL}</span>
                  <span className="text-sm font-semibold text-teal-300">Skor GL</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-slate-300">Kategori GL:</span>
                  <span
                    className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${evaluation.badgeBg}`}
                  >
                    GL {evaluation.category}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mt-1">
                  {evaluation.recommendation}
                </p>
              </div>

              {/* Formula Explainer */}
              <div className="text-[11px] text-slate-300 border-t border-slate-700/80 pt-3">
                <span className="font-semibold text-slate-200">Rumus:</span>{" "}
                <code className="text-teal-300 bg-slate-800 px-1 py-0.5 rounded">
                  ({activeGI} × {Math.round(calculatedCarb * 10) / 10}g) ÷ 100 = {computedGL}
                </code>
              </div>

              {/* Save Calculation Button */}
              <button
                type="button"
                onClick={handleSave}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all hover:scale-[1.01]"
              >
                <span>Simpan ke Riwayat Kalkulasi</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Calculation History list */}
      {calculations.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
            <History className="w-4 h-4 text-slate-500" />
            <h3 className="font-bold text-sm text-slate-800">
              Riwayat Kalkulasi Sesi Ini ({calculations.length})
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {calculations.map((c) => {
              const evalInfo = evaluateGlycemicLoad(c.computedGlycemicLoad);
              return (
                <div
                  key={c.id}
                  className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 truncate">{c.foodName}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${evalInfo.badgeBg}`}
                    >
                      GL {c.computedGlycemicLoad}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex justify-between">
                    <span>Porsi: {c.portionWeight}g</span>
                    <span>GI: {c.glycemicIndex}</span>
                    <span>Karbo: {c.carbohydrateGram}g</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
