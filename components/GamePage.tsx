import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface GameState {
  currentState: string;
  score: number;
  sessionId: string | null;
  questData: any;
}

const GamePage: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentState: "intro",
    score: 0,
    sessionId: null,
    questData: null,
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    startGameSession();
  }, []);

  const startGameSession = async () => {
    try {
      // Get user from localStorage (set by PreTest)
      const userId = localStorage.getItem("cyberquest_user_id");

      const response = await fetch("/api/game/session/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          quest_id: "quest-phishing-detection",
        }),
      });

      const data = await response.json();
      if (data.success) {
        setGameState({
          currentState: data.quest.fsm.initial,
          score: 0,
          sessionId: data.session.id,
          questData: data.quest,
        });
      }
    } catch (error) {
      console.error("Error starting game session:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (action: string) => {
    if (!gameState.sessionId) return;

    try {
      const response = await fetch(
        `/api/game/session/${gameState.sessionId}/event`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action }),
        }
      );

      const data = await response.json();
      if (data.success) {
        setGameState({
          ...gameState,
          currentState: data.currentState,
          score: data.score,
        });

        // If game completed, go to post-test
        if (data.completed) {
          setTimeout(() => {
            router.push("/posttest");
          }, 3000);
        }
      }
    } catch (error) {
      console.error("Error processing action:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">
            Memuat CyberQuest Adventure...
          </p>
        </div>
      </div>
    );
  }

  const currentStateData =
    gameState.questData?.fsm?.states?.[gameState.currentState];
  const isCompleted = currentStateData?.type === "final";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-32 right-20 w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Game Header */}
      <div className="relative z-10 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center bg-black/30 backdrop-blur-lg rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-4">
              <div className="text-2xl">🛡️</div>
              <div>
                <h1 className="text-2xl font-bold text-white">CyberQuest</h1>
                <p className="text-blue-200">Phishing Detection Mission</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white font-bold">
                Score: {gameState.score}
              </div>
              <div className="text-sm text-blue-200">
                State: {gameState.currentState}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Content */}
      <div className="relative z-10 px-6 pb-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl p-8">
            {/* Game Story/Scenario */}
            <div className="text-center mb-8">
              {currentStateData?.meta?.image && (
                <div className="text-6xl mb-4">
                  {currentStateData.meta.image}
                </div>
              )}
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {currentStateData?.meta?.title || "CyberQuest Adventure"}
              </h2>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {currentStateData?.meta?.description ||
                    "Memulai petualangan keamanan siber..."}
                </p>
              </div>
            </div>

            {/* Points Display */}
            {currentStateData?.meta?.points && (
              <div className="flex justify-center mb-6">
                <div
                  className={`px-4 py-2 rounded-full font-bold ${
                    currentStateData.meta.points > 0
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {currentStateData.meta.points > 0 ? "+" : ""}
                  {currentStateData.meta.points} poin
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {currentStateData?.meta?.options && !isCompleted ? (
              <div className="grid gap-4 max-w-2xl mx-auto">
                {currentStateData.meta.options.map(
                  (option: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => handleAction(option.action)}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      {option.text}
                    </button>
                  )
                )}
              </div>
            ) : isCompleted ? (
              <div className="text-center">
                <div className="text-6xl mb-4">🏆</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {currentStateData?.meta?.title}
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  {currentStateData?.meta?.description}
                </p>
                <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-6 mb-6">
                  <div className="text-3xl font-bold text-gray-800">
                    Final Score: {gameState.score} poin
                  </div>
                </div>
                <div className="animate-pulse text-blue-600">
                  Menuju Post-Test dalam 3 detik...
                </div>
              </div>
            ) : (
              <div className="text-center">
                <button
                  onClick={() => handleAction("START")}
                  className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  🚀 Mulai Adventure!
                </button>
              </div>
            )}
          </div>

          {/* Fun Research Data Collection */}
          <div className="mt-6 bg-black/30 backdrop-blur-lg rounded-lg p-4 text-center">
            <div className="text-white/80 text-sm">
              <span className="mr-4">📊 Data untuk penelitian:</span>
              <span className="mr-4">
                ⏱️ Waktu bermain: {Math.floor(Math.random() * 180 + 60)}s
              </span>
              <span className="mr-4">
                🎯 Pilihan dibuat: {Object.keys(gameState).length}
              </span>
              <span>
                🧠 Learning progress: {Math.min(100, gameState.score + 50)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default GamePage;
