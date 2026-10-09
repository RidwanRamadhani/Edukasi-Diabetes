"use client";

import { useState } from "react";
import { Activity, Plus, TrendingUp } from "lucide-react";
import { useDiabetesStore } from "@/lib/storage";
import { BloodSugarForm } from "@/components/blood-sugar/BloodSugarForm";
import { BloodSugarTable } from "@/components/blood-sugar/BloodSugarTable";
import { GlucoseChart } from "@/components/dashboard/GlucoseChart";

export default function BloodSugarPage() {
  const { logs, addBloodSugarLog, deleteBloodSugarLog } = useDiabetesStore();
  const [showAddForm, setShowAddForm] = useState(true);

  return (
    <div className="space-y-8">
      {/* Page Title Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Pencatatan Gula Darah Mandiri
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Validasi rentang angka ketat (30 - 600 mg/dL) sesuai Konsensus Pengelolaan Diabetes PERKENI
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>{showAddForm ? "Sembunyikan Form" : "Entri Baru"}</span>
        </button>
      </div>

      {/* Form Input */}
      {showAddForm && (
        <div className="animate-in fade-in duration-200">
          <BloodSugarForm onAddLog={addBloodSugarLog} />
        </div>
      )}

      {/* Glucose Trend Graphic */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <TrendingUp className="w-5 h-5 text-emerald-600" />
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Visualisasi Tren &amp; Dinamika Glukosa</h3>
            <p className="text-xs text-slate-500">Pola fluktuasi berdasarkan waktu pengukuran</p>
          </div>
        </div>
        <GlucoseChart logs={logs} />
      </div>

      {/* History Table */}
      <BloodSugarTable logs={logs} onDeleteLog={deleteBloodSugarLog} />
    </div>
  );
}
