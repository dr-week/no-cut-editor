import { describe, it, expect } from "vitest";
import {
  resolveBitrate,
  estimateFileSizeKb,
  buildExportFilename,
  SOCIAL_EXPORT_PRESETS,
  getSocialPreset,
  calculateExportProgress,
  type ExportOptions
} from "./exportEngine";

const base: ExportOptions = {
  format: "webm",
  width: 1920,
  height: 1080,
  fps: 30,
  quality: "medium",
  durationMs: 10_000
};

describe("OpenCut Export Engine (pure helpers)", () => {
  it("resolves bitrate per quality tier", () => {
    expect(resolveBitrate({ ...base, quality: "low" })).toBe(2_500_000);
    expect(resolveBitrate({ ...base, quality: "medium" })).toBe(6_000_000);
    expect(resolveBitrate({ ...base, quality: "high" })).toBe(12_000_000);
  });

  it("prefers explicit bitrate override", () => {
    expect(resolveBitrate({ ...base, bitrateMbps: 8 })).toBe(8_000_000);
  });

  it("estimates file size from duration and bitrate", () => {
    // 10s at 6 Mbps ≈ 7.15 MiB
    expect(estimateFileSizeKb(10_000, 6)).toBe(7324);
  });

  it("builds safe download filenames", () => {
    expect(buildExportFilename("My Great Edit!!", "webm")).toBe("My_Great_Edit.webm");
    expect(buildExportFilename("   ", "mp4")).toBe("opencut_export.mp4");
    expect(buildExportFilename("trailer-final-4k", "mp4")).toBe("trailer-final-4k.mp4");
  });

  it("provides platform-tuned social export presets", () => {
    expect(SOCIAL_EXPORT_PRESETS.length).toBeGreaterThanOrEqual(4);
    const shorts = getSocialPreset("yt-shorts-4k");
    expect(shorts).toBeDefined();
    expect(shorts?.width).toBe(1080);
    expect(shorts?.height).toBe(1920);
    expect(shorts?.fps).toBe(60);
  });

  it("calculates progress percentages accurately", () => {
    expect(calculateExportProgress(5000, 10000)).toBe(50.0);
    expect(calculateExportProgress(10000, 10000)).toBe(100.0);
    expect(calculateExportProgress(12000, 10000)).toBe(100.0);
    expect(calculateExportProgress(0, 10000)).toBe(0.0);
  });
});

