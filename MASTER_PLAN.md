# OpenCut Master Plan

## Mission
Create a professional, low-clutter browser video editor with Premiere-style workflow and maximum capability from reusable open-source components.

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
