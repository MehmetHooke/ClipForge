import { z } from "zod";

export const outputSchema = z.object({
  title: z.string().optional().default(""),
  hook: z.string().optional().default(""),
  body: z.string().min(1),
  cta: z.string().optional().default(""),
  hashtags: z.array(z.string()).optional().default([]),
});

export type OutputResult = z.infer<typeof outputSchema>;
