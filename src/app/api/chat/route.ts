import { NextRequest, NextResponse } from "next/server";
import { getModeById } from "@/lib/modes";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { messages, mode = "general" } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key sozlanmagan." },
        { status: 500 },
      );
    }

    const modeConfig = getModeById(mode);

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: modeConfig.systemPrompt },
            ...messages.map((m: { role: string; content: string }) => ({
              role: m.role,
              content: m.content,
            })),
          ],
          max_tokens: 4096,
          temperature: 0.7,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Groq error:", data);
      return NextResponse.json(
        { error: data.error?.message || "AI xatolik qaytardi." },
        { status: 500 },
      );
    }

    const content = data.choices?.[0]?.message?.content || "Javob kelmadi.";
    return NextResponse.json({ content });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "AI bilan boglanishda xatolik yuz berdi." },
      { status: 500 },
    );
  }
}
