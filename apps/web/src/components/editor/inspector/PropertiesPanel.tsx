import React from "react";
import { Settings, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { useEditorStore } from "#/lib/store/editorStore";

export function PropertiesPanel() {
  const textElements = useEditorStore((s) => s.textElements);
  const selectedTextId = useEditorStore((s) => s.selectedTextId);
  const selectedClipId = useEditorStore((s) => s.selectedClipId);
  const activeLUT = useEditorStore((s) => s.activeLUT);
  const updateTextElement = useEditorStore((s) => s.updateTextElement);

  const currentTextElement = textElements.find((el) => el.id === selectedTextId);

  return (
    <div className="w-64 border-l border-neutral-800/80 bg-[#16171d] p-3.5 flex flex-col gap-4 overflow-y-auto shrink-0">
      <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2">
        <h3 className="text-xs font-bold text-neutral-200 uppercase tracking-wider flex items-center gap-1.5">
          <Settings className="w-3.5 h-3.5 text-cyan-400" /> Properties
        </h3>
        <span className="text-[10px] text-neutral-400">Inspector</span>
      </div>

      {currentTextElement ? (
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-[11px] font-semibold text-neutral-400 block mb-1">Text Content</label>
            <input 
              type="text" 
              value={currentTextElement.text} 
              onChange={(e) => updateTextElement(currentTextElement.id, { text: e.target.value })}
              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-neutral-200 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-semibold text-neutral-400 block mb-1">Font Size</label>
              <input 
                type="number" 
                value={currentTextElement.fontSize} 
                onChange={(e) => updateTextElement(currentTextElement.id, { fontSize: Number(e.target.value) })}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1 text-xs text-neutral-200 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-neutral-400 block mb-1">Color</label>
              <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-700 rounded-lg px-2 py-1">
                <input 
                  type="color" 
                  value={currentTextElement.fill} 
                  onChange={(e) => updateTextElement(currentTextElement.id, { fill: e.target.value })}
                  className="w-5 h-5 rounded cursor-pointer bg-transparent border-0"
                />
                <span className="text-[10px] font-mono text-neutral-300">{currentTextElement.fill}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-neutral-400 block mb-1">Alignment</label>
            <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-lg border border-neutral-800">
              <button className="flex-1 p-1 hover:bg-neutral-800 rounded flex justify-center text-neutral-300"><AlignLeft className="w-3.5 h-3.5" /></button>
              <button className="flex-1 p-1 bg-neutral-800 rounded flex justify-center text-cyan-400"><AlignCenter className="w-3.5 h-3.5" /></button>
              <button className="flex-1 p-1 hover:bg-neutral-800 rounded flex justify-center text-neutral-300"><AlignRight className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-neutral-300">Clip Inspector</span>
          <div className="bg-neutral-900 p-3 rounded-lg border border-neutral-800 flex flex-col gap-2 text-xs">
            <div className="flex justify-between text-neutral-400">
              <span>Selected:</span>
              <span className="text-cyan-400 font-semibold">{selectedClipId || "None"}</span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>Speed:</span>
              <span className="text-neutral-200">1.0x</span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>Opacity:</span>
              <span className="text-neutral-200">100%</span>
            </div>
          </div>
        </div>
      )}

      <div className="mt-auto border-t border-neutral-800 pt-3">
        <span className="text-[10px] text-neutral-500 uppercase tracking-wider block mb-1">Active Grade</span>
        <span className="text-xs text-neutral-300 font-medium">LUT: {activeLUT}</span>
      </div>
    </div>
  );
}
