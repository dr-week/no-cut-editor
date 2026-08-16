import { describe, it, expect } from "vitest";
import {
  parseSubtitleText,
  exportToSrt,
  groupKineticWords,
  calculateTranscriptJumpCuts,
  type TranscriptWord,
} from "./speechTranscriptEngine";

describe("Speech Transcript & Auto-Subtitles Engine", () => {
  const sampleWords: TranscriptWord[] = [
    { word: "Welcome", start: 0.1, end: 0.5 },
    { word: "to", start: 0.52, end: 0.7 },
    { word: "OpenCut", start: 0.72, end: 1.2 },
    // 0.8s silence gap here
    { word: "video", start: 2.0, end: 2.4 },
    { word: "editor", start: 2.45, end: 2.9 },
  ];

  it("parses SRT text correctly into structured segments", () => {
    const rawSrt = `1\n00:00:01,000 --> 00:00:03,500\nHello world!\n\n2\n00:00:04,000 --> 00:00:06,000\nSecond line of caption\n`;
    const segments = parseSubtitleText(rawSrt);
    expect(segments).toHaveLength(2);
    expect(segments[0].start).toBe(1.0);
    expect(segments[0].end).toBe(3.5);
    expect(segments[0].text).toBe("Hello world!");
    expect(segments[1].text).toBe("Second line of caption");
  });

  it("parses WebVTT format correctly", () => {
    const rawVtt = `WEBVTT\n\n00:00.500 --> 00:02.000\nKinetic text pop\n`;
    const segments = parseSubtitleText(rawVtt);
    expect(segments).toHaveLength(1);
    expect(segments[0].start).toBe(0.5);
    expect(segments[0].end).toBe(2.0);
    expect(segments[0].text).toBe("Kinetic text pop");
  });

  it("exports segments to clean SRT format", () => {
    const segments = [
      { id: "sub_1", start: 1.5, end: 4.0, text: "Automated subtitles" },
    ];
    const srt = exportToSrt(segments);
    expect(srt).toContain("1\n00:00:01,500 --> 00:00:04,000\nAutomated subtitles");
  });

  it("groups words into kinetic burst chunks (Shorts/TikTok style)", () => {
    const bursts = groupKineticWords(sampleWords, 2);
    expect(bursts).toHaveLength(3);
    expect(bursts[0].text).toBe("Welcome to");
    expect(bursts[0].start).toBe(0.1);
    expect(bursts[0].end).toBe(0.7);
    expect(bursts[1].text).toBe("OpenCut video");
    expect(bursts[2].text).toBe("editor");
  });

  it("calculates jump cuts by trimming dead air/silence between spoken words", () => {
    const cuts = calculateTranscriptJumpCuts(sampleWords, 4.0, 0.45);
    expect(cuts).toHaveLength(2);
    expect(cuts[0].keepStart).toBe(0.1);
    expect(cuts[0].keepEnd).toBe(1.2);
    expect(cuts[0].silenceDuration).toBe(0.8);
    expect(cuts[1].keepStart).toBe(2.0);
    expect(cuts[1].keepEnd).toBe(2.9);
  });
});
