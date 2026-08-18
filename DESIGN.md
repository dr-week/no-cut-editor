# OpenCut Studio - Comprehensive Design System & Architecture Specification (DESIGN.md)

This document provides the authoritative design tokens, layout hierarchy, component contracts, coordinate systems, and state machine specifications for **OpenCut Studio**. It aligns OpenCut with professional NLE standards (CapCut Pro, Adobe Premiere Pro, DaVinci Resolve) while solving layout utilization, playhead clipping, and canvas desynchronization defects.

---

## 1. 🎨 Design Tokens & Surface Elevation Hierarchy

OpenCut uses an intentional, multi-tier dark obsidian elevation palette to provide high visual contrast and separate functional panels from the workspace background.

### 1.1 Color Tokens & Elevation Levels

| Token Name | Hex Code | Purpose & Application |
| :--- | :--- | :--- |
| **`SURFACE_0` (Canvas Void)** | `#0a0b0e` | Deep canvas backdrop void behind the viewport stage. |
| **`SURFACE_1` (Application Base)** | `#101116` | Main window background, global timeline lane backdrop. |
| **`SURFACE_2` (Panels & Drawers)** | `#16171e` | Left Asset Drawer, Right Inspector Panel, Top Header, Track Headers. |
| **`SURFACE_3` (Cards & Inputs)** | `#1f212a` | Media Bin asset cards, Inspector input fields, track item containers. |
| **`SURFACE_4` (Hover & Active)** | `#292b36` | Button hover states, active input focus states, selected tool background. |
| **`BORDER_SUBTLE`** | `rgba(255,255,255,0.06)` | Structural dividers between panels and toolbars. |
| **`BORDER_FOCUS`** | `rgba(6, 182, 212, 0.5)` | Active selection outline, focused text input border. |
| **`ACCENT_PRIMARY`** | `#06b6d4` (Cyan) | Primary action buttons, active tab indicators, playhead head, transformer handles. |
| **`ACCENT_SECONDARY`** | `#3b82f6` (Blue) | Multi-selection boxes, video track clip fill (`V1`). |
| **`ACCENT_WARNING`** | `#f59e0b` (Amber) | Subtitle/Text track clip fill (`TXT`), keyframe diamonds. |
| **`ACCENT_SUCCESS`** | `#10b981` (Emerald)| Audio track clip fill (`A1`), waveform peaks, render complete. |
| **`ACCENT_DANGER`** | `#ef4444` (Red) | Active recording indicator, playhead line vertical stroke. |

### 1.2 Z-Index Layering Matrix

```typescript
export const Z_INDEX = {
  CANVAS_BASE: 1,
  CANVAS_ELEMENTS: 10,
  CANVAS_GIZMO_TRANSFORMER: 20,
  CANVAS_VIEWPORT_OVERLAYS: 30,
  TIMELINE_TRACK_ITEMS: 10,
  TIMELINE_TIME_RULER: 40,
  TIMELINE_PLAYHEAD_LINE: 50,
  TIMELINE_PLAYHEAD_HANDLE: 60,
  MODAL_DRAWER_POPOVERS: 100,
  GLOBAL_TOAST_NOTIFICATIONS: 200,
} as const;
```

---

## 2. 📐 Responsive Layout & 3-Column Grid Architecture

