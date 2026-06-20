import Link from "next/link";

const riskZones = [
  { state: "Rajasthan", risk: "High Heat", level: "High", color: "bg-red-500" },
  { state: "Kerala", risk: "Flood Watch", level: "Moderate", color: "bg-blue-500" },
  { state: "Tamil Nadu", risk: "Moderate Heat", level: "Moderate", color: "bg-yellow-500" },
  { state: "Maharashtra", risk: "Urban Heat", level: "Moderate", color: "bg-orange-500" },
  { state: "Assam", risk: "Rain Alert", level: "Watch", color: "bg-cyan-500" },
];

export default function MapPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <nav className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold">AURA MAP</h1>
          <p className="text-gray-400">ISRO & IMD Powered Climate Digital Twin</p>
        </div>

        <div className="flex gap-3">
          <Link href="/">
            <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg">
              Home
            </button>
          </Link>

          <Link href="/dashboard">
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
              Dashboard
            </button>
          </Link>
        </div>
      </nav>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <section className="bg-white/10 border border-gray-800 rounded-3xl p-5">
          <h2 className="text-xl font-bold mb-5">DATA GRAPH</h2>

          <Graph title="Moisture / Precipitation" value="72%" />
          <Graph title="Soil Moisture" value="58%" />

          <div className="bg-black/40 p-4 rounded-2xl border border-gray-800">
            <h3 className="font-bold mb-4">Vulnerability Matrix</h3>

            <div className="space-y-3 text-sm">
              <MatrixRow city="Chennai" score="620" level="Moderate" color="text-yellow-400" />
              <MatrixRow city="Delhi NCR" score="810" level="High" color="text-red-400" />
              <MatrixRow city="Kochi" score="710" level="Flood" color="text-blue-400" />
              <MatrixRow city="Jaipur" score="760" level="Heat" color="text-orange-400" />
            </div>
          </div>
        </section>

        <section className="xl:col-span-2 bg-gradient-to-br from-slate-950 via-blue-950 to-emerald-950 border border-blue-800 rounded-3xl p-6 min-h-[620px] relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_#22c55e,_transparent_45%)]" />

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-black/50 p-4 rounded-2xl border border-gray-700">
                <h2 className="text-xl font-bold">AURA: Climate Digital Twin</h2>
                <p className="text-gray-400 text-sm">
                  India-wide risk visualization
                </p>
              </div>

              <div className="bg-red-900/50 p-4 rounded-2xl border border-red-700">
                <p className="text-red-300 font-bold">HEATWAVE ALERT</p>
                <p className="text-sm text-gray-300">14 days outlook</p>
              </div>
            </div>

            <div className="h-[420px] rounded-3xl border border-blue-700 bg-black/30 flex items-center justify-center relative">
              <div className="absolute top-10 left-10 bg-black/60 px-4 py-2 rounded-xl">
                🌊 Coastal Flood Watch
              </div>

              <div className="absolute top-24 right-12 bg-black/60 px-4 py-2 rounded-xl">
                🔥 North India Heat Zone
              </div>

              <div className="absolute bottom-16 left-16 bg-black/60 px-4 py-2 rounded-xl">
                🌾 Agri Drought Warning
              </div>

              <div className="text-center">
                <div className="text-[180px] leading-none">🇮🇳</div>
                <p className="text-2xl font-bold mt-4">India Climate Risk Layer</p>
                <p className="text-gray-400 mt-2">
                  Heatwave • Flood • Drought • Rainfall anomaly
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <Scenario title="Sea Level Rise" value="+0.5m" />
              <Scenario title="Rainfall Change" value="+20%" />
              <Scenario title="Urban Flood Impact" value="+40%" />
            </div>
          </div>
        </section>

        <section className="bg-white/10 border border-gray-800 rounded-3xl p-5">
          <h2 className="text-xl font-bold mb-5">AI ADVISORY</h2>

          <div className="bg-green-900/40 border border-green-700 p-4 rounded-2xl mb-5">
            <p className="text-green-400 font-bold">● Advisory Generated</p>
            <p className="text-gray-300 text-sm mt-2">
              Multilingual warning ready for Tamil, Hindi and Telugu users.
            </p>
          </div>

          <div className="space-y-4">
            {riskZones.map((zone) => (
              <div key={zone.state} className="bg-black/40 p-4 rounded-2xl">
                <div className="flex items-center gap-3">
                  <span className={`w-3 h-3 rounded-full ${zone.color}`} />
                  <div>
                    <p className="font-bold">{zone.state}</p>
                    <p className="text-sm text-gray-400">
                      {zone.risk} • {zone.level}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-blue-900/30 border border-blue-800 p-4 rounded-2xl">
            <p className="text-blue-400 font-bold">AI Pipeline</p>
            <p className="text-gray-300 text-sm mt-2">
              Climate Data → Risk Engine → Advisory → Report
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function Graph({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-black/40 p-4 rounded-2xl border border-gray-800 mb-5">
      <div className="flex justify-between mb-3">
        <p className="text-gray-300">{title}</p>
        <p className="text-blue-400 font-bold">{value}</p>
      </div>

      <div className="h-24 rounded-xl bg-gradient-to-r from-blue-900 via-cyan-700 to-green-700" />
    </div>
  );
}

function MatrixRow({
  city,
  score,
  level,
  color,
}: {
  city: string;
  score: string;
  level: string;
  color: string;
}) {
  return (
    <div className="flex justify-between border-b border-gray-800 pb-2">
      <span>{city}</span>
      <span>{score}</span>
      <span className={color}>{level}</span>
    </div>
  );
}

function Scenario({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-black/40 p-4 rounded-2xl border border-gray-800 text-center">
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-xl font-bold text-blue-400">{value}</p>
    </div>
  );
}
