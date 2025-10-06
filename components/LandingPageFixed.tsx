import React from "react";
import { useRouter } from "next/router";

const LandingPage: React.FC = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/20">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="text-4xl animate-pulse">🔐</div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CyberQuest Research 🚀
              </h1>
              <p className="text-sm text-gray-600 flex items-center">
                <span className="mr-2">🏫</span>
                SMAN 1 Katapang - Penelitian Keamanan Digital
              </p>
            </div>
          </div>
          <button
            onClick={() => router.push("/my-dashboard")}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl"
          >
            📊 Dashboard Saya
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="text-6xl md:text-8xl mb-8 animate-bounce">🛡️</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 leading-tight px-2">
            Yuk, Ikut Penelitian Cyber Security! 🎉
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            Halo siswa SMAN 1 Katapang! 👋 Mari bantu penelitian tentang{" "}
            <span className="font-semibold text-purple-600">
              kesadaran keamanan digital
            </span>{" "}
            melalui kuis singkat yang seru! 🎯
          </p>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl max-w-2xl mx-auto">
            <p className="text-lg text-gray-800 flex items-center justify-center flex-wrap">
              <span className="text-2xl mr-2">✨</span>
              <span className="font-medium text-center">
                Isi survey dan dapatkan insight tentang cyber security!
              </span>
              <span className="text-2xl ml-2">✨</span>
            </p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/30 hover:shadow-2xl transition-all hover:scale-105">
            <div className="text-5xl mb-4 text-center">⏱️</div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
              5-7 Menit Aja!
            </h3>
            <p className="text-gray-600 text-center">
              Cepet banget, gak bakal ganggu jadwal kamu kok! 😊
            </p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/30 hover:shadow-2xl transition-all hover:scale-105">
            <div className="text-5xl mb-4 text-center">🔒</div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
              Data Super Aman
            </h3>
            <p className="text-gray-600 text-center">
              Privasi kamu terjaga 100%, gak ada yang bisa tau! 🛡️
            </p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/30 hover:shadow-2xl transition-all hover:scale-105">
            <div className="text-5xl mb-4 text-center">🎓</div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
              Buat Skripsi
            </h3>
            <p className="text-gray-600 text-center">
              Bantu penelitian akademik yang bermanfaat! 📚
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <button
            onClick={() => router.push("/form/pre")}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-6 px-10 rounded-2xl shadow-xl transition-all transform hover:scale-105 text-xl flex items-center justify-center"
          >
            <span className="text-2xl mr-3">📝</span>
            Mulai Pre-Test Yuk!
          </button>
          <button
            onClick={() => router.push("/form/post")}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-6 px-10 rounded-2xl shadow-xl transition-all transform hover:scale-105 text-xl flex items-center justify-center"
          >
            <span className="text-2xl mr-3">✅</span>
            Mulai Post-Test Yuk!
          </button>
        </div>

        {/* Fun Facts Section */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 shadow-xl border border-yellow-200 mb-12">
          <h3 className="text-2xl font-bold text-center mb-6 flex items-center justify-center">
            <span className="text-3xl mr-3">🤓</span>
            Tahukah Kamu?
            <span className="text-3xl ml-3">💡</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/70 rounded-xl p-4 border border-yellow-300">
              <p className="text-lg font-medium text-gray-800 mb-2 flex items-center">
                <span className="text-2xl mr-2">📱</span>
                95% remaja Indonesia aktif di media sosial
              </p>
              <p className="text-gray-600 text-sm">
                Tapi seberapa aman penggunaannya? 🤔
              </p>
            </div>
            <div className="bg-white/70 rounded-xl p-4 border border-yellow-300">
              <p className="text-lg font-medium text-gray-800 mb-2 flex items-center">
                <span className="text-2xl mr-2">🎣</span>1 dari 5 remaja pernah
                kena phishing
              </p>
              <p className="text-gray-600 text-sm">
                Yuk, belajar cara mengenali dan menghindarinya! 🛡️
              </p>
            </div>
          </div>
        </div>

        {/* Research Info */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/30">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center justify-center">
            <span className="text-2xl mr-2">ℹ️</span>
            Info Penelitian
          </h3>
          <div className="grid md:grid-cols-2 gap-8 text-gray-700">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                <span className="text-xl mr-2">🎯</span>
                Tujuan Penelitian:
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="text-lg mr-2">📊</span>
                  Mengukur tingkat kesadaran keamanan digital siswa
                </li>
                <li className="flex items-center">
                  <span className="text-lg mr-2">📈</span>
                  Mengevaluasi efektivitas edukasi keamanan siber
                </li>
                <li className="flex items-center">
                  <span className="text-lg mr-2">💡</span>
                  Mengembangkan strategi pembelajaran yang lebih baik
                </li>
              </ul>
            </div>
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                <span className="text-xl mr-2">🔒</span>
                Keamanan Data:
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="text-lg mr-2">👤</span>
                  Data akan dianonymisasi sepenuhnya
                </li>
                <li className="flex items-center">
                  <span className="text-lg mr-2">🚫</span>
                  Tidak ada informasi pribadi yang dipublikasi
                </li>
                <li className="flex items-center">
                  <span className="text-lg mr-2">🎓</span>
                  Hasil hanya digunakan untuk keperluan akademik
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 shadow-lg border border-purple-200">
            <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center justify-center">
              <span className="text-xl mr-2">💬</span>
              Butuh Bantuan?
            </h4>
            <p className="text-gray-600 mb-4">
              Ada pertanyaan atau kendala teknis? Hubungi kami ya! 😊
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:ezben76@gmail.com"
                className="bg-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center text-gray-700 hover:text-blue-600"
              >
                <span className="text-xl mr-2">📧</span>
                ezben76@gmail.com
              </a>
              <span className="text-gray-400">atau</span>
              <span className="bg-white px-4 py-2 rounded-xl shadow-md flex items-center text-gray-700">
                <span className="text-xl mr-2">📱</span>
                Tanya Aku Langsung
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm flex items-center justify-center">
            <span className="text-lg mr-2">❤️</span>
            Dibuat dengan sepenuh hati untuk SMAN 1 Katapang
            <span className="text-lg ml-2">🏫</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
