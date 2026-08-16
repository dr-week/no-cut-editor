export type ExportFormat = "webm" | "mp4";
export type ExportQuality = "high" | "medium" | "low";

export interface ExportOptions {
  format: ExportFormat;
  width: number;
  height: number;
  fps: number;
  quality: ExportQuality;
  /** Millisecond duration to record. */
  durationMs: number;
  bitrateMbps?: number;
}

const QUALITY_BITRATE: Record<ExportQuality, number> = { high: 12, medium: 6, low: 2.5 };

/** Pure helper — picks the highest-available MediaRecorder mime type for a format. */
export function resolveMimeType(format: ExportFormat): string {
  if (typeof MediaRecorder === "undefined") return "";
  const candidates =
    format === "mp4"
      ? ["video/mp4;codecs=avc1.42E01E,mp4a.40.2", "video/mp4", "video/webm;codecs=h264,opus"]
      : ["video/webm;codecs=vp9,opus", "video/webm;codecs=vp8,opus", "video/webm"];
  return candidates.find((m) => typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(m)) ?? "";
}

export function resolveBitrate(options: ExportOptions): number {
  return Math.round((options.bitrateMbps ?? QUALITY_BITRATE[options.quality]) * 1_000_000);
}

/** Pure helper — rough file-size estimate from duration and bitrate. */
export function estimateFileSizeKb(durationMs: number, bitrateMbps: number): number {
  return Math.round((durationMs / 1000) * bitrateMbps * 1_000_000 / 8 / 1024);
}

/** Pure helper — predictable download filename. */
export function buildExportFilename(base: string, format: ExportFormat): string {
  const safe = base.trim()
    .replace(/[^\w\d\- ]+/g, "_")
    .replace(/\s+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 48) || "opencut_export";
  return `${safe}.${format}`;
}

export interface ExportResult {
  blob: Blob;
  durationMs: number;
  mimeType: string;
  estimatedKb: number;
}

export interface ExportRecorderController {
  promise: Promise<ExportResult>;
  cancel: () => void;
}

/**
 * Records a Konva/canvas stage via `captureStream` + `MediaRecorder`.
 * The stage should already be drawing on each rAF tick; we just capture the stream.
 */
export function exportCanvas(
  canvas: HTMLCanvasElement,
  options: ExportOptions
): ExportRecorderController {
  const mimeType = resolveMimeType(options.format);
  if (typeof MediaRecorder === "undefined" || !mimeType) {
    throw new Error("MediaRecorder unsupported in this environment");
  }

  const stream = canvas.captureStream(options.fps);
  const recorder = new MediaRecorder(stream, {
    mimeType,
    videoBitsPerSecond: resolveBitrate(options)
  });
  const chunks: Blob[] = [];

  recorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) chunks.push(e.data);
  };

  const promise = new Promise<ExportResult>((resolve, reject) => {
    recorder.onerror = () => reject(new Error("MediaRecorder error during export"));
    recorder.onstop = () => {
      stream.getTracks().forEach((t) => t.stop());
      const blob = new Blob(chunks, { type: mimeType });
      resolve({
        blob,
        durationMs: options.durationMs,
        mimeType,
        estimatedKb: estimateFileSizeKb(options.durationMs, resolveBitrate(options) / 1_000_000)
      });
    };
  });

  recorder.start(250);
  window.setTimeout(() => {
    if (recorder.state !== "inactive") recorder.stop();
  }, options.durationMs);

  return {
    promise,
    cancel: () => {
      if (recorder.state !== "inactive") recorder.stop();
    }
  };
}

/** Pure helper — triggers a browser download for a Blob. */
export function downloadBlob(blob: Blob, filename: string): void {
  if (typeof document === "undefined") return;
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
}
