# Integrations Log

## Strategy context
This log tracks the integration decisions that reduce custom development work. Keep it synchronized with:
- [MASTER_PLAN.md](MASTER_PLAN.md)
- [PROJECT_STATE.md](PROJECT_STATE.md)
- [GITHUB_AND_OPEN_SOFTWARE_INTEGRATIONS.md](GITHUB_AND_OPEN_SOFTWARE_INTEGRATIONS.md)
- [DEV_TIME_SAVINGS_REPORT.md](DEV_TIME_SAVINGS_REPORT.md)
- [OPEN_SOURCE_REUSE_AND_OPTIMIZATION.md](OPEN_SOURCE_REUSE_AND_OPTIMIZATION.md)

## Priority automation integrations for this auto-video-editor project

| Project | Purpose | License | Integration status | Estimated time saved | Notes |
| --- | --- | --- | --- | --- | --- |
| WyattBlue/auto-editor | Silence and dead-space detection with automatic cuts | MIT | Candidate | 1-2 weeks | Best drop-in replacement for custom auto-cut logic |
| benpiper/auto-video-editor | Silence removal, filler-word detection, freeze-frame detection, background removal | MIT | Candidate | 2-4 weeks | Strong smart-cleanup layer |
| Ekaanth/OpenCut-AI | Transcript editing, smart cuts, auto-ducking | MIT | Candidate | 2-5 weeks | Good fit for workflow automation |
| aregrid/frame | Scene and motion-based auto clip selection | MIT | Candidate | 1-3 weeks | Useful for clip generation heuristics |
| mfahsold/montage-ai | Beat cuts, smart reframing, captions, audio polish | MIT | Candidate | 3-6 weeks | Strong AI editing engine candidate |
| fralapo/clippyme | Viral-cuts and social-first editing workflows | MIT | Candidate | 1-3 weeks | Good for Shorts and social repurposing |
| pireel/pireel | Browser timeline and motion captions UI | MIT | Candidate | 1-2 weeks | Helpful UI reference and template inspiration |
| Relo-video/SynthCut | AI-controlled editing with FFmpeg and MCP automation | MIT | Candidate | 2-4 weeks | Strong orchestration layer |
| theSamPadilla/montaj | Agentic multi-step editing pipeline | MIT | Candidate | 2-5 weeks | Useful for AI workflow orchestration |
| FernandoAbishai/ScriptCut | Transcript cleanup and short-form generation | MIT | Candidate | 1-3 weeks | Good for filler removal and voiceover editing |
| motiondivision/motion | Spring physics and easing curves | MIT | Candidate | 2-4 weeks | Strong for motion and physics reuse |
| motion-canvas/motion-canvas | Motion graphics and composite animation | MIT | Candidate | 2-4 weeks | Helpful for vector motion systems |
| gl-transitions/gl-transitions | Shader transitions | MIT | Candidate | 1-3 weeks | Excellent effect catalog |
| Tonejs/Tone.js | Audio DSP and EQ | MIT | Partial | 1-3 weeks | Good for audio controls |
| katspaugh/wavesurfer.js | Waveform rendering | MIT | Candidate | 1-2 weeks | Useful for audio waveform UX |
| mediabunny/mediabunny | WebCodecs video processing | MIT | Candidate | 2-4 weeks | Good hardware-accelerated path |
| ffmpegwasm/ffmpeg.wasm | Fallback transcoding | MIT | Candidate | 1-3 weeks | Useful fallback and export reliability |
| modelcontextprotocol/typescript-sdk | AI tool orchestration | MIT | Partial | 1-2 weeks | Helpful for MCP automation |
| dexie/Dexie.js | IndexedDB persistence | Apache 2.0 | Implemented | 0.5-1 week | Used for autosave and local state |
| yjs/yjs | Real-time collaboration | MIT | Candidate | 1-2 weeks | Good for shared project sync |

## Rule
Integrate only when the net time saved is greater than the integration and maintenance overhead.

## Recommended first-wave integrations
1. auto-editor
2. auto-video-editor
3. OpenCut-AI
4. montage-ai
5. frame

