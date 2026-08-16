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
];

export function searchEditorCommands(query: string): EditorCommand[] {
  const q = query.trim().toLowerCase();
  if (!q) return commands;

  return commands.filter((cmd) => {
    const haystack = `${cmd.label} ${cmd.description} ${cmd.category} ${cmd.keywords}`.toLowerCase();
    return haystack.includes(q);
  });
}
