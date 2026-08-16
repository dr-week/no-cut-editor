export type { AnimationDescriptor } from "#/lib/motion/engine";
export type { VideoTemplate } from "#/lib/presets/templates";
export type { EffectPreset } from "#/lib/presets/effects";
export type { VideoTransition } from "#/lib/presets/transitions";
export type { TrendPreset } from "#/lib/presets/trends";
export type { LutPreset } from "#/lib/presets/luts";

export interface TextElement {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fill: string;
}

export type SceneShapeKind = "rect" | "ellipse" | "star" | "line" | "arrow" | "emoji" | "emoji_badge";

export interface SceneShape {
  id: string;
  kind: SceneShapeKind;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  rotation: number;
  text?: string;
}

export interface TrackClip {
  id: string;
  title: string;
  trackId: string;
  type: "video" | "text" | "audio";
  startTime: number;
  duration: number;
  color: string;
}

export interface LowLiteAiEngine {
  mode: "local_webnn" | "local_wasm" | "local_webgpu";
  modelName: "Whisper-Tiny-INT8" | "SAM-Mobile-Quantized" | "Silero-VAD-Lite";
  isModelCached: boolean;
  inferenceLatencyMs: number;
  memoryUsageMb: number;
  activeTask: string | null;
}

export interface ColorGradingSettings {
  brightness: number;
  contrast: number;
  saturation: number;
  exposure: number;
  temperature: number;
  tint: number;
  highlights: number;
  shadows: number;
  vignette: number;
  lutName: string;
  lutStrength: number;
}

export type RenderEngine = "WebCodecs (GPU)" | "WebAssembly (CPU)" | "WebGL Shaders";
export type RenderQuality = "high" | "medium" | "low";
export type RenderBackend = "WebGPU (DirectX12)" | "WebCodecs (CUDA/NVENC)" | "WebGL2 (Shader)" | "CPU (WASM)";

export interface EnginePerformanceMetrics {
  fps: number;
  renderEngine: RenderEngine;
  gpuAcceleration: boolean;
  activeMemoryMb: number;
  droppedFrames: number;
  renderQuality: RenderQuality;
  renderBackend: RenderBackend;
}

export interface AudioTrackSettings {
  volume: number;
  muted: boolean;
  ducking: boolean;
  noiseGate: boolean;
  vocalEnhance: boolean;
  deEsser: boolean;
  noiseReductionDb: number;
  eqBands: number[];
}

export type ActiveTab =
  | "media" | "templates" | "trends" | "text" | "effects" | "color"
  | "transitions" | "ai" | "audio" | "export" | "shortcuts";

export interface EditorSnapshot {
  clips: TrackClip[];
  textElements: TextElement[];
  sceneShapes: SceneShape[];
  colorGrading: ColorGradingSettings;
  audioSettings: AudioTrackSettings;
}

export type KeyframeProperty = "scaleX" | "scaleY" | "x" | "y" | "opacity" | "rotation";

export type AutoEditMode = "beat_sync" | "viral" | "documentary" | "clean";

export interface AutoEditStats {
  lastRun: string;
  mode: AutoEditMode;
  cuts: number;
  segments: number;
  captions: number;
  bpm: number;
  duration: number;
}

export interface KeyframeEditorPoint {
  time: number;
  value: number;
}

export interface KeyframeEditorState {
  selectedProperty: KeyframeProperty;
  points: KeyframeEditorPoint[];
  easing: string;
}

export interface ClipKeyframeTrack {
  property: KeyframeProperty;
  points: KeyframeEditorPoint[];
  easing: string;
}