These five projects cover the highest-value automation wins for auto-cutting, cleanup, subtitles/captions, and AI-assisted editing while keeping the custom editor shell focused and lean.

---

## 🧠 AI Memory / Project Intelligence (New)

| Repo | Purpose | License | Status | Saves |
|------|---------|---------|--------|-------|
| [letta-ai/letta](https://github.com/letta-ai/letta) | Persistent agent memory — remember clips, people, scenes, music, previous decisions across sessions | Apache 2.0 | Candidate | ~8 weeks / ~12k LOC |
| [chroma-core/chroma](https://github.com/chroma-core/chroma) | Vector DB for semantic search over project assets | Apache 2.0 | Candidate | ~5 weeks / ~8k LOC |
| [qdrant/qdrant](https://github.com/qdrant/qdrant) | Scalable vector DB for clip/scene/music embeddings | Apache 2.0 | Candidate | ~5 weeks / ~8k LOC |
| [lancedb/lancedb](https://github.com/lancedb/lancedb) | Local AI vector DB (no server) — ideal for browser-first | Apache 2.0 | **Evaluate first** | ~5 weeks / ~8k LOC |

**LanceDB is preferred** — runs locally, no backend server required.

---

## 🔎 Video Understanding / AI Vision (New)

| Repo | Purpose | License | Status | Saves |
|------|---------|---------|--------|-------|
| [openai/whisper](https://github.com/openai/whisper) | Transcription engine | MIT | Candidate | ~12 weeks / ~25k LOC |
| [SYSTRAN/faster-whisper](https://github.com/SYSTRAN/faster-whisper) | Fast local transcription via CTranslate2 | MIT | **Evaluate first** | ~12 weeks / ~25k LOC |
| [Breakthrough/PySceneDetect](https://github.com/Breakthrough/PySceneDetect) | Automatic scene boundary detection | BSD | Candidate | ~5 weeks / ~8k LOC |
| [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) | YOLO object/person detection per frame | AGPL-3 | Candidate | ~15 weeks / ~30k LOC |
| [opencv/opencv](https://github.com/opencv/opencv) | Computer vision pipeline | Apache 2.0 | Candidate | ~20 weeks / ~50k LOC |
| [openai/CLIP](https://github.com/openai/CLIP) | Semantic image/video search ("find shot with car") | MIT | Candidate | ~10 weeks / ~15k LOC |
| [deepinsight/insightface](https://github.com/deepinsight/insightface) | Face recognition/tracking ("find every shot with person") | MIT | Candidate | ~8 weeks / ~12k LOC |
| [google-ai-edge/mediapipe](https://github.com/google-ai-edge/mediapipe) | Pose, hands, face, object tracking | Apache 2.0 | Candidate | ~10 weeks / ~18k LOC |

---

## 🎨 Animation / Motion Engines (New Additions)

| Repo | Purpose | License | Status | Saves |
|------|---------|---------|--------|-------|
| [greensock/GSAP](https://github.com/greensock/GSAP) | Professional animation engine — easing, timelines, sequencing | GSAP OSS | **Evaluate first** | ~10 weeks / ~18k LOC |
| [motiondivision/motion](https://github.com/motiondivision/motion) | Web animation API — smooth Motion One | MIT | Evaluate | ~4 weeks / ~5k LOC |
| [juliangarnier/anime](https://github.com/juliangarnier/anime) | Keyframe interpolation, timeline chaining | MIT | Evaluate | ~4 weeks / ~5k LOC |
| [airbnb/lottie-web](https://github.com/airbnb/lottie-web) | JSON-driven motion graphics playback | MIT | Candidate | ~6 weeks / ~10k LOC |
| [theatre-js/theatre](https://github.com/theatre-js/theatre) | Visual keyframe editor + animation sequencer | Apache 2.0 | **High priority** | ~12 weeks / ~22k LOC |
| [pmndrs/react-spring](https://github.com/pmndrs/react-spring) | Physics-based UI animation | MIT | Evaluate | ~3 weeks / ~4k LOC |

**Theatre.js is highest priority** — replaces the entire manual keyframe editor sprint.

---

## 🖼️ GPU / 2D-3D Rendering (New)

| Repo | Purpose | License | Status | Saves |
|------|---------|---------|--------|-------|
| [pixijs/pixijs](https://github.com/pixijs/pixijs) | GPU-accelerated 2D sprite/particle rendering | MIT | Candidate | ~8 weeks / ~12k LOC |
| [mrdoob/three.js](https://github.com/mrdoob/three.js) | 3D graphics — titles, depth, particle effects | MIT | Candidate | ~10 weeks / ~15k LOC |

---

## 🧩 Workflow / Automation (New)

| Repo | Purpose | License | Status | Saves |
|------|---------|---------|--------|-------|
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | Visual workflow automation — IMPORT→ANALYZE→TRANSCRIBE→RENDER pipeline | Fair Code | Candidate | ~8 weeks / ~15k LOC |
| [node-red/node-red](https://github.com/node-red/node-red) | Event/workflow visual automation | Apache 2.0 | Candidate | ~5 weeks / ~8k LOC |
| [temporalio/temporal](https://github.com/temporalio/temporal) | Reliable long-running render workflows | MIT | Candidate | ~10 weeks / ~20k LOC |
| [taskforcesh/bullmq](https://github.com/taskforcesh/bullmq) | Background render job queues | MIT | Candidate | ~4 weeks / ~6k LOC |
| [triggerdotdev/trigger.dev](https://github.com/triggerdotdev/trigger.dev) | Background task orchestration | MIT | Candidate | ~4 weeks / ~6k LOC |

---

## 📦 Asset Management References (New)

| Repo | Why study it | Status |
|------|-------------|--------|
| [immich-app/immich](https://github.com/immich-app/immich) | Best open-source photo/video library management — study for asset indexing patterns | Reference |
| [hydrusnetwork/hydrus](https://github.com/hydrusnetwork/hydrus) | Large media tagging/search — study for metadata + search architecture | Reference |
| [paperless-ngx/paperless-ngx](https://github.com/paperless-ngx/paperless-ngx) | Asset indexing/search/metadata workflow patterns | Reference |

---

## 🏗️ Architecture References (New)

| Repo | Why valuable | Status |
|------|-------------|--------|
| [isroil01/motion-editor](https://github.com/isroil01/motion-editor) | GPU renderer + scene graph + keyframes + graph editor + effects + masks + particles + plugins + deterministic export. Modular packages: `scene→animation→timeline→renderer→audio→AI→plugins` | **Study now** |
| [nexu-io/motion-anything](https://github.com/nexu-io/motion-anything) | AI-agent motion recipes — hundreds of presets, keyframes, triggers, exports to CSS/React/Lottie/MP4/GIF | Study |
| [kilingzhang/openmontage](https://github.com/kilingzhang/openmontage) | Agentic pipeline: research→scripting→asset selection→AI→editing→composition→rendering | Study |

---

## ✅ Active Integrations Summary (Cumulative)

| Integration | Replaced | Saved |
|------------|---------|-------|
| Dexie.js | Custom IndexedDB layer | ~3.5 weeks / ~5k LOC |
| react-konva | Custom canvas engine | ~5 weeks / ~8k LOC |
| motion-canvas | Custom animation engine | ~11 weeks / ~18k LOC |
| @dnd-kit | Custom drag-and-drop | ~3 weeks / ~4k LOC |
| cmdk | Custom command palette | ~2 weeks / ~3k LOC |
| audioEngine.ts (WebAudio) | wavesurfer.js + custom DSP | ~9.5 weeks / ~12k LOC |
| timelineSnap.ts (custom pure math) | Drag library snap logic | ~3 weeks / ~4k LOC |
| SOCIAL_EXPORT_PRESETS | Manual platform config | ~2 weeks / ~2.5k LOC |
| **Total** | | **~39 weeks / ~56.5k LOC** |

---

---

## 🖥️ Desktop / App Shell Frameworks

| Repo | Purpose | License | Status | Saves |
|------|---------|---------|--------|-------|
| [tauri-apps/tauri](https://github.com/tauri-apps/tauri) | Lightweight Rust+Web desktop shell | MIT/Apache 2.0 | Candidate | ~6 weeks / ~10k LOC |
| [electron/electron](https://github.com/electron/electron) | Mature desktop shell | MIT | Alternative | ~6 weeks / ~10k LOC |
| [wailsapp/wails](https://github.com/wailsapp/wails) | Go + web UI desktop shell | MIT | Alternative | ~6 weeks / ~10k LOC |
| [neutralinojs/neutralinojs](https://github.com/neutralinojs/neutralinojs) | Ultra-lightweight portable desktop apps | MIT | Alternative | ~5 weeks / ~8k LOC |

---

## 🗂️ Media & Asset Management Infrastructure

| Repo | Purpose | License | Status | Saves |
|------|---------|---------|--------|-------|
| [SteveCastle/loki](https://github.com/SteveCastle/loki) | Super-fast local media browsing, tagging, WebGPU compositor | MIT | **Evaluate high** | ~8 weeks / ~15k LOC |
| [zidage/AlcedoStudio](https://github.com/zidage/AlcedoStudio) | GPU image pipeline, semantic search, ratings, indexing | MIT | Candidate | ~7 weeks / ~12k LOC |
| [CyberTimon/RapidRAW](https://github.com/CyberTimon/RapidRAW) | Non-destructive edits, masks, GPU processing reference | MIT | Candidate | ~6 weeks / ~10k LOC |

---

## 🔎 Search & Local DB Infrastructure

| Repo | Purpose | License | Status | Saves |
|------|---------|---------|--------|-------|
| [meilisearch/meilisearch](https://github.com/meilisearch/meilisearch) | Typo-tolerant fast asset search engine | MIT | Candidate | ~4 weeks / ~6k LOC |
| [typesense/typesense](https://github.com/typesense/typesense) | In-memory typo-tolerant search | GPL-3 | Candidate | ~4 weeks / ~6k LOC |
| [electric-sql/pglite](https://github.com/electric-sql/pglite) | Local in-browser Postgres with WASM & extensions (vector search) | Apache 2.0 | **Evaluate high** | ~6 weeks / ~10k LOC |
| [pubkey/rxdb](https://github.com/pubkey/rxdb) | Reactive local client database for offline-first | Apache 2.0 | Candidate | ~5 weeks / ~8k LOC |

---

## ✨ Shader / Effects Infrastructure

| Repo | Purpose | License | Status | Saves |
|------|---------|---------|--------|-------|
| [riskcapital/ghost-arcade](https://github.com/riskcapital/ghost-arcade) | 200+ WebGPU/GLSL effects, audio-reactive params, MIDI, real-time | MIT | **Evaluate first** | ~14 weeks / ~25k LOC |
| [hideyuki-hori/lab-webgpu-editor](https://github.com/hideyuki-hori/lab-webgpu-editor) | WebGPU shader editor with Worker-based rendering | MIT | Candidate | ~6 weeks / ~10k LOC |
| [patriciogonzalezvivo/glslCanvas](https://github.com/patriciogonzalezvivo/glslCanvas) | Simple GLSL canvas rendering layer | MIT | Candidate | ~3 weeks / ~4k LOC |
| [playcanvas/editor](https://github.com/playcanvas/editor) | WebGL/WebGPU visual editor architecture & PCUI components | MIT | Architecture Reference | Reference |

---

## 🧩 Plugin Architecture & Dependency Injection

| Repo | Purpose | License | Status | Saves |
|------|---------|---------|--------|-------|
| [PlasmoHQ/plasmo](https://github.com/PlasmoHQ/plasmo) (WebExtCore) | Plugin and extension sandbox lifecycle patterns | Apache 2.0 | Reference | ~4 weeks / ~6k LOC |
| [inversify/InversifyJS](https://github.com/inversify/InversifyJS) | Lightweight IoC container & plugin registry | MIT | Candidate | ~3 weeks / ~3k LOC |
| [microsoft/tsyringe](https://github.com/microsoft/tsyringe) | TypeScript DI container | MIT | Candidate | ~2 weeks / ~2k LOC |

---

## 🖼️ High-Performance Image Processing

| Repo | Purpose | License | Status | Saves |
|------|---------|---------|--------|-------|
| [lovell/sharp](https://github.com/lovell/sharp) | Ultra-fast image resizing, thumbnailing, format conversion | Apache 2.0 | Candidate (Node/Backend) | ~4 weeks / ~6k LOC |
| [libvips/libvips](https://github.com/libvips/libvips) | Low-memory high-throughput image processing engine | LGPL | Reference | Core backend |

---

## 🔮 Unusual Projects & Advanced Inspiration

| Repo | Why valuable | Status |
|------|-------------|--------|
| [screenpipe/screenpipe](https://github.com/screenpipe/screenpipe) | Screen/audio capture, OCR, SQLite search, Tauri architecture for background activity | Study |
| [ssrajadh/sentrysearch](https://github.com/ssrajadh/sentrysearch) | Semantic video footage search, clip extraction, automatic face/object redaction | Study |
| [SysAdminDoc/Openshop](https://github.com/SysAdminDoc/Openshop) | Browser image editor with layers, selections, filters, PSD support, WebGPU/WASM | Study |

---

## ✅ Active Integrations Summary (Cumulative)

| Integration | Replaced | Saved |
|------------|---------|-------|
| Dexie.js | Custom IndexedDB layer | ~3.5 weeks / ~5k LOC |
| react-konva | Custom canvas engine | ~5 weeks / ~8k LOC |
| motion-canvas | Custom animation engine | ~11 weeks / ~18k LOC |
| @dnd-kit | Custom drag-and-drop | ~3 weeks / ~4k LOC |
| cmdk | Custom command palette | ~2 weeks / ~3k LOC |
| audioEngine.ts (WebAudio) | wavesurfer.js + custom DSP | ~9.5 weeks / ~12k LOC |
| timelineSnap.ts (custom pure math) | Drag library snap logic | ~3 weeks / ~4k LOC |
| SOCIAL_EXPORT_PRESETS | Manual platform config | ~2 weeks / ~2.5k LOC |
| **Total** | | **~39 weeks / ~56.5k LOC** |

---

---

## 🧩 Visual / Node Workflow Systems (New)

| Repo | Purpose | License | Status | Saves |
|------|---------|---------|--------|-------|
| [retejs/rete](https://github.com/retejs/rete) | Modular node editor & visual graph framework | MIT | Candidate | ~10 weeks / ~18k LOC |
| [jagenjo/litegraph.js](https://github.com/jagenjo/litegraph.js) | Lightweight graph engine (JSON exportable) | MIT | **Evaluate high** | ~8 weeks / ~12k LOC |
| [flydelabs/flyde](https://github.com/flydelabs/flyde) | Visual programming for flow-based backend logic | MIT | Candidate | ~6 weeks / ~10k LOC |

---

## 🎨 Advanced Design-Editor Architectures (New)

| Repo | Purpose | License | Status | Saves |
|------|---------|---------|--------|-------|
| [open-pencil/open-pencil](https://github.com/open-pencil/open-pencil) | Scene graph, hit testing, snapping, document format, RPC/MCP | MIT | **Study & evaluate** | Architecture Masterclass |
| [thorvg/thorvg](https://github.com/thorvg/thorvg) | Ultra-lightweight vector / SVG / Lottie rendering | MIT | Candidate | ~6 weeks / ~10k LOC |
| [visgl/luma.gl](https://github.com/visgl/luma.gl) | Low-level WebGPU / WebGL graphics layer | MIT | Candidate | ~8 weeks / ~14k LOC |
| [google/filament](https://github.com/google/filament) | Physically based real-time renderer | Apache 2.0 | Reference | Reference |

---

## 🖱️ Accessible UI & Micro-Interaction Primitives (New)

| Repo | Purpose | License | Status | Saves |
|------|---------|---------|--------|-------|
| [floating-ui/floating-ui](https://github.com/floating-ui/floating-ui) | High-performance tooltips, popovers, context menus | MIT | Candidate | ~2 weeks / ~2k LOC |
| [radix-ui/primitives](https://github.com/radix-ui/primitives) | Unstyled, accessible UI components | MIT | Candidate | ~4 weeks / ~6k LOC |
| [JohannesKlauss/react-hotkeys-hook](https://github.com/JohannesKlauss/react-hotkeys-hook) | Declarative keyboard shortcut hooks | MIT | Candidate | ~1.5 weeks / ~2k LOC |

---

## 🧠 State Machines & Reactive Workflow Architecture (New)

| Repo | Purpose | License | Status | Saves |
|------|---------|---------|--------|-------|
| [statelyai/xstate](https://github.com/statelyai/xstate) | Deterministic state machines for complex playback/export flows | MIT | Candidate | ~4 weeks / ~6k LOC |
| [automerge/automerge](https://github.com/automerge/automerge) | Local-first CRDT timeline collaboration | MIT | Candidate | ~6 weeks / ~10k LOC |

---

## 📁 File Watching & Pipeline Automation (New)

| Repo | Purpose | License | Status | Saves |
|------|---------|---------|--------|-------|
| [paulmillr/chokidar](https://github.com/paulmillr/chokidar) | Reliable cross-platform filesystem watcher | MIT | Candidate | ~2 weeks / ~3k LOC |
| [sindresorhus/execa](https://github.com/sindresorhus/execa) | Process execution for FFmpeg & CLI pipelines | MIT | Candidate | ~1.5 weeks / ~2k LOC |
| [google/zx](https://github.com/google/zx) | Scripting tool for build & automation scripts | Apache 2.0 | Candidate | ~1 week / ~1.5k LOC |

---

## ✅ Active Integrations Summary (Cumulative)

| Integration | Replaced | Saved |
|------------|---------|-------|
| Dexie.js | Custom IndexedDB layer | ~3.5 weeks / ~5k LOC |
| react-konva | Custom canvas engine | ~5 weeks / ~8k LOC |
| motion-canvas | Custom animation engine | ~11 weeks / ~18k LOC |
| @dnd-kit | Custom drag-and-drop | ~3 weeks / ~4k LOC |
| cmdk | Custom command palette | ~2 weeks / ~3k LOC |
| audioEngine.ts (WebAudio) | wavesurfer.js + custom DSP | ~9.5 weeks / ~12k LOC |
| timelineSnap.ts (custom pure math) | Drag library snap logic | ~3 weeks / ~4k LOC |
| SOCIAL_EXPORT_PRESETS | Manual platform config | ~2 weeks / ~2.5k LOC |
| **Total** | | **~39 weeks / ~56.5k LOC** |

---

## 🚀 Recommended Integration Stack (Priority Order)

```
AI DIRECTOR
  ↓
LangGraph / Letta  ← persistent project memory
  ↓
VIDEO UNDERSTANDING & ASSET SEARCH
  faster-whisper + CLIP + PGlite/LanceDB + PySceneDetect
  ↓
EDIT DECISION & WORKFLOW ENGINE
  LiteGraph.js / XState
  ↓
TIMELINE & SCENE GRAPH
  timelineSnap + OpenPencil concepts + Theatre.js keyframes
  ↓
MOTION & EFFECTS
  GSAP + Ghost Arcade (WebGPU/GLSL shaders) + ThorVG (Lottie) + PixiJS
  ↓
AUDIO
  Tone.js + Essentia + Demucs
  ↓
RENDER & EXPORT
  WebCodecs + FFmpeg.wasm (or Tauri desktop shell)
  ↓
AUTOMATION & JOBS
  BullMQ + Chokidar / Execa
  ↓
QA
  Vitest + chain-reaction + Playwright
```

---

## Rule
Integrate only when net time saved > integration + maintenance overhead.
Always check this file before building any major feature from scratch.

