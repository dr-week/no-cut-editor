export type EditorShortcut = {
  id: string;
  label: string;
  keys: string;
  description: string;
  category: string;
  command: string;
};

export const EDITOR_SHORTCUTS: EditorShortcut[] = [
  {
    id: "select-tool",
    label: "Select",
    keys: "V",
    description: "Activate the selection tool.",
    category: "Timeline",
    command: "select-tool",
  },
  {
    id: "split-clip",
    label: "Split clip",
    keys: "C",
    description: "Cut the selected clip at the playhead.",
    category: "Timeline",
    command: "split-clip",
  },
  {
    id: "mark-in",
    label: "Mark in",
    keys: "I",
    description: "Set the in point.",
    category: "Timeline",
    command: "mark-in",
  },
  {
    id: "mark-out",
    label: "Mark out",
    keys: "O",
    description: "Set the out point.",
    category: "Timeline",
    command: "mark-out",
  },
  {
    id: "play-pause",
    label: "Play / pause",
    keys: "Space",
    description: "Toggle playback.",
    category: "Transport",
    command: "play-pause",
  },
  {
    id: "j-shuttle",
    label: "Shuttle back",
    keys: "J",
    description: "Move backward along the timeline.",
    category: "Transport",
    command: "j-shuttle",
  },
  {
    id: "k-stop",
    label: "Stop",
    keys: "K",
    description: "Stop playback.",
    category: "Transport",
    command: "k-stop",
  },
  {
    id: "l-shuttle",
    label: "Shuttle forward",
    keys: "L",
    description: "Move forward along the timeline.",
    category: "Transport",
    command: "l-shuttle",
  },
  {
    id: "undo",
    label: "Undo",
    keys: "Ctrl+Z",
    description: "Revert the last action.",
    category: "Edit",
    command: "undo",
  },
  {
    id: "redo",
    label: "Redo",
    keys: "Ctrl+Shift+Z",
    description: "Restore the next action.",
    category: "Edit",
    command: "redo",
  },
  {
    id: "duplicate",
    label: "Duplicate",
    keys: "Ctrl+D",
    description: "Duplicate the selected clip.",
    category: "Edit",
    command: "duplicate-clip",
  },
  {
    id: "delete",
    label: "Delete",
    keys: "Delete",
    description: "Delete the selected clip.",
    category: "Edit",
    command: "delete-clip",
  },
  {
    id: "ripple-delete",
    label: "Ripple delete",
    keys: "Shift+Delete",
    description: "Delete and close the gap in the timeline.",
    category: "Edit",
    command: "ripple-delete",
  },
  {
    id: "command-search",
    label: "Command search",
    keys: "Ctrl+K / /",
    description: "Open the editor command palette.",
    category: "General",
    command: "command-search",
  },
  {
    id: "save-project",
    label: "Save project",
    keys: "Ctrl+S",
    description: "Save the current project state.",
    category: "Project",
    command: "save-project",
  },
];

export function getEditorShortcutRegistry(): EditorShortcut[] {
  return [...EDITOR_SHORTCUTS];
}

export function searchEditorShortcuts(query: string): EditorShortcut[] {
  const q = query.trim().toLowerCase();
  if (!q) return getEditorShortcutRegistry();

  return EDITOR_SHORTCUTS.filter((shortcut) => {
    const haystack = `${shortcut.label} ${shortcut.description} ${shortcut.category} ${shortcut.keys}`.toLowerCase();
    return haystack.includes(q);
  });
}
