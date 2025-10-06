# Database Setup Instructions

## Step 1: Setup Supabase Database

1. **Login ke Supabase Dashboard**: https://app.supabase.com
2. **Pilih project**: cyber-quest atau buat project baru
3. **Buka SQL Editor** dari sidebar kiri

## Step 2: Run SQL Schema

Copy dan paste script berikut ke SQL Editor, lalu klik **RUN**:

```sql
-- CyberQuest Research Data Collection Schema for SMAN 1 Katapang
-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS submissions CASCADE;
DROP TABLE IF EXISTS teacher_accounts CASCADE;

-- Main submissions table for research data
CREATE TABLE submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  type TEXT NOT NULL CHECK (type IN ('pre', 'post')),

  -- Identity (optional for privacy)
  student_name TEXT, -- optional, encourage initials only
  class TEXT NOT NULL, -- X IPA 1, XI IPS 2, etc.
  gender TEXT CHECK (gender IN ('male', 'female', 'other', 'skip')),

  -- Digital habits
  internet_hours TEXT CHECK (internet_hours IN ('<2', '2-5', '6-10', '>10')),
  favorite_platform TEXT, -- WA/IG/TikTok/FB/Other
  received_suspicious BOOLEAN, -- pernah terima link mencurigakan

  -- Knowledge questions (MCQ)
  q_phishing TEXT,
  q_otp_request TEXT,
  q_password_strong TEXT,
  q_app_permissions TEXT,
  q_social_engineering TEXT,
  q_ransomware TEXT,

  -- Attitude questions
  q_attitude_worry BOOLEAN, -- khawatir data pribadi dipakai
  q_action_lottery TEXT,

  -- Meta
  teacher_notes TEXT,
  ip_hash TEXT, -- hashed IP for anti-spam
  consent BOOLEAN DEFAULT FALSE NOT NULL,

  -- Constraints
  CONSTRAINT valid_consent CHECK (consent = TRUE)
);

-- Create indexes for performance
CREATE INDEX idx_submissions_created_at ON submissions (created_at);
CREATE INDEX idx_submissions_type ON submissions (type);
CREATE INDEX idx_submissions_class ON submissions (class);
CREATE INDEX idx_submissions_ip_hash ON submissions (ip_hash);

-- Teacher accounts table
CREATE TABLE teacher_accounts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  hashed_password TEXT NOT NULL,
  name TEXT,
  school TEXT DEFAULT 'SMAN 1 Katapang',
  role TEXT DEFAULT 'teacher',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_accounts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for submissions
-- Allow anonymous INSERT (for form submissions)
CREATE POLICY "Allow anonymous submission insert" ON submissions
  FOR INSERT WITH CHECK (consent = TRUE);

-- Authenticated teachers can SELECT all submissions
CREATE POLICY "Teachers can view all submissions" ON submissions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM teacher_accounts
      WHERE email = auth.jwt() ->> 'email'
    )
  );

-- Teachers can add notes to submissions
CREATE POLICY "Teachers can update notes" ON submissions
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM teacher_accounts
      WHERE email = auth.jwt() ->> 'email'
    )
  );

-- Rate limiting function
CREATE OR REPLACE FUNCTION check_submission_rate_limit(user_ip_hash TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  recent_count INTEGER;
BEGIN
  -- Check submissions in last 5 minutes from same IP
  SELECT COUNT(*) INTO recent_count
  FROM submissions
  WHERE ip_hash = user_ip_hash
    AND created_at > NOW() - INTERVAL '5 minutes';

  -- Allow max 3 submissions per 5 minutes per IP
  RETURN recent_count < 3;
END;
$$ LANGUAGE plpgsql;
```

## Step 3: Test Database Connection

1. **Buka browser ke**: http://localhost:3001/my-dashboard
2. **Masukkan password**: myresearch2024
3. **Cek apakah data muncul** (akan kosong jika belum ada submissions)

## Step 4: Test Form Submission

1. **Buka**: http://localhost:3001/form/pre
2. **Isi form** dengan data test
3. **Klik "Setuju & Kirim"**
4. **Cek dashboard** untuk melihat apakah data masuk

## Troubleshooting

### Error "Failed to fetch stats"

- Pastikan Supabase credentials di `.env.local` sudah benar
- Pastikan tabel `submissions` sudah dibuat
- Cek browser developer console untuk error details

### Error saat submit form

- Pastikan Row Level Security policies sudah di-run
- Cek apakah ada validation error di browser console
- Pastikan semua required fields terisi

### Connection Error

- Cek NEXT_PUBLIC_SUPABASE_URL di `.env.local`
- Cek NEXT_PUBLIC_SUPABASE_ANON_KEY di `.env.local`
- Pastikan project Supabase masih aktif

## Environment Variables Required

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
IP_SALT=cyberquest-sman1katapang-research-2024
```
