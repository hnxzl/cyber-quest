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
  const router = useRouter();

  const sections = [
    {
      title: "Identitas (Opsional)",
      fields: ["student_name", "class", "gender"],
    },
    {
      title: "Kebiasaan Digital",
      fields: ["internet_hours", "favorite_platform", "received_suspicious"],
    },
    {
      title: "Pengetahuan Keamanan Digital",
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
      title: "Sikap & Kesadaran",
      fields: ["q_attitude_worry", "q_action_lottery"],
    },
  ];

  const questions = {
    student_name: {
      label: "Nama (opsional, bisa tulis inisial saja)",
      type: "text",
      placeholder: "Contoh: A.B atau Anonymous",
    },
    class: {
      label: "Kelas",
      type: "select",
      options: [
        "X IPA 1",
        "X IPA 2",
        "X IPS 1",
        "X IPS 2",
        "XI IPA 1",
        "XI IPA 2",
        "XI IPS 1",
        "XI IPS 2",
      ],
    },
    gender: {
      label: "Jenis kelamin (opsional)",
      type: "radio",
      options: [
        { value: "male", label: "Laki-laki" },
        { value: "female", label: "Perempuan" },
        { value: "skip", label: "Tidak ingin menjawab" },
      ],
    },
    internet_hours: {
      label:
        "Berapa lama rata-rata waktu kamu menggunakan internet/hp dalam sehari?",
      type: "radio",
      options: [
        { value: "<2", label: "< 2 jam" },
        { value: "2-5", label: "2–5 jam" },
        { value: "6-10", label: "6–10 jam" },
        { value: ">10", label: "> 10 jam" },
      ],
    },
    favorite_platform: {
      label: "Media sosial apa yang paling sering kamu gunakan?",
      type: "radio",
      options: [
        { value: "WhatsApp", label: "WhatsApp" },
        { value: "Instagram", label: "Instagram" },
        { value: "TikTok", label: "TikTok" },
        { value: "Facebook", label: "Facebook" },
        { value: "Lainnya", label: "Lainnya" },
      ],
    },
    received_suspicious: {
      label:
        "Pernahkah kamu menerima pesan/link mencurigakan (misalnya undangan hadiah, minta OTP, dll)?",
      type: "boolean",
      options: [
        { value: true, label: "Ya" },
        { value: false, label: "Tidak" },
      ],
    },
    q_phishing: {
      label: "Apa yang dimaksud dengan phishing?",
      type: "radio",
      options: [
        { value: "virus", label: "Virus komputer yang merusak data" },
        {
          value: "link_palsu",
          label: "Link atau pesan palsu untuk mencuri data",
        },
        { value: "aplikasi", label: "Aplikasi chatting" },
        { value: "tidak_tahu", label: "Tidak tahu" },
      ],
      correct: "link_palsu",
    },
    q_otp_request: {
      label:
        "Jika kamu mendapatkan pesan WhatsApp dari nomor asing yang meminta kode OTP, apa yang sebaiknya dilakukan?",
      type: "radio",
      options: [
        { value: "beri_otp", label: "Memberikan kode OTP agar cepat selesai" },
        {
          value: "jangan_beri",
          label: "Mengabaikan / tidak memberikan kode OTP",
        },
        { value: "balas_kasar", label: "Membalas dengan kata-kata kasar" },
        { value: "tidak_tahu", label: "Tidak tahu" },
      ],
      correct: "jangan_beri",
    },
    q_password_strong: {
      label: "Password yang kuat biasanya memiliki ciri:",
      type: "radio",
      options: [
        {
          value: "nama_tgl",
          label: "Menggunakan nama sendiri atau tanggal lahir",
        },
        { value: "angka_berurutan", label: "Hanya angka berurutan (123456)" },
        {
          value: "kombinasi",
          label: "Kombinasi huruf besar, huruf kecil, angka, dan simbol",
        },
        { value: "tidak_tahu", label: "Tidak tahu" },
      ],
      correct: "kombinasi",
    },
    q_app_permissions: {
      label:
        "Jika sebuah aplikasi meminta akses penuh ke galeri, kontak, dan mikrofon padahal tidak relevan, apa tindakan yang benar?",
      type: "radio",
      options: [
        {
          value: "beri_semua",
          label: "Memberikan semua izin agar aplikasi jalan",
        },
        { value: "tolak_izin", label: "Menolak izin yang tidak relevan" },
        { value: "tetap_install", label: "Tetap install walau curiga" },
        { value: "tidak_tahu", label: "Tidak tahu" },
      ],
      correct: "tolak_izin",
    },
    q_social_engineering: {
      label: "Apa yang dimaksud dengan social engineering?",
      type: "radio",
      options: [
        {
          value: "metode_komputer",
          label: "Metode untuk mempercepat komputer",
        },
        {
          value: "manipulasi_psikologis",
          label:
            "Manipulasi psikologis untuk membuat orang memberikan data pribadinya",
        },
        { value: "aplikasi_foto", label: "Nama aplikasi pengeditan foto" },
        { value: "tidak_tahu", label: "Tidak tahu" },
      ],
      correct: "manipulasi_psikologis",
    },
    q_ransomware: {
      label: "Ransomware adalah...",
      type: "radio",
      options: [
        { value: "game", label: "Game RPG terkenal" },
        {
          value: "jenis_malware",
          label: "Jenis malware yang mengunci file dan meminta tebusan",
        },
        { value: "antivirus", label: "Antivirus terbaru" },
        { value: "tidak_tahu", label: "Tidak tahu" },
      ],
      correct: "jenis_malware",
    },
    q_attitude_worry: {
      label:
        "Apakah kamu merasa khawatir data pribadi (foto, akun medsos) bisa dipakai orang lain?",
      type: "boolean",
      options: [
        { value: true, label: "Ya" },
        { value: false, label: "Tidak" },
      ],
    },
    q_action_lottery: {
      label:
        "Jika kamu mendapatkan link undian berhadiah dari teman, apa yang akan kamu lakukan?",
      type: "radio",
      options: [
        { value: "klik_langsung", label: "Klik langsung link tersebut" },
        { value: "tanya_dulu", label: "Tanya dulu ke teman/guru sebelum klik" },
        { value: "abaikan", label: "Abaikan" },
        { value: "tidak_tahu", label: "Tidak tahu" },
      ],
      correct: "tanya_dulu",
    },
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      setShowConsent(true);
    }
  };

  const previousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const submitForm = async () => {
    if (!formData.consent) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          type,
          ip_hash: await generateIPHash(),
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const generateIPHash = async () => {
    // Simple client-side hash (in production, do this server-side)
    const userAgent = navigator.userAgent;
    const timestamp = Date.now().toString();
    const data = userAgent + timestamp;

    // Use Web Crypto API for client-side hashing
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .substring(0, 16);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {type === "pre" ? "Pre-Test" : "Post-Test"} Berhasil Dikirim!
          </h2>
          <p className="text-gray-600 mb-6">
            Terima kasih atas partisipasinya dalam penelitian keamanan digital
            SMAN 1 Katapang.
          </p>
          {type === "pre" && (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 text-left">
              <p className="text-sm text-blue-700">
                <strong>Selanjutnya:</strong> Nanti Anda akan diundang untuk
                main game edukasi keamanan siber (uji coba).
              </p>
            </div>
          )}
          <button
            onClick={() => router.push("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  if (showConsent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Persetujuan Penelitian
          </h2>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <h3 className="font-semibold text-yellow-800 mb-2">
              Informasi Penelitian:
            </h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Penelitian skripsi tentang keamanan digital</li>
              <li>• Data akan dianonymisasi</li>
              <li>• Tidak ada data pribadi yang dipublikasi</li>
              <li>• Estimasi waktu: 5-7 menit</li>
            </ul>
          </div>

          <label className="flex items-start space-x-3 mb-6 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.consent}
              onChange={(e) => handleInputChange("consent", e.target.checked)}
              className="mt-1 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700 text-sm leading-relaxed">
              Saya setuju data yang saya isi dipakai untuk keperluan penelitian
              skripsi (anonymized). Saya memahami data ini tidak akan
              dipublikasikan secara individu.
            </span>
          </label>

          <div className="flex space-x-3">
            <button
              onClick={() => setShowConsent(false)}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Kembali
            </button>
            <button
              onClick={submitForm}
              disabled={!formData.consent || submitting}
              className={`flex-1 font-medium py-3 px-4 rounded-lg transition-colors ${
                formData.consent && !submitting
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {submitting ? "Mengirim..." : "Setuju & Kirim"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentSectionData = sections[currentSection];
  const progress = ((currentSection + 1) / sections.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {type === "pre" ? "Pre-Test" : "Post-Test"}: Keamanan Digital — SMAN
            1 Katapang
          </h1>
          <p className="text-gray-600">
            Bantu kami memahami tingkat kesadaran keamanan digital siswa
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>
              Bagian {currentSection + 1} dari {sections.length}
            </span>
            <span>{Math.round(progress)}% selesai</span>
          </div>
        </div>

        {/* Section Content */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="inline-block bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full mb-6">
            {currentSectionData.title}
          </div>

          <div className="space-y-6">
            {currentSectionData.fields.map((field) => {
              const question = questions[field as keyof typeof questions];
              return (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    {question.label}
                  </label>

                  {question.type === "text" && (
                    <input
                      type="text"
                      value={formData[field as keyof FormData] as string}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      placeholder={(question as any).placeholder}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  )}

                  {question.type === "select" && (
                    <select
                      value={formData[field as keyof FormData] as string}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Pilih kelas...</option>
                      {(question as any).options?.map((option: string) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}

                  {(question.type === "radio" ||
                    question.type === "boolean") && (
                    <div className="space-y-3">
                      {(question as any).options?.map((option: any) => (
                        <label
                          key={option.value}
                          className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name={field}
                            value={option.value}
                            checked={
                              formData[field as keyof FormData] === option.value
                            }
                            onChange={() =>
                              handleInputChange(field, option.value)
                            }
                            className="text-blue-600 focus:ring-blue-500 mr-3"
                          />
                          <span className="text-gray-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={previousSection}
            disabled={currentSection === 0}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              currentSection === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
            }`}
          >
            ← Sebelumnya
          </button>

          <button
            onClick={nextSection}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            {currentSection === sections.length - 1
              ? "Selesai →"
              : "Selanjutnya →"}
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-500">
          Data dikumpulkan hanya untuk keperluan penelitian akademik. Jika ingin
          menghapus data Anda, hubungi guru@sman1katapang.sch.id
        </div>
      </div>
    </div>
  );
};

export default ResearchForm;
