"use client";

import { Calendar, Clock, MapPin, Phone, Users, CheckCircle2 } from "lucide-react";
import { ClinicSchedule, DoctorProfile } from "@/types";

interface DoctorSchedulesViewProps {
  schedules: ClinicSchedule[];
  doctor: DoctorProfile;
}

export function DoctorSchedulesView({ schedules, doctor }: DoctorSchedulesViewProps) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
              <Calendar className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Jadwal Praktik &amp; Telekonsultasi Medis
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Manajemen alokasi waktu pelayanan poli rumah sakit dan sesi konsultasi WhatsApp DiaCare
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Jadwal Terdaftar SIP &amp; STR Resmi</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {schedules.map((sch) => {
          const isTelemed = sch.type === "Telekonsultasi WA";
          return (
            <div
              key={sch.id}
              className={`p-5 rounded-2xl border transition-all ${
                isTelemed
                  ? "bg-emerald-50/50 border-emerald-200 hover:border-emerald-300"
                  : "bg-slate-50/70 border-slate-200/80 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                    isTelemed
                      ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                      : "bg-teal-100 text-teal-800 border-teal-300"
                  }`}
                >
                  {sch.type}
                </span>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    sch.status === "Buka"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-rose-100 text-rose-800"
                  }`}
                >
                  {sch.status === "Buka" ? "✓ Kuota Tersedia" : "Penuh"}
                </span>
              </div>

              <h3 className="font-bold text-sm text-slate-900 mb-1">{sch.day}</h3>

              <div className="space-y-1.5 text-xs text-slate-600 mt-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{sch.time}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{sch.location}</span>
                </div>
                <div className="flex items-center gap-2 pt-1 font-semibold text-slate-800">
                  <Users className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Kapasitas Pasien: {sch.quota}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
