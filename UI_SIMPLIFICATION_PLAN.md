# OpenCut UI Simplification Plan — Minimal Approach

> Goal: keep every existing feature while reducing default visual noise and making the editor feel more like a professional, keyboard-first timeline workbench.

## 1. Current state
This phase is already underway and the repo reflects the new direction:
- grouped editor tabs by workflow category
- focus mode for low-distraction editing
- searchable command palette and command registry
- centralized shortcut registry
- low-noise design centered on the editor core instead of stacked controls

## 2. Principles
1. Default surface should be the canvas, transport, and timeline.
2. Advanced tools should be hidden behind grouped panels, not left visible everywhere.
3. The search box and command palette are the primary discovery surface.
4. Keyboard-first editing should work without requiring the mouse for common actions.
5. Every panel should be grouped by intent, not by raw feature type alone.
6. Reusable metadata should drive filters, presets, and command registration.

## 3. Current pain points still being addressed
- too many visible tabs and controls on a single screen
- keyboard actions are powerful but not always discoverable
- preset libraries need stronger filtering and command-driven access
- power-user tools are present but not organized into a clean mental model

## 4. Phased plan

### Phase A — Focus mode and default minimal view ✅ active
- keep canvas + transport + timeline prominent
- hide non-essential controls in minimal-mode view
- preserve power-user tools behind one command or panel open action

### Phase B — Grouped workflow tabs ✅ active
- Build: media, templates, text
- Style: effects, color, transitions
- Sound: audio, keyframes
- Smart: trends, AI, export
- Tools: shortcuts

### Phase C — Search-first control layer ✅ active
- command palette by `/` or Ctrl+K
- searchable actions across editor features
- keyword metadata for presets and tools
- filter by category and feature intent

### Phase D — Shortcut-first productivity
- add Premiere-inspired bindings for trimming, splitting, snapping, and shuttle actions
- make the keyboard model discoverable from in-editor help and command search

### Phase E — Metadata-driven preset systems
- drive motion presets, LUTs, template categories, audio profiles, and effects from shared config
- reduce custom branches and repeated UI code

## 5. Success metrics
- both dense and advanced tools remain available without visual overload
- users can discover actions through search and keyboard help
- the default surface stays clean and fast
- shared registries and metadata make the editor easier to extend

## 6. Definition of done
- [x] minimal mode behavior is present in the editor shell
- [x] grouped tab categories are working
- [x] command registry and search logic exist
- [x] shortcut registry exists
- [ ] additional keyboard mappings for advanced timeline actions
- [ ] broader preset metadata and effect catalog integration
- [ ] documentation tie-in for the next sprint

Primary files: [apps/web/src/components/OpenCutEditor.tsx](apps/web/src/components/OpenCutEditor.tsx), [apps/web/src/lib/search/editorCommandRegistry.ts](apps/web/src/lib/search/editorCommandRegistry.ts), [apps/web/src/lib/shortcuts/editorShortcuts.ts](apps/web/src/lib/shortcuts/editorShortcuts.ts)
