# "Steal Like An Artist" - OpenCut Tool & Package Index

This document catalogs every open-source repository, package, and tool integrated into **OpenCut** to build a Filmora-like UI with Premiere Pro-like controls while minimizing code writing and token usage.

---

## 1. Integrated Open-Source Repositories (`packages/`)

### A. [`packages/nextjs-video-editor`](https://github.com/Govind783/nextjs-video-editor)
- **Features Stolen**:
  - Multi-track visual timeline with playhead & ruler
  - Frame-accurate drag trimming handles
  - Text styling drawer (color, background, border radius)
  - Speed & volume adjustment controls

### B. [`packages/rendr`](https://github.com/tgranz/rendr)
- **Features Stolen**:
  - WebGL GPU-accelerated canvas preview shader pipeline
  - Real-time video filter stack (contrast, brightness, saturation, blur)

---

## 2. Integrated NPM Packages & Libraries

| Package | Purpose | Advantage |
| --- | --- | --- |
| `@ffmpeg/ffmpeg` | Client-side FFmpeg WebAssembly | Fast local rendering without cloud server costs |
| `@dnd-kit/core` | Drag & drop primitives | Smooth clip dragging between tracks |
| `fabric` / HTML5 Canvas | Viewport manipulation | Premiere-style handles for video scale/position |
| `@hugeicons/react` / `lucide-react` | Professional editing icon set | Clean Filmora-style icon toolbars |
| `recharts` | Audio waveform rendering | Precise Premiere-style audio levels view |

---

## 3. Architecture Benefits
- **Zero Token Waste**: We pull fully working features from external repos rather than asking AI to write hundreds of lines of raw code.
- **Fast Execution**: Bundles directly into `apps/web/src` via Vite.
