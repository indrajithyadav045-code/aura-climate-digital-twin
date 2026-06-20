"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const locations = {
  "Andhra Pradesh": { city: "Vijayawada", lat: 16.51, lon: 80.64 },
  "Arunachal Pradesh": { city: "Itanagar", lat: 27.1, lon: 93.62 },
  Assam: { city: "Guwahati", lat: 26.14, lon: 91.73 },
  Bihar: { city: "Patna", lat: 25.59, lon: 85.13 },
  Chhattisgarh: { city: "Raipur", lat: 21.25, lon: 81.63 },
  Goa: { city: "Panaji", lat: 15.49, lon: 73.82 },
  Gujarat: { city: "Ahmedabad", lat: 23.02, lon: 72.57 },
  Haryana: { city: "Chandigarh", lat: 30.73, lon: 76.77 },
  "Himachal Pradesh": { city: "Shimla", lat: 31.1, lon: 77.17 },
  Jharkhand: { city: "Ranchi", lat: 23.34, lon: 85.31 },
  Karnataka: { city: "Bengaluru", lat: 12.97, lon: 77.59 },
  Kerala: { city: "Kochi", lat: 9.93, lon: 76.26 },
  "Madhya Pradesh": { city: "Bhopal", lat: 23.25, lon: 77.41 },
  Maharashtra: { city: "Mumbai", lat: 19.07, lon: 72.87 },
  Manipur: { city: "Imphal", lat: 24.81, lon: 93.94 },
  Meghalaya: { city: "Shillong", lat: 25.57, lon: 91.88 },
  Mizoram: { city: "Aizawl", lat: 23.73, lon: 92.72 },
  Nagaland: { city: "Kohima", lat: 25.67, lon: 94.11 },
  Odisha: { city: "Bhubaneswar", lat: 20.29, lon: 85.82 },
  Punjab: { city: "Chandigarh", lat: 30.73, lon: 76.77 },
  Rajasthan: { city: "Jaipur", lat: 26.91, lon: 75.78 },
  Sikkim: { city: "Gangtok", lat: 27.33, lon: 88.61 },
  "Tamil Nadu": { city: "Chennai", lat: 13.08, lon: 80.27 },
  Telangana: { city: "Hyderabad", lat: 17.38, lon: 78.48 },
  Tripura: { city: "Agartala", lat: 23.83, lon: 91.28 },
  "Uttar Pradesh": { city: "Lucknow", lat: 26.84, lon: 80.95 },
  Uttarakhand: { city: "Dehradun", lat: 30.31, lon: 78.03 },
  "West Bengal": { city: "Kolkata", lat: 22.57, lon: 88.36 },
  Delhi: { city: "New Delhi", lat: 28.61, lon: 77.2 },
  Puducherry: { city: "Puducherry", lat: 11.94, lon: 79.81 },
  Chandigarh: { city: "Chandigarh", lat: 30.73, lon: 76.77 },
  Ladakh: { city: "Leh", lat: 34.15, lon: 77.57 },
  Lakshadweep: { city: "Kavaratti", lat: 10.57, lon: 72.64 },
  "Andaman and Nicobar Islands": { city: "Port Blair", lat: 11.62, lon: 92.72 },
  "Jammu and Kashmir": { city: "Srinagar", lat: 34.08, lon: 74.79 },
};

