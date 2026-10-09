export type UserRole = "patient" | "doctor";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  gender: "Laki-laki" | "Perempuan";
  age: number;
  diabetesType: "Diabetes Tipe 1" | "Diabetes Tipe 2" | "Prediabetes" | "Gestasional";
  currentWeight: number; // kg
  height: number; // cm
  targetSugarFasting: number; // mg/dL
  targetSugarPostPrandial: number; // mg/dL
  medicalHistory: string;
  emergencyContact: string;
  phone?: string;
  lastBloodSugarLevel?: number;
  lastBloodSugarContext?: string;
  lastCheckDate?: string;
  riskStatus?: "Terkontrol" | "Waspada" | "Tinggi";
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

export type MeasurementContext =
  | "Puasa Pagi"
  | "Sebelum Makan Siang"
  | "2 Jam Setelah Makan Siang"
  | "Sebelum Makan Malam"
  | "2 Jam Setelah Makan Malam"
  | "Sebelum Tidur"
  | "Sewaktu / Acak";

export interface BloodSugarLog {
  id: string;
  userId: string;
  sugarLevel: number; // mg/dL
  measurementContext: MeasurementContext;
  recordedAt: string; // ISO date string
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
  reviewerTitle: string; // e.g. "dr. Sp.PD, KEMD (Spesialis Penyakit Dalam)"
  strNumber: string; // Surat Tanda Registrasi
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
  sourceMedia?: string; // e.g. "kumparan.com"
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
