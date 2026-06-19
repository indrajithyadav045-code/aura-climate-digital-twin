import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold mb-4">AURA</h1>

      <p className="text-xl text-gray-300 mb-8">
        AI-Powered Digital Twin of India's Climate
      </p>

      <Link href="/dashboard">
        <button className="bg-blue-600 px-6 py-3 rounded-xl hover:bg-blue-700">
          Launch Dashboard
        </button>
      </Link>
    </main>
  );
}