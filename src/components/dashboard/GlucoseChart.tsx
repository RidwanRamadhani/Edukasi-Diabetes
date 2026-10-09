"use client";

import { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import { BloodSugarLog } from "@/types";
import { evaluateGlucoseLevel } from "@/lib/utils";

interface GlucoseChartProps {
  logs: BloodSugarLog[];
}

export function GlucoseChart({ logs }: GlucoseChartProps) {
  // Sort logs chronologically for the chart
  const chartData = useMemo(() => {
    const sorted = [...logs].sort(
      (a, b) => new Date(a.recordedAt).getTime() - new Date(b.recordedAt).getTime()
    );

    return sorted.map((log) => {
      const date = new Date(log.recordedAt);
      const timeStr = date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
      const dateStr = date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });

      return {
        id: log.id,
        rawDate: log.recordedAt,
        label: `${dateStr} ${timeStr}`,
        level: log.sugarLevel,
        context: log.measurementContext,
        notes: log.notes,
      };
    });
  }, [logs]);

  if (chartData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
        <p className="text-sm text-slate-500">Belum ada data riwayat pencatatan gula darah.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="label"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: "#cbd5e1" }}
            />
            <YAxis
              stroke="#64748b"
              fontSize={11}
              domain={[60, (dataMax: number) => Math.max(dataMax + 30, 220)]}
              tickLine={false}
              axisLine={{ stroke: "#cbd5e1" }}
              tickFormatter={(v) => `${v}`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  const evaluation = evaluateGlucoseLevel(data.level, data.context);
                  return (
                    <div className="bg-white p-3.5 rounded-xl shadow-lg border border-slate-100 text-xs max-w-xs">
                      <div className="flex items-center justify-between gap-3 mb-1">
                        <span className="font-semibold text-slate-900">{data.context}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${evaluation.badgeBg}`}
                        >
                          {evaluation.status}
                        </span>
                      </div>
                      <p className="text-xl font-extrabold text-slate-900">
                        {data.level}{" "}
                        <span className="text-xs font-normal text-slate-500">mg/dL</span>
                      </p>
                      <p className="text-slate-500 text-[11px] mt-0.5">{data.label}</p>
                      {data.notes && (
                        <p className="mt-2 text-slate-600 bg-slate-50 p-1.5 rounded border border-slate-100 italic">
                          &quot;{data.notes}&quot;
                        </p>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            {/* Medically standard reference thresholds */}
            <ReferenceLine
              y={70}
              stroke="#3b82f6"
              strokeDasharray="4 4"
              label={{ value: "Batas Bawah (70)", fill: "#3b82f6", fontSize: 10, position: "insideBottomLeft" }}
            />
            <ReferenceLine
              y={140}
              stroke="#10b981"
              strokeDasharray="4 4"
              label={{ value: "Target Normal (140)", fill: "#10b981", fontSize: 10, position: "insideTopLeft" }}
            />
            <ReferenceLine
              y={180}
              stroke="#f59e0b"
              strokeDasharray="4 4"
              label={{ value: "Batas Pasca Makan (180)", fill: "#f59e0b", fontSize: 10, position: "insideTopLeft" }}
            />
            <Line
              type="monotone"
              dataKey="level"
              stroke="#059669"
              strokeWidth={3}
              dot={{ r: 4, fill: "#059669", strokeWidth: 2, stroke: "#ffffff" }}
              activeDot={{ r: 6, fill: "#047857", stroke: "#a7f3d0", strokeWidth: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend guideline */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-600">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
          <span>Target Optimal (&lt; 140 mg/dL)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
          <span>Ambang Waspada (140 - 180 mg/dL)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
          <span>Tinggi / Hiperglikemia (&gt; 180 mg/dL)</span>
        </div>
      </div>
    </div>
  );
}
