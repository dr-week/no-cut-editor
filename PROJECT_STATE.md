# OpenCut Project State

## Current implemented state
The repo is now in a workflow-optimization phase rather than a pure feature-scouting phase.

## Related strategy docs
- [MASTER_PLAN.md](MASTER_PLAN.md) — core mission, priorities, and reuse-first architecture
- [GITHUB_AND_OPEN_SOFTWARE_INTEGRATIONS.md](GITHUB_AND_OPEN_SOFTWARE_INTEGRATIONS.md) — repo candidates and integration value
- [INTEGRATIONS.md](INTEGRATIONS.md) — integration status and notes
- [DEV_TIME_SAVINGS_REPORT.md](DEV_TIME_SAVINGS_REPORT.md) — time and code saved by using open-source libraries
- [OPEN_SOURCE_REUSE_AND_OPTIMIZATION.md](OPEN_SOURCE_REUSE_AND_OPTIMIZATION.md) — summary of the reusable stack and decisions

## Strategy summary
The plan is to keep custom code focused on editor workflow, command search, timeline orchestration, and product-specific UX while reusing upstream libraries for heavy media, audio, motion, export, and automation. This keeps the app lean, speeds feature delivery, and reduces maintenance overhead.

### Already in place
- browser-based video editor shell and timeline workflow
- media, effects, LUT, transition, and motion preset surfaces
- autosave and project state management
- export engine and render preparation hooks
- focus mode and grouped tab organization
- central keyboard shortcut registry
- centralized searchable command registry
- searchable preset catalog and metadata-driven preset discovery
- modular timeline toolbar/track row UI components
- shortcut/search help layer and registry validation
- extracted reusable effects panel for the editor shell
- chain-reaction validation tooling

### Active implementation path
The project is focused on:
- search-first editor actions
- grouped and minimal UI surfaces
- keyboard-first productivity for editing operations
- metadata-driven preset discovery and filtering
- modular shortcut/help overlays and reusable command metadata
- reusable shortcut panel module for the editor shell
- reusable effects panel module for the editor shell
- GitHub automation integrations for auto-cutting, AI cleanup, transcript editing, social clip generation, and orchestration
- OSS reuse to reduce custom development work

## Current gap
The remaining product gap is not raw feature absence; it is workflow polish, discoverability, and low-friction editing operations. The current goal is to keep the feature set intact while making it easier to find and use.

## Primary objective
Move from a feature-rich but cluttered editor to a minimal, search-first professional workflow with Premiere-style productivity patterns and modular automation layers.

## Implementation priorities
1. expand command palette coverage for effects, transitions, templates, and presets
2. expand shortcut coverage for timeline editing and transport actions
3. refine grouped UI panels and progressive disclosure
4. add stronger preset metadata and quick-filtering systems
5. integrate modular automation services for auto-cut, cleanup, transcript editing, and social output
6. continue aligning documentation and roadmap with actual code changes

## Current GitHub integration shortlist
- WyattBlue/auto-editor — silence detection and dead-space cutting
- benpiper/auto-video-editor — combined cleanup and automation pipeline
- Ekaanth/OpenCut-AI — transcript editing and smart cuts
- mfahsold/montage-ai — beat-synced AI editing and social output
- aregrid/frame — clip selection and scene/motion detection
- fralapo/clippyme — short-form viral video generation
- Relo-video/SynthCut — AI orchestration and FFmpeg automation
- theSamPadilla/montaj — agentic editing workflow orchestration
- FernandoAbishai/ScriptCut — transcript cleanup and short-form generation

## Validation status
- command registry test coverage: passing (zoom, mark in/out, vocal enhancer covered)
- executeEditorCommand execution dispatcher: integrated and verified (5 test cases)
- preset search catalog & Wave 5 animation tests: passing
- dynamic preset indexing across animations, transitions, effects, templates, LUTs, and trends: verified (11 tests in suite)
- media processing & WebCodecs capability engine (mediaProcessingEngine.ts): built and tested (5 tests)
- speech transcript & auto-subtitle engine (speechTranscriptEngine.ts): built and tested (5 tests)
- smart reframe & subject tracking engine (smartReframeEngine.ts): built and tested (5 tests)
- audio waveform peak extractor & DSP engine tests: passing
- motion engine aspect ratio bounding & HUD dimension math: passing
- social platform export presets & UI one-click selector: integrated and verified
- timeline waveform canvas visualizer (TimelineWaveform.tsx): built and tested (6 tests)
- timeline snap/trim/ripple engine (timelineSnap.ts): built and tested (18 tests)
- waveform underlay wired into TimelineTrackRow (audioSrc prop, 30% opacity overlay)
- snapPosition + rippleShift wired into editorActions nudgeClip, moveClipTo, rippleDelete
- dead code removed from OpenCutEditor.tsx (3 unused computed vars, nextAssets)
- INTEGRATIONS.md updated with 40+ categorized open-source repos and savings estimates
- total suite: 134/134 unit tests passing (12 test suites)
- TypeScript strict typecheck: passing clean (0 errors)
- production Vite/SSR client/server build: passing clean
- chain-reaction script (`tools/chain-reaction.mjs`) remains the automated one-shot validation gateway

## Project memory rule
All important project state, priorities, decisions, architecture, dependencies, risks, and implementation status are stored in markdown files, not in AI context alone. The authoritative project-memory files are:
- [MASTER_PLAN.md](MASTER_PLAN.md)
- [PROJECT_STATE.md](PROJECT_STATE.md)
- [GITHUB_AND_OPEN_SOFTWARE_INTEGRATIONS.md](GITHUB_AND_OPEN_SOFTWARE_INTEGRATIONS.md)
- [INTEGRATIONS.md](INTEGRATIONS.md)
- [DEV_TIME_SAVINGS_REPORT.md](DEV_TIME_SAVINGS_REPORT.md)
- [OPEN_SOURCE_REUSE_AND_OPTIMIZATION.md](OPEN_SOURCE_REUSE_AND_OPTIMIZATION.md)

## Next task
Implement the next modular feature packet by expanding the advanced control surfaces behind progressive disclosure and keeping the workflow minimal while the automation integrations remain optional modular layers.
