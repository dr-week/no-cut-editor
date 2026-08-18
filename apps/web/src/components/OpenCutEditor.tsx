/**
 * @file OpenCutEditor.tsx
 * @description Clean Thin Orchestrator for OpenCut Studio.
 * Composes decoupled, single-responsibility subcomponents:
 * - EditorHeader (Top metadata, toast, shortcuts, export)
 * - ToolbarDock (Left tool icon switcher)
 * - MasterDrawers (MediaPool, ColorGrading, AIPanel, Shaders, Typography)
 * - StageViewport (Responsive Canvas Stage + Transformer)
 * - TransportControls (Timecode, Playhead playback buttons, volume)
 * - PropertiesPanel (Inspector for Typography, Transform, and Clips)
 * - TimelineToolbar (Razor Cut, Selection, Magnet, Zoom)
 * - TrackHeaders (V1, TXT, A1 with Lock/Eye/Mute)
 * - SequenceCanvas (Track lanes, Waveforms, Keyframes, Red Playhead line)
 * @module apps/web/src/components/OpenCutEditor
 */

import React, { useState, useEffect } from "react";
import { EditorHeader } from "./editor/layout/EditorHeader";
import { ToolbarDock } from "./editor/layout/ToolbarDock";
import { MasterDrawers } from "./editor/drawers/MasterDrawers";
import { StageViewport } from "./editor/viewport/StageViewport";
import { TransportControls } from "./editor/viewport/TransportControls";
import { PropertiesPanel } from "./editor/inspector/PropertiesPanel";
import { TimelineToolbar } from "./editor/timeline/TimelineToolbar";
import { TrackHeaders } from "./editor/timeline/TrackHeaders";
import { SequenceCanvas } from "./editor/timeline/SequenceCanvas";
import { useEditorStore } from "#/lib/store/editorStore";

export function OpenCutEditor() {
  const [aspectRatio, setAspectRatio] = useState<"16:9" | "9:16" | "1:1">("16:9");
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isMagnetActive, setIsMagnetActive] = useState<boolean>(true);

  const togglePlay = useEditorStore((s) => s.togglePlay);
  const splitClip = useEditorStore((s) => s.splitClip);
  const rippleDelete = useEditorStore((s) => s.rippleDelete);
  const triggerNotice = useEditorStore((s) => s.triggerNotice);

  // Global Premiere Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) return;

      const key = e.key.toLowerCase();
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
        triggerNotice("Play/Pause (Space)");
      } else if (key === "c") {
        splitClip();
      } else if (key === "v") {
        triggerNotice("Selection Tool (V)");
      } else if (e.shiftKey && e.code === "Delete") {
        e.preventDefault();
        rippleDelete();
      } else if (key === "i") {
        triggerNotice("Mark In (I)");
      } else if (key === "o") {
        triggerNotice("Mark Out (O)");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlay, splitClip, rippleDelete, triggerNotice]);

  return (
    <div className="flex h-screen w-screen bg-[#0d0e12] text-neutral-200 flex-col font-sans overflow-hidden select-none">
      {/* 1. Top Header */}
      <EditorHeader />

      {/* 2. Main Studio 3-Column Layout */}
      <div className="flex flex-1 overflow-hidden">
        <ToolbarDock />
        <MasterDrawers />
        
        <div className="flex-1 bg-[#090a0d] flex flex-col overflow-hidden">
          <StageViewport aspectRatio={aspectRatio} setAspectRatio={setAspectRatio} />
          <TransportControls />
        </div>

        <PropertiesPanel />
      </div>

      {/* 3. Bottom Multi-Track Timeline */}
      <div className="h-56 border-t border-neutral-800/80 bg-[#111216] flex flex-col shrink-0">
        <TimelineToolbar 
          zoomLevel={zoomLevel} 
          setZoomLevel={setZoomLevel} 
          isMagnetActive={isMagnetActive} 
          setIsMagnetActive={setIsMagnetActive} 
        />
        <div className="flex flex-1 overflow-hidden">
          <TrackHeaders />
          <SequenceCanvas />
        </div>
      </div>
    </div>
  );
}
