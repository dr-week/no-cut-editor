import { describe, it, expect } from "vitest";
import {
  EDITOR_PRESET_CATALOG,
  searchPresetCatalog,
  getPresetsByKind,
  getPresetsByCategory,
} from "../presets/editorPresetCatalog";

describe("editor preset catalog", () => {
  it("contains a rich preset catalog and valid metadata", () => {
    expect(EDITOR_PRESET_CATALOG.length).toBeGreaterThan(20);
    for (const item of EDITOR_PRESET_CATALOG) {
      expect(item.id).toBeTruthy();
      expect(item.label).toBeTruthy();
      expect(item.category).toBeTruthy();
      expect(item.keywords).toBeTruthy();
      expect(["animation", "transition", "lut", "template", "effect"]).toContain(item.kind);
    }
  });

  it("finds animation presets by label", () => {
    const results = searchPresetCatalog("cinematic");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((item) => item.label.toLowerCase().includes("cinematic"))).toBe(true);
  });

  it("finds LUT presets by keyword", () => {
    const results = searchPresetCatalog("teal orange");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((item) => item.kind === "lut")).toBe(true);
  });

  it("finds effect presets by keyword", () => {
    const results = searchPresetCatalog("blur");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((item) => item.kind === "effect")).toBe(true);
  });

  it("returns all presets for an empty query", () => {
    expect(searchPresetCatalog("").length).toBe(EDITOR_PRESET_CATALOG.length);
  });

  it("filters presets by kind", () => {
    const animations = getPresetsByKind("animation");
    expect(animations.length).toBeGreaterThan(0);
    expect(animations.every((item) => item.kind === "animation")).toBe(true);
  });

  it("filters presets by category case-insensitively", () => {
    const animationResults = getPresetsByCategory("Animation");
    const lowerResults = getPresetsByCategory("animation");
    expect(animationResults.length).toBe(lowerResults.length);
    expect(animationResults.every((item) => item.category.toLowerCase() === "animation")).toBe(true);
  });

  it("returns empty results for unmatched queries", () => {
    expect(searchPresetCatalog("this-query-should-not-exist")).toHaveLength(0);
  });

  it("includes Wave 5 kinetic and cinematic animation presets", () => {
    const warp = searchPresetCatalog("hyper warp punch");
    const glitch = searchPresetCatalog("glitch chroma shift");
    const snap = searchPresetCatalog("magnetic snap title");
    expect(warp.length).toBeGreaterThan(0);
    expect(glitch.length).toBeGreaterThan(0);
    expect(snap.length).toBeGreaterThan(0);
  });

  it("dynamically indexes all transitions, effects, and LUTs from modules", () => {
    const transitions = getPresetsByKind("transition");
    const effects = getPresetsByKind("effect");
    const luts = getPresetsByKind("lut");
    const templates = getPresetsByKind("template");

    expect(transitions.length).toBeGreaterThan(10);
    expect(effects.length).toBeGreaterThan(10);
    expect(luts.length).toBeGreaterThan(5);
    expect(templates.length).toBeGreaterThan(5);
  });

  it("finds presets across diverse categories and keywords", () => {
    const vhs = searchPresetCatalog("vhs");
    const velvia = searchPresetCatalog("velvia");
    const gaming = searchPresetCatalog("gaming");
    const capcut = searchPresetCatalog("capcut");

    expect(vhs.length).toBeGreaterThan(0);
    expect(velvia.length).toBeGreaterThan(0);
    expect(gaming.length).toBeGreaterThan(0);
    expect(capcut.length).toBeGreaterThan(0);
  });
});

