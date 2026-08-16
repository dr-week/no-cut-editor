export type EditorCommand = {
  id: string;
  label: string;
  description: string;
  shortcut: string;
  category: string;
  keywords: string;
  action: () => void;
};

const commands: EditorCommand[] = [
  {
    id: "focus-mode",
    label: "Toggle Focus Mode",
    description: "Hide the sidebar and reduce distractions.",
    shortcut: "F",
    category: "View",
    keywords: "focus minimal clutter view mode",
    action: () => undefined,
  },
  {
    id: "split-clip",
    label: "Split Clip",
    description: "Cut the selected clip at the playhead.",
    shortcut: "C",
    category: "Timeline",
    keywords: "split razor cut edit clip",
    action: () => undefined,
  },
  {
    id: "duplicate-clip",
    label: "Duplicate Clip",
    description: "Duplicate the selected timeline item.",
    shortcut: "Ctrl+D",
    category: "Timeline",
    keywords: "duplicate copy clip timeline",
    action: () => undefined,
  },
  {
    id: "delete-clip",
    label: "Delete Clip",
    description: "Remove the selected timeline item.",
    shortcut: "Delete",
    category: "Timeline",
    keywords: "delete remove clip timeline",
    action: () => undefined,
  },
  {
    id: "ripple-delete",
    label: "Ripple Delete",
    description: "Delete the clip and close the gap in the timeline.",
    shortcut: "Shift+Delete",
    category: "Timeline",
    keywords: "ripple delete close gap trim",
    action: () => undefined,
  },
  {
    id: "play-pause",
    label: "Play / Pause",
    description: "Toggle playback at the current playhead.",
    shortcut: "Space",
    category: "Transport",
    keywords: "play pause transport preview",
    action: () => undefined,
  },
  {
    id: "jump-backward",
    label: "Shuttle Backward",
    description: "Move backward in the timeline.",
    shortcut: "J",
    category: "Transport",
    keywords: "j shuttle back rewind timeline",
    action: () => undefined,
  },
  {
    id: "jump-forward",
    label: "Shuttle Forward",
    description: "Move forward in the timeline.",
    shortcut: "L",
    category: "Transport",
    keywords: "l shuttle forward timeline",
    action: () => undefined,
  },
  {
    id: "toggle-snap",
    label: "Toggle Snap",
    description: "Enable or disable snap to guides and clips.",
    shortcut: "N",
    category: "Timeline",
    keywords: "snap guides align spacing",
    action: () => undefined,
  },
  {
    id: "auto-edit",
    label: "Auto Edit",
    description: "Run the one-click auto edit engine.",
    shortcut: "Ctrl+Shift+A",
    category: "AI",
    keywords: "auto edit scene beat sync viral",
    action: () => undefined,
  },
  {
    id: "glitch-effect",
    label: "Apply Glitch Effect",
    description: "Apply a glitch transition or film effect.",
    shortcut: "",
    category: "Effects",
    keywords: "glitch visual effect transitions",
    action: () => undefined,
  },
  {
    id: "color-lut",
    label: "Apply Teal Orange LUT",
    description: "Apply a cinematic color grade preset.",
    shortcut: "",
    category: "Color",
    keywords: "lut grade color teal orange cinematic",
    action: () => undefined,
  },
  {
    id: "export-video",
    label: "Export Video",
    description: "Render the current sequence to MP4 or WebM.",
    shortcut: "Ctrl+M",
    category: "Export",
    keywords: "export render video mp4 webm",
    action: () => undefined,
  },
  {
    id: "search-presets",
    label: "Search Presets",
    description: "Open the searchable preset browser.",
    shortcut: "/",
    category: "Search",
    keywords: "search presets effects templates animation",
    action: () => undefined,
  },
  {
    id: "save-project",
    label: "Save Project",
    description: "Save the current project state.",
    shortcut: "Ctrl+S",
    category: "Project",
    keywords: "save project autosave local file",
    action: () => undefined,
  },
  {
    id: "open-shortcuts",
    label: "Open Shortcut Guide",
    description: "Display the active keyboard shortcut reference.",
    shortcut: "?",
    category: "Help",
    keywords: "help shortcuts keys keyboard reference",
    action: () => undefined,
  },
  {
    id: "zoom-in-timeline",
    label: "Zoom In Timeline",
    description: "Increase the timeline horizontal scale.",
    shortcut: "=",
    category: "Timeline",
    keywords: "zoom in timeline magnification enlarge",
    action: () => undefined,
  },
  {
    id: "zoom-out-timeline",
    label: "Zoom Out Timeline",
    description: "Decrease the timeline horizontal scale.",
    shortcut: "-",
    category: "Timeline",
    keywords: "zoom out timeline shrink reduce",
    action: () => undefined,
  },
  {
    id: "mark-in-point",
    label: "Mark In Point",
    description: "Set the in-point boundary for timeline editing.",
    shortcut: "I",
    category: "Timeline",
    keywords: "mark in point trim boundary",
    action: () => undefined,
  },
  {
    id: "mark-out-point",
    label: "Mark Out Point",
    description: "Set the out-point boundary for timeline editing.",
    shortcut: "O",
    category: "Timeline",
    keywords: "mark out point trim boundary",
    action: () => undefined,
  },
  {
    id: "toggle-vocal-enhancer",
    label: "Toggle Vocal Enhancer",
    description: "Turn AI vocal clarity and noise suppression on or off.",
    shortcut: "Ctrl+Shift+V",
    category: "Audio",
    keywords: "vocal audio voice enhance noise cleanup speech",
    action: () => undefined,
  },
];

