import Link from "next/link";

const zones = [
  { state: "Rajasthan", risk: "High Heat", color: "bg-red-500" },
  { state: "Kerala", risk: "Flood Watch", color: "bg-blue-500" },
  { state: "Tamil Nadu", risk: "Moderate Heat", color: "bg-yellow-500" },
  { state: "Maharashtra", risk: "Urban Heat", color: "bg-orange-500" },
  { state: "Assam", risk: "Rain Alert", color: "bg-cyan-500" },
];

export default function MapPage() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <nav className="flex justify-between mb-8">
        <Link href="/">← Home</Link>
        <Link href="/dashboard">Dashboard →</Link>
      </nav>

      <h1 className="text-4xl font-bold mb-2">AURA Climate Map</h1>
      <p className="text-gray-400 mb-8">
        India-wide climate risk visualization
      </p>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-br from-blue-950 via-black to-green-950 border border-blue-800 rounded-3xl p-8 min-h-[550px] flex flex-col items-center justify-center">
          <div className="relative w-72 h-96 bg-green-900/40 rounded-[45%] border border-green-500 shadow-2xl flex items-center justify-center">
            <span className="text-7xl">🇮🇳</span>

            <Dot top="20%" left="45%" color="bg-red-500" label="North Heat" />
            <Dot top="55%" left="42%" color="bg-yellow-500" label="Central Risk" />
            <Dot top="75%" left="50%" color="bg-orange-500" label="South Heat" />
            <Dot top="62%" left="70%" color="bg-blue-500" label="East Rain" />
            <Dot top="82%" left="35%" color="bg-cyan-500" label="Coastal Flood" />
          </div>

          <p className="mt-6 text-gray-400">
            Climate risk zones based on heatwave, flood and drought indicators.
          </p>
        </div>

        <div className="bg-white/10 border border-gray-800 rounded-3xl p-6">
          <h2 className="text-2xl font-bold mb-6">Risk Zones</h2>

          <div className="space-y-4">
            {zones.map((z) => (
              <div key={z.state} className="bg-black/40 p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className={`w-3 h-3 rounded-full ${z.color}`} />
                  <div>
                    <p className="font-bold">{z.state}</p>
                    <p className="text-sm text-gray-400">{z.risk}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-blue-900/30 border border-blue-800 p-4 rounded-xl">
            <p className="text-blue-400 font-bold">Map Layer</p>
            <p className="text-gray-300 text-sm mt-2">
              This prototype visualizes risk zones. Future version will use
              GIS/SVG state-level interactive mapping.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function Dot({
  top,
  left,
  color,
  label,
}: {
  top: string;
  left: string;
  color: string;
  label: string;
}) {
  return (
    <div
      className="absolute group"
      style={{ top, left }}
    >
      <div className={`w-5 h-5 rounded-full ${color} animate-pulse`} />
      <div className="hidden group-hover:block absolute left-6 top-0 bg-black border border-gray-700 px-3 py-2 rounded-lg text-xs whitespace-nowrap">
        {label}
      </div>
    </div>
  );
}
