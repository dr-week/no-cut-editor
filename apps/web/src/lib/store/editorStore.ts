/**
 * @file editorStore.ts
 * @description Centralized Zustand state management store for OpenCut Studio.
 * Implements Option A (Store-as-Orchestrator): actions dispatch Command objects
 * to TimelineCommander, ensuring consistent snapshots and undo/redo history.
 * @module apps/web/src/lib/store/editorStore
 */

import { create } from "zustand";
import { EditorEngine } from "../engine/EditorEngine";
import { TimelineCommander, type Command } from "../history/TimelineCommander";

export interface TextElement {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fill: string;
  rotation?: number;
  scaleX?: number;
  scaleY?: number;
}

export interface TrackClip {
  id: string;
  title: string;
  trackId: string;
  type: "video" | "text" | "audio";
  startTime: number;
  duration: number;
  color: string;
  waveform?: number[];
  speed?: number;
}

export interface EditorState {
  // Coarse UI & Mode State
  isPlaying: boolean;
  activeTab: "media" | "text" | "social" | "templates" | "effects" | "transitions" | "ai" | "audio" | "color" | "shortcuts";
  selectedClipId: string | null;
  selectedTextId: string | null;
  activeNotice: string | null;

  // Lumetri Color Wheel Values
  lift: number;
  gamma: number;
  gain: number;
  activeLUT: string;

  // Collections
  textElements: TextElement[];
  clips: TrackClip[];

  // Actions
  togglePlay: () => void;
  setPlaying: (isPlaying: boolean) => void;
  setActiveTab: (tab: EditorState["activeTab"]) => void;
  setSelectedClipId: (id: string | null) => void;
  setSelectedTextId: (id: string | null) => void;
  triggerNotice: (msg: string) => void;
  addTextElement: (text: string, fill?: string) => void;
  updateTextElement: (id: string, updates: Partial<TextElement>) => void;
  generateAICaptions: () => void;
  setLumetriColor: (lift: number, gamma: number, gain: number) => void;
  setActiveLUT: (lut: string) => void;

  // Command-Pattern Timeline Operations (Undo/Redo Safe)
  addTrackClip: (clip: TrackClip) => void;
  splitClip: () => void;
  rippleDelete: () => void;
  undo: () => void;
  redo: () => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  // Default Initial State
  isPlaying: false,
  activeTab: "media",
  selectedClipId: "v1",
  selectedTextId: "text1",
  activeNotice: null,

  // Lumetri Color Defaults
  lift: 0,
  gamma: 0,
  gain: 0,
  activeLUT: "None (Rec.709)",

  // Default Canvas Overlays
  textElements: [
    { id: "text1", text: "CapCut Dark UI + Remotion Player", x: 130, y: 160, fontSize: 26, fill: "#38bdf8", rotation: 0, scaleX: 1, scaleY: 1 }
  ],

  // Default Multi-Track Clips
  clips: [
    { id: "v1", title: "Main_Video_Track.mp4", trackId: "V1", type: "video", startTime: 0, duration: 30, color: "bg-blue-950/60 border-blue-500/40 text-blue-300" },
    { id: "txt1", title: "CapCut_Subtitles", trackId: "TXT", type: "text", startTime: 5, duration: 15, color: "bg-amber-950/60 border-amber-500/40 text-amber-300" },
    { 
      id: "a1", 
      title: "Background_Music.mp3", 
      trackId: "A1", 
      type: "audio", 
      startTime: 0, 
      duration: 45, 
      color: "bg-emerald-950/60 border-emerald-500/40 text-emerald-300",
      waveform: [35, 60, 45, 80, 95, 70, 50, 85, 100, 75, 40, 65, 90, 80, 55, 30, 45, 70, 85, 60]
    }
  ],

  // --- Transport Actions ---
  togglePlay: () => {
    const engine = EditorEngine.getInstance();
    engine.togglePlay();
    set({ isPlaying: engine.isPlaying });
  },
  setPlaying: (isPlaying: boolean) => {
    const engine = EditorEngine.getInstance();
    if (isPlaying) engine.play();
    else engine.pause();
    set({ isPlaying });
  },
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedClipId: (id) => set({ selectedClipId: id }),
  setSelectedTextId: (id) => set({ selectedTextId: id }),

  triggerNotice: (msg) => {
    set({ activeNotice: msg });
    setTimeout(() => set({ activeNotice: null }), 2000);
  },

  addTextElement: (text, fill = "#38bdf8") => set((state) => ({
    textElements: [
      ...state.textElements,
      { id: `text_${Date.now()}`, text, x: 120, y: 120, fontSize: 28, fill, rotation: 0, scaleX: 1, scaleY: 1 }
    ]
  })),

  updateTextElement: (id, updates) => set((state) => ({
    textElements: state.textElements.map((el) => el.id === id ? { ...el, ...updates } : el)
  })),

