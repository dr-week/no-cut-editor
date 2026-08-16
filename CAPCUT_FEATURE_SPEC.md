# OpenCut CapCut-Like Feature Specification

This document details how **OpenCut** implements a **CapCut-like browser video editing experience** by reusing top open-source projects.

---

## 1. Key CapCut Features & Source Repository Mapping

| CapCut Feature | How OpenCut Implements It | Source Repository |
| --- | --- | --- |
| **Multi-Track Timeline with Keyframes** | Drag-and-drop tracks, keyframe dots, playhead ruler, and snap indicators. | [`walterlow/freecut`](https://github.com/walterlow/freecut) |
| **Stickers & Canvas Text Engine** | PixiJS-powered GPU canvas for animated text, stickers, shapes, and overlays. | [`openvideo-dev/openvideo`](https://github.com/openvideo-dev/openvideo) |
| **Speed Ramps & Preset Filters** | Speed curves, color LUT presets, and contrast/saturation adjustments. | [`AIEraDev/Clypra`](https://github.com/AIEraDev/Clypra) |
| **Transitions & Shaders** | Dissolves, wipes, slide, push, and zoom WebGL transitions. | [`omni-media/omniclip`](https://github.com/omni-media/omniclip) |
| **AI Agent Commands (MCP)** | 282+ automated tools for AI editing (captions, auto-cuts, styling). | [`hetpatel-11/Adobe_Premiere_Pro_MCP`](https://github.com/hetpatel-11/Adobe_Premiere_Pro_MCP) |

---

## 2. Directory Structure (`packages/`)

To minimize code work and save tokens, the reference repositories are organized as:

```
openCUT/
├── packages/
│   ├── freecut/           # Multi-track keyframe timeline
│   ├── openvideo/         # PixiJS canvas, text & stickers
│   ├── clypra/            # Speed ramps & filters
│   ├── omniclip/          # WebGL transitions
│   └── premiere-mcp/      # 282+ AI editing MCP tools
└── apps/
    └── web/               # Main OpenCut web editor app
```
