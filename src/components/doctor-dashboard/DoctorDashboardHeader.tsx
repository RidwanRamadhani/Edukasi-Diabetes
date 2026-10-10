"use client";

import {
  Activity,
  Award,
  CalendarCheck2,
  FileCheck2,
  Phone,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";
import { DoctorProfile, EducationalArticle, UserProfile, ClinicSchedule } from "@/types";

interface DoctorDashboardHeaderProps {
  doctor: DoctorProfile;
  articles: EducationalArticle[];
  patients: UserProfile[];
  schedules: ClinicSchedule[];
}

export function DoctorDashboardHeader({
  doctor,
  articles,
  patients,
  schedules,
}: DoctorDashboardHeaderProps) {
  const verifiedCount = articles.filter(
    (a) => a.doctorReview.approvalStatus === "Approved"
  ).length;

  const pendingCount = articles.filter(
    (a) => a.doctorReview.approvalStatus !== "Approved"
  ).length;

  const highRiskPatientsCount = patients.filter(
    (p) => p.riskStatus === "Tinggi" || p.riskStatus === "Waspada"
  ).length;

  return (
    <div className="space-y-6">
      {/* Doctor Identity Hero Banner */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-teal-500/20 border-2 border-teal-400/30 text-teal-300 flex items-center justify-center font-black text-2xl shadow-lg shrink-0">
              {doctor.avatarInitials}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30">
                  Konsultan Medis Aktif
                </span>
                <span className="text-xs text-slate-300 font-mono">
                  {doctor.strNumber}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white mt-1 tracking-tight">
                {doctor.name}
              </h1>
              <p className="text-xs sm:text-sm text-teal-200/90 mt-0.5">
                {doctor.title} • {doctor.hospital}
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-xs space-y-1.5 shrink-0">
            <div className="flex items-center gap-2 text-teal-300 font-semibold">
              <CalendarCheck2 className="w-4 h-4" />
              <span>Jadwal Praktik Aktif:</span>
            </div>
            <p className="text-slate-300 text-[11px]">{doctor.scheduleDays}</p>
            <div className="flex items-center gap-1.5 text-slate-400 text-[11px] pt-1">
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>Telekonsultasi: {doctor.phone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Key Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Artikel Terverifikasi */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Artikel Diverifikasi
            </span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <FileCheck2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {verifiedCount}
            </span>
            <span className="text-xs font-semibold text-slate-500">naskah disetujui</span>
          </div>
          <p className="text-[11px] text-teal-700 font-medium mt-2">
            Total {articles.length} materi terdaftar
          </p>
        </div>

        {/* Card 2: Antrean Peer Review */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Antrean Peer Review
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {pendingCount}
            </span>
            <span className="text-xs font-semibold text-slate-500">perlu tinjauan</span>
          </div>
          <p className="text-[11px] text-amber-700 font-medium mt-2">
            {pendingCount === 0 ? "Semua naskah telah diverifikasi" : "Menunggu keputusan dokter"}
          </p>
        </div>

        {/* Card 3: Pengguna Terpantau */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Pengguna Terpantau
            </span>
            <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {patients.length}
            </span>
            <span className="text-xs font-semibold text-slate-500">pengguna aktif</span>
          </div>
          <p className="text-[11px] text-cyan-700 font-medium mt-2">
            Pemantauan gaya hidup &amp; risiko DIASERA
          </p>
        </div>

        {/* Card 4: Pengguna Perhatian Khusus / Risiko FINDRISC */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Risiko FINDRISC Waspada
            </span>
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {highRiskPatientsCount}
            </span>
            <span className="text-xs font-semibold text-slate-500">pengguna perhatian</span>
          </div>
          <p className="text-[11px] text-rose-700 font-medium mt-2">
            Perlu intervensi pencegahan &amp; gaya hidup
          </p>
        </div>
      </div>
    </div>
  );
}
