import React, { useState } from "react";
import { useRouter } from "next/router";
import TouchButton from "./TouchButton";

const LandingPage: React.FC = () => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-x-hidden">
      {/* Mobile-First Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Header */}
          <div className="flex justify-between items-center py-4 md:hidden">
            <div className="flex items-center space-x-3">
              <div className="text-3xl animate-pulse">🔐</div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CyberQuest
                </h1>
                <p className="text-xs text-gray-600">SMAN 1 Katapang</p>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors touch-manipulation"
              style={{ minHeight: '44px', minWidth: '44px' }}
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="text-4xl animate-pulse">🔐</div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CyberQuest Research 🚀
                </h1>
                <p className="text-sm lg:text-base text-gray-600 flex items-center">
                  <span className="mr-2">🏫</span>
                  SMAN 1 Katapang - Penelitian Keamanan Digital
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <TouchButton
                onClick={() => router.push("/education")}
                variant="success"
                size="sm"
                className="text-sm lg:text-base px-4 lg:px-6"
              >
                <span>🎓</span>
                <span className="hidden sm:inline">Edukasi</span>
              </TouchButton>
              
              <TouchButton
                onClick={() => router.push("/presentasi")}
                variant="info"
                size="sm"
                className="text-sm lg:text-base px-4 lg:px-6"
              >
                <span>📽️</span>
                <span className="hidden sm:inline">Presentasi</span>
              </TouchButton>
              
              <TouchButton
                onClick={() => router.push("/my-dashboard")}
                variant="primary"
                size="sm"
                className="text-sm lg:text-base px-4 lg:px-6"
              >
                <span>📊</span>
                <span className="hidden sm:inline">Dashboard</span>
              </TouchButton>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-gray-200 mt-4 pt-4">
              <div className="flex flex-col space-y-3">
                <TouchButton
                  onClick={() => {
                    router.push("/education");
                    setMobileMenuOpen(false);
                  }}
                  variant="success"
                  size="md"
                  fullWidth
                  className="justify-start"
                >
                  <span className="text-lg">🎓</span>
                  <span>Edukasi Keamanan Digital</span>
                </TouchButton>
                
                <TouchButton
                  onClick={() => {
                    router.push("/presentasi");
                    setMobileMenuOpen(false);
                  }}
                  variant="info"
                  size="md"
                  fullWidth
                  className="justify-start"
                >
                  <span className="text-lg">📽️</span>
                  <span>Lihat Presentasi</span>
                </TouchButton>
                
                <TouchButton
                  onClick={() => {
                    router.push("/my-dashboard");
                    setMobileMenuOpen(false);
                  }}
                  variant="primary"
                  size="md"
                  fullWidth
                  className="justify-start"
                >
                  <span className="text-lg">📊</span>
                  <span>Dashboard Saya</span>
                </TouchButton>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile-First Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Mobile-Optimized Hero Section */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 sm:mb-8 animate-bounce">🛡️</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 leading-tight px-2">
            Yuk, Ikut Penelitian <br className="sm:hidden" />
            Cyber Security! 🎉
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-2 sm:px-4">
            Halo siswa SMAN 1 Katapang! 👋 Mari bantu penelitian tentang{" "}
            <span className="font-semibold text-purple-600">
              kesadaran keamanan digital
            </span>{" "}
            melalui kuis singkat yang seru! 🎯
          </p>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/30 shadow-xl max-w-3xl mx-auto">
            <p className="text-sm sm:text-base lg:text-lg text-gray-800 flex items-center justify-center flex-wrap gap-2">
              <span className="text-xl sm:text-2xl">✨</span>
              <span className="font-medium text-center">
                Isi survey dan dapatkan insight tentang cyber security!
              </span>
              <span className="text-xl sm:text-2xl">✨</span>
            </p>
          </div>
        </div>

        {/* Mobile-Optimized Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 lg:mb-16">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-white/30 hover:shadow-2xl transition-all hover:scale-105 touch-manipulation">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 text-center">⏱️</div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 text-center">
              5-7 Menit Aja!
            </h3>
            <p className="text-sm sm:text-base text-gray-600 text-center leading-relaxed">
              Cepet banget, gak bakal ganggu jadwal kamu kok! 😊
            </p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-white/30 hover:shadow-2xl transition-all hover:scale-105 touch-manipulation">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 text-center">🔒</div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 text-center">
              Data Super Aman
            </h3>
            <p className="text-sm sm:text-base text-gray-600 text-center leading-relaxed">
              Privasi kamu terjaga 100%, gak ada yang bisa tau! 🛡️
            </p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-white/30 hover:shadow-2xl transition-all hover:scale-105 touch-manipulation sm:col-span-2 lg:col-span-1">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 text-center">🎓</div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 text-center">
              Buat Skripsi
            </h3>
            <p className="text-sm sm:text-base text-gray-600 text-center leading-relaxed">
              Bantu penelitian akademik yang bermanfaat! 📚
            </p>
          </div>
        </div>

        {/* Mobile-Optimized Action Buttons */}
        <div className="flex flex-col gap-4 sm:gap-6 justify-center mb-12 lg:mb-16 max-w-2xl mx-auto">
          <TouchButton
            onClick={() => router.push("/form/pre")}
            variant="primary"
            size="lg"
            fullWidth
          >
            <span className="text-xl sm:text-2xl">📝</span>
            <span className="text-base sm:text-lg lg:text-xl">Mulai Pre-Test Yuk!</span>
          </TouchButton>
          
          <TouchButton
            onClick={() => router.push("/form/post")}
            variant="success"
            size="lg"
            fullWidth
          >
            <span className="text-xl sm:text-2xl">✅</span>
            <span className="text-base sm:text-lg lg:text-xl">Mulai Post-Test Yuk!</span>
          </TouchButton>
        </div>

        {/* Mobile-Optimized Presentation Section */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl border border-purple-200 mb-8 sm:mb-12">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-4 sm:mb-6 flex items-center justify-center flex-wrap gap-2">
            <span className="text-2xl sm:text-3xl">📽️</span>
            <span className="text-center">Lihat Presentasi Keamanan Digital</span>
            <span className="text-2xl sm:text-3xl">🎓</span>
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-purple-700 text-center mb-6 sm:mb-8 leading-relaxed px-2 max-w-3xl mx-auto">
            Sebelum mengisi pre-test, yuk lihat dulu presentasi tentang ancaman
            digital dan cara mengatasinya!
          </p>
          <div className="text-center">
            <TouchButton
              onClick={() => router.push("/presentasi")}
              variant="info"
              size="lg"
            >
              <span className="text-lg sm:text-xl">🚀</span>
              <span>Buka Presentasi</span>
            </TouchButton>
          </div>
        </div>

        {/* Mobile-Optimized Fun Facts Section */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl border border-yellow-200 mb-8 sm:mb-12">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-6 sm:mb-8 flex items-center justify-center flex-wrap gap-2">
            <span className="text-2xl sm:text-3xl">🤓</span>
            <span>Tahukah Kamu?</span>
            <span className="text-2xl sm:text-3xl">💡</span>
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white/70 rounded-xl p-4 sm:p-6 border border-yellow-300 hover:shadow-lg transition-all touch-manipulation">
              <p className="text-sm sm:text-base lg:text-lg font-medium text-gray-800 mb-2 flex items-start flex-wrap gap-2">
                <span className="text-xl sm:text-2xl flex-shrink-0">📱</span>
                <span className="flex-1">95% remaja Indonesia aktif di media sosial</span>
              </p>
              <p className="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed ml-6 sm:ml-8">
                Tapi seberapa aman penggunaannya? 🤔
              </p>
            </div>
            <div className="bg-white/70 rounded-xl p-4 sm:p-6 border border-yellow-300 hover:shadow-lg transition-all touch-manipulation">
              <p className="text-sm sm:text-base lg:text-lg font-medium text-gray-800 mb-2 flex items-start flex-wrap gap-2">
                <span className="text-xl sm:text-2xl flex-shrink-0">🎣</span>
                <span className="flex-1">1 dari 5 remaja pernah kena phishing</span>
              </p>
              <p className="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed ml-6 sm:ml-8">
                Yuk, belajar cara mengenali dan menghindarinya! 🛡️
              </p>
            </div>
          </div>
        </div>

        {/* Mobile-Optimized Education Section */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl border border-green-200 mb-8 sm:mb-12">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-4 sm:mb-6 flex items-center justify-center flex-wrap gap-2">
            <span className="text-2xl sm:text-3xl">🎓</span>
            <span className="text-center">Pelajari Keamanan Digital</span>
            <span className="text-2xl sm:text-3xl">🛡️</span>
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-green-700 text-center mb-6 sm:mb-8 leading-relaxed px-2 max-w-4xl mx-auto">
            Sebelum ikut survey, yuk pelajari dulu tentang 4 ancaman digital
            utama dan tips keamanannya! Semua dijelaskan dengan detail dan
            interaktif.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-white/70 rounded-xl p-4 sm:p-6 border border-green-300 hover:shadow-lg transition-all touch-manipulation">
              <div className="flex items-start mb-3 gap-3">
                <span className="text-xl sm:text-2xl flex-shrink-0">🎣</span>
                <div className="flex-1">
                  <span className="font-semibold text-gray-800 text-sm sm:text-base lg:text-lg block">
                    Phishing & Social Engineering
                  </span>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-1 leading-relaxed">
                    Pelajari cara mengenali dan menghindari penipuan digital
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/70 rounded-xl p-4 sm:p-6 border border-green-300 hover:shadow-lg transition-all touch-manipulation">
              <div className="flex items-start mb-3 gap-3">
                <span className="text-xl sm:text-2xl flex-shrink-0">🔒</span>
                <div className="flex-1">
                  <span className="font-semibold text-gray-800 text-sm sm:text-base lg:text-lg block">
                    Ransomware & Password
                  </span>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-1 leading-relaxed">
                    Tips melindungi file dan membuat password yang kuat
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <TouchButton
              onClick={() => router.push("/education")}
              variant="success"
              size="lg"
            >
              <span className="text-lg sm:text-xl">📚</span>
              <span>Mulai Belajar</span>
            </TouchButton>
          </div>
        </div>

        {/* Mobile-Optimized Research Info */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl border border-white/30">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-6 sm:mb-8 flex items-center justify-center gap-2">
            <span className="text-xl sm:text-2xl">ℹ️</span>
            <span>Info Penelitian</span>
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 text-gray-700">
            <div className="bg-blue-50 rounded-xl p-4 sm:p-6 border border-blue-200 hover:shadow-lg transition-all">
              <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-blue-800 mb-3 sm:mb-4 flex items-start gap-2">
                <span className="text-lg sm:text-xl flex-shrink-0">🎯</span>
                <span className="flex-1">Tujuan Penelitian:</span>
              </h4>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm lg:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-base sm:text-lg flex-shrink-0">📊</span>
                  <span className="flex-1 leading-relaxed">Mengukur tingkat kesadaran keamanan digital siswa</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-base sm:text-lg flex-shrink-0">📈</span>
                  <span className="flex-1 leading-relaxed">Mengevaluasi efektivitas edukasi keamanan siber</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-base sm:text-lg flex-shrink-0">💡</span>
                  <span className="flex-1 leading-relaxed">Mengembangkan strategi pembelajaran yang lebih baik</span>
                </li>
              </ul>
            </div>
            <div className="bg-green-50 rounded-xl p-4 sm:p-6 border border-green-200 hover:shadow-lg transition-all">
              <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-green-800 mb-3 sm:mb-4 flex items-start gap-2">
                <span className="text-lg sm:text-xl flex-shrink-0">🔒</span>
                <span className="flex-1">Keamanan Data:</span>
              </h4>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm lg:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-base sm:text-lg flex-shrink-0">👤</span>
                  <span className="flex-1 leading-relaxed">Data akan dianonymisasi sepenuhnya</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-base sm:text-lg flex-shrink-0">🚫</span>
                  <span className="flex-1 leading-relaxed">Tidak ada informasi pribadi yang dipublikasi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-base sm:text-lg flex-shrink-0">🎓</span>
                  <span className="flex-1 leading-relaxed">Hasil hanya digunakan untuk keperluan akademik</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile-Optimized Contact */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-purple-200">
            <h4 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center justify-center gap-2">
              <span className="text-lg sm:text-xl">💬</span>
              <span>Butuh Bantuan?</span>
            </h4>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed px-2">
              Ada pertanyaan atau kendala teknis? Hubungi kami ya! 😊
            </p>
            <div className="flex flex-col gap-3 sm:gap-4 justify-center items-center">
              <a
                href="mailto:ezben76@gmail.com"
                className="bg-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center text-gray-700 hover:text-blue-600 touch-manipulation text-sm sm:text-base w-full sm:w-auto justify-center"
                style={{ minHeight: '44px' }}
              >
                <span className="text-lg sm:text-xl mr-2 sm:mr-3">📧</span>
                ezben76@gmail.com
              </a>
              <span className="text-xs sm:text-sm text-gray-400">atau</span>
              <span className="bg-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-md flex items-center text-gray-700 text-sm sm:text-base w-full sm:w-auto justify-center" style={{ minHeight: '44px' }}>
                <span className="text-lg sm:text-xl mr-2 sm:mr-3">📱</span>
                Tanya Aku Langsung
              </span>
            </div>
          </div>
        </div>

        {/* Mobile-Optimized Footer */}
        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-gray-500 text-xs sm:text-sm lg:text-base flex items-center justify-center flex-wrap gap-1 sm:gap-2 leading-relaxed px-2">
            <span className="text-base sm:text-lg">❤️</span>
            <span>Dibuat dengan sepenuh hati untuk SMAN 1 Katapang</span>
            <span className="text-base sm:text-lg">🏫</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
