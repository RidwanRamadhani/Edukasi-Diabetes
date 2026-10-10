"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  BloodSugarLog,
  CalculationHistory,
  FoodItem,
  UserProfile,
  EducationalArticle,
  DoctorProfile,
  ClinicSchedule,
  DailyHabitLog,
  RiskAssessmentResult,
  HealthGoal,
} from "@/types";
import { initialBloodSugarLogs } from "@/data/mockBloodSugarLogs";
import { initialFoodDatabase } from "@/data/mockFoodDatabase";
import { initialProfile } from "@/data/mockMealPlans";
import { initialArticles } from "@/data/mockArticles";
import { initialHabitLogs, initialRiskAssessments, calculateHabitScore } from "@/data/mockHabits";
import {
  initialDoctors,
  initialMonitoredPatients,
  initialClinicSchedules,
  RegisteredDoctorAccount,
} from "@/data/mockDoctors";
import {
  isSupabaseConfigured,
  syncPatientToSupabase,
  fetchPatientsFromSupabase,
  insertBloodSugarLogToSupabase,
} from "@/lib/supabase";

const STORAGE_KEYS = {
  LOGS: "diasera_blood_sugar_logs",
  HABITS: "diasera_habit_logs",
  RISK_ASSESSMENTS: "diasera_risk_assessments",
  FOODS: "diasera_food_database",
  CALCULATIONS: "diasera_calculations",
  PROFILE: "diasera_user_profile",
  ARTICLES: "diasera_educational_articles",
  AUTH_SESSION: "diasera_auth_session",
  REGISTERED_USERS: "diasera_registered_users",
  DOCTOR_AUTH_SESSION: "diasera_doctor_auth_session",
  ACTIVE_DOCTOR: "diasera_active_doctor",
  MONITORED_PATIENTS: "diasera_monitored_patients",
};

export interface RegisteredAccount extends UserProfile {
  password: string;
}

const defaultRegisteredUsers: RegisteredAccount[] = [
  {
    ...initialProfile,
    password: "password123",
  },
];

interface DiabetesContextType {
  // Patient state
  logs: BloodSugarLog[];
  habitLogs: DailyHabitLog[];
  riskAssessments: RiskAssessmentResult[];
  foods: FoodItem[];
  calculations: CalculationHistory[];
  profile: UserProfile;
  articles: EducationalArticle[];
  isLoaded: boolean;
  isAuthenticated: boolean;
  registeredUsers: RegisteredAccount[];
  login: (email: string, password: string) => { success: boolean; message: string };
  register: (userData: {
    name: string;
    email: string;
    password: string;
    healthGoal?: HealthGoal;
    diabetesType?: string;
    age?: number;
    gender?: "Laki-laki" | "Perempuan";
    phone?: string;
    currentWeight?: number;
    height?: number;
  }) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isCloudDbConnected: boolean;
  addHabitLog: (newHabit: Omit<DailyHabitLog, "id" | "createdAt">) => DailyHabitLog;
  updateHabitLog: (id: string, updates: Partial<DailyHabitLog>) => void;
  addRiskAssessment: (newAssessment: Omit<RiskAssessmentResult, "id" | "assessedAt">) => RiskAssessmentResult;
  addBloodSugarLog: (newLog: Omit<BloodSugarLog, "id" | "createdAt">) => BloodSugarLog;
  deleteBloodSugarLog: (id: string) => void;
  addCalculation: (calc: Omit<CalculationHistory, "id" | "createdAt">) => CalculationHistory;
  updateProfile: (updatedProfile: UserProfile) => void;
  addFood: (newFood: Omit<FoodItem, "id">) => FoodItem;
  updateArticleReviewStatus: (
    articleId: string,
    status: "Approved" | "Revision Needed" | "Pending Review",
    doctorNotes: string,
    doctorName: string
  ) => void;

