import React from "react";
import { MediaPoolDrawer } from "./MediaPoolDrawer";
import { ColorGradingDrawer } from "./ColorGradingDrawer";
import { AIPanelDrawer } from "./AIPanelDrawer";
import { useEditorStore } from "#/lib/store/editorStore";
import { Plus, Flame, Film, Palette } from "lucide-react";

export function MasterDrawers() {
  const activeTab = useEditorStore((s) => s.activeTab);
  const addTextElement = useEditorStore((s) => s.addTextElement);

  return (
    <div className="w-72 border-r border-neutral-800/80 bg-[#16171d] p-3 flex flex-col gap-3 overflow-y-auto shrink-0">
      {activeTab === "media" && <MediaPoolDrawer />}
      {activeTab === "color" && <ColorGradingDrawer />}
      {activeTab === "ai" && <AIPanelDrawer />}

      {activeTab === "text" && (
        <div className="flex flex-col gap-2">
          <h3 className="text-xs font-bold text-neutral-200 uppercase tracking-wider">Typography Presets</h3>
          <button 
            onClick={() => addTextElement("Heading Title", "#38bdf8")}
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-black text-xs font-bold py-2 rounded-lg transition flex items-center justify-center gap-1.5 shadow"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" /> Add Headline Text
          </button>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {["Neon Glow", "Minimal Sans", "Sub-Caption", "Bold Impact", "Retro Serif", "Kinetic Pop"].map((preset) => (
              <button
                key={preset}
                onClick={() => addTextElement(preset, "#f59e0b")}
                className="p-2.5 bg-neutral-900 hover:bg-neutral-800 rounded-lg border border-neutral-800 text-left text-xs font-medium text-neutral-300 transition hover:border-neutral-700"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeTab === "social" && (
        <div className="flex flex-col gap-2">
          <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Viral Social Presets</h3>
          <div className="flex flex-col gap-1.5">
            {["TikTok Word Pop", "Reels Kinetic Burst", "Shorts Soundwave", "Viral Hook Box"].map((item) => (
              <button 
                key={item}
                onClick={() => addTextElement(item, "#f59e0b")}
                className="w-full bg-neutral-900 hover:bg-neutral-800 text-xs py-2 px-3 rounded-lg text-left font-medium text-amber-300 flex items-center justify-between border border-neutral-800"
              >
                <span>{item}</span>
                <Flame className="w-3.5 h-3.5 text-amber-400" />
              </button>
            ))}
          </div>
        </div>
      )}

      {activeTab === "templates" && (
        <div className="flex flex-col gap-2">
          <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Motion Graphics</h3>
          <div className="flex flex-col gap-1.5">
            {["SaaS Product Promo", "Cinematic Teaser", "Podcast Audiogram", "Kinetic Typography"].map((item) => (
              <button 
                key={item}
                onClick={() => addTextElement(item, "#38bdf8")}
                className="w-full bg-neutral-900 hover:bg-neutral-800 text-xs py-2 px-3 rounded-lg text-left font-medium text-cyan-300 flex items-center justify-between border border-neutral-800"
              >
                <span>{item}</span>
                <Film className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            ))}
          </div>
        </div>
      )}

      {activeTab === "effects" && (
        <div className="flex flex-col gap-2">
          <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider">Wagner GLSL Shaders</h3>
          <div className="grid grid-cols-2 gap-2">
            {["RGB Split", "Film Grain", "Chromatic", "Bloom", "Glitch", "Vignette"].map((shader) => (
              <div key={shader} className="bg-neutral-900 hover:bg-neutral-800 p-2.5 rounded-lg text-xs text-center font-medium cursor-pointer transition border border-neutral-800 text-neutral-300">
                {shader}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "shortcuts" && (
        <div className="flex flex-col gap-2">
          <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Premiere Shortcuts</h3>
          <div className="flex flex-col gap-1.5 text-xs text-neutral-300">
            <div className="flex justify-between bg-neutral-900 p-2 rounded-lg border border-neutral-800">
              <span className="font-mono text-amber-400 font-bold">Space</span>
              <span>Play / Pause</span>
            </div>
            <div className="flex justify-between bg-neutral-900 p-2 rounded-lg border border-neutral-800">
              <span className="font-mono text-amber-400 font-bold">C</span>
              <span>Razor Split</span>
            </div>
            <div className="flex justify-between bg-neutral-900 p-2 rounded-lg border border-neutral-800">
              <span className="font-mono text-amber-400 font-bold">V</span>
              <span>Selection Tool</span>
            </div>
            <div className="flex justify-between bg-neutral-900 p-2 rounded-lg border border-neutral-800">
              <span className="font-mono text-amber-400 font-bold">Shift + Del</span>
              <span>Ripple Delete</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
