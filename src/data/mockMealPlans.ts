import { MealRecommendation, UserProfile } from "@/types";

export const initialProfile: UserProfile = {
  id: "patient-1",
  name: "Budi Pratama",
  email: "budi.pratama@example.com",
  gender: "Laki-laki",
  age: 52,
  diabetesType: "Diabetes Tipe 2",
  currentWeight: 72,
  height: 168,
  targetSugarFasting: 100, // mg/dL
  targetSugarPostPrandial: 140, // mg/dL
  medicalHistory: "Terdiagnosis DM Tipe 2 sejak 2021. Riwayat hipertensi derajat 1 terkontrol. Tidak ada riwayat alergi obat.",
  emergencyContact: "+62 812-3456-7890 (Ibu Dewi - Istri)",
};

export const initialMealRecommendations: MealRecommendation[] = [
  {
    id: "meal-1",
    mealTime: "Sarapan",
    menuTitle: "Oatmeal Serat Tinggi & Telur Rebus",
    items: [
      { name: "Rolled Oatmeal Utuh (100g masak)", portion: "1 mangkuk kecil", glycemicLoad: 6 },
      { name: "Telur Ayam Rebus Matang", portion: "1 butir", glycemicLoad: 0 },
      { name: "Biji Chia & Kayu Manis Tabur", portion: "1 sdt", glycemicLoad: 1 },
      { name: "Teh Hijau Tawar Hangat", portion: "1 cangkir (200ml)", glycemicLoad: 0 },
    ],
    totalGlycemicLoad: 7,
    totalCalories: 320,
    dietitianNotes: "Kombinasi beta-glukan dari oat dan protein telur memicu respon kenyang awet tanpa lonjakan gula pagi hari.",
  },
  {
    id: "meal-2",
    mealTime: "Makan Siang",
    menuTitle: "Piring Model T: Nasi Merah, Ikan Panggang & Sayur Bening Bayam",
    items: [
      { name: "Nasi Merah Kukus (100g)", portion: "1/4 piring (1 centong peres)", glycemicLoad: 12 },
      { name: "Ikan Kembung Panggang Bumbu Kuning", portion: "1/4 piring (1 ekor)", glycemicLoad: 0 },
      { name: "Sayur Bening Bayam & Jagung Pipil Sedikit", portion: "1/2 piring (1 mangkuk)", glycemicLoad: 3 },
      { name: "Tempe Bacem Tanpa Gula Aren Berlebih", portion: "1 potong (50g)", glycemicLoad: 2 },
    ],
    totalGlycemicLoad: 17,
    totalCalories: 480,
    dietitianNotes: "Penerapan konsep Piring Makanku Kemenkes: 50% sayuran, 25% lauk protein, 25% karbohidrat kompleks.",
  },
  {
    id: "meal-3",
    mealTime: "Camilan Sore",
    menuTitle: "Apel Fuji Potong & Kacang Almond Panggang",
    items: [
      { name: "Apel Segar dengan Kulit", portion: "1/2 buah (75g)", glycemicLoad: 5 },
      { name: "Kacang Almond Panggang Tanpa Garam", portion: "10-12 butir (20g)", glycemicLoad: 1 },
    ],
    totalGlycemicLoad: 6,
    totalCalories: 160,
    dietitianNotes: "Pektin apel dipadu lemak tak jenuh almond mencegah hipoglikemia sore hari menjelang waktu pulang kerja.",
  },
  {
    id: "meal-4",
    mealTime: "Makan Malam",
    menuTitle: "Sup Ayam Jamur & Tumis Buncis Tahu",
    items: [
      { name: "Kentang Rebus Dingin / Ubi Ungu Kukus", portion: "1 potong kecil (70g)", glycemicLoad: 8 },
      { name: "Sup Dada Ayam Fillet & Jamur Kuping", portion: "1 mangkuk sedang", glycemicLoad: 1 },
      { name: "Tumis Buncis & Tahu Sutra Minyak Zaitun", portion: "1 porsi sedang", glycemicLoad: 3 },
    ],
    totalGlycemicLoad: 12,
    totalCalories: 390,
    dietitianNotes: "Makan malam rendah kalori dan mudah dicerna 3 jam sebelum tidur untuk mencegah lonjakan glukosa nokturnal.",
  },
];
