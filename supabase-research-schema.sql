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
  name TEXT NOT NULL,
  school TEXT DEFAULT 'SMAN 1 Katapang',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_accounts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for submissions
-- Public (unauth) can only INSERT with consent
CREATE POLICY "Allow anonymous submission insert" ON submissions
  FOR INSERT 
  WITH CHECK (consent = TRUE AND created_at >= NOW() - INTERVAL '1 hour');

-- Authenticated teachers can SELECT all submissions
CREATE POLICY "Teachers can view all submissions" ON submissions
  FOR SELECT 
  USING (
    auth.role() = 'authenticated' AND 
    EXISTS (
      SELECT 1 FROM teacher_accounts 
      WHERE email = auth.jwt() ->> 'email'
    )
  );

-- Teachers can add notes to submissions
CREATE POLICY "Teachers can update notes" ON submissions
  FOR UPDATE 
  USING (
    auth.role() = 'authenticated' AND 
    EXISTS (
      SELECT 1 FROM teacher_accounts 
      WHERE email = auth.jwt() ->> 'email'
    )
  )
  WITH CHECK (teacher_notes IS NOT NULL);

-- RLS Policies for teacher_accounts
CREATE POLICY "Teachers can view own account" ON teacher_accounts
  FOR ALL 
  USING (auth.jwt() ->> 'email' = email);

-- Rate limiting function (prevent spam)
CREATE OR REPLACE FUNCTION check_submission_rate_limit(client_ip_hash TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  submission_count INTEGER;
BEGIN
  -- Check submissions in last 5 minutes from same IP
  SELECT COUNT(*) INTO submission_count
  FROM submissions 
  WHERE ip_hash = client_ip_hash 
    AND created_at >= NOW() - INTERVAL '5 minutes';
  
  -- Allow max 3 submissions per IP per 5 minutes
  RETURN submission_count < 3;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get submission statistics
CREATE OR REPLACE FUNCTION get_submission_stats(submission_type TEXT DEFAULT NULL)
RETURNS TABLE (
  total_submissions BIGINT,
  by_class JSONB,
  question_stats JSONB,
  latest_submissions JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) as total_submissions,
    
    -- Group by class
    jsonb_object_agg(
      COALESCE(s.class, 'Unknown'),
      class_count.count
    ) as by_class,
    
    -- Question statistics
    jsonb_build_object(
      'q_phishing', jsonb_build_object(
        'link_palsu', COUNT(*) FILTER (WHERE q_phishing = 'link_palsu'),
        'virus', COUNT(*) FILTER (WHERE q_phishing = 'virus'),
        'aplikasi', COUNT(*) FILTER (WHERE q_phishing = 'aplikasi'),
        'tidak_tahu', COUNT(*) FILTER (WHERE q_phishing = 'tidak_tahu')
      ),
      'q_password_strong', jsonb_build_object(
        'kombinasi', COUNT(*) FILTER (WHERE q_password_strong = 'kombinasi'),
        'nama_tgl', COUNT(*) FILTER (WHERE q_password_strong = 'nama_tgl'),
        'angka_berurutan', COUNT(*) FILTER (WHERE q_password_strong = 'angka_berurutan'),
        'tidak_tahu', COUNT(*) FILTER (WHERE q_password_strong = 'tidak_tahu')
      )
    ) as question_stats,
    
    -- Latest 10 submissions
    (
      SELECT jsonb_agg(
        jsonb_build_object(
          'id', id,
          'created_at', created_at,
          'class', class,
          'student_name', COALESCE(student_name, 'Anonymous'),
          'type', type
        )
        ORDER BY created_at DESC
      )
      FROM submissions s2 
      WHERE (submission_type IS NULL OR s2.type = submission_type)
      ORDER BY created_at DESC 
      LIMIT 10
    ) as latest_submissions
    
  FROM submissions s
  LEFT JOIN (
    SELECT class, COUNT(*) as count
    FROM submissions 
    WHERE (submission_type IS NULL OR type = submission_type)
    GROUP BY class
  ) class_count ON TRUE
  WHERE (submission_type IS NULL OR s.type = submission_type);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert sample teacher account
INSERT INTO teacher_accounts (email, name) VALUES 
('guru@sman1katapang.sch.id', 'Guru SMAN 1 Katapang');

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT INSERT ON submissions TO anon;
GRANT EXECUTE ON FUNCTION check_submission_rate_limit(TEXT) TO anon;
GRANT EXECUTE ON FUNCTION get_submission_stats(TEXT) TO authenticated;
