export type TransitionName =
  | "Wipe" | "Dissolve" | "Burn" | "Glitch" | "ZoomBlur" | "LightLeak"
  | "Pixelize" | "Ripple" | "CircleOpen" | "Slide" | "Flip" | "Flash"
  | "Morph" | "Strobe" | "Shutter" | "LensDistortion"
  | "Heartbeat" | "GearRotate" | "SmokeFade" | "ShakeGlitch" | "PolaroidPeel"
  | "DoubleSlide" | "Crosshatch" | "AcidMorph" | "Solarize"
  | "AngleWipe" | "Fold" | "FlyEye" | "GridFlip" | "DreamyZoom" | "DoomScreen" | "ColorTrail";

export interface VideoTransition {
  id: string;
  name: string;
  duration: number;
  easing: string;
  /** gl-transitions style GLSL shader source reference. */
  glTransition: string;
  previewGradient: string;
  description: string;
}

function trans(
  id: string,
  name: string,
  glTransition: string,
  duration: number,
  easing: string,
  previewGradient: string,
  description: string
): VideoTransition {
  return { id, name, duration, easing, glTransition, previewGradient, description };
}

export const VIDEO_TRANSITIONS: VideoTransition[] = [
  trans("tr_wipe_left", "Wipe Left", "wipeLeft", 0.5, "ease-in-out", "from-cyan-400 to-blue-600",
    "Hard-edge directional wipe sweeping left to right."),
  trans("tr_dissolve", "Cross Dissolve", "crossWarp", 0.7, "linear", "from-neutral-400 to-neutral-600",
    "Classic opacity cross-fade between clips."),
  trans("tr_burn", "Film Burn", "filmBurn", 0.8, "ease-in-out", "from-orange-500 to-yellow-300",
    "Vintage 35mm chemical burn exposure."),
  trans("tr_glitch_digital", "Digital Glitch", "glitch", 0.4, "steps", "from-fuchsia-500 to-purple-600",
    "RGB-split stutter glitch cut."),
  trans("tr_zoom_blur", "Zoom Blur Speed Ramp", "zoomBlur", 0.5, "ease-in-out", "from-red-500 to-rose-600",
    "Rapid zoom with radial motion blur."),
  trans("tr_light_leak", "Light Leak", "lightLeak", 0.8, "ease-in-out", "from-amber-300 via-rose-400 to-fuchsia-500",
    "Anamorphic light leak sweep across frame."),
  trans("tr_pixelize", "Pixelize", "pixelize", 0.6, "ease-out", "from-emerald-400 to-teal-600",
    "Progressive pixelation blocks resolving in."),
  trans("tr_ripple", "Water Ripple", "ripple", 0.7, "ease-in-out", "from-sky-400 to-cyan-600",
    "Radial ripple rings expanding from center."),
  trans("tr_circle_open", "Circle Open", "circleOpen", 0.6, "ease-out", "from-white to-slate-400",
    "Iris-style circular reveal from center."),
  trans("tr_slide", "Slide Push", "slide", 0.5, "ease-out", "from-teal-400 to-emerald-600",
    "Next clip pushes previous off-screen."),
  trans("tr_flip", "3D Flip", "flip", 0.6, "ease-in-out", "from-indigo-400 to-violet-600",
    "3D horizontal card flip swap."),
  trans("tr_flash", "Flash White", "flash", 0.2, "ease-in", "from-white to-neutral-200",
    "Full-frame white flash snap cut."),
  trans("tr_morph", "Morph", "morph", 0.8, "ease-in-out", "from-violet-500 to-fuchsia-600",
    "Liquid shape-morph blend between frames."),
  trans("tr_strobe", "Strobe Cuts", "strobe", 0.3, "steps", "from-neutral-300 to-white",
    "Rapid multi-flash strobe transition."),
  trans("tr_shutter", "Shutter Wipe", "shutter", 0.5, "ease-in-out", "from-slate-500 to-slate-800",
    "Blinds-style vertical shutter slices."),
  trans("tr_lens_distort", "Lens Distortion", "lensDistortion", 0.7, "ease-in-out", "from-rose-500 to-orange-500",
    "Fisheye barrel distortion bulge swap."),
  trans("tr_hyperspeed", "Hyperspeed Warp", "hyperspeed", 0.5, "ease-in-out", "from-indigo-600 to-cyan-400",
    "Sci-fi star warp tunnel cut."),
  trans("tr_vhs_tracking", "VHS Tracking", "vhsTracking", 0.6, "steps", "from-green-400 to-emerald-700",
    "Tape tracking break with horizontal slice jitter."),
  trans("tr_bounce", "Bounce Split", "bounce", 0.6, "ease-out", "from-amber-400 to-orange-600",
    "Next clip bounces up over current frame."),
  trans("tr_swirl", "Swirl", "swirl", 0.7, "ease-in-out", "from-purple-500 to-pink-600",
    "Spiral rotation wipe."),
  trans("tr_zoom_cube", "Zoom Cube 3D", "zoomCube", 0.7, "ease-in-out", "from-sky-500 to-indigo-600",
    "Cube spin rotation between clips."),
  trans("tr_cine_dissolve", "Film Dissolve", "cineDissolve", 0.9, "ease-in-out", "from-amber-600 to-orange-800",
    "Long soft dissolve with film grain merge."),
  trans("tr_heart_beat", "Heartbeat Pump", "heartbeat", 0.5, "ease-in-out", "from-rose-500 to-red-600",
    "Double-thump heartbeat zoom between clips."),
  trans("tr_gear_rotate", "Gear Rotate", "gearRotate", 0.7, "ease-in-out", "from-slate-500 to-zinc-700",
    "Next clip swings in like a rotating gear."),
  trans("tr_smoke_fade", "Smoke Fade", "smokeFade", 0.8, "ease-in-out", "from-neutral-300 to-stone-500",
    "Smoky translucent drift cross-fade."),
  trans("tr_shake_glitch", "Shake Glitch", "shakeGlitch", 0.35, "steps", "from-lime-400 to-emerald-600",
    "Hard shake with RGB glitch tear on the cut."),
  trans("tr_polaroid_peel", "Polaroid Peel", "polaroidPeel", 0.8, "ease-in-out", "from-amber-200 to-stone-400",
    "Old photo peel-away reveal with white frame."),
  trans("tr_double_slide", "Double Slide Split", "doubleSlide", 0.6, "ease-out", "from-teal-500 to-cyan-700",
    "Frame splits in half and slides apart."),
  trans("tr_crosshatch", "Crosshatch Reveal", "crosshatch", 0.7, "ease-in-out", "from-indigo-500 to-violet-800",
    "Ink crosshatch lines reveal the next clip."),
  trans("tr_acid_morph", "Acid Morph", "acidMorph", 0.9, "ease-in-out", "from-lime-400 via-emerald-500 to-cyan-600",
    "Liquid acid-trippy shape morph blend."),
  trans("tr_solarize", "Solarize Flash", "solarize", 0.5, "ease-in", "from-fuchsia-400 to-amber-300",
    "Solarized negative flash with color inversion."),
  trans("tr_angle_wipe", "Angle Wipe", "angular", 0.6, "ease-in-out", "from-slate-400 to-slate-800",
    "Sweeping diagonal angle wipe reveal."),
  trans("tr_fold", "Fold Paper", "fold", 0.8, "ease-in-out", "from-neutral-300 to-neutral-600",
    "Folded paper tuck into the next scene."),
  trans("tr_flyeye", "Fly Eye", "flyeye", 0.7, "ease-in-out", "from-amber-400 to-orange-700",
    "Insect-eye lens grid shatter reveal."),
  trans("tr_grid_flip", "Grid Flip", "gridFlip", 0.7, "ease-in-out", "from-cyan-500 to-blue-800",
    "Animated grid of tiles flips to the next shot."),
  trans("tr_dreamy_zoom", "Dreamy Zoom", "dreamy", 0.9, "ease-in-out", "from-pink-300 via-purple-400 to-indigo-600",
    "Soft dreamy zoom-blur dissolve with warm glow."),
  trans("tr_doom_screen", "Doom Screen", "doomScreen", 0.5, "ease-in", "from-red-600 to-black",
    "Aggressive glitchy screen-tear with scan jitter."),
  trans("tr_color_trail", "Color Trail Ghost", "colorTrail", 1, "ease-out", "from-fuchsia-500 via-cyan-400 to-emerald-500",
    "Ghosting color trails smear across the cut.")
];

export const VIDEO_TRANSITIONS_BY_ID: Record<string, VideoTransition> = Object.fromEntries(
  VIDEO_TRANSITIONS.map((tr) => [tr.id, tr])
);

export function getTransition(id: string | null | undefined): VideoTransition | undefined {
  return id ? VIDEO_TRANSITIONS_BY_ID[id] : undefined;
}
