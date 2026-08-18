import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock Tone.js — jsdom has no real AudioContext
vi.mock("tone", () => ({
  start: vi.fn().mockResolvedValue(undefined),
  getTransport: () => ({ seconds: 0, start: vi.fn(), pause: vi.fn(), stop: vi.fn() }),
}));
vi.mock("../audio/ToneAudioEngine", () => ({
  ToneAudioEngine: { getInstance: () => ({ play: vi.fn(), pause: vi.fn(), seek: vi.fn() }) },
}));

import { useEditorStore } from "./editorStore";
import { TimelineCommander } from "../history/TimelineCommander";
import { EditorEngine } from "../engine/EditorEngine";

describe("EditorStore Command-Pattern Undo/Redo Engine", () => {
  beforeEach(() => {
    TimelineCommander.getInstance().clear();
  });

  it("executes reversible ripple delete with Ctrl+Z undo restoration", () => {
    const { setSelectedClipId, rippleDelete, undo, redo } = useEditorStore.getState();
    
    // Select txt1 clip (starts at 5s, duration 15s)
    setSelectedClipId("txt1");
    rippleDelete();

    // Verify clip was removed
    let clips = useEditorStore.getState().clips;
    expect(clips.some((c) => c.id === "txt1")).toBe(false);

    // Trigger Undo
    undo();
    clips = useEditorStore.getState().clips;
    expect(clips.some((c) => c.id === "txt1")).toBe(true);

    // Trigger Redo
    redo();
    clips = useEditorStore.getState().clips;
    expect(clips.some((c) => c.id === "txt1")).toBe(false);
  });

  it("executes reversible razor split at playhead with undo restoration", () => {
    const { setSelectedClipId, splitClip, undo } = useEditorStore.getState();
    const engine = EditorEngine.getInstance();
    
    // Position playhead at 10s inside v1 (0s to 30s)
    engine.seek(10);
    setSelectedClipId("v1");
    splitClip();

    let clips = useEditorStore.getState().clips;
    const v1Clips = clips.filter((c) => c.id.startsWith("v1"));
    expect(v1Clips.length).toBe(2);

    // Undo razor cut
    undo();
    clips = useEditorStore.getState().clips;
    const restoredV1 = clips.filter((c) => c.id.startsWith("v1"));
    expect(restoredV1.length).toBe(1);
    expect(restoredV1[0].duration).toBe(30);
  });
});
