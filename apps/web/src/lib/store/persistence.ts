import type { EditorData } from "./editorActions";
import type Dexie from "dexie";
import type {
  AudioTrackSettings,
  ColorGradingSettings,
  SceneShape,
  TextElement,
  TrackClip
} from "./editorTypes";

const DB_NAME = "opencut-project";
const STORE_NAME = "projects";
const AUTO_KEY = "auto";

export interface PersistedProject {
  key: string;
  updatedAt: number;
  data: {
    clips: TrackClip[];
    textElements: TextElement[];
    sceneShapes: SceneShape[];
    colorGrading: ColorGradingSettings;
    audioSettings: AudioTrackSettings;
    clipAnimations: Record<string, string>;
    selectedAnimationPreset: string | null;
    selectedEffect: string | null;
    selectedTemplate: string | null;
    selectedTrend: string | null;
    selectedTransition: string | null;
    currentTime: number;
    duration: number;
    playbackRate: number;
  };
}

export type SerializedProject = PersistedProject["data"];

/** Pure serializer — testable without IndexedDB. */
export function serializeProjectData(state: EditorData): SerializedProject {
  return {
    clips: state.clips,
    textElements: state.textElements,
    sceneShapes: state.sceneShapes,
    colorGrading: state.colorGrading,
    audioSettings: state.audioSettings,
    clipAnimations: state.clipAnimations,
    selectedAnimationPreset: state.selectedAnimationPreset,
    selectedEffect: state.selectedEffect,
    selectedTemplate: state.selectedTemplate,
    selectedTrend: state.selectedTrend,
    selectedTransition: state.selectedTransition,
    currentTime: state.currentTime,
    duration: state.duration,
    playbackRate: state.playbackRate
  };
}

/** Destructure a persisted project back into an EditorData patch. */
export function applyProjectData(data: SerializedProject): Partial<EditorData> {
  return {
    clips: data.clips ?? [],
    textElements: data.textElements ?? [],
    sceneShapes: data.sceneShapes ?? [],
    colorGrading: data.colorGrading,
    audioSettings: data.audioSettings,
    clipAnimations: data.clipAnimations ?? {},
    selectedAnimationPreset: data.selectedAnimationPreset ?? null,
    selectedEffect: data.selectedEffect ?? null,
    selectedTemplate: data.selectedTemplate ?? null,
    selectedTrend: data.selectedTrend ?? null,
    selectedTransition: data.selectedTransition ?? null,
    currentTime: data.currentTime ?? 0,
    duration: data.duration ?? 60,
    playbackRate: data.playbackRate ?? 1
  };
}

type DexieInstance = Dexie;

let dbPromise: Promise<DexieInstance> | null = null;

function openDb(): Promise<DexieInstance> | null {
  if (typeof indexedDB === "undefined") return null;
  if (!dbPromise) {
    dbPromise = import("dexie").then(({ default: DexieCtor }) => {
      const db = new DexieCtor(DB_NAME);
      db.version(1).stores({ [STORE_NAME]: "key, updatedAt" });
      return db;
    });
  }
  return dbPromise;
}

export async function saveProject(
  data: SerializedProject,
  key = AUTO_KEY
): Promise<boolean> {
  const dbPromise_ = openDb();
  if (!dbPromise_) return false;
  const db = await dbPromise_;
  await db.table(STORE_NAME).put({ key, updatedAt: Date.now(), data });
  return true;
}

export async function loadProject(key = AUTO_KEY): Promise<PersistedProject | null> {
  const dbPromise_ = openDb();
  if (!dbPromise_) return null;
  const db = await dbPromise_;
  const row = await db.table(STORE_NAME).get(key);
  return row ?? null;
}

export async function clearProject(key = AUTO_KEY): Promise<boolean> {
  const dbPromise_ = openDb();
  if (!dbPromise_) return false;
  const db = await dbPromise_;
  await db.table(STORE_NAME).delete(key);
  return true;
}

export async function listProjects(): Promise<PersistedProject[]> {
  const dbPromise_ = openDb();
  if (!dbPromise_) return [];
  const db = await dbPromise_;
  return db.table(STORE_NAME).toArray();
}

/**
 * Creates a versioned project history snapshot for undo/recovery.
 */
export async function createProjectSnapshot(
  data: SerializedProject,
  label = "autosave"
): Promise<string> {
  const snapshotKey = `snapshot_${Date.now()}_${label}`;
  await saveProject(data, snapshotKey);
  return snapshotKey;
}

/**
 * Retrieves all saved project snapshots sorted newest first.
 */
export async function getProjectSnapshots(): Promise<PersistedProject[]> {
  const all = await listProjects();
  return all
    .filter((p) => p.key.startsWith("snapshot_"))
    .sort((a, b) => b.updatedAt - a.updatedAt);
}

