-- ==============================================================================
-- DiaCare Diabetes Self-Management & Education Platform
-- Supabase PostgreSQL Database Schema
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABEL: patients (Menyimpan data akun & profil rekam medis pasien diabetes)
CREATE TABLE IF NOT EXISTS public.patients (
    id TEXT PRIMARY KEY,
    auth_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    gender TEXT CHECK (gender IN ('Laki-laki', 'Perempuan')) DEFAULT 'Laki-laki',
    age INTEGER DEFAULT 45,
    diabetes_type TEXT DEFAULT 'Diabetes Tipe 2',
    current_weight NUMERIC DEFAULT 70,
    height NUMERIC DEFAULT 165,
    target_sugar_fasting INTEGER DEFAULT 100,
    target_sugar_post_prandial INTEGER DEFAULT 140,
    medical_history TEXT DEFAULT 'Rekam medis baru dibuka.',
    emergency_contact TEXT DEFAULT '-',
    last_blood_sugar_level INTEGER DEFAULT 100,
    last_blood_sugar_context TEXT DEFAULT 'Puasa Pagi',
    last_check_date TIMESTAMPTZ DEFAULT NOW(),
    risk_status TEXT CHECK (risk_status IN ('Terkontrol', 'Waspada', 'Tinggi')) DEFAULT 'Terkontrol',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABEL: blood_sugar_logs (Menyimpan riwayat pemeriksaan gula darah mandiri)
CREATE TABLE IF NOT EXISTS public.blood_sugar_logs (
    id TEXT PRIMARY KEY,
    patient_id TEXT REFERENCES public.patients(id) ON DELETE CASCADE,
    patient_email TEXT NOT NULL,
    sugar_level INTEGER NOT NULL,
    measurement_context TEXT NOT NULL,
    notes TEXT,
    recorded_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABEL: doctors (Menyimpan akun tenaga medis / dokter konsultan)
CREATE TABLE IF NOT EXISTS public.doctors (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    str_number TEXT NOT NULL UNIQUE,
    hospital TEXT NOT NULL,
    specialization TEXT NOT NULL,
    schedule_days TEXT NOT NULL,
    phone TEXT NOT NULL,
    avatar_initials TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. SEED DATA DOKTER SPESIALIS (Kredensial Resmi Dokter)
INSERT INTO public.doctors (
    id, name, email, title, str_number, hospital, specialization, schedule_days, phone, avatar_initials
) VALUES 
(
    'doc-1',
    'dr. Ridwan Ramadhani, Sp.PD, KEMD',
    'dr.ridwan@diacare.med',
    'Dokter Spesialis Penyakit Dalam — Konsultan Endokrin, Metabolik & Diabetes',
    'STR-3171-8842-2024',
    'RSUPN Dr. Cipto Mangunkusumo Jakarta',
    'Endokrinologi, Diabetes Melitus & Sindrom Metabolik',
    'Senin, Rabu & Jumat (09:00 - 15:00 WIB)',
    '089668251739',
    'RR'
),
(
    'doc-2',
    'dr. Handoko Santoso, Sp.PD, KEMD',
    'dr.handoko@diacare.med',
    'Dokter Spesialis Penyakit Dalam - Konsultan Diabetes & Metabolik',
    'STR-3171-8892-2024',
    'RS Pusat Jantung dan Endokrin Nasional',
    'Penyakit Dalam & Regulasi Insulin Klinis',
    'Selasa & Kamis (10:00 - 16:00 WIB)',
    '081234567899',
    'HS'
)
ON CONFLICT (email) DO NOTHING;

-- 6. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blood_sugar_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;

-- 7. RLS POLICIES (Mengizinkan akses anonim / terautentikasi untuk aplikasi DiaCare)
-- Patients: publik dapat membaca dan mendaftarkan data pasien
DROP POLICY IF EXISTS "Allow select for all" ON public.patients;
CREATE POLICY "Allow select for all" ON public.patients FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow insert for all" ON public.patients;
CREATE POLICY "Allow insert for all" ON public.patients FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow update for all" ON public.patients;
CREATE POLICY "Allow update for all" ON public.patients FOR UPDATE USING (true);

-- Blood Sugar Logs: publik dapat membaca dan mencatat log gula darah
DROP POLICY IF EXISTS "Allow select logs for all" ON public.blood_sugar_logs;
CREATE POLICY "Allow select logs for all" ON public.blood_sugar_logs FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow insert logs for all" ON public.blood_sugar_logs;
CREATE POLICY "Allow insert logs for all" ON public.blood_sugar_logs FOR INSERT WITH CHECK (true);

-- Doctors: publik dapat membaca data profil dokter terdaftar
DROP POLICY IF EXISTS "Allow select doctors for all" ON public.doctors;
CREATE POLICY "Allow select doctors for all" ON public.doctors FOR SELECT USING (true);

-- 8. TRIGGER: Otomatis perbarui kolom updated_at pada tabel patients
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_patients_updated_at ON public.patients;
CREATE TRIGGER trigger_patients_updated_at
BEFORE UPDATE ON public.patients
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();
