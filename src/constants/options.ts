import { PlatformTarget, ToneType, TransformType } from "../types/project";

export const PLATFORM_OPTIONS: { labelKey: string; value: PlatformTarget }[] = [
  { labelKey: "platform.youtubeShorts", value: "youtube_shorts" },
  { labelKey: "platform.instagramReels", value: "instagram_reels" },
  { labelKey: "platform.tiktok", value: "tiktok" },
];

export const TRANSFORM_OPTIONS: { labelKey: string; value: TransformType }[] = [
  { labelKey: "transform.shortsScript", value: "shorts_script" },
  { labelKey: "transform.hookVariations", value: "hook_variations" },
  { labelKey: "transform.caption", value: "caption" },
  { labelKey: "transform.titleIdeas", value: "title_ideas" },
  { labelKey: "transform.hashtagPack", value: "hashtag_pack" },
];

export const TONE_OPTIONS: { labelKey: string; value: ToneType }[] = [
  { labelKey: "tone.viral", value: "viral" },
  { labelKey: "tone.educational", value: "educational" },
  { labelKey: "tone.cinematic", value: "cinematic" },
  { labelKey: "tone.direct", value: "direct" },
];
