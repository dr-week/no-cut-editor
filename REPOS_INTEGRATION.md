# OpenSource Repositories Integration Guide

This document tracks external repositories integrated into **OpenCut** to accelerate feature development and save token usage.

---

## 1. Integrated Repositories

### A. React Timeline & Editor Logic (`packages/videoEditorH`)
- **Source**: `https://github.com/Sangeok/videoEditorH`
- **Tech Stack**: Next.js, React, TypeScript
- **Features Reused**:
  - Timeline track positioning & timecode calculations
  - Drag-and-drop video clip reordering
  - Track clip state management

### B. WebGL Canvas & Rendering Engine (`packages/rendr`)
- **Source**: `https://github.com/tgranz/rendr`
- **Tech Stack**: JavaScript, WebGL Shaders, FFmpeg
- **Features Reused**:
  - GPU-accelerated canvas preview shader pipeline
  - Real-time video frame rendering filters

---

## 2. Integration Command Quick Reference

```bash
# Clone React timeline repository
git clone https://github.com/Sangeok/videoEditorH.git packages/videoEditorH

# Clone WebGL canvas engine repository
git clone https://github.com/tgranz/rendr.git packages/rendr
```

---

## 3. How This Saves Tokens & Time
- **Zero manual re-coding**: Existing open-source components are pulled directly into `packages/`.
- **Modular imports**: We import UI modules directly into `apps/web/src` using ES module imports.
