# Comprehensive Programming Languages Guide for OpenCut (2026+)

This document details every programming language suited for OpenCut development, where it fits in the architecture, what open-source tools it enables, and why it accelerates video editing engineering.

---

## 1. Core Primary Languages (Currently in Use)

| Language | Layer / Subsystem | Primary Role in OpenCut | Key Ecosystem & Libraries |
| :--- | :--- | :--- | :--- |
| **TypeScript 5.8+** | Frontend / State / Business Logic | Central application framework, Zustand reactive store, Konva Canvas manipulation, timeline drag & drop. | React 19, `@remotion/player`, `konva`, `motion`, `zod`, `dnd-kit` |
| **GLSL (OpenGL Shading Language)** | GPU Fragment Shaders | Real-time pixel shading, 200+ video transitions, 3D LUT `.cube` color transformations, blur, bloom, and CRT distortion. | `gl-transitions`, `regl`, `three`, WebGL 2.0 |
| **CSS3 / TailwindCSS 4** | UI Styling & Retro FX | Glassmorphism dark interface, responsive layout, SVG fractal noise jitter (`.fx-grain`), vignette, scanlines. | Tailwind 4, CSS blend modes, SVG filters |

---

## 2. Recommended High-Performance Languages to Add

### A. **Rust** (WebAssembly / SIMD / Native Core)
- **Where to Use**:
  - Raw frame byte manipulation, demuxing MP4 boxes, pixel-level color matrix transforms, timeline ripple math, waveform peak generation.
- **Why Add It**:
  - Zero-garbage-collection pauses (critical for 60 FPS playback).
  - $8\times - 15\times$ faster than JavaScript for raw array buffer processing.
  - Native SIMD vector instructions compiled to WebAssembly (`wasm32-unknown-unknown`).
- **Open-Source Crates to Steal / Use**:
  - `ffmpeg-next-wasi`: High-performance video decoding in WASI.
  - `image-rs`: Ultra-fast image decoding and scaling.
  - `symphonia`: Pure Rust audio decoding (MP3, AAC, FLAC, WAV) without C dependencies.

---

### B. **WGSL (WebGPU Shading Language)**
- **Where to Use**:
  - Compute shaders for on-device AI inference, optical flow frame interpolation (slow-motion 120 FPS generation), and real-time GPU background segmentation.
- **Why Add It**:
  - Next-generation replacement for WebGL GLSL.
  - Allows compute shaders (GPGPU) directly in the browser with lower overhead than WebGL.
- **Open-Source Tooling**:
  - `wgpu` (WebGPU ecosystem)
  - `onnxruntime-web` with WebGPU execution provider.

---

### C. **C / C++ (via Emscripten / WebAssembly)**
- **Where to Use**:
  - Legacy video transcoding, complex container muxing, codec fallbacks (H.265/HEVC, AV1, ProRes).
- **Why Add It**:
  - Allows porting mature, battle-tested media libraries with decades of optimization.
- **Open-Source Tooling**:
  - `FFmpeg` (libavcodec, libavformat, libswscale) via `@ffmpeg/ffmpeg`.
  - `libvpx` (VP8/VP9 encoding) & `libaom` (AV1 encoding).
  - `SoundTouch` (real-time pitch shifting and time-stretching).

---

### D. **Zig** (Native CLI & Fast Tooling)
- **Where to Use**:
  - High-speed build tooling, microservices, local file indexers, and embedded database runners (Bun runtime is written in Zig).
- **Why Add It**:
  - Zero-overhead C interoperability.
  - Ultra-fast compilation times (< 100ms).
  - Cross-compiles to Windows, macOS, Linux, and WASM out of the box with zero external dependencies.

---

### E. **Python** (AI Research & MCP Model Pipelines)
- **Where to Use**:
  - Model quantization pipelines (exporting PyTorch/HuggingFace models to ONNX INT8 Web format), automated dataset processing, Premiere MCP agent test scripts.
- **Why Add It**:
  - Defacto industry language for training, fine-tuning, and quantizing speech (Whisper), vision (SAM), and audio models.
- **Open-Source Tooling**:
  - `onnx`, `onnxruntime`, `optimum`, `transformers`, `torch`.

---

### F. **Go (Golang)** (Optional Cloud Render Workers)
- **Where to Use**:
  - Scalable headless backend render workers, video upload chunking, multipart S3 streaming, multi-user WebSocket signaling.
- **Why Add It**:
  - Lightweight concurrency with goroutines, tiny memory footprints (< 20 MB per worker), single static binary deployment.
- **Open-Source Tooling**:
  - `pion/webrtc` (real-time peer-to-peer video streaming).
  - `go-astisub` (subtitle parsing/conversion).

---

## 3. Multi-Language Layering Architecture

```
┌────────────────────────────────────────────────────────┐
│ UI / Timeline / State Machine                          │
│ ► TypeScript 5.8+ / React 19 / Tailwind 4 / Zustand    │
├────────────────────────────────────────────────────────┤
│ Real-Time GPU Shaders & Shading                        │
│ ► GLSL (WebGL 2.0) & WGSL (WebGPU Compute)            │
├────────────────────────────────────────────────────────┤
│ High-Throughput Byte Processing & SIMD                 │
│ ► Rust (WASM) / C++ (Emscripten)                       │
├────────────────────────────────────────────────────────┤
│ Hardware Video Encoding / Decoding                     │
│ ► WebCodecs API (Native Browser GPU)                   │
├────────────────────────────────────────────────────────┤
│ Tooling, Build Scripts & Microservices                 │
│ ► Zig / Bun / Python (Model Quantization)              │
└────────────────────────────────────────────────────────┘
```
