import { describe, it, expect } from "vitest";
import {
  COMPRESSION_PROFILES,
  planExportChunks,
  calculateTargetBitrateFromSize,
  probeVideoEncoderSupport,
} from "./mediaProcessingEngine";

describe("Media Processing & WebCodecs Engine", () => {
  it("provides standard compression profiles", () => {
    expect(COMPRESSION_PROFILES.cinematic_4k).toBeDefined();
    expect(COMPRESSION_PROFILES.social_balanced).toBeDefined();
    expect(COMPRESSION_PROFILES.ultra_compact).toBeDefined();
    expect(COMPRESSION_PROFILES.cinematic_4k.targetBitrateKbps).toBe(25000);
    expect(COMPRESSION_PROFILES.ultra_compact.crf).toBe(28);
  });

  it("plans parallel export chunks correctly", () => {
    const chunks = planExportChunks(12500, 5000);
    expect(chunks).toHaveLength(3);
    expect(chunks[0]).toEqual({ chunkIndex: 0, startMs: 0, endMs: 5000, durationMs: 5000 });
    expect(chunks[1]).toEqual({ chunkIndex: 1, startMs: 5000, endMs: 10000, durationMs: 5000 });
    expect(chunks[2]).toEqual({ chunkIndex: 2, startMs: 10000, endMs: 12500, durationMs: 2500 });
  });

  it("handles zero/negative duration in chunk planner", () => {
    expect(planExportChunks(0)).toEqual([]);
    expect(planExportChunks(-100)).toEqual([]);
  });

  it("calculates adaptive bitrate from target file size constraint", () => {
    // 10 MB limit for 30s video with 128kbps audio
    // 10MB = 10 * 1024 * 1024 bytes = 10,485,760 bytes = 83,886,080 bits
    // 83,886 kb / 30s = 2796 kbps total -> video = 2796 - 128 = 2668 kbps
    const bitrate = calculateTargetBitrateFromSize(10 * 1024 * 1024, 30, 128);
    expect(bitrate).toBeGreaterThan(2500);
    expect(bitrate).toBeLessThan(2800);
  });

  it("handles WebCodecs probe in non-browser/node environment safely without throwing", async () => {
    const supported = await probeVideoEncoderSupport();
    expect(supported).toBe(false);
  });
});
