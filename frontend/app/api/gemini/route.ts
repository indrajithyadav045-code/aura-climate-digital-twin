import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        insight:
          "Gemini API key is not configured. Add GEMINI_API_KEY in Vercel Environment Variables and redeploy.",
      });
    }

    const prompt = `
You are AURA, an AI climate advisor.
Give 3 short practical climate recommendations.

State: ${body.state}
Temperature: ${body.temp}°C
Humidity: ${body.humidity}%
Rainfall: ${body.rain} mm
Heatwave Risk: ${body.heatwave}%
Flood Risk: ${body.flood}%
Drought Risk: ${body.drought}%
Climate Score: ${body.score}%
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json({
        insight: `Gemini API error: ${result?.error?.message || "Unknown error"}`,
      });
    }

    const insight =
      result?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No AI insight generated.";

    return NextResponse.json({ insight });
  } catch (error) {
    return NextResponse.json({
      insight: "Gemini request failed. Check API key and deployment settings.",
    });
  }
}
