/**
 * @file AssetCacheManager.ts
 * @description Bounded LRU Asset Cache Manager.
 * Prevents memory leaks by keeping raw media blobs, ImageBitmaps, and waveforms
 * out of React state and Command history closures.
 * @module apps/web/src/lib/engine/AssetCacheManager
 */

export class AssetCacheManager {
  private static cache = new Map<string, Blob | ImageBitmap | ArrayBuffer>();
  private static MAX_CACHE_SIZE = 50;

  /**
   * Caches an asset with deterministic LRU eviction.
   */
  public static cacheAsset(id: string, asset: Blob | ImageBitmap | ArrayBuffer) {
    if (this.cache.has(id)) {
      this.cache.delete(id);
    } else if (this.cache.size >= this.MAX_CACHE_SIZE) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        const evicted = this.cache.get(firstKey);
        // Close ImageBitmap if supported
        if (typeof ImageBitmap !== "undefined" && evicted instanceof ImageBitmap) {
          evicted.close();
        }
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(id, asset);
  }

  public static get(id: string): Blob | ImageBitmap | ArrayBuffer | undefined {
    if (!this.cache.has(id)) return undefined;
    // Refresh LRU order on access
    const item = this.cache.get(id)!;
    this.cache.delete(id);
    this.cache.set(id, item);
    return item;
  }

  public static has(id: string): boolean {
    return this.cache.has(id);
  }

  public static remove(id: string) {
    const item = this.cache.get(id);
    if (typeof ImageBitmap !== "undefined" && item instanceof ImageBitmap) {
      item.close();
    }
    this.cache.delete(id);
  }

  public static clear() {
    for (const item of this.cache.values()) {
      if (typeof ImageBitmap !== "undefined" && item instanceof ImageBitmap) {
        item.close();
      }
    }
    this.cache.clear();
  }

  public static size(): number {
    return this.cache.size;
  }
}
