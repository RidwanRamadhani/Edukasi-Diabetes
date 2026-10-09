"use client";

import { useState } from "react";
import { Filter, Trash2, Calendar, FileText } from "lucide-react";
import { BloodSugarLog, MeasurementContext } from "@/types";
import { evaluateGlucoseLevel, formatDateTime } from "@/lib/utils";

interface BloodSugarTableProps {
  logs: BloodSugarLog[];
  onDeleteLog: (id: string) => void;
}

export function BloodSugarTable({ logs, onDeleteLog }: BloodSugarTableProps) {
  const [filterContext, setFilterContext] = useState<string>("ALL");
  const [searchNotes, setSearchNotes] = useState<string>("");

  const filteredLogs = logs.filter((log) => {
    const matchesContext = filterContext === "ALL" || log.measurementContext === filterContext;
    const matchesSearch =
      !searchNotes ||
      (log.notes && log.notes.toLowerCase().includes(searchNotes.toLowerCase())) ||
      (log.symptoms && log.symptoms.some((s) => s.toLowerCase().includes(searchNotes.toLowerCase())));
    return matchesContext && matchesSearch;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Header and Controls */}
      <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900 text-base">Riwayat Catatan Gula Darah</h3>
          <p className="text-xs text-slate-500">
            Daftar entri pemeriksaan mandiri terurut kronologis ({filteredLogs.length} entri)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Filter Context */}
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={filterContext}
              onChange={(e) => setFilterContext(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="ALL">Semua Waktu Pengukuran</option>
              <option value="Puasa Pagi">Puasa Pagi</option>
              <option value="Sebelum Makan Siang">Sebelum Makan Siang</option>
              <option value="2 Jam Setelah Makan Siang">2 Jam Setelah Makan Siang</option>
              <option value="Sebelum Makan Malam">Sebelum Makan Malam</option>
              <option value="2 Jam Setelah Makan Malam">2 Jam Setelah Makan Malam</option>
              <option value="Sebelum Tidur">Sebelum Tidur</option>
              <option value="Sewaktu / Acak">Sewaktu / Acak</option>
            </select>
          </div>

          {/* Search Notes */}
          <input
            type="text"
            value={searchNotes}
            onChange={(e) => setSearchNotes(e.target.value)}
            placeholder="Cari catatan / gejala..."
            className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-700 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Table view */}
      {filteredLogs.length === 0 ? (
        <div className="p-12 text-center">
          <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-600">Tidak ada data ditemukan</p>
          <p className="text-xs text-slate-400 mt-1">Coba sesuaikan filter pencarian Anda.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100 text-slate-500 uppercase tracking-wider font-semibold">
                <th className="py-3 px-4">Waktu Sampel</th>
                <th className="py-3 px-4">Kadar Glukosa</th>
                <th className="py-3 px-4">Konteks</th>
                <th className="py-3 px-4">Klasifikasi Medis</th>
                <th className="py-3 px-4">Catatan & Gejala</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredLogs.map((log) => {
                const evalResult = evaluateGlucoseLevel(log.sugarLevel, log.measurementContext);
                return (
                  <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Waktu */}
                    <td className="py-3.5 px-4 font-medium text-slate-900 whitespace-nowrap">
                      {formatDateTime(log.recordedAt)}
                    </td>

                    {/* Kadar Glukosa */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="text-base font-extrabold text-slate-900">
                        {log.sugarLevel}
                      </span>{" "}
                      <span className="text-[11px] text-slate-600 font-medium">mg/dL</span>
                    </td>

                    {/* Konteks */}
                    <td className="py-3.5 px-4 whitespace-nowrap font-medium text-slate-700">
                      {log.measurementContext}
                    </td>

                    {/* Klasifikasi Medis */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${evalResult.badgeBg}`}
                      >
                        {evalResult.status}
                      </span>
                    </td>

                    {/* Catatan & Gejala */}
                    <td className="py-3.5 px-4 max-w-xs">
                      {log.notes && (
                        <p className="text-slate-800 line-clamp-2">{log.notes}</p>
                      )}
                      {log.symptoms && log.symptoms.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {log.symptoms.map((sym) => (
                            <span
                              key={sym}
                              className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded"
                            >
                              {sym}
                            </span>
                          ))}
                        </div>
                      )}
                      {!log.notes && (!log.symptoms || log.symptoms.length === 0) && (
                        <span className="text-slate-400 italic">-</span>
                      )}
                    </td>

                    {/* Aksi */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => {
                          if (confirm("Hapus catatan gula darah ini?")) {
                            onDeleteLog(log.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Hapus entri"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
