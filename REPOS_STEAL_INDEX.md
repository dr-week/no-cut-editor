# OpenCut "Steal Like An Artist" Repositories Master Index

This document catalogs the 4 primary open-source repositories integrated into **OpenCut** to minimize manual code work and save tokens.

---

## The 4 Stolen Repositories (`packages/`)

### 1. `packages/webcut`
- **Source**: `https://github.com/tangshuang/webcut`
- **Tech Stack**: `@webav/av-canvas`, React, TypeScript
- **Features Stolen**: Viewport canvas transform handles (rotate, scale, crop, position, opacity controls).

### 2. `packages/omniclip`
- **Source**: `https://github.com/omni-media/omniclip`
- **Tech Stack**: WebCodecs, WebGL, TypeScript
- **Features Stolen**: Transitions engine (dissolves, wipes, zooms) and WebCodecs export pipeline.

### 3. `packages/nextjs-video-editor`
- **Source**: `https://github.com/Govind783/nextjs-video-editor`
- **Tech Stack**: Next.js, React, shadcn/ui, FFmpeg
- **Features Stolen**: Multi-track timeline UI, playhead ruler, clip trim drag handles, text styling drawer.

### 4. `packages/rendr`
- **Source**: `https://github.com/tgranz/rendr`
- **Tech Stack**: JavaScript, WebGL Shaders
- **Features Stolen**: Real-time GPU color grading filters and shader pipeline.

---

## Direct Clone Command

```bash
git clone https://github.com/tangshuang/webcut.git packages/webcut
git clone https://github.com/omni-media/omniclip.git packages/omniclip
git clone https://github.com/Govind783/nextjs-video-editor.git packages/nextjs-video-editor
git clone https://github.com/tgranz/rendr.git packages/rendr
```
