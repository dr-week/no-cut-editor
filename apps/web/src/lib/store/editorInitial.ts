import { ANIMATION_PRESETS } from "#/lib/presets/animations";
import { VIDEO_TEMPLATES } from "#/lib/presets/templates";
import { EFFECT_PRESETS } from "#/lib/presets/effects";
import { VIDEO_TRANSITIONS } from "#/lib/presets/transitions";
import { LUT_PRESETS } from "#/lib/presets/luts";
import { TREND_PRESETS } from "#/lib/presets/trends";
import type { ActiveTab, AutoEditStats, EditorSnapshot, SceneShape, TrackClip, RenderEngine, RenderBackend, RenderQuality } from "./editorTypes";

export function createInitialData() {
  return {
    isPlaying: false,
    currentTime: 0,
    duration: 60,
    playbackRate: 1,
    activeTab: "media" as ActiveTab,
    selectedClipId: "v1",
    activeNotice: null,
    selectedAnimationPreset: "preset_pop_in",
    selectedEffect: null,
    selectedTemplate: null,
    selectedTrend: "trend_capcut_velocity",
    selectedTransition: null,
    lowLiteAi: {
      mode: "local_webgpu",
      modelName: "Whisper-Tiny-INT8",
      isModelCached: true,
      inferenceLatencyMs: 18,
      memoryUsageMb: 14.2,
      activeTask: null
    },
    colorGrading: {
      brightness: 0,
      contrast: 15,
      saturation: 20,
      exposure: 5,
      temperature: 10,
      tint: -5,
      highlights: -10,
      shadows: 15,
      vignette: 25,
      lutName: "Teal_Orange_Cinematic.cube",
      lutStrength: 1
    },
    performanceMetrics: {
      fps: 60,
      renderEngine: "WebCodecs (GPU)" as RenderEngine,
      gpuAcceleration: true,
      activeMemoryMb: 42.5,
      droppedFrames: 0,
      renderQuality: "high" as RenderQuality,
      renderBackend: "WebGPU (DirectX12)" as RenderBackend
    },
    audioSettings: {
      volume: 85,
      muted: false,
      ducking: true,
      noiseGate: true,
      vocalEnhance: true,
      deEsser: true,
      noiseReductionDb: 24,
      eqBands: [0, 2, 4, 1, 0, -1, 3]
    },
    mediaAssets: [] as { id: string; name: string; type: "video" | "audio" | "image" | "other"; fileType: string; size: number; url: string | null; createdAt: number }[],
    availableTrends: TREND_PRESETS,
    availableTemplates: VIDEO_TEMPLATES,
    availableAnimations: ANIMATION_PRESETS,
    availableEffects: EFFECT_PRESETS,
    availableTransitions: VIDEO_TRANSITIONS,
    availableLuts: LUT_PRESETS,
    clipAnimations: {} as Record<string, string>,
    minimalMode: false,
    loopPlayback: false,
    snapEnabled: true,
    transitionDuration: 0.5,
    keyframeEditor: {
      selectedProperty: "scaleX" as "scaleX",
      points: [
        { time: 0, value: 0 },
        { time: 1, value: 100 }
      ],
      easing: "easeOutCubic"
    },
    clipKeyframes: {} as Record<string, unknown>,
    autoEditStats: null as AutoEditStats | null,
    undoStack: [] as EditorSnapshot[],
    redoStack: [] as EditorSnapshot[],
    textElements: [
      { id: "text1", text: "CapCut Dark UI + Remotion Player", x: 130, y: 160, fontSize: 26, fill: "#38bdf8" }
    ],
    sceneShapes: [
      { id: "shape1", kind: "emoji_badge", x: 540, y: 40, width: 48, height: 48, fill: "#facc15", rotation: 0, text: "\u{1F680}" }
    ] as SceneShape[],
    clips: [
      { id: "v1", title: "Main_Video_Track.mp4", trackId: "V1", type: "video", startTime: 0, duration: 30, color: "bg-blue-950/60 border-blue-500/40 text-blue-300" },
      { id: "txt1", title: "CapCut_Subtitles", trackId: "TXT", type: "text", startTime: 5, duration: 15, color: "bg-amber-950/60 border-amber-500/40 text-amber-300" },
      { id: "a1", title: "Background_Music.mp3", trackId: "A1", type: "audio", startTime: 0, duration: 45, color: "bg-emerald-950/60 border-emerald-500/40 text-emerald-300" }
    ] as TrackClip[]
  };
}

export type EditorInitialData = ReturnType<typeof createInitialData>;
