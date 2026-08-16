import { describe, it, expect } from "vitest";
import { EASINGS, getEasing, type EasingName } from "./easings";
import {
  interpolate,
  clamp,
  sampleAnimation,
  springSimulate,
  formatTimecode,
  formatSeconds,
  calculateCanvasAspectDimensions,
  DEFAULT_TRANSFORM
} from "./engine";
import { ANIMATION_PRESETS, getAnimationPreset } from "#/lib/presets/animations";

describe("Motion Graphics Engine", () => {
  describe("easings", () => {
    it("has a broad easing library (40+ curves)", () => {
      expect(Object.keys(EASINGS).length).toBeGreaterThanOrEqual(40);
    });

    it("easing functions start near 0 and end near 1", () => {
      const names = Object.keys(EASINGS) as EasingName[];
      for (const name of names) {
        const fn = EASINGS[name];
        expect(fn(0)).toBeCloseTo(0, 4);
        expect(fn(1)).toBeCloseTo(1, 4);
      }
    });

    it("returns the fallback linear easing for unknown names", () => {
      expect(getEasing("linear")(0.5)).toBe(0.5);
    });

    it("steps easing quantizes to discrete buckets", () => {
      const stepped = EASINGS.steps(0.4, { count: 5 });
      expect([0, 0.2, 0.4, 0.6, 0.8, 1]).toContain(stepped);
    });

    it("spring easing overshoots below and above the 0-1 range", () => {
      const values = [0, 0.2, 0.5, 0.8, 1].map((t) => EASINGS.spring(t));
      const hasOvershoot = values.some((v) => v > 1.0001);
      expect(hasOvershoot).toBe(true);
    });
  });

  describe("keyframe interpolation", () => {
    it("interpolates linearly between output ranges", () => {
      expect(interpolate(0.5, [0, 1], [0, 100])).toBeCloseTo(50, 5);
    });

    it("clamps input before easing", () => {
      expect(interpolate(2, [0, 1], [0, 10])).toBe(10);
      expect(interpolate(-1, [0, 1], [0, 10])).toBe(0);
    });

    it("eases the interpolation progress", () => {
      const eased = interpolate(0.5, [0, 1], [0, 100], "easeInCubic");
      expect(eased).toBeLessThan(50);
    });
  });

  describe("animation sampling", () => {
    it("samples presets and returns fully-resolved transforms", () => {
      const preset = getAnimationPreset("preset_pop_in")!;
      expect(preset).toBeDefined();
      const atStart = sampleAnimation(preset, 0);
      const atEnd = sampleAnimation(preset, preset.duration);
      expect(atStart.transform.opacity).toBeLessThan(atEnd.transform.opacity);
      expect(atEnd.transform.scaleX).toBeCloseTo(1, 2);
    });

    it("clamps local time beyond preset duration", () => {
      const preset = getAnimationPreset("preset_fade_in")!;
      const late = sampleAnimation(preset, 999);
      expect(late.progress).toBe(1);
      expect(late.transform.opacity).toBe(1);
    });

    it("every preset has valid tracks, duration and colors", () => {
      for (const p of ANIMATION_PRESETS) {
        expect(p.id).toMatch(/^preset_/);
        expect(p.duration).toBeGreaterThan(0);
        expect(p.previewColor).toContain("from-");
        expect(p.tracks.length).toBeGreaterThanOrEqual(2);
      }
    });

    it("applies base transform defaults", () => {
      const preset = getAnimationPreset("preset_pop_in")!;
      const sample = sampleAnimation(preset, preset.duration);
      expect(sample.transform).toMatchObject(DEFAULT_TRANSFORM);
    });
  });

  describe("spring physics", () => {
    it("simulates spring motion toward target", () => {
      const frames = springSimulate(0, 1, { stiffness: 200, damping: 20 }, 0.6, 60);
      expect(frames.length).toBeGreaterThan(20);
      expect(frames[frames.length - 1].scaleX).toBeCloseTo(1, 1);
    });
  });

  describe("time formatting", () => {
    it("formats timecode as HH:MM:SS:FF", () => {
      expect(formatTimecode(3661.5, 24)).toBe("01:01:01:12");
    });

    it("formats seconds as M:SS.s", () => {
      expect(formatSeconds(85.4)).toBe("1:25.4");
    });
  });

  describe("helpers", () => {
    it("clamps values to range", () => {
      expect(clamp(12, 0, 10)).toBe(10);
      expect(clamp(-5, 0, 10)).toBe(0);
      expect(clamp(5, 0, 10)).toBe(5);
    });

    it("calculates canvas aspect dimensions for 16:9, 9:16 and 1:1", () => {
      const widescreen = calculateCanvasAspectDimensions("16:9", 600, 337);
      expect(widescreen.height).toBeLessThanOrEqual(338);
      expect(widescreen.width).toBeGreaterThanOrEqual(598);

      const vertical = calculateCanvasAspectDimensions("9:16", 600, 337);
      expect(vertical.height).toBe(337);
      expect(vertical.width).toBeLessThan(300);

      const square = calculateCanvasAspectDimensions("1:1", 600, 337);
      expect(square.width).toBe(337);
      expect(square.height).toBe(337);
    });
  });
});
