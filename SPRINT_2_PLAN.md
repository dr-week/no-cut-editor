# NOCUT Sprint 2 Planning (Aug 17-31, 2026)

> See [SPRINT_COMPLETION.md](SPRINT_COMPLETION.md) for Sprint 1 results and time savings analysis.

---

## Sprint 1 Results (Completed ✅)

- **Rebranded**: OpenCut → NOCUT
- **GitHub**: https://github.com/dr-week/no-cut-editor
- **Command Registry**: 16 core actions with search
- **Shortcut Registry**: 15+ Premiere-style bindings (J/K/L shuttle, C split, etc.)
- **Preset Catalog**: 29+ presets across 5 categories (animations, transitions, LUTs, templates, effects)
- **Tests**: ~25 comprehensive test cases
- **Effort**: ~10 days of focused work
- **Time Saved**: ~16-17 days estimated (vs. custom implementation from scratch)
- **LOC Reused**: 122,000+ lines from proven OSS libraries

---

## Sprint 2 High Priority (P0) — Deliver by Aug 24

### Task 1: Integrate Preset Browser into UI
**Goal**: Users can discover and apply presets through the command palette  
**Effort**: 2-3 days  
**Approach**: 
- Extend `editorCommandRegistry.ts` to include preset items
- Add filter toggle for "Show presets" in command palette
- Display preview thumbnails for animations/effects
- Wire `getPresetsByKind()` into UI sidebar

**Reuse Savings**: ~1 week of custom preset selection UI  
**Files**:
- `apps/web/src/components/OpenCutEditor.tsx` — integrate preset search
- `apps/web/src/lib/search/editorCommandRegistry.ts` — extend registry with presets

---

### Task 2: Integrate `react-hotkeys-hook` for Better Keyboard Handling
**Goal**: Professional keyboard control with conflict detection and rebinding  
**Effort**: 2-3 days  
**Approach**:
- Install: `npm install react-hotkeys-hook`
- Migrate from manual `keydown` listeners to `useHotkeys` hooks
- Add conflict detection for overlapping bindings
- Enable user-customizable keyboard shortcuts

**Reuse Savings**: ~2 weeks of custom keyboard system  
**Files**:
- `apps/web/src/components/OpenCutEditor.tsx` — replace keydown handler
- `apps/web/src/lib/shortcuts/editorShortcuts.ts` — add conflict checking
- `apps/web/src/lib/hooks/useEditorKeyboard.ts` (new) — custom keyboard hook

---

### Task 3: Add Keyboard Shortcut Help Overlay
**Goal**: Users can press `?` to see all available shortcuts  
**Effort**: 1-2 days  
**Approach**:
- Create modal dialog showing `getEditorShortcutRegistry()` in sortable table
- Add fuzzy search within shortcut modal
- Show most-used shortcuts first

**Reuse Savings**: ~2 days of custom help system  
**Files**:
- `apps/web/src/components/ShortcutHelpModal.tsx` (new)
- `apps/web/src/components/OpenCutEditor.tsx` — add `?` trigger

---

### Task 4: Expand Preset Catalog (+15 more presets)
**Goal**: Reach 44+ discoverable presets to reduce "what should I apply?" decisions  
**Effort**: 1-2 days  
**Approach**:
- Add 5+ more animations (spin-scale, bounce-elastic-in, etc.)
- Add 3+ more transitions (morph, pixelate-fade, etc.)
- Add 3+ more LUTs (cyberpunk-pink, noir-sepia, etc.)
- Add 4+ more effects (mirror-split, glitch-distort, etc.)

**Reuse Savings**: ~3 days per effect if built from scratch  
**Files**:
- `apps/web/src/lib/presets/editorPresetCatalog.ts` — expand EDITOR_PRESET_CATALOG array

---

## Sprint 2 Medium Priority (P1) — Roadmap for Sprint 3

### Preset Browser with Thumbnails
**Goal**: Visual preview of each preset before applying  
**Effort**: 1-2 weeks  
**Approach**: Use `canvas.toDataURL()` to generate thumbnail on apply  

### Audio Waveform Timeline (wavesurfer.js)
**Goal**: Professional audio visualization for sync and trim  
**Effort**: 1-2 weeks  
**Reuse**: `wavesurfer.js` (battle-tested, 10k LOC saved)