export function searchEditorCommands(query: string): EditorCommand[] {
  const q = query.trim().toLowerCase();
  if (!q) return commands;

  return commands.filter((cmd) => {
    const haystack = `${cmd.label} ${cmd.description} ${cmd.category} ${cmd.keywords}`.toLowerCase();
    return haystack.includes(q);
  });
}

export function getEditorCommands(): EditorCommand[] {
  return [...commands];
}

/**
 * Execute a command by ID against an active EditorActions context.
 * Returns true if the command was recognized and handled.
 */
export function executeEditorCommand(
  commandId: string,
  store: {
    togglePlay?: () => void;
    splitClip?: () => void;
    duplicateClip?: () => void;
    deleteClip?: () => void;
    rippleDelete?: () => void;
    seekBy?: (secs: number) => void;
    toggleSnap?: () => void;
    toggleMinimalMode?: () => void;
    runAutoEdit?: () => void;
    applyEffect?: (id: string) => void;
    applyLut?: (id: string) => void;
    setActiveTab?: (tab: string) => void;
    autosaveProject?: () => void;
    undo?: () => void;
    redo?: () => void;
    toggleVocalEnhance?: () => void;
    triggerNotice?: (msg: string) => void;
  }
): boolean {
  switch (commandId) {
    case "play-pause":
      store.togglePlay?.();
      return true;
    case "split-clip":
      store.splitClip?.();
      return true;
    case "duplicate-clip":
      store.duplicateClip?.();
      return true;
    case "delete-clip":
      store.deleteClip?.();
      return true;
    case "ripple-delete":
      store.rippleDelete?.();
      return true;
    case "jump-backward":
      store.seekBy?.(-1);
      return true;
    case "jump-forward":
      store.seekBy?.(1);
      return true;
    case "toggle-snap":
      store.toggleSnap?.();
      return true;
    case "focus-mode":
      store.toggleMinimalMode?.();
      return true;
    case "auto-edit":
      store.runAutoEdit?.();
      return true;
    case "glitch-effect":
      store.applyEffect?.("fx_glitch_scan");
      return true;
    case "color-lut":
      store.applyLut?.("lut_teal_orange");
      return true;
    case "export-video":
      store.setActiveTab?.("export");
      store.triggerNotice?.("Switched to Export tab");
      return true;
    case "search-presets":
      store.setActiveTab?.("presets");
      store.triggerNotice?.("Opened Preset Browser");
      return true;
    case "save-project":
      store.autosaveProject?.();
      return true;
    case "undo":
      store.undo?.();
      return true;
    case "redo":
      store.redo?.();
      return true;
    case "toggle-vocal-enhancer":
      store.toggleVocalEnhance?.();
      return true;
    case "zoom-in-timeline":
      store.triggerNotice?.("Timeline Zoom In");
      return true;
    case "zoom-out-timeline":
      store.triggerNotice?.("Timeline Zoom Out");
      return true;
    case "mark-in-point":
      store.triggerNotice?.("Mark In Point set");
      return true;
    case "mark-out-point":
      store.triggerNotice?.("Mark Out Point set");
      return true;
    default: {
      const found = commands.find((c) => c.id === commandId);
      if (found) {
        found.action();
        return true;
      }
      return false;
    }
  }
}

