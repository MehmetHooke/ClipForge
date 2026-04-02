import { z } from "zod";

export const generateRequestSchema = z.object({
  title: z.string().min(1),
  rawInput: z.string().min(1),
  platform: z.enum(["youtube", "instagram", "tiktok"]),
  transformType: z.enum(["caption", "script", "hook", "rewrite"]),
  tone: z.enum(["professional", "bold", "casual"]),
});

export type GenerateRequest = z.infer<typeof generateRequestSchema>;
