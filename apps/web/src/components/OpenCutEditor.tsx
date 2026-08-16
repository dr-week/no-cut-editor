import React, { useEffect, useRef, useState } from "react";
import {
  Play, Pause, SkipBack, SkipForward, Volume2,
  Layers, Type, Image as ImageIcon, Sparkles, Sliders,
  Scissors, Download, Wand2, Plus, Keyboard,
  Zap, MousePointer, Activity, Palette, Aperture, Mic, Music,
  Undo2, Redo2, Copy, Trash2, Repeat, Gauge, BoxSelect,
  Clapperboard, ChartLine, Magnet, Save, Focus, Maximize2
} from "lucide-react";
import { Stage, Layer, Rect, Text as KonvaText, Ellipse, Star, Group, Arrow, Line } from "react-konva";
import { useEditorStore } from "#/lib/store/editorStore";
import { sampleAnimation, sampleKeyframeEditorTrack, formatTimecode } from "#/lib/motion/engine";
import { getAnimationPreset } from "#/lib/presets/animations";
import { LUT_PRESETS } from "#/lib/presets/luts";
import type { SceneShape, KeyframeProperty } from "#/lib/store/editorTypes";
import { estimateFileSizeKb, resolveBitrate, buildExportFilename, exportCanvas, downloadBlob, type ExportOptions } from "#/lib/export/exportEngine";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "#/components/ui/command";
import { searchEditorCommands } from "#/lib/search/editorCommandRegistry";

const KEYFRAME_PROPERTIES: KeyframeProperty[] = ["scaleX", "scaleY", "x", "y", "opacity", "rotation"];
const KEYFRAME_LABELS: Record<string, string> = {
  scaleX: "Scale X", scaleY: "Scale Y", x: "Position X", y: "Position Y", opacity: "Opacity", rotation: "Rotation"
};
const EASINGS = ["linear", "easeIn", "easeOut", "easeInOut", "backOut", "elasticOut", "bounceOut", "circInOut"];
const EQ_BANDS = ["60Hz", "230Hz", "910Hz", "3.6kHz", "14kHz"];

const TAB_ICONS: Record<string, React.ElementType> = {
  media: ImageIcon,
  trends: Zap,
  templates: Layers,
  text: Type,
  effects: Sliders,
  color: Palette,
  transitions: Repeat,
  audio: Music,
  keyframes: ChartLine,
  ai: Wand2,
  export: Clapperboard,
  shortcuts: Keyboard
};

const TAB_LABELS: Record<string, string> = {
  media: "Media",
  trends: "Trends",
  templates: "Templates",
  text: "Text",
  effects: "Filmora FX",
  color: "Color LUT",
  transitions: "Transitions",
  audio: "Audio EQ",
  keyframes: "Keyframes",
  ai: "AI Tools",
  export: "Export",
  shortcuts: "Keys"
};

const TAB_GROUPS: Array<{ label: string; tabs: string[] }> = [
  { label: "Build", tabs: ["media", "templates", "text"] },
  { label: "Style", tabs: ["effects", "color", "transitions"] },
  { label: "Sound", tabs: ["audio", "keyframes"] },
  { label: "Smart", tabs: ["trends", "ai", "export"] },
  { label: "Tools", tabs: ["shortcuts"] }
];

function SceneShapeNode({ shape }: { shape: SceneShape }) {
  switch (shape.kind) {
    case "ellipse":
      return <Ellipse x={shape.x} y={shape.y} radiusX={shape.width / 2} radiusY={shape.height / 2} fill={shape.fill} rotation={shape.rotation} opacity={0.85} />;
    case "star":
      return <Star x={shape.x} y={shape.y} numPoints={5} innerRadius={shape.width / 4} outerRadius={shape.width / 2} fill={shape.fill} rotation={shape.rotation} opacity={0.85} />;
    case "line":
      return <Line points={[shape.x, shape.y, shape.x + shape.width, shape.y + shape.height]} stroke={shape.fill} strokeWidth={4} rotation={shape.rotation} opacity={0.9} />;
    case "arrow":
      return <Arrow points={[shape.x, shape.y, shape.x + shape.width, shape.y]} stroke={shape.fill} strokeWidth={5} fill={shape.fill} rotation={shape.rotation} opacity={0.9} />;
    case "emoji":
    case "emoji_badge":
      return (
        <Group x={shape.x} y={shape.y} rotation={shape.rotation}>
          <Ellipse radiusX={shape.width / 2} radiusY={shape.height / 2} fill="#1e293b" stroke="#facc15" strokeWidth={2} offsetX={shape.width / 2} offsetY={shape.height / 2} />
          <KonvaText text={shape.text ?? "✨"} fontSize={shape.height * 0.6} align="center" verticalAlign="middle" width={shape.width} offsetX={shape.width / 2} offsetY={shape.height / 2} />
        </Group>
      );
    default:
      return <Rect x={shape.x} y={shape.y} width={shape.width} height={shape.height} fill={shape.fill} rotation={shape.rotation} opacity={0.85} cornerRadius={6} />;
  }
}

const PROP_RANGES: Record<string, [number, number]> = {
  scaleX: [0, 2],
  scaleY: [0, 2],
  x: [-300, 300],
  y: [-300, 300],
  opacity: [0, 1],
  rotation: [-180, 180]
};

function KeyframeGraph({ points, property, playhead, value }: {
  points: { time: number; value: number }[];
  property: string;
  playhead: number;
  value: number;
}) {
  const W = 276;
  const H = 96;
  const PAD = 8;
  const [vmin, vmax] = PROP_RANGES[property] ?? [0, 1];
  const norm = (v: number) => Math.max(0, Math.min(1, (v - vmin) / (vmax - vmin || 1)));
  const px = (t: number) => PAD + t * (W - PAD * 2);
  const py = (v: number) => H - PAD - norm(v) * (H - PAD * 2);
  const sorted = [...points].sort((a, b) => a.time - b.time);
  const path = sorted.map((p, i) => `${i === 0 ? "M" : "L"}${px(p.time).toFixed(1)},${py(p.value).toFixed(1)}`).join(" ");
  const playheadX = px(playhead);

  return (
    <svg width={W} height={H} className="w-full h-auto rounded bg-black/40 border border-neutral-800">
      {[0.25, 0.5, 0.75].map((t) => (
        <line key={t} x1={px(t)} y1={PAD} x2={px(t)} y2={H - PAD} stroke="#1c1f26" strokeWidth={1} />
      ))}
      <line x1={PAD} y1={py((vmin + vmax) / 2)} x2={W - PAD} y2={py((vmin + vmax) / 2)} stroke="#1c1f26" strokeWidth={1} />
      {path && <path d={path} fill="none" stroke="#22d3ee" strokeWidth={2} />}
      {sorted.map((p) => (
        <circle key={p.time} cx={px(p.time)} cy={py(p.value)} r={3.5} fill="#22d3ee" stroke="#0a0b0e" strokeWidth={1.5} />
      ))}
      <line x1={playheadX} y1={PAD} x2={playheadX} y2={H - PAD} stroke="#facc15" strokeWidth={1.5} strokeDasharray="3,2" />
      <circle cx={playheadX} cy={py(value)} r={4} fill="#facc15" stroke="#0a0b0e" strokeWidth={1.5} />
    </svg>
  );
}

