import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface Submission {
  id: string;
  created_at: string;
  type: "pre" | "post";
  student_name: string;
  class: string;
  gender: string;
  internet_hours: string;
  favorite_platform: string;
  received_suspicious: boolean;
  q_phishing: string;
  q_otp_request: string;
  q_password_strong: string;
  q_app_permissions: string;
  q_social_engineering: string;
  q_ransomware: string;
  q_attitude_worry: boolean;
  q_action_lottery: string;
}

interface Stats {
  total: number;
  preTest: number;
  postTest: number;
  byClass: Record<string, number>;
  correctAnswers: Record<string, number>;
  recentSubmissions: Submission[];
}

const MyResearchDashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const router = useRouter();

  // Check authentication on load
  useEffect(() => {
    const savedAuth = localStorage.getItem("research_authenticated");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
      fetchStats();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats");
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
    setLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password - in real app, use proper authentication
    if (password === "myresearch2024") {
      setIsAuthenticated(true);
      localStorage.setItem("research_authenticated", "true");
      fetchStats();
    } else {
      alert("Password salah! 🔐");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("research_authenticated");
    setPassword("");
    router.push("/");
  };

  const exportData = () => {
    window.open("/api/admin/export", "_blank");
  };

  const copyLink = (type: "pre" | "post") => {
    const link = `${window.location.origin}/form/${type}`;
    navigator.clipboard.writeText(link);
    alert(`Link ${type}-test berhasil disalin! 📋`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">⚙️</div>
          <p className="text-xl text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🔐</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Dashboard Penelitian Saya
            </h2>
            <p className="text-gray-600">
              Masukkan password untuk mengakses data penelitian
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🔑 Password Dashboard
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
            >
              🚀 Masuk Dashboard
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/")}
              className="text-blue-500 hover:text-blue-600 text-sm"
            >
              ← Kembali ke Beranda
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😵</div>
          <p className="text-xl text-gray-600">Gagal memuat data...</p>
        </div>
      </div>
    );
  }

  const responseRate =
    stats.preTest > 0 ? Math.round((stats.postTest / stats.preTest) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                📊 Dashboard Penelitian Saya
                <span className="text-lg ml-2">🎓</span>
              </h1>
              <p className="text-gray-600 mt-1">
                Monitoring data penelitian kesadaran keamanan digital
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={exportData}
                className="bg-green-500 text-white px-4 py-2 rounded-xl font-medium hover:bg-green-600 transition-colors flex items-center"
              >
                📥 Export CSV
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-xl font-medium hover:bg-red-600 transition-colors"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Responden</p>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>
              <div className="text-4xl">👥</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Pre-Test</p>
                <p className="text-3xl font-bold">{stats.preTest}</p>
              </div>
              <div className="text-4xl">📝</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Post-Test</p>
                <p className="text-3xl font-bold">{stats.postTest}</p>
              </div>
              <div className="text-4xl">✅</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Response Rate</p>
                <p className="text-3xl font-bold">{responseRate}%</p>
              </div>
              <div className="text-4xl">📈</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-6">
          <div className="flex border-b">
            {[
              { id: "overview", label: "📊 Ringkasan", emoji: "📋" },
              { id: "classes", label: "🎓 Per Kelas", emoji: "📚" },
              { id: "answers", label: "🧠 Analisis Jawaban", emoji: "💡" },
              { id: "links", label: "🔗 Link Survey", emoji: "📱" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 p-4 text-center font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                <span className="text-xl mr-2">{tab.emoji}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    📈 Submisi Terbaru
                  </h3>
                  <div className="space-y-3">
                    {stats.recentSubmissions.slice(0, 5).map((submission) => (
                      <div
                        key={submission.id}
                        className="bg-gray-50 rounded-xl p-4 flex justify-between items-center"
                      >
                        <div>
                          <p className="font-medium text-gray-800">
                            {submission.student_name || "Anonymous"} -{" "}
                            {submission.class}
                          </p>
                          <p className="text-sm text-gray-600">
                            {submission.type === "pre"
                              ? "📝 Pre-test"
                              : "✅ Post-test"}{" "}
                            •
                            {new Date(submission.created_at).toLocaleDateString(
                              "id-ID",
                              {
                                day: "numeric",
                                month: "long",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                        </div>
                        <div className="text-2xl">
                          {submission.type === "pre" ? "📋" : "🎯"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "classes" && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  🎓 Distribusi Per Kelas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(stats.byClass).map(([className, count]) => (
                    <div
                      key={className}
                      className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-800">
                            {className}
                          </p>
                          <p className="text-2xl font-bold text-blue-600">
                            {count}
                          </p>
                        </div>
                        <div className="text-3xl">📚</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "answers" && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  🧠 Analisis Jawaban Benar
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(stats.correctAnswers).map(
                    ([question, percentage]) => {
                      const questionLabels: Record<string, string> = {
                        q_phishing: "🎣 Phishing",
                        q_otp_request: "🔐 OTP Request",
                        q_password_strong: "🔑 Password Kuat",
                        q_app_permissions: "📂 App Permissions",
                        q_social_engineering: "☎️ Social Engineering",
                        q_ransomware: "💾 Ransomware",
                      };

                      return (
                        <div
                          key={question}
                          className="bg-white border-2 border-gray-100 rounded-xl p-4"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-800">
                              {questionLabels[question] || question}
                            </h4>
                            <span className="text-2xl font-bold text-green-600">
                              {Math.round(percentage)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            )}

            {activeTab === "links" && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  🔗 Link Survey untuk Siswa
                </h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-800 mb-2">
                          📝 Pre-Test
                        </h4>
                        <p className="text-blue-600 text-sm mb-3">
                          Bagikan link ini untuk pre-test (sebelum pembelajaran)
                        </p>
                        <code className="bg-white px-3 py-1 rounded text-sm text-gray-700 border">
                          {typeof window !== "undefined" &&
                            `${window.location.origin}/form/pre`}
                        </code>
                      </div>
                      <button
                        onClick={() => copyLink("pre")}
                        className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors"
                      >
                        📋 Salin Link
                      </button>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-green-800 mb-2">
                          ✅ Post-Test
                        </h4>
                        <p className="text-green-600 text-sm mb-3">
                          Bagikan link ini untuk post-test (setelah
                          pembelajaran)
                        </p>
                        <code className="bg-white px-3 py-1 rounded text-sm text-gray-700 border">
                          {typeof window !== "undefined" &&
                            `${window.location.origin}/form/post`}
                        </code>
                      </div>
                      <button
                        onClick={() => copyLink("post")}
                        className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition-colors"
                      >
                        📋 Salin Link
                      </button>
                    </div>
                  </div>

                  <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
                    <h4 className="text-lg font-semibold text-yellow-800 mb-2">
                      💡 Tips Penggunaan:
                    </h4>
                    <ul className="text-yellow-700 text-sm space-y-1">
                      <li>
                        • Buat QR Code dari link di atas menggunakan generator
                        online
                      </li>
                      <li>
                        • Tampilkan QR code di papan tulis atau kirim via
                        WhatsApp grup
                      </li>
                      <li>
                        • Pastikan siswa mengisi pre-test sebelum pembelajaran
                        dimulai
                      </li>
                      <li>
                        • Post-test dilakukan setelah materi selesai diajarkan
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyResearchDashboard;
