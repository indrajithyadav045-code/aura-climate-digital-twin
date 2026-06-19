"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const locations = {
  "Tamil Nadu": { city: "Chennai", lat: 13.08, lon: 80.27 },
  Kerala: { city: "Kochi", lat: 9.93, lon: 76.26 },
  Karnataka: { city: "Bengaluru", lat: 12.97, lon: 77.59 },
  "Andhra Pradesh": { city: "Vijayawada", lat: 16.51, lon: 80.64 },
  Maharashtra: { city: "Mumbai", lat: 19.07, lon: 72.87 },
};

export default function Dashboard() {
  const [state, setState] = useState("Tamil Nadu");
  const [data, setData] = useState({
    temp: 0,
    rainfall: 0,
    humidity: 0,
    heatwave: 0,
    flood: 0,
    drought: 0,
    score: 0,
    updated: "",
  });

  async function fetchWeather(selectedState: string) {
    const loc = locations[selectedState as keyof typeof locations];

    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current=temperature_2m,relative_humidity_2m,rain`
    );

    const weather = await res.json();

    const temp = weather.current.temperature_2m || 0;
    const rainfall = weather.current.rain || 0;
    const humidity = weather.current.relative_humidity_2m || 0;

    const heatwave = temp > 40 ? 90 : temp > 35 ? 75 : temp > 30 ? 55 : 30;
    const flood = rainfall > 20 ? 90 : rainfall > 10 ? 70 : rainfall > 2 ? 45 : 20;
    const drought = rainfall < 1 && temp > 34 ? 80 : rainfall < 1 ? 55 : 25;
    const score = Math.round((heatwave + flood + drought) / 3);

    setData({
      temp,
      rainfall,
      humidity,
      heatwave,
      flood,
      drought,
      score,
      updated: new Date().toLocaleTimeString(),
    });
  }

  useEffect(() => {
    fetchWeather(state);
    const timer = setInterval(() => fetchWeather(state), 30000);
    return () => clearInterval(timer);
  }, [state]);

  const loc = locations[state as keyof typeof locations];

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
          <p className="text-gray-400">
            Live Climate Risk Intelligence for India
          </p>
        </div>

        <div className="text-right">
          <p className="text-green-400 font-semibold">● Live Tracking</p>
          <p className="text-gray-400 text-sm">Updated: {data.updated}</p>
        </div>
      </div>

      <select
        className="bg-gray-900 border border-gray-700 p-3 rounded-lg mb-8"
        value={state}
        onChange={(e) => setState(e.target.value)}
      >
        {Object.keys(locations).map((name) => (
          <option key={name}>{name}</option>
        ))}
      </select>

      <p className="text-gray-400 mb-6">
        Tracking location: {loc.city}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card title="Heatwave Risk" value={data.heatwave} color="text-red-400" />
        <Card title="Flood Risk" value={data.flood} color="text-blue-400" />
        <Card title="Drought Risk" value={data.drought} color="text-yellow-400" />
        <Card title="Climate Score" value={data.score} color="text-green-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Info title="Temperature" value={`${data.temp}°C`} />
        <Info title="Rainfall" value={`${data.rainfall} mm`} />
        <Info title="Humidity" value={`${data.humidity}%`} />
      </div>

      <section className="bg-white/10 p-6 rounded-2xl mb-8">
        <h2 className="text-2xl font-bold mb-3">AI Climate Insights</h2>
        <p className="text-gray-300">
          {state} currently records {data.temp}°C temperature, {data.rainfall} mm
          rainfall, and {data.humidity}% humidity. Based on these live indicators,
          AURA estimates {data.heatwave}% heatwave risk, {data.flood}% flood risk,
          and {data.drought}% drought risk.
        </p>
      </section>

      <section className="bg-white/10 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-3">India Climate Map</h2>
        <div className="h-72 border border-gray-700 rounded-xl flex items-center justify-center text-gray-400">
          Map Visualization Coming Soon
        </div>
      </section>
    </main>
  );
}

function Card({ title, value, color }: { title: string; value: number; color: string }) {
  return (
    <div className="bg-white/10 p-6 rounded-2xl border border-gray-800">
      <h2 className="text-gray-300">{title}</h2>
      <p className={`text-4xl font-bold mt-2 ${color}`}>{value}%</p>
    </div>
  );
}

function Info({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white/10 p-6 rounded-2xl border border-gray-800">
      <h2 className="text-gray-300">{title}</h2>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
