import { describe, it, expect } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import { TimelineToolbar } from "./TimelineToolbar";

describe("TimelineToolbar Component", () => {
  it("renders Razor Cut, Selection tool, and Snapping buttons", () => {
    render(
      <TimelineToolbar 
        zoomLevel={100} 
        setZoomLevel={() => {}} 
        isMagnetActive={true} 
        setIsMagnetActive={() => {}} 
      />
    );
    expect(screen.getByText("Razor Cut (C)")).toBeDefined();
    expect(screen.getByText("Select (V)")).toBeDefined();
    expect(screen.getByText("Snapping")).toBeDefined();
  });
});
