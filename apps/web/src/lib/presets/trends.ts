export type TrendPlatform = "TikTok" | "Reels" | "Shorts" | "YouTube";

export interface TrendPreset {
  id: string;
  title: string;
  platform: TrendPlatform;
  bpm: number;
  effect: string;
  motionType: string;
  soundtrack: string;
  viralScore: number;
  niche: string;
  year: number;
  description: string;
}

function trend(
  id: string,
  title: string,
  platform: TrendPlatform,
  bpm: number,
  effect: string,
  motionType: string,
  soundtrack: string,
  viralScore: number,
  niche: string,
  description: string
): TrendPreset {
  return { id, title, platform, bpm, effect, motionType, soundtrack, viralScore, niche, year: 2026, description };
}

export const TREND_PRESETS: TrendPreset[] = [
  trend("trend_capcut_velocity", "CapCut 120BPM Velocity Beat-Sync", "TikTok", 120,
    "fx_chromatic", "preset_whip_pan", "Phonk_Drift_120.mp3", 98, "general",
    "Phonk drift edits with velocity ramps cut exactly on the 120BPM grid."),
  trend("trend_alex_hormozi", "Alex Hormozi Word-by-Word Kinetic Subs", "Shorts", 110,
    "fx_bloom", "preset_mrbeast", "Voice_Boosted.wav", 95, "business",
    "Word-by-word kinetic subtitles for high-retention talking-head clips."),
  trend("trend_cyberpunk_flash", "Cyberpunk Strobe Flash Jump Cuts", "Reels", 135,
    "fx_vhs_retro", "preset_strobe_flash", "Cyber_Bass_135.mp3", 92, "edits",
    "Strobe-flash jump cuts over synthwave cyber bass for edit-heavy reels."),
  trend("trend_cinematic_lut", "Teal & Orange Movie Trailer Zoom", "YouTube", 90,
    "fx_teal_orange", "preset_cinematic_zoom", "Epic_Trailer_Orchestra.mp3", 89, "cinematic",
    "Trailer-style teal & orange grade with slow cinematic push-ins."),
  trend("trend_karaoke_glow", "Neon Glow Karaoke Lyrics Wipe", "TikTok", 105,
    "fx_bloom", "preset_karaoke", "Synthwave_Pop.mp3", 94, "music",
    "Neon lyric wipes that glow and swipe in sync with syllables."),
  trend("trend_mrbeast_energy", "MrBeast High-Energy Zoom Inserts", "YouTube", 128,
    "fx_bloom", "preset_zoom_boom_in", "Boom_Clap_Inserts.wav", 96, "challenge",
    "Rapid zoom-insert punch-ins with bass-drop hits on every emphasis word."),
  trend("trend_aspect_shift", "Vertical-to-Horizontal Aspect Shift", "Reels", 100,
    "fx_letterbox", "preset_3d_dolly_zoom", "Cinematic_Whoosh_100.mp3", 87, "cinematic",
    "Shift from vertical phone footage to cinematic 16:9 letterbox mid-cut."),
  trend("trend_text_pop_in", "Noise-Free Text Pop-Ins", "TikTok", 112,
    "fx_dream_blur", "preset_pop_in", "Clean_Pop_Percussion.wav", 90, "tutorial",
    "Clean snappy text pop-ins for tutorials and listicles."),
  trend("trend_slow_zoom_cinematic", "Slow Zoom Epic B-Roll", "YouTube", 85,
    "fx_portra_400", "preset_cinematic_zoom_out", "Ambient_Cinematic.mp3", 85, "travel",
    "Slow dramatic pull-backs over epic travel b-roll with film grade."),
  trend("trend_diagram_explain", "Animated Diagram Explainer", "Shorts", 98,
    "fx_letterbox", "preset_callout_ping", "Soft_Click_Explainer.wav", 83, "education",
    "Callout pings and animated diagrams for educational shorts."),
  trend("trend_vhs_retro", "90s VHS Camcorder Aesthetic", "TikTok", 100,
    "fx_vhs_retro", "preset_vhs_glitch_scan", "Lofi_House_100.mp3", 88, "aesthetic",
    "VHS tracking breaks, grain, and 90s camcorder nostalgia."),
  trend("trend_gaming_clutch", "Gaming Clutch Kill Beat-Sync", "Shorts", 140,
    "fx_glitch_scan", "preset_camera_shake_impact", "Epic_Esports_140.mp3", 93, "gaming",
    "Beat-synced clutch montages with screen shake on every kill."),
  trend("trend_fitness_motivation", "Fitness Motivation Countdown", "Reels", 122,
    "fx_teal_orange", "preset_kinetic_slam", "Workout_Pump_122.mp3", 84, "fitness",
    "Kinetic countdown slams and motivational word hits over gym footage."),
  trend("trend_unboxing_asmr", "ASMR Unboxing Detail Shots", "YouTube", 90,
    "fx_dream_blur", "preset_ken_burns_in", "ASMR_Silent_Open.mp3", 79, "product",
    "Slow dreamy detail shots for premium unboxing experiences.")
];

export const TREND_PRESETS_BY_ID: Record<string, TrendPreset> = Object.fromEntries(
  TREND_PRESETS.map((t) => [t.id, t])
);

export function getTrendPreset(id: string | null | undefined): TrendPreset | undefined {
  return id ? TREND_PRESETS_BY_ID[id] : undefined;
}
