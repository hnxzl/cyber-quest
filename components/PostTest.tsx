import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface Question {
  question: string;
  options: string[];
  correct: number;
}

const PostTest: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch("/api/tests/post1");
      const data = await response.json();
      if (data.success) {
        setQuestions(data.test.questions);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitTest();
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitTest = async () => {
    const userId = localStorage.getItem("cyberquest_user_id");
    if (!userId) return;

    try {
      const response = await fetch("/api/tests/post1/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          answers,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setScore(data.score);
        setShowResults(true);
      }
    } catch (error) {
      console.error("Error submitting test:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat soal post-test...</p>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Post-Test Selesai!
          </h2>
          <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-6 mb-6">
            <div className="text-4xl font-bold text-gray-800 mb-2">
              Skor Akhir: {score}%
            </div>
            <p className="text-gray-600">
              {score >= 80
                ? "🏆 Excellent! Kamu sudah memahami keamanan siber dengan baik!"
                : score >= 60
                ? "👍 Good! Kamu sudah cukup memahami konsep dasar."
                : "📚 Keep learning! Masih ada ruang untuk belajar lebih banyak."}
            </p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 text-left">
            <p className="text-sm text-yellow-700">
              <strong>Terima kasih!</strong> Data kamu membantu penelitian
              tentang efektivitas gamifikasi dalam pendidikan keamanan siber.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => router.push("/teacher-dashboard")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              📊 Lihat Dashboard Guru
            </button>
            <button
              onClick={() => router.push("/")}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              🏠 Kembali ke Beranda
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Post-Test CyberQuest
          </h1>
          <p className="text-gray-600">
            Mari lihat seberapa banyak yang sudah kamu pelajari!
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-green-500 to-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>
              Pertanyaan {currentQuestion + 1} dari {questions.length}
            </span>
            <span>{Math.round(progress)}% selesai</span>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            {currentQ?.question}
          </h3>

          <div className="space-y-3">
            {currentQ?.options?.map((option, index) => (
              <label
                key={index}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value={index}
                  checked={answers[currentQuestion] === index}
                  onChange={() => handleAnswer(index)}
                  className="text-blue-600 focus:ring-blue-500 mr-4"
                />
                <span className="text-gray-700 text-lg">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              currentQuestion === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
            }`}
          >
            ← Sebelumnya
          </button>

          <button
            onClick={nextQuestion}
            disabled={answers[currentQuestion] === undefined}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              answers[currentQuestion] === undefined
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : currentQuestion === questions.length - 1
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {currentQuestion === questions.length - 1
              ? "Selesai 🏁"
              : "Selanjutnya →"}
          </button>
        </div>

        {/* Motivation */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center bg-green-100 text-green-800 text-sm px-4 py-2 rounded-full">
            <span className="mr-2">💪</span>
            Tunjukkan apa yang sudah kamu pelajari dari CyberQuest!
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostTest;
