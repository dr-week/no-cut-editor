import { describe, it, expect } from "vitest";
import { searchEditorCommands } from "./editorCommandRegistry";

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
});