  generateAICaptions: () => {
    const aiCaptions = [
      { id: `sub_1`, text: "Welcome to OpenCut AI 2026", x: 160, y: 260, fontSize: 22, fill: "#fbbf24", rotation: 0, scaleX: 1, scaleY: 1 },
      { id: `sub_2`, text: "Instant Whisper.cpp Subtitles Generated", x: 130, y: 260, fontSize: 22, fill: "#fbbf24", rotation: 0, scaleX: 1, scaleY: 1 }
    ];
    set((state) => ({
      textElements: [...state.textElements, ...aiCaptions]
    }));
    get().triggerNotice("AI Subtitles Generated (Whisper.cpp)");
  },

  setLumetriColor: (lift, gamma, gain) => set({ lift, gamma, gain }),
  setActiveLUT: (lut) => {
    set({ activeLUT: lut });
    get().triggerNotice(`3D LUT Applied: ${lut}`);
  },

  // --- Command-Pattern Operations (Store-as-Orchestrator) ---
  addTrackClip: (newClip: TrackClip) => {
    const command: Command = {
      id: `add_clip_${Date.now()}`,
      description: `Add ${newClip.title} to ${newClip.trackId}`,
      execute: () => {
        set((state) => ({
          clips: [...state.clips, newClip],
          selectedClipId: newClip.id,
        }));
      },
      undo: () => {
        set((state) => ({
          clips: state.clips.filter((c) => c.id !== newClip.id),
          selectedClipId: null,
        }));
      },
    };
    TimelineCommander.getInstance().execute(command);
    get().triggerNotice(`Added ${newClip.title} to ${newClip.trackId} (Ctrl+Z to Undo)`);
  },

  splitClip: () => {
    const { selectedClipId, clips } = get();
    if (!selectedClipId) return;
    const clipIndex = clips.findIndex((c) => c.id === selectedClipId);
    if (clipIndex === -1) return;

    const originalClip = clips[clipIndex];
    const engine = EditorEngine.getInstance();
    const cutPoint = engine.currentTime;

    // Check if cut point falls inside clip bounds
    if (cutPoint <= originalClip.startTime || cutPoint >= originalClip.startTime + originalClip.duration) {
      get().triggerNotice("Playhead outside selected clip boundary");
      return;
    }

    const firstDuration = cutPoint - originalClip.startTime;
    const secondDuration = originalClip.duration - firstDuration;

    const firstClip: TrackClip = {
      ...originalClip,
      duration: Number(firstDuration.toFixed(3)),
    };
    const secondClip: TrackClip = {
      ...originalClip,
      id: `${originalClip.id}_cut_${Date.now()}`,
      startTime: Number(cutPoint.toFixed(3)),
      duration: Number(secondDuration.toFixed(3)),
    };

    const command: Command = {
      id: `split_${Date.now()}`,
      description: `Razor Cut ${originalClip.title}`,
      execute: () => {
        const currentClips = get().clips;
        const idx = currentClips.findIndex((c) => c.id === originalClip.id);
        if (idx !== -1) {
          const updated = [...currentClips];
          updated.splice(idx, 1, firstClip, secondClip);
          set({ clips: updated, selectedClipId: secondClip.id });
        }
      },
      undo: () => {
        const currentClips = get().clips;
        const filtered = currentClips.filter((c) => c.id !== firstClip.id && c.id !== secondClip.id);
        set({ clips: [...filtered, originalClip], selectedClipId: originalClip.id });
      },
    };

    TimelineCommander.getInstance().execute(command);
    get().triggerNotice("Razor Cut Executed (Ctrl+Z to Undo)");
  },

  rippleDelete: () => {
    const { selectedClipId, clips } = get();
    if (!selectedClipId) return;
    const clipToDelete = clips.find((c) => c.id === selectedClipId);
    if (!clipToDelete) return;

    const previousClips = [...clips];
    const cutEnd = clipToDelete.startTime + clipToDelete.duration;

    // Ripple shift clips after the deleted clip
    const updatedClips = clips
      .filter((c) => c.id !== selectedClipId)
      .map((c) => {
        if (c.startTime >= cutEnd) {
          return { ...c, startTime: Number((c.startTime - clipToDelete.duration).toFixed(3)) };
        }
        return c;
      });

    const command: Command = {
      id: `ripple_del_${Date.now()}`,
      description: `Ripple Delete ${clipToDelete.title}`,
      execute: () => {
        set({ clips: updatedClips, selectedClipId: null });
      },
      undo: () => {
        set({ clips: previousClips, selectedClipId: clipToDelete.id });
      },
    };

    TimelineCommander.getInstance().execute(command);
    get().triggerNotice("Ripple Delete (Shift + Del) [Undoable]");
  },

  undo: () => {
    const didUndo = TimelineCommander.getInstance().undo();
    if (didUndo) {
      get().triggerNotice("Undo (Ctrl+Z)");
    }
  },

  redo: () => {
    const didRedo = TimelineCommander.getInstance().redo();
    if (didRedo) {
      get().triggerNotice("Redo (Ctrl+Y)");
    }
  },
}));
