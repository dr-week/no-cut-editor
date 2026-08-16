import { describe, it, expect } from "vitest";
import { EDITOR_PRESET_CATALOG } from "../presets/editorPresetCatalog";

function searchPresetCatalog(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return EDITOR_PRESET_CATALOG;

  return EDITOR_PRESET_CATALOG.filter((item) => {
    const haystack = `${item.label} ${item.category} ${item.keywords}`.toLowerCase();
    return haystack.includes(q);
  });
}

describe("editor preset catalog", () => {
  it("finds animation presets by label and category", () => {
    const results = searchPresetCatalog("cinematic");
    expect(results.some((item) => item.label.toLowerCase().includes("cinematic"))).toBe(true);
  });

  it("finds LUT presets by keyword", () => {
    const results = searchPresetCatalog("teal orange");
    expect(results.some((item) => item.category.toLowerCase() === "color")).toBe(true);
  });

  it("returns all presets for an empty query", () => {
    expect(searchPresetCatalog("").length).toBeGreaterThan(0);
  });
});
