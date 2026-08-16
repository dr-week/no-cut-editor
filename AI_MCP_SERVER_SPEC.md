# OpenCut AI MCP Server Tool Specification

This document details the **AI Model Context Protocol (MCP)** tool schemas adopted from [`hetpatel-11/Adobe_Premiere_Pro_MCP`](https://github.com/hetpatel-11/Adobe_Premiere_Pro_MCP) into **OpenCut**.

---

## 1. Why Integrate Premiere Pro MCP Schemas into OpenCut?

OpenCut's architectural vision specifies an **MCP Server** (see `README.md`). By stealing the **282+ tool definitions** from the Premiere Pro MCP project:
- **Instant AI Capabilities**: AI assistants (Claude, Codex, Antigravity) can perform automated editing in OpenCut using standardized function calls.
- **Zero Token Overhead**: Pre-defined tool parameters avoid generating prompt schemas from scratch.

---

## 2. Core Tool Categories Adopted

| Category | Primary MCP Tool Commands | OpenCut Target Action |
| --- | --- | --- |
| **Timeline Trimming** | `trim_clip_in_out`, `split_clip_at_playhead`, `ripple_delete` | Updates `apps/web/src/components/timeline` clip state |
| **Canvas Transforms** | `set_clip_scale`, `set_clip_position`, `rotate_clip` | Updates WebGL / Canvas transform matrix in `apps/web/src/components/preview` |
| **Effects & LUTs** | `apply_video_effect`, `set_color_grading_lut` | Triggers GLSL shaders in `apps/web/src/lib/render` |
| **Transitions** | `add_transition_between_clips` | Injects WebGL crossfade/wipe shader between timeline tracks |
| **Audio Mixing** | `adjust_track_volume`, `mute_audio_track` | Controls Web Audio gain nodes |

---

## 3. Clone & File Mapping

- **Local Path**: `packages/premiere-mcp`
- **Source**: `https://github.com/hetpatel-11/Adobe_Premiere_Pro_MCP`
