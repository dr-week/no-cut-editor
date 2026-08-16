import { describe, expect, it } from "vitest";
import { getEditorShortcutRegistry, searchEditorShortcuts } from "./editorShortcuts";

describe("editor shortcut registry", () => {
  it("returns the shortcut registry with built-in timeline and transport actions", () => {
    const shortcuts = getEditorShortcutRegistry();

    expect(shortcuts.some((item) => item.id === "split-clip")).toBe(true);
    expect(shortcuts.some((item) => item.id === "play-pause")).toBe(true);
    expect(shortcuts.some((item) => item.id === "command-search")).toBe(true);
  });

  it("supports keyword search across labels, descriptions, and categories", () => {
    const timelineResults = searchEditorShortcuts("timeline");
    const markResults = searchEditorShortcuts("in point");

    expect(timelineResults.some((item) => item.id === "split-clip")).toBe(true);
    expect(markResults.some((item) => item.id === "mark-in")).toBe(true);
  });

  it("returns an empty array when no shortcuts match", () => {
    expect(searchEditorShortcuts("zzzz-no-shortcut-match")).toEqual([]);
  });
});
