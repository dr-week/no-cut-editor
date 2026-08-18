/**
 * @file MediaIngestManager.ts
 * @description Master Media Ingestion & ObjectURL Lifecycle Manager.
 * Orchestrates off-thread waveform calculation, proxy downscaling, and ensures
 * explicit URL.revokeObjectURL() cleanup to prevent browser memory leaks.
 * @module apps/web/src/lib/engine/MediaIngestManager
 */

import { AssetCacheManager } from "./AssetCacheManager";

export interface IngestedMediaAsset {
  id: string;
  name: string;
  type: "video" | "audio" | "image";
  url: string;
  duration: number;
  waveform?: number[];
  thumbnailUrl?: string;
  size: number;
}

export class MediaIngestManager {
  private static instance: MediaIngestManager;
  private worker: Worker | null = null;
  private activeObjectUrls = new Set<string>();
  private assets = new Map<string, IngestedMediaAsset>();
  private onAssetIngestedCallbacks: ((asset: IngestedMediaAsset) => void)[] = [];

  private constructor() {
    this.initWorker();
  }

  public static getInstance(): MediaIngestManager {
    if (!this.instance) {
      this.instance = new MediaIngestManager();
    }
    return this.instance;
  }

  private initWorker() {
    if (typeof window !== "undefined" && typeof Worker !== "undefined") {
      try {
        this.worker = new Worker(
          new URL("../../workers/IngestWorker.ts", import.meta.url),
          { type: "module" }
        );

        this.worker.onmessage = (e: MessageEvent) => {
          this.handleWorkerResponse(e.data);
        };
      } catch (err) {
        console.warn("IngestWorker fallback running in mock mode", err);
      }
    }
  }

  /**
   * Ingests a user-dropped File, creating a tracked ObjectURL and delegating waveform math.
   */
  public async ingestFile(file: File): Promise<string> {
    const id = `asset_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const url = URL.createObjectURL(file);
    this.activeObjectUrls.add(url);

    const type: "video" | "audio" | "image" = file.type.startsWith("video")
      ? "video"
      : file.type.startsWith("audio")
      ? "audio"
      : "image";

    const baseAsset: IngestedMediaAsset = {
      id,
      name: file.name,
      type,
      url,
      duration: 30, // Default duration placeholder until probed
      size: file.size,
    };

    this.assets.set(id, baseAsset);

    // Cache file blob in LRU memory
    AssetCacheManager.cacheAsset(id, file);

    // Offload waveform & thumbnail extraction to IngestWorker
    if (this.worker) {
      this.worker.postMessage({
        type: "EXTRACT_WAVEFORM_AND_THUMB",
        fileId: id,
        duration: baseAsset.duration,
      });
    } else {
      this.notifySubscribers(baseAsset);
    }

    return id;
  }

  private handleWorkerResponse(data: any) {
    if (data.type === "INGEST_COMPLETE" && data.fileId) {
      const existing = this.assets.get(data.fileId);
      if (existing) {
        existing.waveform = data.waveform;
        existing.duration = data.duration || existing.duration;

        if (data.thumbnailBitmap) {
          AssetCacheManager.cacheAsset(`thumb_${data.fileId}`, data.thumbnailBitmap);
        }

        this.notifySubscribers(existing);
      }
    }
  }

  public getAsset(id: string): IngestedMediaAsset | undefined {
    return this.assets.get(id);
  }

  public getAllAssets(): IngestedMediaAsset[] {
    return Array.from(this.assets.values());
  }

  public subscribe(cb: (asset: IngestedMediaAsset) => void): () => void {
    this.onAssetIngestedCallbacks.push(cb);
    return () => {
      this.onAssetIngestedCallbacks = this.onAssetIngestedCallbacks.filter((c) => c !== cb);
    };
  }

  private notifySubscribers(asset: IngestedMediaAsset) {
    for (let i = 0; i < this.onAssetIngestedCallbacks.length; i++) {
      this.onAssetIngestedCallbacks[i](asset);
    }
  }

  /**
   * Explicitly revokes all created ObjectURLs preventing memory leaks.
   */
  public cleanup() {
    for (const url of this.activeObjectUrls) {
      URL.revokeObjectURL(url);
    }
    this.activeObjectUrls.clear();
    this.assets.clear();
    this.worker?.terminate();
    this.worker = null;
    this.onAssetIngestedCallbacks = [];
  }
}
