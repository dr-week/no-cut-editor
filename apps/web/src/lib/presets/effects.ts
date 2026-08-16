export type EffectType = "glsl" | "lut" | "filter" | "audio";

export interface EffectPreset {
  id: string;
  name: string;
  type: EffectType;
  params: Record<string, number | boolean | string>;
  icon: string;
  description: string;
  /** CSS class applied on top of the preview stage when this effect is active. */
  overlayClass?: string;
}

function fx(
  id: string,
  name: string,
  type: EffectType,
  params: EffectPreset["params"],
  icon: string,
  description: string,
  overlayClass?: string
): EffectPreset {
  return { id, name, type, params, icon, description, overlayClass };
}

export const EFFECT_PRESETS: EffectPreset[] = [
  // ---- LUTs ----
  fx("fx_teal_orange", "Teal & Orange LUT", "lut", { intensity: 0.85 }, "Palette",
    "Hollywood blockbuster color contrast. Shadows to teal, highlights to warm orange."),
  fx("fx_portra_400", "Kodak Portra 400", "lut", { intensity: 0.8 }, "Camera",
    "Vintage film negative with soft warm highlights and pastel skin tones."),
  fx("fx_velvia_50", "Fuji Velvia 50", "lut", { intensity: 0.75 }, "Aperture",
    "Saturated vivid slide film look. Punchy greens, reds, and blues."),
  fx("fx_bw_35mm", "B&W 35mm High Contrast", "lut", { intensity: 1 }, "Contrast",
    "Monochrome noir with crushed blacks and bright whites."),
  fx("fx_cyberpunk_neon", "Cyberpunk Neon", "lut", { intensity: 0.9 }, "Zap",
    "Neon blue/pink city-night grade with boosted magenta."),
  fx("fx_golden_hour", "Warm Golden Hour", "lut", { intensity: 0.8 }, "Sun",
    "Warm amber glow, soft contrast for sunset footage."),
  fx("fx_midnight_blue", "Midnight Blue Teal", "lut", { intensity: 0.7 }, "Moon",
    "Cool night grade with deep blue shadows and subtle teal rolloff."),
  fx("fx_arri_cinema", "ARRI Alexa Cinema", "lut", { intensity: 0.9 }, "Clapperboard",
    "Cinema-camera neutral filmic rolloff with rich color science."),

  // ---- GLSL Shaders ----
  fx("fx_vhs_retro", "VHS 90s Camcorder", "glsl", { grain: 0.6, scanlines: 0.4 }, "Tv",
    "CRT scanlines, color bleed, and tracking jitter from 90s camcorders.",
    "fx-crt"),
  fx("fx_chromatic", "RGB Split Aberration", "glsl", { offset: 4 }, "Eye",
    "Chromatic displacement splitting the red/green/blue channels.",
    "fx-chromatic"),
  fx("fx_rgb_waveform", "RGB Waveform Distortion", "glsl", { freq: 8 }, "Activity",
    "Animated horizontal wave distortion in each color channel.",
    "fx-rgb-wave"),
  fx("fx_anamorphic_flare", "Anamorphic Blue Lens Flare", "glsl", { width: 1.5 }, "Sparkles",
    "Horizontal blue anamorphic streak flares across bright areas.",
    "fx-anamorphic"),
  fx("fx_glitch_scan", "Glitch Scan Break", "glsl", { amp: 12, freq: 3 }, "Wifi",
    "Periodic horizontal slice displacement with RGB tear.",
    "fx-glitch-scan"),
  fx("fx_heat_haze", "Heat Haze Distortion", "glsl", { amp: 6, freq: 2 }, "Flame",
    "Shimmering upward wave distortion like hot desert air.",
    "fx-heat-haze"),
  fx("fx_tv_static", "TV Static Interference", "glsl", { density: 0.5 }, "Radio",
    "White noise static with horizontal roll bar.",
    "fx-static"),
  fx("fx_water_ripple", "Water Ripple Zoom", "glsl", { waves: 5 }, "Droplets",
    "Radial ripple distortion rings emanating from center.",
    "fx-ripple"),
  fx("fx_neon_glow", "Neon Glow Bloom", "glsl", { strength: 1.2 }, "Sparkles",
    "Cyan/pink neon glow bloom on bright edges.",
    "fx-neon-glow"),
  fx("fx_dream_blur", "Dreamy Gaussian Diffusion", "glsl", { radius: 8 }, "Cloud",
    "Soft dreamy diffusion blur with lifted blacks.",
    "fx-dream-blur"),
  fx("fx_film_scratch", "Film Scratch & Dust", "glsl", { density: 0.3 }, "Film",
    "Vertical film scratches, dust specks, and flicker.",
    "fx-film-scratch"),

  // ---- Filter (CSS/Canvas compositing) ----
  fx("fx_film_grain", "35mm Kodachrome Grain", "filter", { roughness: 0.3 }, "Film",
    "Animated mono grain overlay for analog film texture.",
    "fx-grain"),
  fx("fx_gaussian_blur", "Cinematic Edge Blur", "filter", { radius: 12 }, "Aperture",
    "Soft radial edge blur pulling focus to the center."),
  fx("fx_bloom", "Dreamy Glow Bloom", "filter", { threshold: 0.7, strength: 1.2 }, "Sparkles",
    "Soft glowing highlights with lifted shadows."),
  fx("fx_letterbox", "2.35:1 Cinemascope Bars", "filter", { size: 90 }, "RectangleHorizontal",
    "Anamorphic black letterbox bars top and bottom.",
    "fx-letterbox"),
  fx("fx_vignette_hard", "Hard Drama Vignette", "filter", { amount: 70 }, "Circle",
    "Aggressive darkened corners for moody scenes.",
    "fx-vignette"),
  fx("fx_polaroid_fade", "Polaroid Faded Film", "filter", { fade: 0.5 }, "Camera",
    "Faded pastel film with lifted blacks and soft edges."),
  fx("fx_tilt_shift", "Tilt-Shift Miniature", "filter", { blur: 14 }, "Focus",
    "Selective horizontal blur for miniature-model look."),
  fx("fx_duotone", "Cyber Duotone", "filter", { cyan: 100, magenta: 80 }, "Palette",
    "Two-tone cyan/magenta color transform."),
  fx("fx_technicolor", "Technicolor Splash", "filter", { saturation: 130 }, "Palette",
    "Over-saturated 1950s technicolor vibrancy."),
  fx("fx_bleach_bypass", "Bleach Bypass", "filter", { amount: 60 }, "Skull",
    "Desaturated, high-contrast film chemical look."),
  fx("fx_sepia_vintage", "Sepia Vintage Photo", "filter", { amount: 70 }, "History",
    "Warm sepia monochrome for period footage."),

  // ---- Audio ----
  fx("fx_bass_boost", "Bass Boost +6dB", "audio", { gain: 6 }, "Music",
    "Low-frequency shelf boost for punchier beats."),
  fx("fx_vocal_presence", "Vocal Presence Boost", "audio", { freq: 3200 }, "Mic",
    "Presence-band EQ lift for clearer speech in mixes."),
  fx("fx_duck_auto", "Auto Voice Ducking", "audio", { threshold: 0.7, ratio: 8 }, "Volume2",
    "Automatic music ducking underneath active voice tracks."),

  // ---- GLSL (Wave 2) ----
  fx("fx_camera_roll", "Camera Roll Shake", "glsl", { amp: 5, freq: 8 }, "Move",
    "Organic handheld roll shake with vignette crush.", "fx-camera-roll"),
  fx("fx_aberration_pulse", "Aberration Pulse Beat", "glsl", { beat: 4, offset: 6 }, "Activity",
    "RGB split that pulses hard on each beat.", "fx-chromatic"),
  fx("fx_scanline_4k", "4K Scanline Grid", "glsl", { density: 0.35 }, "Grid2x2",
    "Fine broadcast-style scanline overlay with subtle grid.", "fx-scanline"),
  fx("fx_wave_distort", "Fluid Wave Distortion", "glsl", { amp: 8, freq: 3 }, "Waves",
    "Continuous liquid sine-wave ripples across frame.", "fx-heat-haze"),
  fx("fx_holo_rgb", "Holographic RGB Slit", "glsl", { split: 10 }, "Scan",
    "Holographic vertical RGB slit scanning with flicker.", "fx-rgb-wave"),

  // ---- Filter (Wave 2) ----
  fx("fx_color_pop_red", "Red Color Pop", "filter", { hue: 0, sat: 140 }, "Contrast",
    "Desaturates everything except vivid reds."),
  fx("fx_infrared", "Infrared Glow", "filter", { gain: 120 }, "Zap",
    "Dreamy false-color infrared foliage glow."),
  fx("fx_goth_green", "Goth Green Moonlight", "filter", { tint: -40, sat: 80 }, "Moon",
    "Cold desaturated green night-lighting grade."),
  fx("fx_pastel_soft", "Pastel Soft Film", "filter", { sat: 70, brightness: 10 }, "Palette",
    "Low-contrast pastel candy film with lifted shadows."),
  fx("fx_noir_50s", "1950s Film Noir", "filter", { contrast: 140 }, "Clapperboard",
    "Crushed black-and-white noir with hard shadows."),
  fx("fx_bokeh_dream", "Bokeh Light Dream", "filter", { radius: 6 }, "Sparkles",
    "Soft circle-bokeh overlay with dreamy diffusion.", "fx-dream-blur"),
  fx("fx_motion_blur_speed", "Speed Motion Blur", "filter", { radius: 18 }, "Gauge",
    "Directional motion blur for speed-ramp sequences."),

  // ---- Audio (Wave 2) ----
  fx("fx_sidechain_pump", "Sidechain Pump", "audio", { threshold: 0.6, ratio: 6 }, "Activity",
    "EDM-style volume pump synced to beat energy."),
  fx("fx_echo_delay", "Tape Echo Delay", "audio", { time: 0.3, feedback: 0.45 }, "Repeat",
    "Warm tape-style slapback echo on lead vocals."),
  fx("fx_widen_stereo", "Stereo Widener", "audio", { width: 80 }, "Wand2",
    "Mid/side widening for a bigger, roomier mix."),

  // ---- Wave 3: More Shaders, Grades & DSP ----
  fx("fx_watercolor_bleed", "Watercolor Bleed", "filter", { spread: 35 }, "Droplets",
    "Soft watercolor wash bleeding through the frame.", "fx-watercolor"),
  fx("fx_kaleido", "Kaleidoscope Spin", "glsl", { segments: 8 }, "Sun",
    "Rotating kaleidoscope mirror pattern.", "fx-kaleido"),
  fx("fx_halftone", "Comic Halftone Dots", "glsl", { dots: 14 }, "Grid2x2",
    "Retro comic-book halftone dot screen.", "fx-halftone"),
  fx("fx_vhs_playback", "VHS Tracking", "glsl", { drop: 0.3 }, "CassetteTape",
    "Analog VHS tracking jitter with magenta bleed.", "fx-vhs"),
  fx("fx_frosted_glass", "Frosted Glass", "filter", { blur: 6 }, "Snowflake",
    "Backdrop-blur frosted glass diffusion.", "fx-frost"),
  fx("fx_duotone_teal", "Teal Duotone", "filter", { teal: 160, orange: 24 }, "Palette",
    "Two-tone teal/orange duotone print look."),
  fx("fx_iridescent", "Iridescent Polarize", "glsl", { angle: 45 }, "Prism",
    "Oil-slick iridescent polarization gradient.", "fx-polarize"),
  fx("fx_cloud_drift", "Cloud Layer Drift", "filter", { opacity: 50 }, "Cloud",
    "Soft drifting cloud layers for dreamy skies.", "fx-clouds"),
  fx("fx_reverse_reverb", "Reverse Reverb Swell", "audio", { swell: 0.8, time: 0.9 }, "Volume2",
    "Ethereal pre-reverb swell on ambient stems."),
  fx("fx_stutter_gate", "Beat Stutter Gate", "audio", { rate: 16, depth: 0.6 }, "AudioWaveform",
    "Rhythmic stutter-gate chop on melodic parts."),
  // ---- WAVE 4 ----
  fx("fx_lensflare_orbit", "Orbital Lens Flare", "glsl", { flare: 0.7, spin: 0.5 }, "Sun",
    "Cinematic anamorphic flare that orbits the frame."),
  fx("fx_chromatic_aberration", "RGB Split Glitch", "glsl", { amount: 0.4, jitter: 0.6 }, "ScanEye",
    "Red/blue channel-split aberration with signal jitter."),
  fx("fx_tilt_shift", "Tilt-Shift Miniature", "filter", { blur: 0.5, focusLine: 0.5 }, "Blur",
    "Miniature-world tilt-shift blur above and below the focus line."),
  fx("fx_grain_35mm", "35mm Film Grain", "filter", { grain: 0.55, flicker: 0.3 }, "Film",
    "Organic analog grain and subtle reel flicker."),
  fx("fx_compressor", "Studio Compressor", "audio", { threshold: -18, ratio: 4, attack: 10 }, "AudioLines",
    "Transparent 4:1 glue compression for punchy mixes.")
];

export const EFFECT_PRESETS_BY_ID: Record<string, EffectPreset> = Object.fromEntries(
  EFFECT_PRESETS.map((e) => [e.id, e])
);

export function getEffectPreset(id: string | null | undefined): EffectPreset | undefined {
  return id ? EFFECT_PRESETS_BY_ID[id] : undefined;
}

export function getEffectsByType(type: EffectType): EffectPreset[] {
  return EFFECT_PRESETS.filter((e) => e.type === type);
}
