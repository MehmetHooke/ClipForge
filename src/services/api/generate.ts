import {
    GenerateApiResponse,
    GenerateRequest,
    GenerateSuccessResponse,
} from "@/src/types/generate";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export async function generateContent(
  payload: GenerateRequest,
): Promise<GenerateSuccessResponse["data"]> {
  if (!API_BASE_URL) {
    throw new Error("API base URL is not configured");
  }

  const response = await fetch(`${API_BASE_URL}/api/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data: GenerateApiResponse = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      data.success === false ? data.error.message : "Content generation failed",
    );
  }

  return data.data;
}
