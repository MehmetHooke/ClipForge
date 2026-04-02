import { GeneratedOutput } from "../../types/output";
import { ProjectDraft } from "../../types/project";

function createId(prefix: string, index: number) {
  return `${prefix}_${index}_${Date.now()}`;
}

export function generateMockOutputs(draft: ProjectDraft): GeneratedOutput[] {
  const input = draft.rawInput.trim();
  const shortInput = input.length > 140 ? `${input.slice(0, 140)}...` : input;

  switch (draft.transformType) {
    case "shorts_script":
      return [
        {
          id: createId("shorts_script", 1),
          type: "shorts_script",
          title: "Shorts Script",
          content: [
            `Hook: Almost nobody realizes this...`,
            ``,
            `Setup: ${shortInput}`,
            ``,
            `Conflict: The truth is much stranger than people think.`,
            ``,
            `Payoff: And that’s exactly why this story grabs attention.`,
            ``,
            `CTA: Follow for more.`,
          ].join("\n"),
        },
      ];

    case "hook_variations":
      return [
        {
          id: createId("hook", 1),
          type: "hook_variations",
          title: "Hook 1",
          content: `Almost nobody knows the truth about this.`,
        },
        {
          id: createId("hook", 2),
          type: "hook_variations",
          title: "Hook 2",
          content: `This changes the way you see ${draft.title}.`,
        },
        {
          id: createId("hook", 3),
          type: "hook_variations",
          title: "Hook 3",
          content: `What happened here is way darker than it looks.`,
        },
      ];

    case "caption":
      return [
        {
          id: createId("caption", 1),
          type: "caption",
          title: "Caption",
          content: `Most people miss the real meaning behind this. ${shortInput} #content #creator`,
        },
      ];

    case "title_ideas":
      return [
        {
          id: createId("title", 1),
          type: "title_ideas",
          title: "Title 1",
          content: `The Truth About ${draft.title}`,
        },
        {
          id: createId("title", 2),
          type: "title_ideas",
          title: "Title 2",
          content: `What Nobody Tells You About ${draft.title}`,
        },
        {
          id: createId("title", 3),
          type: "title_ideas",
          title: "Title 3",
          content: `${draft.title} Explained in Seconds`,
        },
      ];

    case "hashtag_pack":
      return [
        {
          id: createId("hashtags", 1),
          type: "hashtag_pack",
          title: "Hashtag Pack",
          content: `#shorts #viral #contentcreator #clipforge #tiktok #reels #youtube`,
        },
      ];

    default:
      return [];
  }
}
