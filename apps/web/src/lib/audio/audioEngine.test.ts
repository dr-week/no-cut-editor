import { describe, it, expect } from "vitest";
import {
  extractWaveformPeaks,
  calculateDuckingGain,
  clampEqGain,
  computeMasterVolumeGain
} from "./audioEngine";

describe("audioEngine modular utilities", () => {
  it("extracts correct number of downsampled waveform peaks", () => {
    const rawSamples = new Float32Array(1000).fill(0.5);
    rawSamples[50] = 0.9;
    rawSamples[500] = 0.2;
    const peaks = extractWaveformPeaks(rawSamples, 20);
    expect(peaks).toHaveLength(20);
    expect(peaks[1]).toBe(0.9);
  });

  it("handles empty or zero-length audio buffers safely", () => {
    const empty = new Float32Array(0);
    const peaks = extractWaveformPeaks(empty, 50);
    expect(peaks).toHaveLength(50);
    expect(peaks.every((p) => p === 0)).toBe(true);
  });

  it("calculates ducking attenuation only when voice is active and ducking is enabled", () => {
    expect(calculateDuckingGain(false, true, 0.3)).toBe(1.0);
    expect(calculateDuckingGain(true, false, 0.3)).toBe(1.0);
    expect(calculateDuckingGain(true, true, 0.3)).toBe(0.3);
  });

  it("clamps EQ band gains to -12dB and +12dB", () => {
    expect(clampEqGain(18)).toBe(12);
    expect(clampEqGain(-25)).toBe(-12);
    expect(clampEqGain(4.5)).toBe(4.5);
  });

  it("computes master volume multiplier and respects mute", () => {
    expect(computeMasterVolumeGain(85, false)).toBe(0.85);
    expect(computeMasterVolumeGain(85, true)).toBe(0);
    expect(computeMasterVolumeGain(150, false)).toBe(1.0);
    expect(computeMasterVolumeGain(-10, false)).toBe(0);
  });
});

