import React, { useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { useEditorStore } from "#/lib/store/editorStore";
import { EditorEngine } from "#/lib/engine/EditorEngine";

export function TransportControls() {
  const isPlaying = useEditorStore((s) => s.isPlaying);
  const togglePlay = useEditorStore((s) => s.togglePlay);

  const timecodeRef = useRef<HTMLSpanElement>(null);
  const engine = EditorEngine.getInstance();

  const formatTimecode = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const frames = Math.floor((seconds % 1) * 30);
    return `00:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}:${String(frames).padStart(2, "0")}`;
  };

  // Sub-16ms direct textContent update bypassing React re-renders
  useEffect(() => {
    return engine.subscribe((time) => {
      if (timecodeRef.current) {
        timecodeRef.current.textContent = formatTimecode(time);
      }
    });
  }, [engine]);

  return (
    <div className="h-11 border-t border-neutral-800/80 bg-[#14151a] px-6 flex items-center justify-between text-xs text-neutral-300">
      <div className="flex items-center gap-3">
        <span 
          ref={timecodeRef}
          className="font-mono text-xs font-bold text-cyan-400 bg-neutral-900 px-2.5 py-1 rounded border border-neutral-800 tabular-nums select-none"
        >
          00:00:00:00
        </span>
        <span className="text-[10px] text-neutral-500">/ 00:01:00:00</span>
      </div>

      {/* Centered Controls: Only re-renders when isPlaying flips (Option B UI-Sync) */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => engine.seek(0)}
          className="hover:text-white p-1 rounded hover:bg-neutral-800 transition"
        >
          <SkipBack className="w-4 h-4" />
        </button>
        <button 
          onClick={togglePlay}
          className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:opacity-90 text-black flex items-center justify-center font-bold shadow-md shadow-cyan-950 transition"
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
        </button>
        <button 
          onClick={() => engine.seek(engine.duration)}
          className="hover:text-white p-1 rounded hover:bg-neutral-800 transition"
        >
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-2">
        <Volume2 className="w-4 h-4 text-neutral-400" />
        <input type="range" className="w-20 h-1 accent-cyan-400 rounded cursor-pointer" />
      </div>
    </div>
  );
}
