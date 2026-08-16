# OpenCut Master Plan & Chain Reaction Strategy Matrix (2026+)

## 1. Quick Development Time-Savers (Zero-Code Open Source Softwares)

| Domain | Recommended Open-Source Software | Zero-Dev Time Benefit | Key Integration Points |
| :--- | :--- | :--- | :--- |
| **Motion Physics & Presets** | `motion` (Framer Motion) + `motion-canvas` + `lottie-web` | 100+ physics spring curves, kinetic presets | Drag-and-drop animation presets onto Konva text and video tracks |
| **GLSL Video Shaders & Transitions** | `gl-transitions` + `regl` + `three` | 200+ GPU fragment shaders | Real-time GLSL video transitions (Whip, Burn, Dissolve, Pixelize, Light Leak) |
| **Audio Engine & DSP** | `tone.js` + `meyda` + `soundtouchjs` | Zero audio DSP coding | AI Voice ducking, 10-band graphic EQ, smart noise gate (-30dB), pitch shift |
| **Waveform & Timeline UI** | `wavesurfer.js` + `@dnd-kit/core` | Multi-track waveform visualization | Magnetic snapping, ripple editing, zoomable playhead scrubber |
| **Fast Hardware Encoding** | `mediabunny` (WebCodecs) + `@ffmpeg/ffmpeg` | Direct GPU hardware acceleration | 10x-50x faster MP4 rendering vs WASM CPU fallback |
| **AI Editing & Agent Copilot** | `@modelcontextprotocol/sdk` + `@xenova/transformers` | 282+ Premiere MCP actions | Silence cutter, Whisper subtitles, smart reframe (9:16), beat snap |
| **Local Offline State & Sync** | `dexie` (IndexedDB) + `yjs` (CRDTs) | Auto-saving timeline history | Infinite undo/redo tree and real-time collaboration |

---

## 2. Invented Animation Presets

1. **Pop Spring In** (`cubic-bezier(0.175, 0.885, 0.32, 1.275)`): High-energy bounce entrance for titles.
2. **Whip Pan Left/Right** (`cubic-bezier(0.77, 0, 0.175, 1)`): Fast cinematic camera whip transition.
3. **Cyberpunk Glitch** (`steps(5)`): RGB split displacement and strobe flicker.
4. **MrBeast Highlight Pop** (Spring kinetic): Dynamic word-by-word scaling with yellow fill.
5. **Slow Cinematic Push** (`ease-out`): Subtle Ken Burns 1.1x zoom over time.
6. **Karaoke Word Wipe** (`linear`): Real-time fill color wipe synced with voice syllables.

---

## 3. UI Controls & Visual Integrations

- **Inspector Panel**: Dedicated tabs for Media, Text, Filmora Shaders, Motion Presets, Tone.js Audio Master, AI Copilot, and Keyboard Shortcuts.
- **Canva / Konva Overlay**: Direct drag, resize, and rotate transform handles with live playhead feedback.
- **Audio Master Suite**: Real-time volume faders, voice ducking toggles, and noise suppression.
- **Export Control**: Dual-engine button offering GPU WebCodecs fast export and FFmpeg WASM fallback.

---

## 4. Mistakes & Blunders to Avoid

1. **UI Freezing During WASM Processing**: Always offload FFmpeg and decoder tasks to Web Workers (`Worker` / `Comlink`).
2. **WebCodecs VideoFrame Memory Leaks**: Explicitly call `frame.close()` immediately after drawing or encoding.
3. **A/V Sync Drift on Timeline Splits**: Reference absolute source `presentationTimestamp` instead of frame counters.
4. **Non-Isolated Test Runners**: Vitest must exclude Cloudflare SSR plugins to prevent environment conflicts.

---

## 5. Automated Chain-Reaction Verification Scripts

Execute the full chain reaction to ensure zero regressions:

```bash
# One-shot pipeline (typecheck -> tests -> build), exit 0 only when all green
node tools/chain-reaction.mjs
# Flags: --skip-typecheck | --skip-tests | --skip-build
# PowerShell wrapper: powershell -ExecutionPolicy Bypass -File tools/chain-reaction.ps1
```

Manual equivalents (legacy):

```bash
# 1. Vitest Store & Engine Tests
npx.cmd vitest run

# 2. Typecheck & Build
npx.cmd tsc --noEmit
bun run build
```

> **Status**: shipped and verified — **59/59** tests pass, `tsc --noEmit` clean, production build succeeds (both client + SSR). Quick-launch files (`Launch-OpenCut.bat` / `.ps1`) run the chain reaction before booting the dev server on :5173. New coverage: auto-edit engine, keyframe graph commit/delete, LUT strength + EQ band clamps, loop/snap/transition-duration toggles, project serialize/restore, export-engine pure helpers.
