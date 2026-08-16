import type { TrackClip } from "#/lib/store/editorTypes";
import { Scissors, MousePointer, Copy, Trash2, Sparkles } from "lucide-react";
import { TimelineWaveform } from "./TimelineWaveform";

export interface TimelineToolbarProps {
  minimalMode: boolean;
  selectedClipId: string | null;
  selectedAnimationPreset: string | null;
  onSplit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onRippleDelete: () => void;
  onApplyAnimation: (clipId: string, presetId: string) => void;
  onSelectTool: () => void;
}

export function TimelineToolbar({
  minimalMode,
  selectedClipId,
  selectedAnimationPreset,
  onSplit,
  onDuplicate,
  onDelete,
  onRippleDelete,
  onApplyAnimation,
  onSelectTool,
}: TimelineToolbarProps) {
  if (minimalMode) {
    return (
      <div className="flex items-center gap-2 text-[10px] text-neutral-500">
        <span>Press <kbd className="font-mono text-neutral-400">V</kbd> Select</span>
        <span>·</span>
        <span><kbd className="font-mono text-neutral-400">C</kbd> Split</span>
        <span>·</span>
        <span><kbd className="font-mono text-neutral-400">Del</kbd> Delete</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <button onClick={onSplit} className="flex items-center gap-1 hover:text-cyan-400 transition font-medium">
        <Scissors className="w-3.5 h-3.5 text-cyan-400" /> Split (C)
      </button>
      <button onClick={onSelectTool} className="flex items-center gap-1 hover:text-amber-400 transition font-medium">
        <MousePointer className="w-3.5 h-3.5 text-amber-400" /> Select (V)
      </button>
      <button onClick={onDuplicate} className="flex items-center gap-1 hover:text-purple-400 transition font-medium">
        <Copy className="w-3.5 h-3.5 text-purple-400" /> Duplicate (Ctrl+D)
      </button>
      <button onClick={onDelete} className="flex items-center gap-1 hover:text-red-400 transition font-medium">
        <Trash2 className="w-3.5 h-3.5 text-red-400" /> Delete (Del)
      </button>
      <button onClick={onRippleDelete} className="flex items-center gap-1 hover:text-orange-400 transition font-medium">
        <Scissors className="w-3.5 h-3.5 text-orange-400" /> Ripple (Shift+Del)
      </button>
      <button
        onClick={() => onApplyAnimation(selectedClipId ?? "v1", selectedAnimationPreset ?? "preset_pop_in")}
        className="flex items-center gap-1 hover:text-cyan-400 transition font-medium"
      >
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Apply Preset
      </button>
    </div>
  );
}

export interface TimelineTrackRowProps {
  clip: TrackClip;
  isSelected: boolean;
  animName?: string;
  /** Optional audio/video src URL — enables live waveform visualization in the clip strip. */
  audioSrc?: string;
  onSelect: (id: string) => void;
}

export function TimelineTrackRow({
  clip,
  isSelected,
  animName,
  audioSrc,
  onSelect,
}: TimelineTrackRowProps) {
  return (
    <div
      onClick={() => onSelect(clip.id)}
      className={`relative flex items-center gap-2 h-10 bg-neutral-900/80 rounded border px-2.5 cursor-pointer transition overflow-hidden ${
        isSelected ? "border-cyan-400 ring-1 ring-cyan-400/30" : "border-neutral-800 hover:border-neutral-700"
      }`}
    >
      {/* Live waveform underlay — only rendered when audioSrc provided */}
      {audioSrc && (
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <TimelineWaveform
            src={audioSrc}
            width={999}
            height={40}
            peakCount={160}
            muted={false}
            colors={{ bar: "#22d3ee", barMuted: "#374151", background: "transparent", centerLine: "transparent" }}
            className="w-full"
          />
        </div>
      )}

      {/* Foreground clip content */}
      <span className="relative z-10 text-[10px] font-mono text-cyan-400 font-bold w-8">{clip.trackId}</span>
      <div className={`relative z-10 flex-1 h-7 rounded flex items-center px-2 text-[11px] font-medium ${clip.color}`}>
        <span className="truncate">{clip.title}</span>
        {animName && (
          <span className="ml-2 text-[8px] px-1 py-0.5 rounded bg-black/40 border border-white/10 text-cyan-300 font-mono whitespace-nowrap">
            ✦ {animName}
          </span>
        )}
      </div>
      <span className="relative z-10 text-[9px] font-mono text-neutral-500 whitespace-nowrap">
        {clip.startTime}s → {clip.startTime + clip.duration}s
      </span>
    </div>
  );
}

