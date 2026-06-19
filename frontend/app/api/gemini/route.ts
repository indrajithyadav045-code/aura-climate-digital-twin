import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        insight: "Gemini API key is missing.",
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

Give short climate advisory with 3 practical actions.
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

    const insight =
      result?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No AI insight generated.";

    return NextResponse.json({ insight });
  } catch {
    return NextResponse.json({
      insight: "AI insight generation failed.",
    });
  }
}
