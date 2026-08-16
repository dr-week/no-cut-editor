# Open Software and GitHub Reuse Plan

## 1. Libraries to reuse

### Motion and animation
- motion-canvas / motion-canvas
- motion / motion
- framer-motion (if needed for some UI motion)

### Transition and visual effects
- gl-transitions / gl-transitions
- shader-based effect collections and generated transitions

### Audio and waveform tools
- Tonejs / Tone.js
- katspaugh / wavesurfer.js

### Export and media processing
- mediabunny / mediabunny
- ffmpeg.wasm / ffmpeg.wasm (if additional conversion is needed)

### Persistence and local storage
- Dexie / Dexie.js

### Keyboard and shortcuts
- react-hotkeys-hook / react-hotkeys-hook

### Lottie and overlays
- dotlottie / dotlottie-web

### Collaboration
- yjs / yjs

## 2. Time saved by reuse

- Typography, forms, and layout systems can be reused from established UI primitives
- Media conversion and export work can be reused instead of custom-built
- Motion timing and easing are already solved at scale
- Audio waveform and effect handling can be reused instead of custom-coded from scratch
- Local project storage and save/restore can be built on Dexie rather than raw IndexedDB logic

## 3. Strategy

Use open source for heavy technical domains and custom code only for editor-specific product decisions, UX, and timeline orchestration.

This is the fastest and safest path to a polished editor without spending months building core infrastructure.
