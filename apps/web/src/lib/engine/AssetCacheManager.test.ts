import { describe, it, expect, beforeEach } from "vitest";
import { AssetCacheManager } from "./AssetCacheManager";

describe("AssetCacheManager LRU Bounded Memory", () => {
  beforeEach(() => {
    AssetCacheManager.clear();
  });

  it("caches blobs and respects LRU eviction limit", () => {
    const dummyBlob1 = new Blob(["test1"], { type: "text/plain" });
    const dummyBlob2 = new Blob(["test2"], { type: "text/plain" });

    AssetCacheManager.cacheAsset("asset1", dummyBlob1);
    AssetCacheManager.cacheAsset("asset2", dummyBlob2);

    expect(AssetCacheManager.has("asset1")).toBe(true);
    expect(AssetCacheManager.has("asset2")).toBe(true);
    expect(AssetCacheManager.size()).toBe(2);

    const retrieved = AssetCacheManager.get("asset1");
    expect(retrieved).toBe(dummyBlob1);
  });

  it("clears cached assets and releases memory handles", () => {
    const blob = new Blob(["data"], { type: "text/plain" });
    AssetCacheManager.cacheAsset("key", blob);
    expect(AssetCacheManager.size()).toBe(1);

    AssetCacheManager.clear();
    expect(AssetCacheManager.size()).toBe(0);
    expect(AssetCacheManager.get("key")).toBeUndefined();
  });
});
