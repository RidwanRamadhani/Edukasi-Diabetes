"use client";

import { useState, useEffect } from "react";
import { Activity, AlertCircle, CheckCircle2, Clock, PlusCircle } from "lucide-react";
import { MeasurementContext } from "@/types";
import { evaluateGlucoseLevel } from "@/lib/utils";

interface BloodSugarFormProps {
  onAddLog: (log: {
    userId: string;
    sugarLevel: number;
    measurementContext: MeasurementContext;
    recordedAt: string;
    notes?: string;
    symptoms?: string[];
  }) => void;
}

const contextOptions: MeasurementContext[] = [
  "Puasa Pagi",
  "Sebelum Makan Siang",
  "2 Jam Setelah Makan Siang",
  "Sebelum Makan Malam",
  "2 Jam Setelah Makan Malam",
  "Sebelum Tidur",
  "Sewaktu / Acak",
];

const availableSymptoms = [
  "Bugar / Tidak Ada Gejala",
  "Pusing / Sakit Kepala",
  "Gemetar / Keringat Dingin",
  "Haus Berlebih (Polidipsia)",
  "Sering Buang Air Kecil (Poliuria)",
  "Lapar Ekstrem (Polifagia)",
  "Penglihatan Buram",
  "Kelelahan Ekstrem",
];

export function BloodSugarForm({ onAddLog }: BloodSugarFormProps) {
  const [sugarLevel, setSugarLevel] = useState<string>("");
  const [context, setContext] = useState<MeasurementContext>("Puasa Pagi");
  const [dateTime, setDateTime] = useState<string>("");

  useEffect(() => {
    const now = new Date();
    const tzOffset = now.getTimezoneOffset() * 60000;
    setDateTime(new Date(now.getTime() - tzOffset).toISOString().slice(0, 16));
  }, []);
  const [notes, setNotes] = useState<string>("");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(["Bugar / Tidak Ada Gejala"]);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");

  const numLevel = parseFloat(sugarLevel);
  const isValidNumber = !isNaN(numLevel) && numLevel >= 30 && numLevel <= 600;
  const evaluation = isValidNumber ? evaluateGlucoseLevel(numLevel, context) : null;

  const toggleSymptom = (sym: string) => {
    if (sym === "Bugar / Tidak Ada Gejala") {
      setSelectedSymptoms(["Bugar / Tidak Ada Gejala"]);
      return;
    }

    const filtered = selectedSymptoms.filter((s) => s !== "Bugar / Tidak Ada Gejala");
    if (filtered.includes(sym)) {
      const next = filtered.filter((s) => s !== sym);
      setSelectedSymptoms(next.length === 0 ? ["Bugar / Tidak Ada Gejala"] : next);
    } else {
      setSelectedSymptoms([...filtered, sym]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!sugarLevel || isNaN(numLevel)) {
      setErrorMsg("Harap masukkan angka kadar gula darah yang valid.");
      return;
    }

    if (numLevel < 30 || numLevel > 600) {
      setErrorMsg(
        "Kadar gula darah di luar rentang klinis wajar (30 - 600 mg/dL). Periksa kembali angka glucometer Anda."
      );
      return;
    }

    onAddLog({
      userId: "patient-1",
      sugarLevel: numLevel,
      measurementContext: context,
      recordedAt: dateTime ? new Date(dateTime).toISOString() : new Date().toISOString(),
      notes: notes.trim(),
      symptoms: selectedSymptoms,
    });

    setSuccessMsg(`Data ${numLevel} mg/dL (${context}) berhasil dicatat ke rekam medis.`);
    setSugarLevel("");
    setNotes("");

    setTimeout(() => {
      setSuccessMsg("");
    }, 4000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs"
    >
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
          <PlusCircle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 text-lg">Catat Log Gula Darah Baru</h3>
          <p className="text-xs text-slate-500">
            Validasi rentang ketat medis dengan evaluasi status instan
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2.5">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-2.5">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Input Kadar Gula */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Kadar Gula Darah <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="number"
              step="1"
              min="30"
              max="600"
              value={sugarLevel}
              onChange={(e) => setSugarLevel(e.target.value)}
              placeholder="Contoh: 110"
              required
              className="w-full text-xl font-bold px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-slate-900 placeholder:text-slate-300 pr-20"
            />
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
              mg/dL
            </div>
          </div>
          <p className="text-[11px] text-slate-600 mt-1.5">Rentang teruji medis: 30 - 600 mg/dL</p>
        </div>

        {/* Konteks Pengukuran */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Konteks Pengukuran <span className="text-rose-500">*</span>
          </label>
          <select
            value={context}
            onChange={(e) => setContext(e.target.value as MeasurementContext)}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-slate-800 bg-white font-medium text-sm"
          >
            {contextOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <p className="text-[11px] text-slate-600 mt-1.5">
            Mempengaruhi ambang batas penilaian klinis otomatis
          </p>
        </div>

        {/* Waktu & Tanggal */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Waktu Pengambilan Sampel <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-sm text-slate-800"
            />
          </div>
        </div>

        {/* Catatan Tambahan Makanan / Obat */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Catatan Makanan / Aktivitas
          </label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Misal: Sarapan oatmeal, minum metformin 500mg"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-sm text-slate-800"
          />
        </div>
      </div>

      {/* Gejala Penyerta (Symptoms Chips) */}
      <div className="mt-5">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Kondisi Fisik / Gejala Penyerta
        </label>
        <div className="flex flex-wrap gap-2">
          {availableSymptoms.map((sym) => {
            const isSelected = selectedSymptoms.includes(sym);
            return (
              <button
                type="button"
                key={sym}
                onClick={() => toggleSymptom(sym)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                  isSelected
                    ? "bg-emerald-100 text-emerald-800 border-emerald-300 font-semibold shadow-xs"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {sym}
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Medical Evaluation Preview Card */}
      {evaluation && (
        <div
          className={`mt-5 p-4 rounded-xl border transition-all ${evaluation.badgeBg} flex items-start gap-3`}
        >
          <Activity className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-xs">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-sm">Status: {evaluation.status}</span>
              <span className="text-[11px] opacity-80">({context})</span>
            </div>
            <p className="leading-relaxed">{evaluation.description}</p>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
        >
          <Activity className="w-4 h-4" />
          <span>Simpan Log Gula Darah</span>
        </button>
      </div>
    </form>
  );
}
