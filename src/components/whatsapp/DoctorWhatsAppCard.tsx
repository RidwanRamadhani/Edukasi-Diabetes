"use client";

import { useState } from "react";
import { MessageCircle, Phone, Send, ShieldCheck, Stethoscope, ArrowRight } from "lucide-react";
import { DoctorWhatsAppModal, DOCTOR_WHATSAPP_CONFIG } from "@/components/whatsapp/DoctorWhatsAppModal";

export function DoctorWhatsAppCard() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 rounded-3xl p-6 sm:p-7 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden relative">
        <div className="space-y-2 max-w-xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Layanan Tanya Dokter Langsung via WhatsApp</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Punya Keluhan atau Ingin Konsultasi Penyakit?
          </h3>

          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            Konsultasikan hasil gula darah, gejala penyakit, atau aturan konsumsi obat Anda secara langsung ke WhatsApp{" "}
            <strong>{DOCTOR_WHATSAPP_CONFIG.name}</strong> ({DOCTOR_WHATSAPP_CONFIG.title}).
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-emerald-200">
            <span className="flex items-center gap-1.5 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-700/60">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>WA: {DOCTOR_WHATSAPP_CONFIG.phoneRaw}</span>
            </span>
            <span className="flex items-center gap-1.5 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-700/60">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{DOCTOR_WHATSAPP_CONFIG.str}</span>
            </span>
          </div>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2.5 shadow-lg shadow-emerald-500/30 cursor-pointer transition-transform hover:scale-105 shrink-0"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Tanya ke WA Dokter Sekarang</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <DoctorWhatsAppModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
