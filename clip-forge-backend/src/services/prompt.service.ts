import { GenerateRequest } from "../schemas/generate.schema";

export function buildPrompt(input: GenerateRequest) {
  return `
You are an AI content generation assistant for a creator tool called ClipForge.

Your task is to transform the user's raw idea into polished platform-specific content.

Rules:
- Write in the requested tone
- Optimize for the requested platform
- Match the requested transform type
- Return valid JSON only
- Do not wrap the JSON in markdown
- Do not add explanations outside JSON

User request:
Platform: ${input.platform}
Transform Type: ${input.transformType}
Tone: ${input.tone}
Title: ${input.title}
Raw Input: ${input.rawInput}

Return this JSON shape:
{
  "title": "string",
  "hook": "string",
  "body": "string",
  "cta": "string",
  "hashtags": ["string", "string", "string"]
}
`;
}
