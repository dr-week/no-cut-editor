import { describe, it, expect } from "vitest";
import {
  calculateAspectCropDimensions,
  computeSafeCropWindow,
  smoothTrackingTrajectory,
  computeGroupBoundingBox,
  type BoundingBox,
} from "./smartReframeEngine";

describe("Smart Reframe & Subject Tracking Engine", () => {
  it("calculates 9:16 vertical crop from 16:9 1080p source", () => {
    // 1920x1080 -> 9:16 target -> height is 1080, width is 1080 * (9/16) = 607.5 ≈ 608
    const { cropWidth, cropHeight } = calculateAspectCropDimensions(1920, 1080, "9:16");
    expect(cropHeight).toBe(1080);
    expect(cropWidth).toBe(608);
  });

  it("calculates 1:1 square crop from 1920x1080 source", () => {
    const { cropWidth, cropHeight } = calculateAspectCropDimensions(1920, 1080, "1:1");
    expect(cropHeight).toBe(1080);
    expect(cropWidth).toBe(1080);
  });

  it("clamps crop window safely inside boundaries when subject is on far left/right edges", () => {
    // Center of focus at extreme left (0.0)
    const leftCrop = computeSafeCropWindow(1920, 1080, 608, 1080, 0.0);
    expect(leftCrop.cropX).toBe(0);
    expect(leftCrop.cropWidth).toBe(608);

    // Center of focus at extreme right (1.0)
    const rightCrop = computeSafeCropWindow(1920, 1080, 608, 1080, 1.0);
    expect(rightCrop.cropX).toBe(1920 - 608); // 1312
    expect(rightCrop.cropX + rightCrop.cropWidth).toBe(1920);
  });

  it("smooths trajectory points using exponential filter", () => {
    const raw = [
      { time: 0, x: 0.5, y: 0.5 },
      { time: 1, x: 0.9, y: 0.5 }, // Sudden jump
      { time: 2, x: 0.9, y: 0.5 },
    ];
    const smoothed = smoothTrackingTrajectory(raw, 0.5);
    expect(smoothed).toHaveLength(3);
    expect(smoothed[0].x).toBe(0.5);
    // At step 1, smoothed value should lerp: 0.5 + 0.5 * (0.9 - 0.5) = 0.7
    expect(smoothed[1].x).toBe(0.7);
    // At step 2, 0.7 + 0.5 * (0.9 - 0.7) = 0.8
    expect(smoothed[2].x).toBe(0.8);
  });

  it("computes group bounding box enclosing multiple detected faces", () => {
    const faces: BoundingBox[] = [
      { x: 0.2, y: 0.3, width: 0.1, height: 0.2 },
      { x: 0.6, y: 0.4, width: 0.15, height: 0.2 },
    ];
    const group = computeGroupBoundingBox(faces);
    expect(group).not.toBeNull();
    expect(group?.x).toBe(0.2);
    expect(group?.y).toBe(0.3);
    expect(group?.width).toBe(0.55); // 0.75 - 0.2 = 0.55
  });
});
