export type PlatformType = "youtube" | "instagram" | "tiktok";
export type TransformType = "caption" | "script" | "hook" | "rewrite";
export type ToneType = "professional" | "bold" | "casual";

export type GenerateRequest = {
  title: string;
  rawInput: string;
  platform: PlatformType;
  transformType: TransformType;
  tone: ToneType;
};

export type GeneratedResult = {
  title?: string;
  hook?: string;
  body: string;
  cta?: string;
  hashtags?: string[];
};

export type GeneratedOutput = {
  id: string;
  createdAt: string;
  result: GeneratedResult;
};

export type GenerateSuccessResponse = {
  success: true;
  data: GeneratedOutput;
};

export type GenerateErrorResponse = {
  success: false;
  error: {
    message: string;
    code: string;
  };
};

export type GenerateApiResponse =
  | GenerateSuccessResponse
  | GenerateErrorResponse;
