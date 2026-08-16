export type EditorPresetItem = {
  id: string;
  label: string;
  category: string;
  keywords: string;
  kind: "animation" | "transition" | "lut" | "template" | "effect";
};

export const EDITOR_PRESET_CATALOG: EditorPresetItem[] = [
  {
    id: "cinematic-push",
    label: "Cinematic Push",
    category: "Animation",
    keywords: "cinematic push slow dolly reveal intro",
    kind: "animation",
  },
  {
    id: "viral-bounce",
    label: "Viral Bounce",
    category: "Animation",
    keywords: "viral social bounce energy punch pop",
    kind: "animation",
  },
  {
    id: "glitch-flash",
    label: "Glitch Flash",
    category: "Transition",
    keywords: "glitch flash transition distortion cyberpunk",
    kind: "transition",
  },
  {
    id: "wipe-light",
    label: "Light Wipe",
    category: "Transition",
    keywords: "wipe clean transition cinematic reveal",
    kind: "transition",
  },
  {
    id: "teal-orange-lut",
    label: "Teal Orange",
    category: "Color",
    keywords: "teal orange lut cinematic grade hollywood",
    kind: "lut",
  },
  {
    id: "classic-film-lut",
    label: "Classic Film",
    category: "Color",
    keywords: "film grain vintage color grade cinematic",
    kind: "lut",
  },
  {
    id: "tiktok-hook-template",
    label: "TikTok Hook",
    category: "Template",
    keywords: "tiktok social hook title caption viral",
    kind: "template",
  },
  {
    id: "youtuber-intro-template",
    label: "YouTube Intro",
    category: "Template",
    keywords: "youtube intro channel logo opener lower third",
    kind: "template",
  },
  {
    id: "soft-focus-effect",
    label: "Soft Focus",
    category: "Effect",
    keywords: "soft focus blur highlight aesthetic portrait",
    kind: "effect",
  },
  {
    id: "rgb-shift-effect",
    label: "RGB Shift",
    category: "Effect",
    keywords: "rgb shift light color chromatic aberration",
    kind: "effect",
  },
];
