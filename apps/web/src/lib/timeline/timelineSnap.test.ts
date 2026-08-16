import { describe, it, expect } from "vitest";
import {
  snapPosition,
  trimClip,
  rippleShift,
  snapPlayhead,
  collectSnapPoints,
  DEFAULT_SNAP_OPTIONS,
  type SnapClip,
} from "./timelineSnap";

const clips: SnapClip[] = [
  { id: "a", startTime: 0, duration: 5 },
  { id: "b", startTime: 6, duration: 4 },
  { id: "c", startTime: 12, duration: 3 },
];

const TOTAL = 20;

// ---------------------------------------------------------------------------
// collectSnapPoints
// ---------------------------------------------------------------------------
describe("collectSnapPoints", () => {
  it("always includes timeline boundaries 0 and totalDuration", () => {
    const pts = collectSnapPoints([], TOTAL, DEFAULT_SNAP_OPTIONS);
    expect(pts).toContain(0);
    expect(pts).toContain(TOTAL);
  });

  it("includes clip start and end edges", () => {
    const pts = collectSnapPoints(clips, TOTAL, DEFAULT_SNAP_OPTIONS);
    expect(pts).toContain(0);    // clip a start
    expect(pts).toContain(5);    // clip a end
    expect(pts).toContain(6);    // clip b start
    expect(pts).toContain(10);   // clip b end
    expect(pts).toContain(12);   // clip c start
    expect(pts).toContain(15);   // clip c end
  });

  it("includes grid points when grid is enabled", () => {
    const opts = { ...DEFAULT_SNAP_OPTIONS, gridInterval: 1 };
    const pts = collectSnapPoints([], 5, opts);
    expect(pts).toContain(1);
    expect(pts).toContain(2);
    expect(pts).toContain(3);
  });

  it("returns sorted unique values", () => {
    const pts = collectSnapPoints(clips, TOTAL, DEFAULT_SNAP_OPTIONS);
    for (let i = 1; i < pts.length; i++) {
      expect(pts[i]).toBeGreaterThan(pts[i - 1]);
    }
  });
});

// ---------------------------------------------------------------------------
// snapPosition
// ---------------------------------------------------------------------------
describe("snapPosition", () => {
  it("snaps to clip edge within magnetRadius", () => {
    const result = snapPosition(5.08, clips, TOTAL, DEFAULT_SNAP_OPTIONS);
    expect(result.didSnap).toBe(true);
    expect(result.snapped).toBe(5);
    expect(result.snapSource).toBe("edge");
  });

  it("does NOT snap when beyond magnetRadius", () => {
    // 5.3 is 0.3s from clip edge at 5 (beyond magnetRadius of 0.15)
    // and 0.3s from grid at 5.5 (beyond magnetRadius of 0.15)
    const result = snapPosition(5.3, clips, TOTAL, DEFAULT_SNAP_OPTIONS);
    expect(result.didSnap).toBe(false);
    expect(result.snapped).toBe(5.3);
    expect(result.snapSource).toBe("none");
  });

  it("snaps to grid when no edge is nearby", () => {
    const opts = { ...DEFAULT_SNAP_OPTIONS, snapToClipEdges: false, gridInterval: 1, magnetRadius: 0.2 };
    const result = snapPosition(3.05, [], TOTAL, opts);
    expect(result.didSnap).toBe(true);
    expect(result.snapped).toBe(3);
    expect(result.snapSource).toBe("grid");
  });

  it("snaps to position 0 at timeline start", () => {
    const result = snapPosition(0.05, [], TOTAL, DEFAULT_SNAP_OPTIONS);
    expect(result.snapped).toBe(0);
    expect(result.didSnap).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// trimClip
// ---------------------------------------------------------------------------
describe("trimClip", () => {
  const clip: SnapClip = { id: "x", startTime: 2, duration: 4 }; // 2s → 6s

  it("left trim: moves start forward, reduces duration", () => {
    const r = trimClip(clip, "left", 3, TOTAL);
    expect(r.startTime).toBe(3);
    expect(r.duration).toBe(3);
    expect(r.clamped).toBe(false);
  });

  it("left trim: clamps to prevent negative start", () => {
    const r = trimClip(clip, "left", -1, TOTAL);
    expect(r.startTime).toBe(0);
    expect(r.clamped).toBe(true);
  });

  it("left trim: enforces minDuration guard", () => {
    const r = trimClip(clip, "left", 6.5, TOTAL, 0.5);
    expect(r.duration).toBeGreaterThanOrEqual(0.5);
    expect(r.clamped).toBe(true);
  });

  it("right trim: extends clip within timeline bound", () => {
    const r = trimClip(clip, "right", 8, TOTAL);
    expect(r.startTime).toBe(2);
    expect(r.duration).toBe(6);
    expect(r.clamped).toBe(false);
  });

  it("right trim: clamps beyond totalDuration", () => {
    const r = trimClip(clip, "right", 25, TOTAL);
    expect(r.startTime + r.duration).toBeLessThanOrEqual(TOTAL);
    expect(r.clamped).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// rippleShift
// ---------------------------------------------------------------------------
describe("rippleShift", () => {
  it("shifts clips starting at or after the cut point", () => {
    const result = rippleShift(clips, 6, 2);
    expect(result.find((c) => c.id === "a")?.startTime).toBe(0);  // unchanged
    expect(result.find((c) => c.id === "b")?.startTime).toBe(8);  // shifted +2
    expect(result.find((c) => c.id === "c")?.startTime).toBe(14); // shifted +2
  });

  it("does not shift clips before the cut point", () => {
    const result = rippleShift(clips, 10, -3);
    expect(result.find((c) => c.id === "a")?.startTime).toBe(0);
    expect(result.find((c) => c.id === "b")?.startTime).toBe(6);
  });

  it("never pushes clips before minStart=0", () => {
    const result = rippleShift(clips, 0, -100);
    result.forEach((c) => expect(c.startTime).toBeGreaterThanOrEqual(0));
  });
});

// ---------------------------------------------------------------------------
// snapPlayhead
// ---------------------------------------------------------------------------
describe("snapPlayhead", () => {
  it("clamps playhead to [0, totalDuration]", () => {
    expect(snapPlayhead(-5, clips, TOTAL)).toBe(0);
    expect(snapPlayhead(99, clips, TOTAL)).toBe(TOTAL);
  });

  it("snaps playhead to clip boundary", () => {
    const pos = snapPlayhead(5.1, clips, TOTAL, DEFAULT_SNAP_OPTIONS);
    expect(pos).toBe(5); // snaps to clip a end
  });
});
