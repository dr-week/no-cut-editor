import { getEasing, type EasingName } from "./easings";

export interface TransformValues {
  scaleX: number;
  scaleY: number;
  x: number;
  y: number;
  opacity: number;
  rotation: number;
  skewX: number;
  skewY: number;
}

export interface KeyframePoint {
  time: number;
  values: Partial<TransformValues>;
}

export interface AnimationDescriptor {
  id: string;
  name: string;
  category:
    | "text" | "video" | "transition" | "lower_third" | "callout"
    | "motion_graphics" | "camera_3d" | "logo" | "reveal" | "kinetic_typography";
  technique:
    | "Spring Physics" | "Morphing SVG" | "3D Parallax" | "Glitch Vector"
    | "Kinetic Typography" | "Optical Flow" | "Strobe Flash" | "Shake Impact"
    | "Liquid Distortion" | "Paper Cutout";
  easing: EasingName;
  duration: number;
  previewColor: string;
  tracks: KeyframePoint[];
}

export const DEFAULT_TRANSFORM: TransformValues = {
  scaleX: 1,
  scaleY: 1,
  x: 0,
  y: 0,
  opacity: 1,
  rotation: 0,
  skewX: 0,
  skewY: 0
};

export function interpolate(
  value: number,
  inputRange: [number, number],
  outputRange: [number, number],
  easing: EasingName | ((t: number) => number) = "linear"
): number {
  if (inputRange[0] === inputRange[1]) return outputRange[0];
  const raw = clamp((value - inputRange[0]) / (inputRange[1] - inputRange[0]), 0, 1);
  const eased = typeof easing === "function" ? easing(raw) : getEasing(easing)(raw);
  return outputRange[0] + (outputRange[1] - outputRange[0]) * eased;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function sampleTrack(values: Partial<TransformValues>, time: number, keyframes: KeyframePoint[], easing: EasingName): TransformValues {
  const sorted = [...keyframes].sort((a, b) => a.time - b.time);
  const base: TransformValues = { ...DEFAULT_TRANSFORM, ...values };

  if (sorted.length === 0) return base;
  const first = sorted[0];
  const last = sorted[sorted.length - 1];

  if (time <= first.time) return { ...base, ...first.values };
  if (time >= last.time) return { ...base, ...last.values };

  let a = sorted[0];
  let b = sorted[1];
  for (let i = 0; i < sorted.length - 1; i++) {
    if (time >= sorted[i].time && time <= sorted[i + 1].time) {
      a = sorted[i];
      b = sorted[i + 1];
      break;
    }
  }

  const t = (time - a.time) / (b.time - a.time);
  const eased = getEasing(easing)(t);

  const out = { ...base };
  const keys = Object.keys(b.values) as (keyof TransformValues)[];
  for (const key of keys) {
    const from = (a.values[key] ?? base[key]) as number;
    const to = (b.values[key] ?? base[key]) as number;
    out[key] = from + (to - from) * eased;
  }
  return out;
}

export interface SampledAnimation {
  descriptor: AnimationDescriptor;
  localTime: number;
  progress: number;
  transform: TransformValues;
}

export function sampleAnimation(
  descriptor: AnimationDescriptor,
  localTime: number,
  baseValues?: Partial<TransformValues>
): SampledAnimation {
  const progress = descriptor.duration > 0 ? clamp(localTime / descriptor.duration, 0, 1) : 1;
  const transform = sampleTrack(baseValues ?? {}, progress, descriptor.tracks, descriptor.easing);
  return { descriptor, localTime, progress, transform };
}

export function springSimulate(
  initialValue: number,
  target: number,
  opts: { stiffness?: number; damping?: number; mass?: number } = {},
  durationSeconds = 0.6,
  framesPerSecond = 60
): TransformValues[] {
  const { stiffness = 220, damping = 22, mass = 1 } = opts;
  const dt = 1 / framesPerSecond;
  const frames = Math.max(1, Math.round(durationSeconds * framesPerSecond));
  let value = initialValue;
  let velocity = 0;
  const out: TransformValues[] = [];
  for (let i = 0; i <= frames; i++) {
    const force = -stiffness * (value - target);
    const dampingForce = -damping * velocity;
    const acceleration = (force + dampingForce) / mass;
    velocity += acceleration * dt;
    value += velocity * dt;
    out.push({ ...DEFAULT_TRANSFORM, scaleX: value, scaleY: value, opacity: value > 0 ? value : 0 });
  }
  return out;
}

export interface KeyframeEditorTrack {
  id: string;
  label: string;
  points: { time: number; value: number }[];
  easing: EasingName;
}

export function sampleKeyframeEditorTrack(
  track: KeyframeEditorTrack,
  time: number,
  inputRange: [number, number] = [0, 1]
): number {
  if (track.points.length === 0) return 0;
  const pts = [...track.points].sort((a, b) => a.time - b.time);
  const first = pts[0];
  const last = pts[pts.length - 1];
  if (time <= first.time) return first.value;
  if (time >= last.time) return last.value;
  let a = pts[0];
  let b = pts[1];
  for (let i = 0; i < pts.length - 1; i++) {
    if (time >= pts[i].time && time <= pts[i + 1].time) {
      a = pts[i];
      b = pts[i + 1];
      break;
    }
  }
  const t = (time - a.time) / (b.time - a.time);
  const eased = getEasing(track.easing)(t);
  return interpolate(eased, [0, 1], [inputRange[0], inputRange[1]], "linear");
}

export function formatTimecode(seconds: number, fps = 24): string {
  const totalFrames = Math.round(seconds * fps);
  const f = totalFrames % fps;
  const s = Math.floor(totalFrames / fps);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m % 60)}:${pad(s % 60)}:${pad(f)}`;
}

export function formatSeconds(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = (seconds % 60).toFixed(1);
  return `${m}:${String(Number(s)).padStart(4, "0")}`;
}
