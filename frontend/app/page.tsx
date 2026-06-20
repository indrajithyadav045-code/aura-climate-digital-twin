import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white px-8 py-10">
      <nav className="flex justify-between items-center mb-20">
        <h1 className="text-2xl font-bold text-blue-400">AURA</h1>
        <p className="text-sm text-gray-400">TitanX Space Labs</p>
      </nav>

      <section className="max-w-5xl mx-auto text-center">
        <p className="text-blue-400 mb-4">ISRO BAH 2026 Project</p>

        <h2 className="text-5xl md:text-7xl font-bold mb-6">
          India&apos;s AI Climate Digital Twin
        </h2>

        <p className="text-gray-300 text-lg md:text-xl mb-10">
          AURA monitors live climate indicators, predicts heatwave, flood and
          drought risks, and generates AI-powered climate intelligence reports.
        </p>

        <Link href="/dashboard">
          <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold">
            Launch Dashboard
          </button>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <Feature title="Live Weather API" desc="Tracks real-time temperature, humidity and rainfall." />
          <Feature title="Climate Risk Score" desc="Predicts heatwave, flood and drought risk." />
          <Feature title="AI Report" desc="Generates professional climate intelligence reports." />
        </div>
      </section>
    </main>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-white/10 p-6 rounded-2xl border border-gray-800">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{desc}</p>
    </div>
  );
}
