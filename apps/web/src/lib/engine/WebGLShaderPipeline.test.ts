import { describe, it, expect } from "vitest";
import { WebGLShaderPipeline } from "./WebGLShaderPipeline";

describe("WebGLShaderPipeline GPU Architecture", () => {
  it("initializes and safely tears down resources", () => {
    // In test environment with jsdom, canvas.getContext('webgl2') returns null gracefully
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 360;

    const pipeline = new WebGLShaderPipeline(canvas);
    expect(pipeline).toBeDefined();

    pipeline.destroy();
  });
});
