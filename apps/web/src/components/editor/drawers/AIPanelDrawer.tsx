import React from "react";
import { Mic, Wand2 } from "lucide-react";
import { useEditorStore } from "#/lib/store/editorStore";

export function AIPanelDrawer() {
  const generateAICaptions = useEditorStore((s) => s.generateAICaptions);

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
        <Mic className="w-3.5 h-3.5" /> AI Speech-to-Text
      </h3>
      <p className="text-[11px] text-neutral-400 leading-relaxed">
        Local on-device transcription with Whisper.cpp. Generates word-accurate animated subtitles with zero cloud latency.
      </p>
      <button 
        onClick={generateAICaptions}
        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold text-xs py-2.5 rounded-lg transition flex items-center justify-center gap-2 shadow-lg shadow-amber-950"
      >
        <Wand2 className="w-4 h-4" /> 1-Click Auto Subtitles
      </button>
    </div>
  );
}
