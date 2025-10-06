import React, { useState } from "react";

interface ThreatCardData {
  id: string;
  title: string;
  icon: string;
  shortDesc: string;
  detailedInfo: {
    description: string;
    examples: string[];
    prevention: string[];
    warning_signs: string[];
  };
  color: string;
  bgColor: string;
}

interface TipCardData {
  id: string;
  title: string;
  icon: string;
  shortDesc: string;
  detailedInfo: {
    steps: string[];
    tools: string[];
    examples: string[];
  };
  color: string;
  bgColor: string;
}

const ThreatCards: React.FC = () => {
  const [selectedThreat, setSelectedThreat] = useState<string | null>(null);
  const [selectedTip, setSelectedTip] = useState<string | null>(null);

  const threats: ThreatCardData[] = [
    {
      id: "phishing",
      title: "Phishing",
      icon: "🎣",
      shortDesc: "Penipuan melalui link atau pesan palsu untuk mencuri data pribadi",
      detailedInfo: {
        description: "Phishing adalah teknik penipuan siber dimana penyerang menyamar sebagai entitas tepercaya untuk mencuri informasi sensitif seperti password, nomor kartu kredit, atau data pribadi lainnya.",
        examples: [
          "Email palsu dari 'bank' yang meminta update data rekening",
          "WhatsApp dari nomor asing mengaku customer service e-commerce",
          "Website palsu yang meniru tampilan situs resmi (misal: tokopedia-palsu.com)",
          "SMS mengaku dari operator seluler meminta konfirmasi data"
        ],
        prevention: [
          "Selalu cek URL website dengan teliti sebelum login",
          "Jangan klik link dari pesan yang mencurigakan",
          "Verifikasi langsung ke customer service resmi jika ragu",
          "Aktifkan autentikasi dua faktor (2FA) di akun penting",
          "Gunakan browser yang memiliki perlindungan anti-phishing"
        ],
        warning_signs: [
          "URL yang aneh atau tidak sesuai (misal: gooogle.com)",
          "Pesan dengan ancaman mendesak ('akun akan ditutup dalam 24 jam')",
          "Permintaan data sensitif melalui email/chat",
          "Kesalahan grammar atau bahasa yang janggal",
          "Pengirim yang tidak dikenal meminta informasi pribadi"
        ]
      },
      color: "text-red-600",
      bgColor: "bg-red-50 border-red-200"
    },
    {
      id: "social_engineering",
      title: "Social Engineering",
      icon: "🧠",
      shortDesc: "Manipulasi psikologis untuk membuat korban memberikan informasi rahasia",
      detailedInfo: {
        description: "Social Engineering adalah seni manipulasi manusia untuk mendapatkan akses tidak sah ke sistem atau informasi. Penyerang mengeksploitasi sifat manusia seperti kepercayaan, rasa takut, atau keinginan membantu.",
        examples: [
          "Telepon mengaku IT support meminta password untuk 'maintenance'",
          "Orang asing di kantor bertanya password WiFi sambil pura-pura bingung",
          "Chat mengaku teman meminjam uang dalam keadaan darurat",
          "Email mengaku atasan meminta transfer dana untuk keperluan mendesak"
        ],
        prevention: [
          "Selalu verifikasi identitas orang yang meminta informasi sensitif",
          "Jangan memberikan password atau PIN melalui telepon/chat",
          "Buat kebijakan ketat tentang berbagi informasi di tempat kerja",
          "Edukasi diri tentang teknik-teknik social engineering",
          "Gunakan protokol verifikasi berlapis untuk hal-hal penting"
        ],
        warning_signs: [
          "Permintaan informasi yang tidak wajar dari orang tidak dikenal",
          "Tekanan waktu yang berlebihan ('harus sekarang juga')",
          "Mengaku sebagai otoritas untuk meminta compliance",
          "Cerita yang terlalu dramatis atau mengharukan",
          "Tidak mau memberikan detail kontak atau verifikasi balik"
        ]
      },
      color: "text-purple-600",
      bgColor: "bg-purple-50 border-purple-200"
    },
    {
      id: "ransomware",
      title: "Ransomware",
      icon: "🔒",
      shortDesc: "Malware yang mengunci file dan meminta tebusan untuk membukanya",
      detailedInfo: {
        description: "Ransomware adalah jenis malware yang mengenkripsi file korban dan meminta pembayaran tebusan (ransom) untuk memberikan kunci dekripsi. Ini adalah salah satu ancaman siber paling merusak untuk individu dan organisasi.",
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
          "Hindari membuka attachment email dari pengirim tidak dikenal",
          "Aktifkan firewall dan gunakan DNS filtering"
        ],
        warning_signs: [
          "Komputer tiba-tiba menjadi sangat lambat",
          "File-file penting tidak bisa dibuka atau corrupt",
          "Muncul file README atau instruksi pembayaran di desktop",
          "Aktivitas network yang tidak biasa",
          "Proses yang tidak dikenal berjalan di task manager"
        ]
      },
      color: "text-orange-600",
      bgColor: "bg-orange-50 border-orange-200"
    },
    {
      id: "weak_passwords",
      title: "Password Lemah",
      icon: "🔑",
      shortDesc: "Penggunaan password yang mudah ditebak memudahkan akses tidak sah",
      detailedInfo: {
        description: "Password lemah adalah salah satu celah keamanan paling umum. Password yang mudah ditebak, terlalu pendek, atau menggunakan informasi pribadi dapat dengan mudah dipecahkan oleh penyerang menggunakan berbagai teknik.",
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
          "Ganti password secara berkala, terutama setelah insiden keamanan",
          "Jangan gunakan informasi pribadi yang mudah diketahui orang lain"
        ],
        warning_signs: [
          "Notifikasi login dari lokasi atau device yang tidak dikenal",
          "Akun mengirim pesan atau post yang tidak Anda buat",
          "Setting akun berubah tanpa sepengetahuan Anda",
          "Email konfirmasi untuk aktivitas yang tidak Anda lakukan",
          "Teman melaporkan menerima pesan aneh dari akun Anda"
        ]
      },
      color: "text-blue-600",
      bgColor: "bg-blue-50 border-blue-200"
    }
  ];

  const tips: TipCardData[] = [
    {
      id: "strong_passwords",
      title: "Membuat Password Kuat",
      icon: "🛡️",
      shortDesc: "Cara membuat dan mengelola password yang aman",
      detailedInfo: {
        steps: [
          "Gunakan minimal 12 karakter (semakin panjang semakin baik)",
          "Kombinasikan huruf besar, huruf kecil, angka, dan simbol",
          "Hindari kata yang ada di kamus atau informasi pribadi",
          "Buat password unik untuk setiap akun penting",
          "Gunakan teknik passphrase: gabungkan 4-5 kata random dengan simbol"
        ],
        tools: [
          "Password Manager: Bitwarden, LastPass, 1Password",
          "Generator Password: built-in di browser atau password manager",
          "2FA Apps: Google Authenticator, Authy, Microsoft Authenticator",
          "Checker keamanan: HaveIBeenPwned untuk cek kebocoran data"
        ],
        examples: [
          "Passphrase: Kucing#Laut$Terbang9!Merah = 28 karakter, mudah diingat",
          "Substitusi: P@ssw0rd123! (tapi ini sudah terlalu umum, jangan dipakai)",
          "Kombinasi acak: Xy9#mK$3nP2q (susah diingat, pakai password manager)"
        ]
      },
      color: "text-green-600",
      bgColor: "bg-green-50 border-green-200"
    },
    {
      id: "safe_browsing",
      title: "Browsing Aman",
      icon: "🌐",
      shortDesc: "Tips menjelajah internet dengan aman",
      detailedInfo: {
        steps: [
          "Selalu periksa URL sebelum memasukkan data sensitif",
          "Cari ikon gembok (🔒) di address bar untuk situs HTTPS",
          "Jangan download software dari situs yang tidak terpercaya",
          "Gunakan adblocker untuk mencegah iklan berbahaya",
          "Log out dari akun penting setelah selesai digunakan"
        ],
        tools: [
          "Browser aman: Chrome, Firefox, Edge dengan security update terbaru",
          "Extensions: uBlock Origin, HTTPS Everywhere, Privacy Badger",
          "DNS: Cloudflare (1.1.1.1), Quad9 (9.9.9.9) untuk filter malware",
          "VPN terpercaya jika menggunakan WiFi public"
        ],
        examples: [
          "✅ https://www.tokopedia.com (aman, HTTPS + domain resmi)",
          "❌ http://tokopedia-promo.tk (tidak aman, HTTP + domain mencurigakan)",
          "✅ Download dari Google Play Store / App Store resmi",
          "❌ Download APK dari situs random"
        ]
      },
      color: "text-indigo-600",
      bgColor: "bg-indigo-50 border-indigo-200"
    },
    {
      id: "social_media_privacy",
      title: "Privasi Media Sosial",
      icon: "📱",
      shortDesc: "Mengamankan akun dan data di media sosial",
      detailedInfo: {
        steps: [
          "Set profile ke private, jangan public untuk semua orang",
          "Review dan hapus informasi pribadi yang tidak perlu",
          "Periksa app permissions yang terhubung ke akun media sosial",
          "Jangan posting lokasi real-time atau info pribadi sensitif",
          "Block dan report akun mencurigakan atau spam"
        ],
        tools: [
          "Privacy settings di setiap platform (Instagram, Facebook, TikTok, X)",
          "2FA untuk semua akun media sosial",
          "App review: hapus aplikasi yang tidak digunakan dari connected apps",
          "Location services: matikan sharing lokasi otomatis"
        ],
        examples: [
          "❌ Post: 'Lagi liburan di Bali sampai minggu depan' (info untuk maling)",
          "✅ Post: 'Liburan seru!' (tanpa lokasi dan waktu spesifik)",
          "❌ Bio: 'Sekolah di SMAN1, rumah di Jl. Mangga No.10' (terlalu detail)",
          "✅ Bio: 'Student | Cat lover | Bookworm' (personal tapi tidak sensitif)"
        ]
      },
      color: "text-pink-600",
      bgColor: "bg-pink-50 border-pink-200"
    },
    {
      id: "device_security",
      title: "Keamanan Perangkat",
      icon: "📲",
      shortDesc: "Mengamankan smartphone dan komputer",
      detailedInfo: {
        steps: [
          "Aktifkan screen lock (PIN, pattern, biometrics) di semua device",
          "Install aplikasi hanya dari official store (Play Store/App Store)",
          "Update sistem operasi dan aplikasi secara rutin",
          "Backup data penting secara berkala",
          "Remote wipe/find my device untuk antisipasi kehilangan"
        ],
        tools: [
          "Antivirus mobile: Malwarebytes, Bitdefender (jika perlu)",
          "Backup: Google Drive, iCloud, atau external storage",
          "Find My Device: Google Find My Device, Apple Find My",
          "App permissions manager: built-in di Android/iOS settings"
        ],
        examples: [
          "✅ Download Instagram dari Google Play Store",
          "❌ Download Instagram MOD dari situs random",
          "✅ Lock screen dengan fingerprint + backup PIN",
          "❌ Tidak ada lock screen sama sekali",
          "✅ Auto-update apps untuk security patch",
          "❌ Ignore update notifications"
        ]
      },
      color: "text-teal-600",
      bgColor: "bg-teal-50 border-teal-200"
    }
  ];

  const ThreatCard: React.FC<{ threat: ThreatCardData }> = ({ threat }) => (
    <div
      onClick={() => setSelectedThreat(selectedThreat === threat.id ? null : threat.id)}
      className={`${threat.bgColor} border-2 rounded-lg p-4 cursor-pointer hover:shadow-md transition-all duration-200 ${
        selectedThreat === threat.id ? "ring-2 ring-blue-300" : ""
      }`}
    >
      <div className="flex items-start space-x-3">
        <span className="text-2xl">{threat.icon}</span>
        <div className="flex-1">
          <h3 className={`font-semibold text-lg ${threat.color}`}>{threat.title}</h3>
          <p className="text-gray-600 text-sm mt-1">{threat.shortDesc}</p>
          
          {selectedThreat === threat.id && (
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">📋 Penjelasan Lengkap:</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{threat.detailedInfo.description}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-2">⚠️ Contoh Serangan:</h4>
                <ul className="space-y-1">
                  {threat.detailedInfo.examples.map((example, idx) => (
                    <li key={idx} className="text-gray-700 text-sm flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-2">🛡️ Cara Pencegahan:</h4>
                <ul className="space-y-1">
                  {threat.detailedInfo.prevention.map((prevention, idx) => (
                    <li key={idx} className="text-gray-700 text-sm flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      {prevention}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-2">🚨 Tanda Bahaya:</h4>
                <ul className="space-y-1">
                  {threat.detailedInfo.warning_signs.map((sign, idx) => (
                    <li key={idx} className="text-gray-700 text-sm flex items-start">
                      <span className="text-yellow-500 mr-2">⚡</span>
                      {sign}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          <div className="mt-3 text-right">
            <span className="text-xs text-gray-500">
              {selectedThreat === threat.id ? "▲ Tutup detail" : "▼ Lihat detail"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const TipCard: React.FC<{ tip: TipCardData }> = ({ tip }) => (
    <div
      onClick={() => setSelectedTip(selectedTip === tip.id ? null : tip.id)}
      className={`${tip.bgColor} border-2 rounded-lg p-4 cursor-pointer hover:shadow-md transition-all duration-200 ${
        selectedTip === tip.id ? "ring-2 ring-blue-300" : ""
      }`}
    >
      <div className="flex items-start space-x-3">
        <span className="text-2xl">{tip.icon}</span>
        <div className="flex-1">
          <h3 className={`font-semibold text-lg ${tip.color}`}>{tip.title}</h3>
          <p className="text-gray-600 text-sm mt-1">{tip.shortDesc}</p>
          
          {selectedTip === tip.id && (
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">📝 Langkah-langkah:</h4>
                <ol className="space-y-1">
                  {tip.detailedInfo.steps.map((step, idx) => (
                    <li key={idx} className="text-gray-700 text-sm flex items-start">
                      <span className={`${tip.color} mr-2 font-medium`}>{idx + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-2">🔧 Tools & Aplikasi:</h4>
                <ul className="space-y-1">
                  {tip.detailedInfo.tools.map((tool, idx) => (
                    <li key={idx} className="text-gray-700 text-sm flex items-start">
                      <span className="text-blue-500 mr-2">🔗</span>
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-2">💡 Contoh Praktis:</h4>
                <ul className="space-y-1">
                  {tip.detailedInfo.examples.map((example, idx) => (
                    <li key={idx} className="text-gray-700 text-sm flex items-start">
                      <span className="text-purple-500 mr-2">→</span>
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          <div className="mt-3 text-right">
            <span className="text-xs text-gray-500">
              {selectedTip === tip.id ? "▲ Tutup detail" : "▼ Lihat detail"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Threats Section */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            🚨 4 Ancaman Digital Utama
          </h2>
          <p className="text-gray-600">
            Klik pada setiap card untuk mempelajari lebih detail tentang ancaman dan cara mengatasinya
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {threats.map((threat) => (
            <ThreatCard key={threat.id} threat={threat} />
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            💡 Tips Keamanan Praktis
          </h2>
          <p className="text-gray-600">
            Panduan praktis untuk melindungi diri Anda di dunia digital
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {tips.map((tip) => (
            <TipCard key={tip.id} tip={tip} />
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-lg p-6 text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          🎯 Ingat: Keamanan Digital adalah Tanggung Jawab Bersama!
        </h3>
        <p className="text-gray-600 text-sm">
          Dengan memahami ancaman dan menerapkan tips keamanan, kita dapat menciptakan internet yang lebih aman untuk semua.
        </p>
      </div>
    </div>
  );
};

export default ThreatCards;
