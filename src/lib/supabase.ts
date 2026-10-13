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

// Global Supabase client instance
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
 * Helper to transform a row from public.patients into a typed UserProfile.
 */
function mapPatientRowToProfile(row: any): UserProfile {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone || undefined,
    gender: row.gender || "Laki-laki",
    age: row.age || 45,
    diabetesType: row.diabetes_type || "Pencegahan Primer",
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
  };
}

/**
 * Inserts or updates a patient record in the Supabase 'patients' table.
 * Also attempts Supabase Auth registration.
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
    let authUserId: string | null = null;
    let authNote = "";

    // 1. Supabase Auth registration
    if (password) {
      try {
        const { data: authData, error: authErr } = await supabase.auth.signUp({
          email: patient.email.toLowerCase(),
          password: password,
          options: {
            data: {
              name: patient.name,
              diabetesType: patient.diabetesType,
              age: patient.age,
            },
          },
        });

        if (authErr) {
          console.warn("Supabase Auth signUp note:", authErr.message);
          if (
            authErr.message.toLowerCase().includes("email signups are disabled") ||
            (authErr as any).code === "email_provider_disabled"
          ) {
            authNote =
              "Provider Email di Supabase sedang NONAKTIF. Aktifkan 'Enable Email provider' di Dashboard Supabase.";
          } else {
            authNote = authErr.message;
          }
        } else if (authData?.user) {
          authUserId = authData.user.id;
          if (!authData.session) {
            authNote = "Email konfirmasi di Supabase aktif. Matikan 'Confirm email' di Dashboard Supabase.";
          }
        }
      } catch (authEx: any) {
        console.warn("Supabase Auth background sign up exception:", authEx);
        authNote = authEx?.message || "";
      }
    }

    // 2. Upsert into public.patients table immediately
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

    if (authUserId) {
      patientRow.auth_user_id = authUserId;
    }

    const { data, error } = await supabase
      .from("patients")
      .upsert(patientRow, { onConflict: "email" })
      .select();

    if (error) {
      console.error("Supabase patient upsert error:", error);
      return { success: false, message: error.message };
    }

    return {
      success: true,
      message: authNote
        ? `Data pasien tersimpan di database. Catatan: ${authNote}`
        : "Data pasien berhasil terdaftar dan tersimpan di database cloud Supabase!",
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
 * Signs in a patient using Supabase Auth and hydrates their UserProfile from public.patients.
 * Includes Auto-Heal: if user registered in public.patients while Email Provider was off,
 * it will automatically register them into auth.users upon first successful credentials verification.
 */
export async function loginPatientWithSupabase(
  email: string,
  password: string
): Promise<{ success: boolean; message: string; profile?: UserProfile }> {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      message: "Supabase belum terkonfigurasi.",
    };
  }

  const cleanEmail = email.trim().toLowerCase();

  try {
    // 1. Attempt Supabase Auth signInWithPassword
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password: password,
    });

    if (authError) {
      console.warn("Supabase signInWithPassword note:", authError.message);

      // Error case 1: Email provider is completely disabled in Supabase
      if (
        authError.message.toLowerCase().includes("email logins are disabled") ||
        (authError as any).code === "email_provider_disabled"
      ) {
        return {
          success: false,
          message:
            "Provider Email di Supabase Anda sedang NONAKTIF (Email logins are disabled). Buka Dashboard Supabase > Authentication > Providers > Email, lalu AKTIFKAN sakelar paling atas 'Enable Email provider'.",
        };
      }

      // Error case 2: Confirm email is still required
      if (authError.message.toLowerCase().includes("email not confirmed")) {
        return {
          success: false,
          message:
            "Akun terdaftar, namun email belum dikonfirmasi di Supabase. Mohon matikan sakelar 'Confirm email' di Dashboard Supabase agar bisa langsung login.",
        };
      }

      // Error case 3: Invalid credentials -> Check Auto-heal for accounts registered into public.patients
      if (authError.message.includes("Invalid login credentials")) {
        const { data: patientRow } = await supabase
          .from("patients")
          .select("*")
          .eq("email", cleanEmail)
          .maybeSingle();

        // If patient exists in public.patients without auth_user_id (created when Email was disabled)
        if (patientRow && !patientRow.auth_user_id) {
          const { data: signUpData, error: signUpErr } = await supabase.auth.signUp({
            email: cleanEmail,
            password: password,
            options: {
              data: {
                name: patientRow.name,
                diabetesType: patientRow.diabetes_type,
                age: patientRow.age,
              },
            },
          });

          if (!signUpErr && signUpData?.user) {
            // Update auth_user_id in patients table
            await supabase
              .from("patients")
              .update({ auth_user_id: signUpData.user.id })
              .eq("email", cleanEmail);

            const profile = mapPatientRowToProfile(patientRow);
            return {
              success: true,
              message: `Selamat datang kembali, ${profile.name}! Akun berhasil disinkronkan ke Supabase Auth.`,
              profile,
            };
          }
        }
      }

      return {
        success: false,
        message: authError.message.includes("Invalid login credentials")
          ? "Email atau kata sandi tidak cocok. Pastikan email dan sandi Anda sudah benar."
          : authError.message,
      };
    }

    if (!authData?.user) {
      return {
        success: false,
        message: "Gagal memverifikasi akun pengguna di Supabase.",
      };
    }

    // 2. Fetch patient record from public.patients table
    const { data: patientRow, error: patientError } = await supabase
      .from("patients")
      .select("*")
      .eq("email", cleanEmail)
      .maybeSingle();

    if (patientError) {
      console.warn("Error fetching patient profile from Supabase:", patientError.message);
    }

    let profile: UserProfile;

    if (patientRow) {
      profile = mapPatientRowToProfile(patientRow);
    } else {
      profile = {
        id: `patient-${Date.now()}`,
        name: authData.user.user_metadata?.name || cleanEmail.split("@")[0],
        email: cleanEmail,
        diabetesType: "Pencegahan Primer",
        gender: "Laki-laki",
        age: 35,
        currentWeight: 65,
        height: 165,
        targetSugarFasting: 95,
        targetSugarPostPrandial: 130,
        medicalHistory: "Pengguna DIASERA terdaftar melalui Supabase Cloud.",
        emergencyContact: "-",
        riskStatus: "Terkontrol",
      };
      await syncPatientToSupabase(profile);
    }

    return {
      success: true,
      message: `Selamat datang kembali, ${profile.name}! Sesi berhasil disinkronkan dari Cloud Supabase.`,
      profile,
    };
  } catch (err: any) {
    console.error("Exception in loginPatientWithSupabase:", err);
    return {
      success: false,
      message: err?.message || "Terjadi kendala saat menghubungkan ke cloud Supabase.",
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

    return data.map((row: any) => mapPatientRowToProfile(row));
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