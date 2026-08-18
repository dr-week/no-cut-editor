import React, { useEffect, useRef } from "react";
import { useEditorStore } from "#/lib/store/editorStore";
import { EditorEngine } from "#/lib/engine/EditorEngine";

export function SequenceCanvas() {
  const clips = useEditorStore((s) => s.clips);
  const selectedClipId = useEditorStore((s) => s.selectedClipId);
  const setSelectedClipId = useEditorStore((s) => s.setSelectedClipId);

  const timelineRef = useRef<HTMLDivElement>(null);
  const playheadRef = useRef<HTMLDivElement>(null);
  const engine = EditorEngine.getInstance();

  // Sub-16ms direct DOM subscription bypassing React reconciliation completely
  useEffect(() => {
    return engine.subscribe((time) => {
      if (playheadRef.current) {
        const percent = (time / engine.duration) * 100;
        playheadRef.current.style.transform = `translateX(${percent}%)`;
      }
    });
  }, [engine]);

  const handleTimelineScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = Math.max(0, Math.min(engine.duration, (clickX / rect.width) * engine.duration));
    engine.seek(newTime);
  };

  return (
    <div 
      ref={timelineRef}
      onClick={handleTimelineScrub}
      className="flex-1 flex flex-col relative bg-[#0a0b0e] overflow-x-auto select-none cursor-pointer"
    >
      {/* Decoupled Direct DOM Playhead Container (Zero React Re-renders) */}
      <div 
        ref={playheadRef}
        style={{ transform: "translateX(0%)" }}
        className="absolute top-0 bottom-0 left-0 w-0.5 bg-red-500 z-30 pointer-events-none transition-none shadow-[0_0_8px_rgba(239,68,68,0.8)] will-change-transform"
      >
        <div className="w-2.5 h-2.5 bg-red-500 rotate-45 -ml-1 -mt-1 rounded-xs" />
      </div>

      {/* Time Ruler Markings */}
      <div className="h-4 border-b border-neutral-800/80 bg-[#111216] flex items-center text-[9px] text-neutral-500 font-mono px-2 justify-between">
        <span>00:00</span>
        <span>00:15</span>
        <span>00:30</span>
        <span>00:45</span>
        <span>01:00</span>
      </div>

      {/* Track Lanes */}
      <div className="flex flex-col divide-y divide-neutral-800/40">
        {clips.map((clip) => {
          const clipLeft = (clip.startTime / engine.duration) * 100;
          const clipWidth = (clip.duration / engine.duration) * 100;

          return (
            <div key={clip.id} className="h-12 relative flex items-center px-1">
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedClipId(clip.id);
                }}
                style={{ left: `${clipLeft}%`, width: `${clipWidth}%` }}
                className={`absolute h-8 rounded-md border flex items-center justify-between px-2.5 cursor-pointer transition shadow-sm ${
                  selectedClipId === clip.id ? "border-cyan-400 shadow-cyan-950/50" : "border-neutral-700/60"
                } ${clip.color}`}
              >
                <span className="text-[10px] font-semibold truncate text-white">{clip.title}</span>

                {/* Real-Time Audio Waveform Bars */}
                {clip.waveform && (
                  <div className="flex items-center gap-0.5 h-4 opacity-80">
                    {clip.waveform.map((height, idx) => (
                      <div 
                        key={idx} 
                        style={{ height: `${(height / 100) * 14}px` }} 
                        className="w-1 bg-emerald-300 rounded-sm"
                      />
                    ))}
                  </div>
                )}

                {/* Keyframe Diamond Indicator */}
                <div className="flex items-center gap-1 text-[9px] text-amber-400">
                  <span>◆</span>
                  <span>◆</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