  // Doctor state & authentication
  isDoctorAuthenticated: boolean;
  activeDoctor: DoctorProfile | null;
  registeredDoctors: RegisteredDoctorAccount[];
  monitoredPatients: UserProfile[];
  clinicSchedules: ClinicSchedule[];
  doctorLogin: (identifier: string, password: string) => { success: boolean; message: string };
  doctorLogout: () => void;
  addPatientMedicalNote: (patientId: string, note: string) => void;
}

const DiabetesContext = createContext<DiabetesContextType | null>(null);

export function DiabetesProvider({ children }: { children: React.ReactNode }) {
  // Patient state
  const [logs, setLogs] = useState<BloodSugarLog[]>(initialBloodSugarLogs);
  const [habitLogs, setHabitLogs] = useState<DailyHabitLog[]>(initialHabitLogs);
  const [riskAssessments, setRiskAssessments] = useState<RiskAssessmentResult[]>(initialRiskAssessments);
  const [foods, setFoods] = useState<FoodItem[]>(initialFoodDatabase);
  const [calculations, setCalculations] = useState<CalculationHistory[]>([]);
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [articles, setArticles] = useState<EducationalArticle[]>(initialArticles);
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredAccount[]>(defaultRegisteredUsers);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Doctor state
  const [isDoctorAuthenticated, setIsDoctorAuthenticated] = useState<boolean>(false);
  const [activeDoctor, setActiveDoctor] = useState<DoctorProfile | null>(initialDoctors[0]);
  const [registeredDoctors] = useState<RegisteredDoctorAccount[]>(initialDoctors);
  const [monitoredPatients, setMonitoredPatients] = useState<UserProfile[]>(initialMonitoredPatients);
  const [clinicSchedules] = useState<ClinicSchedule[]>(initialClinicSchedules);

  // Initialize from localStorage on mount
  useEffect(() => {
    try {
      // 1. Registered patients list
      const storedUsers = localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
      if (storedUsers) {
        setRegisteredUsers(JSON.parse(storedUsers));
      }

      // 2. Active patient profile
      let loadedProfile: UserProfile | null = null;
      const storedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (storedProfile) {
        loadedProfile = JSON.parse(storedProfile);
        setProfile(loadedProfile!);
      }

      // 3. Patient auth session (Default: FALSE)
      const storedAuth = localStorage.getItem(STORAGE_KEYS.AUTH_SESSION);
      if (storedAuth !== null) {
        setIsAuthenticated(JSON.parse(storedAuth) === true);
      } else {
        setIsAuthenticated(false);
      }

      // 4. Doctor auth session & active doctor
      const storedDoctorAuth = localStorage.getItem(STORAGE_KEYS.DOCTOR_AUTH_SESSION);
      if (storedDoctorAuth !== null) {
        setIsDoctorAuthenticated(JSON.parse(storedDoctorAuth) === true);
      } else {
        setIsDoctorAuthenticated(false);
      }

      const storedActiveDoctor = localStorage.getItem(STORAGE_KEYS.ACTIVE_DOCTOR);
      if (storedActiveDoctor) {
        setActiveDoctor(JSON.parse(storedActiveDoctor));
      }

      // 5a. Habits logs & Risk assessments
      const storedHabits = localStorage.getItem(STORAGE_KEYS.HABITS);
      if (storedHabits) {
        try {
          setHabitLogs(JSON.parse(storedHabits));
        } catch {}
      }

      let parsedRisks: RiskAssessmentResult[] = initialRiskAssessments;
      const storedRisks = localStorage.getItem(STORAGE_KEYS.RISK_ASSESSMENTS);
      if (storedRisks) {
        try {
          parsedRisks = JSON.parse(storedRisks);
          setRiskAssessments(parsedRisks);
        } catch {}
      }

      // If there is an assessed risk result, prioritize it in the loaded profile
      if (parsedRisks && parsedRisks.length > 0 && loadedProfile) {
        const latest = parsedRisks[0];
        loadedProfile = {
          ...loadedProfile,
          latestRiskScore: latest.totalScore,
          latestRiskCategory: latest.riskCategory,
          latestRiskDate: latest.assessedAt,
          riskStatus:
            latest.riskCategory === "Rendah"
              ? "Terkontrol"
              : latest.riskCategory === "Sedang"
              ? "Waspada"
              : "Tinggi",
        };
        setProfile(loadedProfile);
      }

      // 5b. Monitored patients list (Sync active profile and risk assessments)
      let patientsList: UserProfile[] = initialMonitoredPatients;
      const storedPatients = localStorage.getItem(STORAGE_KEYS.MONITORED_PATIENTS);
      if (storedPatients) {
        try {
          const parsed: UserProfile[] = JSON.parse(storedPatients);
          patientsList = parsed.map((p) => {
            const init = initialMonitoredPatients.find((i) => i.id === p.id);
            return {
              ...p,
              latestRiskScore:
                p.latestRiskScore ??
                init?.latestRiskScore ??
                (p.riskStatus === "Tinggi" ? 16 : p.riskStatus === "Waspada" ? 13 : 4),
              latestRiskCategory:
                p.latestRiskCategory ??
                init?.latestRiskCategory ??
                (p.riskStatus === "Tinggi" ? "Tinggi" : p.riskStatus === "Waspada" ? "Sedang" : "Rendah"),
              lifestyleScore:
                p.lifestyleScore ??
                init?.lifestyleScore ??
                (p.riskStatus === "Tinggi" ? 45 : p.riskStatus === "Waspada" ? 68 : 88),
              healthGoal:
                p.healthGoal ??
                init?.healthGoal ??
                "Pencegahan Primer (Belum Kena DM)",
            };
          });
        } catch {}
      }

      if (loadedProfile) {
        const targetId = loadedProfile.id;
        const targetEmail = loadedProfile.email?.toLowerCase();
        const targetName = loadedProfile.name?.toLowerCase();
        let found = false;
        patientsList = patientsList.map((p) => {
          const isMatch =
            (targetId && p.id === targetId) ||
            (targetEmail && p.email?.toLowerCase() === targetEmail) ||
            (targetName && p.name?.toLowerCase() === targetName);
          if (isMatch) {
            found = true;
            return {
              ...p,
              ...loadedProfile,
              latestRiskScore: loadedProfile!.latestRiskScore ?? p.latestRiskScore,
              latestRiskCategory: loadedProfile!.latestRiskCategory ?? p.latestRiskCategory,
              latestRiskDate: loadedProfile!.latestRiskDate ?? p.latestRiskDate,
              lifestyleScore: loadedProfile!.lifestyleScore ?? p.lifestyleScore,
              lastBloodSugarLevel: loadedProfile!.lastBloodSugarLevel ?? p.lastBloodSugarLevel,
              lastBloodSugarContext: loadedProfile!.lastBloodSugarContext ?? p.lastBloodSugarContext,
              lastCheckDate: loadedProfile!.lastCheckDate ?? p.lastCheckDate,
              riskStatus: loadedProfile!.riskStatus ?? p.riskStatus,
            };
          }
          return p;
        });
        if (!found) {
          patientsList = [loadedProfile, ...patientsList];
        }
      }
      setMonitoredPatients(patientsList);
      try {
        localStorage.setItem(STORAGE_KEYS.MONITORED_PATIENTS, JSON.stringify(patientsList));
      } catch {}

      // 6. Blood sugar logs
      const storedLogs = localStorage.getItem(STORAGE_KEYS.LOGS);
      if (storedLogs) {
        setLogs(JSON.parse(storedLogs));
      }

      // 7. Food database
      const storedFoods = localStorage.getItem(STORAGE_KEYS.FOODS);
      if (storedFoods) {
        setFoods(JSON.parse(storedFoods));
      }

      // 8. Calculations
      const storedCalcs = localStorage.getItem(STORAGE_KEYS.CALCULATIONS);
      if (storedCalcs) {
        setCalculations(JSON.parse(storedCalcs));
      }

      // 9. Articles (Ensure Kumparan articles and latest authentic images are synchronized)
      const storedArticles = localStorage.getItem(STORAGE_KEYS.ARTICLES);
      if (storedArticles) {
        try {
          const parsed: EducationalArticle[] = JSON.parse(storedArticles);
          const existingIds = new Set(parsed.map((a) => a.id));
          const missing = initialArticles.filter((a) => !existingIds.has(a.id));

          // Always refresh with latest authentic Kumparan photos, URLs, and doctor reviews
          const refreshed = [...parsed, ...missing].map((art) => {
            const fresh = initialArticles.find((init) => init.id === art.id);
            if (fresh) {
              return {
                ...art,
                title: fresh.title,
                category: fresh.category,
                summary: fresh.summary,
                content: fresh.content,
                featuredImage: fresh.featuredImage,
                sourceUrl: fresh.sourceUrl,
                sourceMedia: fresh.sourceMedia,
                author: fresh.author,
              };
            }
            return art;
          });

          setArticles(refreshed);
          localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(refreshed));
        } catch {
          setArticles(initialArticles);
          localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(initialArticles));
        }
      } else {
        setArticles(initialArticles);
        localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(initialArticles));
      }

      // 10. Fetch from Supabase cloud database if configured
      if (isSupabaseConfigured()) {
        fetchPatientsFromSupabase()
          .then((cloudPatients) => {
            if (cloudPatients && cloudPatients.length > 0) {
              setMonitoredPatients((prev) => {
                const map = new Map<string, UserProfile>();
                prev.forEach((p) => map.set(p.email.toLowerCase(), p));
                cloudPatients.forEach((p) => map.set(p.email.toLowerCase(), p));
                const merged = Array.from(map.values());
                try {
                  localStorage.setItem(STORAGE_KEYS.MONITORED_PATIENTS, JSON.stringify(merged));
                } catch {}
                return merged;
              });
            }
          })
          .catch((err) => {
            console.warn("Could not sync patients from Supabase:", err);
          });
      }
    } catch (e) {
      console.warn("Could not load from localStorage, using initial mock data:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Authentication: Patient Login
  const login = (email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const user = registeredUsers.find(
      (u) => u.email.toLowerCase() === cleanEmail && u.password === password
    );

    if (!user) {
      return {
        success: false,
        message: "Email atau kata sandi tidak cocok. Silakan periksa kembali akun Anda.",
      };
    }

    const { password: _, ...userProfile } = user;
    setProfile(userProfile);
    setIsAuthenticated(true);

    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(userProfile));
      localStorage.setItem(STORAGE_KEYS.AUTH_SESSION, JSON.stringify(true));
    } catch {}

    return {
      success: true,
      message: `Selamat datang kembali, ${user.name}! Sesi berhasil diaktifkan.`,
    };
  };

  // Authentication: Patient Register
  const register = async (userData: {
    name: string;
    email: string;
    password: string;
    healthGoal?: HealthGoal;
    diabetesType?: string;
    age?: number;
    gender?: "Laki-laki" | "Perempuan";
    phone?: string;
    currentWeight?: number;
    height?: number;
  }): Promise<{ success: boolean; message: string }> => {
    const cleanEmail = userData.email.trim().toLowerCase();
    const alreadyExists =
      registeredUsers.some((u) => u.email.toLowerCase() === cleanEmail) ||
      monitoredPatients.some((p) => p.email.toLowerCase() === cleanEmail);

    if (alreadyExists) {
      return {
        success: false,
        message: "Email ini sudah terdaftar. Silakan masuk menggunakan tab 'Masuk Akun'.",
      };
    }

    const healthGoal: HealthGoal =
      userData.healthGoal || "Pencegahan Primer (Belum Kena DM)";
    const newAccount: RegisteredAccount = {
      id: `patient-${Date.now()}`,
      name: userData.name.trim(),
      email: cleanEmail,
      phone: userData.phone?.trim() || undefined,
      password: userData.password,
      healthGoal,
      diabetesType: userData.diabetesType || "Pencegahan Primer",
      age: userData.age || 35,
      gender: userData.gender || "Laki-laki",
      currentWeight: userData.currentWeight || 65,
      height: userData.height || 165,
      targetSugarFasting: 95,
      targetSugarPostPrandial: 130,
      medicalHistory: `Pengguna DIASERA (${healthGoal}). Program pemantauan gaya hidup sehat mandiri.`,
      emergencyContact: userData.phone ? `WhatsApp: ${userData.phone}` : "-",
      lastBloodSugarLevel: 95,
      lastBloodSugarContext: "Puasa Pagi",
      lastCheckDate: new Date().toISOString(),
      riskStatus: "Terkontrol",
      latestRiskScore: 0,
      latestRiskCategory: "Rendah",
      latestRiskDate: new Date().toISOString(),
      targetDailySteps: 7500,
      targetDailyActivityMinutes: 30,
      targetWaterGlasses: 8,
    };

    const updatedUsers = [...registeredUsers, newAccount];
    setRegisteredUsers(updatedUsers);

    // Also add to doctor's monitored patients
    const updatedMonitored = [newAccount, ...monitoredPatients];
    setMonitoredPatients(updatedMonitored);

    const { password: _, ...userProfile } = newAccount;
    setProfile(userProfile);
    setIsAuthenticated(true);

    try {
      localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(updatedUsers));
      localStorage.setItem(STORAGE_KEYS.MONITORED_PATIENTS, JSON.stringify(updatedMonitored));
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(userProfile));
      localStorage.setItem(STORAGE_KEYS.AUTH_SESSION, JSON.stringify(true));
    } catch {}

    // Synchronize to Supabase Cloud Database (awaited so redirection does not abort network request)
    let cloudSynced = false;
    if (isSupabaseConfigured()) {
      try {
        const syncRes = await syncPatientToSupabase(newAccount, userData.password);
        if (syncRes.success) {
          cloudSynced = true;
          console.log("Patient successfully saved to Supabase:", syncRes.message);
        } else {
          console.warn("Supabase background registration note:", syncRes.message);
        }
      } catch (err) {
        console.warn("Supabase background registration error:", err);
      }
    }

    return {
      success: true,
      message: cloudSynced
        ? `Akun pasien ${newAccount.name} berhasil didaftarkan dan tersimpan di database Cloud Supabase!`
        : `Akun pasien ${newAccount.name} berhasil didaftarkan!`,
    };
  };

  // Authentication: Patient Logout
  const logout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH_SESSION, JSON.stringify(false));
    } catch {}
  };

  // Authentication: Doctor Login
  const doctorLogin = (identifier: string, password: string) => {
    const cleanId = identifier.trim().toLowerCase();
    const cleanPassword = password.trim();

    // Check doctor credentials (by email or STR or username)
    const doctor = registeredDoctors.find(
      (d) =>
        (d.email.toLowerCase() === cleanId ||
          d.strNumber.toLowerCase() === cleanId ||
          d.name.toLowerCase().includes(cleanId)) &&
        d.password === cleanPassword
    );

    if (!doctor) {
      // Check if user accidentally entered a patient account here
      const isPatient = registeredUsers.some((p) => p.email.toLowerCase() === cleanId);
      if (isPatient) {
        return {
          success: false,
          message:
            "Akses ditolak: Akun ini terdaftar sebagai Pasien, bukan Tenaga Medis / Dokter. Silakan masuk melalui Portal Pasien.",
        };
      }

      return {
        success: false,
        message: "Email / STR atau kata sandi dokter tidak valid. Pastikan Anda memiliki hak akses tenaga medis.",
      };
    }

    const { password: _, ...doctorData } = doctor;
    setActiveDoctor(doctorData);
    setIsDoctorAuthenticated(true);

    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_DOCTOR, JSON.stringify(doctorData));
      localStorage.setItem(STORAGE_KEYS.DOCTOR_AUTH_SESSION, JSON.stringify(true));
    } catch {}

    return {
      success: true,
      message: `Selamat bertugas, ${doctor.name}! Sesi klinis berhasil diaktifkan.`,
    };
  };

  // Authentication: Doctor Logout
  const doctorLogout = () => {
    setIsDoctorAuthenticated(false);
    try {
      localStorage.setItem(STORAGE_KEYS.DOCTOR_AUTH_SESSION, JSON.stringify(false));
    } catch {}
  };

  // Doctor Action: Add note / prescription to patient
  const addPatientMedicalNote = (patientId: string, note: string) => {
    const updated = monitoredPatients.map((p) => {
      if (p.id === patientId) {
        return {
          ...p,
          medicalHistory: `${p.medicalHistory}\n[Catatan Dokter ${new Date().toLocaleDateString("id-ID")}]: ${note}`,
        };
      }
      return p;
    });
    setMonitoredPatients(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.MONITORED_PATIENTS, JSON.stringify(updated));
    } catch {}
  };

  const addBloodSugarLog = (newLog: Omit<BloodSugarLog, "id" | "createdAt">) => {
    const item: BloodSugarLog = {
      ...newLog,
      id: `log-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [item, ...logs];
    setLogs(updated);

    // Update patient's last blood sugar level
    if (profile) {
      const risk: "Tinggi" | "Waspada" | "Terkontrol" =
        newLog.sugarLevel > 180 ? "Tinggi" : newLog.sugarLevel > 140 ? "Waspada" : "Terkontrol";

      const updatedProfile: UserProfile = {
        ...profile,
        lastBloodSugarLevel: newLog.sugarLevel,
        lastBloodSugarContext: newLog.measurementContext,
        lastCheckDate: newLog.recordedAt,
        riskStatus: risk,
      };
      setProfile(updatedProfile);

      // Sync into doctor's monitored patients table
      const updatedMonitored = monitoredPatients.map((p) => {
        const isMatch =
          (profile.id && p.id === profile.id) ||
          (profile.email && p.email.toLowerCase() === profile.email.toLowerCase());
        if (isMatch) {
          return {
            ...p,
            lastBloodSugarLevel: newLog.sugarLevel,
            lastBloodSugarContext: newLog.measurementContext,
            lastCheckDate: newLog.recordedAt,
            riskStatus: risk,
          };
        }
        return p;
      });
      setMonitoredPatients(updatedMonitored);

      try {
        localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updatedProfile));
        localStorage.setItem(STORAGE_KEYS.MONITORED_PATIENTS, JSON.stringify(updatedMonitored));
      } catch {}

      // Synchronize log to Supabase
      if (isSupabaseConfigured()) {
        insertBloodSugarLogToSupabase(item, profile.email).catch((err) => {
          console.warn("Supabase log sync error:", err);
        });
      }
    }

    try {
      localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(updated));
    } catch {}
    return item;
  };

  const deleteBloodSugarLog = (id: string) => {
    const updated = logs.filter((log) => log.id !== id);
    setLogs(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(updated));
    } catch {}
  };

  const addCalculation = (calc: Omit<CalculationHistory, "id" | "createdAt">) => {
    const item: CalculationHistory = {
      ...calc,
      id: `calc-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [item, ...calculations];
    setCalculations(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.CALCULATIONS, JSON.stringify(updated));
    } catch {}
    return item;
  };

  const updateProfile = (updatedProfile: UserProfile) => {
    // 1. Update active profile state
    setProfile(updatedProfile);

    // 2. Update registered accounts list
    const oldEmail = profile.email?.toLowerCase();
    const newEmail = updatedProfile.email?.toLowerCase();
    const targetId = updatedProfile.id || profile.id;

    const updatedUsers = registeredUsers.map((u) => {
      const isMatch =
        (targetId && u.id === targetId) ||
        (oldEmail && u.email.toLowerCase() === oldEmail) ||
        (newEmail && u.email.toLowerCase() === newEmail);

      if (isMatch) {
        return {
          ...u,
          ...updatedProfile,
          password: u.password,
        };
      }
      return u;
    });
    setRegisteredUsers(updatedUsers);

    // 3. Update Doctor's monitored patients list
    let patientFound = false;
    const updatedMonitored = monitoredPatients.map((p) => {
      const isMatch =
        (targetId && p.id === targetId) ||
        (oldEmail && p.email.toLowerCase() === oldEmail) ||
        (newEmail && p.email.toLowerCase() === newEmail);

      if (isMatch) {
        patientFound = true;
        return {
          ...p,
          ...updatedProfile,
          // Retain latest check data if not explicitly modified
          lastBloodSugarLevel: updatedProfile.lastBloodSugarLevel ?? p.lastBloodSugarLevel,
          lastBloodSugarContext: updatedProfile.lastBloodSugarContext ?? p.lastBloodSugarContext,
          lastCheckDate: updatedProfile.lastCheckDate ?? p.lastCheckDate,
          riskStatus: updatedProfile.riskStatus ?? p.riskStatus,
        };
      }
      return p;
    });

    const finalMonitored = patientFound
      ? updatedMonitored
      : [updatedProfile, ...updatedMonitored];

    setMonitoredPatients(finalMonitored);

    // 4. Save all to localStorage
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updatedProfile));
      localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(updatedUsers));
      localStorage.setItem(STORAGE_KEYS.MONITORED_PATIENTS, JSON.stringify(finalMonitored));
    } catch {}

    // Synchronize to Supabase Cloud Database
    if (isSupabaseConfigured()) {
      syncPatientToSupabase(updatedProfile).catch((err) => {
        console.warn("Supabase profile sync error:", err);
      });
    }
  };

  const addFood = (newFood: Omit<FoodItem, "id">) => {
    const item: FoodItem = {
      ...newFood,
      id: `food-${Date.now()}`,
    };
    const updated = [item, ...foods];
    setFoods(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.FOODS, JSON.stringify(updated));
    } catch {}
    return item;
  };

  const updateArticleReviewStatus = (
    articleId: string,
    status: "Approved" | "Revision Needed" | "Pending Review",
    doctorNotes: string,
    doctorName: string
  ) => {
    const updated = articles.map((art) => {
      if (art.id === articleId) {
        return {
          ...art,
          doctorReview: {
            ...art.doctorReview,
            approvalStatus: status,
            reviewNotes: doctorNotes,
            reviewerName: doctorName || art.doctorReview.reviewerName,
            reviewedAt: new Date().toISOString(),
          },
        };
      }
      return art;
    });
    setArticles(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(updated));
    } catch {}
  };

  const addHabitLog = (newHabit: Omit<DailyHabitLog, "id" | "createdAt">): DailyHabitLog => {
    const habitScore = calculateHabitScore(newHabit);
    const created: DailyHabitLog = {
      ...newHabit,
      id: `habit-${Date.now()}`,
      habitScore,
      createdAt: new Date().toISOString(),
    };
    const existingIndex = habitLogs.findIndex((h) => h.date === newHabit.date);
    let updated: DailyHabitLog[];
    if (existingIndex >= 0) {
      updated = [...habitLogs];
      updated[existingIndex] = created;
    } else {
      updated = [created, ...habitLogs];
    }
    setHabitLogs(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(updated));
    } catch {}
    return created;
  };

  const updateHabitLog = (id: string, updates: Partial<DailyHabitLog>) => {
    const updated = habitLogs.map((h) => {
      if (h.id === id) {
        const merged = { ...h, ...updates };
        const score = calculateHabitScore(merged);
        return { ...merged, habitScore: score };
      }
      return h;
    });
    setHabitLogs(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(updated));
    } catch {}
  };

  const addRiskAssessment = (
    newAssessment: Omit<RiskAssessmentResult, "id" | "assessedAt">
  ): RiskAssessmentResult => {
    const created: RiskAssessmentResult = {
      ...newAssessment,
      id: `risk-${Date.now()}`,
      assessedAt: new Date().toISOString(),
    };

    // Update existing recent assessment or prepend
    const existingIndex = riskAssessments.findIndex(
      (r) =>
        r.userId === newAssessment.userId &&
        Date.now() - new Date(r.assessedAt).getTime() < 1800000
    );
    let updated: RiskAssessmentResult[];
    if (existingIndex >= 0) {
      updated = [...riskAssessments];
      updated[existingIndex] = created;
    } else {
      updated = [created, ...riskAssessments];
    }
    setRiskAssessments(updated);

    const updatedProfile: UserProfile = {
      ...profile,
      latestRiskScore: created.totalScore,
      latestRiskCategory: created.riskCategory,
      latestRiskDate: created.assessedAt,
      riskStatus:
        created.riskCategory === "Rendah"
          ? "Terkontrol"
          : created.riskCategory === "Sedang"
          ? "Waspada"
          : "Tinggi",
    };
    setProfile(updatedProfile);

    // CRITICAL: Synchronize directly into doctor's monitoredPatients table!
    const targetId = profile.id;
    const targetEmail = profile.email?.toLowerCase();
    const targetName = profile.name?.toLowerCase();

    let matched = false;
    const updatedMonitored = monitoredPatients.map((p) => {
      const isMatch =
        (targetId && p.id === targetId) ||
        (targetEmail && p.email?.toLowerCase() === targetEmail) ||
        (targetName && p.name?.toLowerCase() === targetName);
      if (isMatch) {
        matched = true;
        return {
          ...p,
          latestRiskScore: created.totalScore,
          latestRiskCategory: created.riskCategory,
          latestRiskDate: created.assessedAt,
          riskStatus: updatedProfile.riskStatus,
        };
      }
      return p;
    });

    const finalMonitored = matched ? updatedMonitored : [updatedProfile, ...updatedMonitored];
    setMonitoredPatients(finalMonitored);

    try {
      localStorage.setItem(STORAGE_KEYS.RISK_ASSESSMENTS, JSON.stringify(updated));
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updatedProfile));
      localStorage.setItem(STORAGE_KEYS.MONITORED_PATIENTS, JSON.stringify(finalMonitored));
    } catch {}

    if (isSupabaseConfigured()) {
      syncPatientToSupabase(updatedProfile).catch(() => {});
    }
    return created;
  };

  return (
    <DiabetesContext.Provider
      value={{
        logs,
        habitLogs,
        riskAssessments,
        foods,
        calculations,
        profile,
        articles,
        isLoaded,
        isAuthenticated,
        registeredUsers,
        login,
        register,
        logout,
        isCloudDbConnected: isSupabaseConfigured(),
        addHabitLog,
        updateHabitLog,
        addRiskAssessment,
        addBloodSugarLog,
        deleteBloodSugarLog,
        addCalculation,
        updateProfile,
        addFood,
        updateArticleReviewStatus,

        // Doctor exports
        isDoctorAuthenticated,
        activeDoctor,
        registeredDoctors,
        monitoredPatients,
        clinicSchedules,
        doctorLogin,
        doctorLogout,
        addPatientMedicalNote,
      }}
    >
      {children}
    </DiabetesContext.Provider>
  );
}

export function useDiabetesStore() {
  const context = useContext(DiabetesContext);
  if (!context) {
    throw new Error("useDiabetesStore must be used within a DiabetesProvider");
  }
  return context;
}
