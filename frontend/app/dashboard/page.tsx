"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState({
    state: "Tamil Nadu",
    heatwave: 78,
    flood: 42,
    drought: 55,
    score: 68,
    lastUpdated: new Date().toLocaleTimeString(),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        heatwave: Math.floor(Math.random() * 30) + 60,
        flood: Math.floor(Math.random() * 40) + 30,
        drought: Math.floor(Math.random() * 35) + 40,
        score: Math.floor(Math.random() * 25) + 60,
        lastUpdated: new Date().toLocaleTimeString(),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <Link href="/">
        <button className="mb-6 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700">
          ← Back to Home
        </button>
      </Link>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold">AURA Dashboard</h1>
          <p className="text-gray-400">Live Climate Risk Intelligence</p>
        </div>

        <div className="text-right">
          <p className="text-green-400 font-semibold">● Live Tracking</p>
          <p className="text-gray-400 text-sm">Updated: {data.lastUpdated}</p>
        </div>
      </div>

      <select
        className="bg-gray-900 border border-gray-700 p-3 rounded-lg mb-8"
        value={data.state}
        onChange={(e) =>
          setData({ ...data, state: e.target.value })
        }
      >
        <option>Tamil Nadu</option>
        <option>Kerala</option>
        <option>Karnataka</option>
        <option>Andhra Pradesh</option>
        <option>Maharashtra</option>
      </select>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card title="Heatwave Risk" value={data.heatwave} color="text-red-400" />
        <Card title="Flood Risk" value={data.flood} color="text-blue-400" />
        <Card title="Drought Risk" value={data.drought} color="text-yellow-400" />
        <Card title="Climate Score" value={data.score} color="text-green-400" />
      </div>

      <section className="bg-white/10 p-6 rounded-2xl mb-8">
        <h2 className="text-2xl font-bold mb-3">AI Climate Insights</h2>
        <p className="text-gray-300">
          {data.state} currently shows {data.heatwave}% heatwave risk,
          {data.flood}% flood risk, and {data.drought}% drought risk.
          AI recommends continuous monitoring, water resource planning,
          and climate adaptation measures.
        </p>
      </section>

      <section className="bg-white/10 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-3">India Climate Map</h2>
        <div className="h-72 border border-gray-700 rounded-xl flex items-center justify-center text-gray-400">
          Live Map Visualization Coming Soon
        </div>
      </section>
    </main>
  );
}

function Card({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-white/10 p-6 rounded-2xl border border-gray-800">
      <h2 className="text-gray-300">{title}</h2>
      <p className={`text-4xl font-bold mt-2 ${color}`}>{value}%</p>
    </div>
  );
}
