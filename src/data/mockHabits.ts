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
    id: "habit-10",
    userId: "patient-1",
    date: "2026-10-12",
    physicalActivityMinutes: 45,
    stepCount: 8800,
    activityType: "Jalan Pagi & Jogging Santai",
    waterGlasses: 8,
    veggieFruitPortions: 4,
    sleepHours: 7.5,
    lowSugarSaltFat: true,
    sugaryDrinkPortions: 0,
    dietCategory: "balanced",
    notes: "Kepatuhan penuh piring seimbang dan nol konsumsi gula tambahan.",
    habitScore: 100,
    createdAt: "2026-10-12T20:00:00Z",
  },
  {
    id: "habit-9",
    userId: "patient-1",
    date: "2026-10-11",
    physicalActivityMinutes: 35,
    stepCount: 7500,
    activityType: "Jalan Santai & Senam Ringan",
    waterGlasses: 8,
    veggieFruitPortions: 4,
    sleepHours: 7.5,
    lowSugarSaltFat: true,
    sugaryDrinkPortions: 0,
    dietCategory: "balanced",
    notes: "Pilihan makan terkontrol dengan sayur bening bayam dan tahu tempe.",
    habitScore: 95,
    createdAt: "2026-10-11T20:00:00Z",
  },
  {
    id: "habit-8",
    userId: "patient-1",
    date: "2026-10-10",
    physicalActivityMinutes: 40,
    stepCount: 8200,
    activityType: "Senam Diabetes & Peregangan",
    waterGlasses: 8,
    veggieFruitPortions: 4,
    sleepHours: 7.5,
    lowSugarSaltFat: true,
    sugaryDrinkPortions: 0,
    dietCategory: "balanced",
    notes: "Merasa sangat segar dan bugar setelah jalan pagi di taman.",
    habitScore: 95,
    createdAt: "2026-10-10T20:00:00Z",
  },
  {
    id: "habit-7",
    userId: "patient-1",
    date: "2026-10-09",
    physicalActivityMinutes: 30,
    stepCount: 7100,
    activityType: "Jalan Cepat Sore",
    waterGlasses: 8,
    veggieFruitPortions: 4,
    sleepHours: 7.0,
    lowSugarSaltFat: true,
    sugaryDrinkPortions: 0,
    dietCategory: "balanced",
    notes: "Menghindari minuman manis kemasan saat kumpul rekan kantor.",
    habitScore: 90,
    createdAt: "2026-10-09T20:00:00Z",
  },
  {
    id: "habit-6",
    userId: "patient-1",
    date: "2026-10-08",
    physicalActivityMinutes: 50,
    stepCount: 9900,
    activityType: "Bersepeda Santai",
    waterGlasses: 8,
    veggieFruitPortions: 5,
    sleepHours: 8.0,
    lowSugarSaltFat: true,
    sugaryDrinkPortions: 0,
    dietCategory: "balanced",
    notes: "Konsumsi tumis buncis tempe dan buah pepaya matang.",
    habitScore: 98,
    createdAt: "2026-10-08T20:00:00Z",
  },
  {
    id: "habit-5",
    userId: "patient-1",
    date: "2026-10-07",
    physicalActivityMinutes: 35,
    stepCount: 7600,
    activityType: "Jalan Pagi Sekitar Kompleks",
    waterGlasses: 8,
    veggieFruitPortions: 4,
    sleepHours: 7.5,
    lowSugarSaltFat: true,
    sugaryDrinkPortions: 0,
    dietCategory: "balanced",
    notes: "Membawa bekal sayur bayam dan dada ayam kukus dari rumah.",
    habitScore: 95,
    createdAt: "2026-10-07T20:00:00Z",
  },
  {
    id: "habit-4",
    userId: "patient-1",
    date: "2026-10-06",
    physicalActivityMinutes: 15,
    stepCount: 4800,
    activityType: "Peregangan Singkat",
    waterGlasses: 6,
    veggieFruitPortions: 2,
    sleepHours: 6.5,
    lowSugarSaltFat: false,
    sugaryDrinkPortions: 2,
    dietCategory: "high_sugar",
    notes: "Hari lembur kerja, sempat konsumsi minuman kopi manis kemasan.",
    habitScore: 70,
    createdAt: "2026-10-06T20:00:00Z",
  },
  {
    id: "habit-3",
    userId: "patient-1",
    date: "2026-10-05",
    physicalActivityMinutes: 45,
    stepCount: 9100,
    activityType: "Jalan Kaki & Senam Aerobik",
    waterGlasses: 8,
    veggieFruitPortions: 4,
    sleepHours: 8.0,
    lowSugarSaltFat: true,
    sugaryDrinkPortions: 0,
    dietCategory: "balanced",
    notes: "Pola makan seimbang dan tidur tepat waktu 8 jam.",
    habitScore: 96,
    createdAt: "2026-10-05T20:00:00Z",
  },
  {
    id: "habit-2",
    userId: "patient-1",
    date: "2026-10-04",
    physicalActivityMinutes: 30,
    stepCount: 6900,
    activityType: "Jalan Santai",
    waterGlasses: 7,
    veggieFruitPortions: 3,
    sleepHours: 7.0,
    lowSugarSaltFat: false,
    sugaryDrinkPortions: 1,
    dietCategory: "controlled",
    notes: "Sedikit konsumsi teh manis saat acara arisan keluarga.",
    habitScore: 85,
    createdAt: "2026-10-04T20:00:00Z",
  },
  {
    id: "habit-1",
    userId: "patient-1",
    date: "2026-10-03",
    physicalActivityMinutes: 40,
    stepCount: 8400,
    activityType: "Jalan Kaki Pagi Cepat",
    waterGlasses: 8,
    veggieFruitPortions: 4,
    sleepHours: 7.5,
    lowSugarSaltFat: true,
    sugaryDrinkPortions: 0,
    dietCategory: "balanced",
    notes: "Disiplin jadwal sarapan dan makan siang berserat tinggi.",
    habitScore: 94,
    createdAt: "2026-10-03T20:00:00Z",
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
