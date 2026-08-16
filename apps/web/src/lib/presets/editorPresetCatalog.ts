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
  // Additional animations
  {
    id: "whip-pan",
    label: "Whip Pan",
    category: "Animation",
    keywords: "whip pan fast transition dynamic motion",
    kind: "animation",
  },
  {
    id: "elastic-bounce",
    label: "Elastic Bounce",
    category: "Animation",
    keywords: "elastic bounce spring physics playful",
    kind: "animation",
  },
  {
    id: "slide-in-left",
    label: "Slide In Left",
    category: "Animation",
    keywords: "slide in left entrance reveal smooth",
    kind: "animation",
  },
  {
    id: "zoom-scale-up",
    label: "Zoom Scale Up",
    category: "Animation",
    keywords: "zoom scale grow enlarge focus reveal",
    kind: "animation",
  },
  {
    id: "fade-in-blur",
    label: "Fade In Blur",
    category: "Animation",
    keywords: "fade in blur focus soft entrance",
    kind: "animation",
  },
  {
    id: "spin-rotate-360",
    label: "Spin Rotate",
    category: "Animation",
    keywords: "spin rotate 360 circle dynamic motion",
    kind: "animation",
  },
  // Additional transitions
  {
    id: "dissolve-fade",
    label: "Dissolve Fade",
    category: "Transition",
    keywords: "dissolve fade smooth transition blend",
    kind: "transition",
  },
  {
    id: "circle-iris",
    label: "Circle Iris",
    category: "Transition",
    keywords: "circle iris reveal spotlight focus transition",
    kind: "transition",
  },
  {
    id: "push-slide",
    label: "Push Slide",
    category: "Transition",
    keywords: "push slide directional transition movement",
    kind: "transition",
  },
  // Additional LUTs
  {
    id: "moody-blue-lut",
    label: "Moody Blue",
    category: "Color",
    keywords: "moody blue dark cool grade mysterious",
    kind: "lut",
  },
  {
    id: "warm-golden-lut",
    label: "Warm Golden",
    category: "Color",
    keywords: "warm golden sunset orange cozy nostalgic",
    kind: "lut",
  },
  {
    id: "high-contrast-bw-lut",
    label: "High Contrast B&W",
    category: "Color",
    keywords: "black white monochrome high contrast bold",
    kind: "lut",
  },
  // Additional templates
  {
    id: "instagram-reel-template",
    label: "Instagram Reel",
    category: "Template",
    keywords: "instagram reel reels social vertical square",
    kind: "template",
  },
  {
    id: "podcast-audiogram-template",
    label: "Podcast Audiogram",
    category: "Template",
    keywords: "podcast audio waveform audiogram transcript",
    kind: "template",
  },
  {
    id: "product-showcase-template",
    label: "Product Showcase",
    category: "Template",
    keywords: "product showcase ecommerce promo highlight",
    kind: "template",
  },
  // Additional effects
  {
    id: "bloom-glow-effect",
    label: "Bloom Glow",
    category: "Effect",
    keywords: "bloom glow light halo ethereal bright",
    kind: "effect",
  },
  {
    id: "vignette-effect",
    label: "Vignette",
    category: "Effect",
    keywords: "vignette darkened edges focus frame",
    kind: "effect",
  },
  {
    id: "film-grain-effect",
    label: "Film Grain",
    category: "Effect",
    keywords: "film grain noise texture vintage analog",
    kind: "effect",
  },
  {
    id: "lens-flare-effect",
    label: "Lens Flare",
    category: "Effect",
    keywords: "lens flare light artifact cinematic",
    kind: "effect",
  },
];

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
