import React from "react";
import { Eye, Lock, Volume2 } from "lucide-react";
import { useEditorStore } from "#/lib/store/editorStore";

export function TrackHeaders() {
  const clips = useEditorStore((s) => s.clips);

  return (
    <div className="w-28 border-r border-neutral-800 bg-[#131418] flex flex-col divide-y divide-neutral-800/60 shrink-0">
      {clips.map((clip) => (
        <div key={clip.id} className="h-12 flex items-center justify-between px-2.5 text-xs text-neutral-400">
          <span className="font-mono text-cyan-400 font-bold">{clip.trackId}</span>
          <div className="flex items-center gap-1.5">
            <Eye className="w-3 h-3 hover:text-white cursor-pointer" />
            <Lock className="w-3 h-3 hover:text-white cursor-pointer" />
            {clip.type === "audio" && <Volume2 className="w-3 h-3 hover:text-white cursor-pointer" />}
          </div>
        </div>
      ))}
    </div>
  );
}
