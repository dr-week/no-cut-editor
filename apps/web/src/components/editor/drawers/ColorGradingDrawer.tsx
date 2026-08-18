import React from "react";
import { Sliders } from "lucide-react";
import { useEditorStore } from "#/lib/store/editorStore";

export function ColorGradingDrawer() {
  const lift = useEditorStore((s) => s.lift);
  const gamma = useEditorStore((s) => s.gamma);
  const gain = useEditorStore((s) => s.gain);
  const activeLUT = useEditorStore((s) => s.activeLUT);
  const setLumetriColor = useEditorStore((s) => s.setLumetriColor);
  const setActiveLUT = useEditorStore((s) => s.setActiveLUT);

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
        <Sliders className="w-3.5 h-3.5" /> Lumetri Color Wheels
      </h3>
      <div className="flex flex-col gap-2.5 bg-neutral-900/80 p-3 rounded-xl border border-neutral-800">
        <div>
          <div className="flex justify-between text-[11px] text-neutral-300 mb-1">
            <span>Shadows (Lift)</span>
            <span className="font-mono text-cyan-400 font-semibold">{lift}</span>
          </div>
          <input 
            type="range" min="-50" max="50" value={lift} 
            onChange={(e) => setLumetriColor(Number(e.target.value), gamma, gain)}
            className="w-full h-1.5 accent-cyan-400 rounded cursor-pointer"
          />
        </div>
        <div>
          <div className="flex justify-between text-[11px] text-neutral-300 mb-1">
            <span>Midtones (Gamma)</span>
            <span className="font-mono text-cyan-400 font-semibold">{gamma}</span>
          </div>
          <input 
            type="range" min="-50" max="50" value={gamma} 
            onChange={(e) => setLumetriColor(lift, Number(e.target.value), gain)}
            className="w-full h-1.5 accent-cyan-400 rounded cursor-pointer"
          />
        </div>
        <div>
          <div className="flex justify-between text-[11px] text-neutral-300 mb-1">
            <span>Highlights (Gain)</span>
            <span className="font-mono text-cyan-400 font-semibold">{gain}</span>
          </div>
          <input 
            type="range" min="-50" max="50" value={gain} 
            onChange={(e) => setLumetriColor(lift, gamma, Number(e.target.value))}
            className="w-full h-1.5 accent-cyan-400 rounded cursor-pointer"
          />
        </div>
      </div>

      <span className="text-[11px] font-bold text-neutral-300 uppercase tracking-wider mt-1">3D LUT Film Presets</span>
      <div className="grid grid-cols-2 gap-2">
        {["Kodak 2383", "Fuji F-125", "Teal & Orange", "Bleach Bypass", "Vintage 70s", "Cyber Neon"].map((lut) => (
          <button
            key={lut}
            onClick={() => setActiveLUT(lut)}
            className={`p-2 rounded-lg text-[11px] text-center font-medium transition border ${
              activeLUT === lut ? "border-cyan-400 bg-cyan-500/10 text-cyan-300 font-bold" : "border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-neutral-300"
            }`}
          >
            {lut}
          </button>
        ))}
      </div>
    </div>
  );
}
