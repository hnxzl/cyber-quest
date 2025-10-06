-- Seed data for CyberQuest
-- Run this AFTER running supabase-schema.sql

-- Insert sample tests (Pre-test and Post-test)
INSERT INTO tests (id, title, type, questions) VALUES 
(
  'pre-test-cybersecurity-research',
  'Pre-Test: Penelitian Keamanan Siber',
  'pre',
  '[
    {
      "section": "Identitas (Opsional)",
      "question": "Nama (opsional, bisa tulis inisial saja)",
      "type": "text",
      "required": false
    },
    {
      "section": "Identitas (Opsional)", 
      "question": "Kelas",
      "type": "radio",
      "options": ["X", "XI"],
      "required": false
    },
    {
      "section": "Identitas (Opsional)",
      "question": "Jenis kelamin (opsional)",
      "type": "radio", 
      "options": ["Laki-laki", "Perempuan", "Tidak ingin menjawab"],
      "required": false
    },
    {
      "section": "Kebiasaan Digital",
      "question": "Berapa lama rata-rata waktu kamu menggunakan internet/hp dalam sehari?",
      "type": "radio",
      "options": ["< 2 jam", "2–5 jam", "6–10 jam", "> 10 jam"],
      "correct": null
    },
    {
      "section": "Kebiasaan Digital",
      "question": "Media sosial apa yang paling sering kamu gunakan?",
      "type": "radio",
      "options": ["WhatsApp", "Instagram", "TikTok", "Facebook", "Lainnya"],
      "correct": null
    },
    {
      "section": "Kebiasaan Digital",
      "question": "Pernahkah kamu menerima pesan/link mencurigakan (misalnya undangan hadiah, minta OTP, dll)?",
      "type": "radio",
      "options": ["Ya", "Tidak"],
      "correct": null
    },
    {
      "section": "Pengetahuan Keamanan Digital",
      "question": "Apa yang dimaksud dengan phishing?",
      "type": "radio",
      "options": [
        "Virus komputer yang merusak data",
        "Link atau pesan palsu untuk mencuri data",
        "Aplikasi chatting",
        "Tidak tahu"
      ],
      "correct": 1
    },
    {
      "section": "Pengetahuan Keamanan Digital",
      "question": "Jika kamu mendapatkan pesan WhatsApp dari nomor asing yang meminta kode OTP, apa yang sebaiknya dilakukan?",
      "type": "radio",
      "options": [
        "Memberikan kode OTP agar cepat selesai",
        "Mengabaikan / tidak memberikan kode OTP",
        "Membalas dengan kata-kata kasar",
        "Tidak tahu"
      ],
      "correct": 1
    },
    {
      "section": "Pengetahuan Keamanan Digital",
      "question": "Password yang kuat biasanya memiliki ciri:",
      "type": "radio",
      "options": [
        "Menggunakan nama sendiri atau tanggal lahir",
        "Hanya angka berurutan (123456)",
        "Kombinasi huruf besar, huruf kecil, angka, dan simbol",
        "Tidak tahu"
      ],
      "correct": 2
    },
    {
      "section": "Pengetahuan Keamanan Digital",
      "question": "Jika sebuah aplikasi meminta akses penuh ke galeri, kontak, dan mikrofon padahal tidak relevan, apa tindakan yang benar?",
      "type": "radio",
      "options": [
        "Memberikan semua izin agar aplikasi jalan",
        "Menolak izin yang tidak relevan",
        "Tetap install walau curiga",
        "Tidak tahu"
      ],
      "correct": 1
    },
    {
      "section": "Pengetahuan Keamanan Digital",
      "question": "Apa yang dimaksud dengan social engineering?",
      "type": "radio",
      "options": [
        "Metode untuk mempercepat komputer",
        "Manipulasi psikologis untuk membuat orang memberikan data pribadinya",
        "Nama aplikasi pengeditan foto",
        "Tidak tahu"
      ],
      "correct": 1
    },
    {
      "section": "Pengetahuan Keamanan Digital",
      "question": "Ransomware adalah...",
      "type": "radio",
      "options": [
        "Game RPG terkenal",
        "Jenis malware yang mengunci file dan meminta tebusan",
        "Antivirus terbaru",
        "Tidak tahu"
      ],
      "correct": 1
    },
    {
      "section": "Sikap & Kesadaran",
      "question": "Apakah kamu merasa khawatir data pribadi (foto, akun medsos) bisa dipakai orang lain?",
      "type": "radio",
      "options": ["Ya", "Tidak"],
      "correct": null
    },
    {
      "section": "Sikap & Kesadaran",
      "question": "Jika kamu mendapatkan link undian berhadiah dari teman, apa yang akan kamu lakukan?",
      "type": "radio",
      "options": [
        "Klik langsung link tersebut",
        "Tanya dulu ke teman/guru sebelum klik",
        "Abaikan",
        "Tidak tahu"
      ],
      "correct": 1
    }
  ]'::jsonb
),
(
  'post-test-cybersecurity-1', 
  'Post-Test: Dasar Keamanan Siber',
  'post',
  '[
    {
      "question": "Setelah belajar tentang phishing, bagaimana cara terbaik menghindarinya?",
      "options": [
        "Klik semua link yang diterima",
        "Selalu verifikasi sumber email sebelum memberikan informasi pribadi",
        "Bagikan password ke semua orang",
        "Tidak pernah menggunakan email"
      ],
      "correct": 1
    },
    {
      "question": "Manakah praktik keamanan password yang benar?",
      "options": [
        "Gunakan password yang sama untuk semua akun",
        "Gunakan password yang berbeda dan kuat untuk setiap akun",
        "Tulis password di kertas dan tempel di monitor",
        "Gunakan tanggal lahir sebagai password"
      ],
      "correct": 1
    },
    {
      "question": "Jika Anda mendapat email yang mengaku dari bank meminta verifikasi akun, apa yang harus dilakukan?",
      "options": [
        "Langsung masukkan data yang diminta",
        "Hubungi bank secara langsung melalui nomor resmi untuk verifikasi",
        "Abaikan saja",
        "Forward email ke teman"
      ],
      "correct": 1
    },
    {
      "question": "Apa itu two-factor authentication (2FA)?",
      "options": [
        "Menggunakan dua password berbeda",
        "Lapisan keamanan tambahan selain password",
        "Dua antivirus dalam satu komputer",
        "Dua email untuk satu akun"
      ],
      "correct": 1
    },
    {
      "question": "Manakah URL yang lebih aman untuk login bank?",
      "options": [
        "http://bank-login.com",
        "https://www.bankresmi.co.id",
        "http://login-bank.net",
        "https://bank-secure.org"
      ],
      "correct": 1
    }
  ]'::jsonb
);

