/**
 * Smart Reframe & Subject Tracking Math Engine
 *
 * Lightweight, zero-external-dependency module for:
 * - Dynamic aspect ratio crop window calculation (16:9 -> 9:16, 1:1, 4:5)
 * - Subject bounding box centering with smoothing (exponential moving average / lerp)
 * - Safe margin clamping to prevent cropping outside video bounds
 * - Multi-subject group bounding box estimation
 */

export interface BoundingBox {
  x: number;      // normalized 0.0 - 1.0 (left)
  y: number;      // normalized 0.0 - 1.0 (top)
  width: number;  // normalized 0.0 - 1.0
  height: number; // normalized 0.0 - 1.0
}

export interface CropWindow {
  cropX: number;       // pixel or normalized offset
  cropY: number;
  cropWidth: number;
  cropHeight: number;
  scaleFactor: number;
}

export interface ReframeKeyframe {
  timeSeconds: number;
  centerX: number; // normalized center of focus (0.0 - 1.0)
  centerY: number;
}

/**
 * Calculates optimal crop dimensions to convert from source aspect ratio to target aspect ratio.
 */
export function calculateAspectCropDimensions(
  sourceWidth: number,
  sourceHeight: number,
  targetAspect: "9:16" | "16:9" | "1:1" | "4:5"
): { cropWidth: number; cropHeight: number } {
  if (sourceWidth <= 0 || sourceHeight <= 0) {
    return { cropWidth: 0, cropHeight: 0 };
  }

  const aspectRatios: Record<string, number> = {
    "9:16": 9 / 16,
    "16:9": 16 / 9,
    "1:1": 1,
    "4:5": 4 / 5,
  };

  const targetRatio = aspectRatios[targetAspect] ?? (16 / 9);
  const sourceRatio = sourceWidth / sourceHeight;

  let cropWidth = sourceWidth;
  let cropHeight = sourceHeight;

  if (sourceRatio > targetRatio) {
    // Source is wider than target -> crop sides (height matches)
    cropWidth = Math.round(sourceHeight * targetRatio);
    cropHeight = sourceHeight;
  } else {
    // Source is taller than target -> crop top/bottom (width matches)
    cropWidth = sourceWidth;
    cropHeight = Math.round(sourceWidth / targetRatio);
  }

  return {
    cropWidth: Math.min(sourceWidth, Math.max(1, cropWidth)),
    cropHeight: Math.min(sourceHeight, Math.max(1, cropHeight)),
  };
}

/**
 * Clamps center of interest so crop window remains strictly within source image dimensions.
 */
export function computeSafeCropWindow(
  sourceWidth: number,
  sourceHeight: number,
  cropWidth: number,
  cropHeight: number,
  focusCenterX: number, // normalized 0.0 - 1.0
  focusCenterY = 0.5    // normalized 0.0 - 1.0
): CropWindow {
  const pixelCenterX = focusCenterX * sourceWidth;
  const pixelCenterY = focusCenterY * sourceHeight;

  const halfW = cropWidth / 2;
  const halfH = cropHeight / 2;

  // Clamp cropX so [cropX, cropX + cropWidth] is within [0, sourceWidth]
  let cropX = pixelCenterX - halfW;
  cropX = Math.max(0, Math.min(sourceWidth - cropWidth, cropX));

  // Clamp cropY so [cropY, cropY + cropHeight] is within [0, sourceHeight]
  let cropY = pixelCenterY - halfH;
  cropY = Math.max(0, Math.min(sourceHeight - cropHeight, cropY));

  return {
    cropX: Math.round(cropX),
    cropY: Math.round(cropY),
    cropWidth,
    cropHeight,
    scaleFactor: sourceHeight > 0 ? Number((cropHeight / sourceHeight).toFixed(3)) : 1,
  };
}

/**
 * Applies exponential smoothing (lerp) to subject tracking trajectory to avoid jitter.
 */
export function smoothTrackingTrajectory(
  rawPoints: { time: number; x: number; y: number }[],
  smoothingFactor = 0.25 // 0.0 = ultra-smooth/laggy, 1.0 = instant/jittery
): { time: number; x: number; y: number }[] {
  if (!rawPoints.length) return [];

  const smoothed: { time: number; x: number; y: number }[] = [];
  let currentX = rawPoints[0].x;
  let currentY = rawPoints[0].y;

  for (const pt of rawPoints) {
    currentX = currentX + smoothingFactor * (pt.x - currentX);
    currentY = currentY + smoothingFactor * (pt.y - currentY);
    smoothed.push({
      time: pt.time,
      x: Number(currentX.toFixed(4)),
      y: Number(currentY.toFixed(4)),
    });
  }

  return smoothed;
}

/**
 * Computes bounding box enclosing multiple detected subjects/faces.
 */
export function computeGroupBoundingBox(boxes: BoundingBox[]): BoundingBox | null {
  if (!boxes.length) return null;

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const b of boxes) {
    minX = Math.min(minX, b.x);
    minY = Math.min(minY, b.y);
    maxX = Math.max(maxX, b.x + b.width);
    maxY = Math.max(maxY, b.y + b.height);
  }

  return {
    x: Number(minX.toFixed(4)),
    y: Number(minY.toFixed(4)),
    width: Number((maxX - minX).toFixed(4)),
    height: Number((maxY - minY).toFixed(4)),
  };
}
