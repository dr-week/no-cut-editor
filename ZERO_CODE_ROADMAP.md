# OpenCut Ultimate Zero-Code Roadmap

This document outlines the exact strategy to build OpenCut with **90%+ less manual coding** by utilizing open-source libraries and our 4 downloaded packages in `packages/`.

---

## 1. Top Pre-built Open-Source Packages Installed (`bun add`)

Instead of writing custom canvas, export, or drag engines, we rely on established open-source NPM packages:

| Feature Needed | Open Source Package Used | What It Replaces |
| --- | --- | --- |
| **Video Exporting & Encoding** | `@ffmpeg/ffmpeg` + `@ffmpeg/util` | 0 custom C++ / Rust export code needed |
| **Canvas Viewport & Bounding Box** | `fabric.js` | 0 custom canvas rendering / drag-handle math needed |
| **Drag & Drop Timeline Clips** | `@dnd-kit/core` + `@dnd-kit/sortable` | 0 custom mouse drag event listeners needed |
| **UI Components & Icons** | `radix-ui` + `@hugeicons/react` + `shadcn` | 0 custom UI button / dialog CSS needed |

---

## 2. Open-Source Repositories Linked (`packages/`)

| Downloaded Package | What We Import Directly |
| --- | --- |
| **[`packages/freecut`](file:///d:/CODES/openCUT/packages/freecut)** | Full CapCut-style Multi-Track Timeline & Keyframes UI |
| **[`packages/nextjs-video-editor`](file:///d:/CODES/openCUT/packages/nextjs-video-editor)** | Pre-built Text Styling Drawer & Control Sliders |
| **[`packages/omniclip`](file:///d:/CODES/openCUT/packages/omniclip)** | WebGL Transition Wipes, Dissolves, and Zoom Effects |
| **[`packages/premiere-mcp`](file:///d:/CODES/openCUT/packages/premiere-mcp)** | 282+ AI Editing MCP Tools for AI Automation |

---

## 3. Token-Saving Rule of Thumb
1. **Never write raw canvas math**: Use `fabric.js` or `packages/freecut`.
2. **Never write raw WebGL shaders**: Use `packages/omniclip`.
3. **Never write raw video encoders**: Use `@ffmpeg/ffmpeg`.
