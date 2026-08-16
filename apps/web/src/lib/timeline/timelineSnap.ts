/**
 * Timeline Snap & Trim Engine
 *
 * Pure, framework-free module for:
 * - Magnetic snap-to-grid and snap-to-clip-edges
 * - Trim handle clamping with min-duration guards
 * - Ripple shift calculations (move all clips right of a point)
 * - Playhead snapping to nearest clip boundary
 *
 * All functions are deterministic and side-effect free — safe to test and reuse.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SnapClip {
  id: string;
  startTime: number;
  duration: number;
}

export interface SnapOptions {
  /** Grid interval in seconds (e.g. 0.5 for half-second grid). 0 = no grid snap. */
  gridInterval: number;
  /** Max distance in seconds within which a snap point is "magnetic". */
  magnetRadius: number;
  /** Whether to snap to clip start/end edges. */
  snapToClipEdges: boolean;
  /** Whether to snap to the grid. */
  snapToGrid: boolean;
}

export const DEFAULT_SNAP_OPTIONS: SnapOptions = {
  gridInterval: 0.5,
  magnetRadius: 0.15,
  snapToClipEdges: true,
  snapToGrid: true,
};

export interface SnapResult {
  /** Final snapped position in seconds. */
  snapped: number;
  /** True if any snap point was applied. */
  didSnap: boolean;
  /** The snap target that was applied (edge, grid, or none). */
  snapSource: "edge" | "grid" | "none";
}

// ---------------------------------------------------------------------------
// Snap point collection
// ---------------------------------------------------------------------------

/**
 * Collects all candidate snap points from clip edges and grid.
 */
export function collectSnapPoints(
  clips: SnapClip[],
  totalDuration: number,
  opts: SnapOptions
): number[] {
  const points = new Set<number>();

  // Always include timeline boundaries
  points.add(0);
  points.add(totalDuration);

  if (opts.snapToClipEdges) {
    for (const c of clips) {
      points.add(c.startTime);
      points.add(c.startTime + c.duration);
    }
  }

  if (opts.snapToGrid && opts.gridInterval > 0) {
    const steps = Math.ceil(totalDuration / opts.gridInterval);
    for (let i = 0; i <= steps; i++) {
      points.add(i * opts.gridInterval);
    }
  }

  return Array.from(points).sort((a, b) => a - b);
}

// ---------------------------------------------------------------------------
// Core snap resolver
// ---------------------------------------------------------------------------

/**
 * Resolves the best snap target for a raw position.
 * Returns original position if no snap point is within magnetRadius.
 */
export function snapPosition(
  rawSeconds: number,
  clips: SnapClip[],
  totalDuration: number,
  opts: SnapOptions = DEFAULT_SNAP_OPTIONS
): SnapResult {
  const snapPoints = collectSnapPoints(clips, totalDuration, opts);
  let closest: number | null = null;
  let minDist = Infinity;
  let snapSource: "edge" | "grid" | "none" = "none";

  for (const p of snapPoints) {
    const dist = Math.abs(rawSeconds - p);
    if (dist < minDist) {
      minDist = dist;
      closest = p;
    }
  }

  if (closest !== null && minDist <= opts.magnetRadius) {
    // Determine snap source type
    const isEdge = opts.snapToClipEdges && clips.some(
      (c) => Math.abs(c.startTime - closest!) < 1e-6 || Math.abs(c.startTime + c.duration - closest!) < 1e-6
    );
    snapSource = isEdge ? "edge" : "grid";
    return { snapped: Number(closest.toFixed(3)), didSnap: true, snapSource };
  }

  return { snapped: Number(rawSeconds.toFixed(3)), didSnap: false, snapSource: "none" };
}

// ---------------------------------------------------------------------------
// Trim engine
// ---------------------------------------------------------------------------

export interface TrimResult {
  startTime: number;
  duration: number;
  clamped: boolean;
}

/**
 * Clamps a trim operation — adjusting either the left (start) or right (end) handle.
 * Enforces minDuration and keeps the clip within [0, timelineDuration].
 */
export function trimClip(
  clip: SnapClip,
  handle: "left" | "right",
  newValueSeconds: number,
  timelineDuration: number,
  minDurationSeconds = 0.1
): TrimResult {
  let startTime = clip.startTime;
  let duration = clip.duration;
  let clamped = false;

  if (handle === "left") {
    // Moving left handle: adjust startTime and duration together
    const endTime = clip.startTime + clip.duration;
    let newStart = Math.max(0, Math.min(newValueSeconds, endTime - minDurationSeconds));
    if (newStart !== newValueSeconds) clamped = true;
    startTime = newStart;
    duration = endTime - newStart;
  } else {
    // Moving right handle: adjust duration only
    const endTime = Math.min(timelineDuration, Math.max(newValueSeconds, clip.startTime + minDurationSeconds));
    if (endTime !== newValueSeconds) clamped = true;
    duration = endTime - clip.startTime;
  }

  return {
    startTime: Number(startTime.toFixed(3)),
    duration: Number(duration.toFixed(3)),
    clamped,
  };
}

// ---------------------------------------------------------------------------
// Ripple shift
// ---------------------------------------------------------------------------

/**
 * Shifts all clips that start at or after `afterSeconds` by `deltaSeconds`.
 * Used for ripple insert/delete operations.
 * Returns new clip array with updated startTimes.
 */
export function rippleShift(
  clips: SnapClip[],
  afterSeconds: number,
  deltaSeconds: number,
  minStart = 0
): SnapClip[] {
  return clips.map((c) => {
    if (c.startTime >= afterSeconds) {
      const newStart = Math.max(minStart, c.startTime + deltaSeconds);
      return { ...c, startTime: Number(newStart.toFixed(3)) };
    }
    return c;
  });
}

// ---------------------------------------------------------------------------
// Playhead snap
// ---------------------------------------------------------------------------

/**
 * Snaps the playhead to the nearest clip boundary or grid point.
 * Returns the clamped playhead position.
 */
export function snapPlayhead(
  rawSeconds: number,
  clips: SnapClip[],
  totalDuration: number,
  opts: SnapOptions = DEFAULT_SNAP_OPTIONS
): number {
  const clamped = Math.max(0, Math.min(rawSeconds, totalDuration));
  const result = snapPosition(clamped, clips, totalDuration, opts);
  return result.snapped;
}