OpenCut enforces a zero-dead-space 3-column studio layout structured around a full viewport grid (`100vw × 100vh`).

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│  TOP HEADER BAR (h: 48px, bg: SURFACE_2, border-b: BORDER_SUBTLE)                       │
├────────┬────────────────────────────────┬──────────────────────────────────────────────┤
│ DOCK   │ ASSET DRAWER                   │ CENTER VIEWPORT STAGE (flex-1, SURFACE_0)    │ RIGHT INSPECTOR PANEL        │
│ (56px) │ (w: 280px - 320px)             │ ┌──────────────────────────────────────────┐ │ (w: 280px - 320px)           │
│        │                                │ │ Top Stage Bar (Ratio, Scale, View Mode)  │ │                            │
│        │ • Media Bin & Dropzone         │ ├──────────────────────────────────────────┤ │ • Typography Inspector     │
│        │ • AI STT Captions Generator    │ │                                          │ │   - Font, Weight, Size     │
│        │ • Lumetri Color Wheels         │ │ Responsive Viewport Canvas               │ │   - Color, Stroke, Shadow  │
│        │ • Wagner GLSL Shaders          │ │ (Dynamic contain fit: 16:9 / 9:16 / 1:1) │ │ • Transform Matrix ($X,Y$) │
│        │ • Viral Motion Templates       │ │                                          │ │ • Layer Opacity & Blend    │
│        │ • Sound FX & Audio Library     │ ├──────────────────────────────────────────┤ │ • Speed Ramping (0.1x–10x) │
│        │                                │ │ Transport Bar (Timecode, Play, Volume)   │ │                            │
│        │                                │ └──────────────────────────────────────────┘ │                            │
├────────┴────────────────────────────────┴──────────────────────────────────────────────┴────────────────────────────┤
│  MULTI-TRACK TIMELINE (h: 220px - 260px, bg: SURFACE_1, border-t: BORDER_SUBTLE)                                     │
│  • Timeline Toolbar (Cut, Select, Magnet Snap, Zoom Slider 50%–200%)                                                 │
│  • Left Track Headers: V1, TXT, A1 with Lock, Eye (Visibility), Mute controls                                         │
│  • Right Track Lanes: Time Ruler (00:00:00), Clamped Playhead (Z: 50), Real-Time Waveforms, Clip Diamond Keyframes   │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### 2.1 Viewport Container Max-Fit Calculation
The center viewport computes responsive canvas dimensions using a CSS / ResizeObserver `fit: contain` constraint:
$$\text{Scale} = \min\left(\frac{W_{\text{available}} - 32}{W_{\text{native}}}, \frac{H_{\text{available}} - 64}{H_{\text{native}}}\right)$$

- **16:9 Landscape**: Native $1920 \times 1080 \implies \text{Preview Target } 640 \times 360$
- **9:16 Vertical (Shorts/Reels/TikTok)**: Native $1080 \times 1920 \implies \text{Preview Target } 230 \times 410$
- **1:1 Square (Instagram Post)**: Native $1080 \times 1080 \implies \text{Preview Target } 380 \times 380$

---

## 3. ⏱️ Timeline & Transport Component Specifications

### 3.1 Playhead Boundary & Overflow Constraints
- **Coordinate Anchor**: The top playhead diamond (`PlayheadHead`) is anchored directly inside the `TimeRuler` coordinate plane ($Y=0$).
- **Overflow Enforcement**: The track container strictly applies `overflow-y: hidden` and `overflow-x: auto`. The playhead vertical line height is computed dynamically as:
  $$H_{\text{playheadLine}} = H_{\text{trackContainer}} - H_{\text{toolbar}}$$
  This completely eliminates playhead lines spilling into the Windows taskbar.
- **Scrubbing Precision**: Scrubbing evaluates playhead position as:
  $$T_{\text{target}} = \text{clamp}\left(0, \frac{X_{\text{click}} - X_{\text{timelineLeft}}}{W_{\text{timelineLane}}} \times T_{\text{duration}}, T_{\text{duration}}\right)$$

### 3.2 Track Item Time-Sync State Machine
A track clip or overlay element on canvas is mounted and rendered **if and only if**:
$$\text{trackItem.startTime} \le \text{currentTime} < \text{trackItem.startTime} + \text{trackItem.duration}$$

```typescript
export interface TrackClipContract {
  id: string;
  trackId: "V1" | "V2" | "TXT" | "A1" | "A2";
  type: "video" | "text" | "audio" | "image";
  title: string;
  startTime: number;    // In seconds (e.g., 0.00)
  duration: number;     // In seconds (e.g., 15.00)
  color: string;
  waveform?: number[];  // Array of amplitude peaks [0..100] for audio tracks
  speed: number;        // Default 1.0 (0.1 to 10.0)
  isLocked: boolean;    // When true, disables drag and razor cuts
  isVisible: boolean;   // When false, hides canvas layer or mutes audio
}
```

### 3.3 Standard Track Header Parity
Every track header (`V1`, `TXT`, `A1`) implements standard NLE controls:
- **Visibility Toggle (`Eye` / `EyeOff`)**: Controls stage layer visibility.
- **Lock Toggle (`Lock` / `Unlock`)**: Prevents accidental trimming or deletion.
- **Audio Mute (`Volume2` / `VolumeX`)**: Silences audio track during playback.

---

## 4. 🎛️ Viewport & Canvas Transformer Specifications

### 4.1 Transformer Gizmo Design Tokens
To prevent oversized handles from obscuring typography and small video elements:

