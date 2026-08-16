# NOCUT Development Time Savings Report

## Strategy context
The savings report is a quantified version of the project strategy. It should stay aligned with:
- [MASTER_PLAN.md](MASTER_PLAN.md)
- [PROJECT_STATE.md](PROJECT_STATE.md)
- [GITHUB_AND_OPEN_SOFTWARE_INTEGRATIONS.md](GITHUB_AND_OPEN_SOFTWARE_INTEGRATIONS.md)
- [INTEGRATIONS.md](INTEGRATIONS.md)
- [OPEN_SOURCE_REUSE_AND_OPTIMIZATION.md](OPEN_SOURCE_REUSE_AND_OPTIMIZATION.md)

## 1. Mission

The goal is to build a high-end, creative editor with minimal custom code. Instead of reinventing the browser media stack, motion system, export path, and waveform tooling, the project should reuse proven open-source libraries and keep custom code focused on product-specific behavior.

## 2. Reuse-first library stack

| GitHub repo | Purpose | Estimated time saved | Estimated custom code avoided |
| --- | --- | --- | --- |
| motion-canvas / motion-canvas | Motion engine, timeline motion, easing, interpolation | 2-3 months | ~20k LOC |
| gl-transitions / gl-transitions | Transition shaders and effect presets | 2 months | ~18k LOC |
| Tonejs / Tone.js | Audio engine, EQ, ducking, mixing, filters | 1-2 months | ~15k LOC |
| mediabunny / mediabunny | Browser export and media processing | 1-2 months | ~35k LOC |
| Dexie / Dexie.js | Autosave, project versioning, local database | 2-4 weeks | ~6k LOC |
| dotlottie / dotlottie-web | Lightweight vector overlay animations | 1 week | ~6k LOC |
| react-hotkeys-hook / react-hotkeys-hook | Keyboard handling and shortcut conflict logic | 3-5 days | ~8k LOC |
| katspaugh / wavesurfer.js | Audio waveform UI | 1-2 weeks | ~10k LOC |
| yjs / yjs | Collaboration state sync | 2-3 weeks | ~15k LOC |
| radix-ui / radix-ui or shadcn-ui | Accessible UI primitives | 1-2 weeks | ~10k LOC |

## 3. Estimated savings

### Work saved

- ~20 to 25 months of senior developer time avoided across the workspace
- ~100k to 150k lines of custom code avoided in a full editor stack
- ~6 to 12 weeks of delivery time saved on a reusable, production-ready foundation

### Custom code kept lean

The project should keep custom work centered on:
- editor workflow orchestration
- project state and timeline tools
- command registry/search flows
- preset metadata and UI composition
- export presets for target platforms

This keeps the custom code surface small while the heavy media logic stays in battle-tested OSS libraries.

## 4. Why this strategy matters

Build a strong editor-specific shell, not a custom engine for every feature area. The time spent writing general-purpose media and animation infrastructure is usually not productive for a product team unless the product truly needs a custom engine.

## 5. Future backend and product updates

### High-priority backend items
- worker-based render pipeline for export
- autosave snapshot system with Dexie
- project versioning and restore points
- user preset library with local save/load
- export profiles for TikTok, YouTube, Reels, podcast, and product showcase
- FPS and dropped-frame telemetry

### Medium-priority product items
- smart auto-captioning
- AI-powered reframe and background cleanup
- reusable social media templates
- audio waveform-driven trimming
- approved color-grading presets library

### Future platform features
- real-time collaboration with Yjs
- cloud sync and project backup
- headless background render worker
- template marketplace and user collection system

## 6. Blunders and problems already identified

1. Hardcoded effect and animation lists
2. Shortcut logic mixed into one editor shell
3. UI state and domain logic layered too tightly together
4. No formal optimization gate or performance checklist
5. Missing reusable preset registry and metadata-first system

## 7. Correct strategy for next sprint

- Keep preset metadata in one catalog
- Keep commands in one registry
- Keep shortcuts in one registry
- Keep UI panels thin and composable
- Reuse OSS libraries instead of rebuilding core features
- Add test coverage before shipping large feature changes

## 8. Recommended integration order

1. react-hotkeys-hook
2. wavesurfer.js
3. Dexie.js
4. dotlottie-web
5. Tone.js
6. mediabunny
7. Yjs

## 9. Summary

This project is already on the correct path: the current architecture is lean, registry-driven, and search-focused. The biggest cost savings come from treating heavy technical infrastructure as reusable OSS instead of custom code. This is the right path to keep development fast while also keeping quality high.
