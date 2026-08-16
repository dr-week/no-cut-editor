---
name: opencut-video-editor
description: Master skill for building, modifying, and extending OpenCut, a browser-based video editor combining Filmora ease, Canva canvas design, Motion Graphics, Remotion rendering engine, Zustand state, Premiere Pro controls, and AI MCP integration.
---

# OpenCut Master Video Editor Skill (Updated 2026 Edition)

Use this skill whenever working on **OpenCut** features, video editing pipelines, canvas transforms, motion graphics, or AI tool integrations.

## 1. Zero-Code Open-Source Architecture

OpenCut reuses top open-source projects to minimize manual code work and save tokens:

- **Video Rendering Engine**: Built with `remotion` and `@remotion/player`.
- **Centralized State Management**: Built with `zustand` (`apps/web/src/lib/store/editorStore.ts`).
- **Canva Viewport UI**: Built with `react-konva` & `konva`.
- **Motion Graphics**: Built with `motion` and `packages/motion-canvas`.
- **CapCut & Premiere Multi-Track Timeline**: Built with `packages/freecut` and `packages/nextjs-video-editor`.
- **WebGL Transitions & Shaders**: Built with `packages/omniclip` and `packages/rendr`.
- **Video Compression & Encoding**: Built with `mediabunny` (ultra-fast GPU WebCodecs) and `@ffmpeg/ffmpeg` (WASM).
- **AI Editing Automation**: Built with 282+ tools in `packages/premiere-mcp`.

## 2. Core Documentation Links

- **Setup & Installation**: [SETUP.md](file:///d:/CODES/openCUT/SETUP.md)
- **Architecture Overview**: [ARCHITECTURE.md](file:///d:/CODES/openCUT/ARCHITECTURE.md)
- **Development & Customization Guide**: [DEVELOPMENT.md](file:///d:/CODES/openCUT/DEVELOPMENT.md)
- **2026 Tech Stack Blueprint**: [2026_TECH_STACK.md](file:///d:/CODES/openCUT/2026_TECH_STACK.md)
- **Master Zero-Code Roadmap**: [MASTER_ZERO_CODE_ROADMAP.md](file:///d:/CODES/openCUT/MASTER_ZERO_CODE_ROADMAP.md)
- **Canva & Motion Graphics Guide**: [CANVA_MOTION_GRAPHICS.md](file:///d:/CODES/openCUT/CANVA_MOTION_GRAPHICS.md)
- **CapCut Feature Spec**: [CAPCUT_FEATURE_SPEC.md](file:///d:/CODES/openCUT/CAPCUT_FEATURE_SPEC.md)
- **AI MCP Server Specification**: [AI_MCP_SERVER_SPEC.md](file:///d:/CODES/openCUT/AI_MCP_SERVER_SPEC.md)
- **Transforms & Effects Guide**: [TRANSFORMS_AND_EFFECTS.md](file:///d:/CODES/openCUT/TRANSFORMS_AND_EFFECTS.md)
- **Keyboard Shortcuts Reference**: [KEYBOARD_SHORTCUTS.md](file:///d:/CODES/openCUT/KEYBOARD_SHORTCUTS.md)
- **Parallel Chain-Reaction Automation**: [PARALLEL_CHAIN_REACTION.md](file:///d:/CODES/openCUT/PARALLEL_CHAIN_REACTION.md)

## 3. Quick Run Commands

```bash
# Start Web Editor Dev Server (Port 5173)
cd apps/web
bun run dev

# Run Build Verification
bun run build
```
