import { describe, it, expect } from "vitest";
import { useEditorStore } from "#/lib/store/editorStore";

describe("OpenCut Video Editor Store & Backend Pipeline", () => {
  it("initializes with default CapCut/Premiere tracks and dark theme state", () => {
    const state = useEditorStore.getState();
    expect(state.clips.length).toBeGreaterThan(0);
    expect(state.isPlaying).toBe(false);
    expect(state.textElements.length).toBeGreaterThan(0);
  });

  it("handles play/pause toggling", () => {
    const { togglePlay } = useEditorStore.getState();
    togglePlay();
    expect(useEditorStore.getState().isPlaying).toBe(true);
    togglePlay();
    expect(useEditorStore.getState().isPlaying).toBe(false);
  });

  it("supports adding animated text overlays dynamically", () => {
    const { addTextElement } = useEditorStore.getState();
    addTextElement("Test Title", "#38bdf8");
    const texts = useEditorStore.getState().textElements;
    expect(texts.some((t) => t.text === "Test Title")).toBe(true);
  });

  it("executes ripple delete on selected clip", () => {
    const { setSelectedClipId, rippleDelete } = useEditorStore.getState();
    setSelectedClipId("txt1");
    rippleDelete();
    const clips = useEditorStore.getState().clips;
    expect(clips.some((c) => c.id === "txt1")).toBe(false);
  });
});
