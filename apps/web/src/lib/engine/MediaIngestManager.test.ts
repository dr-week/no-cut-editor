import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { MediaIngestManager } from "./MediaIngestManager";

// Mock the mp4box metadata probe to prevent HTML5 video element timeout in jsdom
vi.mock("./MediaMetadataProbe", () => ({
  probeMediaMetadata: async () => ({
    duration: 42,
    width: 1920,
    height: 1080,
    fps: 30,
    codec: "h264",
    audioSampleRate: 48000,
    audioChanCount: 2,
    hasAudio: true,
    hasVideo: true,
  }),
}));

describe("MediaIngestManager Ingestion Pipeline", () => {
  let manager: MediaIngestManager;

  beforeEach(() => {
    manager = MediaIngestManager.getInstance();
  });

  afterEach(() => {
    manager.cleanup();
  });

  it("ingests files, tracks ObjectURLs, and creates structured media assets", async () => {
    const file = new File(["dummy audio content"], "test_voiceover.wav", { type: "audio/wav" });

    if (typeof URL.createObjectURL === "undefined") {
      URL.createObjectURL = () => "blob:mock-url";
      URL.revokeObjectURL = () => {};
    }

    const assetId = await manager.ingestFile(file);
    expect(assetId).toBeDefined();

    const asset = manager.getAsset(assetId);
    expect(asset).toBeDefined();
    expect(asset?.name).toBe("test_voiceover.wav");
    expect(asset?.type).toBe("audio");
  }, 10000);
});
