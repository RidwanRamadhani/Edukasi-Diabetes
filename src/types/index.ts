export type UserRole = "patient" | "doctor";

export type HealthGoal =
  | "Pencegahan Primer (Belum Kena DM)"
  | "Deteksi Dini & Cek Risiko DM"
  | "Pemantauan Pola Hidup Sehat"
  | "Kelompok Waspada / Faktor Risiko Keluarga";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  gender: "Laki-laki" | "Perempuan";
  age: number;
  healthGoal?: HealthGoal;
  diabetesType?: string; // Menyimpan status pencegahan / kompatibilitas Supabase (default: "Pencegahan Primer")
  currentWeight: number; // kg
  height: number; // cm
  targetSugarFasting?: number; // mg/dL
  targetSugarPostPrandial?: number; // mg/dL
  medicalHistory: string;
  emergencyContact: string;
  phone?: string;
  lastBloodSugarLevel?: number;
  lastBloodSugarContext?: string;
  lastCheckDate?: string;
  riskStatus?: "Terkontrol" | "Waspada" | "Tinggi";
  // DIASERA Risk Assessment fields
  latestRiskScore?: number; // Skor FINDRISC (0 - 26)
  latestRiskCategory?: "Rendah" | "Sedang" | "Tinggi";
  latestRiskDate?: string;
  lifestyleScore?: number; // Indeks Perilaku Sehat (0 - 100%)
  // DIASERA Healthy Lifestyle Targets
  targetDailySteps?: number; // misal 7500 langkah
  targetDailyActivityMinutes?: number; // misal 30 menit
  targetWaterGlasses?: number; // misal 8 gelas
}

export interface DoctorProfile {
  id: string;
  name: string;
  email: string;
  title: string;
  strNumber: string;
  hospital: string;
  specialization: string;
  scheduleDays: string;
  phone: string;
  avatarInitials: string;
  role: "doctor";
}

// Skrining Cek Risiko Diabetes Melitus (FINDRISC - Finnish Diabetes Risk Score adaptasi Kemenkes RI)
export interface RiskAssessmentResult {
  id: string;
  userId: string;
  totalScore: number;
  riskCategory: "Rendah" | "Sedang" | "Tinggi";
  tenYearRiskEstimate: string; // misal "< 1% (1 dari 100 orang)", "17% (1 dari 6 orang)", "33-50% (1 dari 2-3 orang)"
  bmi: number;
  answers: {
    ageCategory: string; // misal "< 45 th", "45-54 th", "55-64 th", "> 64 th"
    bmiCategory: string; // misal "< 25", "25-30", "> 30"
    waistCategory: string; // misal "< 90 cm (P) / < 80 cm (W)", "90-102 cm", "> 102 cm"
    dailyPhysicalActivity: boolean; // >= 30 menit per hari
    dailyVeggieFruit: boolean; // makan sayur & buah tiap hari
    hypertensionMeds: boolean; // konsumsi obat anti-hipertensi
    highBloodSugarHistory: boolean; // riwayat pernah gula darah tinggi
    familyDiabetesHistory: "none" | "secondDegree" | "firstDegree";
  };
  recommendations: string[];
  assessedAt: string;
}

// Pantau Aktivitas & Perilaku Hidup Sehat Harian
export interface DailyHabitLog {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD
  physicalActivityMinutes: number; // Target 30 menit
  stepCount: number; // Target misal 6000-10000 langkah
  activityType: string; // "Jalan Cepat", "Senam Aerobik", "Bersepeda", "Jogging", dll
  waterGlasses: number; // Target 8 gelas (2000 ml)
  veggieFruitPortions: number; // Target 3-5 porsi
  sleepHours: number; // Target 7-8 jam
  lowSugarSaltFat: boolean; // Pembatasan konsumsi gula, garam, lemak tinggi
  notes?: string;
  habitScore: number; // 0 - 100%
  createdAt: string;
}

export type MeasurementContext =
  | "Puasa Pagi"
  | "Sebelum Makan Siang"
  | "2 Jam Setelah Makan Siang"
  | "Sebelum Makan Malam"
  | "2 Jam Setelah Makan Malam"
  | "Sebelum Tidur"
  | "Sewaktu / Acak";

// Legacy compatibility for BloodSugarLog
export interface BloodSugarLog {
  id: string;
  userId: string;
  sugarLevel: number;
  measurementContext: MeasurementContext;
  recordedAt: string;
  notes?: string;
  symptoms?: string[];
  createdAt: string;
}

export interface FoodItem {
  id: string;
  name: string;
  category: "Karbohidrat & Biji-bijian" | "Buah & Sayuran" | "Protein & Olahan" | "Minuman & Camilan";
  glycemicIndex: number; // 0 - 100
  carbohydrateGramPer100g: number; // gram
  standardServingGram: number; // gram
  servingDescription: string;
  benefits?: string;
  giClassification: "Rendah" | "Sedang" | "Tinggi";
}

export interface CalculationHistory {
  id: string;
  userId: string;
  foodName: string;
  glycemicIndex: number;
  portionWeight: number; // gram
  carbohydrateGram: number; // gram dalam porsi
  computedGlycemicLoad: number;
  category: "Rendah" | "Sedang" | "Tinggi";
  createdAt: string;
}

export interface DoctorReview {
  id: string;
  articleId: string;
  reviewerName: string;
  reviewerTitle: string;
  strNumber: string;
  hospital: string;
  reviewNotes: string;
  approvalStatus: "Approved" | "Revision Needed" | "Pending Review";
  reviewedAt: string;
}

export interface EducationalArticle {
  id: string;
  title: string;
  category: "Nutrisi & Diet" | "Pola Hidup & Aktivitas" | "Pencegahan Komplikasi" | "Panduan Obat & Insulin";
  summary: string;
  content: string;
  readingTimeMinutes: number;
  featuredImage: string;
  author: string;
  sourceMedia?: string;
  sourceUrl?: string;
  createdAt: string;
  doctorReview: DoctorReview;
}

export interface MealRecommendation {
  id: string;
  mealTime: "Sarapan" | "Makan Siang" | "Camilan Sore" | "Makan Malam";
  menuTitle: string;
  items: {
    name: string;
    portion: string;
    glycemicLoad: number;
  }[];
  totalGlycemicLoad: number;
  totalCalories: number;
  dietitianNotes: string;
}

export interface ClinicSchedule {
  id: string;
  day: string;
  time: string;
  location: string;
  type: "Tatap Muka" | "Telekonsultasi WA";
  status: "Buka" | "Penuh";
  quota: string;
}
