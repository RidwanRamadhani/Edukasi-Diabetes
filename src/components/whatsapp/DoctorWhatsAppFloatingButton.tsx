"use client";

import { useState } from "react";
import { MessageCircle, Stethoscope, Phone } from "lucide-react";
import { DoctorWhatsAppModal, DOCTOR_WHATSAPP_CONFIG } from "@/components/whatsapp/DoctorWhatsAppModal";
import { useDiabetesStore } from "@/lib/storage";

export function DoctorWhatsAppFloatingButton() {
  const [modalOpen, setModalOpen] = useState(false);
  const { isAuthenticated } = useDiabetesStore();

  // If not logged in, don't show floating button to keep login gate clean
  if (!isAuthenticated) return null;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* Helper Badge Banner */}
        <div
          onClick={() => setModalOpen(true)}
          className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-emerald-200 shadow-lg text-xs font-semibold text-slate-800 cursor-pointer hover:bg-emerald-50 hover:border-emerald-300 transition-all hover:scale-105"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <div>
            <p className="text-[11px] font-bold text-slate-900 leading-tight">
              Tanya Penyakit ke Dokter WA
            </p>
            <p className="text-[10px] text-emerald-700 font-medium">{DOCTOR_WHATSAPP_CONFIG.name}</p>
          </div>
        </div>

        {/* Floating Green WhatsApp Action Button */}
        <button
          onClick={() => setModalOpen(true)}
          className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all cursor-pointer relative group"
          title={`Konsultasi WhatsApp langsung ke ${DOCTOR_WHATSAPP_CONFIG.name}`}
          aria-label="Tanya Dokter via WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 border-2 border-white flex items-center justify-center text-[9px] font-bold text-white">
            1
          </span>
        </button>
      </div>

      <DoctorWhatsAppModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
