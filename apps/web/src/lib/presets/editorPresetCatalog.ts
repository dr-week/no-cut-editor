import { ANIMATION_PRESETS } from "./animations";
import { VIDEO_TRANSITIONS } from "./transitions";
import { EFFECT_PRESETS } from "./effects";
import { VIDEO_TEMPLATES } from "./templates";
import { LUT_PRESETS } from "./luts";
import { TREND_PRESETS } from "./trends";

export type EditorPresetItem = {
  id: string;
  label: string;
  category: string;
  keywords: string;
  kind: "animation" | "transition" | "lut" | "template" | "effect";
};

// Seed presets for test backward compatibility and specialized preset aliases
const SEED_PRESETS: EditorPresetItem[] = [
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
  {
    id: "preset_hyper_warp_punch",
    label: "Hyper Warp Punch",
    category: "Animation",
    keywords: "hyper warp punch fast zoom 3d parallax dynamic intro",
    kind: "animation",
  },
  {
    id: "preset_glitch_chroma_shift",
    label: "Glitch Chroma Shift",
    category: "Animation",
    keywords: "glitch chroma rgb shift scanline distortion cyberpunk",
    kind: "animation",
  },
  {
    id: "preset_magnetic_snap_title",
    label: "Magnetic Snap Title",
    category: "Animation",
    keywords: "magnetic snap kinetic title typography punch spring pop",
    kind: "animation",
  },
  {
    id: "preset_smooth_cinematic_glide",
    label: "Smooth Cinematic Glide",
    category: "Animation",
    keywords: "smooth cinematic glide slow push pan anamorphic",
    kind: "animation",
  },
  {
    id: "preset_cyber_scanline_reveal",
    label: "Cyber Scanline Reveal",
    category: "Animation",
    keywords: "cyber scanline reveal wipe futuristic hud motion graphic",
    kind: "animation",
  },
];

// Map animations dynamically
const dynamicAnimations: EditorPresetItem[] = ANIMATION_PRESETS.map((a) => ({
  id: a.id,
  label: a.name,
  category: "Animation",
  keywords: `${a.name} ${a.category} ${a.technique} ${a.easing} motion preset animation`.toLowerCase(),
  kind: "animation",
}));

// Map transitions dynamically
const dynamicTransitions: EditorPresetItem[] = VIDEO_TRANSITIONS.map((t) => ({
  id: t.id,
  label: t.name,
  category: "Transition",
  keywords: `${t.name} ${t.glTransition} ${t.description} transition cut wipe`.toLowerCase(),
  kind: "transition",
}));

// Map effects dynamically
const dynamicEffects: EditorPresetItem[] = EFFECT_PRESETS.map((e) => ({
  id: e.id,
  label: e.name,
  category: "Effect",
  keywords: `${e.name} ${e.type} ${e.description} effect filter visual`.toLowerCase(),
  kind: "effect",
}));

// Map LUTs dynamically
const dynamicLuts: EditorPresetItem[] = LUT_PRESETS.map((l) => ({
  id: l.id,
  label: l.name,
  category: "Color",
  keywords: `${l.name} ${l.file} ${l.description} lut color grade look`.toLowerCase(),
  kind: "lut",
}));

// Map templates dynamically
const dynamicTemplates: EditorPresetItem[] = VIDEO_TEMPLATES.map((t) => ({
  id: t.id,
  label: t.name,
  category: "Template",
  keywords: `${t.name} ${t.category} ${t.tags.join(" ")} ${t.description} template project preset`.toLowerCase(),
  kind: "template",
}));

// Map trends dynamically
const dynamicTrends: EditorPresetItem[] = TREND_PRESETS.map((tr) => ({
  id: tr.id,
  label: tr.title,
  category: "Template",
  keywords: `${tr.title} ${tr.platform} ${tr.niche} ${tr.description} trend auto-edit viral`.toLowerCase(),
  kind: "template",
}));

// Combine with deduplication
const allRawPresets = [
  ...SEED_PRESETS,
  ...dynamicAnimations,
  ...dynamicTransitions,
  ...dynamicEffects,
  ...dynamicLuts,
  ...dynamicTemplates,
  ...dynamicTrends,
];

const seenIds = new Set<string>();
export const EDITOR_PRESET_CATALOG: EditorPresetItem[] = allRawPresets.filter((item) => {
  if (seenIds.has(item.id)) return false;
  seenIds.add(item.id);
  return true;
});

// Helper function to search presets by keyword, category, or label
export function searchPresetCatalog(query: string): EditorPresetItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return EDITOR_PRESET_CATALOG;

  return EDITOR_PRESET_CATALOG.filter((item) => {
    const haystack = `${item.label} ${item.category} ${item.keywords}`.toLowerCase();
    return haystack.includes(q);
  });
}

// Helper function to get presets by kind
export function getPresetsByKind(kind: EditorPresetItem["kind"]): EditorPresetItem[] {
  return EDITOR_PRESET_CATALOG.filter((item) => item.kind === kind);
}

// Helper function to get presets by category
export function getPresetsByCategory(category: string): EditorPresetItem[] {
  return EDITOR_PRESET_CATALOG.filter((item) => item.category.toLowerCase() === category.toLowerCase());
}
