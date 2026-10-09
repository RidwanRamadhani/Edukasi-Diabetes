import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export type GlucoseStatus = "Rendah" | "Normal" | "Meningkat" | "Tinggi / Waspada";

export function evaluateGlucoseLevel(level: number, context: string): {
  status: GlucoseStatus;
  color: string;
  badgeBg: string;
  textColor: string;
  description: string;
} {
  // Patokan medis umum (mg/dL)
  if (level < 70) {
    return {
      status: "Rendah",
      color: "#3b82f6", // Blue
      badgeBg: "bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
      textColor: "text-blue-600 dark:text-blue-400",
      description: "Hipoglikemia: Risiko lemas atau pusing, konsumsi karbohidrat cepat serap.",
    };
  }

  const isFasting = context.toLowerCase().includes("puasa");

  if (isFasting) {
    if (level <= 99) {
      return {
        status: "Normal",
        color: "#10b981", // Emerald
        badgeBg: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
        textColor: "text-emerald-600 dark:text-emerald-400",
        description: "Optimal untuk kadar gula darah puasa.",
      };
    } else if (level <= 125) {
      return {
        status: "Meningkat",
        color: "#f59e0b", // Amber
        badgeBg: "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
        textColor: "text-amber-600 dark:text-amber-400",
        description: "Indikasi Prediabetes pada kondisi puasa.",
      };
    } else {
      return {
        status: "Tinggi / Waspada",
        color: "#ef4444", // Red
        badgeBg: "bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800",
        textColor: "text-rose-600 dark:text-rose-400",
        description: "Hiperglikemia pada kondisi puasa (>=126 mg/dL).",
      };
    }
  } else {
    // 2 jam setelah makan / sewaktu
    if (level <= 140) {
      return {
        status: "Normal",
        color: "#10b981",
        badgeBg: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
        textColor: "text-emerald-600 dark:text-emerald-400",
        description: "Optimal pasca makan (< 140 mg/dL).",
      };
    } else if (level <= 199) {
      return {
        status: "Meningkat",
        color: "#f59e0b",
        badgeBg: "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
        textColor: "text-amber-600 dark:text-amber-400",
        description: "Toleransi Glukosa Terganggu (140 - 199 mg/dL).",
      };
    } else {
      return {
        status: "Tinggi / Waspada",
        color: "#ef4444",
        badgeBg: "bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800",
        textColor: "text-rose-600 dark:text-rose-400",
        description: "Hiperglikemia pasca makan (>= 200 mg/dL).",
      };
    }
  }
}

export function evaluateGlycemicLoad(gl: number): {
  category: "Rendah" | "Sedang" | "Tinggi";
  badgeBg: string;
  textColor: string;
  recommendation: string;
} {
  if (gl <= 10) {
    return {
      category: "Rendah",
      badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300",
      textColor: "text-emerald-600 dark:text-emerald-400",
      recommendation: "Sangat aman untuk lonjakan gula darah terkontrol.",
    };
  } else if (gl <= 19) {
    return {
      category: "Sedang",
      badgeBg: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300",
      textColor: "text-amber-600 dark:text-amber-400",
      recommendation: "Konsumsi secukupnya dan perhatikan porsi.",
    };
  } else {
    return {
      category: "Tinggi",
      badgeBg: "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300",
      textColor: "text-rose-600 dark:text-rose-400",
      recommendation: "Peringatan: Berpotensi memicu lonjakan glukosa tajam, batasi ketat.",
    };
  }
}
