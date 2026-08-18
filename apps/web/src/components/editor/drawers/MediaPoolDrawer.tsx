import React, { useRef, useState } from "react";
import { Plus, Film, Music, Image as ImageIcon } from "lucide-react";
import { MediaIngestManager, type IngestedMediaAsset } from "#/lib/engine/MediaIngestManager";
import { useEditorStore } from "#/lib/store/editorStore";

export function MediaPoolDrawer() {
  const [ingestedAssets, setIngestedAssets] = useState<IngestedMediaAsset[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const triggerNotice = useEditorStore((s) => s.triggerNotice);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const ingestManager = MediaIngestManager.getInstance();
    
    // Subscribe to background waveform completions
    ingestManager.subscribe((asset) => {
      setIngestedAssets((prev) => {
        const filtered = prev.filter((a) => a.id !== asset.id);
        return [...filtered, asset];
      });
    });

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      await ingestManager.ingestFile(file);
      triggerNotice(`Ingested ${file.name} (Waveform generating)`);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-neutral-200 uppercase tracking-wider">Project Media</h3>
        <span className="text-[10px] text-neutral-400">{ingestedAssets.length + 2} Assets</span>
      </div>
      
      {/* Interactive Drag & Drop File Zone */}
      <input 
        ref={fileInputRef}
        type="file"
        multiple
        accept="video/*,audio/*,image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-neutral-700 hover:border-cyan-500/60 rounded-xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition bg-neutral-900/40 group"
      >
        <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center mb-2 group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition text-neutral-400">
          <Plus className="w-5 h-5" />
        </div>
        <span className="text-xs font-semibold text-neutral-200">Import Video, Audio, Image</span>
        <span className="text-[10px] text-neutral-400 mt-0.5">Drag & drop 4K/8K, MP4, MOV, WAV</span>
      </div>

      <div className="flex flex-col gap-1.5 mt-1">
        <span className="text-[11px] font-semibold text-neutral-400">Bin Assets</span>
        <div className="grid grid-cols-2 gap-2">
          {/* Default Sample Assets */}
          <div className="bg-neutral-900 rounded-lg p-2 border border-neutral-800 flex flex-col gap-1 cursor-pointer hover:border-cyan-500/50 transition">
            <div className="h-16 bg-neutral-800 rounded flex items-center justify-center text-neutral-400 text-xs">
              <Film className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="text-[10px] font-medium truncate text-neutral-300">Main_Video_Track.mp4</span>
          </div>

          <div className="bg-neutral-900 rounded-lg p-2 border border-neutral-800 flex flex-col gap-1 cursor-pointer hover:border-cyan-500/50 transition">
            <div className="h-16 bg-neutral-800 rounded flex items-center justify-center text-neutral-400 text-xs">
              <Music className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-[10px] font-medium truncate text-neutral-300">Background_Music.mp3</span>
          </div>

          {/* User Ingested Dynamic Assets */}
          {ingestedAssets.map((asset) => (
            <div key={asset.id} className="bg-neutral-900 rounded-lg p-2 border border-neutral-800 flex flex-col gap-1 cursor-pointer hover:border-cyan-500/50 transition">
              <div className="h-16 bg-neutral-800 rounded flex items-center justify-center text-neutral-400 text-xs">
                {asset.type === "video" && <Film className="w-5 h-5 text-cyan-400" />}
                {asset.type === "audio" && <Music className="w-5 h-5 text-emerald-400" />}
                {asset.type === "image" && <ImageIcon className="w-5 h-5 text-amber-400" />}
              </div>
              <span className="text-[10px] font-medium truncate text-neutral-300">{asset.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
