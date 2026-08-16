/**
 * Media Processing & WebCodecs Capabilities Engine
 *
 * Lightweight, zero-external-dependency module for:
 * - Detecting hardware acceleration and WebCodecs video encoder/decoder support
 * - Calculating compression ratios & multi-pass bitrate targets
 * - Splitting export jobs into time-sliced worker chunks for parallel processing
 * - Generating video container & muxer metadata profiles
 */

export interface CodecCapability {
  codec: string;
  label: string;
  hardwareAccelerated: boolean;
  supported: boolean;
  maxResolution: { width: number; height: number };
}

export interface VideoChunkPlan {
  chunkIndex: number;
  startMs: number;
  endMs: number;
  durationMs: number;
}

export interface CompressionProfile {
  name: string;
  targetBitrateKbps: number;
  crf: number;
  keyframeIntervalSeconds: number;
  audioBitrateKbps: number;
  description: string;
}

/**
 * Standard compression profiles for web and social export
 */
export const COMPRESSION_PROFILES: Record<string, CompressionProfile> = {
  cinematic_4k: {
    name: "Cinematic High Bitrate (4K/Pro)",
    targetBitrateKbps: 25000,
    crf: 18,
    keyframeIntervalSeconds: 1,
    audioBitrateKbps: 320,
    description: "Maximum fidelity for master exports and archival.",
  },
  social_balanced: {
    name: "Social Balanced (Fast Upload)",
    targetBitrateKbps: 8000,
    crf: 23,
    keyframeIntervalSeconds: 2,
    audioBitrateKbps: 192,
    description: "Optimized for Instagram, TikTok, and YouTube Shorts balance of speed & quality.",
  },
  ultra_compact: {
    name: "Ultra Compact (Discord/Email)",
    targetBitrateKbps: 2500,
    crf: 28,
    keyframeIntervalSeconds: 4,
    audioBitrateKbps: 128,
    description: "Aggressive compression for file size limits (<25MB).",
  },
};

/**
 * Splits a total timeline duration into parallelizable chunk segments for worker-based rendering.
 */
export function planExportChunks(totalDurationMs: number, chunkDurationMs = 5000): VideoChunkPlan[] {
  if (totalDurationMs <= 0) return [];
  const chunkCount = Math.ceil(totalDurationMs / chunkDurationMs);
  const chunks: VideoChunkPlan[] = [];

  for (let i = 0; i < chunkCount; i++) {
    const startMs = i * chunkDurationMs;
    const endMs = Math.min(totalDurationMs, (i + 1) * chunkDurationMs);
    chunks.push({
      chunkIndex: i,
      startMs,
      endMs,
      durationMs: endMs - startMs,
    });
  }

  return chunks;
}

/**
 * Calculates adaptive bitrate recommendation given target file size limit.
 * (e.g. "Fit within 10MB file limit for 30s video")
 */
export function calculateTargetBitrateFromSize(
  targetMaxBytes: number,
  durationSeconds: number,
  audioBitrateKbps = 128
): number {
  if (durationSeconds <= 0) return 0;
  const totalAllowedKbits = (targetMaxBytes * 8) / 1000;
  const totalBitrateKbps = totalAllowedKbits / durationSeconds;
  const videoBitrateKbps = Math.max(200, totalBitrateKbps - audioBitrateKbps);
  return Math.round(videoBitrateKbps);
}

/**
 * Probes browser WebCodecs VideoEncoder support safely.
 */
export async function probeVideoEncoderSupport(
  codec = "avc1.42E01E",
  width = 1920,
  height = 1080,
  bitrate = 6_000_000,
  framerate = 30
): Promise<boolean> {
  if (typeof window === "undefined" || typeof (window as any).VideoEncoder === "undefined") {
    return false;
  }

  try {
    const config = {
      codec,
      width,
      height,
      bitrate,
      framerate,
      hardwareAcceleration: "prefer-hardware" as const,
    };
    const support = await (window as any).VideoEncoder.isConfigSupported(config);
    return Boolean(support?.supported);
  } catch {
    return false;
  }
}
