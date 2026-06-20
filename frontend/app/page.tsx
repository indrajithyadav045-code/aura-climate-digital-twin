```tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white px-8 py-10">
      <nav className="flex justify-between items-center mb-20">
        <h1 className="text-2xl font-bold text-blue-400">AURA</h1>
        <p className="text-sm text-gray-400">TitanX Space Labs</p>
      </nav>

      <section className="max-w-5xl mx-auto text-center">
        <p className="text-blue-400 mb-4">ISRO Bharatiya Antariksh Hackathon 2026</p>

        <h2 className="text-5xl md:text-7xl font-bold mb-6">
          India&apos;s AI Climate Digital Twin
        </h2>

        <p className="text-gray-300 text-lg md:text-xl mb-10">
          AURA monitors live climate indicators, predicts heatwave, flood and
          drought risks, generates AI-powered climate intelligence reports and
          provides climate risk visualization across India.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/dashboard">
            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold">
              Launch Dashboard
            </button>
          </Link>

          <Link href="/map">
            <button className="border border-blue-500 hover:bg-blue-900/30 px-8 py-4 rounded-xl font-semibold">
              View Climate Map
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
          <Feature
            title="Live Weather API"
            desc="Tracks real-time temperature, humidity and rainfall."
          />

          <Feature
            title="Climate Risk Score"
            desc="Predicts heatwave, flood and drought risk."
          />

          <Feature
            title="AI Climate Reports"
            desc="Professional climate intelligence reports."
          />

          <Feature
            title="India Climate Map"
            desc="Nationwide climate monitoring and risk visualization."
          />
        </div>

        <div className="mt-20 bg-gradient-to-r from-blue-950 to-black border border-blue-900 rounded-3xl p-10">
          <h3 className="text-3xl font-bold mb-4">
            AURA Climate Intelligence Platform
          </h3>

          <p className="text-gray-300 max-w-3xl mx-auto">
            Powered by live weather feeds, climate analytics, AI advisory
            systems and digital twin technology to support disaster preparedness,
            climate adaptation and environmental decision making.
          </p>
        </div>
      </section>
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
    <div className="bg-white/10 p-6 rounded-2xl border border-gray-800 hover:border-blue-500 transition">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{desc}</p>
    </div>
  );
}
```
