import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        insight:
          "Gemini API key is missing. Add GEMINI_API_KEY in Vercel Environment Variables and redeploy.",
      });
    }

    const prompt = `
You are AURA, an AI climate advisor.

State: ${body.state}
Temperature: ${body.temp}°C
Humidity: ${body.humidity}%
Rainfall: ${body.rain} mm
Heatwave Risk: ${body.heatwave}%
Flood Risk: ${body.flood}%
Drought Risk: ${body.drought}%
Climate Score: ${body.score}%

Give a short climate advisory with exactly 3 practical actions.
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json({
        insight: result?.error?.message || "Gemini API Error",
      });
    }

    const insight =
      result?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No AI insight generated.";

    return NextResponse.json({ insight });
  } catch {
    return NextResponse.json({
      insight: "Gemini request failed. Check API key and deployment settings.",
    });
  }
}
