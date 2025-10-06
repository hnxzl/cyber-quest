import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

interface Question {
  section?: string;
  question: string;
  type: "text" | "radio";
  options?: string[];
  correct?: number | null;
  required?: boolean;
}

const PreTest: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [showGameIntro, setShowGameIntro] = useState(false);
  const router = useRouter();

  useEffect(() => {
    createUser();
    fetchQuestions();
  }, []);

  const createUser = async () => {
    try {
      const response = await fetch("/api/auth/anon", { method: "POST" });
      const data = await response.json();
      if (data.success) {
        setUserId(data.user_id);
        localStorage.setItem("cyberquest_user_id", data.user_id);
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        "/api/tests/pre-test-cybersecurity-research"
      );
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

  const handleAnswer = (questionIndex: number, answer: string | number) => {
    setAnswers({ ...answers, [questionIndex]: answer });
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
    if (!userId) return;

    setSubmitting(true);
    try {
      const response = await fetch(
        "/api/tests/pre-test-cybersecurity-research/submit",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            answers: Object.values(answers),
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        setShowGameIntro(true);
      }
    } catch (error) {
      console.error("Error submitting test:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const startGame = () => {
    router.push("/game");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat soal pre-test...</p>
        </div>
      </div>
    );
  }

  if (showGameIntro) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md text-center">
          <div className="text-6xl mb-4">🎮</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Pre-Test Selesai!
          </h2>
          <p className="text-gray-600 mb-6">
            Terima kasih! Sekarang waktunya bermain game CyberQuest untuk
            belajar keamanan siber secara interaktif!
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 text-left">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-yellow-400 text-xl">⚡</span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Tip:</strong> Dalam game ini, kamu akan menghadapi
                  skenario keamanan siber nyata. Setiap pilihan mempengaruhi
                  skor dan pembelajaran!
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={startGame}
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            🚀 Mulai Game CyberQuest!
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Pre-Test CyberQuest
          </h1>
          <p className="text-gray-600">
            Bantu kami memahami pengetahuan awalmu tentang keamanan siber
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
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
          {currentQ?.section && (
            <div className="inline-block bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full mb-4">
              {currentQ.section}
            </div>
          )}

          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            {currentQ?.question}
          </h3>

          {currentQ?.type === "text" ? (
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ketik jawabanmu di sini..."
              value={answers[currentQuestion] || ""}
              onChange={(e) => handleAnswer(currentQuestion, e.target.value)}
            />
          ) : (
            <div className="space-y-3">
              {currentQ?.options?.map((option, index) => (
                <label
                  key={index}
                  className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={index}
                    checked={answers[currentQuestion] === index}
                    onChange={() => handleAnswer(currentQuestion, index)}
                    className="text-blue-600 focus:ring-blue-500 mr-3"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              currentQuestion === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
            }`}
          >
            ← Sebelumnya
          </button>

          <div className="text-sm text-gray-500">
            {currentQ?.required === false && "(Opsional)"}
          </div>

          <button
            onClick={nextQuestion}
            disabled={
              submitting ||
              (currentQ?.required !== false &&
                !answers.hasOwnProperty(currentQuestion))
            }
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              submitting ||
              (currentQ?.required !== false &&
                !answers.hasOwnProperty(currentQuestion))
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : currentQuestion === questions.length - 1
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {submitting
              ? "Mengirim..."
              : currentQuestion === questions.length - 1
              ? "Selesai 🎯"
              : "Selanjutnya →"}
          </button>
        </div>

        {/* Fun Element */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center bg-yellow-100 text-yellow-800 text-sm px-4 py-2 rounded-full">
            <span className="mr-2">🏆</span>
            Setiap jawaban membantumu mempersiapkan diri untuk adventure
            CyberQuest!
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreTest;
