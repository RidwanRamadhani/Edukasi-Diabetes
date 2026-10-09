"use client";

import { useState } from "react";
import {
  Activity,
  CheckCircle2,
  ExternalLink,
  HeartPulse,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Stethoscope,
  User,
  X,
} from "lucide-react";
import { useDiabetesStore } from "@/lib/storage";

interface DoctorWhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DOCTOR_WHATSAPP_CONFIG = {
  name: "dr. Ridwan Ramadhani, Sp.PD, KEMD",
  title: "Spesialis Penyakit Dalam — Konsultan Endokrin, Metabolik & Diabetes",
  hospital: "Klinik Spesialis Endokrin & Telekonsultasi Diabetes",
  str: "STR-3171-8842-2024",
  phoneRaw: "089668251739",
  phoneInternational: "6289668251739",
};

export function DoctorWhatsAppModal({ isOpen, onClose }: DoctorWhatsAppModalProps) {
  const { profile, logs } = useDiabetesStore();

  const latestLog = logs[0];

  const [patientName, setPatientName] = useState(profile.name || "Pasien DiaCare");
  const [complaint, setComplaint] = useState("");
  const [bloodSugarContext, setBloodSugarContext] = useState(
    latestLog
      ? `${latestLog.sugarLevel} mg/dL (${latestLog.measurementContext})`
      : "Belum mencatat gula darah terbaru"
  );

  if (!isOpen) return null;

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedMessage = `Halo ${DOCTOR_WHATSAPP_CONFIG.name}, saya pasien dari aplikasi DiaCare ingin berkonsultasi mengenai kondisi diabetes saya.

📋 *DATA PASIEN:*
• Nama: ${patientName.trim()}
• Klasifikasi: ${profile.diabetesType} (${profile.age || 45} tahun)
• Gula Darah Terkini: ${bloodSugarContext}

💬 *KELUHAN / PERTANYAAN:*
${complaint.trim() || "Saya ingin berkonsultasi mengenai evaluasi kadar gula darah dan pola makan harian saya."}

Mohon arahan dan petunjuk medis dari dokter. Terima kasih.`;

    const encodedText = encodeURIComponent(formattedMessage);
    const waUrl = `https://wa.me/${DOCTOR_WHATSAPP_CONFIG.phoneInternational}?text=${encodedText}`;

    // Open WhatsApp in new tab
    window.open(waUrl, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 p-5 sm:p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start gap-3.5 pr-8">
            <div className="w-12 h-12 rounded-2xl bg-white text-emerald-700 flex items-center justify-center shadow-md shrink-0">
              <Stethoscope className="w-7 h-7 text-emerald-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-200 border border-emerald-400/30">
                  Konsultasi WhatsApp Dokter
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-full font-bold animate-pulse">
                  Online
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mt-1 leading-snug">
                {DOCTOR_WHATSAPP_CONFIG.name}
              </h3>
              <p className="text-xs text-emerald-100/90">{DOCTOR_WHATSAPP_CONFIG.title}</p>
            </div>
          </div>
        </div>

        {/* Doctor Info Sub-bar */}
        <div className="px-6 py-2.5 bg-emerald-50/80 border-b border-emerald-100 text-[11px] text-emerald-900 flex flex-wrap items-center justify-between gap-2 font-medium">
          <div className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-emerald-700" />
            <span>
              WhatsApp: <strong>{DOCTOR_WHATSAPP_CONFIG.phoneRaw}</strong>
            </span>
          </div>
          <span className="text-emerald-700">STR: {DOCTOR_WHATSAPP_CONFIG.str}</span>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSendWhatsApp} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Nama Pasien <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-slate-900 font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Klasifikasi Diabetes
              </label>
              <input
                type="text"
                disabled
                value={profile.diabetesType}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-600 font-medium cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Gula Darah Terkini
              </label>
              <div className="relative">
                <Activity className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600" />
                <input
                  type="text"
                  value={bloodSugarContext}
                  onChange={(e) => setBloodSugarContext(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-300 text-slate-800 font-medium"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Keluhan Penyakit / Pertanyaan yang Ingin Ditanyakan{" "}
              <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              placeholder="Contoh: Dok, akhir-akhir ini gula darah puasa saya mencapai 160 mg/dL dan sering merasa kesemutan di ujung telapak kaki. Apakah dosis obat saya perlu disesuaikan?"
              required
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-slate-900 placeholder:text-slate-400"
            />
            <p className="text-[10px] text-slate-500 mt-1">
              Pesan akan otomatis dirapikan dengan format rekam medis sebelum dikirim ke chat WhatsApp dokter.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Privasi Medis Terjaga:</span>
            </div>
            <p>
              Pesan diteruskan langsung ke WhatsApp resmi <strong>dr. Ridwan Ramadhani, Sp.PD, KEMD</strong> tanpa perantara pihak ketiga.
            </p>
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-2 cursor-pointer transition-transform hover:scale-[1.01]"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Kirim ke WhatsApp Dokter</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