### Project Versioning & Auto-save
**Goal**: Never lose work; save snapshots every 5 minutes  
**Effort**: 1 week  
**Reuse**: `Dexie.js` for IndexedDB wrapper (6k LOC saved)

### User Preset Library
**Goal**: Save custom animations, grades, templates; sync across devices  
**Effort**: 1-2 weeks  
**Approach**: Export/import presets via JSON; store in Dexie

### Social Export Presets
**Goal**: One-click export optimized for each platform  
**Effort**: 1 week  
**Approach**:
- TikTok: 1080×1920 (9:16), duration ≤ 10 min
- YouTube: 3840×2160 (16:9), max bitrate 85 Mbps
- Instagram Reels: 1080×1920 (9:16), duration 15s–90s
- Podcast Audiogram: 1080×1080 (1:1) or 1200×630 (16:9)
- Product Showcase: 1920×1080 (16:9)

---

## Sprint 2 Lower Priority (P2) — Backlog

### Audio DSP (Tone.js Integration)
**Effort**: 2-3 weeks  
**Reuse**: `Tone.js` (15k LOC saved)  
**Features**: 10-band EQ, smart ducking, audio compression

### GPU Export (mediabunny Integration)
**Effort**: 2-3 weeks  
**Reuse**: `mediabunny` (35k LOC saved)  
**Benefit**: 2-10x faster export on capable hardware

### Real-Time Collaboration
**Effort**: 2-3 weeks  
**Reuse**: `Dexie + Yjs` for sync  
**Features**: Live multi-user editing, conflict resolution

### Local AI Tools (MCP Integration)
**Effort**: 3-4 weeks  
**Reuse**: MCP orchestration layer (25k LOC saved)  
**Features**: Auto subtitle, smart reframe, background removal

---

## Key Principles for Sprint 2+

1. **Extend, Don't Rebuild**
   - Extend `editorCommandRegistry` for new actions
   - Extend `editorShortcuts` for new bindings
   - Extend `editorPresetCatalog` for new presets

2. **Metadata-Driven Approach**
   - All presets live in data, not hard-coded UI
   - All commands are queryable and searchable
   - All shortcuts conflict-checked automatically

3. **Reuse-First Strategy**
   - Use proven OSS libraries before writing custom code
   - Avoid reimplementing keyboard, waveform, audio, export
   - Focus custom code only on app-specific orchestration

4. **Test Before Shipping**
   - Run `npm run test` (or `bun run test`)
   - Run `npm run build` (or `bun run build`)
   - Use chain-reaction validation: `node tools/chain-reaction.mjs`

5. **Keep Docs Synchronized**
   - Update planning docs as implementation progresses
   - Link to recent changes from SPRINT_COMPLETION.md
   - Track time savings and effort avoided

---

## Success Metrics

By end of Sprint 2:
- [ ] **44+ presets** discoverable via command palette
- [ ] **Keyboard shortcuts** fully professional (conflict-free, rebindable)
- [ ] **Preset browser** integrated into sidebar with search
- [ ] **Help overlay** accessible via `?` key
- [ ] **Tests** passing for new preset/command additions
- [ ] **Effort saved**: ~20-25 additional days (cumulative ~40+ days across 2 sprints)
- [ ] **GitHub repo** active with weekly commits

---

## Technology Stack (Finalized)

**Already Integrated (Sprint 1)**:
- React 19 + TypeScript 6
- Vite 8 + TanStack Router
- Zustand 5 (state management)
- Konva + Remotion (canvas/composition)
- Tailwind + shadcn/ui (design system)

**Sprint 2 Integrations**:
- `react-hotkeys-hook` (keyboard)
- `wavesurfer.js` (audio waveform)
- `Dexie.js` (persistence/versioning)

**Sprint 3+ Roadmap**:
- `Tone.js` (audio DSP)
- `mediabunny` (GPU export)
- `Yjs` (real-time collab)
- MCP (AI orchestration)

---

## Deployment

All changes validated through:
```bash
npm run typecheck  # TypeScript validation
npm run test       # Unit tests
npm run build      # Production build
```

GitHub: Push to `main` on completion of each sprint.

---

**Next sync**: End of Sprint 2 (Aug 31, 2026)
