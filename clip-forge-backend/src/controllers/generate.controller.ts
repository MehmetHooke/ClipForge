import { randomUUID } from "crypto";
import { Request, Response } from "express";
import { generateRequestSchema } from "../schemas/generate.schema";
import { generateContent } from "../services/ai.service";
import { errorResponse, successResponse } from "../utils/apiResponse";
import { AppError } from "../utils/appError";

export async function generateController(req: Request, res: Response) {
  try {
    console.log("--- /api/generate REQUEST BODY ---");
    console.log(JSON.stringify(req.body, null, 2));

    const parsed = generateRequestSchema.parse(req.body);

    console.log("--- PARSED REQUEST ---");
    console.log(JSON.stringify(parsed, null, 2));

    const result = await generateContent(parsed);

    console.log("--- FINAL RESULT TO FRONTEND ---");
    console.log(JSON.stringify(result, null, 2));

    return res.status(200).json(
      successResponse({
        id: randomUUID(),
        createdAt: new Date().toISOString(),
        result,
      }),
    );
  } catch (error: any) {
    if (error.name === "ZodError") {
      console.log("--- ZOD VALIDATION ERROR ---");
      console.log(JSON.stringify(error.issues, null, 2));

      return res
        .status(400)
        .json(errorResponse("Invalid request data", "VALIDATION_ERROR"));
    }

    if (error instanceof AppError) {
      console.log("--- APP ERROR ---");
      console.log({
        message: error.message,
        code: error.code,
        status: error.status,
      });

      return res
        .status(error.status)
        .json(errorResponse(error.message, error.code));
    }

    console.log("--- UNKNOWN ERROR ---");
    console.log(error);

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
