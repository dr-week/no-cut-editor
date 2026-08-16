import type { AnimationDescriptor } from "../motion/engine";

type Category = AnimationDescriptor["category"];
type Technique = AnimationDescriptor["technique"];

function anim(
  id: string,
  name: string,
  category: Category,
  technique: Technique,
  easing: AnimationDescriptor["easing"],
  duration: number,
  previewColor: string,
  tracks: AnimationDescriptor["tracks"]
): AnimationDescriptor {
  return { id, name, category, technique, easing, duration, previewColor, tracks };
}

export const ANIMATION_PRESETS: AnimationDescriptor[] = [
  // ---- TEXT ----
  anim("preset_pop_in", "Pop Spring In", "text", "Spring Physics", "spring", 0.4, "from-cyan-500 to-blue-600", [
    { time: 0, values: { scaleX: 0, scaleY: 0, opacity: 0 } },
    { time: 0.55, values: { scaleX: 1.15, scaleY: 0.85, opacity: 1 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, opacity: 1 } }
  ]),
  anim("preset_mrbeast", "MrBeast Highlight Pop", "text", "Kinetic Typography", "spring", 0.3, "from-yellow-400 to-emerald-500", [
    { time: 0, values: { scaleX: 0.4, scaleY: 0.4, opacity: 0, rotation: -6 } },
    { time: 0.5, values: { scaleX: 1.25, scaleY: 0.9, opacity: 1, rotation: 2 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, opacity: 1, rotation: 0 } }
  ]),
  anim("preset_elastic_bounce", "Elastic Rubber Bounce", "text", "Spring Physics", "easeOutElastic", 0.8, "from-orange-400 to-amber-500", [
    { time: 0, values: { scaleX: 0.2, scaleY: 1.6, opacity: 0, y: -40 } },
    { time: 0.3, values: { scaleX: 1.3, scaleY: 0.7, opacity: 1, y: 0 } },
    { time: 0.6, values: { scaleX: 0.9, scaleY: 1.1, opacity: 1, y: 0 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, opacity: 1, y: 0 } }
  ]),
  anim("preset_elastic_stamp", "Kinetic Rubber Stamp Pop", "text", "Spring Physics", "easeInOutBack", 0.65, "from-red-600 to-rose-400", [
    { time: 0, values: { scaleX: 0.1, scaleY: 0.1, opacity: 0, rotation: -15 } },
    { time: 0.4, values: { scaleX: 1.2, scaleY: 1.2, opacity: 1, rotation: 4 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, opacity: 1, rotation: 0 } }
  ]),
  anim("preset_karaoke", "Karaoke Word Wipe", "text", "Kinetic Typography", "linear", 0.6, "from-pink-500 to-rose-500", [
    { time: 0, values: { opacity: 0.2, x: -20 } },
    { time: 1, values: { opacity: 1, x: 0 } }
  ]),
  anim("preset_neon_pulse", "Neon Glow Outline Pulse", "text", "Kinetic Typography", "easeInOutQuad", 0.6, "from-fuchsia-400 to-cyan-400", [
    { time: 0, values: { scaleX: 1, scaleY: 1, opacity: 0.6 } },
    { time: 0.5, values: { scaleX: 1.06, scaleY: 1.06, opacity: 1 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, opacity: 0.6 } }
  ]),
  anim("preset_3d_text_extrusion", "3D Isometric Text Extrude", "text", "3D Parallax", "easeOutCubic", 0.75, "from-amber-400 to-red-500", [
    { time: 0, values: { scaleX: 0.3, scaleY: 0.3, opacity: 0, skewX: -30, y: 40 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, opacity: 1, skewX: 0, y: 0 } }
  ]),
  anim("preset_3d_text_wobble", "3D Float & Depth Wobble", "text", "3D Parallax", "easeInOutSine", 1.1, "from-pink-500 to-violet-600", [
    { time: 0, values: { y: 0, rotation: 0, scaleX: 1, scaleY: 1 } },
    { time: 0.25, values: { y: -8, rotation: -3, scaleX: 1.03, scaleY: 1.03 } },
    { time: 0.5, values: { y: 4, rotation: 2, scaleX: 0.97, scaleY: 0.97 } },
    { time: 0.75, values: { y: -6, rotation: -2, scaleX: 1.02, scaleY: 1.02 } },
    { time: 1, values: { y: 0, rotation: 0, scaleX: 1, scaleY: 1 } }
  ]),
  anim("preset_typewriter", "Typewriter Characters Reveal", "text", "Kinetic Typography", "easeOutQuad", 1.2, "from-slate-300 to-cyan-300", [
    { time: 0, values: { opacity: 0, x: -4 } },
    { time: 1, values: { opacity: 1, x: 0 } }
  ]),
  anim("preset_word_by_word", "Word-by-Word Kinetic Scale", "text", "Kinetic Typography", "easeOutBack", 0.9, "from-emerald-400 to-lime-500", [
    { time: 0, values: { scaleX: 0.7, scaleY: 0.7, opacity: 0, y: 10 } },
    { time: 0.5, values: { scaleX: 1.2, scaleY: 1.2, opacity: 1, y: -4 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, opacity: 1, y: 0 } }
  ]),
  anim("preset_shatter_text", "Glitch Shatter Text Burst", "text", "Glitch Vector", "steps", 0.4, "from-purple-500 to-fuchsia-500", [
    { time: 0, values: { opacity: 0, scaleX: 1.4, scaleY: 1.4, skewX: 12 } },
    { time: 0.4, values: { opacity: 1, scaleX: 1, scaleY: 1, skewX: -8 } },
    { time: 0.7, values: { opacity: 1, scaleX: 1.1, scaleY: 0.95, skewX: 5 } },
    { time: 1, values: { opacity: 1, scaleX: 1, scaleY: 1, skewX: 0 } }
  ]),
  anim("preset_gradient_fill_text", "Gradient Fill Text Wipe", "text", "Kinetic Typography", "easeInOutSine", 0.8, "from-violet-500 via-fuchsia-500 to-amber-400", [
    { time: 0, values: { opacity: 0.3, x: -60 } },
    { time: 1, values: { opacity: 1, x: 0 } }
  ]),
  anim("preset_flip_card_text", "3D Flip Card Flip-In", "text", "3D Parallax", "easeInOutCubic", 0.6, "from-sky-400 to-indigo-600", [
    { time: 0, values: { rotation: -80, scaleX: 0.6, scaleY: 0.6, opacity: 0 } },
    { time: 1, values: { rotation: 0, scaleX: 1, scaleY: 1, opacity: 1 } }
  ]),

  // ---- VIDEO / CAMERA ----
  anim("preset_whip_pan", "Whip Pan Left", "video", "Optical Flow", "easeInOutCubic", 0.35, "from-amber-500 to-red-600", [
    { time: 0, values: { x: 0, scaleX: 1.2, scaleY: 1.2 } },
    { time: 0.4, values: { x: -120, scaleX: 1.4, scaleY: 1.4 } },
    { time: 1, values: { x: 0, scaleX: 1, scaleY: 1 } }
  ]),
  anim("preset_whip_pan_right", "Whip Pan Right", "video", "Optical Flow", "easeInOutCubic", 0.35, "from-orange-500 to-red-500", [
    { time: 0, values: { x: 0, scaleX: 1.2, scaleY: 1.2 } },
    { time: 0.4, values: { x: 120, scaleX: 1.4, scaleY: 1.4 } },
    { time: 1, values: { x: 0, scaleX: 1, scaleY: 1 } }
  ]),
  anim("preset_glitch", "Cyberpunk Glitch", "video", "Glitch Vector", "steps", 0.5, "from-fuchsia-500 to-purple-600", [
    { time: 0, values: { x: 0, scaleX: 1 } },
    { time: 0.2, values: { x: -14, skewX: 8 } },
    { time: 0.35, values: { x: 10, skewX: -6 } },
    { time: 0.55, values: { x: -6, skewX: 4 } },
    { time: 1, values: { x: 0, skewX: 0 } }
  ]),
  anim("preset_cinematic_zoom", "Slow Cinematic Push", "video", "3D Parallax", "easeOutCubic", 1.2, "from-blue-600 to-indigo-800", [
    { time: 0, values: { scaleX: 1, scaleY: 1 } },
    { time: 1, values: { scaleX: 1.18, scaleY: 1.18 } }
  ]),
  anim("preset_cinematic_zoom_out", "Slow Cinematic Pull-Out", "video", "3D Parallax", "easeOutCubic", 1.2, "from-indigo-600 to-cyan-700", [
    { time: 0, values: { scaleX: 1.18, scaleY: 1.18 } },
    { time: 1, values: { scaleX: 1, scaleY: 1 } }
  ]),
  anim("preset_3d_dolly_zoom", "3D Vertigo Dolly Zoom", "camera_3d", "3D Parallax", "easeInOutQuad", 1.5, "from-purple-600 to-cyan-400", [
    { time: 0, values: { scaleX: 1, scaleY: 1, x: 0 } },
    { time: 0.5, values: { scaleX: 1.3, scaleY: 1.3, x: 0 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, x: 0 } }
  ]),
  anim("preset_camera_shake_impact", "Handheld Camera Shake Impact", "camera_3d", "Shake Impact", "easeInQuad", 0.45, "from-rose-500 to-amber-500", [
    { time: 0, values: { x: 0, y: 0, rotation: 0 } },
    { time: 0.15, values: { x: -18, y: 10, rotation: -3 } },
    { time: 0.3, values: { x: 14, y: -12, rotation: 2.5 } },
    { time: 0.5, values: { x: -9, y: 6, rotation: -1.5 } },
    { time: 0.7, values: { x: 5, y: -4, rotation: 1 } },
    { time: 1, values: { x: 0, y: 0, rotation: 0 } }
  ]),
  anim("preset_earthquake_rumble", "Earthquake Low Rumble", "camera_3d", "Shake Impact", "easeInOutQuad", 0.6, "from-stone-500 to-amber-700", [
    { time: 0, values: { y: 0, rotation: 0 } },
    { time: 0.25, values: { y: 16, rotation: 2 } },
    { time: 0.5, values: { y: -14, rotation: -1.5 } },
    { time: 0.75, values: { y: 9, rotation: 1 } },
    { time: 1, values: { y: 0, rotation: 0 } }
  ]),
  anim("preset_ken_burns_in", "Ken Burns Slow Zoom-In", "video", "Optical Flow", "linear", 4, "from-teal-500 to-emerald-700", [
    { time: 0, values: { scaleX: 1, scaleY: 1, x: 0, y: 0 } },
    { time: 1, values: { scaleX: 1.22, scaleY: 1.22, x: 0, y: 0 } }
  ]),
  anim("preset_ken_burns_out", "Ken Burns Slow Zoom-Out", "video", "Optical Flow", "linear", 4, "from-emerald-600 to-teal-700", [
    { time: 0, values: { scaleX: 1.22, scaleY: 1.22, x: 0, y: 0 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, x: 0, y: 0 } }
  ]),
  anim("preset_vertical_pan", "Vertical Cinematic Pan", "video", "Optical Flow", "linear", 3, "from-sky-600 to-blue-800", [
    { time: 0, values: { y: 0, scaleX: 1.1, scaleY: 1.1 } },
    { time: 1, values: { y: -80, scaleX: 1.1, scaleY: 1.1 } }
  ]),
  anim("preset_handheld_footage", "Documentary Handheld Bob", "video", "Shake Impact", "easeInOutSine", 2, "from-neutral-500 to-stone-700", [
    { time: 0, values: { y: 0, rotation: 0 } },
    { time: 0.25, values: { y: 6, rotation: 1 } },
    { time: 0.5, values: { y: -5, rotation: -0.8 } },
    { time: 0.75, values: { y: 4, rotation: 0.6 } },
    { time: 1, values: { y: 0, rotation: 0 } }
  ]),

  // ---- TRANSITIONS ----
  anim("preset_strobe_flash", "High-Energy Strobe Flash", "transition", "Strobe Flash", "steps", 0.2, "from-white to-neutral-400", [
    { time: 0, values: { opacity: 1, scaleX: 1, scaleY: 1 } },
    { time: 0.5, values: { opacity: 0.3, scaleX: 1.05, scaleY: 1.05 } },
    { time: 1, values: { opacity: 1, scaleX: 1, scaleY: 1 } }
  ]),
  anim("preset_film_burn_wipe", "Vintage 35mm Film Burn Wipe", "transition", "Optical Flow", "easeInOutSine", 0.7, "from-orange-500 to-yellow-300", [
    { time: 0, values: { opacity: 1, x: 0 } },
    { time: 0.6, values: { opacity: 0.85, x: 30 } },
    { time: 1, values: { opacity: 1, x: 0 } }
  ]),
  anim("preset_anamorphic_streak", "Anamorphic Lens Flare Streak", "transition", "Optical Flow", "easeInOutCubic", 0.5, "from-cyan-400 to-blue-500", [
    { time: 0, values: { x: 0, opacity: 1 } },
    { time: 0.5, values: { x: -60, opacity: 0.6, skewX: 20 } },
    { time: 1, values: { x: 0, opacity: 1, skewX: 0 } }
  ]),
  anim("preset_hyperspeed_warp", "Sci-Fi Hyperspeed Star Warp", "transition", "3D Parallax", "easeInOutCubic", 0.8, "from-indigo-500 to-cyan-300", [
    { time: 0, values: { scaleX: 1, scaleY: 1, opacity: 1 } },
    { time: 0.5, values: { scaleX: 2.2, scaleY: 2.2, opacity: 0.4 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, opacity: 1 } }
  ]),
  anim("preset_kinetic_split_wipe", "Diagonal Geometric Split Wipe", "transition", "Morphing SVG", "easeInOutCubic", 0.4, "from-yellow-400 to-purple-600", [
    { time: 0, values: { x: 0, skewX: 0, opacity: 1 } },
    { time: 1, values: { x: 0, skewX: 45, opacity: 0.4 } }
  ]),
  anim("preset_circle_iris_wipe", "Circle Iris Wipe", "transition", "Morphing SVG", "easeOutQuad", 0.6, "from-white to-cyan-300", [
    { time: 0, values: { opacity: 1, scaleX: 1, scaleY: 1 } },
    { time: 1, values: { opacity: 0.4, scaleX: 3, scaleY: 3 } }
  ]),
  anim("preset_light_leak", "Glowing Light Leak Wipe", "transition", "Optical Flow", "easeInOutSine", 0.8, "from-amber-300 via-rose-400 to-fuchsia-500", [
    { time: 0, values: { x: 0, opacity: 1 } },
    { time: 0.5, values: { x: 60, opacity: 0.7 } },
    { time: 1, values: { x: 0, opacity: 1 } }
  ]),
  anim("preset_slide_wipe_up", "Slide Wipe Up", "transition", "Morphing SVG", "easeOutCubic", 0.5, "from-teal-400 to-cyan-500", [
    { time: 0, values: { y: 120, opacity: 0 } },
    { time: 1, values: { y: 0, opacity: 1 } }
  ]),
  anim("preset_slide_wipe_left", "Slide Wipe Left", "transition", "Morphing SVG", "easeOutCubic", 0.5, "from-cyan-400 to-blue-600", [
    { time: 0, values: { x: 140, opacity: 0 } },
    { time: 1, values: { x: 0, opacity: 1 } }
  ]),
  anim("preset_radial_blur_warp", "Radial Blur Warp Flash", "transition", "Optical Flow", "easeInOutCubic", 0.45, "from-indigo-400 to-fuchsia-600", [
    { time: 0, values: { scaleX: 1, scaleY: 1, opacity: 1 } },
    { time: 0.5, values: { scaleX: 1.7, scaleY: 1.7, opacity: 0.5 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, opacity: 1 } }
  ]),
  anim("preset_glitch_transition", "Digital Glitch Cut", "transition", "Glitch Vector", "steps", 0.3, "from-lime-400 to-green-700", [
    { time: 0, values: { x: 0, skewX: 0, opacity: 1 } },
    { time: 0.5, values: { x: -20, skewX: -12, opacity: 0.6 } },
    { time: 1, values: { x: 0, skewX: 0, opacity: 1 } }
  ]),
  anim("preset_zoom_blur_transition", "Zoom-Blur Speed Ramp", "transition", "Optical Flow", "easeInOutCubic", 0.4, "from-red-500 to-orange-600", [
    { time: 0, values: { scaleX: 1, scaleY: 1 } },
    { time: 0.5, values: { scaleX: 1.9, scaleY: 1.9 } },
    { time: 1, values: { scaleX: 1, scaleY: 1 } }
  ]),

  // ---- LOWER THIRDS ----
  anim("preset_lower_third_slide", "Broadcast Lower Third Slide", "lower_third", "Morphing SVG", "easeOutCubic", 0.6, "from-teal-400 to-emerald-600", [
    { time: 0, values: { x: -220, opacity: 0 } },
    { time: 1, values: { x: 0, opacity: 1 } }
  ]),
  anim("preset_lower_third_swoosh", "News Swoosh Reveal", "lower_third", "Optical Flow", "easeInOutCubic", 0.5, "from-cyan-400 to-teal-500", [
    { time: 0, values: { x: -160, opacity: 0, skewX: 20 } },
    { time: 0.6, values: { x: 10, opacity: 1, skewX: -4 } },
    { time: 1, values: { x: 0, opacity: 1, skewX: 0 } }
  ]),
  anim("preset_lower_third_curve", "Curve-Drawn Calligraphy", "lower_third", "Morphing SVG", "easeInOutSine", 0.8, "from-amber-400 to-yellow-600", [
    { time: 0, values: { opacity: 0, x: -60 } },
    { time: 1, values: { opacity: 1, x: 0 } }
  ]),
  anim("preset_lower_third_minimal", "Minimal Clean Bar Slide", "lower_third", "Morphing SVG", "easeOutCubic", 0.4, "from-slate-300 to-neutral-500", [
    { time: 0, values: { x: -200, opacity: 0 } },
    { time: 1, values: { x: 0, opacity: 1 } }
  ]),
  anim("preset_lower_third_bracket", "Tech HUD Bracket Reveal", "lower_third", "Morphing SVG", "easeOutBack", 0.55, "from-cyan-400 to-emerald-400", [
    { time: 0, values: { x: -120, opacity: 0 } },
    { time: 0.6, values: { x: 6, opacity: 1 } },
    { time: 1, values: { x: 0, opacity: 1 } }
  ]),

  // ---- CALLOUTS ----
  anim("preset_callout_pointer", "Animated Callout Arrow", "callout", "Morphing SVG", "easeInOutCubic", 0.5, "from-red-500 to-pink-500", [
    { time: 0, values: { x: -40, y: 0, opacity: 0 } },
    { time: 0.5, values: { x: 8, opacity: 1 } },
    { time: 1, values: { x: 0, opacity: 1 } }
  ]),
  anim("preset_callout_ping", "Radar Ping Focus Ring", "callout", "Morphing SVG", "easeOutSine", 0.7, "from-cyan-400 to-blue-500", [
    { time: 0, values: { scaleX: 0.4, scaleY: 0.4, opacity: 1 } },
    { time: 1, values: { scaleX: 1.8, scaleY: 1.8, opacity: 0 } }
  ]),
  anim("preset_callout_crosshair", "FPS Crosshair Snap", "callout", "Strobe Flash", "easeOutCubic", 0.35, "from-lime-400 to-emerald-500", [
    { time: 0, values: { scaleX: 1.6, scaleY: 1.6, opacity: 0 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, opacity: 1 } }
  ]),
  anim("preset_callout_bounce_point", "Bouncing Hand-Drawn Point", "callout", "Spring Physics", "spring", 0.5, "from-yellow-400 to-amber-600", [
    { time: 0, values: { y: -24, opacity: 0 } },
    { time: 0.5, values: { y: 4, opacity: 1 } },
    { time: 1, values: { y: 0, opacity: 1 } }
  ]),

  // ---- MOTION GRAPHICS ----
  anim("preset_liquid_morph", "Liquid Vector Shape Morph", "motion_graphics", "Liquid Distortion", "easeInOutSine", 0.9, "from-emerald-400 to-cyan-500", [
    { time: 0, values: { scaleX: 0.6, scaleY: 0.6, rotation: -12, opacity: 0 } },
    { time: 0.5, values: { scaleX: 1.15, scaleY: 1.15, rotation: 6, opacity: 1 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, rotation: 0, opacity: 1 } }
  ]),
  anim("preset_split_matrix", "4-Way Split Screen Matrix", "motion_graphics", "3D Parallax", "easeOutCubic", 0.8, "from-indigo-600 to-violet-500", [
    { time: 0, values: { scaleX: 2, scaleY: 2, opacity: 0 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, opacity: 1 } }
  ]),
  anim("preset_audio_reactive_scale", "Bass Drop Audio-Reactive Scale", "motion_graphics", "Spring Physics", "spring", 0.25, "from-emerald-500 to-teal-300", [
    { time: 0, values: { scaleX: 1, scaleY: 1 } },
    { time: 0.5, values: { scaleX: 1.3, scaleY: 0.85 } },
    { time: 1, values: { scaleX: 1, scaleY: 1 } }
  ]),
  anim("preset_crt_pixel_disperse", "Retro CRT Pixel Disperse", "motion_graphics", "Glitch Vector", "steps", 0.55, "from-green-400 to-emerald-700", [
    { time: 0, values: { opacity: 1, scaleX: 1, scaleY: 1 } },
    { time: 0.5, values: { opacity: 0.5, scaleX: 0.7, scaleY: 0.7, skewX: -10 } },
    { time: 1, values: { opacity: 1, scaleX: 1, scaleY: 1, skewX: 0 } }
  ]),
  anim("preset_coin_flip_logo", "Coin-Flip Logo Spin", "logo", "3D Parallax", "easeInOutBack", 1.2, "from-amber-400 to-yellow-600", [
    { time: 0, values: { rotation: 0, scaleX: 0.3, scaleY: 0.3, opacity: 0 } },
    { time: 0.5, values: { rotation: 180, scaleX: 1.1, scaleY: 1.1, opacity: 1 } },
    { time: 1, values: { rotation: 360, scaleX: 1, scaleY: 1, opacity: 1 } }
  ]),
  anim("preset_logo_bounce_in", "Logo Bounce Drop-In", "logo", "Spring Physics", "spring", 0.7, "from-rose-500 to-orange-500", [
    { time: 0, values: { y: -200, opacity: 0 } },
    { time: 0.45, values: { y: 6, opacity: 1 } },
    { time: 0.7, values: { y: -6 } },
    { time: 1, values: { y: 0 } }
  ]),
  anim("preset_glitch_scan_logo", "Scanline Glitch Reveal", "logo", "Glitch Vector", "steps", 0.5, "from-lime-500 to-cyan-400", [
    { time: 0, values: { opacity: 0, y: -20, skewX: -15 } },
    { time: 0.6, values: { opacity: 1, y: 0, skewX: 5 } },
    { time: 1, values: { opacity: 1, skewX: 0 } }
  ]),
  anim("preset_geometric_burst", "Geometric Burst Lines", "motion_graphics", "Morphing SVG", "easeOutBack", 0.6, "from-fuchsia-500 to-violet-600", [
    { time: 0, values: { scaleX: 0, scaleY: 1, opacity: 0 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, opacity: 1 } }
  ]),
  anim("preset_circle_pulse_ring", "Infinite Pulse Ring", "motion_graphics", "Morphing SVG", "easeOutSine", 1, "from-sky-400 to-indigo-500", [
    { time: 0, values: { scaleX: 0.5, scaleY: 0.5, opacity: 1 } },
    { time: 1, values: { scaleX: 1.6, scaleY: 1.6, opacity: 0.3 } }
  ]),
  anim("preset_paper_cutout", "Paper Cutout Layers", "motion_graphics", "Paper Cutout", "easeInOutCubic", 1, "from-orange-300 to-amber-500", [
    { time: 0, values: { x: -120, y: -80, rotation: -8, opacity: 0 } },
    { time: 1, values: { x: 0, y: 0, rotation: 0, opacity: 1 } }
  ]),
  anim("preset_wave_oscillator", "Sine Wave Oscillation", "motion_graphics", "Liquid Distortion", "easeInOutSine", 1.4, "from-cyan-400 to-blue-600", [
    { time: 0, values: { y: 0, rotation: 0 } },
    { time: 0.25, values: { y: 14, rotation: 3 } },
    { time: 0.5, values: { y: -10, rotation: -2 } },
    { time: 0.75, values: { y: 8, rotation: 2 } },
    { time: 1, values: { y: 0, rotation: 0 } }
  ]),
  anim("preset_vhs_glitch_scan", "VHS Tracking Scan Break", "motion_graphics", "Glitch Vector", "steps", 0.6, "from-teal-400 to-emerald-600", [
    { time: 0, values: { y: 0, opacity: 1 } },
    { time: 0.3, values: { y: 26, opacity: 0.7 } },
    { time: 0.6, values: { y: -20, opacity: 0.9 } },
    { time: 1, values: { y: 0, opacity: 1 } }
  ]),
  anim("preset_zoom_boom_in", "Zoom Boom Impact", "motion_graphics", "Shake Impact", "easeOutBack", 0.4, "from-red-500 to-rose-600", [
    { time: 0, values: { scaleX: 0.8, scaleY: 0.8, opacity: 0 } },
    { time: 0.6, values: { scaleX: 1.3, scaleY: 1.3, opacity: 1 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, opacity: 1 } }
  ]),

  // ---- REVEALS ----
  anim("preset_fade_in", "Classic Fade In", "reveal", "Kinetic Typography", "easeOutQuad", 0.8, "from-neutral-400 to-neutral-200", [
    { time: 0, values: { opacity: 0 } },
    { time: 1, values: { opacity: 1 } }
  ]),
  anim("preset_fade_in_up", "Fade In Up", "reveal", "Kinetic Typography", "easeOutCubic", 0.7, "from-sky-400 to-blue-600", [
    { time: 0, values: { opacity: 0, y: 30 } },
    { time: 1, values: { opacity: 1, y: 0 } }
  ]),
  anim("preset_fade_in_down", "Fade In Down", "reveal", "Kinetic Typography", "easeOutCubic", 0.7, "from-emerald-400 to-teal-600", [
    { time: 0, values: { opacity: 0, y: -30 } },
    { time: 1, values: { opacity: 1, y: 0 } }
  ]),
  anim("preset_fade_in_left", "Fade In Left", "reveal", "Kinetic Typography", "easeOutCubic", 0.7, "from-rose-400 to-pink-600", [
    { time: 0, values: { opacity: 0, x: -40 } },
    { time: 1, values: { opacity: 1, x: 0 } }
  ]),
  anim("preset_fade_in_right", "Fade In Right", "reveal", "Kinetic Typography", "easeOutCubic", 0.7, "from-amber-400 to-orange-600", [
    { time: 0, values: { opacity: 0, x: 40 } },
    { time: 1, values: { opacity: 1, x: 0 } }
  ]),
  anim("preset_blur_in", "Blur In Focus", "reveal", "Kinetic Typography", "easeOutCubic", 0.9, "from-indigo-400 to-violet-600", [
    { time: 0, values: { opacity: 0, scaleX: 1.3, scaleY: 1.3 } },
    { time: 1, values: { opacity: 1, scaleX: 1, scaleY: 1 } }
  ]),
  anim("preset_zoom_in_fade", "Zoom-In Fade Reveal", "reveal", "3D Parallax", "easeOutCubic", 0.8, "from-fuchsia-400 to-purple-600", [
    { time: 0, values: { opacity: 0, scaleX: 0.5, scaleY: 0.5 } },
    { time: 1, values: { opacity: 1, scaleX: 1, scaleY: 1 } }
  ]),
  anim("preset_rotate_in", "Rotate Swing In", "reveal", "Spring Physics", "easeOutBack", 0.7, "from-lime-400 to-green-600", [
    { time: 0, values: { rotation: -120, opacity: 0 } },
    { time: 1, values: { rotation: 0, opacity: 1 } }
  ]),
  anim("preset_flip_in", "Flip Up Reveal", "reveal", "3D Parallax", "easeOutBack", 0.75, "from-cyan-400 to-sky-600", [
    { time: 0, values: { rotation: 90, scaleX: 0.7, scaleY: 0.7, opacity: 0, y: -30 } },
    { time: 1, values: { rotation: 0, scaleX: 1, scaleY: 1, opacity: 1, y: 0 } }
  ]),
  anim("preset_scale_x_in", "Scale-X Banner Stretch", "reveal", "Morphing SVG", "easeOutBack", 0.6, "from-amber-400 to-red-500", [
    { time: 0, values: { scaleX: 0, scaleY: 1, opacity: 0 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, opacity: 1 } }
  ]),
  anim("preset_gradient_wash", "Gradient Wash Reveal", "reveal", "Kinetic Typography", "easeInOutSine", 1, "from-violet-500 via-fuchsia-500 to-cyan-400", [
    { time: 0, values: { opacity: 0, y: 40 } },
    { time: 1, values: { opacity: 1, y: 0 } }
  ]),

  // ---- KINETIC TYPOGRAPHY ----
  anim("preset_kinetic_slam", "Kinetic Slam Center Text", "kinetic_typography", "Kinetic Typography", "easeOutBack", 0.35, "from-red-500 to-orange-500", [
    { time: 0, values: { scaleX: 3, scaleY: 3, opacity: 0 } },
    { time: 0.5, values: { scaleX: 0.95, scaleY: 0.95, opacity: 1 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, opacity: 1 } }
  ]),
  anim("preset_kinetic_zoom_word", "Punch-In Zoom Word", "kinetic_typography", "Kinetic Typography", "easeOutCubic", 0.3, "from-yellow-400 to-amber-600", [
    { time: 0, values: { scaleX: 0.4, scaleY: 0.4, opacity: 0 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, opacity: 1 } }
  ]),
  anim("preset_kinetic_shake_word", "Slam-Shake Emphasis", "kinetic_typography", "Shake Impact", "easeInQuad", 0.3, "from-rose-500 to-pink-600", [
    { time: 0, values: { x: 0, scaleX: 1.2, scaleY: 1.2 } },
    { time: 0.4, values: { x: -12, scaleX: 1, scaleY: 1 } },
    { time: 0.7, values: { x: 8 } },
    { time: 1, values: { x: 0 } }
  ]),
  anim("preset_kinetic_bounce_word", "Spring Bounce Keyword", "kinetic_typography", "Spring Physics", "spring", 0.45, "from-emerald-400 to-lime-600", [
    { time: 0, values: { scaleX: 0.5, scaleY: 0.5, opacity: 0, y: -10 } },
    { time: 0.6, values: { scaleX: 1.2, scaleY: 0.85, opacity: 1, y: 0 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, opacity: 1, y: 0 } }
  ]),
  anim("preset_kinetic_highlight", "Highlight Marker Sweep", "kinetic_typography", "Kinetic Typography", "easeInOutQuad", 0.5, "from-yellow-300 to-yellow-600", [
    { time: 0, values: { x: -80, opacity: 0.4 } },
    { time: 1, values: { x: 0, opacity: 1 } }
  ]),
  anim("preset_kinetic_big_wobble", "Overshoot Big Wobble", "kinetic_typography", "Spring Physics", "easeInOutBack", 0.5, "from-violet-400 to-fuchsia-600", [
    { time: 0, values: { scaleX: 0.2, scaleY: 0.2, rotation: -8, opacity: 0 } },
    { time: 0.5, values: { scaleX: 1.4, scaleY: 0.8, rotation: 3, opacity: 1 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, rotation: 0, opacity: 1 } }
  ]),

  // ---- TEXT (Wave 2) ----
  anim("preset_word_glitch_teleport", "Glitch Teleport Word", "text", "Glitch Vector", "steps", 0.35, "from-fuchsia-500 to-violet-600", [
    { time: 0, values: { x: 0, scaleX: 1, scaleY: 1, opacity: 1 } },
    { time: 0.3, values: { x: -6, skewX: 14, opacity: 0.6 } },
    { time: 0.55, values: { x: 8, scaleX: 1.1, opacity: 0.8 } },
    { time: 1, values: { x: 0, skewX: 0, scaleX: 1, scaleY: 1, opacity: 1 } }
  ]),
  anim("preset_text_stretch_wipe", "Stretch Wipe Reveal", "text", "Kinetic Typography", "easeInOutBack", 0.6, "from-cyan-400 to-blue-600", [
    { time: 0, values: { scaleX: 0.05, scaleY: 1.4, opacity: 0 } },
    { time: 0.7, values: { scaleX: 1.25, scaleY: 0.9, opacity: 1 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, opacity: 1 } }
  ]),
  anim("preset_magazine_3d_tilt", "Magazine 3D Tilt", "text", "3D Parallax", "easeOutQuart", 0.5, "from-stone-400 to-slate-700", [
    { time: 0, values: { rotation: -24, scaleX: 0.8, scaleY: 0.8, opacity: 0, y: 60 } },
    { time: 0.6, values: { rotation: 4, scaleX: 1.06, scaleY: 1.06, opacity: 1, y: 0 } },
    { time: 1, values: { rotation: 0, scaleX: 1, scaleY: 1, opacity: 1, y: 0 } }
  ]),
  anim("preset_hologram_flicker", "Hologram Flicker", "text", "Strobe Flash", "blink", 0.8, "from-cyan-300 to-teal-400", [
    { time: 0, values: { opacity: 0, y: -14 } },
    { time: 0.15, values: { opacity: 1 } },
    { time: 0.3, values: { opacity: 0.4, x: 3 } },
    { time: 0.45, values: { opacity: 1 } },
    { time: 0.7, values: { opacity: 0.7, skewX: 6 } },
    { time: 1, values: { opacity: 1, x: 0, y: 0, skewX: 0 } }
  ]),
  anim("preset_smoke_reveal", "Liquid Smoke Reveal", "text", "Liquid Distortion", "easeOutCubic", 0.9, "from-slate-400 to-neutral-700", [
    { time: 0, values: { opacity: 0, y: 26, scaleX: 0.9, scaleY: 0.9 } },
    { time: 0.5, values: { opacity: 0.7, y: -6, skewX: 4 } },
    { time: 1, values: { opacity: 1, y: 0, scaleX: 1, scaleY: 1, skewX: 0 } }
  ]),
  anim("preset_word_shred", "Paper Shred Cut", "text", "Paper Cutout", "easeInQuad", 0.3, "from-amber-300 to-orange-500", [
    { time: 0, values: { scaleY: 1, opacity: 1, rotation: 0 } },
    { time: 0.5, values: { scaleY: 0.2, skewX: -18, opacity: 0.8, x: -12 } },
    { time: 1, values: { scaleY: 0, opacity: 0, rotation: 8 } }
  ]),
  anim("preset_letter_rain", "Letter Rain Drop", "text", "Kinetic Typography", "easeOutBounce", 0.7, "from-sky-400 to-indigo-600", [
    { time: 0, values: { y: -120, opacity: 0 } },
    { time: 0.55, values: { y: 8, opacity: 1 } },
    { time: 0.8, values: { y: -4 } },
    { time: 1, values: { y: 0 } }
  ]),
  anim("preset_caption_beat_pop", "Trend Caption Beat Pop", "text", "Kinetic Typography", "spring", 0.35, "from-lime-400 to-emerald-600", [
    { time: 0, values: { scaleX: 0.3, scaleY: 0.3, opacity: 0 } },
    { time: 0.45, values: { scaleX: 1.35, scaleY: 0.9, opacity: 1 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, opacity: 1 } }
  ]),
  anim("preset_highlight_shadow_slide", "Shadow Highlight Slide", "text", "Kinetic Typography", "easeOutExpo", 0.5, "from-yellow-300 to-amber-500", [
    { time: 0, values: { x: -90, opacity: 0.3 } },
    { time: 0.5, values: { x: 8, opacity: 1 } },
    { time: 1, values: { x: 0, opacity: 1 } }
  ]),

  // ---- VIDEO / CAMERA (Wave 2) ----
  anim("preset_cam_handheld_shake", "Handheld Shake", "video", "Shake Impact", "easeInOutSine", 0.6, "from-zinc-500 to-zinc-800", [
    { time: 0, values: { x: 0, y: 0, rotation: 0 } },
    { time: 0.2, values: { x: -6, y: 3, rotation: 1.2 } },
    { time: 0.4, values: { x: 5, y: -4, rotation: -1 } },
    { time: 0.6, values: { x: -3, y: 2, rotation: 0.8 } },
    { time: 0.8, values: { x: 4, y: -1, rotation: -0.5 } },
    { time: 1, values: { x: 0, y: 0, rotation: 0 } }
  ]),
  anim("preset_cam_drone_pan", "Smooth Drone Pan", "video", "Optical Flow", "easeInOutSine", 2, "from-sky-500 to-cyan-400", [
    { time: 0, values: { x: -140, scaleX: 1.08, scaleY: 1.08 } },
    { time: 1, values: { x: 140, scaleX: 1.08, scaleY: 1.08 } }
  ]),
  anim("preset_cam_parallax_depth", "Parallax Depth Dolly", "video", "3D Parallax", "easeInOutCubic", 1.6, "from-violet-500 to-purple-700", [
    { time: 0, values: { scaleX: 1.25, scaleY: 1.25, x: -24, y: -8 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, x: 0, y: 0 } }
  ]),
  anim("preset_cam_speed_ramp", "Velocity Speed Ramp", "video", "Optical Flow", "easeOutWindup", 0.7, "from-rose-500 to-red-700", [
    { time: 0, values: { scaleX: 1, scaleY: 1 } },
    { time: 0.45, values: { scaleX: 1.6, scaleY: 1.6, opacity: 0.4 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, opacity: 1 } }
  ]),
  anim("preset_cam_whip_right", "Whip Pan Right", "video", "Optical Flow", "easeInOutQuart", 0.5, "from-indigo-400 to-blue-700", [
    { time: 0, values: { x: -260, skewX: 18, opacity: 0.4 } },
    { time: 0.6, values: { x: 40, skewX: -6, opacity: 1 } },
    { time: 1, values: { x: 0, skewX: 0, opacity: 1 } }
  ]),
  anim("preset_cam_tilt_dolly", "Tilt-Up Dolly", "video", "Optical Flow", "easeOutCubic", 1.2, "from-emerald-400 to-teal-700", [
    { time: 0, values: { y: 90, scaleX: 1.12, scaleY: 1.12 } },
    { time: 1, values: { y: 0, scaleX: 1.12, scaleY: 1.12 } }
  ]),
  anim("preset_cam_punch_in", "Punch-In Impact", "video", "Shake Impact", "easeOutWindup", 0.4, "from-orange-400 to-amber-700", [
    { time: 0, values: { scaleX: 1, scaleY: 1 } },
    { time: 0.35, values: { scaleX: 1.55, scaleY: 1.55 } },
    { time: 0.75, values: { scaleX: 1.08, scaleY: 1.08 } },
    { time: 1, values: { scaleX: 1.12, scaleY: 1.12 } }
  ]),
  anim("preset_cam_ken_burns", "Slow Ken Burns Push", "video", "Optical Flow", "linear", 3, "from-stone-400 to-stone-700", [
    { time: 0, values: { scaleX: 1, scaleY: 1, x: 0, y: 0 } },
    { time: 1, values: { scaleX: 1.15, scaleY: 1.15, x: -20, y: -14 } }
  ]),
  anim("preset_cam_gimbal_swing", "Gimbal Orbital Swing", "video", "Optical Flow", "easeInOutBack", 1.8, "from-cyan-500 to-emerald-500", [
    { time: 0, values: { x: -40, y: 0, rotation: -3 } },
    { time: 0.5, values: { x: 40, y: 6, rotation: 3 } },
    { time: 1, values: { x: -40, y: 0, rotation: -3 } }
  ]),
  anim("preset_cam_stab_warp", "Warp Stab Recover", "video", "Shake Impact", "easeOutCubic", 0.5, "from-neutral-600 to-zinc-900", [
    { time: 0, values: { x: 0, y: 0, scaleX: 1.25, rotation: 0 } },
    { time: 0.3, values: { x: 14, y: 10, rotation: 4, scaleX: 1.05 } },
    { time: 1, values: { x: 0, y: 0, rotation: 0, scaleX: 1 } }
  ]),

  // ---- TRANSITIONS (Wave 2) ----
  anim("preset_tr_blink_flash", "Blink Flash Cut", "transition", "Strobe Flash", "blink", 0.3, "from-white to-neutral-300", [
    { time: 0, values: { opacity: 1 } },
    { time: 0.5, values: { opacity: 0, scaleX: 1.4, scaleY: 1.4 } },
    { time: 1, values: { opacity: 1, scaleX: 1, scaleY: 1 } }
  ]),
  anim("preset_tr_glass_warp", "Glass Warp Dissolve", "transition", "Liquid Distortion", "easeInOutCubic", 0.7, "from-cyan-300 to-blue-500", [
    { time: 0, values: { scaleX: 1, skewX: 0, opacity: 1 } },
    { time: 0.5, values: { scaleX: 1.3, skewX: -12, opacity: 0.6 } },
    { time: 1, values: { scaleX: 0.6, skewX: 8, opacity: 0 } }
  ]),
  anim("preset_tr_cut_on_beat", "Cut On The Beat", "transition", "Strobe Flash", "steps", 0.25, "from-fuchsia-400 to-purple-600", [
    { time: 0, values: { scaleX: 1.3, scaleY: 1.3, opacity: 0 } },
    { time: 0.6, values: { scaleX: 0.9, scaleY: 0.9, opacity: 1 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, opacity: 1 } }
  ]),
  anim("preset_tr_zigzag_shutter", "Zigzag Shutter Slice", "transition", "Kinetic Typography", "easeInOutBack", 0.5, "from-slate-500 to-slate-800", [
    { time: 0, values: { skewY: 0, x: 0, opacity: 1 } },
    { time: 0.6, values: { skewY: -22, x: -30, opacity: 0.7 } },
    { time: 1, values: { skewY: 0, x: -260, opacity: 0 } }
  ]),
  anim("preset_tr_ink_bleed", "Ink Bleed Spread", "transition", "Liquid Distortion", "easeOutExpo", 0.8, "from-stone-800 to-slate-950", [
    { time: 0, values: { scaleX: 0.15, scaleY: 0.15, opacity: 0 } },
    { time: 0.5, values: { scaleX: 1.1, scaleY: 1.1, opacity: 0.9 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, opacity: 1 } }
  ]),

  // ---- LOWER THIRDS (Wave 2) ----
  anim("preset_lt_minimal_clean", "Minimal Clean Lower Third", "lower_third", "Kinetic Typography", "easeOutExpo", 0.8, "from-neutral-300 to-slate-600", [
    { time: 0, values: { x: -320, opacity: 0 } },
    { time: 0.55, values: { x: 6, opacity: 1 } },
    { time: 1, values: { x: 0, opacity: 1 } }
  ]),
  anim("preset_lt_sport_chyron", "Sports Chyron Pop", "lower_third", "Spring Physics", "spring", 0.5, "from-red-500 to-amber-500", [
    { time: 0, values: { scaleX: 0.2, scaleY: 0.2, opacity: 0, rotation: -4 } },
    { time: 0.6, values: { scaleX: 1.15, scaleY: 0.9, opacity: 1, rotation: 0 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, opacity: 1 } }
  ]),
  anim("preset_lt_news_swoosh", "News Swoosh Sweep", "lower_third", "Kinetic Typography", "easeInOutQuad", 0.6, "from-red-600 to-rose-800", [
    { time: 0, values: { x: 340, skewX: -14, opacity: 0 } },
    { time: 0.5, values: { x: -8, skewX: 2, opacity: 1 } },
    { time: 1, values: { x: 0, skewX: 0, opacity: 1 } }
  ]),
  anim("preset_lt_tech_hud", "Tech HUD Scan Lower", "lower_third", "3D Parallax", "easeOutQuart", 0.7, "from-cyan-400 to-teal-600", [
    { time: 0, values: { x: 0, y: -40, opacity: 0, skewX: 10 } },
    { time: 0.5, values: { y: 6, opacity: 1, skewX: -3 } },
    { time: 1, values: { y: 0, opacity: 1, skewX: 0 } }
  ]),
  anim("preset_lt_gradient_glass", "Gradient Glass Reveal", "lower_third", "Kinetic Typography", "easeOutCubic", 0.7, "from-fuchsia-400 to-cyan-400", [
    { time: 0, values: { y: 44, opacity: 0, scaleY: 0.7 } },
    { time: 0.6, values: { y: -4, opacity: 1, scaleY: 1.05 } },
    { time: 1, values: { y: 0, opacity: 1, scaleY: 1 } }
  ]),

  // ---- CALLOUTS (Wave 2) ----
  anim("preset_callout_ping_target", "Ping Radar Target", "callout", "Spring Physics", "spring", 0.6, "from-rose-400 to-red-600", [
    { time: 0, values: { scaleX: 0, scaleY: 0, opacity: 0 } },
    { time: 0.5, values: { scaleX: 1.3, scaleY: 1.3, opacity: 1 } },
    { time: 0.8, values: { scaleX: 0.92, scaleY: 0.92 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, opacity: 1 } }
  ]),
  anim("preset_callout_arrow_swing", "Callout Arrow Swing", "callout", "Optical Flow", "easeInOutBack", 0.7, "from-amber-400 to-orange-600", [
    { time: 0, values: { rotation: -14, x: -30, opacity: 0 } },
    { time: 0.55, values: { rotation: 6, x: 6, opacity: 1 } },
    { time: 1, values: { rotation: 0, x: 0, opacity: 1 } }
  ]),
  anim("preset_callout_circle_scan", "Circle Scan Brackets", "callout", "Strobe Flash", "steps", 0.5, "from-lime-400 to-emerald-600", [
    { time: 0, values: { opacity: 0, scaleX: 1.4, scaleY: 1.4 } },
    { time: 0.4, values: { opacity: 1, scaleX: 0.95, scaleY: 0.95 } },
    { time: 1, values: { opacity: 1, scaleX: 1, scaleY: 1 } }
  ]),

  // ---- MOTION GRAPHICS / LOGO / 3D (Wave 2) ----
  anim("preset_mg_circle_pulse", "Pulse Ring Ripple", "motion_graphics", "Spring Physics", "spring", 0.8, "from-cyan-400 to-indigo-500", [
    { time: 0, values: { scaleX: 0.4, scaleY: 0.4, opacity: 0.6 } },
    { time: 0.5, values: { scaleX: 1.4, scaleY: 1.4, opacity: 1 } },
    { time: 0.8, values: { scaleX: 0.9, scaleY: 0.9 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, opacity: 1 } }
  ]),
  anim("preset_logo_coin_flip", "Logo Coin Flip", "logo", "3D Parallax", "easeInOutBack", 0.7, "from-yellow-400 to-amber-600", [
    { time: 0, values: { scaleX: 0.1, scaleY: 1.2, rotation: -90, opacity: 0 } },
    { time: 0.6, values: { scaleX: 1.15, scaleY: 0.85, rotation: 8, opacity: 1 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, rotation: 0, opacity: 1 } }
  ]),
  anim("preset_logo_stomp", "Logo Stomp Drop", "logo", "Shake Impact", "easeOutBounce", 0.8, "from-rose-400 to-purple-700", [
    { time: 0, values: { y: -140, opacity: 0, scaleX: 1.1, scaleY: 1.1 } },
    { time: 0.6, values: { y: 6, opacity: 1 } },
    { time: 1, values: { y: 0, scaleX: 1, scaleY: 1 } }
  ]),
  anim("preset_cam_3d_rotate_x", "3D Rotate X Spin", "camera_3d", "3D Parallax", "easeInOutCubic", 0.9, "from-sky-500 to-indigo-700", [
    { time: 0, values: { scaleX: 0.25, scaleY: 1.2, opacity: 0.4, rotation: -10 } },
    { time: 0.5, values: { scaleX: 1.1, scaleY: 0.85, opacity: 1, rotation: 4 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, opacity: 1, rotation: 0 } }
  ]),
  anim("preset_cam_3d_swing", "3D Swing Orbit", "camera_3d", "3D Parallax", "easeInOutSine", 1.4, "from-emerald-400 to-cyan-600", [
    { time: 0, values: { rotation: -8, skewX: 6, x: -30 } },
    { time: 0.5, values: { rotation: 8, skewX: -6, x: 30 } },
    { time: 1, values: { rotation: -8, skewX: 6, x: -30 } }
  ]),

  // ---- REVEALS (Wave 2) ----
  anim("preset_reveal_iris", "Iris Wipe Reveal", "reveal", "Morphing SVG", "easeInOutExpo", 0.8, "from-neutral-200 to-slate-500", [
    { time: 0, values: { scaleX: 0.1, scaleY: 0.1, opacity: 0 } },
    { time: 0.5, values: { scaleX: 1.2, scaleY: 1.2, opacity: 0.9 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, opacity: 1 } }
  ]),
  anim("preset_reveal_blur_zoom", "Blur Zoom Focus", "reveal", "Optical Flow", "easeOutCubic", 1, "from-violet-400 to-fuchsia-600", [
    { time: 0, values: { scaleX: 2.2, scaleY: 2.2, opacity: 0 } },
    { time: 0.6, values: { scaleX: 0.95, scaleY: 0.95, opacity: 1 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, opacity: 1 } }
  ]),

  // ---- WAVE 3: Motion Graphics Techniques ----
  anim("preset_parallax_depth_zoom", "Parallax Depth Zoom", "video", "3D Parallax", "easeOutExpo", 1.2, "from-indigo-500 to-cyan-400", [
    { time: 0, values: { scaleX: 0.6, scaleY: 0.6, x: -60, opacity: 0 } },
    { time: 0.5, values: { scaleX: 1.1, scaleY: 1.1, x: 20, opacity: 1 } },
    { time: 1, values: { scaleX: 1.25, scaleY: 1.25, x: 0, opacity: 1 } }
  ]),
  anim("preset_liquid_metal_slide", "Liquid Metal Slide", "text", "Liquid Distortion", "easeInOutCubic", 1, "from-slate-300 via-cyan-400 to-slate-600", [
    { time: 0, values: { scaleX: 1.4, scaleY: 0.2, opacity: 0, skewX: -40, x: -80 } },
    { time: 0.4, values: { scaleX: 0.9, scaleY: 1.4, opacity: 1, skewX: 12, x: 10 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, opacity: 1, skewX: 0, x: 0 } }
  ]),
  anim("preset_paper_cutout_flip", "Paper Cutout Flip", "reveal", "Paper Cutout", "easeOutBack", 0.9, "from-amber-200 to-orange-500", [
    { time: 0, values: { scaleX: 0.1, scaleY: 1, opacity: 0, rotation: -90 } },
    { time: 0.6, values: { scaleX: 1.15, scaleY: 0.9, opacity: 1, rotation: 4 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, opacity: 1, rotation: 0 } }
  ]),
  anim("preset_kinetic_split_wipe", "Kinetic Split Wipe", "motion_graphics", "Kinetic Typography", "easeOutQuart", 0.7, "from-fuchsia-500 to-indigo-600", [
    { time: 0, values: { opacity: 0, x: -200, rotation: -12 } },
    { time: 0.5, values: { opacity: 1, x: 10, rotation: 2 } },
    { time: 1, values: { opacity: 1, x: 0, rotation: 0 } }
  ]),
  anim("preset_digital_rain_flicker", "Digital Rain Flicker", "text", "Glitch Vector", "steps", 0.5, "from-emerald-400 to-teal-600", [
    { time: 0, values: { opacity: 0.2, x: -10, skewX: 30 } },
    { time: 0.3, values: { opacity: 1, x: 4, skewX: -20 } },
    { time: 0.6, values: { opacity: 0.4, x: -4, skewX: 15 } },
    { time: 1, values: { opacity: 1, x: 0, skewX: 0 } }
  ]),
  anim("preset_zoom_punch_scale", "Zoom Punch Impact", "video", "Shake Impact", "spring", 0.5, "from-rose-500 to-orange-400", [
    { time: 0, values: { scaleX: 0.7, scaleY: 0.7, opacity: 0.4 } },
    { time: 0.35, values: { scaleX: 1.3, scaleY: 1.3, opacity: 1 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, opacity: 1 } }
  ]),
  anim("preset_3d_tilt_parallax", "3D Tilt Parallax Float", "camera_3d", "3D Parallax", "easeInOutSine", 1.4, "from-violet-500 to-pink-500", [
    { time: 0, values: { rotation: -8, scaleX: 1.05, scaleY: 1.05, y: 0 } },
    { time: 0.25, values: { rotation: 4, scaleX: 1.02, scaleY: 1.02, y: -10 } },
    { time: 0.5, values: { rotation: -4, scaleX: 1.05, scaleY: 1.05, y: 4 } },
    { time: 0.75, values: { rotation: 3, scaleX: 1.02, scaleY: 1.02, y: -8 } },
    { time: 1, values: { rotation: 0, scaleX: 1, scaleY: 1, y: 0 } }
  ]),
  anim("preset_morph_circle_wipe", "Morphing Circle Wipe", "reveal", "Morphing SVG", "easeInOutExpo", 1, "from-sky-400 to-emerald-500", [
    { time: 0, values: { scaleX: 0, scaleY: 0, opacity: 0 } },
    { time: 0.45, values: { scaleX: 1.3, scaleY: 1.3, opacity: 1 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, opacity: 1 } }
  ]),
  anim("preset_callout_arrow_dash", "Callout Arrow Dash", "callout", "Kinetic Typography", "easeOutQuint", 0.6, "from-emerald-400 to-cyan-500", [
    { time: 0, values: { opacity: 0, x: -60, skewX: -20 } },
    { time: 0.5, values: { opacity: 1, x: 12, skewX: 0 } },
    { time: 1, values: { opacity: 1, x: 0 } }
  ]),
  anim("preset_logo_reveal_stroke", "Logo Stroke Reveal", "logo", "Morphing SVG", "easeOutCubic", 1.2, "from-neutral-100 to-cyan-400", [
    { time: 0, values: { scaleX: 0.2, scaleY: 0.2, opacity: 0, rotation: -180 } },
    { time: 0.5, values: { scaleX: 1.2, scaleY: 0.8, opacity: 0.9 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, opacity: 1, rotation: 0 } }
  ]),
  anim("preset_lower_third_blur_slide", "Lower Third Blur Slide", "lower_third", "Optical Flow", "easeOutExpo", 0.8, "from-blue-400 to-indigo-600", [
    { time: 0, values: { opacity: 0, y: 40, scaleX: 0.8 } },
    { time: 0.55, values: { opacity: 1, y: -6, scaleX: 1.04 } },
    { time: 1, values: { opacity: 1, y: 0, scaleX: 1 } }
  ]),
  anim("preset_kinetic_stagger_wave", "Kinetic Stagger Wave", "kinetic_typography", "Kinetic Typography", "easeInOutBack", 0.9, "from-yellow-400 to-pink-500", [
    { time: 0, values: { opacity: 0, y: 30, scaleX: 0.6 } },
    { time: 0.3, values: { opacity: 1, y: -12, scaleX: 1.1 } },
    { time: 0.6, values: { opacity: 1, y: 6, scaleX: 0.95 } },
    { time: 1, values: { opacity: 1, y: 0, scaleX: 1 } }
  ]),
  anim("preset_strobe_beat_flash", "Strobe Beat Flash", "video", "Strobe Flash", "steps", 0.6, "from-white to-cyan-500", [
    { time: 0, values: { opacity: 0 } },
    { time: 0.25, values: { opacity: 1 } },
    { time: 0.5, values: { opacity: 0.2 } },
    { time: 0.75, values: { opacity: 1 } },
    { time: 1, values: { opacity: 1 } }
  ]),
  anim("preset_shake_impact_quake", "Earthquake Shake Quake", "video", "Shake Impact", "easeOutBack", 0.5, "from-orange-600 to-red-600", [
    { time: 0, values: { x: 0, y: 0, rotation: 0 } },
    { time: 0.2, values: { x: -14, y: 6, rotation: -3 } },
    { time: 0.4, values: { x: 12, y: -8, rotation: 3 } },
    { time: 0.6, values: { x: -8, y: 4, rotation: -2 } },
    { time: 0.8, values: { x: 5, y: -3, rotation: 1 } },
    { time: 1, values: { x: 0, y: 0, rotation: 0 } }
  ]),
  anim("preset_glitch_digital_stutter", "Digital Glitch Stutter", "text", "Glitch Vector", "steps", 0.4, "from-purple-500 to-fuchsia-500", [
    { time: 0, values: { opacity: 0.2, skewX: 20, x: -8 } },
    { time: 0.3, values: { opacity: 1, skewX: -30, x: 6 } },
    { time: 0.5, values: { opacity: 0.3, skewX: 25, x: -5 } },
    { time: 1, values: { opacity: 1, skewX: 0, x: 0 } }
  ]),
  // ---- WAVE 4 ----
  anim("preset_ripple_expand", "Circular Ripple Reveal", "video", "Morphing SVG", "easeOutQuart", 0.7, "from-cyan-400 to-blue-600", [
    { time: 0, values: { scaleX: 0.3, scaleY: 0.3, opacity: 0 } },
    { time: 0.5, values: { scaleX: 1.08, scaleY: 1.08, opacity: 1 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, opacity: 1 } }
  ]),
  anim("preset_marquee_sweep", "Marquee Light Sweep", "text", "Kinetic Typography", "easeInOutCubic", 0.9, "from-amber-300 to-rose-400", [
    { time: 0, values: { x: -60, opacity: 0, rotation: -4 } },
    { time: 0.55, values: { x: 12, opacity: 1, rotation: 1 } },
    { time: 1, values: { x: 0, opacity: 1, rotation: 0 } }
  ]),
  anim("preset_shutter_burst", "Camera Shutter Burst", "video", "Strobe Flash", "steps", 0.25, "from-sky-400 to-indigo-500", [
    { time: 0, values: { scaleX: 0, scaleY: 0, opacity: 1 } },
    { time: 0.5, values: { scaleX: 1.3, scaleY: 0.7, opacity: 0.6 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, opacity: 1 } }
  ]),
  anim("preset_pendulum_swing", "Pendulum Physics Swing", "motion_graphics", "Spring Physics", "easeInOutElastic", 1.4, "from-emerald-400 to-teal-500", [
    { time: 0, values: { rotation: -18, x: -20, opacity: 0 } },
    { time: 0.35, values: { rotation: 12, opacity: 1 } },
    { time: 0.6, values: { rotation: -6 } },
    { time: 1, values: { rotation: 0, x: 0, opacity: 1 } }
  ]),
  anim("preset_liquid_morph", "Liquid Morph Blob", "motion_graphics", "Liquid Distortion", "easeOutQuart", 0.8, "from-fuchsia-400 to-purple-600", [
    { time: 0, values: { scaleX: 0.4, scaleY: 1.6, opacity: 0 } },
    { time: 0.5, values: { scaleX: 1.2, scaleY: 0.8, opacity: 1 } },
    { time: 1, values: { scaleX: 1, scaleY: 1, opacity: 1 } }
  ]),
  anim("preset_depth_zoom_burst", "Depth Zoom Burst", "camera_3d", "3D Parallax", "easeInOutCubic", 0.6, "from-orange-400 to-red-500", [
    { time: 0, values: { scaleX: 1, scaleY: 1, opacity: 1 } },
    { time: 0.4, values: { scaleX: 1.35, scaleY: 1.35, opacity: 1 } },
    { time: 1, values: { scaleX: 1.18, scaleY: 1.18, opacity: 1 } }
  ])
];

export const ANIMATION_PRESETS_BY_ID: Record<string, AnimationDescriptor> = Object.fromEntries(
  ANIMATION_PRESETS.map((p) => [p.id, p])
);

export function getAnimationPreset(id: string | null | undefined): AnimationDescriptor | undefined {
  return id ? ANIMATION_PRESETS_BY_ID[id] : undefined;
}
