/**
 * @file MeydaBeatDetector.ts
 * @description Real-time audio beat detection and waveform extraction using Meyda.js.
 * Analyzes audio buffers for tempo, BPM, and onset peaks to snap motion
 * keyframes to musical downbeats automatically.
 * @module apps/web/src/lib/audio/MeydaBeatDetector
 */

import Meyda from "meyda";

export interface BeatAnalysisResult {
  bpm: number;
  beatTimestamps: number[];  // In seconds
  waveform: number[];        // Normalized 0-100 amplitude bars
}

/**
 * Analyzes a Float32Array PCM audio buffer using Meyda's RMS + ZCR features
 * to extract BPM and beat timestamps for keyframe auto-snapping.
 */
export async function analyzeAudioBeats(
  audioBuffer: AudioBuffer,
  sampleRate = 48000
): Promise<BeatAnalysisResult> {
  const channelData = audioBuffer.getChannelData(0);
  const frameSize = 512;
  const waveformBars = 60;
  const blockSize = Math.floor(channelData.length / waveformBars);

  // Compute 60-bar normalized waveform
  const waveform: number[] = [];
  for (let i = 0; i < waveformBars; i++) {
    let rms = 0;
    for (let j = 0; j < blockSize; j++) {
      rms += channelData[i * blockSize + j] ** 2;
    }
    waveform.push(Math.min(100, Math.floor(Math.sqrt(rms / blockSize) * 350)));
  }

  // Fix #7: Meyda requires bufferSize to match frame slice size — else returns null for every frame
  (Meyda as any).bufferSize = frameSize;

  // Extract energy features using Meyda
  const energyFrames: number[] = [];
  for (let offset = 0; offset + frameSize < channelData.length; offset += frameSize) {
    const frame = channelData.slice(offset, offset + frameSize);
    const features = Meyda.extract(["energy"], frame) as { energy: number } | null;
    if (features) energyFrames.push(features.energy);
  }

  // Simple onset detection: energy peaks above 1.5x local average
  const beatTimestamps: number[] = [];
  const windowSize = 10;
  for (let i = windowSize; i < energyFrames.length - windowSize; i++) {
    const localAvg = energyFrames.slice(i - windowSize, i + windowSize).reduce((a, b) => a + b, 0) / (2 * windowSize);
    if (energyFrames[i] > localAvg * 1.5 && energyFrames[i] > energyFrames[i - 1] && energyFrames[i] > energyFrames[i + 1]) {
      beatTimestamps.push((i * frameSize) / sampleRate);
    }
  }

  // Estimate BPM from median inter-beat interval
  const intervals = beatTimestamps.slice(1).map((t, i) => t - beatTimestamps[i]);
  const medianInterval = intervals.sort((a, b) => a - b)[Math.floor(intervals.length / 2)] || 0.5;
  const bpm = medianInterval > 0 ? Math.round(60 / medianInterval) : 120;

  return { bpm, beatTimestamps, waveform };
}
