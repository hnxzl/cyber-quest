import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const PresentasiPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedThreat, setSelectedThreat] = useState<string | null>(null);
  const [selectedTip, setSelectedTip] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [passwordTest, setPasswordTest] = useState("");
  const [passwordScore, setPasswordScore] = useState(0);
  const [passwordFeedback, setPasswordFeedback] = useState("");
  const router = useRouter();

  // Fungsi evaluasi kekuatan password
  const evaluatePassword = (password: string) => {
    let score = 0;
    let feedback = [];

    if (password.length >= 8) score += 20;
    else feedback.push("Minimal 8 karakter");

    if (/[A-Z]/.test(password)) score += 20;
    else feedback.push("Tambahkan huruf besar");

    if (/[a-z]/.test(password)) score += 20;
    else feedback.push("Tambahkan huruf kecil");

    if (/[0-9]/.test(password)) score += 20;
    else feedback.push("Tambahkan angka");

    if (/[^A-Za-z0-9]/.test(password)) score += 20;
    else feedback.push("Tambahkan simbol (!@#$%)");

    setPasswordScore(score);

    if (score === 100) {
      setPasswordFeedback("💪 Password KUAT! Siap jadi cyber hero!");
    } else if (score >= 80) {
      setPasswordFeedback("👍 Hampir sempurna! " + feedback.join(", "));
    } else if (score >= 60) {
      setPasswordFeedback(
        "⚠️ Cukup baik, tapi bisa lebih kuat: " + feedback.join(", ")
      );
    } else {
      setPasswordFeedback("❌ Masih lemah! " + feedback.join(", "));
    }
  };

  // Data detail untuk ancaman digital
  const threatDetails = {
    phishing: {
      examples: [
        "Email palsu dari 'bank' yang meminta update data rekening",
        "WhatsApp dari nomor asing mengaku customer service e-commerce",
        "Website palsu yang meniru tampilan situs resmi",
        "SMS mengaku dari operator seluler meminta konfirmasi data",
      ],
      prevention: [
        "Selalu cek URL website dengan teliti sebelum login",
        "Jangan klik link dari pesan yang mencurigakan",
        "Verifikasi langsung ke customer service resmi jika ragu",
        "Aktifkan autentikasi dua faktor (2FA) di akun penting",
      ],
    },
    social_engineering: {
      examples: [
        "Telepon mengaku IT support meminta password untuk 'maintenance'",
        "Orang asing di kantor bertanya password WiFi sambil pura-pura bingung",
        "Chat mengaku teman meminjam uang dalam keadaan darurat",
        "Email mengaku atasan meminta transfer dana untuk keperluan mendesak",
      ],
      prevention: [
        "Selalu verifikasi identitas orang yang meminta informasi sensitif",
        "Jangan memberikan password atau PIN melalui telepon/chat",
        "Gunakan protokol verifikasi berlapis untuk hal-hal penting",
        "Edukasi diri tentang teknik-teknik social engineering",
      ],
    },
    ransomware: {
      examples: [
        "File dokumen berubah ekstensi menjadi .encrypted dan tidak bisa dibuka",
        "Layar komputer menampilkan pesan meminta bitcoin untuk unlock file",
        "Email dengan attachment yang mengandung ransomware",
        "Website yang ter-compromise mendownload ransomware otomatis",
      ],
      prevention: [
        "Backup data secara rutin ke storage terpisah (offline)",
        "Update sistem operasi dan software secara berkala",
        "Gunakan antivirus yang terpercaya dengan real-time protection",
        "Hindari membuka attachment email dari pengirim tidak dikenal",
      ],
    },
    password: {
      examples: [
        "Password seperti '123456', 'password', 'qwerty'",
        "Menggunakan nama, tanggal lahir, atau nama hewan peliharaan",
        "Password yang sama untuk semua akun",
        "Password tanpa kombinasi huruf besar-kecil-angka-simbol",
      ],
      prevention: [
        "Buat password minimal 12 karakter dengan kombinasi kompleks",
        "Gunakan password manager untuk menyimpan password unik",
        "Aktifkan autentikasi dua faktor (2FA) di semua akun penting",
        "Ganti password secara berkala, terutama setelah insiden keamanan",
      ],
    },
  };

  // Data detail untuk tips praktis
  const tipDetails = {
    strong_passwords: {
      steps: [
        "Gunakan minimal 12 karakter (semakin panjang semakin baik)",
        "Kombinasikan huruf besar, huruf kecil, angka, dan simbol",
        "Hindari kata yang ada di kamus atau informasi pribadi",
        "Buat password unik untuk setiap akun penting",
      ],
      tools: [
        "Password Manager: Bitwarden, LastPass, 1Password",
        "2FA Apps: Google Authenticator, Authy",
        "Checker keamanan: HaveIBeenPwned untuk cek kebocoran data",
      ],
    },
    safe_browsing: {
      steps: [
        "Selalu periksa URL sebelum memasukkan data sensitif",
        "Cari ikon gembok (🔒) di address bar untuk situs HTTPS",
        "Jangan download software dari situs yang tidak terpercaya",
        "Log out dari akun penting setelah selesai digunakan",
      ],
      tools: [
        "Extensions: uBlock Origin, HTTPS Everywhere",
        "DNS: Cloudflare (1.1.1.1) untuk filter malware",
        "VPN terpercaya jika menggunakan WiFi public",
      ],
    },
    social_media: {
      steps: [
        "Set profile ke private, jangan public untuk semua orang",
        "Review dan hapus informasi pribadi yang tidak perlu",
        "Periksa app permissions yang terhubung ke akun media sosial",
        "Jangan posting lokasi real-time atau info pribadi sensitif",
      ],
      tools: [
        "Privacy settings di setiap platform (Instagram, Facebook, TikTok)",
        "2FA untuk semua akun media sosial",
        "Location services: matikan sharing lokasi otomatis",
      ],
    },
    device_security: {
      steps: [
        "Aktifkan screen lock (PIN, pattern, biometrics) di semua device",
        "Install aplikasi hanya dari official store (Play Store/App Store)",
        "Update sistem operasi dan aplikasi secara rutin",
        "Backup data penting secara berkala",
      ],
      tools: [
        "Antivirus mobile: Malwarebytes, Bitdefender (jika perlu)",
        "Backup: Google Drive, iCloud, atau external storage",
        "Find My Device: Google Find My Device, Apple Find My",
      ],
    },
  };

  const slides = [
    {
      id: 1,
      title: "Yuk Jaga Keamanan Digital! 🛡️",
      content: (
        <div className="text-center space-y-8">
          <div className="text-8xl mb-6">🔐</div>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-6">
            Yuk Jaga Keamanan Digital!
          </h1>
          <h2 className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Implementasi FSM dalam Game Edukatif Android untuk Meningkatkan
            Kesadaran Keamanan Digital Siswa SMA
          </h2>
          <div className="bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 rounded-2xl p-6 max-w-2xl mx-auto border-4 border-yellow-400" style={{
            boxShadow: '0 8px 16px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.3)'
          }}>
            <p className="text-orange-800 font-semibold text-lg">
              📚 Ezra — Alumni SMAN 1 Katapang
            </p>
            <p className="text-orange-700">💻 Mahasiswa Informatika</p>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: "Kenapa Penting?",
      content: (
        <div className="text-center space-y-8">
          <div className="text-8xl mb-6">📱</div>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-8">
            Kenapa Penting? 🤔
          </h1>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-red-50 rounded-2xl p-8 border border-red-200">
              <div className="text-4xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-red-700 mb-4">
                Fakta Mengkhawatirkan
              </h3>
              <p className="text-red-600 text-lg">
                Remaja = pengguna internet paling aktif, tapi paling rentan
                terhadap ancaman siber
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-100 via-cyan-100 to-teal-100 rounded-2xl p-8 border-4 border-blue-400" style={{
              boxShadow: '0 8px 16px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.3)'
            }}>
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-blue-700 mb-4">
                Data Indonesia
              </h3>
              <ul className="text-blue-600 text-left space-y-2">
                <li>• 95% remaja aktif di medsos</li>
                <li>• 1 dari 5 pernah kena phishing</li>
                <li>• 70% pakai password lemah</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-100 via-amber-100 to-orange-100 rounded-2xl p-6 max-w-3xl mx-auto border-4 border-yellow-400" style={{
            boxShadow: '0 8px 16px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.3)'
          }}>
            <p className="text-orange-800 text-lg font-semibold">
              🎯 Makanya kita perlu belajar cara jaga diri di dunia digital!
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: "Agenda Hari Ini",
      content: (
        <div className="text-center space-y-8">
          <div className="text-8xl mb-6">📋</div>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-8">
            Agenda Hari Ini 📝
          </h1>

          <div className="max-w-3xl mx-auto">
            <div className="grid gap-6">
              <div className="bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 rounded-xl p-6 border-4 border-green-400 flex items-center" style={{
                boxShadow: '0 6px 12px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.3)'
              }}>
                <div className="text-3xl mr-4">1️⃣</div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-blue-700">
                    Contoh Ancaman Digital
                  </h3>
                  <p className="text-blue-600">
                    Phishing, Social Engineering, Ransomware, Password
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-100 via-teal-100 to-cyan-100 rounded-xl p-6 border-4 border-green-400 flex items-center" style={{
                boxShadow: '0 6px 12px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.3)'
              }}>
                <div className="text-3xl mr-4">2️⃣</div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-green-700">
                    Demo Password
                  </h3>
                  <p className="text-green-600">
                    Simulasi seberapa cepat password bisa ditebak
                  </p>
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200 flex items-center">
                <div className="text-3xl mr-4">3️⃣</div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-purple-700">
                    Tips Praktis
                  </h3>
                  <p className="text-purple-600">
                    Cara mudah jaga keamanan digital
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-100 via-red-100 to-pink-100 rounded-xl p-6 border-4 border-orange-400 flex items-center" style={{
                boxShadow: '0 6px 12px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.3)'
              }}>
                <div className="text-3xl mr-4">4️⃣</div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-red-700">
                    Pre-Test
                  </h3>
                  <p className="text-orange-600">
                    Isi kuesioner singkat (5-7 menit)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: "4 Ancaman Digital Utama",
      content: (
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
            4 Ancaman Digital Utama ⚔️
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            💡 <strong>Klik pada setiap card</strong> untuk melihat contoh dan
            cara pencegahan!
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {/* Phishing Card */}
            <div
              onClick={() =>
                setSelectedThreat(
                  selectedThreat === "phishing" ? null : "phishing"
                )
              }
              className={`bg-red-50 rounded-2xl p-6 border-2 border-red-200 hover:shadow-lg transition-all cursor-pointer ${
                selectedThreat === "phishing"
                  ? "ring-2 ring-red-400 border-red-400"
                  : ""
              }`}
            >
              <div className="text-5xl mb-3">🎣</div>
              <h3 className="text-xl font-bold text-red-700 mb-3">Phishing</h3>
              <p className="text-red-600 text-sm mb-3">
                Penipuan dengan link/pesan palsu untuk mencuri data pribadi
              </p>

              {selectedThreat === "phishing" && (
                <div className="mt-4 space-y-3 text-left">
                  <div>
                    <h4 className="font-semibold text-red-700 mb-2">
                      ⚠️ Contoh Serangan:
                    </h4>
                    <ul className="text-xs text-red-600 space-y-1">
                      {threatDetails.phishing.examples.map((example, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="mr-1">•</span>
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 mb-2">
                      🛡️ Cara Pencegahan:
                    </h4>
                    <ul className="text-xs text-red-600 space-y-1">
                      {threatDetails.phishing.prevention.map(
                        (prevention, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-green-500 mr-1">✓</span>
                            <span>{prevention}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              )}

              <div className="mt-3 text-right">
                <span className="text-xs text-red-500">
                  {selectedThreat === "phishing"
                    ? "▲ Tutup detail"
                    : "▼ Lihat detail"}
                </span>
              </div>
            </div>

            {/* Social Engineering Card */}
            <div
              onClick={() =>
                setSelectedThreat(
                  selectedThreat === "social_engineering"
                    ? null
                    : "social_engineering"
                )
              }
              className={`bg-orange-50 rounded-2xl p-6 border-2 border-orange-200 hover:shadow-lg transition-all cursor-pointer ${
                selectedThreat === "social_engineering"
                  ? "ring-2 ring-orange-400 border-orange-400"
                  : ""
              }`}
            >
              <div className="text-5xl mb-3">🕵️</div>
              <h3 className="text-xl font-bold text-orange-700 mb-3">
                Social Engineering
              </h3>
              <p className="text-orange-600 text-sm mb-3">
                Manipulasi psikologis untuk mendapatkan informasi rahasia
              </p>

              {selectedThreat === "social_engineering" && (
                <div className="mt-4 space-y-3 text-left">
                  <div>
                    <h4 className="font-semibold text-orange-700 mb-2">
                      ⚠️ Contoh Serangan:
                    </h4>
                    <ul className="text-xs text-orange-600 space-y-1">
                      {threatDetails.social_engineering.examples.map(
                        (example, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="mr-1">•</span>
                            <span>{example}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-700 mb-2">
                      🛡️ Cara Pencegahan:
                    </h4>
                    <ul className="text-xs text-orange-600 space-y-1">
                      {threatDetails.social_engineering.prevention.map(
                        (prevention, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-green-500 mr-1">✓</span>
                            <span>{prevention}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              )}

              <div className="mt-3 text-right">
                <span className="text-xs text-orange-500">
                  {selectedThreat === "social_engineering"
                    ? "▲ Tutup detail"
                    : "▼ Lihat detail"}
                </span>
              </div>
            </div>

            {/* Ransomware Card */}
            <div
              onClick={() =>
                setSelectedThreat(
                  selectedThreat === "ransomware" ? null : "ransomware"
                )
              }
              className={`bg-purple-50 rounded-2xl p-6 border-2 border-purple-200 hover:shadow-lg transition-all cursor-pointer ${
                selectedThreat === "ransomware"
                  ? "ring-2 ring-purple-400 border-purple-400"
                  : ""
              }`}
            >
              <div className="text-5xl mb-3">🔒</div>
              <h3 className="text-xl font-bold text-purple-700 mb-3">
                Ransomware
              </h3>
              <p className="text-purple-600 text-sm mb-3">
                Malware yang mengunci file dan meminta tebusan
              </p>

              {selectedThreat === "ransomware" && (
                <div className="mt-4 space-y-3 text-left">
                  <div>
                    <h4 className="font-semibold text-purple-700 mb-2">
                      ⚠️ Contoh Serangan:
                    </h4>
                    <ul className="text-xs text-purple-600 space-y-1">
                      {threatDetails.ransomware.examples.map((example, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="mr-1">•</span>
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-700 mb-2">
                      🛡️ Cara Pencegahan:
                    </h4>
                    <ul className="text-xs text-purple-600 space-y-1">
                      {threatDetails.ransomware.prevention.map(
                        (prevention, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-green-500 mr-1">✓</span>
                            <span>{prevention}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              )}

              <div className="mt-3 text-right">
                <span className="text-xs text-purple-500">
                  {selectedThreat === "ransomware"
                    ? "▲ Tutup detail"
                    : "▼ Lihat detail"}
                </span>
              </div>
            </div>

            {/* Password Lemah Card */}
            <div
              onClick={() =>
                setSelectedThreat(
                  selectedThreat === "password" ? null : "password"
                )
              }
              className={`bg-yellow-50 rounded-2xl p-6 border-2 border-yellow-200 hover:shadow-lg transition-all cursor-pointer ${
                selectedThreat === "password"
                  ? "ring-2 ring-yellow-400 border-yellow-400"
                  : ""
              }`}
            >
              <div className="text-5xl mb-3">🔑</div>
              <h3 className="text-xl font-bold text-yellow-700 mb-3">
                Password Lemah
              </h3>
              <p className="text-yellow-600 text-sm mb-3">
                Password mudah ditebak seperti tanggal lahir atau 123456
              </p>

              {selectedThreat === "password" && (
                <div className="mt-4 space-y-3 text-left">
                  <div>
                    <h4 className="font-semibold text-yellow-700 mb-2">
                      ⚠️ Contoh Password Lemah:
                    </h4>
                    <ul className="text-xs text-yellow-600 space-y-1">
                      {threatDetails.password.examples.map((example, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="mr-1">•</span>
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-700 mb-2">
                      🛡️ Cara Membuat Password Kuat:
                    </h4>
                    <ul className="text-xs text-yellow-600 space-y-1">
                      {threatDetails.password.prevention.map(
                        (prevention, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-green-500 mr-1">✓</span>
                            <span>{prevention}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              )}

              <div className="mt-3 text-right">
                <span className="text-xs text-yellow-500">
                  {selectedThreat === "password"
                    ? "▲ Tutup detail"
                    : "▼ Lihat detail"}
                </span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 5,
      title: "Contoh Phishing",
      content: (
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-8">
            Contoh Phishing 🎣
          </h1>

          <div className="max-w-4xl mx-auto">
            <div className="bg-red-50 rounded-2xl p-8 border border-red-200 mb-8">
              <h3 className="text-2xl font-bold text-red-700 mb-6">
                ⚠️ Pesan Berbahaya
              </h3>

              {/* Mock WhatsApp Message */}
              <div
                className="bg-gradient-to-br from-yellow-100 via-green-100 to-blue-100 rounded-xl p-6 shadow-lg max-w-md mx-auto border-4 border-yellow-400"
                style={{
                  boxShadow:
                    "0 8px 16px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.3)",
                }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                    ?
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold">+62 812-xxxx-xxxx</p>
                    <p className="text-xs text-gray-500">Hari ini 14:23</p>
                  </div>
                </div>

                <div
                  className="bg-gradient-to-br from-yellow-200 via-orange-200 to-red-200 rounded-lg p-4 mb-3 border-4 border-yellow-400"
                  style={{
                    boxShadow:
                      "0 6px 12px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.3)",
                  }}
                >
                  <p className="text-sm">
                    🎉 SELAMAT! Anda terpilih sebagai pemenang GRAND PRIZE
                    senilai <strong>Rp 10.000.000</strong>!
                  </p>
                  <p className="text-sm mt-2">
                    Klik link ini untuk claim hadiah:
                    <span className="text-blue-500 underline ml-1">
                      bit.ly/hadiah-10jt
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    *Berlaku hingga 23:59 WIB
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-100 rounded-xl p-6 border border-red-300">
                <h4 className="text-lg font-bold text-red-700 mb-3">
                  🚩 Red Flags:
                </h4>
                <ul className="text-red-600 text-left space-y-2">
                  <li>• Nomor tidak dikenal</li>
                  <li>• Hadiah tanpa ikut lomba</li>
                  <li>• Link mencurigakan</li>
                  <li>• Batas waktu ketat</li>
                </ul>
              </div>

              <div className="bg-green-100 rounded-xl p-6 border border-green-300">
                <h4 className="text-lg font-bold text-green-700 mb-3">
                  ✅ Yang Benar:
                </h4>
                <ul className="text-green-600 text-left space-y-2">
                  <li>• Abaikan pesan</li>
                  <li>• Jangan klik link</li>
                  <li>• Block nomor</li>
                  <li>• Laporkan jika perlu</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 6,
      title: "Social Engineering",
      content: (
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-8">
            Social Engineering 🕵️
          </h1>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-orange-100 via-yellow-100 to-red-100 rounded-2xl p-8 border-4 border-orange-400 mb-8" style={{
              boxShadow: '0 8px 16px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.3)'
            }}>
              <h3 className="text-2xl font-bold text-orange-700 mb-6">
                📞 Roleplay Contoh
              </h3>

              {/* Mock Phone Call */}
              <div
                className="bg-gradient-to-br from-green-100 via-yellow-100 to-orange-100 rounded-xl p-6 shadow-lg border-4 border-green-400"
                style={{
                  boxShadow:
                    "0 8px 16px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.3)",
                }}
              >
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">📱</div>
                  <div>
                    <p className="font-bold text-lg">Panggilan Masuk...</p>
                    <p className="text-gray-600">+62 21-xxxx-xxxx</p>
                  </div>
                </div>

                <div className="space-y-4 text-left">
                  <div className="bg-blue-100 rounded-lg p-4">
                    <p className="font-semibold text-blue-700">🎭 Penipu:</p>
                    <p className="text-blue-600 italic">
                      "Halo, ini dari sekolah. Ada masalah dengan akun WhatsApp
                      kamu. Bisa kasih kode OTP yang baru dikirim ke HP kamu?"
                    </p>
                  </div>

                  <div
                    className="bg-gradient-to-br from-green-200 via-blue-200 to-cyan-200 rounded-lg p-4 border-4 border-green-400"
                    style={{
                      boxShadow:
                        "0 6px 12px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.3)",
                    }}
                  >
                    <p className="font-semibold text-gray-700">🤔 Siswa:</p>
                    <p className="text-gray-600 italic">
                      "Eh kok aneh ya? Masa sekolah minta OTP WhatsApp..."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-100 rounded-xl p-6 border border-red-300">
                <h4 className="text-lg font-bold text-red-700 mb-3">
                  🎯 Teknik Manipulasi:
                </h4>
                <ul className="text-red-600 text-left space-y-2">
                  <li>• Menyamar sebagai otoritas (guru, bank)</li>
                  <li>• Menciptakan urgensi palsu</li>
                  <li>• Meminta info rahasia</li>
                  <li>• Memanfaatkan rasa percaya</li>
                </ul>
              </div>

              <div className="bg-green-100 rounded-xl p-6 border border-green-300">
                <h4 className="text-lg font-bold text-green-700 mb-3">
                  🛡️ Cara Hindari:
                </h4>
                <ul className="text-green-600 text-left space-y-2">
                  <li>• Verifikasi identitas pemanggil</li>
                  <li>• Jangan bagi OTP/password</li>
                  <li>• Tutup telepon jika mencurigakan</li>
                  <li>• Hubungi pihak resmi langsung</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 7,
      title: "Password Tanggal Lahir",
      content: (
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-8">
            Password Tanggal Lahir 📅
          </h1>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-yellow-100 via-amber-100 to-orange-100 rounded-2xl p-8 border-4 border-yellow-400 mb-8" style={{
              boxShadow: '0 8px 16px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.3)'
            }}>
              <h3 className="text-2xl font-bold text-yellow-700 mb-6">
                🧮 Hitungan Matematis
              </h3>

              <div
                className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-xl p-6 shadow-lg border-4 border-blue-400 mb-6"
                style={{
                  boxShadow:
                    "0 8px 16px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.3)",
                }}
              >
                <div className="text-left space-y-4">
                  <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
                    <span className="font-semibold text-blue-700">
                      Hari (1-31):
                    </span>
                    <span className="text-2xl font-bold text-blue-600">31</span>
                  </div>
                  <div className="text-center text-2xl">×</div>
                  <div className="flex items-center justify-between bg-green-50 p-4 rounded-lg">
                    <span className="font-semibold text-green-700">
                      Bulan (1-12):
                    </span>
                    <span className="text-2xl font-bold text-green-600">
                      12
                    </span>
                  </div>
                  <div className="text-center text-2xl">×</div>
                  <div className="flex items-center justify-between bg-purple-50 p-4 rounded-lg">
                    <span className="font-semibold text-purple-700">
                      Tahun (1900-2025):
                    </span>
                    <span className="text-2xl font-bold text-purple-600">
                      126
                    </span>
                  </div>
                  <div className="text-center text-2xl">=</div>
                  <div className="flex items-center justify-between bg-red-50 p-4 rounded-lg border-2 border-red-300">
                    <span className="font-semibold text-red-700">
                      Total kemungkinan:
                    </span>
                    <span className="text-3xl font-bold text-red-600">
                      46.872
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-red-100 rounded-xl p-6 border border-red-300">
                <h4 className="text-xl font-bold text-red-700 mb-3">
                  ⚠️ Keamanan Rendah!
                </h4>
                <div className="space-y-2">
                  <p className="text-red-600">
                    <strong>Entropi ≈ 15.5 bit</strong> (sangat kecil!)
                  </p>
                  <p className="text-red-600">
                    Komputer modern bisa menebak dalam{" "}
                    <strong>hitungan detik</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
              <h4 className="text-xl font-bold text-green-700 mb-3">
                💡 Solusi:
              </h4>
              <p className="text-green-600 text-lg">
                Gunakan kombinasi huruf besar, huruf kecil, angka, dan simbol
                dengan panjang minimal 12 karakter!
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 8,
      title: "Demo Password",
      content: (
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-8">
            Simulasi: Seberapa Cepat Password Ditebak? ⏱️
          </h1>

          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-cyan-100 via-blue-100 to-indigo-100 rounded-2xl p-6 border-4 border-cyan-400 mb-6" style={{
              boxShadow: '0 8px 16px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.3)'
            }}>
              <p className="text-blue-700 text-lg">
                💻 Mari kita lihat langsung seberapa aman password yang biasa
                kita gunakan!
              </p>
            </div>

            {/* Iframe for password demo */}
            <div
              className="bg-gradient-to-br from-cyan-100 via-teal-100 to-emerald-100 rounded-2xl shadow-lg border-4 border-cyan-400 overflow-hidden"
              style={{
                height: "700px",
                boxShadow:
                  "0 12px 24px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.4)",
              }}
            >
              <iframe
                src="/password_demo.html"
                className="w-full h-full"
                title="Password Security Demo"
                style={{ border: "none" }}
              />
            </div>

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <div className="text-2xl mb-2">🔴</div>
                <h4 className="font-bold text-red-700">Lemah</h4>
                <p className="text-red-600 text-sm">Ditebak dalam detik</p>
              </div>
              <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                <div className="text-2xl mb-2">🟡</div>
                <h4 className="font-bold text-yellow-700">Sedang</h4>
                <p className="text-yellow-600 text-sm">Beberapa menit/jam</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <div className="text-2xl mb-2">🟢</div>
                <h4 className="font-bold text-green-700">Kuat</h4>
                <p className="text-green-600 text-sm">Bertahun-tahun</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 9,
      title: "Rumus Keamanan Password",
      content: (
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-8">
            Rumus Keamanan Password 🧮
          </h1>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100 rounded-2xl p-8 border-4 border-purple-400 mb-8" style={{
              boxShadow: '0 8px 16px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.3)'
            }}>
              <h3 className="text-2xl font-bold text-purple-700 mb-6">
                📐 Formula Matematis
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div
                  className="bg-gradient-to-br from-red-100 via-orange-100 to-yellow-100 rounded-xl p-6 shadow-lg border-4 border-red-400"
                  style={{
                    boxShadow:
                      "0 8px 16px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.3)",
                  }}
                >
                  <h4 className="text-lg font-bold text-gray-700 mb-4">
                    Rumus Dasar:
                  </h4>
                  <div className="space-y-3 text-left">
                    <div
                      className="bg-gradient-to-r from-yellow-100 to-orange-100 p-3 rounded-lg border-2 border-yellow-300 font-mono text-sm"
                      style={{
                        boxShadow:
                          "0 4px 8px rgba(0,0,0,0.1), inset 0 1px 2px rgba(255,255,255,0.4)",
                      }}
                    >
                      <strong>N</strong> = jumlah kombinasi
                    </div>
                    <div
                      className="bg-gradient-to-r from-red-100 to-pink-100 p-3 rounded-lg border-2 border-red-300 font-mono text-sm"
                      style={{
                        boxShadow:
                          "0 4px 8px rgba(0,0,0,0.1), inset 0 1px 2px rgba(255,255,255,0.4)",
                      }}
                    >
                      <strong>T_worst</strong> = N / R
                    </div>
                    <div
                      className="bg-gradient-to-r from-blue-100 to-cyan-100 p-3 rounded-lg border-2 border-blue-300 font-mono text-sm"
                      style={{
                        boxShadow:
                          "0 4px 8px rgba(0,0,0,0.1), inset 0 1px 2px rgba(255,255,255,0.4)",
                      }}
                    >
                      <strong>T_avg</strong> ≈ N / (2R)
                    </div>
                    <div
                      className="bg-gradient-to-r from-green-100 to-emerald-100 p-3 rounded-lg border-2 border-green-300 font-mono text-sm"
                      style={{
                        boxShadow:
                          "0 4px 8px rgba(0,0,0,0.1), inset 0 1px 2px rgba(255,255,255,0.4)",
                      }}
                    >
                      <strong>log₂(N)</strong> = entropi (bit)
                    </div>
                  </div>
                </div>

                <div
                  className="bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100 rounded-xl p-6 shadow-lg border-4 border-purple-400"
                  style={{
                    boxShadow:
                      "0 8px 16px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.3)",
                  }}
                >
                  <h4 className="text-lg font-bold text-gray-700 mb-4">
                    Keterangan:
                  </h4>
                  <div className="space-y-3 text-left text-sm">
                    <div>
                      <strong>N:</strong> Total kombinasi password yang mungkin
                    </div>
                    <div>
                      <strong>R:</strong> Kecepatan serangan (guess/detik)
                    </div>
                    <div>
                      <strong>T_worst:</strong> Waktu terburuk untuk crack
                    </div>
                    <div>
                      <strong>T_avg:</strong> Waktu rata-rata
                    </div>
                    <div>
                      <strong>Entropi:</strong> Kekuatan keamanan dalam bit
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                <div className="text-3xl mb-3">😱</div>
                <h4 className="text-lg font-bold text-red-700 mb-2">
                  Password Lemah
                </h4>
                <p className="text-red-600 text-sm mb-2">Entropi &lt; 30 bit</p>
                <p className="text-red-500 text-xs">Contoh: 123456, password</p>
              </div>

              <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                <div className="text-3xl mb-3">😐</div>
                <h4 className="text-lg font-bold text-yellow-700 mb-2">
                  Password Sedang
                </h4>
                <p className="text-yellow-600 text-sm mb-2">
                  Entropi 30-60 bit
                </p>
                <p className="text-yellow-500 text-xs">Contoh: Password123</p>
              </div>

              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <div className="text-3xl mb-3">😎</div>
                <h4 className="text-lg font-bold text-green-700 mb-2">
                  Password Kuat
                </h4>
                <p className="text-green-600 text-sm mb-2">
                  Entropi &gt; 60 bit
                </p>
                <p className="text-green-500 text-xs">Contoh: K3l4sX!n94@Tk</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 10,
      title: "Tips Praktis",
      content: (
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
            Tips Praktis Keamanan Digital 💡
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            💡 <strong>Klik pada setiap card</strong> untuk melihat langkah
            detail dan tools yang bisa digunakan!
          </p>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
            {/* Password Kuat */}
            <div
              onClick={() =>
                setSelectedTip(
                  selectedTip === "strong_passwords" ? null : "strong_passwords"
                )
              }
              className={`bg-green-50 rounded-2xl p-6 border-2 border-green-200 hover:shadow-lg transition-all cursor-pointer ${
                selectedTip === "strong_passwords"
                  ? "ring-2 ring-green-400 border-green-400"
                  : ""
              }`}
            >
              <div className="text-4xl mb-3">🔑</div>
              <h3 className="text-xl font-bold text-green-700 mb-4">
                Password Kuat
              </h3>
              <div className="text-left space-y-2 text-sm text-green-600">
                <div className="flex items-start">
                  <span className="text-base mr-2">✅</span>
                  <span>Minimal 12 karakter</span>
                </div>
                <div className="flex items-start">
                  <span className="text-base mr-2">✅</span>
                  <span>Campur huruf besar & kecil</span>
                </div>
              </div>

              {selectedTip === "strong_passwords" && (
                <div className="mt-4 space-y-3 text-left">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">
                      📝 Langkah Detail:
                    </h4>
                    <ul className="text-xs text-green-600 space-y-1">
                      {tipDetails.strong_passwords.steps.map((step, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-green-500 mr-1">
                            {idx + 1}.
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">
                      🔧 Tools & Aplikasi:
                    </h4>
                    <ul className="text-xs text-green-600 space-y-1">
                      {tipDetails.strong_passwords.tools.map((tool, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-blue-500 mr-1">🔗</span>
                          <span>{tool}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="mt-3 text-right">
                <span className="text-xs text-green-500">
                  {selectedTip === "strong_passwords"
                    ? "▲ Tutup detail"
                    : "▼ Lihat detail"}
                </span>
              </div>
            </div>

            {/* Safe Browsing */}
            <div
              onClick={() =>
                setSelectedTip(
                  selectedTip === "safe_browsing" ? null : "safe_browsing"
                )
              }
              className={`bg-blue-50 rounded-2xl p-6 border-2 border-blue-200 hover:shadow-lg transition-all cursor-pointer ${
                selectedTip === "safe_browsing"
                  ? "ring-2 ring-blue-400 border-blue-400"
                  : ""
              }`}
            >
              <div className="text-4xl mb-3">🌐</div>
              <h3 className="text-xl font-bold text-blue-700 mb-4">
                Browsing Aman
              </h3>
              <div className="text-left space-y-2 text-sm text-blue-600">
                <div className="flex items-start">
                  <span className="text-base mr-2">�</span>
                  <span>Cek ikon gembok HTTPS</span>
                </div>
                <div className="flex items-start">
                  <span className="text-base mr-2">�</span>
                  <span>Periksa URL dengan teliti</span>
                </div>
              </div>

              {selectedTip === "safe_browsing" && (
                <div className="mt-4 space-y-3 text-left">
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">
                      📝 Langkah Detail:
                    </h4>
                    <ul className="text-xs text-blue-600 space-y-1">
                      {tipDetails.safe_browsing.steps.map((step, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-blue-500 mr-1">{idx + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">
                      🔧 Tools & Aplikasi:
                    </h4>
                    <ul className="text-xs text-blue-600 space-y-1">
                      {tipDetails.safe_browsing.tools.map((tool, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-blue-500 mr-1">�</span>
                          <span>{tool}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="mt-3 text-right">
                <span className="text-xs text-blue-500">
                  {selectedTip === "safe_browsing"
                    ? "▲ Tutup detail"
                    : "▼ Lihat detail"}
                </span>
              </div>
            </div>

            {/* Social Media Privacy */}
            <div
              onClick={() =>
                setSelectedTip(
                  selectedTip === "social_media" ? null : "social_media"
                )
              }
              className={`bg-pink-50 rounded-2xl p-6 border-2 border-pink-200 hover:shadow-lg transition-all cursor-pointer ${
                selectedTip === "social_media"
                  ? "ring-2 ring-pink-400 border-pink-400"
                  : ""
              }`}
            >
              <div className="text-4xl mb-3">�</div>
              <h3 className="text-xl font-bold text-pink-700 mb-4">
                Privasi Medsos
              </h3>
              <div className="text-left space-y-2 text-sm text-pink-600">
                <div className="flex items-start">
                  <span className="text-base mr-2">🔒</span>
                  <span>Set profile ke private</span>
                </div>
                <div className="flex items-start">
                  <span className="text-base mr-2">�</span>
                  <span>Jangan posting lokasi real-time</span>
                </div>
              </div>

              {selectedTip === "social_media" && (
                <div className="mt-4 space-y-3 text-left">
                  <div>
                    <h4 className="font-semibold text-pink-700 mb-2">
                      📝 Langkah Detail:
                    </h4>
                    <ul className="text-xs text-pink-600 space-y-1">
                      {tipDetails.social_media.steps.map((step, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-pink-500 mr-1">{idx + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-pink-700 mb-2">
                      🔧 Tools & Aplikasi:
                    </h4>
                    <ul className="text-xs text-pink-600 space-y-1">
                      {tipDetails.social_media.tools.map((tool, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-pink-500 mr-1">�</span>
                          <span>{tool}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="mt-3 text-right">
                <span className="text-xs text-pink-500">
                  {selectedTip === "social_media"
                    ? "▲ Tutup detail"
                    : "▼ Lihat detail"}
                </span>
              </div>
            </div>

            {/* Device Security */}
            <div
              onClick={() =>
                setSelectedTip(
                  selectedTip === "device_security" ? null : "device_security"
                )
              }
              className={`bg-teal-50 rounded-2xl p-6 border-2 border-teal-200 hover:shadow-lg transition-all cursor-pointer ${
                selectedTip === "device_security"
                  ? "ring-2 ring-teal-400 border-teal-400"
                  : ""
              }`}
            >
              <div className="text-4xl mb-3">📲</div>
              <h3 className="text-xl font-bold text-teal-700 mb-4">
                Keamanan Perangkat
              </h3>
              <div className="text-left space-y-2 text-sm text-teal-600">
                <div className="flex items-start">
                  <span className="text-base mr-2">�</span>
                  <span>Aktifkan screen lock</span>
                </div>
                <div className="flex items-start">
                  <span className="text-base mr-2">�</span>
                  <span>Update OS dan aplikasi rutin</span>
                </div>
              </div>

              {selectedTip === "device_security" && (
                <div className="mt-4 space-y-3 text-left">
                  <div>
                    <h4 className="font-semibold text-teal-700 mb-2">
                      📝 Langkah Detail:
                    </h4>
                    <ul className="text-xs text-teal-600 space-y-1">
                      {tipDetails.device_security.steps.map((step, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-teal-500 mr-1">{idx + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-teal-700 mb-2">
                      🔧 Tools & Aplikasi:
                    </h4>
                    <ul className="text-xs text-teal-600 space-y-1">
                      {tipDetails.device_security.tools.map((tool, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-teal-500 mr-1">🔗</span>
                          <span>{tool}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="mt-3 text-right">
                <span className="text-xs text-teal-500">
                  {selectedTip === "device_security"
                    ? "▲ Tutup detail"
                    : "▼ Lihat detail"}
                </span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 11,
      title: "Yuk Pre-Test!",
      content: (
        <div className="text-center space-y-8">
          <div className="text-8xl mb-6">🎯</div>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-8">
            Sekarang Yuk Isi Pre-Test! 📝
          </h1>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200 mb-8">
              <h3 className="text-2xl font-bold text-blue-700 mb-4">
                🚀 Jadi Tester Pertama Game Edukatif!
              </h3>
              <p className="text-blue-600 text-lg mb-6">
                Setelah pre-test, kalian akan jadi yang pertama nyoba game
                edukatif keamanan digital yang seru!
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div
                  className="bg-gradient-to-br from-green-100 to-emerald-200 rounded-xl p-4 border-4 border-green-400"
                  style={{
                    boxShadow:
                      "0 6px 12px rgba(0,0,0,0.15), inset 0 1px 3px rgba(255,255,255,0.3)",
                  }}
                >
                  <div className="text-3xl mb-2">⏱️</div>
                  <p className="font-semibold text-blue-700">5-7 Menit</p>
                  <p className="text-blue-600 text-sm">Cepat & mudah</p>
                </div>
                <div
                  className="bg-gradient-to-br from-blue-100 to-cyan-200 rounded-xl p-4 border-4 border-blue-400"
                  style={{
                    boxShadow:
                      "0 6px 12px rgba(0,0,0,0.15), inset 0 1px 3px rgba(255,255,255,0.3)",
                  }}
                >
                  <div className="text-3xl mb-2">📱</div>
                  <p className="font-semibold text-blue-700">Mobile Friendly</p>
                  <p className="text-blue-600 text-sm">Bisa pakai HP</p>
                </div>
                <div
                  className="bg-gradient-to-br from-yellow-100 to-orange-200 rounded-xl p-4 border-4 border-yellow-400"
                  style={{
                    boxShadow:
                      "0 6px 12px rgba(0,0,0,0.15), inset 0 1px 3px rgba(255,255,255,0.3)",
                  }}
                >
                  <div className="text-3xl mb-2">🔒</div>
                  <p className="font-semibold text-blue-700">Data Aman</p>
                  <p className="text-blue-600 text-sm">Privasi terjaga</p>
                </div>
              </div>
            </div>

            {/* QR Code Section */}
            <div
              className="bg-gradient-to-br from-pink-100 via-rose-100 to-red-100 rounded-2xl shadow-lg border-4 border-pink-400 p-8"
              style={{
                boxShadow:
                  "0 12px 24px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.4)",
              }}
            >
              <h4 className="text-xl font-bold text-gray-700 mb-6">
                📱 Scan QR atau Klik Tombol
              </h4>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-center">
                  <div
                    className="bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 w-48 h-48 mx-auto rounded-xl flex items-center justify-center border-4 border-dashed border-yellow-400"
                    style={{
                      boxShadow:
                        "0 8px 16px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.3)",
                    }}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-2">📱</div>
                      <p className="text-gray-600 text-sm">
                        QR Code menuju
                        <br />
                        halaman pre-test
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mt-2">
                    Scan dengan kamera HP
                  </p>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => router.push("/form/pre")}
                    className="bg-gradient-to-r from-green-500 via-yellow-500 to-orange-500 hover:from-green-600 hover:via-yellow-600 hover:to-orange-600 text-white font-bold py-6 px-12 rounded-2xl transition-all transform hover:scale-105 text-xl border-4 border-yellow-600"
                    style={{
                      boxShadow: "0 8px 0 #d97706, 0 12px 25px rgba(0,0,0,0.3)",
                      textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                    }}
                  >
                    <span className="text-2xl mr-3">🚀</span>
                    Mulai Pre-Test Sekarang!
                  </button>

                  <p className="text-gray-600 text-sm mt-4">
                    Atau buka: <br />
                    <code
                      className="bg-gradient-to-r from-blue-100 to-cyan-100 px-3 py-2 rounded-lg border-2 border-blue-300 text-sm font-mono"
                      style={{
                        boxShadow:
                          "0 4px 8px rgba(0,0,0,0.1), inset 0 1px 2px rgba(255,255,255,0.4)",
                      }}
                    >
                      {typeof window !== "undefined"
                        ? window.location.origin
                        : ""}
                      /form/pre
                    </code>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-yellow-50 rounded-xl p-6 border border-yellow-200">
              <p className="text-yellow-700 text-lg">
                <span className="text-2xl mr-2">💫</span>
                <strong>Setelah pre-test:</strong> Kalian akan dapat akses
                eksklusif ke game edukatif yang lagi dikembangkan!
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        nextSlide();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        prevSlide();
      } else if (event.key === "Escape") {
        router.push("/");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Reset card states when slide changes
  useEffect(() => {
    setSelectedThreat(null);
    setSelectedTip(null);
  }, [currentSlide]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-cyan-300 to-green-400 relative mario-world-bg">
      {/* Mario World Style Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Clouds */}
        <div className="absolute top-8 left-8 text-4xl animate-float opacity-90">
          ☁️
        </div>
        <div
          className="absolute top-12 right-20 text-3xl animate-float opacity-80"
          style={{ animationDelay: "1s" }}
        >
          ☁️
        </div>
        <div
          className="absolute top-20 left-1/3 text-2xl animate-float opacity-70"
          style={{ animationDelay: "2s" }}
        >
          ☁️
        </div>
        <div
          className="absolute top-16 right-1/3 text-3xl animate-float opacity-60"
          style={{ animationDelay: "0.5s" }}
        >
          ☁️
        </div>

        {/* Mario Elements */}
        <div
          className="absolute top-1/4 left-20 text-3xl animate-bounce opacity-80"
          style={{ animationDelay: "0.3s" }}
        >
          🍄
        </div>
        <div
          className="absolute bottom-40 right-32 text-2xl animate-bounce opacity-70"
          style={{ animationDelay: "1.2s" }}
        >
          ⭐
        </div>
        <div
          className="absolute top-2/3 left-1/3 text-xl animate-bounce opacity-60"
          style={{ animationDelay: "2.1s" }}
        >
          🪙
        </div>
        <div
          className="absolute top-20 right-1/2 text-2xl animate-bounce opacity-65"
          style={{ animationDelay: "0.8s" }}
        >
          ❓
        </div>
        <div
          className="absolute bottom-32 left-1/2 text-xl animate-bounce opacity-75"
          style={{ animationDelay: "1.5s" }}
        >
          🏰
        </div>

        {/* Mario Blocks */}
        <div
          className="absolute top-32 left-1/2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 border-2 border-yellow-600 rounded animate-float opacity-90"
          style={{ animationDelay: "0.7s" }}
        ></div>
        <div
          className="absolute bottom-60 right-1/4 w-6 h-6 bg-gradient-to-br from-red-500 to-red-700 border-2 border-red-800 rounded animate-float opacity-85"
          style={{ animationDelay: "1.8s" }}
        ></div>
      </div>

      {/* Mario World Navigation Header */}
      <div
        className="bg-gradient-to-r from-green-600 via-yellow-500 to-red-500 text-white px-6 py-4 shadow-2xl relative z-10 border-b-8 border-yellow-400"
        style={{
          background:
            "linear-gradient(45deg, #22c55e 0%, #facc15 25%, #ef4444 50%, #8b5cf6 75%, #06b6d4 100%)",
          borderBottom: "8px ridge #fbbf24",
        }}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push("/")}
              className="mario-button px-6 py-2 rounded-lg text-lg flex items-center"
            >
              � Home
            </button>
            <div>
              <h1 className="text-xl font-bold drop-shadow-lg">
                �️ Cyber Security Quest
              </h1>
              <p className="text-white/90 text-sm font-medium">
                Level {currentSlide + 1}/{slides.length}:{" "}
                {slides[currentSlide].title}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
              disabled={currentSlide === 0}
              className="mario-button disabled:opacity-50 disabled:transform-none px-6 py-3 rounded-lg text-lg"
            >
              ⬅️ Prev
            </button>
            <div
              className="bg-gradient-to-r from-yellow-400 to-orange-400 text-red-800 px-4 py-2 rounded-lg font-bold text-lg shadow-inner border-4 border-yellow-600"
              style={{
                textShadow: "1px 1px 0px rgba(255,255,255,0.5)",
              }}
            >
              {currentSlide + 1}/{slides.length}
            </div>
            <button
              onClick={() =>
                setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))
              }
              disabled={currentSlide === slides.length - 1}
              className="mario-button disabled:opacity-50 disabled:transform-none px-6 py-3 rounded-lg text-lg"
            >
              Next ➡️
            </button>
            <button
              onClick={() => window.open("/surprise", "_blank")}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:scale-105 transition-all animate-pulse border-4 border-red-700 text-lg"
              style={{
                boxShadow: "0 6px 0 #7f1d1d, 0 8px 15px rgba(0,0,0,0.3)",
                textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
              }}
            >
              🎁 Bonus Hadiah
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area - Full Scrollable Mario Style */}
      <div className="pb-8 px-4 relative">
        <div className="relative z-10 max-w-6xl mx-auto">
          <div
            className="mario-content-box rounded-3xl shadow-2xl overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(240,230,140,0.95) 0%, rgba(152,251,152,0.95) 30%, rgba(135,206,235,0.95) 70%, rgba(221,160,221,0.95) 100%)",
              border: "8px ridge #8B4513",
              boxShadow:
                "0 0 0 4px #D2691E, 0 25px 50px -12px rgba(0, 0, 0, 0.4)",
            }}
          >
            <div className="p-8 relative">
              {/* Mario Block Pattern Overlay */}
              <div className="absolute top-0 left-0 right-0 bottom-0 opacity-5 pointer-events-none">
                <div className="grid grid-cols-16 gap-1">
                  {Array.from({ length: 200 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-full h-6 rounded-sm ${
                        i % 5 === 0
                          ? "bg-yellow-600"
                          : i % 7 === 0
                          ? "bg-red-600"
                          : i % 3 === 0
                          ? "bg-green-700"
                          : "bg-blue-600"
                      }`}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Slide Content */}
              <div
                className="w-full relative z-10"
                style={{
                  animation:
                    "slideIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                }}
              >
                {slides[currentSlide].content}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mario World Slide Indicator */}
      <div
        className="bg-gradient-to-r from-green-600 via-yellow-500 to-red-500 border-t-8 border-yellow-400 p-4 relative z-10"
        style={{
          background:
            "linear-gradient(90deg, #16a34a 0%, #facc15 25%, #ef4444 50%, #8b5cf6 75%, #059669 100%)",
          borderTop: "8px ridge #fbbf24",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center space-x-4 mb-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`relative transition-all duration-300 ${
                  index === currentSlide
                    ? "transform scale-150 animate-bounce"
                    : "hover:scale-125"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg shadow-lg transition-all border-2 ${
                    index === currentSlide
                      ? "bg-gradient-to-br from-yellow-400 to-orange-500 border-yellow-600 shadow-yellow-300"
                      : "bg-gradient-to-br from-gray-400 to-gray-600 border-gray-500 hover:from-blue-400 hover:to-blue-600 hover:border-blue-500"
                  }`}
                  style={{
                    boxShadow:
                      index === currentSlide
                        ? "0 4px 0 #d97706, 0 6px 15px rgba(251, 191, 36, 0.4)"
                        : "0 2px 0 #374151, 0 4px 10px rgba(0,0,0,0.2)",
                  }}
                >
                  <span className="text-lg flex items-center justify-center h-full">
                    {index === currentSlide ? "⭐" : "🪙"}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div
            className="text-center text-white text-sm font-bold"
            style={{
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            <p>
              🎮 Gunakan tombol panah ← → atau spasi untuk navigasi | Tekan ESC
              untuk home | Klik 🪙 untuk lompat ke slide
            </p>
          </div>
        </div>
      </div>

      {/* Mario World CSS Styles */}
      <style jsx>{`
        /* Mario World Authentic Animations */
        .mario-world-bg {
          background: linear-gradient(
            180deg,
            #60a5fa 0%,
            /* Sky blue */ #38bdf8 30%,
            /* Cyan */ #4ade80 70%,
            /* Green */ #22c55e 100% /* Forest green */
          );
          position: relative;
        }

        .mario-world-bg::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: radial-gradient(
              circle at 20% 20%,
              rgba(255, 255, 255, 0.3) 1px,
              transparent 1px
            ),
            radial-gradient(
              circle at 80% 80%,
              rgba(255, 255, 255, 0.2) 1px,
              transparent 1px
            ),
            radial-gradient(
              circle at 40% 40%,
              rgba(255, 255, 255, 0.1) 1px,
              transparent 1px
            );
          background-size: 50px 50px, 30px 30px, 70px 70px;
          pointer-events: none;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(1deg);
          }
          66% {
            transform: translateY(-5px) rotate(-1deg);
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        /* Mario-style Content Box */
        .mario-content-box {
          position: relative;
        }

        .mario-content-box::before {
          content: "";
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          background: linear-gradient(
            45deg,
            #8b4513 0%,
            #d2691e 25%,
            #8b4513 50%,
            #d2691e 75%,
            #8b4513 100%
          );
          border-radius: 2rem;
          z-index: -1;
        }

        /* Custom Mario Scrollbar */
        .scrollbar-mario::-webkit-scrollbar {
          width: 18px;
        }

        .scrollbar-mario::-webkit-scrollbar-track {
          background: linear-gradient(180deg, #8b4513, #d2691e);
          border-radius: 12px;
          border: 3px ridge #654321;
        }

        .scrollbar-mario::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #ffd700, #ffa500, #ff8c00);
          border-radius: 12px;
          border: 3px ridge #b8860b;
          box-shadow: inset 0 3px 6px rgba(255, 255, 255, 0.4),
            0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .scrollbar-mario::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #ffff00, #ffd700, #ffa500);
          box-shadow: inset 0 3px 6px rgba(255, 255, 255, 0.6),
            0 4px 8px rgba(0, 0, 0, 0.4);
        }

        .scrollbar-mario::-webkit-scrollbar-corner {
          background: #d2691e;
        }

        /* Better scroll behavior */
        .scrollbar-mario {
          scroll-behavior: smooth;
          scrollbar-width: thick;
          scrollbar-color: #ffd700 #8b4513;
        }

        /* Mario Buttons */
        .mario-button {
          background: linear-gradient(45deg, #facc15, #f59e0b);
          border: 4px ridge #d97706;
          color: #92400e;
          font-weight: bold;
          text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.5);
          transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          box-shadow: 0 6px 0 #92400e, 0 8px 15px rgba(0, 0, 0, 0.3);
        }

        .mario-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 0 #92400e, 0 12px 20px rgba(0, 0, 0, 0.4);
        }

        .mario-button:active {
          transform: translateY(4px);
          box-shadow: 0 2px 0 #92400e, 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        /* Responsive Design - Natural Scroll */
        .mario-content-box {
          /* Remove height constraints for natural scrolling */
        }

        @media (max-width: 768px) {
          .mario-content-box {
            border-width: 6px;
          }

          .mario-world-bg div[class*="text-"] {
            font-size: 0.9em;
          }
        }

        @media (max-width: 640px) {
          .mario-content-box {
            border-width: 4px;
            margin: 0.25rem;
          }
        } /* Ensure full scroll capability */
        html,
        body {
          scroll-behavior: smooth;
        }

        /* Mario-style focus effects */
        button:focus,
        .mario-button:focus {
          outline: 4px solid #ffd700;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
};

export default PresentasiPage;
