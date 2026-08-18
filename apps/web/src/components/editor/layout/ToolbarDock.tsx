import React from "react";
import { 
  Type, Image as ImageIcon, Sparkles, 
  Flame, Palette, Film, Sliders, Mic 
} from "lucide-react";
import { useEditorStore } from "#/lib/store/editorStore";

export function ToolbarDock() {
  const activeTab = useEditorStore((s) => s.activeTab);
  const setActiveTab = useEditorStore((s) => s.setActiveTab);

  const tabs = [
    { id: "media", label: "Media", icon: ImageIcon },
    { id: "text", label: "Text", icon: Type },
    { id: "ai", label: "AI Captions", icon: Mic },
    { id: "color", label: "Color", icon: Sliders },
    { id: "effects", label: "Shaders", icon: Palette },
    { id: "social", label: "Social", icon: Flame },
    { id: "templates", label: "Motion", icon: Film },
    { id: "transitions", label: "FX", icon: Sparkles },
  ] as const;

  return (
    <div className="w-14 border-r border-neutral-800/80 bg-[#121318] flex flex-col items-center py-3 gap-4 text-neutral-400 shrink-0">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex flex-col items-center gap-1 text-[9px] font-medium w-full py-1.5 transition ${
              isActive ? "text-cyan-400 border-l-2 border-cyan-400 bg-cyan-500/10" : "hover:text-white"
            }`}
          >
            <Icon className="w-4 h-4" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
