import { describe, it, expect } from "vitest";
import { searchEditorCommands, executeEditorCommand } from "./editorCommandRegistry";

describe("editor command registry", () => {
  it("matches relevant commands by label and keyword", () => {
    const results = searchEditorCommands("focus");
    expect(results.some((cmd) => cmd.label.toLowerCase().includes("focus"))).toBe(true);
  });

  it("finds animation and preset actions by keyword", () => {
    const results = searchEditorCommands("glitch");
    expect(results.some((cmd) => cmd.keywords.toLowerCase().includes("glitch"))).toBe(true);
  });

  it("returns empty results for a query with no matches", () => {
    expect(searchEditorCommands("zzzz-no-match")).toEqual([]);
  });

  it("finds timeline zoom and in/out mark commands", () => {
    const zoomIn = searchEditorCommands("zoom in");
    const markIn = searchEditorCommands("mark in");
    const vocal = searchEditorCommands("vocal enhancer");
    expect(zoomIn.some((c) => c.id === "zoom-in-timeline")).toBe(true);
    expect(markIn.some((c) => c.id === "mark-in-point")).toBe(true);
    expect(vocal.some((c) => c.id === "toggle-vocal-enhancer")).toBe(true);
  });
  it("executes registered commands via executeEditorCommand", () => {
    let playToggled = false;
    let splitCalled = false;
    let tabSet = "";
    let notice = "";

    const mockStore = {
      togglePlay: () => { playToggled = true; },
      splitClip: () => { splitCalled = true; },
      setActiveTab: (t: string) => { tabSet = t; },
      triggerNotice: (msg: string) => { notice = msg; },
    };

    expect(executeEditorCommand("play-pause", mockStore)).toBe(true);
    expect(playToggled).toBe(true);

    expect(executeEditorCommand("split-clip", mockStore)).toBe(true);
    expect(splitCalled).toBe(true);

    expect(executeEditorCommand("export-video", mockStore)).toBe(true);
    expect(tabSet).toBe("export");
    expect(notice).toContain("Export");

    expect(executeEditorCommand("non-existent-cmd", mockStore)).toBe(false);
  });
});

