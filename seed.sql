-- Seed data for CyberQuest

-- Users
INSERT INTO users (id, role, class, created_at) VALUES
  ('student1', 'student', 'A', NOW()),
  ('teacher1', 'teacher', 'A', NOW());

-- Tests
INSERT INTO tests (id, title, type, questions) VALUES
  ('pre1', 'Pre-Test', 'pre', '[{"q":"Apa itu phishing?","a":["Serangan email","Jenis virus","Metode enkripsi"],"correct":0}, {"q":"Tujuan utama phishing?","a":["Mencuri data","Memperbaiki sistem","Mengirim spam"],"correct":0}]'),
  ('post1', 'Post-Test', 'post', '[{"q":"Bagaimana menghindari phishing?","a":["Klik semua link","Verifikasi sumber","Bagikan password"],"correct":1}]');

-- Quests
INSERT INTO quests (id, title, topic, fsm) VALUES
  ('quest-phishing-1', 'Phishing Quest', 'phishing', '{"id":"quest-phishing-1","initial":"intro","states":{"intro":{"on":{"START":"choice"}},"choice":{"on":{"A":"wrong","B":"correct","C":"wrong"}},"correct":{"entry":["award_points"],"on":{"NEXT":"end"}},"wrong":{"entry":["deduct_points"],"on":{"NEXT":"end"}},"end":{"type":"final"}}}'),
  ('quest-password-1', 'Password Quest', 'password', '{"id":"quest-password-1","initial":"intro","states":{"intro":{"on":{"START":"choice"}},"choice":{"on":{"A":"correct","B":"wrong","C":"wrong"}},"correct":{"entry":["award_points"],"on":{"NEXT":"end"}},"wrong":{"entry":["deduct_points"],"on":{"NEXT":"end"}},"end":{"type":"final"}}}');

-- Responses and GameSessions: left empty for runtime
