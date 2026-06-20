import Link from "next/link";

export default function MapPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <nav className="flex justify-between items-center mb-6">
        <Link href="/">
          <button className="bg-gray-800 px-4 py-2 rounded-lg">← Home</button>
        </Link>

        <Link href="/dashboard">
          <button className="bg-blue-600 px-4 py-2 rounded-lg">Dashboard</button>
        </Link>
      </nav>

      <h1 className="text-5xl font-bold text-center mb-2">AURA MAP</h1>
      <p className="text-center text-gray-400 mb-8">
        ISRO & IMD Powered Climate Digital Twin
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <section className="bg-white/10 p-5 rounded-2xl border border-gray-800">
          <h2 className="font-bold mb-4">DATA GRAPH</h2>
          <Graph title="Moisture / Precip" />
          <Graph title="Soil Moisture" />
          <Graph title="Risk Matrix" />
        </section>

        <section className="lg:col-span-2 bg-gradient-to-br from-green-900 via-blue-950 to-black p-6 rounded-2xl border border-gray-800 min-h-[520px] flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-bold mb-4">
            AURA: Climate Digital Twin of India
          </h2>

          <div className="text-8xl mb-6">🗺️</div>

          <p className="text-red-400 font-bold text-xl">RISK ZONE</p>
          <p className="text-gray-300 mt-2">
            Heatwave, Flood and Drought monitoring across India
          </p>

          <div className="grid grid-cols-3 gap-4 mt-8 w-full">
            <Card title="Heatwave" value="14 Days Alert" />
            <Card title="Urban Flooding" value="Next 7 Days" />
            <Card title="Agri Drought" value="14 Days" />
          </div>
        </section>

        <section className="bg-white/10 p-5 rounded-2xl border border-gray-800">
          <h2 className="font-bold mb-4">AI ADVISORY</h2>

          <div className="bg-green-900/40 border border-green-700 p-4 rounded-xl mb-4">
            <p className="text-green-400 font-bold">● Advisory Sent</p>
            <p className="text-gray-300 text-sm mt-2">
              Tamil, Hindi, Telugu multilingual alert generated.
            </p>
          </div>

          <div className="bg-black/40 p-4 rounded-xl mb-4">
            <p className="text-sm text-gray-300">
              “Heatwave risk detected. Stay hydrated and avoid outdoor exposure.”
            </p>
          </div>

          <div className="bg-black/40 p-4 rounded-xl">
            <p className="text-blue-400 font-bold">AI Pipeline</p>
            <p className="text-gray-400 text-sm mt-2">
              Data → AI Model → Climate Advisory
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function Graph({ title }: { title: string }) {
  return (
    <div className="bg-black/40 p-4 rounded-xl mb-4">
      <p className="text-gray-300 mb-3">{title}</p>
      <div className="h-20 bg-gradient-to-r from-blue-900 to-green-900 rounded-lg" />
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-black/50 p-4 rounded-xl border border-gray-700">
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="font-bold">{value}</p>
    </div>
  );
}
