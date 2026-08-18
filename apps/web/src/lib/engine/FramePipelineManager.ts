/**
 * @file FramePipelineManager.ts
 * @description Master Video Decoder Pipeline with Sequence-ID Cancellation & Backpressure.
 * Combines Option A (Sequence-ID filtering) + Option C (Idle Backpressure Pipe)
 * to eliminate frame lag spirals during fast 60fps playhead scrubbing.
 * @module apps/web/src/lib/engine/FramePipelineManager
 */

import { AssetCacheManager } from "./AssetCacheManager";

export interface DecodedFrameResult {
  sequenceId: number;
  timestamp: number;
  bitmap: ImageBitmap;
}

export class FramePipelineManager {
  private static instance: FramePipelineManager;
  private worker: Worker | null = null;
  private currentSequenceId = 0;
  private isWorkerBusy = false;
  private pendingRequest: { sequenceId: number; timestamp: number } | null = null;
  private onFrameCallbacks: ((frame: DecodedFrameResult) => void)[] = [];

  private constructor() {
    this.initWorker();
  }

  public static getInstance(): FramePipelineManager {
    if (!this.instance) {
      this.instance = new FramePipelineManager();
    }
    return this.instance;
  }

  private initWorker() {
    if (typeof window !== "undefined" && typeof Worker !== "undefined") {
      try {
        this.worker = new Worker(
          new URL("../../workers/DecoderWorker.ts", import.meta.url),
          { type: "module" }
        );

        this.worker.onmessage = (e: MessageEvent) => {
          this.handleWorkerMessage(e.data);
        };
      } catch (err) {
        console.warn("DecoderWorker fallback: running in mock worker mode", err);
      }
    }
  }

  /**
   * Dispatches a frame decode request with Sequence-ID stamping.
   */
  public requestFrame(timestamp: number) {
    this.currentSequenceId++;
    const sequenceId = this.currentSequenceId;

    // Check fast cache first
    const cached = AssetCacheManager.get(`frame_${timestamp.toFixed(2)}`);
    if (cached && typeof ImageBitmap !== "undefined" && cached instanceof ImageBitmap) {
      this.notifySubscribers({ sequenceId, timestamp, bitmap: cached });
      return;
    }

    if (!this.worker) return;

    // Backpressure handling: if worker is busy, save as pending request
    if (this.isWorkerBusy) {
      this.pendingRequest = { sequenceId, timestamp };
      return;
    }

    this.isWorkerBusy = true;
    this.worker.postMessage({
      type: "DECODE_FRAME",
      sequenceId,
      timestamp,
    });
  }

  private refCounts = new Map<string, number>();

  private handleWorkerMessage(data: any) {
    this.isWorkerBusy = false;

    if (data.type === "FRAME_DECODED" && data.bitmap) {
      const frameKey = `frame_${data.timestamp?.toFixed(2)}`;
      
      // Manage Texture Reference Count (Issue #10 Fix)
      const currentRefs = this.refCounts.get(frameKey) || 0;
      this.refCounts.set(frameKey, currentRefs + 1);

      // Stash in LRU cache
      AssetCacheManager.cacheAsset(frameKey, data.bitmap);

      // Only emit if it matches or exceeds our latest sequence expectation
      if (data.sequenceId >= this.currentSequenceId - 2) {
        this.notifySubscribers(data);
      }
    }

    // Drain pending request if user scrubbed while worker was busy
    if (this.pendingRequest) {
      const next = this.pendingRequest;
      this.pendingRequest = null;
      this.isWorkerBusy = true;
      this.worker?.postMessage({
        type: "DECODE_FRAME",
        sequenceId: next.sequenceId,
        timestamp: next.timestamp,
      });
    }
  }

  /**
   * Decrements reference count and closes ImageBitmap when count hits 0.
   */
  public releaseFrame(timestamp: number) {
    const frameKey = `frame_${timestamp.toFixed(2)}`;
    const count = (this.refCounts.get(frameKey) || 1) - 1;
    if (count <= 0) {
      this.refCounts.delete(frameKey);
      AssetCacheManager.remove(frameKey);
    } else {
      this.refCounts.set(frameKey, count);
    }
  }

  public subscribe(cb: (frame: DecodedFrameResult) => void): () => void {
    this.onFrameCallbacks.push(cb);
    return () => {
      this.onFrameCallbacks = this.onFrameCallbacks.filter((c) => c !== cb);
    };
  }

  private notifySubscribers(frame: DecodedFrameResult) {
    for (let i = 0; i < this.onFrameCallbacks.length; i++) {
      this.onFrameCallbacks[i](frame);
    }
  }

  public destroy() {
    this.worker?.terminate();
    this.worker = null;
    this.onFrameCallbacks = [];
    this.refCounts.clear();
  }
}
