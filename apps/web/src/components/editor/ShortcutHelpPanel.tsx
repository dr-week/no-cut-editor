import type { EditorShortcut } from "#/lib/shortcuts/editorShortcuts";

export interface ShortcutHelpPanelProps {
  shortcutSearch: string;
  onShortcutSearchChange: (value: string) => void;
  shortcutResults: EditorShortcut[];
}

export function ShortcutHelpPanel({
  shortcutSearch,
  onShortcutSearchChange,
  shortcutResults,
}: ShortcutHelpPanelProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Premiere Pro Keybinds</h3>
        <span className="text-[9px] font-mono text-neutral-500">{shortcutResults.length} commands</span>
      </div>

      <div className="bg-neutral-950/70 border border-neutral-800 rounded-lg overflow-hidden">
        <div className="border-b border-neutral-800 p-2">
          <input
            value={shortcutSearch}
            onChange={(event) => onShortcutSearchChange(event.target.value)}
            placeholder="Search shortcuts..."
            className="w-full bg-black/50 border border-neutral-700 rounded px-2 py-1.5 text-[11px] text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex flex-col gap-1.5 p-2 text-xs text-neutral-300 max-h-[420px] overflow-y-auto">
          {shortcutResults.length === 0 ? (
            <div className="rounded border border-dashed border-neutral-700 bg-neutral-900/60 px-2 py-3 text-[11px] text-neutral-500">
              No shortcuts match this search.
            </div>
          ) : (
            shortcutResults.map((shortcut) => (
              <div key={shortcut.id} className="flex justify-between items-center bg-neutral-900/80 p-2 rounded border border-neutral-800 gap-2">
                <div className="min-w-0">
                  <div className="font-medium text-neutral-200">{shortcut.label}</div>
                  <div className="text-[10px] text-neutral-500">{shortcut.description}</div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[9px] uppercase tracking-wider text-neutral-500">{shortcut.category}</span>
                  <span className="font-mono text-amber-400 font-bold bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded">{shortcut.keys}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
