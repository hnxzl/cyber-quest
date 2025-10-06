import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface Submission {
  id: string;
  created_at: string;
  type: string;
  class: string;
  student_name: string;
}

interface Stats {
  total_pre: number;
  total_post: number;
  by_class: Record<string, number>;
  recent_submissions: Submission[];
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const authStatus = localStorage.getItem("cyberquest_admin_auth");
    if (authStatus === "true") {
      setAuthenticated(true);
      fetchStats();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check (in production, use proper auth)
    if (password === "sman1katapang2024") {
      localStorage.setItem("cyberquest_admin_auth", "true");
      setAuthenticated(true);
      fetchStats();
    } else {
      alert("Password salah");
    }
  };

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/stats");
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateQRLink = (type: "pre" | "post", className?: string) => {
    const baseUrl = window.location.origin;
    const url = `${baseUrl}/form/${type}${
      className ? `?class=${encodeURIComponent(className)}` : ""
    }`;
    navigator.clipboard.writeText(url);
    alert(
      `Link ${
        type === "pre" ? "Pre-Test" : "Post-Test"
      } disalin ke clipboard:\n${url}`
    );
  };

  const exportCSV = async () => {
    try {
      const response = await fetch("/api/admin/export");
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `cyberquest-data-${
          new Date().toISOString().split("T")[0]
        }.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error exporting CSV:", error);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="text-4xl mb-4">🔐</div>
            <h2 className="text-2xl font-bold text-gray-800">
              Dashboard Admin
            </h2>
            <p className="text-gray-600">
              SMAN 1 Katapang - CyberQuest Research
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password Admin
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan password admin"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
              Masuk Dashboard
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/")}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← Kembali ke Beranda
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Memuat data dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Dashboard Admin
            </h1>
            <p className="text-gray-600">
              CyberQuest Research - SMAN 1 Katapang
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => router.push("/")}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm transition-colors"
            >
              🏠 Beranda
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("cyberquest_admin_auth");
                setAuthenticated(false);
              }}
              className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg text-sm transition-colors"
            >
              🚪 Keluar
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Pre-Test</p>
                <p className="text-2xl font-bold text-blue-600">
                  {stats?.total_pre || 0}
                </p>
              </div>
              <div className="text-3xl">📝</div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Post-Test</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats?.total_post || 0}
                </p>
              </div>
              <div className="text-3xl">📊</div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Kelas</p>
                <p className="text-2xl font-bold text-purple-600">
                  {stats?.by_class ? Object.keys(stats.by_class).length : 0}
                </p>
              </div>
              <div className="text-3xl">🏫</div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Response Rate</p>
                <p className="text-2xl font-bold text-orange-600">
                  {stats?.total_pre && stats?.total_post
                    ? Math.round((stats.total_post / stats.total_pre) * 100)
                    : 0}
                  %
                </p>
              </div>
              <div className="text-3xl">📈</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              🔗 Generate Links
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => generateQRLink("pre")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Copy Link Pre-Test
              </button>
              <button
                onClick={() => generateQRLink("post")}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Copy Link Post-Test
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              📥 Export Data
            </h3>
            <div className="space-y-3">
              <button
                onClick={exportCSV}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Download CSV
              </button>
              <button
                onClick={fetchStats}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Refresh Data
              </button>
            </div>
          </div>
        </div>

        {/* Class Breakdown */}
        {stats?.by_class && (
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              📊 Breakdown per Kelas
            </h3>
            <div className="grid md:grid-cols-4 gap-4">
              {Object.entries(stats.by_class).map(([className, count]) => (
                <div
                  key={className}
                  className="bg-gray-50 rounded-lg p-4 text-center"
                >
                  <p className="text-sm text-gray-600">{className}</p>
                  <p className="text-xl font-bold text-gray-800">
                    {count} siswa
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Submissions */}
        {stats?.recent_submissions && (
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              🕐 Submission Terbaru
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2">Waktu</th>
                    <th className="text-left py-2">Tipe</th>
                    <th className="text-left py-2">Kelas</th>
                    <th className="text-left py-2">Nama</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recent_submissions.map((submission) => (
                    <tr
                      key={submission.id}
                      className="border-b border-gray-100"
                    >
                      <td className="py-2 text-gray-600">
                        {new Date(submission.created_at).toLocaleString(
                          "id-ID"
                        )}
                      </td>
                      <td className="py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            submission.type === "pre"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {submission.type === "pre" ? "Pre-Test" : "Post-Test"}
                        </span>
                      </td>
                      <td className="py-2">{submission.class}</td>
                      <td className="py-2">
                        {submission.student_name || "Anonymous"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