```typescript
export const TRANSFORMER_TOKENS = {
  anchorSize: 8,                    // 8px x 8px square anchors
  anchorCornerRadius: 2,           // Subtle rounded corners
  anchorFill: "#ffffff",           // Crisp white center
  anchorStroke: "#06b6d4",         // Cyan primary accent stroke
  anchorStrokeWidth: 1.5,
  borderStroke: "#06b6d4",         // Bounding box border
  borderDash: [3, 3],              // 3px on, 3px off dash
  borderStrokeWidth: 1,
  rotationSnaps: [0, 90, 180, 270], // Magnetic angle snapping
  rotateAnchorOffset: 24,          // 24px stalk length for rotation handle
} as const;
```

### 4.2 Viewport Status Bar Consolidation
Raw canvas area remains completely clean of developer badges. Status metrics are consolidated in the **Stage Top Bar**:
- **Aspect Ratio Selector**: `16:9` | `9:16` | `1:1`
- **Zoom Level**: `Fit (100%)` | `50%` | `200%`
- **Color Grade / LUT Badge**: `LUT: Kodak 2383` (Interactive popover trigger)
- **Viewport Resolution**: `1920x1080 @ 60fps`

---

## 5. 🎚️ Right Inspector / Properties Panel Schema

The Inspector panel is context-aware based on the selected canvas element or timeline track clip.

### 5.1 Typography Inspector Schema

```typescript
export interface TypographyInspectorSchema {
  // Content & Typography
  textContent: string;
  fontFamily: "Inter" | "Roboto" | "Playfair Display" | "Montserrat" | "Fira Code";
  fontWeight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  fontSizePx: number;              // Range: 8 to 240px
  lineHeight: number;              // Multiplier: 0.8 to 2.5
  letterSpacingPx: number;         // Range: -5 to 30px
  textAlign: "left" | "center" | "right" | "justify";
  
  // Fill & Style
  fillColorHex: string;            // e.g., "#06b6d4"
  fillOpacityPercent: number;      // 0 to 100%
  
  // Stroke & Outline
  strokeColorHex: string;
  strokeWidthPx: number;           // 0 to 20px
  
  // Drop Shadow
  shadowEnabled: boolean;
  shadowColorHex: string;
  shadowBlurPx: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
  
  // Background Plate
  backgroundPlateEnabled: boolean;
  backgroundPlateColor: string;
  backgroundPlatePadding: number;
  backgroundPlateRadius: number;
}
```

### 5.2 Transform & Position Matrix Schema

```typescript
export interface TransformMatrixSchema {
  // Spatial Coordinates
  positionX: number;               // Pixel offset from canvas origin
  positionY: number;
  
  // Scale & Dimensions
  scaleX: number;                  // Multiplier (1.0 = 100%)
  scaleY: number;
  isAspectRatioLocked: boolean;    // Lock uniform W/H scaling
  
  // Rotation & Easing
  rotationDeg: number;             // 0 to 360 degrees
  
  // Compositing
  opacityPercent: number;          // 0 to 100%
  blendMode: "normal" | "multiply" | "screen" | "overlay" | "darken" | "lighten";
}
```

---

## 6. 📁 Summary of Repository Design Documentation Index

All technical design documents are consolidated in [`docs/`](file:///d:/CODES/openCUT/docs/):
- **Master Design Specification**: [`docs/guides-specs/DESIGN.md`](file:///d:/CODES/openCUT/docs/guides-specs/DESIGN.md) *(and workspace root [`DESIGN.md`](file:///d:/CODES/openCUT/DESIGN.md))*
- **UI Simplification Guide**: [`docs/guides-specs/UI_SIMPLIFICATION_GUIDE.md`](file:///d:/CODES/openCUT/docs/guides-specs/UI_SIMPLIFICATION_GUIDE.md)
- **Competitive Gap Analysis vs Premiere & CapCut**: [`docs/savings-roadmap/FEATURE_GAP_ANALYSIS_AND_FUTURE_PLAN.md`](file:///d:/CODES/openCUT/docs/savings-roadmap/FEATURE_GAP_ANALYSIS_AND_FUTURE_PLAN.md)
- **5 Targeted Execution Pillars**: [`docs/architecture/FIVE_PILLARS_IMPLEMENTATION.md`](file:///d:/CODES/openCUT/docs/architecture/FIVE_PILLARS_IMPLEMENTATION.md)
