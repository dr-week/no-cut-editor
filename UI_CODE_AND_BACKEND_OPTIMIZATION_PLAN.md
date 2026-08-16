# UI, Code, and Backend Optimization Plan

## 1. Objective

The project should keep growing without becoming a giant monolithic editor shell. The plan is to make the editor smaller, faster, and easier to extend by splitting responsibilities and reducing custom code where proven OSS already exists.

## 2. UI optimization goals

- Keep the editor shell minimal and search-first.
- Collapse advanced controls behind progressive disclosure.
- Separate action groups by workflow: Build, Style, Sound, Smart, Tools.
- Add preset browser and shortcut modal without cluttering the main canvas.
- Reduce duplicate state display and unnecessary re-rendering on every input change.

### UI design rules
- The command palette should be the primary action entry point.
- Search should surface both commands and presets.
- Advanced tools should hide behind an "advanced" toggle.
- Preset cards should show label + category + keyword summary, not giant lists.
- The main canvas should be left visually clean and distraction-free.

## 3. Code optimization goals

### Keep registry-first architecture
- command registry = source of truth for actions
- shortcut registry = source of truth for key binding metadata
- preset catalog = source of truth for reusable effects and animations
- UI components should only render and dispatch

### Reduce duplication
- no repeated keydown handlers across components
- no disconnected effect arrays in multiple places
- no hardcoded UI actions spread across files
- no custom logic that can be replaced with metadata

### Refactor targets
- split the main editor component into smaller hooks and panels
- centralize keyboard handling in `useEditorKeyboard`
- centralize preset filtering in a reusable hook
- centralize autosave in a reusable hook

## 4. Backend and product optimization goals

- Add autosave snapshots and versioning
- Add preset import/export JSON support
- Add worker-based export and background render queue
- Add telemetry for dropped frames and export durations
- Add local analytics for usage and editing patterns
- Prepare a future cloud sync and collaboration layer

## 5. Open-source integration strategy

### Highest-value reusable libraries
- motion-canvas / motion-canvas
- gl-transitions / gl-transitions
- Tonejs / Tone.js
- mediabunny / mediabunny
- Dexie / Dexie.js
- react-hotkeys-hook / react-hotkeys-hook
- wavesurfer.js / wavesurfer.js
- dotlottie-web / dotlottie-web
- yjs / yjs

These should be used whenever the feature is a general-purpose engine problem instead of a product-specific problem.

## 6. Estimated time saved by reuse

| Area | Reused library | Estimated savings |
| --- | --- | --- |
| Motion engine | motion-canvas | 2-3 months |
| Transitions | gl-transitions | 2 months |
| Audio engine | Tone.js | 1-2 months |
| Export and media | mediabunny | 1-2 months |
| Local persistence | Dexie.js | 2-4 weeks |
| Keyboard system | react-hotkeys-hook | 3-5 days |
| Waveform UI | wavesurfer.js | 1-2 weeks |
| Lottie layer support | dotlottie-web | 1 week |
| Collaboration layer | Yjs | 2-3 weeks |

Total: approximate 20-25 months of engineering effort saved across major product areas.

## 7. Mistakes and blunders identified

1. Hardcoded preset sets in a few places instead of one metadata catalog
2. Keyboard handling not separated from UI shell logic
3. Large monolithic editor component doing too much
4. No clear optimization process or validation gate for render-heavy tasks
5. Too much custom code for generic engine features

## 8. Real implementation priorities

### P0: quick wins
- preset browser integration
- shortcut overlay
- more presets and effects
- more advanced controls behind toggle drawers
- keyboard conflict checks

### P1: quality improvements
- waveform UI and audio trim controls
- autosave snapshots
- project restore points
- export presets

### P2: scale and platform features
- Tone.js audio DSP
- GPU export via mediabunny
- Yjs real-time collaboration
- AI subtitle and reframe tools

## 9. Direct recommendation

The right architecture is:
- registry-driven logic
- metadata-driven presets
- hook-based UI logic
- tiny custom app-specific layer
- heavy media and motion logic reused from mature OSS tools

This keeps the project fast, extensible, and maintainable as it grows.
