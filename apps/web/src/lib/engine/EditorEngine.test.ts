import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// Mock Tone.js — jsdom has no real AudioContext
// Use a shared mutable object so engine.seek() writes to the same ref engine.currentTime reads from
const mockTransport = { seconds: 0, start: vi.fn(), pause: vi.fn(), stop: vi.fn() };
vi.mock("tone", () => ({
  start: vi.fn().mockResolvedValue(undefined),
  getTransport: () => mockTransport,
}));
vi.mock("#/lib/audio/ToneAudioEngine", () => ({
  ToneAudioEngine: { getInstance: () => ({ play: vi.fn(), pause: vi.fn(), seek: vi.fn() }) },
}));

import { EditorEngine } from "./EditorEngine";

describe("EditorEngine Sub-16ms Monotonic Clock", () => {
  let engine: EditorEngine;

  beforeEach(() => {
    engine = EditorEngine.getInstance();
    engine.seek(0);
    engine.pause();
  });

  afterEach(() => {
    engine.pause();
  });

  it("maintains accurate duration and seek positions", () => {
    expect(engine.duration).toBe(60);
    engine.seek(15.5);
    expect(engine.currentTime).toBe(15.5);
  });

  it("clamps seeking to [0, duration]", () => {
    engine.seek(-10);
    expect(engine.currentTime).toBe(0);
    engine.seek(100);
    expect(engine.currentTime).toBe(60);
  });

  it("notifies direct DOM subscribers without React reconciliation", () => {
    let receivedTime = -1;
    const unsubscribe = engine.subscribe((time) => {
      receivedTime = time;
    });

    engine.seek(22.4);
    expect(receivedTime).toBe(22.4);
    unsubscribe();
  });

  it("notifies play state change subscribers for UI-Sync", async () => {
    let playState = false;
    const unsubscribe = engine.subscribePlayState((isPlaying) => {
      playState = isPlaying;
    });

    await engine.play(); // async since Tone.start() is awaited
    expect(playState).toBe(true);
    engine.pause();
    expect(playState).toBe(false);
    unsubscribe();
  });
});
