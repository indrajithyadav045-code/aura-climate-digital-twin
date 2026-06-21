import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white px-8 py-10">

      {/* Navbar */}
      <nav className="flex justify-between items-center mb-20">
        <h1 className="text-2xl font-bold text-cyan-400">
          AURA
        </h1>

        <p className="text-sm text-gray-400">
          TitanX Space Labs
        </p>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto text-center">

        <p className="text-cyan-400 mb-4">
          ISRO Bharatiya Antariksh Hackathon 2026
        </p>

        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          India's AI Climate Digital Twin
        </h1>

        <p className="text-gray-300 text-lg md:text-xl max-w-4xl mx-auto mb-10">
          AURA monitors live climate indicators, predicts heatwave,
          flood and drought risks, and generates AI-powered climate
          intelligence reports for climate resilience and disaster preparedness.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-4">

          <Link href="/dashboard">
            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold">
              Launch Dashboard
            </button>
          </Link>

          <Link href="/map">
            <button className="bg-cyan-600 hover:bg-cyan-700 px-8 py-4 rounded-xl font-semibold">
              Climate Map
            </button>
          </Link>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">

          <div className="bg-white/10 p-6 rounded-2xl border border-gray-800">
            <h3 className="text-3xl font-bold text-cyan-400">
              38
            </h3>
            <p className="text-gray-400 mt-2">
              States & UTs
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl border border-gray-800">
            <h3 className="text-3xl font-bold text-green-400">
              Live
            </h3>
            <p className="text-gray-400 mt-2">
              Weather Data
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl border border-gray-800">
            <h3 className="text-3xl font-bold text-red-400">
              3
            </h3>
            <p className="text-gray-400 mt-2">
              Risk Models
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl border border-gray-800">
            <h3 className="text-3xl font-bold text-yellow-400">
              AI
            </h3>
            <p className="text-gray-400 mt-2">
              Climate Advisor
            </p>
          </div>

        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">

          <Feature
            title="Live Weather API"
            desc="Tracks real-time temperature, humidity and rainfall from live weather sources."
          />

          <Feature
            title="Climate Risk Score"
            desc="Predicts heatwave, flood and drought risks using climate indicators."
          />

          <Feature
            title="AI Climate Report"
            desc="Generates climate intelligence insights and adaptation recommendations."
          />

        </div>

      </section>

      {/* Footer */}
      <footer className="mt-20 border-t border-gray-800 pt-6 text-center text-gray-500">
        AURA Climate Digital Twin • TitanX Space Labs • ISRO BAH 2026
      </footer>

    </main>
  );
}

function Feature({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-white/10 p-6 rounded-2xl border border-gray-800">
      <h3 className="text-xl font-bold mb-2">
        {title}
      </h3>

      <p className="text-gray-400">
        {desc}
      </p>
    </div>
  );
}
