/**
 * Speech Transcript & Auto-Subtitles Engine
 *
 * Lightweight, zero-external-dependency module for:
 * - Word-level timestamp parsing and alignment (Whisper/faster-whisper schema)
 * - SRT / VTT subtitle format generation and parsing
 * - Automatic transcript-based silence detection & jump-cut boundary calculation
 * - Dynamic kinetic subtitle segment grouping (e.g. 1-3 words per burst for Shorts/TikTok)
 */

export interface TranscriptWord {
  word: string;
  start: number; // in seconds
  end: number;   // in seconds
  confidence?: number;
}

export interface SubtitleSegment {
  id: string;
  start: number; // in seconds
  end: number;   // in seconds
  text: string;
  words?: TranscriptWord[];
}

export interface JumpCutSegment {
  keepStart: number;
  keepEnd: number;
  silenceDuration: number;
}

/**
 * Parses WebVTT or SRT subtitle text into structured SubtitleSegments.
 */
export function parseSubtitleText(rawText: string): SubtitleSegment[] {
  if (!rawText.trim()) return [];

  const lines = rawText.replace(/\r\n/g, "\n").split("\n");
  const segments: SubtitleSegment[] = [];
  let currentStart = 0;
  let currentEnd = 0;
  let currentTextLines: string[] = [];
  let segmentId = 1;

  const timeRegex = /(?:(\d{2}):)?(\d{2}):(\d{2})[,.](\d{3})\s*-->\s*(?:(\d{2}):)?(\d{2}):(\d{2})[,.](\d{3})/;

  function parseTime(hours: string | undefined, mins: string, secs: string, ms: string): number {
    const h = hours ? parseInt(hours, 10) : 0;
    const m = parseInt(mins, 10);
    const s = parseInt(secs, 10);
    const millis = parseInt(ms, 10);
    return h * 3600 + m * 60 + s + millis / 1000;
  }

  function flush() {
    if (currentEnd > currentStart && currentTextLines.length > 0) {
      segments.push({
        id: `sub_${segmentId++}`,
        start: Number(currentStart.toFixed(3)),
        end: Number(currentEnd.toFixed(3)),
        text: currentTextLines.join(" ").trim(),
      });
    }
    currentStart = 0;
    currentEnd = 0;
    currentTextLines = [];
  }

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed === "WEBVTT") {
      flush();
      continue;
    }

    const match = trimmed.match(timeRegex);
    if (match) {
      flush();
      currentStart = parseTime(match[1], match[2], match[3], match[4]);
      currentEnd = parseTime(match[5], match[6], match[7], match[8]);
    } else if (currentEnd > currentStart && !/^\d+$/.test(trimmed)) {
      currentTextLines.push(trimmed);
    }
  }

  flush();
  return segments;
}

/**
 * Converts structured SubtitleSegments to standard SRT format.
 */
export function exportToSrt(segments: SubtitleSegment[]): string {
  function formatTimestamp(seconds: number): string {
    const totalMs = Math.round(seconds * 1000);
    const h = Math.floor(totalMs / 3600000);
    const m = Math.floor((totalMs % 3600000) / 60000);
    const s = Math.floor((totalMs % 60000) / 1000);
    const ms = totalMs % 1000;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")},${String(ms).padStart(3, "0")}`;
  }

  return segments
    .map((seg, idx) => `${idx + 1}\n${formatTimestamp(seg.start)} --> ${formatTimestamp(seg.end)}\n${seg.text}\n`)
    .join("\n");
}

/**
 * Groups word-level transcript entries into kinetic burst segments for high-retention shorts.
 * (e.g. maxWordsPerBurst = 2 or 3)
 */
export function groupKineticWords(words: TranscriptWord[], maxWordsPerBurst = 2): SubtitleSegment[] {
  if (!words.length) return [];
  const bursts: SubtitleSegment[] = [];

  for (let i = 0; i < words.length; i += maxWordsPerBurst) {
    const slice = words.slice(i, i + maxWordsPerBurst);
    const start = slice[0].start;
    const end = slice[slice.length - 1].end;
    const text = slice.map((w) => w.word).join(" ");
    bursts.push({
      id: `burst_${Math.floor(i / maxWordsPerBurst) + 1}`,
      start: Number(start.toFixed(3)),
      end: Number(end.toFixed(3)),
      text,
      words: slice,
    });
  }

  return bursts;
}

/**
 * Calculates jump-cut segments by cutting gaps between spoken words that exceed minSilenceSeconds.
 */
export function calculateTranscriptJumpCuts(
  words: TranscriptWord[],
  totalDurationSeconds: number,
  minSilenceSeconds = 0.45
): JumpCutSegment[] {
  if (!words.length || totalDurationSeconds <= 0) return [];

  const segments: JumpCutSegment[] = [];
  let currentKeepStart = words[0].start;

  for (let i = 0; i < words.length - 1; i++) {
    const wordEnd = words[i].end;
    const nextWordStart = words[i + 1].start;
    const silenceGap = nextWordStart - wordEnd;

    if (silenceGap >= minSilenceSeconds) {
      segments.push({
        keepStart: Number(currentKeepStart.toFixed(3)),
        keepEnd: Number(wordEnd.toFixed(3)),
        silenceDuration: Number(silenceGap.toFixed(3)),
      });
      currentKeepStart = nextWordStart;
    }
  }

  // Final segment up to last word
  const lastWord = words[words.length - 1];
  segments.push({
    keepStart: Number(currentKeepStart.toFixed(3)),
    keepEnd: Number(lastWord.end.toFixed(3)),
    silenceDuration: Number(Math.max(0, totalDurationSeconds - lastWord.end).toFixed(3)),
  });

  return segments;
}
