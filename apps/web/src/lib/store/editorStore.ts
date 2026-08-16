import { create } from "zustand";
import { createInitialData } from "./editorInitial";
import { editorActions, type EditorState } from "./editorActions";

export const useEditorStore = create<EditorState>()((set, get) => ({
  ...createInitialData(),
  ...editorActions(set, get)
}));

export function resetEditorStore(): void {
  useEditorStore.setState({ ...createInitialData(), undoStack: [], redoStack: [] });
}

export type { EditorState } from "./editorActions";
export type { TextElement, SceneShape, TrackClip, ColorGradingSettings, AudioTrackSettings, ActiveTab } from "./editorTypes";
export type { AnimationDescriptor, VideoTemplate, EffectPreset, VideoTransition, TrendPreset, LutPreset } from "./editorTypes";
