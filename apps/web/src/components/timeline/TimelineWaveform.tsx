/**
 * TimelineWaveform
 *
 * Lightweight canvas-based audio waveform visualizer for the timeline.
 * Uses `extractWaveformPeaks` from audioEngine.ts (no extra dependencies).
 * Renders downsampled peaks as bar-style waveform with configurable colors.
 *
 * Reuse: import TimelineWaveform anywhere a track URL + dimensions are available.
 */

import React, { useEffect, useRef, useState, useCallback } from "react";
import { extractWaveformPeaks } from "#/lib/audio/audioEngine";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface WaveformColors {
  bar: string;
  barMuted: string;
  background: string;
  centerLine: string;
}

export interface TimelineWaveformProps {
  /** Audio or video source URL to decode and display waveform for. */
  src: string;
  /** Width of the waveform canvas in px. Default: 300 */
  width?: number;
  /** Height of the waveform canvas in px. Default: 40 */
  height?: number;
  /** Number of peak samples to render. Default: 120 */
  peakCount?: number;
  /** Whether the track is muted (renders dimmed). */
  muted?: boolean;
  /** Optional color overrides. */
  colors?: Partial<WaveformColors>;
  className?: string;
}

const DEFAULT_COLORS: WaveformColors = {
  bar: "#22d3ee",        // cyan-400
  barMuted: "#374151",   // gray-700
  background: "transparent",
  centerLine: "#1f2937", // gray-800
};

// ---------------------------------------------------------------------------
// Hook: decode audio and extract peaks
// ---------------------------------------------------------------------------

interface PeakState {
  peaks: number[];
  loading: boolean;
  error: string | null;
}

export function useWaveformPeaks(src: string, peakCount: number): PeakState {
  const [state, setState] = useState<PeakState>({ peaks: [], loading: true, error: null });
  const abortRef = useRef<AbortController | null>(null);

  const decode = useCallback(async () => {
    if (!src) {
      setState({ peaks: new Array(peakCount).fill(0), loading: false, error: null });
      return;
    }

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setState((s) => ({ ...s, loading: true, error: null }));

    try {
      const resp = await fetch(src, { signal: abortRef.current.signal });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const arrayBuffer = await resp.arrayBuffer();

      // OfflineAudioContext is available in browser, not SSR
      if (typeof OfflineAudioContext === "undefined") {
        setState({ peaks: new Array(peakCount).fill(0.5), loading: false, error: null });
        return;
      }

      const ctx = new OfflineAudioContext(1, 1, 44100);
      const decoded = await ctx.decodeAudioData(arrayBuffer);
      const channelData = decoded.getChannelData(0);
      const peaks = extractWaveformPeaks(channelData, peakCount);
      setState({ peaks, loading: false, error: null });
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      setState({
        peaks: new Array(peakCount).fill(0),
        loading: false,
        error: err instanceof Error ? err.message : "Decode failed",
      });
    }
  }, [src, peakCount]);

  useEffect(() => {
    decode();
    return () => { abortRef.current?.abort(); };
  }, [decode]);

  return state;
}

// ---------------------------------------------------------------------------
// Canvas renderer helper (pure, no React)
// ---------------------------------------------------------------------------

export function renderWaveformToCanvas(
  canvas: HTMLCanvasElement,
  peaks: number[],
  muted: boolean,
  colors: WaveformColors
): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const { width, height } = canvas;
  ctx.clearRect(0, 0, width, height);

  // Background
  if (colors.background !== "transparent") {
    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, width, height);
  }

  // Center guide line
  ctx.strokeStyle = colors.centerLine;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, height / 2);
  ctx.lineTo(width, height / 2);
  ctx.stroke();

  if (!peaks.length) return;

  const barWidth = width / peaks.length;
  const halfH = height / 2;
  const barColor = muted ? colors.barMuted : colors.bar;

  ctx.fillStyle = barColor;
  peaks.forEach((peak, i) => {
    const barH = Math.max(1, peak * halfH * 0.9);
    const x = i * barWidth;
    // Symmetric top + bottom
    ctx.fillRect(x, halfH - barH, Math.max(1, barWidth - 1), barH * 2);
  });
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function TimelineWaveform({
  src,
  width = 300,
  height = 40,
  peakCount = 120,
  muted = false,
  colors: colorOverrides,
  className,
}: TimelineWaveformProps): React.ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colors: WaveformColors = { ...DEFAULT_COLORS, ...colorOverrides };
  const { peaks, loading } = useWaveformPeaks(src, peakCount);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    renderWaveformToCanvas(canvas, peaks, muted, colors);
  }, [peaks, muted, colors.bar, colors.barMuted, colors.background, colors.centerLine]);

  return (
    <div
      className={`relative select-none overflow-hidden ${className ?? ""}`}
      style={{ width, height }}
      aria-label="Audio waveform"
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="absolute inset-0"
        style={{ imageRendering: "pixelated" }}
      />
      {loading && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          aria-live="polite"
        >
          <div className="w-full h-px bg-cyan-500/30 animate-pulse" />
        </div>
      )}
    </div>
  );
}

export default TimelineWaveform;
