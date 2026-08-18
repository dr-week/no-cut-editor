import React from "react";
import { Zap, Keyboard, Download } from "lucide-react";
import { useEditorStore } from "#/lib/store/editorStore";

export function EditorHeader() {
  const activeNotice = useEditorStore((s) => s.activeNotice);
  const setActiveTab = useEditorStore((s) => s.setActiveTab);

  return (
    <header className="h-12 border-b border-neutral-800/80 bg-[#14151a] px-4 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-black text-xs px-2.5 py-1 rounded flex items-center gap-1.5 shadow-sm">
          <Zap className="w-3.5 h-3.5 fill-current" /> OPENCUT
        </div>
        <div className="h-4 w-px bg-neutral-700" />
        <span className="text-xs text-neutral-300 font-semibold tracking-wide">Untitled Project_01</span>
        <span className="text-[10px] bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded border border-neutral-700">4K 60fps</span>
      </div>

      {/* Dynamic Action Toast */}
      {activeNotice && (
        <div className="bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 text-xs px-3 py-1 rounded-full flex items-center gap-1.5 animate-pulse shadow-sm">
          <Keyboard className="w-3.5 h-3.5 text-cyan-400" />
          <span>{activeNotice}</span>
        </div>
      )}

      {/* Global Controls */}
      <div className="flex items-center gap-2.5">
        <button 
          onClick={() => setActiveTab("shortcuts")}
          className="flex items-center gap-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs px-3 py-1.5 rounded transition text-neutral-300 border border-neutral-700"
        >
          <Keyboard className="w-3.5 h-3.5 text-cyan-400" />
          Shortcuts
        </button>
        <button className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black text-xs font-bold px-4 py-1.5 rounded transition shadow-md shadow-cyan-950">
          <Download className="w-3.5 h-3.5 stroke-[2.5]" /> Export Video
        </button>
      </div>
    </header>
  );
}
