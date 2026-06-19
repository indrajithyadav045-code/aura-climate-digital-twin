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
    humidity: 0,
    rain: 0,
    heatwave: 0,
    flood: 0,
    drought: 0,
  });

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

      const temp = weather.current.temperature_2m;
      const humidity = weather.current.relative_humidity_2m;
      const rain = weather.current.rain;

      const heatwave =
        temp > 40 ? 90 :
        temp > 35 ? 75 :
        temp > 30 ? 60 : 30;

      const flood =
        rain > 20 ? 90 :
        rain > 10 ? 70 :
        rain > 2 ? 50 : 20;

      const drought =
        rain < 1 && temp > 35 ? 80 :
        rain < 1 ? 60 : 25;

      setData({
        temp,
        humidity,
        rain,
        heatwave,
        flood,
        drought,
      });
    } catch (error) {
      console.error("Weather fetch failed:", error);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <Link href="/">
        <button className="mb-6 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700">
          ← Back to Home
        </button>
      </Link>

      <h1 className="text-4xl font-bold mb-2">
        AURA Dashboard
      </h1>

      <p className="text-gray-400 mb-6">
        Live Climate Intelligence Platform
      </p>

      <select
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="bg-gray-900 border border-gray-700 p-3 rounded-lg mb-8"
      >
        <option>Tamil Nadu</option>
        <option>Kerala</option>
        <option>Karnataka</option>
        <option>Andhra Pradesh</option>
        <option>Maharashtra</option>
      </select>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <InfoCard title="Temperature" value={`${data.temp}°C`} />
        <InfoCard title="Humidity" value={`${data.humidity}%`} />
        <InfoCard title="Rainfall" value={`${data.rain} mm`} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RiskCard
          title="Heatwave Risk"
          value={data.heatwave}
          color="text-red-400"
        />

        <RiskCard
          title="Flood Risk"
          value={data.flood}
          color="text-blue-400"
        />

        <RiskCard
          title="Drought Risk"
          value={data.drought}
          color="text-yellow-400"
        />
      </div>

      <div className="mt-10 bg-white/10 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">
          AI Climate Insight
        </h2>

        <p className="text-gray-300">
          {state} currently records {data.temp}°C temperature,
          {data.humidity}% humidity and {data.rain} mm rainfall.
          Based on current conditions, AURA estimates
          {` ${data.heatwave}%`} heatwave risk,
          {` ${data.flood}%`} flood risk and
          {` ${data.drought}%`} drought risk.
        </p>
      </div>
    </main>
  );
}

function InfoCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="bg-white/10 p-6 rounded-2xl">
      <h3 className="text-gray-400">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

function RiskCard({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-white/10 p-6 rounded-2xl">
      <h3 className="text-gray-400">{title}</h3>
      <p className={`text-4xl font-bold mt-2 ${color}`}>
        {value}%
      </p>
    </div>
  );
}
