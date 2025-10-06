import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const SurprisePage: React.FC = () => {
  const [phase, setPhase] = useState<"initial" | "loading" | "revealed">(
    "initial"
  );
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  const handleLogin = () => {
    setPhase("loading");

    // Fake progress animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase("revealed"), 500);
          return 100;
        }
        return prev + 3;
      });
    }, 50);
  };

  const goBackToPresentation = () => {
    router.push("/presentasi");
  };

  useEffect(() => {
    // Add some dramatic effect after reveal
    if (phase === "revealed") {
      // Optional: Play a notification sound
      // new Audio('/notification.mp3').play().catch(() => {});
    }
  }, [phase]);

  if (phase === "initial") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 via-red-400 to-yellow-400 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 text-4xl animate-bounce">
            🎁
          </div>
          <div
            className="absolute top-20 right-20 text-3xl animate-bounce"
            style={{ animationDelay: "0.5s" }}
          >
            💎
          </div>
          <div
            className="absolute bottom-20 left-20 text-4xl animate-bounce"
            style={{ animationDelay: "1s" }}
          >
            🏆
          </div>
          <div
            className="absolute bottom-10 right-10 text-3xl animate-bounce"
            style={{ animationDelay: "1.5s" }}
          >
            ⭐
          </div>
          <div className="absolute top-1/2 left-1/4 text-2xl animate-spin">
            ✨
          </div>
          <div
            className="absolute top-1/3 right-1/4 text-2xl animate-spin"
            style={{ animationDelay: "1s" }}
          >
            🌟
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-12 max-w-2xl w-full text-center border-4 border-yellow-300 relative z-10">
          {/* Celebration Header */}
          <div className="mb-8">
            <div className="text-8xl mb-4 animate-bounce">🎉</div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent mb-4">
              SELAMAT!
            </h1>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              ANDA MENDAPAT HADIAH SPESIAL! 🎁
            </h2>
          </div>

          {/* Prize Description */}
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 mb-8 border-2 border-yellow-300">
            <div className="text-6xl mb-4">💰</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Pulsa Gratis Rp 100.000!
            </h3>
            <p className="text-gray-600 text-lg">
              Anda terpilih sebagai pemenang undian berhadiah dari SMAN 1
              Katapang!
            </p>
          </div>

          {/* Call to Action */}
          <div className="mb-6">
            <p className="text-gray-700 text-lg mb-6 font-medium">
              Silakan login dengan akun media sosial kamu untuk mengklaim hadiah
              😊
            </p>

            <div className="space-y-4">
              <button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-xl"
              >
                📱 Login dengan Instagram
              </button>

              <button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-xl"
              >
                📘 Login dengan Facebook
              </button>
            </div>
          </div>

          {/* Trust Indicators (Fake) */}
          <div className="flex justify-center items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <span className="text-green-500 mr-1">🔒</span>
              Aman & Terpercaya
            </div>
            <div className="flex items-center">
              <span className="text-blue-500 mr-1">✓</span>
              Verified Site
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center p-4">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-12 max-w-lg w-full text-center">
          <div className="mb-8">
            <div className="text-6xl mb-4 animate-spin">⏳</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Menghubungkan...
            </h2>
            <p className="text-gray-600">Sedang memverifikasi akun Anda</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="bg-gray-200 rounded-full h-4 mb-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">{progress}% Complete</p>
          </div>

          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div
              className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-3 h-3 bg-pink-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Alert Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 text-4xl animate-bounce text-red-600">
          ⚠️
        </div>
        <div
          className="absolute top-20 right-20 text-3xl animate-bounce text-red-600"
          style={{ animationDelay: "0.3s" }}
        >
          ⚠️
        </div>
        <div
          className="absolute bottom-20 left-20 text-4xl animate-bounce text-red-600"
          style={{ animationDelay: "0.6s" }}
        >
          ⚠️
        </div>
        <div
          className="absolute bottom-10 right-10 text-3xl animate-bounce text-red-600"
          style={{ animationDelay: "0.9s" }}
        >
          ⚠️
        </div>
      </div>

      {/* Main Revelation Content */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-12 max-w-3xl w-full text-center border-4 border-red-400 relative z-10 animate-pulse">
        {/* Alert Header */}
        <div className="mb-8">
          <div className="text-8xl mb-4 animate-bounce">😱</div>
          <h1 className="text-4xl font-black text-red-600 mb-4">KENA DEH!</h1>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Ini Cuma Simulasi Phishing!
          </h2>
        </div>

        {/* Educational Message */}
        <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl p-8 mb-8 border-2 border-red-300">
          <div className="text-6xl mb-4">🎭</div>
          <p className="text-xl font-bold text-gray-800 mb-4">
            Kalau ini situs beneran, data kamu udah bisa dicuri loh! 😰
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Ingat ya, <strong>jangan pernah login di situs mencurigakan</strong>
            . Selalu cek URL dengan teliti dan pastikan situs benar-benar resmi!
            🔒
          </p>
        </div>

        {/* Learning Points */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-yellow-100 rounded-2xl p-6 border-2 border-yellow-300">
            <div className="text-4xl mb-2">🚩</div>
            <h3 className="font-bold text-gray-800 mb-2">Red Flags Tadi:</h3>
            <ul className="text-sm text-gray-700 text-left space-y-1">
              <li>• Hadiah tanpa ikut lomba</li>
              <li>• Minta login untuk "claim"</li>
              <li>• URL mencurigakan</li>
              <li>• Terlalu bagus untuk dipercaya</li>
            </ul>
          </div>

          <div className="bg-green-100 rounded-2xl p-6 border-2 border-green-300">
            <div className="text-4xl mb-2">✅</div>
            <h3 className="font-bold text-gray-800 mb-2">
              Yang Harus Dilakukan:
            </h3>
            <ul className="text-sm text-gray-700 text-left space-y-1">
              <li>• Selalu cek URL resmi</li>
              <li>• Jangan mudah percaya hadiah gratis</li>
              <li>• Verifikasi ke sumber langsung</li>
              <li>• Gunakan 2FA di akun penting</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={goBackToPresentation}
            className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-bold py-4 px-8 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 text-xl"
          >
            🏠 Balik ke Materi Aman
          </button>

          <button
            onClick={() => window.close()}
            className="w-full bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 text-lg"
          >
            ❌ Tutup Tab Ini
          </button>
        </div>

        {/* Educational Footer */}
        <div className="mt-8 pt-6 border-t-2 border-gray-200">
          <p className="text-sm text-gray-600 leading-relaxed">
            ⚠️ <strong>Ini hanya simulasi edukatif</strong> yang dibuat untuk
            pembelajaran keamanan digital.
            <br />
            Tidak ada data disimpan. Jangan pernah login di situs yang
            mencurigakan! 💡
          </p>
        </div>

        <div className="mt-4 text-xs text-gray-500">
          🎓 Cyber Security Education - SMAN 1 Katapang
        </div>
      </div>
    </div>
  );
};

export default SurprisePage;
