"use client";

import { useState } from "react";
import {
  Award,
  CalendarCheck2,
  FileCheck2,
  LogOut,
  Stethoscope,
  Users,
} from "lucide-react";
import { useDiabetesStore } from "@/lib/storage";
import { DoctorDashboardHeader } from "@/components/doctor-dashboard/DoctorDashboardHeader";
import { PeerReviewQueue } from "@/components/doctor-dashboard/PeerReviewQueue";
import { PatientMonitoringTable } from "@/components/doctor-dashboard/PatientMonitoringTable";
import { DoctorSchedulesView } from "@/components/doctor-dashboard/DoctorSchedulesView";

export default function DoctorDashboardPage() {
  const {
    activeDoctor,
    articles,
    monitoredPatients,
    clinicSchedules,
    updateArticleReviewStatus,
    addPatientMedicalNote,
    doctorLogout,
  } = useDiabetesStore();

  const [activeTab, setActiveTab] = useState<"peer-review" | "patients" | "schedules">("peer-review");

  if (!activeDoctor) {
    return null;
  }

  return (
    <div className="space-y-7">
      {/* Top Header & Stat Cards */}
      <DoctorDashboardHeader
        doctor={activeDoctor}
        articles={articles}
        patients={monitoredPatients}
        schedules={clinicSchedules}
      />

      {/* Main Tab Switcher */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-slate-200 pb-2">
        <div className="flex bg-slate-100 p-1 rounded-2xl text-xs font-bold">
          <button
            onClick={() => setActiveTab("peer-review")}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "peer-review"
                ? "bg-white text-teal-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <FileCheck2 className="w-4 h-4 text-teal-600" />
            <span>Antrean Peer Review</span>
            <span className="text-[10px] bg-teal-100 text-teal-800 px-1.5 py-0.2 rounded-full">
              {articles.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("patients")}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "patients"
                ? "bg-white text-teal-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Users className="w-4 h-4 text-cyan-600" />
            <span>Manajemen Pasien</span>
            <span className="text-[10px] bg-cyan-100 text-cyan-800 px-1.5 py-0.2 rounded-full">
              {monitoredPatients.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("schedules")}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "schedules"
                ? "bg-white text-teal-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <CalendarCheck2 className="w-4 h-4 text-emerald-600" />
            <span>Jadwal Praktik</span>
          </button>
        </div>

        {/* Doctor Logout Quick Action */}
        <button
          onClick={() => doctorLogout()}
          className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-rose-50 hover:border-rose-200 text-slate-600 hover:text-rose-600 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Keluar Sesi Dokter</span>
        </button>
      </div>

      {/* Tab Content Display */}
      {activeTab === "peer-review" && (
        <div className="animate-in fade-in duration-200">
          <PeerReviewQueue
            articles={articles}
            doctor={activeDoctor}
            onUpdateReviewStatus={updateArticleReviewStatus}
          />
        </div>
      )}

      {activeTab === "patients" && (
        <div className="animate-in fade-in duration-200">
          <PatientMonitoringTable
            patients={monitoredPatients}
            doctor={activeDoctor}
            onAddNote={addPatientMedicalNote}
          />
        </div>
      )}

      {activeTab === "schedules" && (
        <div className="animate-in fade-in duration-200">
          <DoctorSchedulesView
            schedules={clinicSchedules}
            doctor={activeDoctor}
          />
        </div>
      )}
    </div>
  );
}
