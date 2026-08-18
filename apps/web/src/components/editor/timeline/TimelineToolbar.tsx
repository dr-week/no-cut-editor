import React from "react";
import { Scissors, MousePointer, Magnet, ZoomIn, ZoomOut } from "lucide-react";
import { useEditorStore } from "#/lib/store/editorStore";

interface TimelineToolbarProps {
  zoomLevel: number;
  setZoomLevel: (z: number) => void;
  isMagnetActive: boolean;
  setIsMagnetActive: (m: boolean) => void;
}

export function TimelineToolbar({ zoomLevel, setZoomLevel, isMagnetActive, setIsMagnetActive }: TimelineToolbarProps) {
  const splitClip = useEditorStore((s) => s.splitClip);
  const triggerNotice = useEditorStore((s) => s.triggerNotice);

  return (
    <div className="h-8 border-b border-neutral-800/80 px-4 flex items-center justify-between text-xs text-neutral-400 bg-[#14151a]">
      <div className="flex items-center gap-3">
        <button onClick={splitClip} className="flex items-center gap-1 hover:text-cyan-400 transition font-medium">
          <Scissors className="w-3 h-3 text-cyan-400" /> Razor Cut (C)
        </button>
        <button onClick={() => triggerNotice("Selection Tool (V)")} className="flex items-center gap-1 hover:text-cyan-400 transition font-medium">
          <MousePointer className="w-3 h-3 text-amber-400" /> Select (V)
        </button>
        <div className="h-3 w-px bg-neutral-700" />
        <button 
          onClick={() => setIsMagnetActive(!isMagnetActive)} 
          className={`flex items-center gap-1 px-1.5 py-0.5 rounded transition ${
            isMagnetActive ? "text-cyan-400 bg-cyan-500/10 font-semibold" : "hover:text-white"
          }`}
        >
          <Magnet className="w-3 h-3" /> Snapping
        </button>
      </div>

      <div className="flex items-center gap-2.5">
        <ZoomOut className="w-3 h-3 text-neutral-400 cursor-pointer" />
        <input 
          type="range" min="50" max="200" value={zoomLevel} 
          onChange={(e) => setZoomLevel(Number(e.target.value))}
          className="w-20 h-1 accent-cyan-400 rounded cursor-pointer" 
        />
        <ZoomIn className="w-3 h-3 text-neutral-400 cursor-pointer" />
      </div>
    </div>
  );
}
