# Zero-Code Integration Blueprint

This document details how we minimize writing custom code by linking and importing from our 4 downloaded open-source packages in `d:\CODES\openCUT\packages`.

---

## 1. Local Downloaded Packages (`packages/`)

| Package Directory | Repository Source | What We Import Directly |
| --- | --- | --- |
| **`packages/freecut`** | `walterlow/freecut` | **CapCut-style Timeline UI**: Multi-track timeline controls, keyframe dots, ruler, and playhead snapping. |
| **`packages/nextjs-video-editor`** | `Govind783/nextjs-video-editor` | **Text Styling Drawer**: Font picker, text background, stroke, and color controls. |
| **`packages/omniclip`** | `omni-media/omniclip` | **WebGL Transitions**: Crossfades, wipes, slide, push, and zoom shader transitions. |
| **`packages/premiere-mcp`** | `hetpatel-11/Adobe_Premiere_Pro_MCP` | **282+ AI Editing Tools**: Model Context Protocol schemas for AI auto-edits and captions. |

---

## 2. Zero-Code Import Strategy

Instead of writing new components from scratch, we export components from `packages/` into `apps/web/src`:

1. **Timeline**: Import `TrackList` and `KeyframeBar` from `packages/freecut/src/components`.
2. **Text Drawer**: Import `TextEditorPanel` from `packages/nextjs-video-editor/components`.
3. **Transitions**: Import shader presets from `packages/omniclip/src/render`.
