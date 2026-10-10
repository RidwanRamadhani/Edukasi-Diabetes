"use client";

import { useState } from "react";
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  FileEdit,
  HeartPulse,
  MessageCircle,
  Phone,
  Search,
  User,
  Users,
  X,
  Send,
  Calendar,
  Filter,
  ExternalLink,
} from "lucide-react";
import { UserProfile, DoctorProfile } from "@/types";
import { formatDateTime } from "@/lib/utils";

/**
 * Standardizes any phone format (e.g. '0812...', '+62812...', '62812...', '0812-3456-7890')
 * into international digits format '62812...' for WhatsApp API
 */
export function cleanWhatsAppNumber(phoneStr?: string): string | null {
  if (!phoneStr) return null;
  const digits = phoneStr.replace(/\D/g, "");
  if (!digits || digits.length < 9) return null;

  if (digits.startsWith("0")) {
    return "62" + digits.slice(1);
  }
  if (digits.startsWith("62")) {
    return digits;
  }
  return "62" + digits;
}

interface PatientMonitoringTableProps {
  patients: UserProfile[];
  doctor: DoctorProfile;
  onAddNote: (patientId: string, note: string) => void;
}

export function PatientMonitoringTable({
  patients,
  doctor,
  onAddNote,
}: PatientMonitoringTableProps) {
  const [searchPatient, setSearchPatient] = useState("");
  const [filterRisk, setFilterRisk] = useState<string>("ALL");
  const [selectedPatient, setSelectedPatient] = useState<UserProfile | null>(null);

  // Doctor note form state
  const [doctorNote, setDoctorNote] = useState("");
  const [noteSuccess, setNoteSuccess] = useState("");

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchPatient.toLowerCase()) ||
      p.email.toLowerCase().includes(searchPatient.toLowerCase()) ||
      (p.healthGoal || p.diabetesType || "").toLowerCase().includes(searchPatient.toLowerCase());

    const matchesRisk = filterRisk === "ALL" || p.riskStatus === filterRisk;
    return matchesSearch && matchesRisk;
  });

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient || !doctorNote.trim()) return;

    onAddNote(selectedPatient.id, doctorNote.trim());
    setNoteSuccess(`Instruksi medis berhasil ditambahkan ke rekam medis ${selectedPatient.name}.`);
    setDoctorNote("");
    setTimeout(() => setNoteSuccess(""), 4000);
  };

  const getRiskBadge = (risk?: string) => {
    switch (risk) {
      case "Tinggi":
        return "bg-rose-100 text-rose-800 border-rose-200";
      case "Waspada":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
      {/* Table Header Controls */}
      <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-100 text-cyan-800 flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Manajemen &amp; Pemantauan Pasien Diabetes
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Daftar pasien aktif terpantau dengan metrik gula darah &amp; status risiko klinis ({filteredPatients.length} pasien)
          </p>
        </div>

        {/* Filter by risk & search */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              className="bg-transparent font-semibold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="ALL">Semua Risiko</option>
              <option value="Terkontrol">Terkontrol</option>
              <option value="Waspada">Waspada</option>
              <option value="Tinggi">Tinggi</option>
            </select>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchPatient}
              onChange={(e) => setSearchPatient(e.target.value)}
              placeholder="Cari nama pasien..."
              className="text-xs pl-8 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-cyan-500 text-slate-800 w-44 sm:w-56"
            />
          </div>
        </div>
      </div>

      {/* Patient Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-100 text-slate-500 uppercase tracking-wider font-semibold">
              <th className="py-3 px-4">Nama Pengguna</th>
              <th className="py-3 px-4">Fokus DIASERA</th>
              <th className="py-3 px-4">Status / Skor Risiko</th>
              <th className="py-3 px-4">Evaluasi Risiko</th>
              <th className="py-3 px-4">Pemeriksaan Terakhir</th>
              <th className="py-3 px-4 text-right">Aksi Klinis</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filteredPatients.map((patient) => {
              const riskColor = getRiskBadge(patient.riskStatus);
              return (
                <tr key={patient.id} className="hover:bg-slate-50/70 transition-colors">
                  {/* Nama */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-cyan-700 text-white flex items-center justify-center font-bold text-xs">
                        {patient.name
                          ? patient.name
                              .split(" ")
                              .filter(Boolean)
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)
                          : "P"}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{patient.name}</p>
                        <p className="text-[11px] text-slate-500">
                          {patient.age} th • {patient.gender}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Fokus DIASERA */}
                  <td className="py-3.5 px-4 whitespace-nowrap font-medium text-slate-800">
                    {patient.healthGoal || patient.diabetesType || "Pencegahan Primer"}
                  </td>

                  {/* Kadar Gula Darah */}
                  {/* Status / Skor Risiko */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-extrabold text-slate-900">
                        {patient.latestRiskScore !== undefined ? `Skor ${patient.latestRiskScore}` : (patient.lastBloodSugarLevel ? `${patient.lastBloodSugarLevel} mg/dL` : "Skor 0")}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      {patient.latestRiskCategory ? `FINDRISC: ${patient.latestRiskCategory}` : (patient.lastBloodSugarContext || "Pencegahan")}
                    </p>
                  </td>

                  {/* Evaluasi Risiko */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${riskColor}`}
                    >
                      {patient.latestRiskCategory ? `Risiko ${patient.latestRiskCategory}` : (patient.riskStatus || "Terkontrol")}
                    </span>
                  </td>

                  {/* Waktu Cek */}
                  <td className="py-3.5 px-4 whitespace-nowrap text-slate-500 text-[11px]">
                    {patient.lastCheckDate ? formatDateTime(patient.lastCheckDate) : "-"}
                  </td>

                  {/* Aksi */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedPatient(patient)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-cyan-50 hover:text-cyan-800 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                        title="Buka Rekam Medis Pasien"
                      >
                        Rekam Medis
                      </button>

                      {(() => {
                        const cleanPhone =
                          cleanWhatsAppNumber(patient.phone) ||
                          cleanWhatsAppNumber(patient.emergencyContact);

                        if (cleanPhone) {
                          const waUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(
                            `Halo ${patient.name}, saya ${doctor.name} dari DiaCare ingin menindaklanjuti hasil pemantauan kadar gula darah Anda.`
                          )}`;

                          return (
                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors shadow-2xs"
                              title={`Hubungi ${patient.name} via WhatsApp (+${cleanPhone})`}
                            >
                              <MessageCircle className="w-4 h-4" />
                            </a>
                          );
                        }

                        return (
                          <button
                            type="button"
                            onClick={() => setSelectedPatient(patient)}
                            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-400 border border-slate-200 transition-colors cursor-pointer"
                            title="Nomor WhatsApp belum terdaftar di profil pasien"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>
                        );
                      })()}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MODAL DETAIL REKAM MEDIS PASIEN */}
      {selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95">
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 bg-slate-50/80 flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-cyan-700 text-white flex items-center justify-center font-bold text-base shadow-xs">
                  {selectedPatient.name
                    ? selectedPatient.name
                        .split(" ")
                        .filter(Boolean)
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                    : "P"}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">{selectedPatient.name}</h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getRiskBadge(
                        selectedPatient.riskStatus
                      )}`}
                    >
                      {selectedPatient.riskStatus}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {selectedPatient.email} • {selectedPatient.diabetesType} • {selectedPatient.age} Tahun ({selectedPatient.gender})
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedPatient(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto space-y-5">
              {noteSuccess && (
                <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>{noteSuccess}</span>
                </div>
              )}

              {/* WhatsApp Teleconsultation Action Banner */}
              {(() => {
                const modalCleanPhone =
                  cleanWhatsAppNumber(selectedPatient.phone) ||
                  cleanWhatsAppNumber(selectedPatient.emergencyContact);

                return (
                  <div className="p-4 rounded-2xl bg-emerald-50/90 border border-emerald-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                        <MessageCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-emerald-950">
                          Telekonsultasi WhatsApp Pasien
                        </p>
                        <p className="text-[11px] text-emerald-800">
                          {modalCleanPhone
                            ? `Nomor Terverifikasi: +${modalCleanPhone} (${selectedPatient.name})`
                            : "Nomor WhatsApp belum terdaftar di profil pasien"}
                        </p>
                      </div>
                    </div>

                    {modalCleanPhone ? (
                      <a
                        href={`https://api.whatsapp.com/send?phone=${modalCleanPhone}&text=${encodeURIComponent(
                          `Halo ${selectedPatient.name}, saya ${doctor.name} dari DiaCare ingin menindaklanjuti hasil pemantauan kadar gula darah dan rekam medis Anda.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors shrink-0"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Kirim Pesan WhatsApp</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-xs text-slate-500 italic bg-white px-3 py-1.5 rounded-xl border border-slate-200">
                        Kontak Belum Tersedia
                      </span>
                    )}
                  </div>
                );
              })()}

              {/* Parameter Klinis & Target Pasien */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Gula Terkini</span>
                  <p className="text-lg font-black text-slate-900 mt-1">
                    {selectedPatient.lastBloodSugarLevel || "--"} <span className="text-xs font-normal">mg/dL</span>
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Target Puasa</span>
                  <p className="text-lg font-black text-emerald-700 mt-1">
                    &le; {selectedPatient.targetSugarFasting} <span className="text-xs font-normal">mg/dL</span>
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Target 2 Jam PP</span>
                  <p className="text-lg font-black text-emerald-700 mt-1">
                    &le; {selectedPatient.targetSugarPostPrandial} <span className="text-xs font-normal">mg/dL</span>
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Berat &amp; Tinggi</span>
                  <p className="text-sm font-bold text-slate-900 mt-1">
                    {selectedPatient.currentWeight} kg / {selectedPatient.height} cm
                  </p>
                </div>
              </div>

              {/* Riwayat Medis Pasien */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Catatan Rekam Medis &amp; Riwayat Komorbiditas:
                </h4>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 whitespace-pre-line leading-relaxed">
                  {selectedPatient.medicalHistory || "Belum ada riwayat medis tercatat."}
                </div>
              </div>

              {/* Informasi Kontak Pasien & Kontak Darurat */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    No. WhatsApp Pasien:{" "}
                    <strong className="text-slate-800">
                      {selectedPatient.phone || "Belum diisi"}
                    </strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>
                    Kontak Darurat:{" "}
                    <strong className="text-slate-800">
                      {selectedPatient.emergencyContact || "Belum diisi"}
                    </strong>
                  </span>
                </div>
              </div>

              {/* Form Input Catatan Dokter Baru */}
              <form onSubmit={handleSaveNote} className="pt-2 border-t border-slate-100 space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Tambahkan Instruksi / Evaluasi Dokter Baru ke Rekam Medis:
                </label>
                <textarea
                  rows={3}
                  value={doctorNote}
                  onChange={(e) => setDoctorNote(e.target.value)}
                  placeholder="Ketik instruksi dosis obat, saran diet, atau jadwal kontrol berikutnya untuk pasien ini..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <FileEdit className="w-3.5 h-3.5" />
                    <span>Simpan Instruksi Dokter</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
