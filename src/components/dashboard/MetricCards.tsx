"use client";

import { Activity, Award, CheckCircle2, TrendingUp } from "lucide-react";
import { BloodSugarLog, UserProfile } from "@/types";
import { evaluateGlucoseLevel } from "@/lib/utils";

interface MetricCardsProps {
  logs: BloodSugarLog[];
  profile: UserProfile;
}

export function MetricCards({ logs, profile }: MetricCardsProps) {
  // Latest log entry
  const latestLog = logs[0];
  const latestEval = latestLog
    ? evaluateGlucoseLevel(latestLog.sugarLevel, latestLog.measurementContext)
    : null;

  // 7-day average calculation
  const averageGlucose =
    logs.length > 0
      ? Math.round(logs.reduce((acc, curr) => acc + curr.sugarLevel, 0) / logs.length)
      : 0;

  // In-range calculation (< 140 mg/dL as standard target)
  const inRangeCount = logs.filter((log) => log.sugarLevel <= 140 && log.sugarLevel >= 70).length;
  const inRangePercent = logs.length > 0 ? Math.round((inRangeCount / logs.length) * 100) : 100;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Kadar Terkini */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Gula Darah Terkini
          </span>
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Activity className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {latestLog ? latestLog.sugarLevel : "--"}
          </span>
          <span className="text-xs font-semibold text-slate-500">mg/dL</span>
        </div>
        <div className="mt-2.5 flex items-center justify-between">
          {latestEval ? (
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${latestEval.badgeBg}`}
            >
              {latestEval.status}
            </span>
          ) : (
            <span className="text-[11px] text-slate-400">Belum ada data</span>
          )}
          <span className="text-[11px] text-slate-600 truncate max-w-[130px]">
            {latestLog ? latestLog.measurementContext : ""}
          </span>
        </div>
      </div>

      {/* 2. Rata-rata Glukosa */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Rata-rata Periode
          </span>
          <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {averageGlucose || "--"}
          </span>
          <span className="text-xs font-semibold text-slate-500">mg/dL</span>
        </div>
        <div className="mt-2.5 flex items-center justify-between text-[11px]">
          <span className="text-teal-700 font-semibold">
            {averageGlucose < 130 ? "Terkendali Baik" : "Perlu Pemantauan"}
          </span>
          <span className="text-slate-600">{logs.length} catatan total</span>
        </div>
      </div>

      {/* 3. Waktu Dalam Rentang (Time in Range) */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Kepatuhan Target
          </span>
          <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {inRangePercent}%
          </span>
          <span className="text-xs font-semibold text-slate-500">dalam rentang</span>
        </div>
        <div className="mt-2.5">
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-cyan-600 h-1.5 rounded-full transition-all"
              style={{ width: `${inRangePercent}%` }}
            ></div>
          </div>
          <p className="text-[10px] text-slate-600 mt-1">Target klinis: &gt; 70% per minggu</p>
        </div>
      </div>

      {/* 4. Target Medis Personal */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Target Puasa Pribadi
          </span>
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
            &le; {profile.targetSugarFasting}
          </span>
          <span className="text-xs font-semibold text-slate-500">mg/dL</span>
        </div>
        <div className="mt-2.5 flex items-center justify-between text-[11px]">
          <span className="text-amber-800 font-semibold">{profile.diabetesType}</span>
          <span className="text-slate-600">Postprandial &le; {profile.targetSugarPostPrandial}</span>
        </div>
      </div>
    </div>
  );
}
