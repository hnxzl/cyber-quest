import React from "react";
import { useRouter } from "next/router";
import ThreatCards from "../components/ThreatCards";

const EducationPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/")}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-2"
              >
                <span>←</span>
                <span>Kembali ke Beranda</span>
              </button>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-800">
              Edukasi Keamanan Digital
            </h1>
            
            <div className="flex space-x-3">
              <button
                onClick={() => router.push("/pretest")}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Pre-Test
              </button>
              <button
                onClick={() => router.push("/game")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Main Game
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            🎓 Pusat Pembelajaran Keamanan Digital
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Selamat datang di pusat edukasi keamanan digital SMAN 1 Katapang! 
            Di sini Anda akan mempelajari tentang ancaman-ancaman digital yang paling umum 
            serta tips praktis untuk melindungi diri Anda di dunia maya.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 mt-6 text-sm">
            <div className="bg-blue-50 p-4 rounded-lg">
              <span className="text-blue-600 font-semibold">📚 Pelajari</span>
              <p className="text-gray-600 mt-1">4 ancaman digital utama yang harus diwaspadai</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <span className="text-green-600 font-semibold">🛡️ Terapkan</span>
              <p className="text-gray-600 mt-1">Tips praktis keamanan sehari-hari</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <span className="text-purple-600 font-semibold">🎯 Praktikkan</span>
              <p className="text-gray-600 mt-1">Uji pemahaman melalui game dan kuis</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <ThreatCards />

      {/* Footer */}
      <div className="bg-white border-t mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">
              📧 Punya pertanyaan? Hubungi: <strong>cyber@sman1katapang.sch.id</strong>
            </p>
            <p className="text-gray-500 text-xs">
              Penelitian Skripsi - Keamanan Digital untuk Siswa SMA | SMAN 1 Katapang 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationPage;
