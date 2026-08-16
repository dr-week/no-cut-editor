# OpenCut Next Steps & Time-Saving Plan (2026)

> Companion to [FUTURE_ROADMAP_AND_ARCHITECTURE.md](FUTURE_ROADMAP_AND_ARCHITECTURE.md), [GITHUB_AND_OPEN_SOFTWARE_INTEGRATIONS.md](GITHUB_AND_OPEN_SOFTWARE_INTEGRATIONS.md), [OPEN_SOURCE_ROI_AND_PRESETS.md](OPEN_SOURCE_ROI_AND_PRESETS.md), [MULTI_LANGUAGE_TECH_STACK_2026.md](MULTI_LANGUAGE_TECH_STACK_2026.md), and [CHAIN_REACTION_PLAN.md](CHAIN_REACTION_PLAN.md).

## 1. Current implementation status
The repo has already shipped a real workflow layer for the next efficient editor stage:
- grouped editor tabs by workflow category
- focus mode and minimal UI state
- centralized command registry for search-first actions
- centralized shortcut registry
- searchable preset/action paths in the editor shell
- tests for command matching and search behavior

## 2. Immediate next priorities

| Priority | Feature | Reuse path | Estimated time saved |
| :--- | :--- | :--- | :--- |
| P0 | More command/search coverage for presets, transitions, LUTs, templates | extend existing registry | 1–2 days |
| P0 | Expand Premiere-style shortcut coverage | extend current shortcut model | 1–2 days |
| P1 | Metadata-driven preset browser | reuse current search/filter pattern | 2–4 days |
| P1 | Timeline trim/snap refinement | build on existing timeline actions | 3–5 days |
| P1 | Better grouping and progressive-disclosure panels | reuse current tab-group system | 2–4 days |
| P2 | Worker-based media processing pipeline | mediabunny / WebCodecs | 2–4 weeks |
| P2 | Lottie/dotlottie overlay support | dotlottie-web | 1 week |
| P2 | Transition preset catalog expansion | gl-transitions | 1–2 weeks |
| P3 | Real-time collaboration | Dexie + Yjs | 2–3 weeks |
| P3 | AI workflow layer and scripting | MCP + model orchestration | 2–4 weeks |

## 3. How to keep saving development time

1. Extend the existing command registry instead of building another action layer.
2. Extend the existing shortcut registry instead of building per-panel keybindings.
3. Keep presets metadata-driven so new animation/effect entries do not require manual UI wiring.
4. Reuse proven OSS stacks for video handling, audio, motion, and transitions.
5. Validate each phase with the chain-reaction script instead of ad hoc manual checks.

## 4. Backend and product updates to add
- Renderer worker farm for heavy encode/mux tasks
- Project versioning with DB-backed snapshots
- User preset library for animations, LUTs, and templates
- Export presets for social formats
- FPS, dropped-frame, and encode-time telemetry
- Local AI improvements and Smart Reframe tools

## 5. Chain reaction status
The validation path is already in place and should be used for all future changes:
- typecheck
- unit tests
- build verification

This is the repo’s expected gate before code changes are considered complete.

## 6. Tech stack notes
The project intentionally combines:
- TypeScript editor layer
- Web/React UI
- browser media stacks
- reusable OSS libraries for motion, audio, transitions, and render paths
- a local-first architecture with room for more advanced backend layers later

This keeps the custom code surface small while preserving a professional creative tool experience.