export default function Dashboard() {
  const [state, setState] = useState("Tamil Nadu");

  const [data, setData] = useState({
    temp: 0,
    humidity: 0,
    rain: 0,
    heatwave: 0,
    flood: 0,
    drought: 0,
    score: 0,
    updated: "",
  });

  const [aiInsight, setAiInsight] = useState("AI insight loading...");

  useEffect(() => {
    fetchWeather();
  }, [state]);

  const fetchWeather = async () => {
    const loc = locations[state as keyof typeof locations];

    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current=temperature_2m,relative_humidity_2m,rain`
      );

      const weather = await response.json();

      const temp = weather.current.temperature_2m ?? 0;
      const humidity = weather.current.relative_humidity_2m ?? 0;
      const rain = weather.current.rain ?? 0;

      const heatwave = temp > 40 ? 90 : temp > 35 ? 75 : temp > 30 ? 60 : 30;
      const flood = rain > 20 ? 90 : rain > 10 ? 70 : rain > 2 ? 50 : 20;
      const drought = rain < 1 && temp > 35 ? 80 : rain < 1 ? 60 : 25;
      const score = Math.round((heatwave + flood + drought) / 3);

      setData({
        temp,
        humidity,
        rain,
        heatwave,
        flood,
        drought,
        score,
        updated: new Date().toLocaleTimeString(),
      });

      setAiInsight(
        `${state} climate advisory:
1. Heatwave Risk: ${heatwave}%. Improve public heat alerts, hydration awareness, and cooling shelters.
2. Flood Risk: ${flood}%. Monitor drainage systems, rainfall changes, and low-lying areas.
3. Drought Risk: ${drought}%. Promote water conservation, groundwater monitoring, and reservoir planning.`
      );
    } catch {
      setAiInsight("Unable to generate climate insight right now.");
    }
  };

  const loc = locations[state as keyof typeof locations];

  const chartData = [
    { name: "Heatwave", value: data.heatwave },
    { name: "Flood", value: data.flood },
    { name: "Drought", value: data.drought },
    { name: "Score", value: data.score },
  ];

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <Link href="/">
        <button className="mb-6 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700">
          ← Back to Home
        </button>
      </Link>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">AURA Dashboard</h1>
          <p className="text-gray-400">Live Climate Intelligence Platform</p>
        </div>

        <div className="text-left md:text-right bg-white/10 px-4 py-3 rounded-xl border border-gray-800">
          <p className="text-green-400 font-semibold animate-pulse">
            ● Live Climate Monitoring
          </p>
          <p className="text-gray-400 text-sm">Updated: {data.updated}</p>
          <p className="text-blue-400 text-xs mt-1">
            Open-Meteo + AURA AI Advisor
          </p>
        </div>
      </div>

      <select
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="bg-gray-900 border border-gray-700 p-3 rounded-lg mb-4 w-full md:w-80"
      >
        {Object.keys(locations).map((place) => (
          <option key={place}>{place}</option>
        ))}
      </select>

      <p className="text-gray-400 mb-8">Tracking location: {loc.city}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <InfoCard title="Temperature" value={`${data.temp}°C`} />
        <InfoCard title="Humidity" value={`${data.humidity}%`} />
        <InfoCard title="Rainfall" value={`${data.rain} mm`} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <RiskCard title="Heatwave Risk" value={data.heatwave} color="text-red-400" />
        <RiskCard title="Flood Risk" value={data.flood} color="text-blue-400" />
        <RiskCard title="Drought Risk" value={data.drought} color="text-yellow-400" />
        <RiskCard title="Climate Score" value={data.score} color="text-green-400" />
      </div>

      <div className="mt-10 bg-white/10 p-6 rounded-2xl border border-gray-800">
        <h2 className="text-2xl font-bold mb-4">AURA AI Climate Insight</h2>
        <p className="text-gray-300 whitespace-pre-line">{aiInsight}</p>
      </div>

      <div className="mt-8 bg-white/10 p-6 rounded-2xl border border-gray-800">
        <h2 className="text-2xl font-bold mb-4">Climate Risk Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#38bdf8" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 bg-white/10 p-6 rounded-2xl border border-gray-800">
        <h2 className="text-2xl font-bold mb-4">India Climate Map</h2>
        <div className="h-80 rounded-2xl border border-gray-700 bg-gradient-to-br from-blue-950 via-black to-green-950 flex flex-col items-center justify-center text-center p-6">
          <div className="text-6xl mb-4">🗺️</div>
          <p className="text-xl font-semibold">{state}</p>
          <p className="text-gray-400 mt-2">
            Tracking climate indicators from {loc.city}
                  <p className="text-gray-400 mb-8">Tracking location: {loc.city}</p>

      <div className="mb-8 bg-gradient-to-r from-yellow-900/40 to-red-900/40 border border-yellow-700 p-5 rounded-2xl">
        <h2 className="text-xl font-bold text-yellow-400">
          ⚠ Climate Alert:{" "}
          {data.score >= 70
            ? "High Risk Detected"
            : data.score >= 45
            ? "Moderate Risk Detected"
            : "Low Risk Condition"}
        </h2>

        <p className="text-gray-300 mt-2">
          {state} is currently showing a climate score of {data.score}% based on
          live temperature, rainfall and humidity indicators.
        </p>
      </div>
          </p>

          <div className="grid grid-cols-3 gap-4 mt-6 w-full max-w-xl">
            <MiniRisk label="Heat Risk" value={data.heatwave} color="text-red-400" />
            <MiniRisk label="Flood Risk" value={data.flood} color="text-blue-400" />
            <MiniRisk label="Drought Risk" value={data.drought} color="text-yellow-400" />
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => window.print()}
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold"
        >
          📄 Generate Climate Report
        </button>
      </div>

      <div className="mt-8 bg-gradient-to-br from-slate-900 via-black to-blue-950 p-8 rounded-3xl border border-blue-800 shadow-2xl">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-b border-blue-800 pb-6 mb-6">
          <div>
            <h2 className="text-3xl font-bold text-blue-400">
              AURA Climate Intelligence Report
            </h2>
            <p className="text-gray-400 mt-1">
              AI-Powered Digital Twin of India&apos;s Climate
            </p>
          </div>

          <div className="text-left md:text-right">
            <p className="text-green-400 font-semibold">● Verified Live Data</p>
            <p className="text-gray-400 text-sm">Generated: {data.updated}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ReportCard label="State" value={state} />
          <ReportCard label="Tracking City" value={loc.city} />
          <ReportCard
            label="Climate Status"
            value={
              data.score >= 70
                ? "High Risk"
                : data.score >= 45
                ? "Moderate Risk"
                : "Low Risk"
            }
            special
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ReportCard label="🌡 Temperature" value={`${data.temp}°C`} />
          <ReportCard label="💧 Humidity" value={`${data.humidity}%`} />
          <ReportCard label="🌧 Rainfall" value={`${data.rain} mm`} />
        </div>

        <div className="bg-white/10 p-6 rounded-2xl border border-gray-800 mb-6">
          <h3 className="text-xl font-bold mb-3">Executive Summary</h3>
          <p className="text-gray-300">
            AURA analyzed live weather indicators from {loc.city}, {state}. The
            current climate score is {data.score}%, with heatwave risk at{" "}
            {data.heatwave}%, flood risk at {data.flood}%, and drought risk at{" "}
            {data.drought}%. This report supports climate monitoring, early
            warning, and adaptation planning.
          </p>
        </div>

        <div className="bg-white/10 p-6 rounded-2xl border border-gray-800">
          <h3 className="text-xl font-bold mb-3">Recommended Actions</h3>
          <p className="text-gray-300 whitespace-pre-line">{aiInsight}</p>
        </div>

        <div className="mt-8 border-t border-blue-800 pt-4 text-center text-gray-500 text-sm">
          Generated by AURA Climate Digital Twin • TitanX Space Labs • ISRO BAH 2026
        </div>
      </div>
    </main>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white/10 p-6 rounded-2xl border border-gray-800">
      <h3 className="text-gray-400">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

function RiskCard({ title, value, color }: { title: string; value: number; color: string }) {
  return (
    <div className="bg-white/10 p-6 rounded-2xl border border-gray-800">
      <h3 className="text-gray-400">{title}</h3>
      <p className={`text-4xl font-bold mt-2 ${color}`}>{value}%</p>
    </div>
  );
}

function MiniRisk({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-black/40 p-4 rounded-xl">
      <p className={`${color} font-bold`}>{value}%</p>
      <p className="text-xs text-gray-400">{label}</p>
    </div>
  );
}

function ReportCard({
  label,
  value,
  special = false,
}: {
  label: string;
  value: string;
  special?: boolean;
}) {
  return (
    <div className="bg-white/10 p-5 rounded-2xl border border-gray-800">
      <p className="text-gray-400">{label}</p>
      <h3 className={`text-2xl font-bold ${special ? "text-yellow-400" : ""}`}>
        {value}
      </h3>
    </div>
  );
}
