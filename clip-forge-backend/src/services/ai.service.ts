import { GenerateRequest } from "../schemas/generate.schema";
import { outputSchema } from "../schemas/output.schema";
import { AppError } from "../utils/appError";
import { buildPrompt } from "./prompt.service";

export async function generateContent(input: GenerateRequest) {
  const prompt = buildPrompt(input);

  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY || "",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
        },
      }),
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new AppError(
      data?.error?.message || "Gemini request failed",
      "AI_REQUEST_FAILED",
      500,
    );
  }

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new AppError("Gemini boş cevap döndü", "AI_EMPTY_RESPONSE", 500);
  }

  try {
    const parsed = JSON.parse(text);
    return outputSchema.parse(parsed);
  } catch (error) {
    console.error("RAW GEMINI TEXT:", text);
    throw new AppError("Gemini JSON parse edilemedi", "AI_PARSE_ERROR", 500);
  }
}
