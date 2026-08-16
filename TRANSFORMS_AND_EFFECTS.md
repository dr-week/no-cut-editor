# OpenCut Transformations, Effects & Transitions Guide

This guide details the canvas transformations, visual effects, and transition systems integrated into **OpenCut** from open-source repositories.

---

## 1. Canvas Transformations (Premiere Pro Style)
Derived from [`tangshuang/webcut`](https://github.com/tangshuang/webcut) (`@webav/av-canvas`):

- **Scale & Resize**: Drag-handle bounding boxes on video preview canvas.
- **Positioning**: X/Y axis drag-and-drop placement on canvas.
- **Rotation**: 360-degree rotation handles.
- **Opacity & Blending**: Alpha transparency sliders per video layer.
- **Crop**: Rectangular mask cropping handles.

---

## 2. Visual Effects & Shaders (Filmora Style)
Derived from [`tgranz/rendr`](https://github.com/tgranz/rendr) and WebGL GLSL shaders:

- **Color Grading**: Brightness, Contrast, Saturation, Exposure, Warmth.
- **Blur & Sharpen**: Gaussian blur and edge sharpen filters.
- **Preset LUTs**: Vintage, Cyberpunk, Cinematic, B&W 1-click presets.

---

## 3. Video Transitions (Filmora Style)
Derived from [`omni-media/omniclip`](https://github.com/omni-media/omniclip):

- **Dissolve / Crossfade**: Smooth alpha blending between adjacent clips.
- **Wipes**: Left-to-right, top-to-bottom, diagonal wipe shaders.
- **Zoom & Push**: Push left/right, zoom-in/zoom-out clip transition effects.

---

## 4. Integration File Map

| Feature | Primary File Location | Derived Repo |
| --- | --- | --- |
| Transform Handles | `apps/web/src/components/preview/TransformCanvas.tsx` | `packages/webcut` |
| WebGL Shaders | `apps/web/src/lib/render/shaders.ts` | `packages/rendr` |
| Transitions Engine | `apps/web/src/lib/render/transitions.ts` | `packages/omniclip` |
| Timeline Tracks | `apps/web/src/components/timeline/TrackList.tsx` | `packages/nextjs-video-editor` |
