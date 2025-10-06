import React, { useState } from "react";
import { useRouter } from "next/router";

interface FormData {
  student_name: string;
  class: string;
  gender: string;
  internet_hours: string;
  favorite_platform: string;
  received_suspicious: boolean | null;
  q_phishing: string;
  q_otp_request: string;
  q_password_strong: string;
  q_app_permissions: string;
  q_social_engineering: string;
  q_ransomware: string;
  q_attitude_worry: boolean | null;
  q_action_lottery: string;
  consent: boolean;
}

const ResearchForm: React.FC<{ type: "pre" | "post" }> = ({ type }) => {
  const [formData, setFormData] = useState<FormData>({
    student_name: "",
    class: "",
    gender: "",
    internet_hours: "",
    favorite_platform: "",
    received_suspicious: null,
    q_phishing: "",
    q_otp_request: "",
    q_password_strong: "",
    q_app_permissions: "",
    q_social_engineering: "",
    q_ransomware: "",
    q_attitude_worry: null,
    q_action_lottery: "",
    consent: false,
  });

  const [currentSection, setCurrentSection] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const sections = [
    {
      title: "👤 Identitas Diri",
      subtitle: "Ceritakan sedikit tentang dirimu",
      emoji: "🌟",
      fields: ["student_name", "class", "gender"],
    },
    {
      title: "📱 Kebiasaan Digital",
      subtitle: "Bagaimana kamu menggunakan teknologi",
      emoji: "💫",
      fields: ["internet_hours", "favorite_platform", "received_suspicious"],
    },
    {
      title: "🧠 Pengetahuan Keamanan",
      subtitle: "Tes pengetahuan cyber security",
      emoji: "🔐",
      fields: [
        "q_phishing",
        "q_otp_request",
        "q_password_strong",
        "q_app_permissions",
        "q_social_engineering",
        "q_ransomware",
      ],
    },
    {
      title: "💭 Sikap & Kesadaran",
      subtitle: "Bagaimana sikapmu terhadap keamanan digital",
      emoji: "🎯",
      fields: ["q_attitude_worry", "q_action_lottery"],
    },
  ];

  const questions: Record<string, any> = {
    student_name: {
      label: "✨ Nama Lengkap",
      type: "text",
      placeholder: "Masukkan nama lengkap kamu",
      icon: "👨‍🎓",
      required: true,
    },
    class: {
      label: "🎓 Kelas",
      type: "select",
      icon: "📚",
      required: true,
      options: [
        "X IPA 1",
        "X IPA 2",
        "X IPS 1",
        "X IPS 2",
        "XI IPA 1",
        "XI IPA 2",
        "XI IPS 1",
        "XI IPS 2",
        "XII IPA 1",
        "XII IPA 2",
        "XII IPS 1",
        "XII IPS 2",
      ],
    },
    gender: {
      label: "👥 Jenis Kelamin",
      type: "radio",
      icon: "⚧️",
      required: true,
      options: [
        { value: "male", label: "👨 Laki-laki", emoji: "🙋‍♂️" },
        { value: "female", label: "👩 Perempuan", emoji: "🙋‍♀️" },
      ],
    },
    internet_hours: {
      label: "⏰ Berapa lama waktu kamu menggunakan internet/HP setiap hari?",
      type: "radio",
      icon: "📱",
      required: true,
      options: [
        { value: "<2", label: "⏱️ Kurang dari 2 jam", emoji: "🕐" },
        { value: "2-5", label: "⏰ 2-5 jam", emoji: "🕕" },
        { value: "6-10", label: "⏳ 6-10 jam", emoji: "🕙" },
        { value: ">10", label: "📱 Lebih dari 10 jam", emoji: "🕛" },
      ],
    },
    favorite_platform: {
      label: "💬 Media sosial apa yang paling sering kamu gunakan?",
      type: "radio",
      icon: "📲",
      required: true,
      options: [
        { value: "WhatsApp", label: "💚 WhatsApp", emoji: "📱" },
        { value: "Instagram", label: "📷 Instagram", emoji: "📸" },
        { value: "TikTok", label: "🎵 TikTok", emoji: "🎬" },
        { value: "Facebook", label: "👥 Facebook", emoji: "📘" },
        { value: "YouTube", label: "📺 YouTube", emoji: "🎥" },
        { value: "Twitter", label: "🐦 Twitter/X", emoji: "🔵" },
        { value: "Lainnya", label: "🌐 Lainnya", emoji: "💫" },
      ],
    },
    received_suspicious: {
      label: "🚨 Pernahkah kamu menerima pesan/link mencurigakan?",
      description:
        "Contoh: undangan hadiah, minta kode OTP, link download gratis, dll",
      type: "boolean",
      icon: "⚠️",
      required: true,
      options: [
        { value: true, label: "✅ Ya, pernah", emoji: "😰" },
        { value: false, label: "❌ Tidak pernah", emoji: "😌" },
      ],
    },
    q_phishing: {
      label: "🎣 Apa yang dimaksud dengan phishing?",
      type: "radio",
      icon: "🔍",
      required: true,
      options: [
        {
          value: "virus",
          label: "🦠 Virus komputer yang merusak data",
          emoji: "💻",
        },
        {
          value: "link_palsu",
          label: "🎣 Penipuan dengan link/pesan palsu untuk mencuri data",
          emoji: "🚫",
        },
        { value: "aplikasi", label: "📱 Aplikasi chatting biasa", emoji: "💬" },
        { value: "tidak_tahu", label: "🤷‍♀️ Tidak tahu", emoji: "❓" },
      ],
      correct: "link_palsu",
    },
    q_otp_request: {
      label:
        "📲 Jika ada nomor asing minta kode OTP WhatsApp kamu, apa yang sebaiknya dilakukan?",
      type: "radio",
      icon: "🔐",
      required: true,
      options: [
        {
          value: "beri_otp",
          label: "✅ Berikan kode OTP agar cepat selesai",
          emoji: "😅",
        },
        {
          value: "jangan_beri",
          label: "🚫 JANGAN berikan kode OTP apapun",
          emoji: "🛡️",
        },
        {
          value: "balas_kasar",
          label: "😡 Balas dengan kata-kata kasar",
          emoji: "💢",
        },
        { value: "tidak_tahu", label: "🤷‍♀️ Tidak tahu", emoji: "❓" },
      ],
      correct: "jangan_beri",
    },
    q_password_strong: {
      label: "🔑 Password yang kuat biasanya memiliki ciri:",
      type: "radio",
      icon: "🛡️",
      required: true,
      options: [
        {
          value: "nama_tgl",
          label: "📅 Menggunakan nama atau tanggal lahir",
          emoji: "🎂",
        },
        {
          value: "angka_berurutan",
          label: "🔢 Hanya angka berurutan (123456)",
          emoji: "📊",
        },
        {
          value: "kombinasi",
          label: "🎯 Kombinasi huruf besar, kecil, angka, dan simbol",
          emoji: "💪",
        },
        { value: "tidak_tahu", label: "🤷‍♀️ Tidak tahu", emoji: "❓" },
      ],
      correct: "kombinasi",
    },
    q_app_permissions: {
      label:
        "📂 Jika aplikasi game minta akses galeri, kontak, mikrofon padahal tidak perlu, tindakan yang benar?",
      type: "radio",
      icon: "⚙️",
      required: true,
      options: [
        {
          value: "kasih_akses",
          label: "✅ Kasih akses saja biar bisa main",
          emoji: "🎮",
        },
        {
          value: "tolak_akses",
          label: "🚫 Tolak atau batal install aplikasi",
          emoji: "🛡️",
        },
        { value: "acak_saja", label: "🎲 Pilih secara acak saja", emoji: "🤷‍♀️" },
        { value: "tidak_tahu", label: "❓ Tidak tahu", emoji: "🤔" },
      ],
      correct: "tolak_akses",
    },
    q_social_engineering: {
      label:
        '🗣️ Seseorang menelepon mengaku dari bank, minta data pribadi untuk "verifikasi keamanan". Apa yang kamu lakukan?',
      type: "radio",
      icon: "☎️",
      required: true,
      options: [
        {
          value: "beri_data",
          label: "📋 Berikan data karena dari bank",
          emoji: "🏦",
        },
        {
          value: "tutup_telpon",
          label: "📞 Tutup telpon dan hubungi bank langsung",
          emoji: "🛡️",
        },
        { value: "tanya_teman", label: "🤝 Tanya teman dulu", emoji: "👥" },
        { value: "tidak_tahu", label: "🤷‍♀️ Tidak tahu", emoji: "❓" },
      ],
      correct: "tutup_telpon",
    },
    q_ransomware: {
      label: "🔐 Apa itu ransomware?",
      type: "radio",
      icon: "💾",
      required: true,
      options: [
        {
          value: "antivirus",
          label: "🛡️ Software antivirus untuk melindungi komputer",
          emoji: "💻",
        },
        {
          value: "malware_enkripsi",
          label: "🔒 Malware yang mengunci file dan minta tebusan",
          emoji: "💰",
        },
        {
          value: "aplikasi_game",
          label: "🎮 Aplikasi game online",
          emoji: "🕹️",
        },
        { value: "tidak_tahu", label: "🤷‍♀️ Tidak tahu", emoji: "❓" },
      ],
      correct: "malware_enkripsi",
    },
    q_attitude_worry: {
      label:
        "😰 Apakah kamu khawatir data pribadi kamu disalahgunakan orang lain?",
      type: "boolean",
      icon: "🔒",
      required: true,
      options: [
        { value: true, label: "😟 Ya, saya khawatir", emoji: "😰" },
        { value: false, label: "😌 Tidak terlalu khawatir", emoji: "🤷‍♀️" },
      ],
    },
    q_action_lottery: {
      label:
        '🎉 Kamu dapat pesan "SELAMAT! Kamu menang hadiah 10 juta, klik link ini". Apa yang kamu lakukan?',
      type: "radio",
      icon: "🎁",
      required: true,
      options: [
        {
          value: "klik_link",
          label: "🖱️ Langsung klik link karena penasaran",
          emoji: "🤩",
        },
        { value: "abaikan", label: "🚫 Abaikan dan hapus pesan", emoji: "🗑️" },
        { value: "share_teman", label: "📤 Share ke teman-teman", emoji: "👥" },
        { value: "tidak_tahu", label: "🤷‍♀️ Tidak tahu", emoji: "❓" },
      ],
      correct: "abaikan",
    },
  };

  // Validation function
  const validateSection = (sectionIndex: number) => {
    const newErrors: Record<string, string> = {};
    const currentFields = sections[sectionIndex].fields;

    currentFields.forEach((field) => {
      const question = questions[field];
      if (question.required) {
        const value = formData[field as keyof FormData];
        if (value === "" || value === null || value === undefined) {
          newErrors[field] = `${question.label} wajib diisi! 😊`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateSection(currentSection)) {
      if (currentSection < sections.length - 1) {
        setCurrentSection(currentSection + 1);
      } else {
        setShowConsent(true);
      }
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.consent) {
      alert("Harap centang persetujuan untuk melanjutkan! 😊");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          type,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const error = await response.json();
        alert(`Error: ${error.error} 😔`);
      }
    } catch (error) {
      alert("Gagal mengirim data. Coba lagi ya! 😊");
      console.error("Submit error:", error);
    }

    setSubmitting(false);
  };

  const renderField = (fieldName: string) => {
    const question = questions[fieldName];
    const value = formData[fieldName as keyof FormData];
    const error = errors[fieldName];

    return (
      <div key={fieldName} className="mb-6">
        <label className="block text-sm font-semibold text-gray-800 mb-3">
          <span className="text-2xl mr-2">{question.icon}</span>
          {question.label}
          {question.required && <span className="text-red-500 ml-1">*</span>}
        </label>

        {question.description && (
          <p className="text-xs text-gray-600 mb-3 ml-8 italic">
            {question.description}
          </p>
        )}

        {question.type === "text" && (
          <input
            type="text"
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${
              error
                ? "border-red-400 bg-red-50"
                : "border-gray-200 focus:border-blue-400"
            }`}
            placeholder={question.placeholder}
            value={value as string}
            onChange={(e) =>
              setFormData({ ...formData, [fieldName]: e.target.value })
            }
          />
        )}

        {question.type === "select" && (
          <select
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${
              error
                ? "border-red-400 bg-red-50"
                : "border-gray-200 focus:border-blue-400"
            }`}
            value={value as string}
            onChange={(e) =>
              setFormData({ ...formData, [fieldName]: e.target.value })
            }
          >
            <option value="">Pilih kelas kamu...</option>
            {question.options?.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}

        {(question.type === "radio" || question.type === "boolean") && (
          <div className="space-y-3">
            {question.options?.map((option: any, index: number) => (
              <label
                key={index}
                className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all hover:bg-blue-50 ${
                  value === option.value
                    ? "border-blue-400 bg-blue-50"
                    : error
                    ? "border-red-200"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >
                <input
                  type="radio"
                  name={fieldName}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [fieldName]:
                        question.type === "boolean"
                          ? option.value
                          : e.target.value,
                    })
                  }
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                    value === option.value
                      ? "border-blue-400 bg-blue-400"
                      : "border-gray-300"
                  }`}
                >
                  {value === option.value && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <span className="text-2xl mr-3">{option.emoji}</span>
                <span className="text-sm font-medium">{option.label}</span>
              </label>
            ))}
          </div>
        )}

        {error && <p className="text-red-500 text-sm mt-2 ml-8">{error}</p>}
      </div>
    );
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Berhasil Terkirim!
          </h2>
          <p className="text-gray-600 mb-6">
            Terima kasih sudah mengisi{" "}
            {type === "pre" ? "pre-test" : "post-test"}! Data kamu sangat
            berharga untuk penelitian ini 💖
          </p>
          <button
            onClick={() => router.push("/")}
            className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
          >
            🏠 Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  if (showConsent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">📋</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Persetujuan Penelitian
            </h2>
            <p className="text-gray-600">
              Mohon baca dan setujui sebelum mengirim data
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 mb-6 text-sm">
            <h3 className="font-semibold text-blue-800 mb-3">
              🔒 Informasi Penelitian:
            </h3>
            <ul className="space-y-2 text-blue-700">
              <li>
                • Data akan digunakan untuk penelitian akademik tentang
                kesadaran keamanan digital
              </li>
              <li>
                • Data kamu akan dijaga kerahasiaannya dan tidak disebarluaskan
              </li>
              <li>• Kamu bisa menarik partisipasi kapan saja</li>
              <li>• Tidak ada risiko dari partisipasi ini</li>
            </ul>
          </div>

          <label className="flex items-start p-4 border-2 rounded-xl cursor-pointer mb-6 hover:bg-blue-50 transition-colors">
            <input
              type="checkbox"
              checked={formData.consent}
              onChange={(e) =>
                setFormData({ ...formData, consent: e.target.checked })
              }
              className="mt-1 mr-3"
            />
            <span className="text-sm">
              <span className="text-lg mr-2">✅</span>
              Saya setuju untuk berpartisipasi dalam penelitian ini dan data
              saya digunakan untuk tujuan akademik
            </span>
          </label>

          <div className="flex space-x-4">
            <button
              onClick={() => setShowConsent(false)}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
            >
              ⬅️ Kembali
            </button>
            <button
              onClick={handleSubmit}
              disabled={!formData.consent || submitting}
              className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? "📤 Mengirim..." : "🚀 Kirim Data"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentSectionData = sections[currentSection];
  const progress = ((currentSection + 1) / sections.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold text-gray-800">
              🔐 CyberQuest {type === "pre" ? "Pre-Test" : "Post-Test"}
            </h1>
            <p className="text-gray-600 mt-2">
              Penelitian Kesadaran Keamanan Digital
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-center text-sm text-gray-600">
            Bagian {currentSection + 1} dari {sections.length} •{" "}
            {Math.round(progress)}% selesai
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="text-center mb-8">
            <div className="text-4xl mb-2">{currentSectionData.emoji}</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {currentSectionData.title}
            </h2>
            <p className="text-gray-600">{currentSectionData.subtitle}</p>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            {currentSectionData.fields.map(renderField)}

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentSection === 0}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                ⬅️ Sebelumnya
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors"
              >
                {currentSection === sections.length - 1
                  ? "✅ Selesai"
                  : "Lanjut ➡️"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResearchForm;