-- Insert sample quests with FSM definitions
INSERT INTO quests (id, title, topic, description, fsm, max_score) VALUES
(
  'quest-phishing-detection',
  'Quest: Deteksi Email Phishing',
  'phishing',
  'Pelajari cara mengidentifikasi dan menghindari serangan phishing melalui simulasi email.',
  '{
    "id": "quest-phishing-detection",
    "initial": "intro",
    "states": {
      "intro": {
        "on": {
          "START": "email_received"
        },
        "meta": {
          "title": "Misi Dimulai",
          "description": "Anda menerima email baru. Mari kita periksa apakah ini email yang aman atau phishing!",
          "image": "/images/email-inbox.png"
        }
      },
      "email_received": {
        "on": {
          "CHECK_SENDER": "check_sender",
          "CHECK_CONTENT": "check_content",
          "CLICK_LINK": "clicked_suspicious_link"
        },
        "meta": {
          "title": "Email Masuk",
          "description": "Email dari noreply@bank-security.net: Akun Anda akan diblokir! Klik link untuk verifikasi sekarang.",
          "options": [
            { "action": "CHECK_SENDER", "text": "Periksa alamat pengirim" },
            { "action": "CHECK_CONTENT", "text": "Baca isi email dengan teliti" },
            { "action": "CLICK_LINK", "text": "Langsung klik link verifikasi" }
          ]
        }
      },
      "check_sender": {
        "entry": ["award_points"],
        "on": {
          "SUSPICIOUS": "identified_phishing",
          "LOOKS_SAFE": "false_security"
        },
        "meta": {
          "title": "Analisis Pengirim",
          "description": "Alamat bank-security.net terlihat mencurigakan. Bank resmi biasanya menggunakan domain resmi mereka.",
          "points": 20,
          "options": [
            { "action": "SUSPICIOUS", "text": "Ya, ini mencurigakan!" },
            { "action": "LOOKS_SAFE", "text": "Sepertinya aman saja" }
          ]
        }
      },
      "check_content": {
        "entry": ["award_points"],
        "on": {
          "URGENT_TONE": "identified_phishing",
          "IGNORE_WARNING": "false_security"
        },
        "meta": {
          "title": "Analisis Konten",
          "description": "Email menggunakan bahasa mendesak dan mengancam. Ini adalah taktik umum phishing!",
          "points": 20,
          "options": [
            { "action": "URGENT_TONE", "text": "Nada mendesak memang mencurigakan" },
            { "action": "IGNORE_WARNING", "text": "Mungkin memang urgent dari bank" }
          ]
        }
      },
      "clicked_suspicious_link": {
        "entry": ["deduct_points"],
        "on": {
          "REALIZE_MISTAKE": "learn_lesson",
          "ENTER_DATA": "phishing_victim"
        },
        "meta": {
          "title": "Bahaya!",
          "description": "Anda mengklik link mencurigakan! Halaman meminta username dan password Anda.",
          "points": -30,
          "options": [
            { "action": "REALIZE_MISTAKE", "text": "Tunggu, ini mencurigakan!" },
            { "action": "ENTER_DATA", "text": "Masukkan data login" }
          ]
        }
      },
      "identified_phishing": {
        "entry": ["award_points"],
        "on": {
          "REPORT": "quest_complete_success",
          "DELETE": "quest_complete_success"
        },
        "meta": {
          "title": "Hebat! Phishing Terdeteksi",
          "description": "Anda berhasil mengidentifikasi email phishing! Sekarang laporkan atau hapus email tersebut.",
          "points": 30,
          "options": [
            { "action": "REPORT", "text": "Laporkan sebagai spam" },
            { "action": "DELETE", "text": "Hapus email" }
          ]
        }
      },
      "false_security": {
        "entry": ["deduct_points"],
        "on": {
          "SECOND_THOUGHT": "learn_lesson",
          "PROCEED": "phishing_victim"
        },
        "meta": {
          "title": "Hati-hati!",
          "description": "Anda hampir terjebak! Mari belajar mengenali tanda-tanda phishing.",
          "points": -10,
          "options": [
            { "action": "SECOND_THOUGHT", "text": "Mari belajar lebih teliti" },
            { "action": "PROCEED", "text": "Lanjutkan saja" }
          ]
        }
      },
      "learn_lesson": {
        "entry": ["award_points"],
        "on": {
          "CONTINUE": "quest_complete_partial"
        },
        "meta": {
          "title": "Pembelajaran",
          "description": "Bagus! Anda belajar dari kesalahan. Ingat: selalu verifikasi pengirim dan jangan terburu-buru!",
          "points": 15,
          "options": [
            { "action": "CONTINUE", "text": "Lanjutkan" }
          ]
        }
      },
      "phishing_victim": {
        "entry": ["deduct_points"],
        "on": {
          "RESTART": "intro"
        },
        "meta": {
          "title": "Terjebak Phishing!",
          "description": "Anda menjadi korban phishing! Data Anda bisa dicuri. Mari coba lagi dan belajar dari kesalahan.",
          "points": -50,
          "options": [
            { "action": "RESTART", "text": "Coba Lagi" }
          ]
        }
      },
      "quest_complete_success": {
        "type": "final",
        "entry": ["award_points"],
        "meta": {
          "title": "Quest Selesai - Sempurna!",
          "description": "Selamat! Anda berhasil mendeteksi dan menangani email phishing dengan benar!",
          "points": 20,
          "final_score": true
        }
      },
      "quest_complete_partial": {
        "type": "final", 
        "meta": {
          "title": "Quest Selesai - Baik!",
          "description": "Quest selesai! Anda belajar dari kesalahan dan memahami cara mendeteksi phishing.",
          "final_score": true
        }
      }
    }
  }'::jsonb,
  100
),
(
  'quest-password-security',
  'Quest: Keamanan Password',
  'password',
  'Pelajari cara membuat dan mengelola password yang kuat dan aman.',
  '{
    "id": "quest-password-security", 
    "initial": "intro",
    "states": {
      "intro": {
        "on": {
          "START": "password_creation"
        },
        "meta": {
          "title": "Misi Password Aman",
          "description": "Anda perlu membuat akun baru. Mari pelajari cara membuat password yang kuat!",
          "image": "/images/password-creation.png"
        }
      },
      "password_creation": {
        "on": {
          "WEAK_PASSWORD": "weak_choice",
          "STRONG_PASSWORD": "strong_choice",
          "MEDIUM_PASSWORD": "medium_choice"
        },
        "meta": {
          "title": "Pilih Password",
          "description": "Pilih password untuk akun online banking Anda:",
          "options": [
            { "action": "WEAK_PASSWORD", "text": "123456 (mudah diingat)" },
            { "action": "STRONG_PASSWORD", "text": "MyB@nk1ng2024!SecurE" },
            { "action": "MEDIUM_PASSWORD", "text": "password123" }
          ]
        }
      },
      "weak_choice": {
        "entry": ["deduct_points"],
        "on": {
          "LEARN_MORE": "password_education",
          "KEEP_WEAK": "security_breach"
        },
        "meta": {
          "title": "Password Terlalu Lemah!",
          "description": "Password 123456 sangat mudah ditebak! Hacker bisa membobol akun Anda dalam hitungan detik.",
          "points": -20,
          "options": [
            { "action": "LEARN_MORE", "text": "Pelajari password yang kuat" },
            { "action": "KEEP_WEAK", "text": "Tetap pakai password ini" }
          ]
        }
      },
      "medium_choice": {
        "entry": ["award_points"],
        "on": {
          "IMPROVE": "password_education", 
          "KEEP_MEDIUM": "moderate_security"
        },
        "meta": {
          "title": "Password Cukup Baik",
          "description": "Password password123 lumayan, tapi masih bisa diperbaiki dengan menambah simbol dan huruf besar.",
          "points": 10,
          "options": [
            { "action": "IMPROVE", "text": "Belajar membuat yang lebih kuat" },
            { "action": "KEEP_MEDIUM", "text": "Gunakan password ini" }
          ]
        }
      },
      "strong_choice": {
        "entry": ["award_points"],
        "on": {
          "ENABLE_2FA": "two_factor_auth",
          "SKIP_2FA": "quest_complete_good"
        },
        "meta": {
          "title": "Password Excellent!",
          "description": "Password MyB@nk1ng2024!SecurE sangat kuat! Kombinasi huruf besar-kecil, angka, dan simbol.",
          "points": 30,
          "options": [
            { "action": "ENABLE_2FA", "text": "Aktifkan 2FA untuk keamanan extra" },
            { "action": "SKIP_2FA", "text": "Password saja sudah cukup" }
          ]
        }
      },
      "password_education": {
        "entry": ["award_points"],
        "on": {
          "CREATE_STRONG": "strong_choice",
          "STILL_CONFUSED": "get_help"
        },
        "meta": {
          "title": "Tips Password Kuat",
          "description": "Password kuat: minimal 12 karakter, kombinasi huruf besar-kecil, angka, simbol. Contoh: MyP@ssw0rd2024!",
          "points": 15,
          "options": [
            { "action": "CREATE_STRONG", "text": "Buat password kuat sekarang" },
            { "action": "STILL_CONFUSED", "text": "Masih bingung, minta bantuan" }
          ]
        }
      },
      "two_factor_auth": {
        "entry": ["award_points"],
        "on": {
          "SMS": "quest_complete_perfect",
          "APP": "quest_complete_perfect",
          "EMAIL": "quest_complete_good"
        },
        "meta": {
          "title": "Pilih Metode 2FA",
          "description": "Two-Factor Authentication menambah lapisan keamanan. Pilih metode verifikasi:",
          "points": 25,
          "options": [
            { "action": "SMS", "text": "SMS ke nomor HP" },
            { "action": "APP", "text": "Aplikasi Authenticator" },
            { "action": "EMAIL", "text": "Email verifikasi" }
          ]
        }
      },
      "security_breach": {
        "entry": ["deduct_points"],
        "on": {
          "RESTART": "intro"
        },
        "meta": {
          "title": "Akun Diretas!",
          "description": "Hacker berhasil masuk ke akun Anda karena password yang lemah! Tabungan Anda hilang!",
          "points": -50,
          "options": [
            { "action": "RESTART", "text": "Mulai Ulang" }
          ]
        }
      },
      "moderate_security": {
        "on": {
          "CONTINUE": "quest_complete_partial"
        },
        "meta": {
          "title": "Keamanan Moderat",
          "description": "Akun Anda relatif aman, tapi masih ada risiko. Pertimbangkan password yang lebih kuat di masa depan.",
          "options": [
            { "action": "CONTINUE", "text": "Selesai" }
          ]
        }
      },
      "get_help": {
        "entry": ["award_points"],
        "on": {
          "TRY_AGAIN": "password_creation"
        },
        "meta": {
          "title": "Bantuan Password Manager",
          "description": "Gunakan password manager seperti LastPass atau Bitwarden untuk generate password kuat otomatis!",
          "points": 10,
          "options": [
            { "action": "TRY_AGAIN", "text": "Coba buat password lagi" }
          ]
        }
      },
      "quest_complete_perfect": {
        "type": "final",
        "entry": ["award_points"],
        "meta": {
          "title": "Quest Selesai - Perfect!",
          "description": "Luar biasa! Anda menggunakan password kuat + 2FA. Akun Anda sangat aman!",
          "points": 10,
          "final_score": true
        }
      },
      "quest_complete_good": {
        "type": "final",
        "meta": {
          "title": "Quest Selesai - Baik!",
          "description": "Bagus! Anda memahami pentingnya password kuat untuk keamanan akun.",
          "final_score": true
        }
      },
      "quest_complete_partial": {
        "type": "final",
        "meta": {
          "title": "Quest Selesai - Cukup",
          "description": "Quest selesai. Masih ada ruang untuk meningkatkan keamanan password Anda.",
          "final_score": true
        }
      }
    }
  }'::jsonb,
  100
);

-- Insert sample teacher user (you can modify this after setting up auth)
INSERT INTO users (id, email, role, name, class) VALUES 
(
  gen_random_uuid(),
  'teacher@cyberquest.com',
  'teacher', 
  'Teacher Demo',
  'All Classes'
);

-- Insert some sample anonymous students (for testing)
INSERT INTO users (role, name, class) VALUES 
('student', 'Student Demo 1', 'Class A'),
('student', 'Student Demo 2', 'Class A'),
('student', 'Student Demo 3', 'Class B');

-- Note: Sample responses and game sessions will be created when users interact with the system
