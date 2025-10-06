import { useRouter } from "next/router";
import ResearchForm from "../../components/ResearchForm";

export default function FormPage() {
  const router = useRouter();
  const { type } = router.query;

  if (!type || (type !== "pre" && type !== "post")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-100">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Form Tidak Valid
          </h1>
          <p className="text-gray-600 mb-6">
            Silakan gunakan link yang benar dari guru Anda.
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  return <ResearchForm type={type as "pre" | "post"} />;
}