export function NocutEditor() {
  const {
    isPlaying, togglePlay, activeTab, setActiveTab,
    textElements, addTextElement, activeNotice, triggerNotice,
    clips, selectedClipId, setSelectedClipId, splitClip, rippleDelete,
    selectedAnimationPreset,
    availableEffects, selectedEffect, applyEffect,
    audioSettings, setAudioVolume, toggleDucking, toggleNoiseGate,
    currentTime, setCurrentTime, duration, playbackRate, setPlaybackRate,
    sceneShapes, addShape, deleteShape,
    undo, redo, duplicateClip, deleteClip, nudgeClip,
    selectedTransition, applyTransition,
    applyLut, applyTemplate, applyTrendAutoEdit, applyAnimationToClip,
    registerFps,
    loopPlayback, toggleLoop, snapEnabled, toggleSnap,
    transitionDuration, setTransitionDuration,
    keyframeEditor, setKeyframeProperty, addKeyframePoint,
    deleteKeyframePoint, setKeyframeEasing, commitKeyframesToClip, clipKeyframes,
    colorGrading, setLutStrength, setEqBand,
    autosaveProject, loadSavedProject, clearSavedProject, downloadProjectJson,
    seekBy,
    availableAnimations
  } = useEditorStore();

  const [exportOpts, setExportOpts] = useState<ExportOptions>({
    format: "webm",
    width: 1280,
    height: 720,
    fps: 30,
    quality: "medium",
    durationMs: 10_000
  });
  const [exportBusy, setExportBusy] = useState(false);
  const [lastSave, setLastSave] = useState("");
  const [tmplName, setTmplName] = useState("");
  const [fxSearch, setFxSearch] = useState("");
  const [animSearch, setAnimSearch] = useState("");
  const [animCat, setAnimCat] = useState("all");
  const [compressionPreset, setCompressionPreset] = useState("balanced");
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [commandSearch, setCommandSearch] = useState("");

  const animCategories = ["all", ...Array.from(new Set(availableAnimations.map((a) => a.category)))];
  const filteredAnimations = availableAnimations.filter((a) =>
    (animCat === "all" || a.category === animCat) &&
    (a.name + a.id + a.technique).toLowerCase().includes(animSearch.toLowerCase())
  );
  const filteredEffects = availableEffects.filter((fx) =>
    (fx.name + fx.id).toLowerCase().includes(fxSearch.toLowerCase())
  );
  const stageRef = useRef<any>(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      autosaveProject().then((ok) => {
        if (ok) setLastSave(new Date().toLocaleTimeString());
      });
    }, 12_000);
    return () => window.clearInterval(id);
  }, [autosaveProject]);

  const state = useEditorStore.getState();
  const availableTransitions = state.availableTransitions;
  const selectedAnimationDescriptor = getAnimationPreset(selectedAnimationPreset);
  const previewSample = selectedAnimationDescriptor
    ? sampleAnimation(selectedAnimationDescriptor, currentTime)
    : null;
  const previewTransform = previewSample?.transform ?? null;
  const previewProgress = previewSample?.progress ?? 0;

  const runExport = async () => {
    setExportBusy(true);
    try {
      triggerNotice("Rendering frames via WebCodecs / MediaRecorder...");
      const stage = stageRef.current?.getStage?.() ?? stageRef.current;
      const source = stage?.content?.querySelector("canvas") ?? stage?.toCanvas?.();
      if (!source) {
        triggerNotice("Export failed: canvas not ready");
        return;
      }
      const options = { ...exportOpts, durationMs: Math.round(duration * 1000) };
      const controller = exportCanvas(source, options);
      triggerNotice(`Exporting ${(options.durationMs / 1000).toFixed(1)}s @ ${options.fps}fps ${exportOpts.width}x${exportOpts.height}...`);
      const result = await controller.promise;
      const ext = result.mimeType.includes("mp4") ? "mp4" : "webm";
      downloadBlob(result.blob, buildExportFilename("nocut_export", ext));
      triggerNotice(`Export complete: ${buildExportFilename("nocut_export", ext)} (~${(result.estimatedKb / 1024).toFixed(1)} MB)`);
    } catch (err) {
      console.error(err);
      triggerNotice("Export failed — see console");
    } finally {
      setExportBusy(false);
    }
  };

  const keyframeSample = sampleKeyframeEditorTrack(
    { id: "kf", label: keyframeEditor.selectedProperty, points: keyframeEditor.points, easing: keyframeEditor.easing as any },
    Math.min(1, Math.max(0, currentTime / Math.max(1, duration)))
  );

  const frameTimes = useRef<number[]>([]);
  const fpsTimer = useRef(0);

  useEffect(() => {
    let raf = 0;
    const loop = (now: number) => {
      frameTimes.current.push(now);
      const cutoff = now - 1000;
      frameTimes.current = frameTimes.current.filter((t) => t >= cutoff);
      fpsTimer.current += 1;
      if (fpsTimer.current % 30 === 0) {
        registerFps(frameTimes.current.length);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [registerFps]);

  useEffect(() => {
    if (!isPlaying) return;
    let raf = 0;
    let last = performance.now();
    const step = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      const s = useEditorStore.getState();
      let next = s.currentTime + dt * playbackRate;
      if (next >= s.duration) {
        if (loopPlayback) next = next % Math.max(0.001, s.duration);
        else next = s.duration;
      }
      setCurrentTime(next);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isPlaying, playbackRate, duration, loopPlayback, setCurrentTime]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(target?.tagName)) return;

      const key = e.key.toLowerCase();
      const mod = e.ctrlKey || e.metaKey;

      if (e.key === "/") {
        e.preventDefault();
        setCommandPaletteOpen(true);
        return;
      }

      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (mod && key === "z" && e.shiftKey) {
        e.preventDefault();
        redo();
      } else if (mod && key === "z") {
        e.preventDefault();
        undo();
      } else if (mod && key === "d") {
        e.preventDefault();
        duplicateClip();
      } else if (key === "delete" || key === "backspace") {
        e.preventDefault();
        deleteClip();
      } else if (e.shiftKey && e.code === "Delete") {
        e.preventDefault();
        rippleDelete();
      } else if (key === "c" || key === "s") {
        splitClip();
      } else if (key === "j") {
        e.preventDefault();
        triggerNotice("Shuttle Back (J)");
        seekBy(-2);
      } else if (key === "k") {
        e.preventDefault();
        if (isPlaying) togglePlay();
        else triggerNotice("Shuttle Stop (K)");
      } else if (key === "l") {
        e.preventDefault();
        if (!isPlaying) togglePlay();
        else triggerNotice("Shuttle Forward (L)");
      } else if (key === "n") {
        e.preventDefault();
        toggleSnap();
      } else if (key === "home") {
        e.preventDefault();
        setCurrentTime(0);
      } else if (key === "end") {
        e.preventDefault();
        setCurrentTime(duration);
      } else if (key === "arrowleft" && e.shiftKey) {
        e.preventDefault();
        nudgeClip(-0.1);
      } else if (key === "arrowright" && e.shiftKey) {
        e.preventDefault();
        nudgeClip(0.1);
      } else if (key === "arrowleft") {
        setCurrentTime(Math.max(0, currentTime - 0.5));
      } else if (key === "arrowright") {
        setCurrentTime(Math.min(duration, currentTime + 0.5));
      } else if (key === "i") {
        triggerNotice("Mark In Point (I)");
      } else if (key === "o") {
        triggerNotice("Mark Out Point (O)");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlay, undo, redo, duplicateClip, deleteClip, rippleDelete, splitClip, nudgeClip, setCurrentTime, triggerNotice, currentTime, duration, isPlaying, toggleSnap, seekBy]);

  const tabs = Object.keys(TAB_ICONS);
  const commandResults = searchEditorCommands(commandSearch);

  return (
    <>
    <CommandDialog open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen}>
      <Command>
        <CommandInput
          value={commandSearch}
          onValueChange={setCommandSearch}
          placeholder="Search commands, effects, templates, shortcuts..."
        />
        <CommandList>
          <CommandEmpty>No matching editor commands.</CommandEmpty>
          <CommandGroup heading="Editor Actions">
            {commandResults.map((cmd) => (
              <CommandItem
                key={cmd.id}
                value={`${cmd.label} ${cmd.category} ${cmd.keywords}`}
                onSelect={() => {
                  setCommandPaletteOpen(false);
                  setCommandSearch("");
                  if (cmd.id === "focus-mode") {
                    state.toggleMinimalMode();
                  } else if (cmd.id === "split-clip") {
                    splitClip();
                  } else if (cmd.id === "duplicate-clip") {
                    duplicateClip();
                  } else if (cmd.id === "auto-edit") {
                    state.runAutoEdit();
                  } else if (cmd.id === "export-video") {
                    runExport();
                  } else if (cmd.id === "search-presets") {
                    setActiveTab("templates");
                  }
                }}
              >
                <span className="font-medium">{cmd.label}</span>
                <CommandShortcut>{cmd.shortcut || "⌘K"}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>

    <div className="flex h-screen w-screen bg-[#0a0b0e] text-white flex-col font-sans overflow-hidden select-none relative">
      <header className="h-12 border-b border-neutral-800/80 bg-[#121318] px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 text-black font-black text-xs px-2.5 py-1 rounded tracking-wider flex items-center gap-1.5 shadow-md shadow-cyan-500/20">
            <Zap className="w-3.5 h-3.5 fill-current" /> NOCUT
          </div>
          <span className="text-[11px] bg-neutral-900 text-neutral-400 px-2 py-0.5 rounded border border-neutral-800">
            Filmora FX + Remotion WebCodecs Engine
          </span>

          <div className="flex items-center gap-1 border-l border-neutral-800 pl-3 ml-1">
            <button onClick={undo} title="Undo (Ctrl+Z)" className="p-1.5 rounded hover:bg-neutral-800 text-neutral-400 hover:text-cyan-300 transition">
              <Undo2 className="w-4 h-4" />
            </button>
            <button onClick={redo} title="Redo (Ctrl+Shift+Z)" className="p-1.5 rounded hover:bg-neutral-800 text-neutral-400 hover:text-cyan-300 transition">
              <Redo2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {activeNotice && (
          <div className="bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 text-xs px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg shadow-cyan-500/10 animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{activeNotice}</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <select
            value={playbackRate}
            onChange={(e) => setPlaybackRate(Number(e.target.value))}
            className="bg-neutral-900 border border-neutral-800 hover:border-cyan-500/50 text-[10px] px-2 py-1 rounded transition text-neutral-300 focus:outline-none"
            title="Playback Rate"
          >
            {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4].map((r) => (
              <option key={r} value={r}>{r}x</option>
            ))}
          </select>

          <select
            value={state.performanceMetrics.renderBackend}
            onChange={(e) => state.setRenderBackend(e.target.value)}
            className="bg-neutral-900 border border-neutral-800 hover:border-cyan-500/50 text-[10px] px-2 py-1 rounded transition text-neutral-300 focus:outline-none"
            title="Render / GPU backend"
          >
            <option value="WebGPU (DirectX12)">DirectX12 · WebGPU</option>
            <option value="WebCodecs (CUDA/NVENC)">CUDA · WebCodecs</option>
            <option value="WebGL2 (Shader)">WebGL2 Shader</option>
            <option value="CPU (WASM)">CPU · WASM</option>
          </select>

          <button
            onClick={() => state.toggleGpuAcceleration()}
            className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 hover:border-cyan-500/50 text-[10px] px-2.5 py-1 rounded transition text-neutral-300"
          >
            <Gauge className={`w-3 h-3 ${state.performanceMetrics.gpuAcceleration ? "text-emerald-400" : "text-amber-400"}`} />
            <span className="font-mono">{state.performanceMetrics.renderEngine}</span>
            <span className="font-mono text-cyan-400 font-bold">{state.performanceMetrics.fps} FPS</span>
          </button>

          <button
            onClick={() => state.toggleMinimalMode()}
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md transition border ${
              state.minimalMode
                ? "bg-cyan-500/15 border-cyan-400/40 text-cyan-300"
                : "bg-neutral-800/80 hover:bg-neutral-700 border-neutral-700/50 text-neutral-300"
            }`}
            title="Toggle focus mode — hides sidebar & timeline tools"
          >
            {state.minimalMode ? <Focus className="w-3.5 h-3.5 text-cyan-400" /> : <Maximize2 className="w-3.5 h-3.5" />}
            {state.minimalMode ? "Focus ON" : "Focus"}
          </button>

          <button
            onClick={() => {
              const json = state.exportProjectJson();
              const blob = new Blob([json], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "NOCUT_Project_2026.json";
              a.click();
            }}
            className="flex items-center gap-1 bg-neutral-800/80 hover:bg-neutral-700 text-xs px-2.5 py-1.5 rounded-md transition text-neutral-300 border border-neutral-700/50"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" /> Save (.json)
          </button>

          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="flex items-center gap-1.5 bg-neutral-800/80 hover:bg-neutral-700 text-xs px-3 py-1.5 rounded-md transition text-neutral-300 border border-neutral-700/50"
            title="Command Palette (/)"
          >
            <Keyboard className="w-3.5 h-3.5 text-cyan-400" />
            Search
          </button>
          <button
            onClick={() => setActiveTab("shortcuts")}
            className="flex items-center gap-1.5 bg-neutral-800/80 hover:bg-neutral-700 text-xs px-3 py-1.5 rounded-md transition text-neutral-300 border border-neutral-700/50"
          >
            <Keyboard className="w-3.5 h-3.5 text-cyan-400" />
            Keys
          </button>
          <button
            onClick={() => useEditorStore.getState().runAutoEdit(state.autoEditStats?.mode ?? "beat_sync")}
            className="flex items-center gap-1.5 bg-neutral-800/80 hover:bg-cyan-900/40 text-xs px-3 py-1.5 rounded-md transition text-neutral-300 border border-cyan-500/30"
            title="One-click auto edit project"
          >
            <Wand2 className="w-3.5 h-3.5 text-cyan-400" /> Auto Edit
          </button>
          <button
            onClick={runExport}
            disabled={exportBusy}
            className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 hover:opacity-95 disabled:opacity-50 text-xs font-bold px-4 py-1.5 rounded-md transition shadow-md shadow-cyan-500/20"
          >
            <Download className="w-3.5 h-3.5" /> {exportBusy ? "Exporting..." : "Fast Export"}
          </button>
          {lastSave && (
            <button
              onClick={() => loadSavedProject()}
              className="flex items-center gap-1 text-[9px] bg-neutral-800/60 border border-emerald-500/30 text-emerald-300 px-2 py-1 rounded-md hover:bg-neutral-700 transition"
              title="Autosaved to IndexedDB — click to reload"
            >
              <Save className="w-3 h-3" /> Saved {lastSave}
            </button>
          )}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {state.minimalMode && (
          <button
            onClick={() => state.toggleMinimalMode()}
            className="absolute left-3 top-24 z-50 flex items-center gap-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 backdrop-blur text-cyan-300 text-[11px] font-bold px-3 py-1.5 rounded-full transition shadow-lg shadow-cyan-500/10"
            title="Show sidebar & timeline tools"
          >
            <Maximize2 className="w-3.5 h-3.5" /> Expand
          </button>
        )}

        {!state.minimalMode && (
        <div className="w-52 border-r border-neutral-800/80 bg-[#121318] px-2 py-3 text-neutral-400">
          <div className="space-y-3">
            {TAB_GROUPS.map((group) => (
              <div key={group.label} className="space-y-1.5">
                <div className="px-2 text-[9px] font-bold uppercase tracking-[0.18em] text-neutral-500">{group.label}</div>
                <div className="space-y-1">
                  {group.tabs.map((tabId) => {
                    const Icon = TAB_ICONS[tabId];
                    const isActive = activeTab === tabId;
                    return (
                      <button
                        key={tabId}
                        onClick={() => setActiveTab(tabId as any)}
                        className={`w-full flex items-center gap-2 rounded-md px-2 py-1.5 text-[10px] transition ${
                          isActive
                            ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30"
                            : "hover:bg-neutral-800/80 hover:text-white text-neutral-400"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span className="flex-1 text-left">{TAB_LABELS[tabId]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        )}

        {!state.minimalMode && (
        <div className="w-80 border-r border-neutral-800/80 bg-[#0f1014] p-3 flex flex-col gap-3 overflow-y-auto">
          {activeTab === "media" && (
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">Media Assets</h3>
              <div
                onClick={() => triggerNotice("Import Media: WebCodecs fast indexing")}
                className="border border-dashed border-neutral-700 hover:border-cyan-500/60 rounded-lg p-5 flex flex-col items-center justify-center text-center cursor-pointer transition bg-neutral-900/40 hover:bg-neutral-900/80"
              >
                <Plus className="w-5 h-5 text-cyan-400 mb-1" />
                <span className="text-xs text-neutral-300 font-medium">Drag & Drop 4K MP4 / WebM</span>
                <span className="text-[10px] text-neutral-500 mt-1">GPU Mediabunny Fast Decoder</span>
              </div>
            </div>
          )}

          {activeTab === "trends" && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">2026 Viral Trends</h3>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-950 border border-rose-500/30 text-rose-300 font-bold animate-pulse">HOT NOW</span>
              </div>

              <div className="bg-neutral-900/90 border border-cyan-500/30 rounded-lg p-2.5 flex flex-col gap-2">
                <span className="text-[10px] font-bold text-cyan-300 flex items-center gap-1">
                  <Wand2 className="w-3 h-3 text-cyan-400" /> AI Template Generator Engine
                </span>
                <input
                  type="text"
                  placeholder="e.g. Fitness gym workout reel"
                  id="template-gen-prompt"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const val = (e.target as HTMLInputElement).value;
                      if (val) {
                        state.generateDynamicTemplate(val, "9:16");
                        (e.target as HTMLInputElement).value = "";
                      }
                    }
                  }}
                  className="bg-black/60 border border-neutral-700 rounded px-2 py-1 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400"
                />
                <button
                  onClick={() => {
                    const input = document.getElementById("template-gen-prompt") as HTMLInputElement;
                    if (input?.value) {
                      state.generateDynamicTemplate(input.value, "9:16");
                      input.value = "";
                    } else {
                      state.generateDynamicTemplate("Trending Viral Reel", "9:16");
                    }
                  }}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 text-[11px] font-bold py-1 px-2 rounded text-white transition"
                >
                  Generate Template (Instant)
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {state.availableTrends.map((trend) => (
                  <div
                    key={trend.id}
                    onClick={() => applyTrendAutoEdit(trend.id)}
                    className="p-2.5 rounded-lg border border-neutral-800 bg-neutral-900/80 hover:border-cyan-400/60 cursor-pointer transition flex flex-col gap-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-200 truncate">{trend.title}</span>
                      <span className="text-[9px] font-mono px-1 rounded bg-rose-950 text-rose-300 font-bold">{trend.platform}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-neutral-400">
                      <span className="text-cyan-400 font-mono font-semibold">{trend.bpm} BPM Beat-Sync</span>
                      <span className="text-emerald-400 font-bold">{trend.viralScore}% Match</span>
                    </div>
                    <div className="text-[9px] text-neutral-500 truncate">{trend.niche} • {trend.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "templates" && (
            <div className="flex flex-col gap-2.5">
              <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">CapCut & Canva Templates ({state.availableTemplates.length})</h3>
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => useEditorStore.getState().generateRandomTemplate("9:16")}
                  className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-600 hover:opacity-90 text-[11px] font-bold py-2 rounded text-white transition shadow-md shadow-fuchsia-500/20"
                >
                  <span className="flex items-center justify-center gap-1.5"><Zap className="w-3.5 h-3.5" /> Random Trend Template (Instant)</span>
                </button>
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    placeholder="Template name..."
                    value={tmplName}
                    onChange={(e) => setTmplName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && tmplName.trim()) {
                        useEditorStore.getState().saveCustomTemplate(tmplName.trim());
                        setTmplName("");
                      }
                    }}
                    className="flex-1 min-w-0 bg-black/60 border border-neutral-700 rounded px-2 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    onClick={() => {
                      if (tmplName.trim()) {
                        useEditorStore.getState().saveCustomTemplate(tmplName.trim());
                        setTmplName("");
                      }
                    }}
                    className="bg-neutral-800/80 hover:bg-neutral-700 border border-neutral-700 text-[10px] font-bold px-2.5 py-1.5 rounded text-neutral-300 transition whitespace-nowrap"
                  >
                    Save as Template
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {state.availableTemplates.map((tmpl) => (
                  <div
                    key={tmpl.id}
                    onClick={() => applyTemplate(tmpl.id)}
                    className="p-3 rounded-lg border border-neutral-800 bg-neutral-900/80 hover:border-cyan-400/60 cursor-pointer transition flex flex-col gap-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-200">{tmpl.name}</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-300">{tmpl.aspectRatio}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-neutral-400">
                      <span>{tmpl.duration}s duration • {tmpl.tracksCount} tracks</span>
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${tmpl.previewGradient}`} />
                    </div>
                    <div className="text-[9px] text-neutral-500 line-clamp-2">{tmpl.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "text" && (
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">CapCut Text & Shapes</h3>
              <button
                onClick={() => addTextElement("Animated Hook Subtitle", "#38bdf8")}
                className="w-full bg-cyan-950/40 border border-cyan-500/40 hover:bg-cyan-900/50 text-xs py-2 px-3 rounded text-left font-semibold text-cyan-300 transition"
              >
                + Add Dynamic Subtitle Node
              </button>
              <button
                onClick={() => addTextElement("MRBEAST POP TEXT", "#facc15")}
                className="w-full bg-amber-950/40 border border-amber-500/40 hover:bg-amber-900/50 text-xs py-2 px-3 rounded text-left font-semibold text-amber-300 transition"
              >
                + Add MrBeast Yellow Pop
              </button>

              <div className="border-t border-neutral-800 pt-2 flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1">
                  <BoxSelect className="w-3 h-3 text-cyan-400" /> Vector Shape Layer
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {(["rect", "ellipse", "star", "arrow", "line", "emoji"] as const).map((kind) => (
                    <button
                      key={kind}
                      onClick={() => addShape(kind)}
                      className="bg-neutral-900/80 border border-neutral-800 hover:border-cyan-400/60 rounded-md py-1.5 text-[10px] text-neutral-300 capitalize transition"
                    >
                      {kind}
                    </button>
                  ))}
                </div>
                <div className="flex flex-col gap-1">
                  {sceneShapes.map((s) => (
                    <div key={s.id} className="flex items-center justify-between bg-neutral-900/70 border border-neutral-800 rounded px-2 py-1">
                      <span className="text-[10px] text-neutral-300">{s.kind}</span>
                      <button onClick={() => deleteShape(s.id)} className="text-red-400 hover:text-red-300">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "effects" && (
            <div className="flex flex-col gap-2.5">
              <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">Motion Graphics & Effects</h3>

              <div className="bg-neutral-900/90 border border-cyan-500/30 rounded-lg p-2.5 flex flex-col gap-2">
                <span className="text-[10px] font-bold text-cyan-300 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-cyan-400" /> Motion Graphics ({filteredAnimations.length} of {availableAnimations.length})
                </span>
                <div className="flex flex-wrap gap-1">
                  {animCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setAnimCat(cat)}
                      className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border transition ${
                        animCat === cat
                          ? "bg-cyan-500/20 border-cyan-400 text-cyan-200"
                          : "bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-neutral-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder={`Search ${availableAnimations.length} animations (pop, glitch, ken burns...)`}
                  value={animSearch}
                  onChange={(e) => setAnimSearch(e.target.value)}
                  className="bg-black/60 border border-neutral-700 rounded px-2 py-1 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400"
                />
                <div className="grid grid-cols-2 gap-1.5 max-h-44 overflow-y-auto">
                  {filteredAnimations.slice(0, 60).map((a) => (
                    <button
                      key={a.id}
                      onClick={() => applyAnimationToClip(selectedClipId ?? "v1", a.id)}
                      title={`${a.technique} · ${a.easing} · ${a.duration}s`}
                      className={`text-left p-2 rounded border text-[10px] transition ${
                        selectedAnimationPreset === a.id
                          ? "bg-cyan-950/60 border-cyan-400 text-cyan-200"
                          : "bg-neutral-900/70 border-neutral-800 hover:border-neutral-700 text-neutral-300"
                      }`}
                    >
                      <span className="block font-semibold truncate">{a.name}</span>
                      <span className="block text-[8px] text-neutral-500 uppercase truncate">{a.technique}</span>
                    </button>
                  ))}
                  {filteredAnimations.length === 0 && (
                    <span className="col-span-2 text-[10px] text-neutral-500">No animations match "{animSearch}"</span>
                  )}
                </div>
              </div>

              <span className="text-[10px] font-bold text-cyan-300 flex items-center gap-1">
                <Palette className="w-3 h-3" /> Filmora Shaders, LUTs & Audio FX ({availableEffects.length})
              </span>
              <input
                type="text"
                placeholder={`Search ${availableEffects.length} effects (glitch, vignette, reverb...)`}
                value={fxSearch}
                onChange={(e) => setFxSearch(e.target.value)}
                className="bg-black/60 border border-neutral-700 rounded px-2 py-1 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400"
              />
              {(["lut", "glsl", "filter", "audio"] as const).map((group) => (
                <div key={group} className="flex flex-col gap-1.5">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-500">{group.toUpperCase()}</span>
                  <div className="grid grid-cols-2 gap-2">
                    {filteredEffects.filter((fx) => fx.type === group).map((fx) => (
                      <div
                        key={fx.id}
                        onClick={() => applyEffect(fx.id)}
                        className={`p-2.5 rounded-lg border cursor-pointer text-xs flex flex-col gap-1 transition ${
                          selectedEffect === fx.id
                            ? "bg-cyan-950/60 border-cyan-400 text-cyan-200"
                            : "bg-neutral-900/70 border-neutral-800 hover:border-neutral-700 text-neutral-300"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-semibold text-[11px]">
                          <Palette className="w-3 h-3 text-cyan-400" />
                          <span className="truncate">{fx.name}</span>
                        </div>
                        <span className="text-[9px] text-neutral-500 uppercase">{fx.type} filter</span>
                      </div>
                    ))}
                  </div>
                  {filteredEffects.filter((fx) => fx.type === group).length === 0 && fxSearch && (
                    <span className="text-[10px] text-neutral-600">No {group} matches</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === "color" && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">Color Grading & 3D LUT</h3>
                <button onClick={() => state.resetColorGrading()} className="text-[10px] text-cyan-400 hover:underline">Reset All</button>
              </div>

              <div className="flex flex-col gap-1 bg-neutral-900/80 p-2.5 rounded-lg border border-neutral-800">
                <span className="text-[11px] text-neutral-300 font-semibold">Active 3D LUT (.cube)</span>
                <select
                  value={state.colorGrading.lutName}
                  onChange={(e) => applyLut(e.target.value)}
                  className="bg-black/60 border border-neutral-700 rounded px-2 py-1 text-xs text-cyan-300 focus:outline-none focus:border-cyan-400"
                >
                  {LUT_PRESETS.map((l) => (
                    <option key={l.id} value={l.file}>{l.name}</option>
                  ))}
                  <option value="None">None</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {LUT_PRESETS.map((l) => (
                  <div
                    key={l.id}
                    onClick={() => applyLut(l.file)}
                    className={`p-2 rounded-lg border cursor-pointer flex flex-col gap-1 transition ${
                      state.colorGrading.lutName === l.file ? "bg-cyan-950/60 border-cyan-400" : "bg-neutral-900/70 border-neutral-800 hover:border-neutral-700"
                    }`}
                  >
                    <div className={`w-full h-6 rounded bg-gradient-to-r ${l.previewGradient}`} />
                    <span className="text-[10px] text-neutral-300 font-semibold">{l.name}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-1 bg-neutral-900/60 p-2 rounded border border-neutral-800/80">
                <div className="flex justify-between text-[11px] text-neutral-300">
                  <span>LUT Strength</span>
                  <span className="font-mono text-cyan-400">{Math.round(colorGrading.lutStrength * 100)}%</span>
                </div>
                <input
                  type="range" min="0" max="100"
                  value={Math.round(colorGrading.lutStrength * 100)}
                  onChange={(e) => setLutStrength(Number(e.target.value) / 100)}
                  className="w-full h-1 accent-cyan-400 bg-neutral-800 rounded cursor-pointer"
                />
              </div>

              {[
                { label: "Exposure", key: "exposure", min: -100, max: 100 },
                { label: "Contrast", key: "contrast", min: -100, max: 100 },
                { label: "Highlights", key: "highlights", min: -100, max: 100 },
                { label: "Shadows", key: "shadows", min: -100, max: 100 },
                { label: "Temperature (Warm/Cool)", key: "temperature", min: -100, max: 100 },
                { label: "Saturation", key: "saturation", min: -100, max: 100 },
                { label: "Vignette", key: "vignette", min: 0, max: 100 },
              ].map((prop) => {
                const val = (state.colorGrading as any)[prop.key];
                return (
                  <div key={prop.key} className="flex flex-col gap-1 bg-neutral-900/60 p-2 rounded border border-neutral-800/80">
                    <div className="flex justify-between text-[11px] text-neutral-300">
                      <span>{prop.label}</span>
                      <span className="font-mono text-cyan-400">{val > 0 ? `+${val}` : val}</span>
                    </div>
                    <input
                      type="range"
                      min={prop.min}
                      max={prop.max}
                      value={val}
                      onChange={(e) => state.updateColorGrading(prop.key as any, Number(e.target.value))}
                      className="w-full h-1 accent-cyan-400 bg-neutral-800 rounded cursor-pointer"
                    />
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === "transitions" && (
            <div className="flex flex-col gap-2.5">
              <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">GPU Transition Shaders ({availableTransitions.length})</h3>
              <div className="grid grid-cols-2 gap-2">
                {availableTransitions.map((tr) => (
                  <div
                    key={tr.id}
                    onClick={() => applyTransition(tr.id)}
                    className={`p-2.5 rounded-lg border cursor-pointer flex flex-col gap-1.5 transition ${
                      selectedTransition === tr.id
                        ? "bg-cyan-950/60 border-cyan-400 text-cyan-200"
                        : "bg-neutral-900/70 border-neutral-800 hover:border-neutral-700 text-neutral-300"
                    }`}
                  >
                    <div className={`w-full h-5 rounded bg-gradient-to-r ${tr.previewGradient}`} />
                    <span className="text-[11px] font-semibold">{tr.name}</span>
                    <span className="text-[9px] text-neutral-500 font-mono">{tr.glTransition} • {tr.duration}s</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-1 bg-neutral-900/60 p-2 rounded border border-neutral-800/80">
                <div className="flex justify-between text-[11px] text-neutral-300">
                  <span>Transition Duration</span>
                  <span className="font-mono text-cyan-400">{transitionDuration.toFixed(1)}s</span>
                </div>
                <input
                  type="range" min="0.1" max="3" step="0.1"
                  value={transitionDuration}
                  onChange={(e) => setTransitionDuration(Number(e.target.value))}
                  className="w-full h-1 accent-cyan-400 bg-neutral-800 rounded cursor-pointer"
                />
              </div>
            </div>
          )}

          {activeTab === "audio" && (
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">Tone.js Audio Master & Noise DSP</h3>

              <div className="flex flex-col gap-1 bg-neutral-900/70 p-3 rounded-lg border border-neutral-800">
                <div className="flex justify-between text-xs text-neutral-300 mb-1">
                  <span>Master Volume</span>
                  <span className="font-mono text-cyan-400">{state.audioSettings.volume}%</span>
                </div>
                <input
                  type="range" min="0" max="100"
                  value={state.audioSettings.volume}
                  onChange={(e) => setAudioVolume(Number(e.target.value))}
                  className="w-full h-1.5 accent-cyan-400 bg-neutral-800 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between bg-neutral-900/70 p-3 rounded-lg border border-neutral-800">
                <div className="flex items-center gap-2 text-xs">
                  <Mic className="w-4 h-4 text-cyan-400" />
                  <span>AI Voice Auto-Ducking</span>
                </div>
                <button
                  onClick={() => toggleDucking()}
                  className={`text-[10px] px-2.5 py-1 rounded font-bold transition ${
                    state.audioSettings.ducking ? "bg-cyan-500 text-black" : "bg-neutral-800 text-neutral-400"
                  }`}
                >
                  {state.audioSettings.ducking ? "ENABLED" : "OFF"}
                </button>
              </div>

              <div className="flex items-center justify-between bg-neutral-900/70 p-3 rounded-lg border border-neutral-800">
                <div className="flex items-center gap-2 text-xs">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span>AI Studio Vocal Enhancer</span>
                </div>
                <button
                  onClick={() => state.toggleVocalEnhance()}
                  className={`text-[10px] px-2.5 py-1 rounded font-bold transition ${
                    state.audioSettings.vocalEnhance ? "bg-emerald-500 text-black" : "bg-neutral-800 text-neutral-400"
                  }`}
                >
                  {state.audioSettings.vocalEnhance ? "ENHANCED" : "OFF"}
                </button>
              </div>

              <div className="flex items-center justify-between bg-neutral-900/70 p-3 rounded-lg border border-neutral-800">
                <div className="flex items-center gap-2 text-xs">
                  <Activity className="w-4 h-4 text-amber-400" />
                  <span>Smart Noise Gate (-30dB)</span>
                </div>
                <button
                  onClick={() => toggleNoiseGate()}
                  className={`text-[10px] px-2.5 py-1 rounded font-bold transition ${
                    state.audioSettings.noiseGate ? "bg-amber-500 text-black" : "bg-neutral-800 text-neutral-400"
                  }`}
                >
                  {state.audioSettings.noiseGate ? "ENABLED" : "OFF"}
                </button>
              </div>

              <div className="flex flex-col gap-1 bg-neutral-900/70 p-3 rounded-lg border border-neutral-800">
                <div className="flex justify-between text-xs text-neutral-300 mb-1">
                  <span>Noise Reduction</span>
                  <span className="font-mono text-cyan-400">{state.audioSettings.noiseReductionDb}dB</span>
                </div>
                <input
                  type="range" min="0" max="40"
                  value={audioSettings.noiseReductionDb}
                  onChange={(e) => state.setNoiseReductionDb(Number(e.target.value))}
                  className="w-full h-1.5 accent-cyan-400 bg-neutral-800 rounded cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-2 bg-neutral-900/70 p-3 rounded-lg border border-neutral-800">
                <div className="flex justify-between text-xs text-neutral-300">
                  <span>5-Band Parametric EQ (Tone.js)</span>
                  <span className="font-mono text-emerald-400">Pro Audio</span>
                </div>
                {audioSettings.eqBands.map((band, i) => (
                  <div key={EQ_BANDS[i]} className="flex items-center gap-2">
                    <span className="text-[9px] font-mono text-neutral-500 w-10">{EQ_BANDS[i]}</span>
                    <input
                      type="range" min="-12" max="12" step="0.5"
                      value={band}
                      onChange={(e) => setEqBand(i, Number(e.target.value))}
                      className="flex-1 h-1 accent-emerald-400 bg-neutral-800 rounded cursor-pointer"
                    />
                    <span className="text-[10px] font-mono text-cyan-400 w-7 text-right">{band > 0 ? `+${band}` : band}dB</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "keyframes" && (
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">Keyframe Graph Editor</h3>
                <span className="text-[9px] font-mono text-cyan-400">{keyframeEditor.points.length} points</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-500">Property</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {KEYFRAME_PROPERTIES.map((p) => (
                    <button
                      key={p}
                      onClick={() => setKeyframeProperty(p)}
                      className={`text-[10px] py-1.5 rounded border transition ${
                        keyframeEditor.selectedProperty === p
                          ? "bg-cyan-950/60 border-cyan-400 text-cyan-200"
                          : "bg-neutral-900/80 border-neutral-800 text-neutral-300 hover:border-neutral-700"
                      }`}
                    >
                      {KEYFRAME_LABELS[p]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-500">Easing Curve</span>
                <select
                  value={keyframeEditor.easing}
                  onChange={(e) => setKeyframeEasing(e.target.value)}
                  className="bg-black/60 border border-neutral-700 rounded px-2 py-1 text-xs text-cyan-300 focus:outline-none focus:border-cyan-400"
                >
                  {EASINGS.map((e) => (
                    <option key={e} value={e}>{e}</option>
                  ))}
                </select>
              </div>

              <div className="bg-neutral-900/80 rounded-lg border border-neutral-800 p-2">
                <KeyframeGraph points={keyframeEditor.points} property={keyframeEditor.selectedProperty} playhead={currentTime / Math.max(1, duration)} value={keyframeSample} />
                <div className="flex justify-between text-[9px] font-mono text-neutral-500 mt-1">
                  <span>0%</span>
                  <span className="text-cyan-400">value: {keyframeSample.toFixed(2)}</span>
                  <span>100%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => addKeyframePoint(Math.min(1, Math.max(0, currentTime / Math.max(1, duration))), keyframeSample)}
                  className="bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-500/40 text-xs py-2 rounded font-semibold text-cyan-300 transition"
                >
                  + Key @ Playhead
                </button>
                <button
                  onClick={() => deleteKeyframePoint(Math.min(1, Math.max(0, currentTime / Math.max(1, duration))))}
                  className="bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-xs py-2 rounded font-semibold text-neutral-300 transition"
                >
                  − Key @ Playhead
                </button>
                <button
                  onClick={() => setKeyframeProperty(keyframeEditor.selectedProperty)}
                  className="bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-[11px] py-2 rounded font-semibold text-neutral-300 transition"
                >
                  Reset Curve
                </button>
                <button
                  onClick={() => selectedClipId && commitKeyframesToClip(selectedClipId)}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 text-[11px] py-2 rounded font-bold text-white transition"
                >
                  Commit to Clip
                </button>
              </div>

              {selectedClipId && (() => {
                const appliedTracks = (clipKeyframes[selectedClipId] as { property: KeyframeProperty; points: unknown[]; easing: string }[] | undefined) ?? [];
                if (appliedTracks.length === 0) return null;
                return (
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-500">Applied to {selectedClipId}</span>
                    {appliedTracks.map((t) => (
                      <div key={t.property} className="flex justify-between items-center bg-neutral-900/70 border border-neutral-800 rounded px-2 py-1 text-[10px] text-neutral-300">
                        <span className="font-mono text-cyan-300">{KEYFRAME_LABELS[t.property]}</span>
                        <span>{t.points.length}k • {t.easing}</span>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          )}

          {activeTab === "export" && (
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">WebCodecs Video Export</h3>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/30 text-emerald-300 font-mono font-bold">MediaRecorder</span>
              </div>

              <div className="flex flex-col gap-2 bg-neutral-900/70 p-3 rounded-lg border border-neutral-800">
                <div className="flex justify-between items-center text-xs text-neutral-300">
                  <span>Format</span>
                  <select
                    value={exportOpts.format}
                    onChange={(e) => setExportOpts({ ...exportOpts, format: e.target.value as any })}
                    className="bg-black/60 border border-neutral-700 rounded px-2 py-0.5 text-xs text-cyan-300 focus:outline-none"
                  >
                    <option value="webm">WebM (VP9)</option>
                    <option value="mp4">MP4 (H.264)</option>
                  </select>
                </div>
                <div className="flex justify-between items-center text-xs text-neutral-300">
                  <span>Resolution</span>
                  <select
                    value={`${exportOpts.width}x${exportOpts.height}`}
                    onChange={(e) => {
                      const [w, h] = e.target.value.split("x").map(Number);
                      setExportOpts({ ...exportOpts, width: w, height: h });
                    }}
                    className="bg-black/60 border border-neutral-700 rounded px-2 py-0.5 text-xs text-cyan-300 focus:outline-none"
                  >
                    <option value="854x480">480p SD</option>
                    <option value="1280x720">720p HD</option>
                    <option value="1920x1080">1080p Full HD</option>
                    <option value="3840x2160">2160p 4K</option>
                  </select>
                </div>
                <div className="flex justify-between items-center text-xs text-neutral-300">
                  <span>Frame Rate</span>
                  <select
                    value={exportOpts.fps}
                    onChange={(e) => setExportOpts({ ...exportOpts, fps: Number(e.target.value) })}
                    className="bg-black/60 border border-neutral-700 rounded px-2 py-0.5 text-xs text-cyan-300 focus:outline-none"
                  >
                    {[24, 30, 60].map((f) => <option key={f} value={f}>{f} FPS</option>)}
                  </select>
                </div>
                <div className="flex justify-between items-center text-xs text-neutral-300">
                  <span>Quality</span>
                  <select
                    value={exportOpts.quality}
                    onChange={(e) => setExportOpts({ ...exportOpts, quality: e.target.value as any })}
                    className="bg-black/60 border border-neutral-700 rounded px-2 py-0.5 text-xs text-cyan-300 focus:outline-none"
                  >
                    <option value="low">Low (2.5 Mbps)</option>
                    <option value="medium">Medium (6 Mbps)</option>
                    <option value="high">High (12 Mbps)</option>
                  </select>
                </div>
                <div className="flex justify-between items-center text-xs text-neutral-300">
                  <span>Compression Preset</span>
                  <select
                    value={compressionPreset}
                    onChange={(e) => {
                      const p = e.target.value;
                      setCompressionPreset(p);
                      if (p === "small") setExportOpts((o) => ({ ...o, quality: "low", fps: 30 }));
                      else if (p === "web") setExportOpts((o) => ({ ...o, format: "webm", quality: "medium" }));
                      else if (p === "best") setExportOpts((o) => ({ ...o, quality: "high", fps: 60 }));
                      else setExportOpts((o) => ({ ...o, quality: "medium", fps: 30 }));
                    }}
                    className="bg-black/60 border border-neutral-700 rounded px-2 py-0.5 text-xs text-cyan-300 focus:outline-none"
                  >
                    <option value="balanced">Balanced (default)</option>
                    <option value="best">Best Quality / Large</option>
                    <option value="small">Small File / Fast share</option>
                    <option value="web">Web / Mobile optimized</option>
                  </select>
                </div>
                <div className="flex justify-between text-[11px] text-neutral-400 border-t border-neutral-800 pt-2">
                  <span>Estimated size ({duration.toFixed(1)}s)</span>
                  <span className="font-mono text-emerald-400">
                    ~{(estimateFileSizeKb(duration * 1000, resolveBitrate(exportOpts) / 1e6) / 1024).toFixed(1)} MB
                  </span>
                </div>
              </div>

              <button
                onClick={runExport}
                disabled={exportBusy}
                className="bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 hover:opacity-90 disabled:opacity-50 text-xs font-bold py-2.5 rounded-lg text-white transition shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2"
              >
                <Clapperboard className="w-4 h-4" /> {exportBusy ? "Exporting..." : "Export Video (MediaRecorder)"}
              </button>

              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-500">Project Persistence (Dexie IndexedDB)</span>
                <div className="grid grid-cols-2 gap-1.5">
                  <button onClick={() => downloadProjectJson()} className="bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-[11px] py-2 rounded font-semibold text-neutral-300 transition">
                    Download JSON
                  </button>
                  <button onClick={() => autosaveProject()} className="bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-[11px] py-2 rounded font-semibold text-neutral-300 transition">
                    Save Now
                  </button>
                  <button onClick={() => loadSavedProject()} className="bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-[11px] py-2 rounded font-semibold text-neutral-300 transition">
                    Load Saved
                  </button>
                  <button onClick={() => clearSavedProject()} className="bg-neutral-900/80 hover:bg-red-950/60 border border-neutral-800 hover:border-red-500/40 text-[11px] py-2 rounded font-semibold text-neutral-400 hover:text-red-300 transition">
                    Clear Save
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "ai" && (
            <div className="flex flex-col gap-2.5">
              <div className="bg-neutral-900/90 border border-cyan-500/30 rounded-lg p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-300 flex items-center gap-1">
                    <Wand2 className="w-3.5 h-3.5 text-cyan-400" /> AUTO EDIT ENGINE
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/30 text-emerald-300 font-mono font-bold">1-CLICK</span>
                </div>
                <div className="grid grid-cols-4 gap-1">
                  {(["beat_sync", "viral", "clean", "documentary"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => useEditorStore.getState().runAutoEdit(m)}
                      className={`text-[9px] py-1.5 rounded border font-bold capitalize transition ${
                        state.autoEditStats?.mode === m
                          ? "bg-cyan-950/60 border-cyan-400 text-cyan-200"
                          : "bg-neutral-800/60 border-neutral-800 text-neutral-400 hover:border-cyan-500/50"
                      }`}
                      title={`Auto edit: ${m}`}
                    >
                      {m === "beat_sync" ? "Beat Sync" : m}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => useEditorStore.getState().runAutoEdit(state.autoEditStats?.mode ?? "beat_sync")}
                  className="bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 hover:opacity-90 text-[11px] font-bold py-2 rounded text-white transition shadow-md shadow-cyan-500/20"
                >
                  <span className="flex items-center justify-center gap-1.5"><Wand2 className="w-3.5 h-3.5" /> Auto Edit Entire Project</span>
                </button>
                {state.autoEditStats && (
                  <div className="flex items-center justify-between text-[9px] text-neutral-400 font-mono border-t border-neutral-800 pt-2">
                    <span>{state.autoEditStats.mode} • {state.autoEditStats.bpm} BPM</span>
                    <span className="text-emerald-400">{state.autoEditStats.segments} segs • {state.autoEditStats.cuts} cuts</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => useEditorStore.getState().directorStoryboard("9:16")}
                  className="flex flex-col items-start gap-0.5 bg-gradient-to-br from-indigo-600/80 to-fuchsia-700/60 hover:opacity-90 border border-fuchsia-500/40 text-[10px] font-bold py-2 px-2.5 rounded-lg text-white transition shadow-md shadow-fuchsia-500/10"
                  title="Storyboard a cinematic cut: beat edit + grade + camera motion + hook"
                >
                  <span className="flex items-center gap-1"><Clapperboard className="w-3.5 h-3.5" /> Director Engine</span>
                  <span className="text-[8px] font-normal text-fuchsia-200/80">Cinematic storyboard cut</span>
                </button>
                <button
                  onClick={() => useEditorStore.getState().autoImprove()}
                  className="flex flex-col items-start gap-0.5 bg-gradient-to-br from-emerald-600/70 to-teal-700/50 hover:opacity-90 border border-emerald-500/40 text-[10px] font-bold py-2 px-2.5 rounded-lg text-white transition shadow-md shadow-emerald-500/10"
                  title="One-click grade + vocal enhance + normalize"
                >
                  <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" /> Auto Improve</span>
                  <span className="text-[8px] font-normal text-emerald-200/80">Grade + audio + normalize</span>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">Low-Lite On-Device AI</h3>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/30 text-emerald-300 font-mono font-bold">100% Offline (0 Cloud)</span>
              </div>

              <div className="bg-neutral-900/90 border border-cyan-500/30 rounded-lg p-2 flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1.5 text-neutral-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-cyan-300">ONNX WebGPU INT8</span>
                </div>
                <span className="font-mono text-emerald-400">14.2 MB RAM • 18ms</span>
              </div>

              <button onClick={() => state.autoCutSilence(-32)} className="p-2.5 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/40 rounded-lg text-left transition flex items-start gap-2.5">
                <Scissors className="w-4 h-4 text-cyan-400 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-cyan-200">Silero VAD Silence Auto-Cut</div>
                  <div className="text-[10px] text-cyan-400/80">Prune silent pauses across all video tracks</div>
                </div>
              </button>

              <button onClick={() => state.runLowLiteSubtitles()} className="p-2.5 bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-left transition flex items-start gap-2.5">
                <Type className="w-4 h-4 text-amber-400 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-neutral-200">Whisper-Tiny INT8 Captions</div>
                  <div className="text-[10px] text-neutral-500">Fast on-device speech-to-text (18ms)</div>
                </div>
              </button>

              <button onClick={() => state.runLowLiteBgRemoval()} className="p-2.5 bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-left transition flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-fuchsia-400 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-neutral-200">SAM-Lite Subject Cutout</div>
                  <div className="text-[10px] text-neutral-500">Green-screen effect without green screen</div>
                </div>
              </button>

              <button onClick={() => state.runLowLiteSmartReframe()} className="p-2.5 bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-left transition flex items-start gap-2.5">
                <Aperture className="w-4 h-4 text-emerald-400 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-neutral-200">MobileFaceNet Smart Reframe</div>
                  <div className="text-[10px] text-neutral-500">Auto tracking speaker for 9:16 Shorts</div>
                </div>
              </button>
            </div>
          )}

          {activeTab === "shortcuts" && (
            <div>
              <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">Premiere Pro Keybinds</h3>
              <div className="flex flex-col gap-1.5 text-xs text-neutral-300">
                {[
                  ["Space", "Play / Pause"],
                  ["J", "Shuttle Back (−2s)"],
                  ["K", "Shuttle Stop"],
                  ["L", "Shuttle Forward"],
                  ["C / S", "Razor Split Tool"],
                  ["V", "Selection Tool"],
                  ["N", "Toggle Magnetic Snap"],
                  ["Shift + Del", "Ripple Delete"],
                  ["Del / Backspace", "Delete Clip"],
                  ["Ctrl + D", "Duplicate Clip"],
                  ["Ctrl + Z", "Undo"],
                  ["Ctrl + Shift + Z", "Redo"],
                  ["Home", "Go to Start"],
                  ["End", "Go to End"],
                  ["← / →", "Nudge Playhead ±0.5s"],
                  ["Shift + ← / →", "Nudge Clip ±0.1s"],
                  ["I / O", "Mark In / Out"]
                ].map(([key, label]) => (
                  <div key={key} className="flex justify-between bg-neutral-900/80 p-2 rounded border border-neutral-800">
                    <span className="font-mono text-amber-400 font-bold">{key}</span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        )}

        <div className="flex-1 bg-[#07080a] flex flex-col">
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="w-[600px] h-[337px] bg-black rounded-lg shadow-2xl overflow-hidden border border-neutral-800 relative group">
              <Stage ref={stageRef} width={600} height={337}>
                <Layer>
                  <Rect width={600} height={337} fill="#090a0c" />
                  {sceneShapes.map((shape) => (
                    <Group
                      key={shape.id}
                      scaleX={previewTransform?.scaleX ?? 1}
                      scaleY={previewTransform?.scaleY ?? 1}
                      opacity={previewTransform?.opacity ?? 1}
                    >
                      <SceneShapeNode shape={shape} />
                    </Group>
                  ))}
                  {textElements.map((el) => (
                    <KonvaText
                      key={el.id}
                      text={el.text}
                      x={el.x + (previewTransform?.x ?? 0)}
                      y={el.y + (previewTransform?.y ?? 0)}
                      fontSize={el.fontSize}
                      fill={el.fill}
                      scaleX={previewTransform?.scaleX ?? 1}
                      scaleY={previewTransform?.scaleY ?? 1}
                      rotation={(previewTransform?.rotation ?? 0) + 0}
                      skewX={previewTransform?.skewX ?? 0}
                      skewY={previewTransform?.skewY ?? 0}
                      opacity={previewTransform?.opacity ?? 1}
                      draggable
                    />
                  ))}
                </Layer>
              </Stage>

              {availableEffects.filter((fx) => fx.id === selectedEffect && fx.overlayClass).map((fx) => (
                <div key={fx.id} className={`absolute inset-0 ${fx.overlayClass} pointer-events-none`} />
              ))}
              <div className="absolute inset-0 fx-vignette pointer-events-none" />

              <div className="absolute top-2 left-2 bg-black/70 backdrop-blur text-[10px] text-neutral-400 px-2 py-0.5 rounded border border-neutral-800 flex items-center gap-1.5 z-10">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Remotion / Konva Canvas Viewport
                {selectedAnimationDescriptor && (
                  <span className="text-cyan-300 font-mono">{selectedAnimationDescriptor.name} • {(previewProgress * 100).toFixed(0)}%</span>
                )}
              </div>
            </div>
          </div>

          <div className="h-11 border-t border-neutral-800/80 bg-[#121318] px-4 flex items-center justify-between text-xs text-neutral-400">
            <span className="font-mono text-[11px] text-cyan-400">{formatTimecode(currentTime)}</span>
            <div className="flex items-center gap-3">
              <button onClick={() => state.seekBy(-1)} className="hover:text-white transition"><SkipBack className="w-4 h-4" /></button>
              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 hover:opacity-90 text-black flex items-center justify-center font-bold shadow-md shadow-cyan-500/20 transition"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>
              <button onClick={() => state.seekBy(1)} className="hover:text-white transition"><SkipForward className="w-4 h-4" /></button>
              <button
                onClick={toggleLoop}
                title="Loop Playback"
                className={`px-2 py-1 rounded transition border flex items-center gap-1 text-[9px] font-bold ${
                  loopPlayback ? "bg-cyan-500/20 border-cyan-400 text-cyan-300" : "border-neutral-700 text-neutral-500 hover:text-white"
                }`}
              >
                <Repeat className="w-3 h-3" /> LOOP
              </button>
              <button
                onClick={toggleSnap}
                title="Magnetic Snap"
                className={`px-2 py-1 rounded transition border flex items-center gap-1 text-[9px] font-bold ${
                  snapEnabled ? "bg-amber-500/20 border-amber-400 text-amber-300" : "border-neutral-700 text-neutral-500 hover:text-white"
                }`}
              >
                <Magnet className="w-3 h-3" /> SNAP
              </button>
            </div>
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-cyan-400" />
              <input
                type="range" min="0" max="100"
                value={audioSettings.volume}
                onChange={(e) => setAudioVolume(Number(e.target.value))}
                className="w-20 h-1.5 accent-cyan-400 bg-neutral-800 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="h-56 border-t border-neutral-800/80 bg-[#0f1014] flex flex-col">
        <div className="h-8 border-b border-neutral-800/80 px-3 flex items-center justify-between text-[11px] text-neutral-400">
          {!state.minimalMode && (
          <div className="flex items-center gap-3">
            <button onClick={splitClip} className="flex items-center gap-1 hover:text-cyan-400 transition font-medium">
              <Scissors className="w-3.5 h-3.5 text-cyan-400" /> Split (C)
            </button>
            <button onClick={() => triggerNotice("Selection Tool Active (V)")} className="flex items-center gap-1 hover:text-amber-400 transition font-medium">
              <MousePointer className="w-3.5 h-3.5 text-amber-400" /> Select (V)
            </button>
            <button onClick={duplicateClip} className="flex items-center gap-1 hover:text-purple-400 transition font-medium">
              <Copy className="w-3.5 h-3.5 text-purple-400" /> Duplicate (Ctrl+D)
            </button>
            <button onClick={deleteClip} className="flex items-center gap-1 hover:text-red-400 transition font-medium">
              <Trash2 className="w-3.5 h-3.5 text-red-400" /> Delete (Del)
            </button>
            <button onClick={rippleDelete} className="flex items-center gap-1 hover:text-orange-400 transition font-medium">
              <Scissors className="w-3.5 h-3.5 text-orange-400" /> Ripple (Shift+Del)
            </button>
            <button onClick={() => applyAnimationToClip(selectedClipId ?? "v1", selectedAnimationPreset ?? "preset_pop_in")} className="flex items-center gap-1 hover:text-cyan-400 transition font-medium">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Apply Preset
            </button>
          </div>
          )}
          {state.minimalMode && (
          <div className="flex items-center gap-2 text-[10px] text-neutral-500">
            <span>Press <kbd className="font-mono text-neutral-400">V</kbd> Select</span>
            <span>·</span>
            <span><kbd className="font-mono text-neutral-400">C</kbd> Split</span>
            <span>·</span>
            <span><kbd className="font-mono text-neutral-400">Del</kbd> Delete</span>
          </div>
          )}
          <span className="text-[10px] text-neutral-500 font-mono">WebCodecs Timeline Engine</span>
        </div>

        <div className="px-3 pt-2 pb-1 flex items-center gap-2">
          <span className="text-[9px] font-mono text-cyan-400 font-bold">0s</span>
          <input
            type="range"
            min="0"
            max={duration}
            step="0.1"
            value={currentTime}
            onChange={(e) => setCurrentTime(Number(e.target.value))}
            className="flex-1 h-1 accent-cyan-400 bg-neutral-800 rounded cursor-pointer"
          />
          <span className="text-[9px] font-mono text-neutral-500 font-bold">{duration}s</span>
        </div>

        <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1.5 bg-[#07080a]">
          {clips.map((clip) => {
            const animId = state.clipAnimations[clip.id];
            const animName = getAnimationPreset(animId)?.name;
            return (
              <div
                key={clip.id}
                onClick={() => setSelectedClipId(clip.id)}
                className={`flex items-center gap-2 h-10 bg-neutral-900/80 rounded border px-2.5 cursor-pointer transition ${
                  selectedClipId === clip.id ? "border-cyan-400 ring-1 ring-cyan-400/30" : "border-neutral-800 hover:border-neutral-700"
                }`}
              >
                <span className="text-[10px] font-mono text-cyan-400 font-bold w-8">{clip.trackId}</span>
                <div className={`flex-1 h-7 rounded flex items-center px-2 text-[11px] font-medium ${clip.color}`}>
                  <span className="truncate">{clip.title}</span>
                  {animName && (
                    <span className="ml-2 text-[8px] px-1 py-0.5 rounded bg-black/40 border border-white/10 text-cyan-300 font-mono whitespace-nowrap">
                      ✦ {animName}
                    </span>
                  )}
                </div>
                <span className="text-[9px] font-mono text-neutral-500 whitespace-nowrap">
                  {clip.startTime}s → {clip.startTime + clip.duration}s
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </>
  );
}
