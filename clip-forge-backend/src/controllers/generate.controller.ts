import { randomUUID } from "crypto";
import { Request, Response } from "express";
import { generateRequestSchema } from "../schemas/generate.schema";
import { generateContent } from "../services/ai.service";
import { errorResponse, successResponse } from "../utils/apiResponse";
import { AppError } from "../utils/appError";

export async function generateController(req: Request, res: Response) {
  try {
    // 1. Validation
    const parsed = generateRequestSchema.parse(req.body);

    // 2. AI call
    const result = await generateContent(parsed);

    // 3. Success response
    return res.status(200).json(
      successResponse({
        id: randomUUID(),
        createdAt: new Date().toISOString(),
        result,
      }),
    );
  } catch (error: any) {
    // 🔴 Zod validation error
    if (error.name === "ZodError") {
      return res
        .status(400)
        .json(errorResponse("Invalid request data", "VALIDATION_ERROR"));
    }

    // 🔴 Custom AppError
    if (error instanceof AppError) {
      return res
        .status(error.status)
        .json(errorResponse(error.message, error.code));
    }

    // 🔴 AI / unknown error
    return res
      .status(500)
      .json(
        errorResponse(
          error?.message || "Internal server error",
          "INTERNAL_ERROR",
        ),
      );
  }
}
