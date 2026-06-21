"use client";

import Link from "next/link";

export default function MapPage() {
  return (
    <main className="min-h-screen bg-black text-white p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <Link href="/">
          <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg">
            ← Home
          </button>
        </Link>

        <h1 className="text-4xl font-bold text-cyan-400">
          AURA Climate Map
        </h1>
      </div>

      {/* Map Section */}
      <div className="bg-slate-950 border border-cyan-900 rounded-3xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          India Climate Monitoring
        </h2>

        <div className="relative h-[700px] rounded-3xl overflow-hidden">

          {/* India Map */}
          <img
            src="/india-map.png.webp"
            alt="India Map"
            className="w-full h-full object-contain"
          />

          {/* Rajasthan */}
          <div className="absolute top-[150px] left-[330px]">
            <div className="w-5 h-5 bg-red-500 rounded-full animate-ping"></div>
            <div className="w-5 h-5 bg-red-500 rounded-full absolute top-0"></div>
          </div>

          {/* Gujarat */}
          <div className="absolute top-[250px] left-[280px]">
            <div className="w-5 h-5 bg-orange-500 rounded-full animate-ping"></div>
            <div className="w-5 h-5 bg-orange-500 rounded-full absolute top-0"></div>
          </div>

          {/* Maharashtra */}
          <div className="absolute top-[350px] left-[320px]">
            <div className="w-5 h-5 bg-yellow-500 rounded-full animate-ping"></div>
            <div className="w-5 h-5 bg-yellow-500 rounded-full absolute top-0"></div>
          </div>

          {/* Tamil Nadu */}
          <div className="absolute bottom-[120px] left-[430px]">
            <div className="w-5 h-5 bg-green-500 rounded-full animate-ping"></div>
            <div className="w-5 h-5 bg-green-500 rounded-full absolute top-0"></div>
          </div>

          {/* Kerala */}
          <div className="absolute bottom-[160px] left-[390px]">
            <div className="w-5 h-5 bg-blue-500 rounded-full animate-ping"></div>
            <div className="w-5 h-5 bg-blue-500 rounded-full absolute top-0"></div>
          </div>

        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">

        <div className="bg-white/10 p-4 rounded-xl">
          <div className="w-4 h-4 bg-red-500 rounded-full mb-2"></div>
          <p>Extreme Risk</p>
        </div>

        <div className="bg-white/10 p-4 rounded-xl">
          <div className="w-4 h-4 bg-orange-500 rounded-full mb-2"></div>
          <p>High Risk</p>
        </div>

        <div className="bg-white/10 p-4 rounded-xl">
          <div className="w-4 h-4 bg-yellow-500 rounded-full mb-2"></div>
          <p>Moderate Risk</p>
        </div>

        <div className="bg-white/10 p-4 rounded-xl">
          <div className="w-4 h-4 bg-green-500 rounded-full mb-2"></div>
          <p>Low Risk</p>
        </div>

      </div>

    </main>
  );
}
