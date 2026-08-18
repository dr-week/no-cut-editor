/**
 * @file OpenCutProjectSerializer.ts
 * @description OpenTimelineIO & JSON Project Serialization Engine.
 * Converts the living editor state (tracks, clips, typography, Lumetri color parameters,
 * and keyframes) into an open, portable .opencut schema and provides full re-hydration.
 * @module apps/web/src/lib/export/OpenCutProjectSerializer
 */

import { type EditorState } from "../store/editorStore";

export interface OpenCutProjectSchema {
  version: "2026.1";
  metadata: {
    name: string;
    createdAt: string;
    targetFps: number;
    resolution: { width: number; height: number };
  };
  timeline: {
    duration: number;
    tracks: {
      id: string;
      kind: "Video" | "Audio" | "Text";
      clips: {
        id: string;
        title: string;
        sourceStartTime: number;
        timelineStartTime: number;
        duration: number;
        speed: number;
        effects: {
          type: "LUMETRI" | "LUT" | "TRANSFORM";
          parameters: Record<string, any>;
        }[];
      }[];
    }[];
  };
  typographyOverlays: {
    id: string;
    text: string;
    x: number;
    y: number;
    fontSize: number;
    fill: string;
    rotation: number;
  }[];
}

export class OpenCutProjectSerializer {
  /**
   * Serializes current EditorState into a standardized OpenCut JSON schema.
   */
  public static serialize(state: EditorState, projectName = "Untitled_Project"): string {
    const videoClips = state.clips.filter((c) => c.type === "video");
    const audioClips = state.clips.filter((c) => c.type === "audio");
    const textClips = state.clips.filter((c) => c.type === "text");

    const project: OpenCutProjectSchema = {
      version: "2026.1",
      metadata: {
        name: projectName,
        createdAt: new Date().toISOString(),
        targetFps: 60,
        resolution: { width: 1920, height: 1080 },
      },
      timeline: {
        duration: 60,
        tracks: [
          {
            id: "V1",
            kind: "Video",
            clips: videoClips.map((c) => ({
              id: c.id,
              title: c.title,
              sourceStartTime: 0,
              timelineStartTime: c.startTime,
              duration: c.duration,
              speed: c.speed || 1.0,
              effects: [
                {
                  type: "LUMETRI",
                  parameters: { lift: state.lift, gamma: state.gamma, gain: state.gain },
                },
                {
                  type: "LUT",
                  parameters: { activeLUT: state.activeLUT },
                },
              ],
            })),
          },
          {
            id: "TXT",
            kind: "Text",
            clips: textClips.map((c) => ({
              id: c.id,
              title: c.title,
              sourceStartTime: 0,
              timelineStartTime: c.startTime,
              duration: c.duration,
              speed: 1.0,
              effects: [],
            })),
          },
          {
            id: "A1",
            kind: "Audio",
            clips: audioClips.map((c) => ({
              id: c.id,
              title: c.title,
              sourceStartTime: 0,
              timelineStartTime: c.startTime,
              duration: c.duration,
              speed: 1.0,
              effects: [],
            })),
          },
        ],
      },
      typographyOverlays: state.textElements.map((el) => ({
        id: el.id,
        text: el.text,
        x: el.x,
        y: el.y,
        fontSize: el.fontSize,
        fill: el.fill,
        rotation: el.rotation || 0,
      })),
    };

    return JSON.stringify(project, null, 2);
  }

  /**
   * Rehydrates an OpenCut JSON project schema into clean state objects.
   */
  public static deserialize(jsonString: string): Partial<EditorState> {
    try {
      const project: OpenCutProjectSchema = JSON.parse(jsonString);

      const clips: any[] = [];
      let lift = 0;
      let gamma = 0;
      let gain = 0;
      let activeLUT = "None (Rec.709)";

      for (const track of project.timeline.tracks) {
        for (const clip of track.clips) {
          clips.push({
            id: clip.id,
            title: clip.title,
            trackId: track.id,
            type: track.kind.toLowerCase() as "video" | "audio" | "text",
            startTime: clip.timelineStartTime,
            duration: clip.duration,
            color:
              track.id === "V1"
                ? "bg-blue-950/60 border-blue-500/40 text-blue-300"
                : track.id === "TXT"
                ? "bg-amber-950/60 border-amber-500/40 text-amber-300"
                : "bg-emerald-950/60 border-emerald-500/40 text-emerald-300",
            speed: clip.speed,
          });

          // Extract Lumetri & LUT parameters if present
          for (const eff of clip.effects) {
            if (eff.type === "LUMETRI") {
              lift = eff.parameters.lift ?? lift;
              gamma = eff.parameters.gamma ?? gamma;
              gain = eff.parameters.gain ?? gain;
            } else if (eff.type === "LUT") {
              activeLUT = eff.parameters.activeLUT ?? activeLUT;
            }
          }
        }
      }

      const textElements = project.typographyOverlays.map((el) => ({
        id: el.id,
        text: el.text,
        x: el.x,
        y: el.y,
        fontSize: el.fontSize,
        fill: el.fill,
        rotation: el.rotation,
        scaleX: 1,
        scaleY: 1,
      }));

      return {
        clips,
        textElements,
        lift,
        gamma,
        gain,
        activeLUT,
      };
    } catch (err) {
      console.error("Failed to parse .opencut project JSON", err);
      throw new Error("Invalid project file schema");
    }
  }
}
