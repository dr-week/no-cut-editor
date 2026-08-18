import { describe, it, expect } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import { PropertiesPanel } from "./PropertiesPanel";

describe("PropertiesPanel Inspector Component", () => {
  it("renders Properties header and inspector badge", () => {
    render(<PropertiesPanel />);
    expect(screen.getByText("Properties")).toBeDefined();
    expect(screen.getByText("Inspector")).toBeDefined();
  });

  it("renders typography and transform parameter sections", () => {
    render(<PropertiesPanel />);
    expect(screen.getByText("Text Content")).toBeDefined();
    expect(screen.getByText("Font Size")).toBeDefined();
    expect(screen.getByText("Alignment")).toBeDefined();
  });
});
