# NOCUT Code Optimization and Reuse Plan

## 1. Goal

Keep the editor fast, lightweight, and easier to extend by reducing custom code where proven open-source libraries already exist. The priority is to preserve the current metadata-driven architecture while removing duplicated logic and bottlenecks.

## 2. Core optimization strategy

### A. Replace custom logic with proven libraries

| Problem area | Reuse library | Time saved | Why it matters |
| --- | --- | --- | --- |
| Motion interpolation and easing | motion-canvas / motion | 2-3 months | Avoids custom timing engine bugs |
| Transition shaders | gl-transitions | 2 months | 125+ ready-made transitions |
| Audio FX and DSP | Tone.js | 1-2 months | Better quality than custom audio patching |
| Video export and encoding | mediabunny | 1-2 months | GPU-aware encode path and fewer export bugs |
| IndexedDB persistence | Dexie.js | 2-4 weeks | Better autosave and project snapshots |
| Lottie / dotlottie overlays | dotlottie-web | 1 week | Fast vector animation support |
| Keyboard bindings | react-hotkeys-hook | 3-5 days | Cleaner conflict handling |
| Audio waveform UI | wavesurfer.js | 1-2 weeks | Faster timeline inspection |
| Collaboration layer | Yjs | 2-3 weeks | Real-time sync without re-inventing CRDTs |

### B. Keep the registry model

The current command and preset registries are the right direction. Keep all future actions in a single metadata source instead of scattering logic across multiple components.

Priority pattern:
- Command metadata in one registry
- Shortcut metadata in one registry
- Preset metadata in one catalog
- UI just renders and dispatches

### C. Reduce render and state churn

- Keep selectors narrow and memoized.
- Avoid recalculating filtered arrays on every render.
- Split large editor-shell state into smaller slices.
- Only register global keyboard listeners when the editor is focused.
- Avoid full-array cloning in hot paths when filtering is enough.

---

## 3. Mistakes / blunders already identified

### Blunder 1: Hardcoded effect and preset lists
The app originally had custom lists scattered across components. That made adding a preset or effect expensive and brittle.

Fix: keep presets metadata-driven and searchable from a single catalog.

### Blunder 2: Keyboard logic mixed into the editor shell
The editor shell was handling too much directly, which makes feature growth harder to test.

Fix: centralize keyboard and command metadata outside the UI.

### Blunder 3: Too many UI responsibilities in one component
The main editor component is doing too much: rendering, export logic, timelines, keyboard logic, and search. This hurts maintainability.

Fix: split into smaller panels: timeline, transport, preset browser, export panel, and helper hook modules.

### Blunder 4: No formal optimization gate
The repo had no explicit plan for measuring render cost, autosave timing, effect count, or export performance.

Fix: add a performance checklist and validation script.

---

## 4. Planned code optimizations

### Phase 1: Architecture cleanup
- Split large component responsibilities into smaller hooks and widgets
- Add `useEditorKeyboard` for shortcut handling
- Add `usePresetBrowser` for search/filter logic
- Add `useAutosave` hook for project persistence
- Keep UI state separate from domain logic

### Phase 2: Performance tuning
- Precompute filtered preset arrays with memoization
- Use stable callbacks in command execution
- Reduce layout recalculations in the timeline and canvas preview
- Move expensive export work to an off-thread worker when the project grows

### Phase 3: Production hardening
- Add debounce for autosave
- Add snapshot-based project versioning
- Add error boundaries around export and media pipeline modules
- Add latency metrics for playback and rendering

---

## 5. Future backend and product updates

### High priority
- Project autosave snapshots using Dexie.js
- User preset library for custom LUTs, transitions, and templates
- Export presets for TikTok, YouTube, Reels, and podcast ad sizes
- FPS / dropped-frame telemetry for stability monitoring
- Worker-based renderer for heavy export tasks

### Medium priority
- Local AI subtitle generation
- Smart reframe and background removal
- Social-media ad templates and auto-safe areas
- Multi-track voiceover cleanup with waveform markers
- Timeline comments and native review notes

### Lower priority
- Real-time collaboration using Yjs
- Cloud sync integration
- Headless render jobs on remote workers
- Versioned template marketplace

---

## 6. GitHub repos to reuse for faster development

### Priority reuse list
1. motion-canvas / motion-canvas
   - Purpose: vector animation and timeline motion primitives
   - Saved effort: ~3 months

2. gl-transitions / gl-transitions
   - Purpose: 125+ professional transition shaders
   - Saved effort: ~2 months

3. Tonejs / Tone.js
   - Purpose: audio engine, EQ, ducking, rhythm tools
   - Saved effort: ~2 months

4. mediabunny / mediabunny
   - Purpose: browser media pipeline and encoding
   - Saved effort: ~1-2 months

5. Dexie / Dexie.js
   - Purpose: IndexedDB persistence and versioned autosave
   - Saved effort: ~2-4 weeks

6. dotlottie / dotlottie-web
   - Purpose: lightweight animated sticker and overlay assets
   - Saved effort: ~1 week

7. JohannesKlauss / react-hotkeys-hook
   - Purpose: keyboard binding and hotkey management
   - Saved effort: ~3-5 days

8. katspaugh / wavesurfer.js
   - Purpose: audio waveform visualization
   - Saved effort: ~1-2 weeks

9. yjs / yjs
   - Purpose: real-time collaborative editing state
   - Saved effort: ~2-3 weeks

### Total effort saved
Using these libraries against a custom build would save roughly 20-25 months of engineering effort across the full stack. For this project specifically, the current reuse-first path likely saves 2-4 weeks per major feature area while improving quality.

---

## 7. UI integrations to add next

- Preset browser in the command palette
- Searchable effect and motion panel
- Template preview cards with default duration
- Shortcut overlay with live key help
- Timeline quick actions toolbar
- Smart effects drawer grouped by category
- One-click export presets for social formats

---

## 8. Preset ideas to add

### Animation ideas
- Spring-In Zoom
- Orbit Slide
- Drift Fade
- Orbit Spin Reveal
- Elastic Intro Pop
- Swipe Bounce
- Parallax Drift

### Transition ideas
- Prism Wipe
- Light Leak
- Noise Dissolve
- Block Pull
- Pixel Melt
- Flash Cut

### LUT ideas
- Cyberpunk Magenta
- Sepia Noir
- Neon Sunset
- Arctic Blue
- Filmic Warm Gray

### Effects ideas
- Glow Edge
- Light Leak
- Soft Vignette
- Chromatic Split
- TV Scanlines
- Dust Grain

---

## 9. Validation gate

Before any larger feature lands, run:
- typecheck
- unit tests
- production build
- a preset search smoke check
- a shortcut conflict smoke check

This makes the repository safer for experiments without drift.

---

## 10. Recommendation

Continue with the registry-first architecture, but formalize the code split now:
- keep data in registries
- keep state in stores
- keep UI logic in components and hooks
- keep Open Source integrations isolated to adapter modules

This is the correct path to keep the project fast and easy to extend without turning the editor into a giant unmaintainable shell.
