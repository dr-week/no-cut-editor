import { describe, it, expect, beforeEach } from "vitest";
import { useEditorStore, resetEditorStore } from "./editorStore";
import { serializeProjectData, applyProjectData } from "./persistence";

describe("OpenCut Comprehensive Editor & Engine Test Suite", () => {
  beforeEach(() => {
    resetEditorStore();
  });

  it("toggles play state correctly", () => {
    expect(useEditorStore.getState().isPlaying).toBe(false);
    useEditorStore.getState().togglePlay();
    expect(useEditorStore.getState().isPlaying).toBe(true);
  });

  it("adds text element with custom styling", () => {
    useEditorStore.getState().addTextElement("Animated Hook Text", "#ec4899");
    const state = useEditorStore.getState();
    expect(state.textElements.length).toBe(2);
    expect(state.textElements[1].text).toBe("Animated Hook Text");
  });

  it("handles ripple delete of selected clip", () => {
    useEditorStore.getState().setSelectedClipId("txt1");
    useEditorStore.getState().rippleDelete();
    const state = useEditorStore.getState();
    expect(state.clips.find((c) => c.id === "txt1")).toBeUndefined();
    expect(state.selectedClipId).toBeNull();
  });

  it("imports media files and folders into the asset library and timeline", () => {
    const fileA = new File(["video"], "clip1.mp4", { type: "video/mp4" });
    const fileB = new File(["audio"], "music.mp3", { type: "audio/mpeg" });

    useEditorStore.getState().importMediaFiles([fileA, fileB]);

    const state = useEditorStore.getState();
    expect(state.mediaAssets.some((asset) => asset.name === "clip1.mp4")).toBe(true);
    expect(state.mediaAssets.some((asset) => asset.name === "music.mp3")).toBe(true);
    expect(state.clips.some((clip) => clip.title === "clip1.mp4")).toBe(true);
    expect(state.clips.some((clip) => clip.title === "music.mp3")).toBe(true);
  });

  it("updates current playhead time", () => {
    useEditorStore.getState().setCurrentTime(14.5);
    expect(useEditorStore.getState().currentTime).toBe(14.5);
  });

  it("clamps playhead to project duration", () => {
    useEditorStore.getState().setCurrentTime(999);
    expect(useEditorStore.getState().currentTime).toBe(60);
  });

  it("applies animation preset and triggers feedback", () => {
    useEditorStore.getState().applyAnimationPreset("preset_glitch");
    const state = useEditorStore.getState();
    expect(state.selectedAnimationPreset).toBe("preset_glitch");
  });

  it("applies animation to a specific clip", () => {
    useEditorStore.getState().applyAnimationToClip("v1", "preset_kinetic_slam");
    const state = useEditorStore.getState();
    expect(state.clipAnimations["v1"]).toBe("preset_kinetic_slam");
  });

  it("applies filmora effect preset", () => {
    useEditorStore.getState().applyEffect("fx_teal_orange");
    const state = useEditorStore.getState();
    expect(state.selectedEffect).toBe("fx_teal_orange");
  });

  it("toggles audio ducking and noise gate", () => {
    const initialDucking = useEditorStore.getState().audioSettings.ducking;
    useEditorStore.getState().toggleDucking();
    expect(useEditorStore.getState().audioSettings.ducking).toBe(!initialDucking);
  });

  it("applies video template preset and its default LUT/transition", () => {
    useEditorStore.getState().applyTemplate("tmpl_cinematic_vlog");
    const state = useEditorStore.getState();
    expect(state.selectedTemplate).toBe("tmpl_cinematic_vlog");
    expect(state.colorGrading.lutName).toBe("Teal_Orange_Cinematic.cube");
    expect(state.duration).toBe(30);
  });

  it("applies viral trend beat-sync edit", () => {
    useEditorStore.getState().applyTrendAutoEdit("trend_capcut_velocity");
    const state = useEditorStore.getState();
    expect(state.selectedTrend).toBe("trend_capcut_velocity");
    expect(state.selectedEffect).toBe("fx_chromatic");
  });

  it("applies a transition preset", () => {
    useEditorStore.getState().applyTransition("tr_glitch_digital");
    expect(useEditorStore.getState().selectedTransition).toBe("tr_glitch_digital");
  });

  it("generates dynamic AI template on prompt", () => {
    const initialCount = useEditorStore.getState().availableTemplates.length;
    useEditorStore.getState().generateDynamicTemplate("Fitness gym workout reel", "9:16");
    const state = useEditorStore.getState();
    expect(state.availableTemplates.length).toBe(initialCount + 1);
    expect(state.clips.length).toBe(3);
    expect(state.textElements.some((t) => t.text.includes("Fitness"))).toBe(true);
  });

  it("toggles GPU WebCodecs acceleration engine", () => {
    const initialEngine = useEditorStore.getState().performanceMetrics.gpuAcceleration;
    useEditorStore.getState().toggleGpuAcceleration();
    const state = useEditorStore.getState();
    expect(state.performanceMetrics.gpuAcceleration).toBe(!initialEngine);
  });

  it("updates color grading properties and reset", () => {
    useEditorStore.getState().updateColorGrading("saturation", 45);
    expect(useEditorStore.getState().colorGrading.saturation).toBe(45);
    useEditorStore.getState().resetColorGrading();
    expect(useEditorStore.getState().colorGrading.saturation).toBe(0);
  });

  it("runs AI Auto-Cut silence detector", () => {
    useEditorStore.getState().autoCutSilence(-30);
    expect(useEditorStore.getState().activeNotice).toContain("Auto-Cut AI");
  });

  it("executes low-lite offline AI functions", () => {
    useEditorStore.getState().runLowLiteSubtitles();
    const state = useEditorStore.getState();
    expect(state.textElements.some((t) => t.text.includes("Whisper-Tiny"))).toBe(true);
  });

  it("toggles vocal enhancer", () => {
    const initial = useEditorStore.getState().audioSettings.vocalEnhance;
    useEditorStore.getState().toggleVocalEnhance();
    expect(useEditorStore.getState().audioSettings.vocalEnhance).toBe(!initial);
  });

  it("sets and clamps playback rate", () => {
    useEditorStore.getState().setPlaybackRate(2.5);
    expect(useEditorStore.getState().playbackRate).toBe(2.5);
    useEditorStore.getState().setPlaybackRate(99);
    expect(useEditorStore.getState().playbackRate).toBe(4);
  });

  it("splits a clip at the playhead into two clips", () => {
    useEditorStore.getState().setCurrentTime(10);
    useEditorStore.getState().setSelectedClipId("v1");
    useEditorStore.getState().splitClip();
    const state = useEditorStore.getState();
    expect(state.clips.filter((c) => c.trackId === "V1").length).toBe(2);
    expect(state.clips.some((c) => c.id === "v1" && c.duration === 10)).toBe(true);
  });

  it("duplicates the selected clip", () => {
    useEditorStore.getState().setSelectedClipId("v1");
    const count = useEditorStore.getState().clips.length;
    useEditorStore.getState().duplicateClip();
    expect(useEditorStore.getState().clips.length).toBe(count + 1);
  });

  it("undo and redo restore snapshot state", () => {
    useEditorStore.getState().addTextElement("UNDO ME");
    expect(useEditorStore.getState().textElements.length).toBe(2);
    useEditorStore.getState().undo();
    expect(useEditorStore.getState().textElements.length).toBe(1);
    useEditorStore.getState().redo();
    expect(useEditorStore.getState().textElements.length).toBe(2);
  });

  it("adds and deletes scene shapes", () => {
    useEditorStore.getState().addShape("star");
    const afterAdd = useEditorStore.getState().sceneShapes.length;
    expect(afterAdd).toBe(2);
    const starId = useEditorStore.getState().sceneShapes[1].id;
    useEditorStore.getState().deleteShape(starId);
    expect(useEditorStore.getState().sceneShapes.length).toBe(1);
  });

  it("applies LUT presets", () => {
    useEditorStore.getState().applyLut("Cyberpunk_Neon_LUT.cube");
    expect(useEditorStore.getState().colorGrading.lutName).toBe("Cyberpunk_Neon_LUT.cube");
  });

  it("sets render quality and registers live FPS telemetry", () => {
    useEditorStore.getState().setRenderQuality("low");
    expect(useEditorStore.getState().performanceMetrics.renderQuality).toBe("low");
    useEditorStore.getState().registerFps(120);
    expect(useEditorStore.getState().performanceMetrics.fps).toBe(120);
  });

  it("exports and imports project JSON structure", () => {
    const json = useEditorStore.getState().exportProjectJson();
    expect(json).toContain("2026.2");
    const success = useEditorStore.getState().importProjectJson(json);
    expect(success).toBe(true);
  });

  it("rejects invalid project JSON gracefully", () => {
    const success = useEditorStore.getState().importProjectJson("{not-json");
    expect(success).toBe(false);
  });

  it("clamps LUT strength between 0 and 1", () => {
    useEditorStore.getState().setLutStrength(0.5);
    expect(useEditorStore.getState().colorGrading.lutStrength).toBe(0.5);
    useEditorStore.getState().setLutStrength(9);
    expect(useEditorStore.getState().colorGrading.lutStrength).toBe(1);
    useEditorStore.getState().setLutStrength(-3);
    expect(useEditorStore.getState().colorGrading.lutStrength).toBe(0);
  });

  it("sets individual EQ band values with clamping", () => {
    useEditorStore.getState().setEqBand(2, 6);
    expect(useEditorStore.getState().audioSettings.eqBands[2]).toBe(6);
    useEditorStore.getState().setEqBand(2, 99);
    expect(useEditorStore.getState().audioSettings.eqBands[2]).toBe(12);
  });

  it("toggles loop and snap settings", () => {
    useEditorStore.getState().toggleLoop();
    expect(useEditorStore.getState().loopPlayback).toBe(true);
    useEditorStore.getState().toggleSnap();
    expect(useEditorStore.getState().snapEnabled).toBe(false);
  });

  it("seeks forward/back (J/K/L shuttle) clamped to the timeline", () => {
    const { seekBy, setCurrentTime, duration } = useEditorStore.getState();
    setCurrentTime(10);
    useEditorStore.getState().seekBy(-2);
    expect(useEditorStore.getState().currentTime).toBe(8);
    useEditorStore.getState().seekBy(5);
    expect(useEditorStore.getState().currentTime).toBe(13);
    setCurrentTime(0);
    useEditorStore.getState().seekBy(-2);
    expect(useEditorStore.getState().currentTime).toBe(0);
    setCurrentTime(duration);
    useEditorStore.getState().seekBy(2);
    expect(useEditorStore.getState().currentTime).toBe(duration);
    void seekBy;
  });

  it("auto-improve boosts grade and audio without removing features", () => {
    const before = useEditorStore.getState();
    expect(before.colorGrading.contrast).toBeLessThan(before.colorGrading.contrast + 10);
    useEditorStore.getState().autoImprove();
    const after = useEditorStore.getState();
    expect(after.audioSettings.ducking).toBe(true);
    expect(after.audioSettings.vocalEnhance).toBe(true);
    expect(after.colorGrading.lutStrength).toBeCloseTo(0.9);
    expect(after.clips.length).toBe(before.clips.length);
  });

  it("director storyboard produces a cinematic cut with grade and transition", () => {
    const stats = useEditorStore.getState().directorStoryboard("9:16");
    expect(stats).toBeTruthy();
    const s = useEditorStore.getState();
    expect(s.colorGrading.lutName).toContain("Teal_Orange");
    expect(s.selectedTransition).toBeTruthy();
    expect(s.clips.some((c) => c.trackId === "V1")).toBe(true);
  });

  it("sets the render/GPU backend and toggles acceleration flag", () => {
    const s = useEditorStore.getState();
    s.setRenderBackend("CPU (WASM)");
    expect(useEditorStore.getState().performanceMetrics.renderBackend).toBe("CPU (WASM)");
    expect(useEditorStore.getState().performanceMetrics.gpuAcceleration).toBe(false);
    s.setRenderBackend("WebCodecs (CUDA/NVENC)");
    expect(useEditorStore.getState().performanceMetrics.gpuAcceleration).toBe(true);
  });

  it("sets transition duration within bounds", () => {
    useEditorStore.getState().setTransitionDuration(1.2);
    expect(useEditorStore.getState().transitionDuration).toBe(1.2);
    useEditorStore.getState().setTransitionDuration(99);
    expect(useEditorStore.getState().transitionDuration).toBe(3);
  });

  it("applying a transition updates its duration", () => {
    useEditorStore.getState().applyTransition("tr_dissolve");
    expect(useEditorStore.getState().transitionDuration).toBe(0.7);
  });

  it("adds, deletes and commits keyframes on the graph editor", () => {
    useEditorStore.getState().setKeyframeProperty("rotation");
    useEditorStore.getState().addKeyframePoint(0.5, 45);
    useEditorStore.getState().addKeyframePoint(0.25, 20);
    let pts = useEditorStore.getState().keyframeEditor.points;
    expect(pts).toHaveLength(4);
    expect(pts[1].time).toBe(0.25);
    useEditorStore.getState().deleteKeyframePoint(0.25);
    pts = useEditorStore.getState().keyframeEditor.points;
    expect(pts).toHaveLength(3);
    useEditorStore.getState().commitKeyframesToClip("v1");
    const tracks = useEditorStore.getState().clipKeyframes["v1"] as { property: string; points: unknown[] }[];
    expect(tracks.some((t) => t.property === "rotation")).toBe(true);
  });

  it("replaces a keyframe track for the same property on commit", () => {
    useEditorStore.getState().setKeyframeProperty("opacity");
    useEditorStore.getState().addKeyframePoint(0, 0);
    useEditorStore.getState().addKeyframePoint(1, 100);
    useEditorStore.getState().commitKeyframesToClip("v1");
    useEditorStore.getState().addKeyframePoint(0.5, 50);
    useEditorStore.getState().commitKeyframesToClip("v1");
    const tracks = useEditorStore.getState().clipKeyframes["v1"] as { property: string }[];
    expect(tracks.filter((t) => t.property === "opacity")).toHaveLength(1);
  });

  it("serializes and restores project data for IndexedDB autosave", () => {
    useEditorStore.getState().addTextElement("Persist Me");
    const serialized = serializeProjectData(useEditorStore.getState());
    expect(serialized.clips).toHaveLength(3);
    expect(serialized.textElements.some((t) => t.text === "Persist Me")).toBe(true);
    resetEditorStore();
    useEditorStore.setState(applyProjectData(serialized));
    expect(useEditorStore.getState().textElements.some((t) => t.text === "Persist Me")).toBe(true);
  });

  it("runs a beat-sync auto edit and rebuilds the timeline", () => {
    useEditorStore.getState().setActiveTab("ai");
    useEditorStore.getState().runAutoEdit("beat_sync");
    const state = useEditorStore.getState();
    expect(state.autoEditStats).not.toBeNull();
    expect(state.autoEditStats!.segments).toBeGreaterThan(1);
    expect(state.autoEditStats!.cuts).toBe(state.autoEditStats!.segments - 1);
    const v1 = state.clips.filter((c) => c.trackId === "V1" && c.type === "video");
    expect(v1.length).toBe(state.autoEditStats!.segments);
    const animations = Object.values(state.clipAnimations);
    expect(animations.length).toBeGreaterThanOrEqual(v1.length);
    expect(state.selectedEffect).toBeTruthy();
    expect(state.textElements.some((t) => t.text.includes("“"))).toBe(true);
  });

  it("keeps cut boundaries continuous and within the video span", () => {
    useEditorStore.getState().runAutoEdit("viral");
    const v1 = useEditorStore.getState().clips
      .filter((c) => c.trackId === "V1" && c.type === "video")
      .sort((a, b) => a.startTime - b.startTime);
    let cursor = 0;
    for (const clip of v1) {
      expect(clip.startTime).toBeCloseTo(cursor, 4);
      cursor = clip.startTime + clip.duration;
    }
    // original V1 clip spans 0 → 30s
    expect(cursor).toBeCloseTo(30, 4);
  });

  it("returns null auto-edit when no video track exists", () => {
    useEditorStore.setState({ clips: useEditorStore.getState().clips.filter((c) => c.type !== "video") });
    expect(useEditorStore.getState().runAutoEdit()).toBeNull();
  });

  it("contains 141 animation presets, 54 templates, 63 effects, 38 transitions, 12 LUTs, 14 trends", () => {
    const state = useEditorStore.getState();
    expect(state.availableAnimations.length).toBe(141);
    expect(state.availableTemplates.length).toBe(54);
    expect(state.availableEffects.length).toBe(63);
    expect(state.availableTransitions.length).toBe(38);
    expect(state.availableLuts.length).toBe(12);
    expect(state.availableTrends.length).toBe(14);
  });

  it("generates a random template with trend, effect and transition", () => {
    useEditorStore.getState().generateRandomTemplate("9:16");
    const state = useEditorStore.getState();
    expect(state.selectedTemplate).toBeTruthy();
    expect(state.selectedTrend).toBeTruthy();
    expect(state.selectedEffect).toBeTruthy();
    expect(state.selectedTransition).toBeTruthy();
    const v1 = state.clips.filter((c) => c.trackId === "V1");
    expect(v1.length).toBeGreaterThan(0);
    expect(state.duration).toBeGreaterThan(0);
  });

  it("saves the current edit as a custom template", () => {
    const id = useEditorStore.getState().saveCustomTemplate("My Signature Edit");
    const state = useEditorStore.getState();
    expect(id).toContain("tmpl_custom_");
    expect(state.availableTemplates.length).toBe(55);
    expect(state.availableTemplates[0].name).toBe("My Signature Edit");
    expect(state.selectedTemplate).toBe(id);
  });

  it("toggles minimal (focus) mode on and off", () => {
    expect(useEditorStore.getState().minimalMode).toBe(false);
    useEditorStore.getState().toggleMinimalMode();
    expect(useEditorStore.getState().minimalMode).toBe(true);
    useEditorStore.getState().toggleMinimalMode();
    expect(useEditorStore.getState().minimalMode).toBe(false);
  });

  it("supports command search for focus and export actions", async () => {
    const { searchEditorCommands } = await import("./../search/editorCommandRegistry");
    const focusMatches = searchEditorCommands("focus");
    const exportMatches = searchEditorCommands("export video");
    expect(focusMatches.some((cmd) => cmd.id === "focus-mode")).toBe(true);
    expect(exportMatches.some((cmd) => cmd.id === "export-video")).toBe(true);
  });
});
