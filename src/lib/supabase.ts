import { createClient } from "@supabase/supabase-js";
import { UserProfile, BloodSugarLog } from "@/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

/**
 * Checks whether Supabase environment variables have been filled in with real credentials.
 */
export function isSupabaseConfigured(): boolean {
  if (!supabaseUrl || !supabaseAnonKey) return false;
  if (
    supabaseUrl.includes("your-project-id") ||
    supabaseAnonKey.includes("your-anon-key") ||
    !supabaseUrl.startsWith("http")
  ) {
    return false;
  }
  return true;
}

// Global Supabase client instance (mock safe if env not yet set)
export const supabase = createClient(
  supabaseUrl || "https://placeholder-project.supabase.co",
  supabaseAnonKey || "placeholder-anon-key",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

/**
 * Inserts or updates a patient record in the Supabase 'patients' table.
 * If password is provided, also attempts Supabase Auth registration.
 */
export async function syncPatientToSupabase(
  patient: UserProfile,
  password?: string
): Promise<{ success: boolean; message: string; data?: any }> {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      message: "Supabase belum dikonfigurasikan di .env.local (data tersimpan di penyimpanan lokal).",
    };
  }

  try {
    // 1. Upsert into public.patients table immediately (guarantees fast cloud persistence)
    const patientRow: Record<string, any> = {
      id: patient.id,
      name: patient.name,
      email: patient.email.toLowerCase(),
      phone: patient.phone || null,
      gender: patient.gender || "Laki-laki",
      age: patient.age || 45,
      diabetes_type: patient.diabetesType,
      current_weight: patient.currentWeight || 70,
      height: patient.height || 165,
      target_sugar_fasting: patient.targetSugarFasting || 100,
      target_sugar_post_prandial: patient.targetSugarPostPrandial || 140,
      medical_history: patient.medicalHistory || "Rekam medis baru dibuka.",
      emergency_contact: patient.emergencyContact || "-",
      last_blood_sugar_level: patient.lastBloodSugarLevel || 100,
      last_blood_sugar_context: patient.lastBloodSugarContext || "Puasa Pagi",
      last_check_date: patient.lastCheckDate || new Date().toISOString(),
      risk_status: patient.riskStatus || "Terkontrol",
    };

    const { data, error } = await supabase
      .from("patients")
      .upsert(patientRow, { onConflict: "email" })
      .select();

    if (error) {
      console.error("Supabase patient upsert error:", error);
      return { success: false, message: error.message };
    }

    // 2. Non-blocking Supabase Auth registration in background (does not delay patient persistence)
    if (password) {
      supabase.auth
        .signUp({
          email: patient.email.toLowerCase(),
          password: password,
          options: {
            data: {
              name: patient.name,
              diabetesType: patient.diabetesType,
              age: patient.age,
            },
          },
        })
        .then(({ data: authData, error: authErr }) => {
          if (!authErr && authData?.user) {
            supabase
              .from("patients")
              .update({ auth_user_id: authData.user.id })
              .eq("email", patient.email.toLowerCase())
              .then(() => {});
          }
        })
        .catch((err) => {
          console.warn("Supabase Auth background sign up note:", err);
        });
    }

    return {
      success: true,
      message: "Data pasien berhasil disimpan di database cloud Supabase!",
      data,
    };
  } catch (err: any) {
    console.error("Error in syncPatientToSupabase:", err);
    return {
      success: false,
      message: err.message || "Gagal menghubungkan ke Supabase.",
    };
  }
}

/**
 * Fetches all monitored patients from Supabase 'patients' table.
 */
export async function fetchPatientsFromSupabase(): Promise<UserProfile[] | null> {
  if (!isSupabaseConfigured()) return null;

  try {
    const { data, error } = await supabase
      .from("patients")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) {
      console.warn("Could not fetch patients from Supabase:", error);
      return null;
    }

    // Transform snake_case columns to camelCase UserProfile
    return data.map((row: any) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone || undefined,
      gender: row.gender || "Laki-laki",
      age: row.age || 45,
      diabetesType: row.diabetes_type || "Diabetes Tipe 2",
      currentWeight: Number(row.current_weight) || 70,
      height: Number(row.height) || 165,
      targetSugarFasting: Number(row.target_sugar_fasting) || 100,
      targetSugarPostPrandial: Number(row.target_sugar_post_prandial) || 140,
      medicalHistory: row.medical_history || "",
      emergencyContact: row.emergency_contact || "-",
      lastBloodSugarLevel: row.last_blood_sugar_level || undefined,
      lastBloodSugarContext: row.last_blood_sugar_context || undefined,
      lastCheckDate: row.last_check_date || undefined,
      riskStatus: row.risk_status || "Terkontrol",
    }));
  } catch (err) {
    console.warn("Error fetching patients from Supabase:", err);
    return null;
  }
}

/**
 * Saves a blood sugar log into Supabase 'blood_sugar_logs' table.
 */
export async function insertBloodSugarLogToSupabase(
  log: BloodSugarLog,
  patientEmail: string
): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;

  try {
    const { error } = await supabase.from("blood_sugar_logs").insert({
      id: log.id,
      patient_id: log.userId,
      patient_email: patientEmail.toLowerCase(),
      sugar_level: log.sugarLevel,
      measurement_context: log.measurementContext,
      notes: log.notes || null,
      recorded_at: log.recordedAt,
    });

    if (error) {
      console.warn("Error inserting log to Supabase:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("Error inserting log to Supabase:", err);
    return false;
  }
}
