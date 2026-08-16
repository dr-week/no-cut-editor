# My 2026 Video Editing Tech Stack

## Overview
A cutting-edge, browser-based & local hybrid video editing stack for **OpenCut**. Designed to offer **Filmora-like ease of use** combined with **Premiere Pro-like granular control**.

---

## 🚀 Core Tech Stack Breakdown

### 1. Modern Web & Application Engine
- **Framework**: React 19 + Vite 8
- **Routing & State**: TanStack Router (Type-safe client & SSR routing)
- **Runtime & Monorepo**: Bun v1.3+ & Moonrepo (`.prototools`)
- **Styling & UI**: Tailwind CSS v4 + Radix UI + shadcn/ui primitives

### 2. High-Performance Video Processing & Rendering
- **Client-Side FFmpeg**: `@ffmpeg/ffmpeg` (WebAssembly for zero-cloud cost local export)
- **GPU Canvas Preview**: WebGL Shaders (Stolen from [`tgranz/rendr`](https://github.com/tgranz/rendr))
- **Viewport Manipulation**: HTML5 Canvas / `fabric.js` (Scale, rotate, crop, text overlays)

### 3. Precision Timeline & Interaction Layer
- **Multi-Track Timeline**: React Timeline Engine (Stolen from [`Govind783/nextjs-video-editor`](https://github.com/Govind783/nextjs-video-editor))
- **Drag & Drop**: `@dnd-kit/core` (Smooth clip snapping & track swapping)
- **Audio Waveforms**: `recharts` / Web Audio API

---

## 🎨 Design Philosophy: Filmora Ease + Premiere Pro Control

| Tier | Filmora (Simplicity) | Premiere Pro (Precision) |
| --- | --- | --- |
| **Media & Clips** | Drag-and-drop media drawer | Multi-layer video (V1/V2) & audio (A1/A2) tracks |
| **Trimming** | 1-Click split button | Frame-by-frame playhead drag handles & snapping |
| **Effects** | 1-Click LUT preset filters | GPU sliders for contrast, saturation, and exposure |
| **Titles** | Pre-built text templates | Fine font, stroke, shadow & position controls |

---

## 🛠️ Integrated Open-Source Repositories (`packages/`)

- `packages/nextjs-video-editor`: Timeline drag handles, text styling drawer, multi-track logic.
- `packages/rendr`: Real-time WebGL canvas shader pipeline.
