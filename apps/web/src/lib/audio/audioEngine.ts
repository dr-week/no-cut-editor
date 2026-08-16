/**
 * Audio Processing & Waveform Peak Extraction Engine.
 * 
 * Reusable module for audio analysis, channel normalization,
 * ducking envelopes, and timeline waveform peak generation.
 */

export interface WaveformData {
  duration: number;
  sampleRate: number;
  channels: number;
  peaks: Float32Array;
  length: number;
}

export interface AudioDspConfig {
  volume: number; // 0 to 100
  muted: boolean;
  ducking: boolean;
  duckingAmountDb?: number;
  noiseGate: boolean;
  vocalEnhance: boolean;
  eqBands: number[]; // 5-band gain [-12 to +12 dB]
}

/**
 * Generates normalized peak points for lightweight timeline rendering (downsampled).
 */
export function extractWaveformPeaks(
  channelData: Float32Array,
  targetPeakCount = 100
): number[] {
  if (!channelData || channelData.length === 0) {
    return new Array(targetPeakCount).fill(0);
  }

  const blockSize = Math.floor(channelData.length / targetPeakCount);
  const peaks: number[] = [];

  for (let i = 0; i < targetPeakCount; i++) {
    const start = i * blockSize;
    let max = 0;
    for (let j = 0; j < blockSize && start + j < channelData.length; j++) {
      const val = Math.abs(channelData[start + j]);
      if (val > max) max = val;
    }
    peaks.push(Number(max.toFixed(3)));
  }

  return peaks;
}

/**
 * Calculates ducking gain attenuation when speech is present.
 */
export function calculateDuckingGain(
  isVoiceActive: boolean,
  duckingEnabled: boolean,
  duckingAttenuation = 0.35
): number {
  if (!duckingEnabled || !isVoiceActive) return 1.0;
  return Math.max(0.05, Math.min(1.0, duckingAttenuation));
}

/**
 * Clamps 5-band EQ gain to [-12, +12] dB range.
 */
export function clampEqGain(gainDb: number): number {
  return Math.max(-12, Math.min(12, gainDb));
}

/**
 * Computes overall linear volume multiplier from volume slider (0-100) and mute flag.
 */
export function computeMasterVolumeGain(volume: number, muted: boolean): number {
  if (muted) return 0;
  const clamped = Math.max(0, Math.min(100, volume));
  return Number((clamped / 100).toFixed(4));
}
