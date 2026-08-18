import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { MediaIngestManager } from "./MediaIngestManager";

describe("MediaIngestManager Ingestion Pipeline", () => {
  let manager: MediaIngestManager;

  beforeEach(() => {
    manager = MediaIngestManager.getInstance();
  });

  afterEach(() => {
    manager.cleanup();
  });

  it("ingests files, tracks ObjectURLs, and creates structured media assets", async () => {
    // Mock File object
    const file = new File(["dummy audio content"], "test_voiceover.wav", { type: "audio/wav" });
    
    // In node/jsdom environment, URL.createObjectURL mock fallback
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
  });
});
