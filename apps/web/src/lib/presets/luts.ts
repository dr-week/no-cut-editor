export interface LutPreset {
  id: string;
  name: string;
  file: string;
  /** WebGL shader-uniform style transform descriptor used by the LUT engine. */
  matrix: {
    lift: [number, number, number];
    gamma: [number, number, number];
    gain: [number, number, number];
    saturation: number;
  };
  previewGradient: string;
  description: string;
}

function lut(
  id: string,
  name: string,
  file: string,
  lift: [number, number, number],
  gamma: [number, number, number],
  gain: [number, number, number],
  saturation: number,
  previewGradient: string,
  description: string
): LutPreset {
  return { id, name, file, matrix: { lift, gamma, gain, saturation }, previewGradient, description };
}

export const LUT_PRESETS: LutPreset[] = [
  lut("lut_teal_orange", "Teal & Orange Cinematic", "Teal_Orange_Cinematic.cube",
    [-0.08, 0.02, 0.06], [1.05, 1.0, 0.97], [1.12, 1.05, 0.96], 1.15,
    "from-cyan-500 via-neutral-500 to-orange-500",
    "Hollywood blockbuster contrast: teal shadows, warm orange highlights."),
  lut("lut_portra_400", "Kodak Portra 400", "Kodak_Portra_400.cube",
    [0.02, -0.02, -0.04], [0.98, 1.0, 1.03], [1.02, 1.0, 0.97], 0.92,
    "from-rose-300 to-amber-500",
    "Vintage film negative, warm pastel highlights, creamy skin tones."),
  lut("lut_velvia_50", "Fuji Velvia 50", "Fuji_Velvia_50.cube",
    [-0.03, -0.05, -0.04], [1.0, 1.0, 1.0], [1.1, 1.12, 1.15], 1.3,
    "from-emerald-500 to-violet-600",
    "Vivid saturated slide film with punchy reds, greens, and blues."),
  lut("lut_cyberpunk", "Cyberpunk Neon", "Cyberpunk_Neon_LUT.cube",
    [0.05, -0.05, 0.08], [1.02, 0.98, 1.05], [1.05, 0.95, 1.15], 1.25,
    "from-fuchsia-600 to-cyan-500",
    "Neon city night: magenta highlights, cyan-blue shadows."),
  lut("lut_mono_hc", "B&W 35mm High Contrast", "Monochrome_High_Contrast.cube",
    [-0.05, -0.05, -0.05], [1.1, 1.1, 1.1], [1.2, 1.2, 1.2], 0,
    "from-neutral-700 to-neutral-300",
    "Noir monochrome, crushed blacks, brilliant whites."),
  lut("lut_golden_hour", "Warm Golden Hour", "Warm_Golden_Hour.cube",
    [0.03, 0.0, -0.06], [1.0, 1.0, 0.98], [1.06, 1.0, 0.9], 1.1,
    "from-amber-500 to-orange-600",
    "Golden sunset warmth with soft shadows."),
  lut("lut_midnight_teal", "Midnight Blue Teal", "Midnight_Blue_Teal.cube",
    [-0.06, 0.02, 0.04], [1.02, 1.0, 1.0], [1.0, 1.02, 1.05], 0.95,
    "from-blue-900 to-teal-500",
    "Deep blue shadows with teal color rolloff for night scenes."),
  lut("lut_arri_cinema", "ARRI Alexa Cinema", "ARRI_Alexa_Cinema.cube",
    [0.0, 0.0, 0.0], [1.0, 1.0, 1.0], [1.02, 1.0, 0.98], 1.0,
    "from-neutral-600 to-neutral-400",
    "Filmic neutral rolloff with rich, accurate color science."),
  lut("lut_bleach_bypass", "Bleach Bypass", "Bleach_Bypass.cube",
    [0.0, 0.0, 0.0], [1.08, 1.08, 1.08], [1.15, 1.15, 1.15], 0.35,
    "from-stone-600 to-zinc-400",
    "Desaturated high-contrast silver-removal film process."),
  lut("lut_technicolor", "Technicolor Splash", "Technicolor_Splash.cube",
    [-0.02, 0.02, 0.02], [1.0, 0.98, 1.0], [1.05, 1.08, 1.02], 1.35,
    "from-red-500 via-yellow-400 to-blue-500",
    "Over-saturated 1950s three-strip technicolor vibrancy."),
  lut("lut_moody_teal", "Moody Teal Fog", "Moody_Teal_Fog.cube",
    [-0.1, 0.03, 0.04], [1.0, 1.0, 1.0], [1.0, 1.02, 1.06], 0.85,
    "from-teal-700 to-emerald-900",
    "Low-contrast teal fog for moody atmospheric footage."),
  lut("lut_matte_flat", "Matte Flat Log", "Matte_Flat_Log.cube",
    [0.04, 0.04, 0.04], [0.95, 0.95, 0.95], [0.98, 0.98, 0.98], 0.6,
    "from-neutral-500 to-neutral-300",
    "Flat matte film look with lifted shadows, ready for graphics.")
];

export const LUT_PRESETS_BY_ID: Record<string, LutPreset> = Object.fromEntries(
  LUT_PRESETS.map((l) => [l.id, l])
);

export function getLutPreset(id: string | null | undefined): LutPreset | undefined {
  return id ? LUT_PRESETS_BY_ID[id] : undefined;
}
