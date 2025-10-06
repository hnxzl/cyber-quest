import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const PresentasiPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedThreat, setSelectedThreat] = useState<string | null>(null);
  const [selectedTip, setSelectedTip] = useState<string | null>(null);
  const router = useRouter();

  // Data detail untuk ancaman digital
  const threatDetails = {
    phishing: {
      examples: [
        "Email palsu dari 'bank' yang meminta update data rekening",
        "WhatsApp dari nomor asing mengaku customer service e-commerce",
        "Website palsu yang meniru tampilan situs resmi",
        "SMS mengaku dari operator seluler meminta konfirmasi data"
      ],
      prevention: [
        "Selalu cek URL website dengan teliti sebelum login",
        "Jangan klik link dari pesan yang mencurigakan",
        "Verifikasi langsung ke customer service resmi jika ragu",
        "Aktifkan autentikasi dua faktor (2FA) di akun penting"
      ]
    },
    social_engineering: {
      examples: [
        "Telepon mengaku IT support meminta password untuk 'maintenance'",
        "Orang asing di kantor bertanya password WiFi sambil pura-pura bingung",
        "Chat mengaku teman meminjam uang dalam keadaan darurat",
        "Email mengaku atasan meminta transfer dana untuk keperluan mendesak"
      ],
      prevention: [
        "Selalu verifikasi identitas orang yang meminta informasi sensitif",
        "Jangan memberikan password atau PIN melalui telepon/chat",
        "Gunakan protokol verifikasi berlapis untuk hal-hal penting",
        "Edukasi diri tentang teknik-teknik social engineering"
      ]
    },
    ransomware: {
      examples: [
        "File dokumen berubah ekstensi menjadi .encrypted dan tidak bisa dibuka",
        "Layar komputer menampilkan pesan meminta bitcoin untuk unlock file",
        "Email dengan attachment yang mengandung ransomware",
        "Website yang ter-compromise mendownload ransomware otomatis"
      ],
      prevention: [
        "Backup data secara rutin ke storage terpisah (offline)",
        "Update sistem operasi dan software secara berkala",
        "Gunakan antivirus yang terpercaya dengan real-time protection",
        "Hindari membuka attachment email dari pengirim tidak dikenal"
      ]
    },
    password: {
      examples: [
        "Password seperti '123456', 'password', 'qwerty'",
        "Menggunakan nama, tanggal lahir, atau nama hewan peliharaan",
        "Password yang sama untuk semua akun",
        "Password tanpa kombinasi huruf besar-kecil-angka-simbol"
      ],
      prevention: [
        "Buat password minimal 12 karakter dengan kombinasi kompleks",
        "Gunakan password manager untuk menyimpan password unik",
        "Aktifkan autentikasi dua faktor (2FA) di semua akun penting",
        "Ganti password secara berkala, terutama setelah insiden keamanan"
      ]
    }
  };

  // Data detail untuk tips praktis
  const tipDetails = {
    strong_passwords: {
      steps: [
        "Gunakan minimal 12 karakter (semakin panjang semakin baik)",
        "Kombinasikan huruf besar, huruf kecil, angka, dan simbol",
        "Hindari kata yang ada di kamus atau informasi pribadi",
        "Buat password unik untuk setiap akun penting"
      ],
      tools: [
        "Password Manager: Bitwarden, LastPass, 1Password",
        "2FA Apps: Google Authenticator, Authy",
        "Checker keamanan: HaveIBeenPwned untuk cek kebocoran data"
      ]
    },
    safe_browsing: {
      steps: [
        "Selalu periksa URL sebelum memasukkan data sensitif",
        "Cari ikon gembok (🔒) di address bar untuk situs HTTPS",
        "Jangan download software dari situs yang tidak terpercaya",
        "Log out dari akun penting setelah selesai digunakan"
      ],
      tools: [
        "Extensions: uBlock Origin, HTTPS Everywhere",
        "DNS: Cloudflare (1.1.1.1) untuk filter malware",
        "VPN terpercaya jika menggunakan WiFi public"
      ]
    },
    social_media: {
      steps: [
        "Set profile ke private, jangan public untuk semua orang",
        "Review dan hapus informasi pribadi yang tidak perlu",
        "Periksa app permissions yang terhubung ke akun media sosial",
        "Jangan posting lokasi real-time atau info pribadi sensitif"
      ],
      tools: [
        "Privacy settings di setiap platform (Instagram, Facebook, TikTok)",
        "2FA untuk semua akun media sosial",
        "Location services: matikan sharing lokasi otomatis"
      ]
    },
    device_security: {
      steps: [
        "Aktifkan screen lock (PIN, pattern, biometrics) di semua device",
        "Install aplikasi hanya dari official store (Play Store/App Store)",
        "Update sistem operasi dan aplikasi secara rutin",
        "Backup data penting secara berkala"
      ],
      tools: [
        "Antivirus mobile: Malwarebytes, Bitdefender (jika perlu)",
        "Backup: Google Drive, iCloud, atau external storage",
        "Find My Device: Google Find My Device, Apple Find My"
      ]
    }
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
          <div className="bg-blue-50 rounded-2xl p-6 max-w-2xl mx-auto border border-blue-200">
            <p className="text-blue-800 font-semibold text-lg">
              📚 Ezra — Alumni SMAN 1 Katapang
            </p>
            <p className="text-blue-600">💻 Mahasiswa Informatika</p>
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

            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
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

          <div className="bg-yellow-50 rounded-2xl p-6 max-w-3xl mx-auto border border-yellow-200">
            <p className="text-yellow-800 text-lg font-semibold">
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
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 flex items-center">
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

              <div className="bg-green-50 rounded-xl p-6 border border-green-200 flex items-center">
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

              <div className="bg-orange-50 rounded-xl p-6 border border-orange-200 flex items-center">
                <div className="text-3xl mr-4">4️⃣</div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-orange-700">
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
            💡 <strong>Klik pada setiap card</strong> untuk melihat contoh dan cara pencegahan!
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {/* Phishing Card */}
            <div
              onClick={() => setSelectedThreat(selectedThreat === 'phishing' ? null : 'phishing')}
              className={`bg-red-50 rounded-2xl p-6 border-2 border-red-200 hover:shadow-lg transition-all cursor-pointer ${
                selectedThreat === 'phishing' ? 'ring-2 ring-red-400 border-red-400' : ''
              }`}
            >
              <div className="text-5xl mb-3">🎣</div>
              <h3 className="text-xl font-bold text-red-700 mb-3">Phishing</h3>
              <p className="text-red-600 text-sm mb-3">
                Penipuan dengan link/pesan palsu untuk mencuri data pribadi
              </p>
              
              {selectedThreat === 'phishing' && (
                <div className="mt-4 space-y-3 text-left">
                  <div>
                    <h4 className="font-semibold text-red-700 mb-2">⚠️ Contoh Serangan:</h4>
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
                    <h4 className="font-semibold text-red-700 mb-2">🛡️ Cara Pencegahan:</h4>
                    <ul className="text-xs text-red-600 space-y-1">
                      {threatDetails.phishing.prevention.map((prevention, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-green-500 mr-1">✓</span>
                          <span>{prevention}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              <div className="mt-3 text-right">
                <span className="text-xs text-red-500">
                  {selectedThreat === 'phishing' ? "▲ Tutup detail" : "▼ Lihat detail"}
                </span>
              </div>
            </div>

            {/* Social Engineering Card */}
            <div
              onClick={() => setSelectedThreat(selectedThreat === 'social_engineering' ? null : 'social_engineering')}
              className={`bg-orange-50 rounded-2xl p-6 border-2 border-orange-200 hover:shadow-lg transition-all cursor-pointer ${
                selectedThreat === 'social_engineering' ? 'ring-2 ring-orange-400 border-orange-400' : ''
              }`}
            >
              <div className="text-5xl mb-3">🕵️</div>
              <h3 className="text-xl font-bold text-orange-700 mb-3">
                Social Engineering
              </h3>
              <p className="text-orange-600 text-sm mb-3">
                Manipulasi psikologis untuk mendapatkan informasi rahasia
              </p>
              
              {selectedThreat === 'social_engineering' && (
                <div className="mt-4 space-y-3 text-left">
                  <div>
                    <h4 className="font-semibold text-orange-700 mb-2">⚠️ Contoh Serangan:</h4>
                    <ul className="text-xs text-orange-600 space-y-1">
                      {threatDetails.social_engineering.examples.map((example, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="mr-1">•</span>
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-700 mb-2">🛡️ Cara Pencegahan:</h4>
                    <ul className="text-xs text-orange-600 space-y-1">
                      {threatDetails.social_engineering.prevention.map((prevention, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-green-500 mr-1">✓</span>
                          <span>{prevention}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              <div className="mt-3 text-right">
                <span className="text-xs text-orange-500">
                  {selectedThreat === 'social_engineering' ? "▲ Tutup detail" : "▼ Lihat detail"}
                </span>
              </div>
            </div>

            {/* Ransomware Card */}
            <div
              onClick={() => setSelectedThreat(selectedThreat === 'ransomware' ? null : 'ransomware')}
              className={`bg-purple-50 rounded-2xl p-6 border-2 border-purple-200 hover:shadow-lg transition-all cursor-pointer ${
                selectedThreat === 'ransomware' ? 'ring-2 ring-purple-400 border-purple-400' : ''
              }`}
            >
              <div className="text-5xl mb-3">🔒</div>
              <h3 className="text-xl font-bold text-purple-700 mb-3">
                Ransomware
              </h3>
              <p className="text-purple-600 text-sm mb-3">
                Malware yang mengunci file dan meminta tebusan
              </p>
              
              {selectedThreat === 'ransomware' && (
                <div className="mt-4 space-y-3 text-left">
                  <div>
                    <h4 className="font-semibold text-purple-700 mb-2">⚠️ Contoh Serangan:</h4>
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
                    <h4 className="font-semibold text-purple-700 mb-2">🛡️ Cara Pencegahan:</h4>
                    <ul className="text-xs text-purple-600 space-y-1">
                      {threatDetails.ransomware.prevention.map((prevention, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-green-500 mr-1">✓</span>
                          <span>{prevention}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              <div className="mt-3 text-right">
                <span className="text-xs text-purple-500">
                  {selectedThreat === 'ransomware' ? "▲ Tutup detail" : "▼ Lihat detail"}
                </span>
              </div>
            </div>

            {/* Password Lemah Card */}
            <div
              onClick={() => setSelectedThreat(selectedThreat === 'password' ? null : 'password')}
              className={`bg-yellow-50 rounded-2xl p-6 border-2 border-yellow-200 hover:shadow-lg transition-all cursor-pointer ${
                selectedThreat === 'password' ? 'ring-2 ring-yellow-400 border-yellow-400' : ''
              }`}
            >
              <div className="text-5xl mb-3">🔑</div>
              <h3 className="text-xl font-bold text-yellow-700 mb-3">
                Password Lemah
              </h3>
              <p className="text-yellow-600 text-sm mb-3">
                Password mudah ditebak seperti tanggal lahir atau 123456
              </p>
              
              {selectedThreat === 'password' && (
                <div className="mt-4 space-y-3 text-left">
                  <div>
                    <h4 className="font-semibold text-yellow-700 mb-2">⚠️ Contoh Password Lemah:</h4>
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
                    <h4 className="font-semibold text-yellow-700 mb-2">🛡️ Cara Membuat Password Kuat:</h4>
                    <ul className="text-xs text-yellow-600 space-y-1">
                      {threatDetails.password.prevention.map((prevention, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-green-500 mr-1">✓</span>
                          <span>{prevention}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              <div className="mt-3 text-right">
                <span className="text-xs text-yellow-500">
                  {selectedThreat === 'password' ? "▲ Tutup detail" : "▼ Lihat detail"}
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
              <div className="bg-white rounded-xl p-6 shadow-lg max-w-md mx-auto border">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                    ?
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold">+62 812-xxxx-xxxx</p>
                    <p className="text-xs text-gray-500">Hari ini 14:23</p>
                  </div>
                </div>

                <div className="bg-gray-100 rounded-lg p-4 mb-3">
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
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-8">
            Social Engineering 🕵️
          </h1>

          <div className="max-w-4xl mx-auto">
            <div className="bg-orange-50 rounded-2xl p-8 border border-orange-200 mb-8">
              <h3 className="text-2xl font-bold text-orange-700 mb-6">
                📞 Roleplay Contoh
              </h3>

              {/* Mock Phone Call */}
              <div className="bg-white rounded-xl p-6 shadow-lg border">
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

                  <div className="bg-gray-100 rounded-lg p-4">
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
            <div className="bg-yellow-50 rounded-2xl p-8 border border-yellow-200 mb-8">
              <h3 className="text-2xl font-bold text-yellow-700 mb-6">
                🧮 Hitungan Matematis
              </h3>

              <div className="bg-white rounded-xl p-6 shadow-lg border mb-6">
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
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200 mb-6">
              <p className="text-blue-700 text-lg">
                💻 Mari kita lihat langsung seberapa aman password yang biasa
                kita gunakan!
              </p>
            </div>

            {/* Iframe for password demo */}
            <div
              className="bg-white rounded-2xl shadow-lg border overflow-hidden"
              style={{ height: "500px" }}
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
            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200 mb-8">
              <h3 className="text-2xl font-bold text-blue-700 mb-6">
                📐 Formula Matematis
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border">
                  <h4 className="text-lg font-bold text-gray-700 mb-4">
                    Rumus Dasar:
                  </h4>
                  <div className="space-y-3 text-left">
                    <div className="bg-gray-50 p-3 rounded font-mono text-sm">
                      <strong>N</strong> = jumlah kombinasi
                    </div>
                    <div className="bg-gray-50 p-3 rounded font-mono text-sm">
                      <strong>T_worst</strong> = N / R
                    </div>
                    <div className="bg-gray-50 p-3 rounded font-mono text-sm">
                      <strong>T_avg</strong> ≈ N / (2R)
                    </div>
                    <div className="bg-gray-50 p-3 rounded font-mono text-sm">
                      <strong>log₂(N)</strong> = entropi (bit)
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border">
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
            💡 <strong>Klik pada setiap card</strong> untuk melihat langkah detail dan tools yang bisa digunakan!
          </p>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
            {/* Password Kuat */}
            <div
              onClick={() => setSelectedTip(selectedTip === 'strong_passwords' ? null : 'strong_passwords')}
              className={`bg-green-50 rounded-2xl p-6 border-2 border-green-200 hover:shadow-lg transition-all cursor-pointer ${
                selectedTip === 'strong_passwords' ? 'ring-2 ring-green-400 border-green-400' : ''
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
              
              {selectedTip === 'strong_passwords' && (
                <div className="mt-4 space-y-3 text-left">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">📝 Langkah Detail:</h4>
                    <ul className="text-xs text-green-600 space-y-1">
                      {tipDetails.strong_passwords.steps.map((step, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-green-500 mr-1">{idx + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">🔧 Tools & Aplikasi:</h4>
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
                  {selectedTip === 'strong_passwords' ? "▲ Tutup detail" : "▼ Lihat detail"}
                </span>
              </div>
            </div>

            {/* Safe Browsing */}
            <div
              onClick={() => setSelectedTip(selectedTip === 'safe_browsing' ? null : 'safe_browsing')}
              className={`bg-blue-50 rounded-2xl p-6 border-2 border-blue-200 hover:shadow-lg transition-all cursor-pointer ${
                selectedTip === 'safe_browsing' ? 'ring-2 ring-blue-400 border-blue-400' : ''
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
              
              {selectedTip === 'safe_browsing' && (
                <div className="mt-4 space-y-3 text-left">
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">📝 Langkah Detail:</h4>
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
                    <h4 className="font-semibold text-blue-700 mb-2">🔧 Tools & Aplikasi:</h4>
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
                  {selectedTip === 'safe_browsing' ? "▲ Tutup detail" : "▼ Lihat detail"}
                </span>
              </div>
            </div>

            {/* Social Media Privacy */}
            <div
              onClick={() => setSelectedTip(selectedTip === 'social_media' ? null : 'social_media')}
              className={`bg-pink-50 rounded-2xl p-6 border-2 border-pink-200 hover:shadow-lg transition-all cursor-pointer ${
                selectedTip === 'social_media' ? 'ring-2 ring-pink-400 border-pink-400' : ''
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
              
              {selectedTip === 'social_media' && (
                <div className="mt-4 space-y-3 text-left">
                  <div>
                    <h4 className="font-semibold text-pink-700 mb-2">📝 Langkah Detail:</h4>
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
                    <h4 className="font-semibold text-pink-700 mb-2">🔧 Tools & Aplikasi:</h4>
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
                  {selectedTip === 'social_media' ? "▲ Tutup detail" : "▼ Lihat detail"}
                </span>
              </div>
            </div>

            {/* Device Security */}
            <div
              onClick={() => setSelectedTip(selectedTip === 'device_security' ? null : 'device_security')}
              className={`bg-teal-50 rounded-2xl p-6 border-2 border-teal-200 hover:shadow-lg transition-all cursor-pointer ${
                selectedTip === 'device_security' ? 'ring-2 ring-teal-400 border-teal-400' : ''
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
              
              {selectedTip === 'device_security' && (
                <div className="mt-4 space-y-3 text-left">
                  <div>
                    <h4 className="font-semibold text-teal-700 mb-2">📝 Langkah Detail:</h4>
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
                    <h4 className="font-semibold text-teal-700 mb-2">🔧 Tools & Aplikasi:</h4>
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
                  {selectedTip === 'device_security' ? "▲ Tutup detail" : "▼ Lihat detail"}
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
                <div className="bg-white rounded-xl p-4 border border-blue-300">
                  <div className="text-3xl mb-2">⏱️</div>
                  <p className="font-semibold text-blue-700">5-7 Menit</p>
                  <p className="text-blue-600 text-sm">Cepat & mudah</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-blue-300">
                  <div className="text-3xl mb-2">📱</div>
                  <p className="font-semibold text-blue-700">Mobile Friendly</p>
                  <p className="text-blue-600 text-sm">Bisa pakai HP</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-blue-300">
                  <div className="text-3xl mb-2">🔒</div>
                  <p className="font-semibold text-blue-700">Data Aman</p>
                  <p className="text-blue-600 text-sm">Privasi terjaga</p>
                </div>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="bg-white rounded-2xl shadow-lg border p-8">
              <h4 className="text-xl font-bold text-gray-700 mb-6">
                📱 Scan QR atau Klik Tombol
              </h4>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-center">
                  <div className="bg-gray-100 w-48 h-48 mx-auto rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
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
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-6 px-12 rounded-2xl shadow-xl transition-all transform hover:scale-105 text-xl"
                  >
                    <span className="text-2xl mr-3">🚀</span>
                    Mulai Pre-Test Sekarang!
                  </button>

                  <p className="text-gray-600 text-sm mt-4">
                    Atau buka: <br />
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">
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
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <div className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push("/")}
              className="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg transition-colors flex items-center"
            >
              <span className="mr-2">🏠</span>
              Home
            </button>
            <div>
              <h1 className="text-xl font-bold">
                🔐 Presentasi Keamanan Digital
              </h1>
              <p className="text-blue-200 text-sm">
                Slide {currentSlide + 1} dari {slides.length}:{" "}
                {slides[currentSlide].title}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="bg-blue-500 hover:bg-blue-400 disabled:bg-blue-700 disabled:opacity-50 px-4 py-2 rounded-lg transition-colors"
            >
              ← Prev
            </button>
            <span className="text-blue-200 text-sm px-3">
              {currentSlide + 1}/{slides.length}
            </span>
            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="bg-blue-500 hover:bg-blue-400 disabled:bg-blue-700 disabled:opacity-50 px-4 py-2 rounded-lg transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Slide Content */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div
            className="slide-content min-h-[80vh] flex items-center justify-center"
            style={{
              animation: "slideIn 0.3s ease-in-out",
            }}
          >
            {slides[currentSlide].content}
          </div>
        </div>
      </div>

      {/* Slide Indicator */}
      <div className="bg-gray-100 border-t p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center space-x-2 mb-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide
                    ? "bg-blue-600 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          <div className="text-center text-gray-600 text-sm">
            <p>💡 Gunakan tombol panah ← → atau spasi untuk navigasi</p>
            <p>Tekan ESC untuk kembali ke home</p>
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .slide-content {
          animation: slideIn 0.3s ease-in-out;
        }

        @media (max-width: 768px) {
          .slide-content {
            min-height: 70vh;
          }
        }
      `}</style>
    </div>
  );
};

export default PresentasiPage;
