-- Sample data for testing CyberQuest Research App
-- Run this after supabase-research-schema.sql

-- Sample submissions for testing (pre-test data)
INSERT INTO submissions (
  type, student_name, class, gender, internet_hours, favorite_platform, 
  received_suspicious, q_phishing, q_otp_request, q_password_strong, 
  q_app_permissions, q_social_engineering, q_ransomware, 
  q_attitude_worry, q_action_lottery, consent, ip_hash
) VALUES 
-- Pre-test samples
('pre', 'A.R', 'X IPA 1', 'male', '6-10', 'Instagram', true, 'link_palsu', 'jangan_beri', 'kombinasi', 'tolak_izin', 'manipulasi_psikologis', 'jenis_malware', true, 'tanya_dulu', true, 'hash1'),
('pre', 'S.D', 'X IPA 1', 'female', '2-5', 'WhatsApp', false, 'virus', 'beri_otp', 'nama_tgl', 'beri_semua', 'metode_komputer', 'game', false, 'klik_langsung', true, 'hash2'),
('pre', 'M.F', 'XI IPS 2', 'male', '>10', 'TikTok', true, 'tidak_tahu', 'tidak_tahu', 'tidak_tahu', 'tidak_tahu', 'tidak_tahu', 'tidak_tahu', true, 'tidak_tahu', true, 'hash3'),
('pre', 'L.K', 'X IPA 2', 'female', '2-5', 'Instagram', true, 'link_palsu', 'jangan_beri', 'kombinasi', 'tolak_izin', 'manipulasi_psikologis', 'jenis_malware', true, 'tanya_dulu', true, 'hash4'),
('pre', 'Anonymous', 'XI IPA 1', 'skip', '<2', 'Facebook', false, 'aplikasi', 'balas_kasar', 'angka_berurutan', 'tetap_install', 'aplikasi_foto', 'antivirus', false, 'abaikan', true, 'hash5'),

-- Post-test samples (showing improvement)
('post', 'A.R', 'X IPA 1', 'male', '6-10', 'Instagram', true, 'link_palsu', 'jangan_beri', 'kombinasi', 'tolak_izin', 'manipulasi_psikologis', 'jenis_malware', true, 'tanya_dulu', true, 'hash1'),
('post', 'S.D', 'X IPA 1', 'female', '2-5', 'WhatsApp', false, 'link_palsu', 'jangan_beri', 'kombinasi', 'tolak_izin', 'manipulasi_psikologis', 'jenis_malware', true, 'tanya_dulu', true, 'hash2'),
('post', 'M.F', 'XI IPS 2', 'male', '>10', 'TikTok', true, 'link_palsu', 'jangan_beri', 'kombinasi', 'tolak_izin', 'manipulasi_psikologis', 'jenis_malware', true, 'tanya_dulu', true, 'hash3');

-- Add some teacher notes
UPDATE submissions SET teacher_notes = 'Student showed significant improvement in post-test' 
WHERE type = 'post' AND student_name = 'S.D';

UPDATE submissions SET teacher_notes = 'Initially low awareness, but engaged well with learning material' 
WHERE type = 'pre' AND student_name = 'M.F';
