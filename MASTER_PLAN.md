# OpenCut Master Plan

## Mission
Create a professional, low-clutter browser video editor with Premiere-style workflow and maximum capability from reusable open-source components.

## Strategy links
- [PROJECT_STATE.md](PROJECT_STATE.md) — active status, implementation gaps, and current priorities
- [GITHUB_AND_OPEN_SOFTWARE_INTEGRATIONS.md](GITHUB_AND_OPEN_SOFTWARE_INTEGRATIONS.md) — repo shortlist and integration candidates
- [INTEGRATIONS.md](INTEGRATIONS.md) — integration log with status and estimated value
- [DEV_TIME_SAVINGS_REPORT.md](DEV_TIME_SAVINGS_REPORT.md) — estimated time and code saved by reuse
- [OPEN_SOURCE_REUSE_AND_OPTIMIZATION.md](OPEN_SOURCE_REUSE_AND_OPTIMIZATION.md) — reuse-first strategy and stack recommendations

## Strategy: reduce development work without losing product quality
1. Keep the custom app shell minimal and registry-driven.
2. Reuse open-source projects for heavy media, motion, audio, export, and automation work.
3. Convert new features into small modular panels and metadata catalogs rather than one-off UI code.
4. Automate validation, preset checks, and project memory syncing before shipping larger changes.
5. Only build custom product logic when it is unique to NOCUT, not when it is generic editor infrastructure.

## Current reality
The project has already moved beyond a blank-slate editor. The web app includes:
- a functional editor shell
- timeline, effects, LUTs, transitions, motion presets, and AI tool surfaces
- autosave and export systems
- focus mode and grouped UI tabs
- shortcut registry and command palette/search infrastructure
- reusable preset and metadata-driven patterns

## Current sprint: workflow acceleration and minimal UI
The active implementation priority is not adding more features blindly; it is making the editor feel faster and more professional.

### In progress now
- minimal mode + focused editing surface
- grouped tab categories for Build / Style / Sound / Smart / Tools
- command palette and searchable actions
- central keyboard registry and quick-access actions
- preset and effect searchability
- modular shortcut/help overlay and reusable shortcut registry
- modular shortcut help panel extracted from the main editor shell
- modular effects panel extracted from the main editor shell
- doc synchronization with implementation state

### Why this matters
The repo already has many feature blocks. The real product gap is workflow clarity, discoverability, and low-friction operation. The right move is to reduce clutter without removing capability.

## Next: timeline and effects quality
- refine timeline trim, snap, and playhead actions
- add searchable transitions, LUTs, animation presets, and template categories
- improve command execution from the global editor surface
- increase keyboard-first operations with clearer scopes and help overlays
- continue reducing one-off logic through shared registries and preset metadata

## Then: performance and render pipeline
- worker-based processing for heavy media work
- WebCodecs export and advanced compression presets
- GPU and WebGPU acceleration where justified
- proxy or caching strategy for large timelines
- reliable export presets for social formats and distribution targets

## Then: AI editing and automation
- auto subtitles and transcript-based editing
- smart reframing and silence removal
- auto improve and director-style timeline suggestions
- editable AI-generated sequences and templates
- pipeline automation for validation, export, and quality checks
- direct integration of GitHub automation repos for cutting, cleanup, clipping, and smart social output

## Prioritized GitHub automation stack
1. WyattBlue/auto-editor — dead-space detection and auto-cut engine
2. benpiper/auto-video-editor — cleanup pipeline for filler removal, freeze detection, and background removal
3. Ekaanth/OpenCut-AI — transcript-driven editing and AI-assisted decisions
4. mfahsold/montage-ai — beat edits, captions, reframing, and polish
5. aregrid/frame — automatic clip selection from motion and audio signals
6. fralapo/clippyme — short-form viral output generation

These integrations are treated as modular automation layers rather than replacements for the editor shell.

## Later: production readiness
- real-time collaboration with shared timeline state
- cloud render workers or headless render jobs
- scripting and automation API
- native acceleration only when browser limits or product requirements demand it

## Reuse-first core principle
Use open-source libraries before custom code whenever the quality and maintenance are strong enough. The goal is a small custom layer on top of proven systems, not a second full editor engine.

## Success criteria for this plan
- editor surface stays minimal but retains full feature power
- command and shortcut search feel native to the app
- reusable metadata drives presets, effects, transitions, and tools
- docs and implementation remain synchronized
- engineering effort is reduced by reuse and automated validation
