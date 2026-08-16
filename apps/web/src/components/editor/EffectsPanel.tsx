import { Palette, Zap } from "lucide-react";

export type AnimationPresetLike = {
  id: string;
  name: string;
  category: string;
  technique: string;
  duration?: number;
  easing?: string;
};

export type EffectPresetLike = {
  id: string;
  name: string;
  type: string;
};

export interface EffectsPanelProps {
  availableAnimations: AnimationPresetLike[];
  availableEffects: EffectPresetLike[];
  selectedAnimationPreset: string | null;
  selectedEffect: string | null;
  selectedClipId: string | null;
  animSearch: string;
  fxSearch: string;
  animCat: string;
  onAnimSearchChange: (value: string) => void;
  onFxSearchChange: (value: string) => void;
  onAnimCatChange: (value: string) => void;
  onApplyAnimationToClip: (clipId: string, presetId: string) => void;
  onApplyEffect: (effectId: string) => void;
}

export function EffectsPanel({
  availableAnimations,
  availableEffects,
  selectedAnimationPreset,
  selectedEffect,
  selectedClipId,
  animSearch,
  fxSearch,
  animCat,
  onAnimSearchChange,
  onFxSearchChange,
  onAnimCatChange,
  onApplyAnimationToClip,
  onApplyEffect,
}: EffectsPanelProps) {
  const animCategories = ["all", ...Array.from(new Set(availableAnimations.map((a) => a.category)))];
  const filteredAnimations = availableAnimations.filter((a) =>
    (animCat === "all" || a.category === animCat) &&
    (a.name + a.id + a.technique).toLowerCase().includes(animSearch.toLowerCase())
  );
  const filteredEffects = availableEffects.filter((fx) =>
    (fx.name + fx.id).toLowerCase().includes(fxSearch.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-2.5">
      <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">Motion Graphics & Effects</h3>

      <div className="bg-neutral-900/90 border border-cyan-500/30 rounded-lg p-2.5 flex flex-col gap-2">
        <span className="text-[10px] font-bold text-cyan-300 flex items-center gap-1">
          <Zap className="w-3 h-3 text-cyan-400" /> Motion Graphics ({filteredAnimations.length} of {availableAnimations.length})
        </span>
        <div className="flex flex-wrap gap-1">
          {animCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => onAnimCatChange(cat)}
              className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border transition ${
                animCat === cat
                  ? "bg-cyan-500/20 border-cyan-400 text-cyan-200"
                  : "bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-neutral-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder={`Search ${availableAnimations.length} animations (pop, glitch, ken burns...)`}
          value={animSearch}
          onChange={(event) => onAnimSearchChange(event.target.value)}
          className="bg-black/60 border border-neutral-700 rounded px-2 py-1 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400"
        />
        <div className="grid grid-cols-2 gap-1.5 max-h-44 overflow-y-auto">
          {filteredAnimations.slice(0, 60).map((a) => (
            <button
              key={a.id}
              onClick={() => onApplyAnimationToClip(selectedClipId ?? "v1", a.id)}
              title={`${a.technique} · ${a.easing} · ${a.duration ?? 0}s`}
              className={`text-left p-2 rounded border text-[10px] transition ${
                selectedAnimationPreset === a.id
                  ? "bg-cyan-950/60 border-cyan-400 text-cyan-200"
                  : "bg-neutral-900/70 border-neutral-800 hover:border-neutral-700 text-neutral-300"
              }`}
            >
              <span className="block font-semibold truncate">{a.name}</span>
              <span className="block text-[8px] text-neutral-500 uppercase truncate">{a.technique}</span>
            </button>
          ))}
          {filteredAnimations.length === 0 && (
            <span className="col-span-2 text-[10px] text-neutral-500">No animations match "{animSearch}"</span>
          )}
        </div>
      </div>

      <span className="text-[10px] font-bold text-cyan-300 flex items-center gap-1">
        <Palette className="w-3 h-3" /> Filmora Shaders, LUTs & Audio FX ({availableEffects.length})
      </span>
      <input
        type="text"
        placeholder={`Search ${availableEffects.length} effects (glitch, vignette, reverb...)`}
        value={fxSearch}
        onChange={(event) => onFxSearchChange(event.target.value)}
        className="bg-black/60 border border-neutral-700 rounded px-2 py-1 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400"
      />
      {(["lut", "glsl", "filter", "audio"] as const).map((group) => (
        <div key={group} className="flex flex-col gap-1.5">
          <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-500">{group.toUpperCase()}</span>
          <div className="grid grid-cols-2 gap-2">
            {filteredEffects.filter((fx) => fx.type === group).map((fx) => (
              <div
                key={fx.id}
                onClick={() => onApplyEffect(fx.id)}
                className={`p-2.5 rounded-lg border cursor-pointer text-xs flex flex-col gap-1 transition ${
                  selectedEffect === fx.id
                    ? "bg-cyan-950/60 border-cyan-400 text-cyan-200"
                    : "bg-neutral-900/70 border-neutral-800 hover:border-neutral-700 text-neutral-300"
                }`}
              >
                <div className="flex items-center gap-1.5 font-semibold text-[11px]">
                  <Palette className="w-3 h-3 text-cyan-400" />
                  <span className="truncate">{fx.name}</span>
                </div>
                <span className="text-[9px] text-neutral-500 uppercase">{fx.type} filter</span>
              </div>
            ))}
          </div>
          {filteredEffects.filter((fx) => fx.type === group).length === 0 && fxSearch && (
            <span className="text-[10px] text-neutral-600">No {group} matches</span>
          )}
        </div>
      ))}
    </div>
  );
}
