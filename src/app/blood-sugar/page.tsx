"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Activity, ArrowRight, ShieldCheck } from "lucide-react";

export default function BloodSugarRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/activity-tracker");
    }, 1500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="max-w-xl mx-auto my-12 p-8 bg-white rounded-3xl border border-slate-200 text-center space-y-5 shadow-sm">
      <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
        <Activity className="w-8 h-8 animate-bounce" />
      </div>
      <div>
        <h1 className="text-xl font-bold text-slate-900">
          Pembaruan Fitur DIASERA
        </h1>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
          Sesuai fokus pencegahan primer dan pengendalian gaya hidup sehat, fitur telah dialihkan ke{" "}
          <strong className="text-emerald-700">Pemantauan Aktivitas &amp; Perilaku Hidup Sehat</strong> serta{" "}
          <strong className="text-emerald-700">Skrining Cek Risiko Diabetes</strong>.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link
          href="/activity-tracker"
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase flex items-center justify-center gap-2"
        >
          <Activity className="w-4 h-4" />
          <span>Pantau Aktivitas</span>
        </Link>
        <Link
          href="/risk-check"
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs uppercase flex items-center justify-center gap-2"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Cek Risiko DM</span>
        </Link>
      </div>
    </div>
  );
}
