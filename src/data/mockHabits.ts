import { DailyHabitLog, RiskAssessmentResult } from "@/types";

export function calculateHabitScore(data: {
  physicalActivityMinutes: number;
  waterGlasses: number;
  veggieFruitPortions: number;
  sleepHours: number;
  lowSugarSaltFat: boolean;
}): number {
  let score = 0;
  // Aktivitas fisik target 30 menit (maks 30 poin)
  const actScore = Math.min(30, Math.round((data.physicalActivityMinutes / 30) * 30));
  score += actScore;

  // Air putih target 8 gelas (maks 25 poin)
  const waterScore = Math.min(25, Math.round((data.waterGlasses / 8) * 25));
  score += waterScore;

  // Sayur & buah target 4 porsi (maks 20 poin)
  const vegScore = Math.min(20, Math.round((data.veggieFruitPortions / 4) * 20));
  score += vegScore;

  // Tidur target 7-8 jam (maks 15 poin)
  const sleepScore = data.sleepHours >= 7 && data.sleepHours <= 9 ? 15 : data.sleepHours >= 6 ? 10 : 5;
  score += sleepScore;

  // Pembatasan GGL (10 poin)
  if (data.lowSugarSaltFat) score += 10;

  return Math.min(100, Math.max(0, score));
}

export const initialHabitLogs: DailyHabitLog[] = [
  {
    id: "habit-1",
    userId: "patient-1",
    date: "2026-10-10",
    physicalActivityMinutes: 35,
    stepCount: 7800,
    activityType: "Jalan Cepat Pagi & Peregangan",
    waterGlasses: 8,
    veggieFruitPortions: 4,
    sleepHours: 7.5,
    lowSugarSaltFat: true,
    notes: "Merasa sangat segar dan bugar setelah jalan pagi di taman.",
    habitScore: 95,
    createdAt: "2026-10-10T08:00:00Z",
  },
  {
    id: "habit-2",
    userId: "patient-1",
    date: "2026-10-09",
    physicalActivityMinutes: 40,
    stepCount: 8400,
    activityType: "Senam Aerobik Ringan",
    waterGlasses: 8,
    veggieFruitPortions: 3,
    sleepHours: 7.0,
    lowSugarSaltFat: true,
    notes: "Menghindari minuman manis kemasan saat kumpul rekan kantor.",
    habitScore: 90,
    createdAt: "2026-10-09T20:00:00Z",
  },
  {
    id: "habit-3",
    userId: "patient-1",
    date: "2026-10-08",
    physicalActivityMinutes: 30,
    stepCount: 6900,
    activityType: "Bersepeda Santai",
    waterGlasses: 7,
    veggieFruitPortions: 4,
    sleepHours: 8.0,
    lowSugarSaltFat: true,
    notes: "Konsumsi tumis buncis tempe dan buah pepaya matang.",
    habitScore: 88,
    createdAt: "2026-10-08T20:00:00Z",
  },
  {
    id: "habit-4",
    userId: "patient-1",
    date: "2026-10-07",
    physicalActivityMinutes: 25,
    stepCount: 5800,
    activityType: "Jalan Kaki Sore",
    waterGlasses: 6,
    veggieFruitPortions: 2,
    sleepHours: 6.5,
    lowSugarSaltFat: false,
    notes: "Pekerjaan padat, sedikit kurang minum air putih.",
    habitScore: 72,
    createdAt: "2026-10-07T20:00:00Z",
  },
  {
    id: "habit-5",
    userId: "patient-1",
    date: "2026-10-06",
    physicalActivityMinutes: 45,
    stepCount: 9200,
    activityType: "Jalan Santai & Naik Tangga Kantor",
    waterGlasses: 8,
    veggieFruitPortions: 4,
    sleepHours: 7.5,
    lowSugarSaltFat: true,
    notes: "Membawa bekal sayur bayam dan dada ayam kukus dari rumah.",
    habitScore: 96,
    createdAt: "2026-10-06T20:00:00Z",
  },
  {
    id: "habit-6",
    userId: "patient-1",
    date: "2026-10-05",
    physicalActivityMinutes: 35,
    stepCount: 7400,
    activityType: "Peregangan & Jalan Kaki",
    waterGlasses: 8,
    veggieFruitPortions: 3,
    sleepHours: 7.0,
    lowSugarSaltFat: true,
    notes: "Target air putih 8 gelas tuntas sebelum jam 8 malam.",
    habitScore: 89,
    createdAt: "2026-10-05T20:00:00Z",
  },
  {
    id: "habit-7",
    userId: "patient-1",
    date: "2026-10-04",
    physicalActivityMinutes: 50,
    stepCount: 9800,
    activityType: "Olahraga Jalan Kaki Bersama Keluarga",
    waterGlasses: 8,
    veggieFruitPortions: 5,
    sleepHours: 8.0,
    lowSugarSaltFat: true,
    notes: "Pola makan seimbang dan tidur tepat waktu 8 jam.",
    habitScore: 98,
    createdAt: "2026-10-04T20:00:00Z",
  },
];

export const initialRiskAssessments: RiskAssessmentResult[] = [
  {
    id: "risk-1",
    userId: "patient-1",
    totalScore: 6,
    riskCategory: "Rendah",
    tenYearRiskEstimate: "< 1% (Hanya 1 dari 100 orang berisiko)",
    bmi: 23.5,
    answers: {
      ageCategory: "< 45 th (0 poin)",
      bmiCategory: "< 25 kg/m² Normal (0 poin)",
      waistCategory: "< 90 cm Pria (0 poin)",
      dailyPhysicalActivity: true, // 0 poin
      dailyVeggieFruit: true, // 0 poin
      hypertensionMeds: false, // 0 poin
      highBloodSugarHistory: false, // 0 poin
      familyDiabetesHistory: "secondDegree", // Kakek/Nenek (3 poin) + skor usia muda
    },
    recommendations: [
      "Pertahankan gaya hidup sehat dan aktivitas fisik rutin minimal 150 menit per minggu.",
      "Konsumsi makanan kaya serat alami (sayur, buah, biji-bijian) dan batasi makanan cepat saji.",
      "Lakukan skrining risiko diabetes berkala setiap 1-2 tahun sekali.",
    ],
    assessedAt: "2026-10-05T10:00:00Z",
  },
];
