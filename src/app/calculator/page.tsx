"use client";

import { Calculator } from "lucide-react";
import { useDiabetesStore } from "@/lib/storage";
import { GlycemicCalculator } from "@/components/calculator/GlycemicCalculator";
import { FoodDatabaseTable } from "@/components/calculator/FoodDatabaseTable";

export default function CalculatorPage() {
  const { foods, calculations, addCalculation } = useDiabetesStore();

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Kalkulator Indeks &amp; Beban Glikemik
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Kalkulasi dampak glukosa presisi berbasis gram porsi makanan aktual
            </p>
          </div>
        </div>
      </div>

      {/* Calculator Interactive */}
      <GlycemicCalculator
        foods={foods}
        calculations={calculations}
        onSaveCalculation={addCalculation}
      />

      {/* Catalog Table */}
      <FoodDatabaseTable foods={foods} />
    </div>
  );
}
