import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import { EditorHeader } from "./EditorHeader";

describe("EditorHeader Component", () => {
  it("renders brand logo, project title, and 4K resolution badge", () => {
    render(<EditorHeader />);
    expect(screen.getByText("OPENCUT")).toBeDefined();
    expect(screen.getByText("Untitled Project_01")).toBeDefined();
    expect(screen.getByText("4K 60fps")).toBeDefined();
  });

  it("renders export video and shortcuts action buttons", () => {
    render(<EditorHeader />);
    expect(screen.getByText("Export Video")).toBeDefined();
    expect(screen.getByText("Shortcuts")).toBeDefined();
  });
});
