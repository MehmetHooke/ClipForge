export type PlatformTarget = "youtube_shorts" | "instagram_reels" | "tiktok";

export type TransformType =
  | "shorts_script"
  | "hook_variations"
  | "caption"
  | "title_ideas"
  | "hashtag_pack";

export type ToneType = "viral" | "educational" | "cinematic" | "direct";

export type ProjectDraft = {
  title: string;
  rawInput: string;
  platformTarget: PlatformTarget;
  transformType: TransformType;
  tone: ToneType;
};
